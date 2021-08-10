(function($){
    function SbspfAdmin(plugin,$adminEl) {
        this.plugin = plugin;
        this.$adminEl = $adminEl;
        this.accesstokenSplitter = 'access_token=';
    }

    SbspfAdmin.prototype = {
        init: function() {
            var self = this,
                id = '#'+this.plugin,
                cla = '.'+this.plugin;
            this.addAccessTokenListener();
            $('.'+this.plugin +'_connected_accounts_wrap .'+this.plugin +'_connected_account').each(function() {
                self.initClickRemove($(this));
                self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
            });
            this.$adminEl.find('.sbspf_type_input').on('change',function() {
                self.updateOnSelect($(this));
            });self.updateOnSelect();


            self.initAppCredToggle();

            self.initWidthResponsiveToggle();
            self.initActionButtons();

            this.addManualAccessTokenListener();

            $(id + '_search_submit').on('click',function(event) {
                event.preventDefault();

                var submitData = {
                    'term' : $(id + '_channel_search').val(),
                    'action' : self.plugin + '_account_search',
                    'sbspf_nonce' : sbspf.nonce
                };
                var onSuccess = function (data) {
                    if (data.trim().indexOf('{') === 0) {
                        var returnObj = JSON.parse(data.trim());

                        var html = '';
                        $.each(returnObj.items,function(index,value){
                        });
                    }
                };
                sbAjax(submitData,onSuccess);
            });

            // color picker
            var $sbyColorpicker = $(cla+'_colorpicker');

            if($sbyColorpicker.length > 0){
                $sbyColorpicker.wpColorPicker();
            }

            // shortcode tooltips
            var $adminLabel = $(id +'_admin label');

            $adminLabel.on('click',function(){
                var $shortcode = $(this).siblings(cla + '_shortcode');
                if($shortcode.is(':visible')){
                    $(this).closest('tr').removeClass('sby_shortcode_visible');
                    $shortcode.hide();
                } else {
                    $(this).closest('tr').addClass('sby_shortcode_visible');
                    $shortcode.show();
                }
            });

            $adminLabel.hover(function(){
                if($(this).siblings(cla + '_shortcode').length && ! $(this).find(cla + '_shortcode_symbol').length){
                    $(this).append('<code class="'+self.plugin+'_shortcode_symbol">[]</code>');
                }
            }, function(){
                $(this).find(cla + '_shortcode_symbol').remove();
            });
            $(cla + '_shortcode').hide();

            //Scroll to hash for quick links
            $(id + '_admin a').on('click',function() {
                if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : this.hash.slice(1);
                    if(target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 500);
                        return false;
                    }
                }
            });

            //Caching options
            if( $(id+'_caching_type_page').is(':checked') ) {
                $(cla+'-caching-cron-options').hide();
                $(cla+'-caching-page-options').show();
            } else {
                $(cla+'-caching-page-options').hide();
                $(cla+'-caching-cron-options').show();
            }

            $('.'+self.plugin+'_caching_type_input').on('change',function() {
                if (this.value == 'page') {
                    $(cla+'-caching-cron-options').slideUp();
                    $(cla+'-caching-page-options').slideDown();
                }
                else if (this.value == 'background') {
                    $(cla+'-caching-page-options').slideUp();
                    $(cla+'-caching-cron-options').slideDown();
                }
            });

            //Should we show the caching time settings?
            var sbspf_cache_cron_interval = $(id+'_cache_cron_interval').val(),
                $sbspf_caching_time_settings = $(id+'-caching-time-settings');

            //Should we show anything initially?
            if(sbspf_cache_cron_interval == '30mins' || sbspf_cache_cron_interval == '1hour') $sbspf_caching_time_settings.hide();

            $(id+'_cache_cron_interval').on('change',function(){
                sbspf_cache_cron_interval = $(id+'_cache_cron_interval').val();

                if(sbspf_cache_cron_interval == '30mins' || sbspf_cache_cron_interval == '1hour'){
                    $sbspf_caching_time_settings.hide();
                } else {
                    $sbspf_caching_time_settings.show();
                }
            });
            sbspf_cache_cron_interval = $(id+'_cache_cron_interval').val();

            if(sbspf_cache_cron_interval == '30mins' || sbspf_cache_cron_interval == '1hour'){
                $sbspf_caching_time_settings.hide();
            } else {
                $sbspf_caching_time_settings.show();
            }

            self.updateLayoutOptionsDisplay();
            $(cla + '_layout_type').on('change',function() {
                self.updateLayoutOptionsDisplay()
            });
            $(cla + '_sub_option_type').on('change',function() {
                self.updateBoxSelectionDisplay()
            });
            self.updateBoxSelectionDisplay();

            // tooltips
            $(id +'_admin '+ cla + '_tooltip_link').on('click',function(){
                if ($(this).closest( cla + '_box').length) {
                    $(this).closest( cla + '_box').find(cla + '_tooltip').slideToggle();

                } else {
                    $(this).closest('tr, h3, '+ cla + '_tooltip_wrap').find(cla + '_tooltip').slideToggle();
                }
            });

            $(id +'_admin '+ cla + '_type_tooltip_link').on('click',function(){
                $(this).closest(cla + '_row').find(cla + '_tooltip').slideToggle();
            });

            //Mobile width
            var $feedWidth = $(id+'_admin '+id+'_settings_width'),
                $widthUnit = $(id+'_admin '+id+'_settings_width_unit');
            if ($feedWidth.length) {
                $feedWidth.on('change',function(){
                    self.updateFeedWidthDisplay();
                });
                $widthUnit.on('change',function(){
                    self.updateFeedWidthDisplay();
                });
                self.updateFeedWidthDisplay();
            }

            this.afterInit();
        },
        afterInit: function() {

        },
        addAccessTokenListener: function() {
            var self = this;
            if (window.location.hash.length > 5 && window.location.hash.indexOf(this.accesstokenSplitter) > -1) {
                var accessToken = window.location.hash.split(this.accesstokenSplitter);
                // clear access token from hash
                window.location.hash = '';
                var submitData = {
                    'access_token' : accessToken[1],
                    'action' : this.plugin + '_process_access_token',
                    'sbspf_nonce' : sbspf.nonce
                };
                var onSuccess = function (data) {
                    if (data.trim().indexOf('{') === 0) {
                        var returnObj = JSON.parse(data.trim());
                        $('.'+self.plugin +'_connected_accounts_wrap').prepend(returnObj.html);
                        self.initClickRemove($('.'+self.plugin +'_connected_accounts_wrap').last());
                        self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
                    }
                };
                sbAjax(submitData,onSuccess);
            }
        },
        initClickRemove: function(el) {
            var self = this;
            el.find('.'+this.plugin +'_delete_account').on('click',function() {
                if (!$(this).closest('.'+self.plugin +'_connected_accounts_wrap').hasClass(self.plugin +'-waiting')) {
                    $(this).closest('.'+self.plugin +'_connected_accounts_wrap').addClass(self.plugin +'-waiting');
                    var $connectedAccount = $(this).closest('.'+self.plugin +'_connected_account'),
                        accountID = $connectedAccount.attr('data-userid');

                    if (window.confirm("Delete this connected account?")) {
                        $('#'+self.plugin +'_user_feed_id_' + accountID).remove();
                        $('#'+self.plugin +'_connected_account_' + accountID).append('<div class="spinner" style="margin-top: -10px;visibility: visible;top: 50%;position: absolute;right: 50%;"></div>').find('.'+self.plugin +'_ca_info').css('opacity','.5');

                        var submitData = {
                            'account_id' : accountID,
                            'action' : self.getAction( 'ca_after_remove_clicked' ),
                            'sbspf_nonce' : sbspf.nonce
                        };
                        var onSuccess = function (data) {
                            if (data.trim().indexOf('{') === 0) {
                                var returnObj = JSON.parse(data.trim());
                                $('.'+self.plugin +'-waiting').removeClass(self.plugin +'-waiting');
                                $connectedAccount.fadeOut(300, function() { $(this).remove(); });
                                self.afterConnectedAccountRemoved(accountID);
                            }
                        };
                        sbAjax(submitData,onSuccess);
                    } else {
                        $('.'+self.plugin +'-waiting').removeClass(self.plugin +'-waiting');
                    }
                }

            });
        },
        initInfoToggle: function(el) {
            var self = this;
            el.find('.'+self.plugin +'_ca_show_token').off().on('click',function() {
                $(this).closest('.'+self.plugin +'_ca_info').find('.'+self.plugin +'_ca_accesstoken').slideToggle(200);
            });

            el.find('.'+self.plugin +'_ca_token_shortcode').off().on('click',function() {
                $(this).closest('.'+self.plugin +'_ca_info').find('.'+self.plugin +'_ca_shortcode').slideToggle(200);
            });
        },
        initAppCredToggle: function() {
            var self = this;
            $('#'+self.plugin +'_have_own_tokens').on('click',function() {
                if ($(this).is(':checked')) {
                    $(this).closest('form').find('.'+self.plugin +'_own_credentials_wrap').slideDown();
                } else {
                    $(this).closest('form').find('.'+self.plugin +'_own_credentials_wrap').slideUp();
                }
            });

            if ($('#'+self.plugin +'_have_own_tokens').is(':checked')) {
                $('#'+self.plugin +'_have_own_tokens').closest('form').find('.'+self.plugin +'_own_credentials_wrap').slideDown();
            } else {
                $('#'+self.plugin +'_have_own_tokens').closest('form').find('.'+self.plugin +'_own_credentials_wrap').slideUp();
            }
        },
        initWidthResponsiveToggle: function() {
            //Mobile width
            var feedWidth = $('#sby_settings_width').length ? $('#sby_settings_width').val() : '100',
                widthUnit = $('#sby_settings_widthunit').length ? $('#sby_settings_widthunit').val() : '%',
                $widthOptions = $('#sbspf_width_options');

            if ($('#sby_settings_widthunit').length) {

                //Show initially if a width is set
                if (feedWidth !== '100' && widthUnit === '%') {
                    $widthOptions.slideDown();
                } else {
                    $widthOptions.slideUp();
                }

                $('#sby_settings_width_unit, #sby_settings_width').on('change',function(){
                    feedWidth = $('#sby_settings_width').length ? $('#sby_settings_width').val() : '100';
                    widthUnit = $('#sby_settings_widthunit').length ? $('#sby_settings_widthunit').val() : '%';

                    if (feedWidth !== '100' && widthUnit === '%') {
                        $widthOptions.slideDown();
                    } else {
                        $widthOptions.slideUp();
                    }

                });

            }
        },
        initActionButtons: function() {
            $('#sbspf_admin .sbspf-button-action').each(function(){
                $(this).on('click',function() {
                    event.preventDefault();
                    $(this).next('.sbspf_success').remove();

                    var doAction = typeof $(this).attr('data-sby-action') !== 'undefined' ? $(this).attr('data-sby-action') : '',
                        confirmMessage = typeof $(this).attr('data-sby-confirm') !== 'undefined' ? $(this).attr('data-sby-confirm') : false,
                        $targetWaitingEl = typeof $(this).attr('data-sby-waiter') !== 'undefined' ? $($(this).attr('data-sby-waiter')) : $(this),
                        $self = $(this);
                    if (!confirmMessage || window.confirm(confirmMessage)) {
                        $(this).prop('disabled',true);
                        $targetWaitingEl.after('<div class="spinner sbspf_spinner" style="display:inline-block;visibility: visible;"></div>');

                        var submitData = {
                            'action' : doAction,
                            'sbspf_nonce' : sbspf.nonce
                        };
                        var onSuccess = function (data) {
                            $self.prop('disabled',false);
                            $targetWaitingEl.next('.spinner').fadeOut('slow',function(){
                                $targetWaitingEl.after('<span class="sbspf_success"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" class=""></path></svg></span>');
                            });

                            if (data.trim().indexOf('{') === 0) {
                                var returnObj = JSON.parse(data.trim());
                                console.log(returnObj);

                            }
                        };
                        sbAjax(submitData,onSuccess);
                    } else {
                        $('.'+self.plugin +'-waiting').removeClass(self.plugin +'-waiting');
                    }
                });
            });
        },
        getAction(action) {
            return self.plugin + '_' + action
        },
        addManualAccessTokenListener: function() {
            var self = this,
                id = '#'+this.plugin,
                cla = '.'+this.plugin;

            $(cla+'_manually_connect_wrap').hide();
            $(cla+'_manually_connect').on('click',function(event) {
                event.preventDefault();
                if ( $(cla+'_manually_connect_wrap').is(':visible') ) {
                    $(cla+'_manually_connect_wrap').slideUp(200);
                } else {
                    $(cla+'_manually_connect_wrap').slideDown(200);
                }
            });

            $(id+'_manual_submit').on('click',function(event) {
                event.preventDefault();
                var $self = $(this);
                var accessToken = $(id+'_manual_at').val(),
                    error = false;

                if (accessToken.length < 15) {
                    if (!$(cla+'_manually_connect_wrap').find(cla+'_user_id_error').length) {
                        $(cla+'_manually_connect_wrap').show().prepend('<div class="'+self.plugin+'_user_id_error" style="display:block;">Please enter a valid access token</div>');
                    }
                } else if (! error) {
                    $(this).prop('disabled',true);
                    $(this).closest(cla+'_manually_connect_wrap').fadeOut();
                    $(cla+'_connected_accounts_wrap').fadeTo("slow" , 0.5).find(cla+'_user_id_error').remove();

                    var submitData = {
                        'access_token' : accessToken,
                        'action' : self.plugin + '_process_access_token',
                        'sbspf_nonce' : sbspf.nonce
                    };
                    var onSuccess = function (data) {
                        $(cla+'_connected_accounts_wrap').fadeTo("slow" , 1);
                        $self.prop('disabled',false);
                        var returnObj = JSON.parse(data.trim());
                        $('.'+self.plugin +'_connected_accounts_wrap').prepend(returnObj.html);
                        self.initClickRemove($('.'+self.plugin +'_connected_accounts_wrap').last());
                        self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
                    };
                    sbAjax(submitData,onSuccess);
                }

            });
        },
        afterConnectedAccountRemoved: function(accountID) {

        },
        updateLayoutOptionsDisplay: function() {
            self = this;
            setTimeout(function(){
                $('.'+self.plugin+'_layout_settings').hide();
                $('.'+self.plugin+'_layout_settings.'+self.plugin+'_layout_type_'+$('.'+self.plugin+'_layout_type:checked').val()).show();
            }, 1);
        },
        updateBoxSelectionDisplay: function() {
            self = this;
            setTimeout(function(){
                $('.'+self.plugin+'_sub_option_settings').hide();
                $('.'+self.plugin+'_sub_option_settings.'+self.plugin+'_sub_option_type_'+$('.'+self.plugin+'_sub_option_type:checked').val()).show();
            }, 1);
        },
        updateFeedWidthDisplay: function() {
            self = this;
            var sbspfFeedWidth = $('#'+self.plugin+'_admin '+'#'+self.plugin+'_settings_width').val(),
                sbspfWidthUnit = $('#'+self.plugin+'_admin '+'#'+self.plugin+'_settings_width_unit').val(),
                $sbspfWidthOptions = $('#'+self.plugin+'_admin '+'#'+self.plugin+'_width_options');

            if( sbspfFeedWidth.length < 2 || (sbspfFeedWidth == '100' && sbspfWidthUnit == '%') ) {
                $sbspfWidthOptions.slideUp();
            } else {
                $sbspfWidthOptions.slideDown();
            }
        },
        updateOnSelect: function($changed) {
            this.$adminEl.find('.sbspf_type_input').each(function() {
                if ($(this).is(':checked')) {
                    $(this).closest('.sbspf_type_row').find('.sbspf_onselect').show();
                } else {
                    $(this).closest('.sbspf_type_row').find('.sbspf_onselect').hide();
                }
            });
            //console.log($changed.is(':checked'),$changed.closest('.sbspf_type_row').find('.sbspf_onselect').length)

        },
        encodeHTML: function(raw) {
            // make sure passed variable is defined
            if (typeof raw === 'undefined') {
                return '';
            }
            // replace greater than and less than symbols with html entity to disallow html in comments
            var encoded = raw.replace(/(>)/g,'&gt;'),
                encoded = encoded.replace(/(<)/g,'&lt;');
            encoded = encoded.replace(/(&lt;br\/&gt;)/g,'<br>');
            encoded = encoded.replace(/(&lt;br&gt;)/g,'<br>');

            return encoded;
        },
    };

    window.sbspf_admin_init = function() {
        var plugin = typeof $('.sbspf-admin').attr('data-sb-plugin') !== 'undefined' ? $('.sbspf-admin').attr('data-sb-plugin') : 'sbspf',
            $adminEl = $('#sbspf_admin.sby_admin');
        window.sb = new SbspfAdmin(plugin,$adminEl);
        window.sb.init();
    };

    function sbAjax(submitData,onSuccess) {
        $.ajax({
            url: sbspf.ajaxUrl,
            type: 'post',
            data: submitData,
            success: onSuccess
        });
    }

    function SbYoutubeAdmin(plugin,$adminEl) {
        SbspfAdmin.call(this, plugin,$adminEl);
        this.afterInit = function() {
            var self = this,
                id = '#'+this.plugin,
                cla = '.'+this.plugin;

            // notices

            if (jQuery('#sbspf-notice-bar').length) {
                jQuery('#wpadminbar').after(jQuery('#sbspf-notice-bar'));
                jQuery('#wpcontent').css('padding-left', 0);
                jQuery('#wpbody').css('padding-left', '20px');
                jQuery('#sbspf-notice-bar').show();
            }

            jQuery('#sbspf-notice-bar .dismiss').on('click',function(e) {
                e.preventDefault();
                jQuery('#sbspf-notice-bar').remove();
                var submitData = {
                    'action' : 'sby_lite_dismiss',
                    'sbspf_nonce' : sbspf.nonce
                };
                var onSuccess = function (data) {
                };
                sbAjax(submitData,onSuccess);
            });

            $('#sbspf_usecustomsearch').on('change',function() {
                if ($(this).is(':checked')) {
                    $('#sbspf_usecustomsearch_reveal').show();
                } else {
                    $('#sbspf_usecustomsearch_reveal').hide();
                }
            });

            if ($('#sbspf_usecustomsearch').is(':checked')) {
                $('#sbspf_usecustomsearch_reveal').show();
            } else {
                $('#sbspf_usecustomsearch_reveal').hide();
            }


            $('.sbspf_dismiss_button').on('click',function() {
                event.preventDefault();
                $('#sbspf_modal_overlay').remove();
                var submitData = {
                    'action' : $(this).attr('data-action')
                };
                sbAjax(submitData,function() {});
            });

            $('.sbspf_dismiss_at_warning_button').on('click',function() {
                event.preventDefault();
                $('#sbspf_modal_overlay').remove();
                var submitData = {
                    'action' : $(this).attr('data-action')
                };
                sbAjax(submitData,function() {});
            });

            $('.sby_api_key_needed').each(function() {
                $(this).find('label').append('<span class="sby_api_key_needed_message"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-key fa-w-16"><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" class=""></path></svg> API Key Needed</span>');
            });

            var proJustHoverHTML = '<a href="https://smashballoon.com/youtube-feed/?utm_source=plugin-free&amp;utm_campaign=sby" target="_blank" class="sbspf_lock sbspf_pro_lock"><i class="fa fa-rocket"></i>Pro</a>',
                proLockHTML = '<p class="sbspf_pro_tooltip" style="display: none;">Upgrade to the Pro version to unlock this feature<i class="fa fa-caret-down" aria-hidden="true"></i></p>' + proJustHoverHTML,
                proAvailableHTML = '<span class="sbspf_note"> - <a href="https://smashballoon.com/youtube-feed/?utm_source=plugin-free&amp;utm_campaign=sby" target="_blank">Available in Pro version</a></span>';

            $('.sbspf_pro_only').each(function() {
                if (jQuery(this).closest('td').find('.sbspf_sub_options').length) {
                    if (!jQuery(this).closest('td').find('.sbspf_lock').length) {
                        jQuery(this).closest('td').find('.sbspf_sub_options').append(proLockHTML);
                    }
                    jQuery(this).closest('td').find('input,select,textarea').each(function() {
                        if (typeof jQuery(this).attr('name') !== 'undefined') {
                            jQuery(this).attr('name',jQuery(this).attr('name').replace('sb','demosb'));
                        }
                    });
                    if (jQuery(this).html() === '') {
                        jQuery(this).closest('tr').addClass('sbspf_pro_only_row');
                        if (jQuery(this).html() === '') {
                            jQuery(this).remove();
                        }
                    }
                } else if (jQuery(this).hasClass('sbspf_layout_cell')) {
                    if (!jQuery(this).find('.sbspf_lock').length) {
                        jQuery(this).append(proJustHoverHTML);
                        jQuery(this).find('img').css('opacity', .4);
                    }
                } else if (jQuery(this).hasClass('sbspf_layout_settings')){
                    if (!jQuery(this).find('.sbspf_lock').length) {
                        jQuery(this).find('.sbspf_layout_setting').first().append('<span class="sbspf_note"><a href="https://smashballoon.com/youtube-feed/?utm_source=plugin-free&amp;utm_campaign=sby" target="_blank">Upgrade to Pro to enable the carousel layout</a></span>');
                        jQuery(this).find('input,select,textarea').prop('disabled',true);
                    }
                } else {
                    if (jQuery(this).closest('td').find('.sbspf_single_checkbox').length
                        && ! jQuery(this).closest('td').find('.sbspf_lock').length){
                        jQuery(this).closest('tr').addClass('sbspf_pro_only_row');
                        jQuery(this).closest('tr').find('.sbspf_single_checkbox').next('label').after(proAvailableHTML);
                        if (jQuery(this).html() === '') {
                            jQuery(this).remove();
                        }
                    } else if (jQuery(this).closest('td').find('select.sbspf_pro_only').length
                        && ! jQuery(this).closest('td').find('.sbspf_lock').length){
                        jQuery(this).closest('tr').addClass('sbspf_pro_only_row');
                        jQuery(this).closest('tr').find('select.sbspf_pro_only').after(proAvailableHTML);
                        if (jQuery(this).html() === '') {
                            jQuery(this).remove();
                        }
                    }else if (jQuery(this).find('input[type=checkbox]').length) {
                        var $closestTD = jQuery(this).closest('td');
                        jQuery(this).find('input').prop('disabled',true);
                        if (jQuery(this).find('input').is(':checked')) {
                            var $clone = jQuery(this).find('input').clone();
                            $clone.prop('disabled',false).removeAttr('checked').attr('type','hidden');
                            jQuery(this).append($clone);
                        }
                        jQuery(this).find('input').removeAttr('checked');
                        if (!$closestTD.find('.sbspf_disabled_wrap').length) {
                            $closestTD.append('<div class="sbspf_disabled_wrap sby_includes_pro_only"></div>');
                            $closestTD.find('.sby_includes_pro_only').append('<span class="sbspf_note"><a href="https://smashballoon.com/youtube-feed/?utm_source=plugin-free&amp;utm_campaign=sby" target="_blank">Upgrade to Pro to display video descriptions, dates, statistics, live streaming information, and more.</a></span>');
                        }
                    }

                }
            });

            var $closestTD = $('.sbspf_row.sbspf_type_row').first().closest('td');
            $closestTD.append('<div class="sbspf_disabled_wrap sby_types_disabled_wrap">'+proLockHTML+'</div>');

            $('.sbspf_type_row').each(function() {
                if ($(this).find('.sbspf_type_input').attr('value') !== 'channel') {
                    $('.sbspf_disabled_wrap').append($(this));
                    $(this).find('input').prop('disabled',true);
                } else {
                    $(this).find('input').prop('disabled',false);
                }
            });

            $('.sbspf_pro_section').each(function() {
                if ($(this).find('.sbspf_pro_reveal').length) {
                    $(this).find('h2').first().after($(this).find('.sbspf_pro_reveal'));
                    $(this).find('tr').addClass('sbspf_pro_only_row');
                    var $table = $(this).find('table');
                    $table.hide();
                    $(this).find('.sbspf-show-pro').on('click',function(event){
                        event.preventDefault();
                        $table.toggle();
                    });
                    jQuery(this).find('input,select,textarea').each(function() {
                        if (typeof jQuery(this).attr('name') !== 'undefined') {
                            jQuery(this).attr('name',jQuery(this).attr('name').replace('sb','demosb'));
                        }
                    });
                }
            });

            jQuery('.sbspf_pro_lock').hover(function(){
                jQuery(this).siblings('.sbspf_pro_tooltip').show();
            }, function(){
                jQuery('.sbspf_pro_tooltip').hide();
            });

            if (typeof $('#sbspf_get_token').attr('data-show-warning') !== 'undefined') {
                $('#sbspf_get_token').on('click',function(event) {
                    event.preventDefault();
                    var html = self.getModal();
                    $('#sbspf_admin').append(html);
                    $('#sbspf_admin').find('.sbspf_modal_close').on('click',function() {
                        $('#sbspf_admin').find('#sbspf_modal_overlay').remove();
                    });

                    var submitData = {
                        'action' : 'sby_dismiss_connect_warning_button'
                    };
                    sbAjax(submitData,function() {});
                })
            }

            jQuery('.sbspf_show_gdpr_list').on('click', function(){
                jQuery(this).closest('div').find('.sbspf_gdpr_list').slideToggle();
            });

            //Selecting a post style
            jQuery('#sbspf_gdpr_setting').on('change', function(){
                sbspfCheckGdprSetting( jQuery(this).val() );
            });
            function sbspfCheckGdprSetting(option) {
                if( option == 'yes' ){
                    jQuery('.sbspf_gdpr_yes,#sbspf_images_options').show();
                    jQuery('.sbspf_gdpr_no, .sbspf_gdpr_auto').hide();
                }
                if( option == 'no' ){
                    jQuery('.sbspf_gdpr_no').show();
                    jQuery('.sbspf_gdpr_yes, .sbspf_gdpr_auto, #sbspf_images_options').hide();
                }
                if( option == 'auto' ){
                    jQuery('.sbspf_gdpr_auto').show();
                    jQuery('.sbspf_gdpr_yes, .sbspf_gdpr_no').hide();
                    if (jQuery('.sbspf_gdpr_plugin_active').length) {
                        jQuery('#sbspf_images_options').show();
                    } else {
                        jQuery('#sbspf_images_options').hide();
                    }
                }
            }
            sbspfCheckGdprSetting(jQuery('#sbspf_gdpr_setting').val());

            // Locator
            jQuery('.sby-locator-more').on('click',function(e) {
                e.preventDefault();
                jQuery(this).closest('td').find('.sby-full-wrap').show();
                jQuery(this).closest('td').find('.sby-condensed-wrap').hide();
                jQuery(this).remove();
            });

        };

        this.toggleCustomDateField = function() {
            if ($('#sby_settings_dateformat').val() === 'custom') {
                $('.sby_customdate_wrap').slideDown();
            } else {
                $('.sby_customdate_wrap').slideUp();
            }
        };

        this.toggleAPIKeyWarnings = function() {
            if ($('#sby_api_key').val() !== '') {
                if ($('.sby_disabled_wrap').length) {
                    var $closestTD = $('.sbspf_row.sbspf_type_row').first().closest('td');
                    $('.sbspf_type_row').each(function() {
                        if ($(this).find('.sbspf_type_input').attr('value') !== 'channel') {
                            $closestTD.append($(this));
                            $(this).find('input').prop('disabled',false);
                        }
                    });
                    $('.sby_disabled_wrap').remove();
                }


            } else if (!$('.sby_disabled_wrap').length) {
                var $closestTD = $('.sbspf_row.sbspf_type_row').first().closest('td');
                $closestTD.append('<div class="sby_disabled_wrap sbspf_fade"><div class="sbspf_lock"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-key fa-w-16"><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" class=""></path></svg>API Key Needed</div></div>');

                $('.sbspf_type_row').each(function() {
                    if ($(this).find('.sbspf_type_input').attr('value') !== 'channel') {
                        $('.sby_disabled_wrap').append($(this));
                        $(this).find('input').prop('disabled',true);
                    } else {
                        $(this).find('input').prop('disabled',false);
                    }
                });
            }

        };

        this.getModal = function () {

            var modal = '<div id="sbspf_modal_overlay">' +
                '<div class="sbspf_modal">' +
                '<div class="sbspf_modal_message">' +
                '            <div class="sby_before_connection">' +
                '                <p>The Feeds for YouTube plugin requires <strong>"read only"</strong> access to your YouTube account in order to retrieve data from the YouTube API.</p>' +
                '                <p><strong>Please note:</strong> The plugin is only able to read public data from your account and cannot be used to edit or write to your YouTube account in any way.</p>' +
                '                <p class="sbspf_submit">' +
                '                    <a href="'+$('#sbspf_get_token').attr('href')+'" class="button button-primary sbspf_dismiss_connect_warning_button" data-action="sby_dismiss_connect_warning_notice">Continue</a>' +
                '                </p>' +
                '                <a href="JavaScript:void(0);" class="sbspf_modal_close sbspf_dismiss_connect_warning_button" data-action="sby_dismiss_connect_warning_notice"><i class="fa fa-times"></i></a>' +
                '' +
                '            </div>' +
                '</div>' +
                '' +
                '</div>' +
                '</div>';

            return modal;
        };

        this.toggleAccessTokenDisclaimer = function () {
            var self = this;
            if ($('.sby_account_just_added').length) {
                $('.sby_api_needed').remove();
                $('.sby_after_connection').show();
            } else {
                $('.sby_after_connection').remove();
                $('.sby_api_needed').show();
            }
        };

        this.addAccessTokenListener = function () {
            var self = this;
            if (window.location.hash.length > 5 && window.location.hash.indexOf(this.accesstokenSplitter) > -1) {
                var accessToken = window.location.hash.split(this.accesstokenSplitter);
                // clear access token from hash
                window.location.hash = '';
                var submitData = {
                    'access_token' : accessToken[1],
                    'action' : 'sby_process_access_token',
                    'sbspf_nonce' : sbspf.nonce
                };
                var onSuccess = function (data) {
                    if (data.trim().indexOf('{') === 0) {
                        var returnObj = JSON.parse(data.trim());
                        $('.'+self.plugin +'_connected_accounts_wrap').prepend(returnObj.html);
                        self.initClickRemove($('.'+self.plugin +'_connected_accounts_wrap').last());
                        self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
                    }
                };
                sbAjax(submitData,onSuccess);
            }
        };

        this.addManualAccessTokenListener = function() {
            var self = this,
                id = '#'+this.plugin,
                cla = '.'+this.plugin;

            $(cla+'_manually_connect_wrap').hide();
            $(cla+'_manually_connect').on('click',function(event) {
                event.preventDefault();
                if ( $(cla+'_manually_connect_wrap').is(':visible') ) {
                    $(cla+'_manually_connect_wrap').slideUp(200);
                } else {
                    $(cla+'_manually_connect_wrap').slideDown(200);
                }
            });

            $(id+'_manual_submit').on('click',function(event) {
                event.preventDefault();
                var $self = $(this);
                var accessToken = $(id+'_manual_at').val(),
                    refreshToken = $(id+'_manual_rt').val(),
                    error = false;

                if (accessToken.length < 15) {
                    if (!$(cla+'_manually_connect_wrap').find(cla+'_user_id_error').length) {
                        $(cla+'_manually_connect_wrap').show().prepend('<div class="'+self.plugin+'_user_id_error" style="display:block;">Please enter a valid access token</div>');
                    }
                } else if (! error) {
                    $(this).prop('disabled',true);
                    $(this).closest(cla+'_manually_connect_wrap').fadeOut();
                    $(cla+'_connected_accounts_wrap').fadeTo("slow" , 0.5).find(cla+'_user_id_error').remove();

                    var submitData = {
                        'sby_access_token' : accessToken,
                        'sby_refresh_token' : refreshToken,
                        'action' : 'sby_process_access_token',
                        'sbspf_nonce' : sbspf.nonce
                    };
                    var onSuccess = function (data) {
                        $(cla+'_connected_accounts_wrap').fadeTo("slow" , 1);
                        $self.prop('disabled',false);
                        if (data.trim().indexOf('{') === 0) {
                            var returnObj = JSON.parse(data.trim());
                            if (typeof returnObj.error === 'undefined') {
                                if (!$('#sbspf_connected_account_'+returnObj.account_id).length) {
                                    $('.'+self.plugin +'_connected_accounts_wrap').prepend(returnObj.html);
                                    self.initClickRemove($('.'+self.plugin +'_connected_accounts_wrap').last());
                                    self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
                                    console.log('added');
                                } else {
                                    $('#sbspf_connected_account_'+returnObj.account_id).replaceWith(returnObj.html);
                                    self.initClickRemove($('#sbspf_connected_account_'+returnObj.account_id));
                                    self.initInfoToggle($('#sbspf_connected_account_'+returnObj.account_id));
                                    console.log('updated');
                                }
                            } else {
                                alert(returnObj.error);
                            }
                        }

                    };
                    sbAjax(submitData,onSuccess);
                }

            });
        };
        this.addManualAccessTokenListener = function() {
            var self = this,
                id = '#'+this.plugin,
                cla = '.'+this.plugin;

            $(cla+'_manually_connect_wrap').hide();
            $(cla+'_manually_connect').on('click',function(event) {
                event.preventDefault();
                if ( $(cla+'_manually_connect_wrap').is(':visible') ) {
                    $(cla+'_manually_connect_wrap').slideUp(200);
                } else {
                    $(cla+'_manually_connect_wrap').slideDown(200);
                }
            });

            $(id+'_manual_submit').on('click',function(event) {
                event.preventDefault();
                var $self = $(this);
                var accessToken = $(id+'_manual_at').val(),
                    refreshToken = $(id+'_manual_rt').val(),
                    error = false;

                if (accessToken.length < 15) {
                    if (!$(cla+'_manually_connect_wrap').find(cla+'_user_id_error').length) {
                        $(cla+'_manually_connect_wrap').show().prepend('<div class="'+self.plugin+'_user_id_error" style="display:block;">Please enter a valid access token</div>');
                    }
                } else if (! error) {
                    $(this).prop('disabled',true);
                    $(this).closest(cla+'_manually_connect_wrap').fadeOut();
                    $(cla+'_connected_accounts_wrap').fadeTo("slow" , 0.5).find(cla+'_user_id_error').remove();

                    var submitData = {
                        'sby_access_token' : accessToken,
                        'sby_refresh_token' : refreshToken,
                        'action' : 'sby_process_access_token',
                        'sbspf_nonce' : sbspf.nonce
                    };
                    var onSuccess = function (data) {
                        $(cla+'_connected_accounts_wrap').fadeTo("slow" , 1);
                        $self.prop('disabled',false);
                        if (data.trim().indexOf('{') === 0) {
                            var returnObj = JSON.parse(data.trim());
                            if (typeof returnObj.error === 'undefined') {
                                if (!$('#sbspf_connected_account_'+returnObj.account_id).length) {
                                    $('.'+self.plugin +'_connected_accounts_wrap').prepend(returnObj.html);
                                    self.initClickRemove($('.'+self.plugin +'_connected_accounts_wrap').last());
                                    self.initInfoToggle($('.'+self.plugin +'_connected_accounts_wrap').last());
                                } else {
                                    $('#sbspf_connected_account_'+returnObj.account_id).replaceWith(returnObj.html);
                                    self.initClickRemove($('#sbspf_connected_account_'+returnObj.account_id));
                                    self.initInfoToggle($('#sbspf_connected_account_'+returnObj.account_id));
                                }
                            } else {
                                alert(returnObj.error);
                            }
                        }

                        self.toggleAccessTokenDisclaimer();
                        $('.sbspf_dismiss_at_warning_button').on('click',function() {
                            event.preventDefault();
                            $('#sbspf_modal_overlay').remove();
                            var submitData = {
                                'action' : $(this).attr('data-action')
                            };
                            sbAjax(submitData,function() {});
                        });

                    };
                    sbAjax(submitData,onSuccess);
                }

            });
        };
        this.getAction = function(action) {
            return 'sby_' + action;
        };


    }

    SbYoutubeAdmin.prototype = Object.create(SbspfAdmin.prototype);


    window.sby_admin_init = function() {
        var plugin = typeof $('.sbspf-admin').attr('data-sb-plugin') !== 'undefined' ? $('.sbspf-admin').attr('data-sb-plugin') : 'sbspf',
            $adminEl = $('#sbspf_admin.sby_admin');
        window.sb = new SbYoutubeAdmin(plugin,$adminEl);
        window.sb.init();
    };

})(jQuery);

jQuery(document).ready(function($) {
    sby_admin_init();
});