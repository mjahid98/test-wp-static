var sby_js_exists = (typeof sby_js_exists !== 'undefined') ? true : false;
if(!sby_js_exists) {

    //Checks whether browser support HTML5 video element
    function sby_supports_video() {
        return !!document.createElement('video').canPlayType;
    }

    (function($){

        function sbyAddImgLiquid() {
            /*! imgLiquid v0.9.944 / 03-05-2013 https://github.com/karacas/imgLiquid */
            var sby_imgLiquid = sby_imgLiquid || {VER: "0.9.944"};
            sby_imgLiquid.bgs_Available = !1, sby_imgLiquid.bgs_CheckRunned = !1, function (i) {
                function t() {
                    if (!sby_imgLiquid.bgs_CheckRunned) {
                        sby_imgLiquid.bgs_CheckRunned = !0;
                        var t = i('<span style="background-size:cover" />');
                        i("body").append(t), !function () {
                            var i = t[0];
                            if (i && window.getComputedStyle) {
                                var e = window.getComputedStyle(i, null);
                                e && e.backgroundSize && (sby_imgLiquid.bgs_Available = "cover" === e.backgroundSize)
                            }
                        }(), t.remove()
                    }
                }

                i.fn.extend({
                    sby_imgLiquid: function (e) {
                        this.defaults = {
                            fill: !0,
                            verticalAlign: "center",
                            horizontalAlign: "center",
                            useBackgroundSize: !0,
                            useDataHtmlAttr: !0,
                            responsive: !0,
                            delay: 0,
                            fadeInTime: 0,
                            removeBoxBackground: !0,
                            hardPixels: !0,
                            responsiveCheckTime: 500,
                            timecheckvisibility: 500,
                            onStart: null,
                            onFinish: null,
                            onItemStart: null,
                            onItemFinish: null,
                            onItemError: null
                        }, t();
                        var a = this;
                        return this.options = e, this.settings = i.extend({}, this.defaults, this.options), this.settings.onStart && this.settings.onStart(), this.each(function (t) {
                            function e() {
                                -1 === u.css("background-image").indexOf(encodeURI(c.attr("src"))) && u.css({"background-image": 'url("' + encodeURI(c.attr("src")) + '")'}), u.css({
                                    "background-size": g.fill ? "cover" : "contain",
                                    "background-position": (g.horizontalAlign + " " + g.verticalAlign).toLowerCase(),
                                    "background-repeat": "no-repeat"
                                }), i("a:first", u).css({
                                    display: "block",
                                    width: "100%",
                                    height: "100%"
                                }), i("img", u).css({display: "none"}), g.onItemFinish && g.onItemFinish(t, u, c), u.addClass("sby_imgLiquid_bgSize"), u.addClass("sby_imgLiquid_ready"), l()
                            }

                            function o() {
                                function e() {
                                    c.data("sby_imgLiquid_error") || c.data("sby_imgLiquid_loaded") || c.data("sby_imgLiquid_oldProcessed") || (u.is(":visible") && c[0].complete && c[0].width > 0 && c[0].height > 0 ? (c.data("sby_imgLiquid_loaded", !0), setTimeout(r, t * g.delay)) : setTimeout(e, g.timecheckvisibility))
                                }

                                if (c.data("oldSrc") && c.data("oldSrc") !== c.attr("src")) {
                                    var a = c.clone().removeAttr("style");
                                    return a.data("sby_imgLiquid_settings", c.data("sby_imgLiquid_settings")), c.parent().prepend(a), c.remove(), c = a, c[0].width = 0, void setTimeout(o, 10)
                                }
                                return c.data("sby_imgLiquid_oldProcessed") ? void r() : (c.data("sby_imgLiquid_oldProcessed", !1), c.data("oldSrc", c.attr("src")), i("img:not(:first)", u).css("display", "none"), u.css({overflow: "hidden"}), c.fadeTo(0, 0).removeAttr("width").removeAttr("height").css({
                                    visibility: "visible",
                                    "max-width": "none",
                                    "max-height": "none",
                                    width: "auto",
                                    height: "auto",
                                    display: "block"
                                }), c.on("error", n), c[0].onerror = n, e(), void d())
                            }

                            function d() {
                                (g.responsive || c.data("sby_imgLiquid_oldProcessed")) && c.data("sby_imgLiquid_settings") && (g = c.data("sby_imgLiquid_settings"), u.actualSize = u.get(0).offsetWidth + u.get(0).offsetHeight / 1e4, u.sizeOld && u.actualSize !== u.sizeOld && r(), u.sizeOld = u.actualSize, setTimeout(d, g.responsiveCheckTime))
                            }

                            function n() {
                                c.data("sby_imgLiquid_error", !0), u.addClass("sby_imgLiquid_error"), g.onItemError && g.onItemError(t, u, c), l()
                            }

                            function s() {
                                var i = {};
                                if (a.settings.useDataHtmlAttr) {
                                    var t = u.attr("data-sby_imgLiquid-fill"),
                                        e = u.attr("data-sby_imgLiquid-horizontalAlign"),
                                        o = u.attr("data-sby_imgLiquid-verticalAlign");
                                    ("true" === t || "false" === t) && (i.fill = Boolean("true" === t)), void 0 === e || "left" !== e && "center" !== e && "right" !== e && -1 === e.indexOf("%") || (i.horizontalAlign = e), void 0 === o || "top" !== o && "bottom" !== o && "center" !== o && -1 === o.indexOf("%") || (i.verticalAlign = o)
                                }
                                return sby_imgLiquid.isIE && a.settings.ieFadeInDisabled && (i.fadeInTime = 0), i
                            }

                            function r() {
                                var i, e, a, o, d, n, s, r, m = 0, h = 0, f = u.width(), v = u.height();
                                void 0 === c.data("owidth") && c.data("owidth", c[0].width), void 0 === c.data("oheight") && c.data("oheight", c[0].height), g.fill === f / v >= c.data("owidth") / c.data("oheight") ? (i = "100%", e = "auto", a = Math.floor(f), o = Math.floor(f * (c.data("oheight") / c.data("owidth")))) : (i = "auto", e = "100%", a = Math.floor(v * (c.data("owidth") / c.data("oheight"))), o = Math.floor(v)), d = g.horizontalAlign.toLowerCase(), s = f - a, "left" === d && (h = 0), "center" === d && (h = .5 * s), "right" === d && (h = s), -1 !== d.indexOf("%") && (d = parseInt(d.replace("%", ""), 10), d > 0 && (h = s * d * .01)), n = g.verticalAlign.toLowerCase(), r = v - o, "left" === n && (m = 0), "center" === n && (m = .5 * r), "bottom" === n && (m = r), -1 !== n.indexOf("%") && (n = parseInt(n.replace("%", ""), 10), n > 0 && (m = r * n * .01)), g.hardPixels && (i = a, e = o), c.css({
                                    width: i,
                                    height: e,
                                    "margin-left": Math.floor(h),
                                    "margin-top": Math.floor(m)
                                }), c.data("sby_imgLiquid_oldProcessed") || (c.fadeTo(g.fadeInTime, 1), c.data("sby_imgLiquid_oldProcessed", !0), g.removeBoxBackground && u.css("background-image", "none"), u.addClass("sby_imgLiquid_nobgSize"), u.addClass("sby_imgLiquid_ready")), g.onItemFinish && g.onItemFinish(t, u, c), l()
                            }

                            function l() {
                                t === a.length - 1 && a.settings.onFinish && a.settings.onFinish()
                            }

                            var g = a.settings, u = i(this), c = i("img:first", u);
                            return c.length ? (c.data("sby_imgLiquid_settings") ? (u.removeClass("sby_imgLiquid_error").removeClass("sby_imgLiquid_ready"), g = i.extend({}, c.data("sby_imgLiquid_settings"), a.options)) : g = i.extend({}, a.settings, s()), c.data("sby_imgLiquid_settings", g), g.onItemStart && g.onItemStart(t, u, c), void (sby_imgLiquid.bgs_Available && g.useBackgroundSize ? e() : o())) : void n()
                        })
                    }
                })
            }(jQuery);

            // Use imagefill to set the images as backgrounds so they can be square
            !function () {
                var css = sby_imgLiquid.injectCss,
                    head = document.getElementsByTagName('head')[0],
                    style = document.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                head.appendChild(style);
            }();
        }

        function sbyAddVisibilityListener() {
            /* Detect when element becomes visible. Used for when the feed is initially hidden, in a tab for example. https://github.com/shaunbowe/jquery.visibilityChanged */
            !function (i) {
                var n = {
                    callback: function () {
                    }, runOnLoad: !0, frequency: 100, sbyPreviousVisibility: null
                }, c = {};
                c.sbyCheckVisibility = function (i, n) {
                    if (jQuery.contains(document, i[0])) {
                        var e = n.sbyPreviousVisibility, t = i.is(":visible");
                        n.sbyPreviousVisibility = t, null == e ? n.runOnLoad && n.callback(i, t) : e !== t && n.callback(i, t), setTimeout(function () {
                            c.sbyCheckVisibility(i, n)
                        }, n.frequency)
                    }
                }, i.fn.sbyVisibilityChanged = function (e) {
                    var t = i.extend({}, n, e);
                    return this.each(function () {
                        c.sbyCheckVisibility(i(this), t)
                    })
                }
            }(jQuery);
        }

        function Sby() {
            this.feeds = {};
            this.options = sbyOptions;
            this.isTouch = sbyIsTouch();
        }

        Sby.prototype = {
            createPage: function (createFeeds, createFeedsArgs) {
                if (typeof window.sbyajaxurl === 'undefined' || window.sbyajaxurl.indexOf(window.location.hostname) === -1) {
                    window.sbyajaxurl = window.location.hostname + '/wp-admin/admin-ajax.php';
                }

                $('.sby_no_js_error_message').remove();
                $('.sby_no_js').removeClass('sby_no_js');

                createFeeds(createFeedsArgs);
            },
            maybeAddYTAPI: function() {
                var youtubeScriptId = "sby-youtube-api";
                var youtubeScript = document.getElementById(youtubeScriptId);

                if (youtubeScript === null) {
                    var tag = document.createElement("script");
                    var firstScript = document.getElementsByTagName("script")[0];

                    tag.src = "https://www.youtube.com/iframe_api";
                    tag.id = youtubeScriptId;
                    firstScript.parentNode.insertBefore(tag, firstScript);

                }
            },
            createLightbox: function() {
                var lbBuilder = sbyGetlightboxBuilder();
                var sby_lb_delay = (function () {
                    var sby_timer = 0;
                    return function (sby_callback, sby_ms) {
                        clearTimeout(sby_timer);
                        sby_timer = setTimeout(sby_callback, sby_ms);
                    };
                })();
                jQuery(window).on('resize',function () {
                    sby_lb_delay(function () {
                        lbBuilder.afterResize();
                    }, 200);
                });
                /* Lightbox v2.7.1 by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/ - Heavily modified specifically for this plugin */
                (function() {
                    var a = jQuery,
                        b = function() {
                            function a() {
                                this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
                            }
                            return a.prototype.albumLabel = function(a, b) {
                                return a + " / " + b
                            }, a
                        }(),
                        c = function() {
                            function b(a) {
                                this.options = a, this.album = [], this.currentImageIndex = void 0, this.init()
                            }
                            return b.prototype.init = function() {
                                this.enable(), this.build()
                            }, b.prototype.enable = function() {
                                var b = this;
                                a("body").on("click", "a[data-sby-lightbox]", function(c) {
                                    return b.start(a(c.currentTarget)), !1
                                })
                            }, b.prototype.build = function() {
                                var b = this;
                                a(""+
                                    lbBuilder.template()).appendTo(a("body")), this.$lightbox = a("#sby_lightbox"), this.$overlay = a("#sby_lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".sby_lb-outerContainer"), this.$container = this.$lightbox.find(".sby_lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                                    return b.end(), !1
                                }), jQuery(document).on('click', function(event, b, c) {
                                    //Fade out the lightbox if click anywhere outside of the two elements defined below
                                    if (!jQuery(event.target).closest('.sby_lb-outerContainer').length) {
                                        if (!jQuery(event.target).closest('.sby_lb-dataContainer').length) {
                                            //Fade out lightbox
                                            if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                            jQuery('#sby_lightboxOverlay, #sby_lightbox').fadeOut();
                                        }
                                    }
                                }), this.$lightbox.hide(),
                                    jQuery('#sby_lightboxOverlay').on("click", function(c) {
                                        if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                        return "sby_lightbox" === a(c.target).attr("id") && b.end(), !1
                                    }), this.$lightbox.find(".sby_lb-prev").on("click", function() {

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                    return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                                }), this.$lightbox.find(".sby_lb-container").on("swiperight", function() {

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                    return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
                                }), this.$lightbox.find(".sby_lb-next").on("click", function() {

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                    return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                                }), this.$lightbox.find(".sby_lb-container").on("swipeleft", function() {

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                    return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
                                }), this.$lightbox.find(".sby_lb-loader, .sby_lb-close").on("click", function() {

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }

                                    return b.end(), !1
                                })
                            }, b.prototype.start = function(b) {
                                function c(a) {
                                    d.album.push(lbBuilder.getData(a))
                                }
                                var d = this,
                                    e = a(window);
                                e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
                                    visibility: "hidden"
                                }), this.sizeOverlay(), this.album = [];
                                var f, g = 0,
                                    h = b.attr("data-sby-lightbox");
                                if (h) {
                                    f = a(b.prop("tagName") + '[data-sby-lightbox="' + h + '"]');
                                    for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i)
                                } else if ("lightbox" === b.attr("rel")) c(b);
                                else {
                                    f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
                                    for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j)
                                }
                                var k = e.scrollTop() + this.options.positionFromTop,
                                    l = e.scrollLeft();
                                this.$lightbox.css({
                                    top: k + "px",
                                    left: l + "px"
                                }).fadeIn(this.options.fadeDuration), this.changeImage(g)
                            }, b.prototype.changeImage = function(b) {
                                var c = this;
                                this.disableKeyboardNav();
                                var d = this.$lightbox.find(".sby_lb-image");
                                this.$overlay.fadeIn(this.options.fadeDuration), a(".sby_lb-loader").fadeIn("slow"), this.$lightbox.find(".sby_lb-image, .sby_lb-nav, .sby_lb-prev, .sby_lb-next, .sby_lb-dataContainer, .sby_lb-numbers, .sby_lb-caption").hide(), this.$outerContainer.addClass("animating");
                                var e = new Image;
                                e.onload = function() {
                                    var f, g, h, i, j, k, l;
                                    var sbyArrowWidth = 100;
                                    d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerLeftPadding - c.containerRightPadding - 20 - sbyArrowWidth, i = k - c.containerTopPadding - c.containerBottomPadding - 150, (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
                                }, e.src = this.album[b].link, this.currentImageIndex = b
                            }, b.prototype.sizeOverlay = function() {
                                this.$overlay.width(a(window).width()).height(a(document).height())
                            }, b.prototype.sizeContainer = function(a, b) {
                                function c() {
                                    d.$lightbox.find(".sby_lb-dataContainer").width(g), d.$lightbox.find(".sby_lb-prevLink").height(h), d.$lightbox.find(".sby_lb-nextLink").height(h), d.showImage()
                                }
                                var d = this,
                                    e = this.$outerContainer.outerWidth(),
                                    f = this.$outerContainer.outerHeight(),
                                    g = a + this.containerLeftPadding + this.containerRightPadding,
                                    h = b + this.containerTopPadding + this.containerBottomPadding;
                                e !== g || f !== h ? this.$outerContainer.animate({
                                    width: g,
                                    height: h
                                }, this.options.resizeDuration, "swing", function() {
                                    c()
                                }) : c()
                            }, b.prototype.showImage = function() {
                                this.$lightbox.find(".sby_lb-loader").hide(), this.$lightbox.find(".sby_lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                            }, b.prototype.updateNav = function() {
                                var a = !1;
                                try {
                                    document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                                } catch (b) {}
                                this.$lightbox.find(".sby_lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".sby_lb-prev, .sby_lb-next").css("opacity", "1"), this.$lightbox.find(".sby_lb-prev, .sby_lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".sby_lb-prev").show(), a && this.$lightbox.find(".sby_lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".sby_lb-next").show(), a && this.$lightbox.find(".sby_lb-next").css("opacity", "1"))))
                            }, b.prototype.updateDetails = function() {
                                var b = this;

                                /** NEW PHOTO ACTION **/
                                if(jQuery('iframe.sby_lb-player-loaded').length) {
                                    jQuery('.sby_lb-player-placeholder').replaceWith(jQuery('iframe.sby_lb-player-loaded'));
                                    jQuery('iframe.sby_lb-player-loaded').removeClass('sby_lb-player-loaded').show();
                                }
                                //Switch video when either a new popup or navigating to new one
                                var feed = window.sby.feeds[this.album[this.currentImageIndex].feedIndex];
                                lbBuilder.beforePlayerSetup(this.$lightbox,this.album[this.currentImageIndex],this.currentImageIndex,this.album,feed);

                                if( sby_supports_video() ){
                                    jQuery('#sby_lightbox').removeClass('sby_video_lightbox');
                                    if (feed.settings.consentGiven && this.album[this.currentImageIndex].video.length){
                                        jQuery('.sby_gdpr_notice').remove();

                                        var playerID = 'sby_lb-player';
                                        jQuery('#sby_lightbox').addClass('sby_video_lightbox');

                                        var videoID = this.album[this.currentImageIndex].video,
                                            autoplay = sbyOptions.autoplay;
                                        if (typeof window.sbyLightboxPlayer === 'undefined') {
                                            var args = {
                                                host: window.location.protocol + '//www.youtube-nocookie.com',
                                                videoId: videoID,
                                                playerVars: {
                                                    modestbranding: 1,
                                                    rel: 0,
                                                    autoplay: autoplay
                                                },
                                                events: {
                                                    'onStateChange': function(data) {
                                                        var videoID = data.target.getVideoData()['video_id'];
                                                        feed.afterStateChange(playerID,videoID,data,$('#' + playerID).closest('.sby_video_thumbnail_wrap'));
                                                    }
                                                }
                                            };
                                            feed.maybeAddCTA(playerID);

                                            window.sbyLightboxPlayer = new window.YT.Player(playerID, args);
                                        } else {
                                            window.sbyLightboxPlayer.loadVideoById(videoID);
                                        }

                                        this.$outerContainer.removeClass("animating");
                                        this.$lightbox.find(".sby_lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                                            return b.sizeOverlay()
                                        });

                                        setTimeout(function() {
                                            $('#sby_lightbox .sby_lb-player').css({
                                                'height' : $('#sby_lightbox .sby_lb-outerContainer').height()+'px',
                                                'width' : $('#sby_lightbox .sby_lb-outerContainer').width()+'px',
                                                'top': 0
                                            });
                                        },400);

                                        if (this.$lightbox.find('iframe').length) {
                                            this.$lightbox.find('iframe').attr('title',this.album[this.currentImageIndex].videoTitle);
                                        }
                                    } else {
                                        var fullImage = $('.sby_item[data-video-id=' + this.album[this.currentImageIndex].video+']').find('.sby_video_thumbnail').attr('data-full-res');
                                        $('.sby_lb-image').attr('src',fullImage);
                                        this.$outerContainer.removeClass("animating");
                                        this.$lightbox.find(".sby_lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                                            return b.sizeOverlay()
                                        });
                                        jQuery(".sby_lb-container").prepend('<a href="https://www.youtube.com/watch?v='+this.album[this.currentImageIndex].video+'" target="_blank" rel="noopener noreferrer" class="sby_gdpr_notice"><svg style="color: rgba(255,255,255,1)" class="svg-inline--fa fa-play fa-w-14 sby_playbtn" aria-label="Play" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="play" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></a>');
                                    }
                                    lbBuilder.afterPlayerSetup(this.$lightbox,this.album[this.currentImageIndex],this.currentImageIndex,this.album);

                                    if (this.album.length > 1 && this.options.showImageNumberLabel) {
                                        this.$lightbox.find(".sby_lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast");
                                    } else {
                                        this.$lightbox.find(".sby_lb-number").hide();
                                    }
                                }
                            }, b.prototype.preloadNeighboringImages = function() {
                                if (this.album.length > this.currentImageIndex + 1) {
                                    var a = new Image;
                                    a.src = this.album[this.currentImageIndex + 1].link
                                }
                                if (this.currentImageIndex > 0) {
                                    var b = new Image;
                                    b.src = this.album[this.currentImageIndex - 1].link
                                }
                            }, b.prototype.enableKeyboardNav = function() {
                                a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
                            }, b.prototype.disableKeyboardNav = function() {
                                a(document).off(".keyboard")
                            }, b.prototype.keyboardAction = function(a) {

                                var KEYCODE_ESC        = 27;
                                var KEYCODE_LEFTARROW  = 37;
                                var KEYCODE_RIGHTARROW = 39;

                                var keycode = event.keyCode;
                                var key     = String.fromCharCode(keycode).toLowerCase();
                                if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                                    if( sby_supports_video() ) $('#sby_lightbox video.sby_video')[0].pause();
                                    $('#sby_lightbox iframe').attr('src', '');
                                    this.end();
                                } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                                    if (this.currentImageIndex !== 0) {
                                        this.changeImage(this.currentImageIndex - 1);
                                    } else if (this.options.wrapAround && this.album.length > 1) {
                                        this.changeImage(this.album.length - 1);
                                    }

                                    if( sby_supports_video() ) $('#sby_lightbox video.sby_video')[0].pause();
                                    $('#sby_lightbox iframe').attr('src', '');

                                } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                                    if (this.currentImageIndex !== this.album.length - 1) {
                                        this.changeImage(this.currentImageIndex + 1);
                                    } else if (this.options.wrapAround && this.album.length > 1) {
                                        this.changeImage(0);
                                    }

                                    if (typeof window.sbyLightboxPlayer !== 'undefined') { YT.get('sby_lb-player').pauseVideo(); }
                                }

                            }, b.prototype.end = function() {
                                this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
                                    visibility: "visible"
                                })
                            }, b
                        }();
                    a(function() {
                        {
                            var a = new b;
                            new c(a)

                            //Lightbox hide photo function
                            $('.sby_lightbox_action a').off().on('click', function(){
                                $(this).parent().find('.sby_lightbox_tooltip').toggle();
                            });
                        }
                    })
                }).call(this);
            },
            createFeeds: function (args) {
                window.sby.createLightbox();
                args.whenFeedsCreated(
                    $('.sb_youtube').each(function (index) {
                        $(this).attr('data-sby-index', index + 1);
                        $(this).find('.sby_player').replaceWith('<div id="sby_player'+index+'"></div>');
                        var $self = $(this),
                            flags = typeof $self.attr('data-sby-flags') !== 'undefined' ? $self.attr('data-sby-flags').split(',') : [],
                            general = typeof $self.attr('data-options') !== 'undefined' ? JSON.parse($self.attr('data-options')) : {};
                        if (flags.indexOf('testAjax') > -1) {
                            window.sby.triggeredTest = true;
                            var submitData = {
                                    'action' : 'sby_on_ajax_test_trigger'
                                },
                                onSuccess = function(data) {
                                    console.log('did test');
                                };
                            sbyAjax(submitData,onSuccess)
                        }
                        var feedOptions = {
                            cols : $self.attr('data-cols'),
                            colsmobile : $self.attr('data-colsmobile') !== 'same' ? $self.attr('data-colsmobile') : $self.attr('data-cols'),
                            num : $self.attr('data-num'),
                            imgRes : $self.attr('data-res'),
                            feedID : $self.attr('data-feedid'),
                            postID : typeof $self.attr( 'data-postid' ) !== 'undefind' ? $self.attr( 'data-postid' ) : 'unknown',
                            shortCodeAtts : $self.attr('data-shortcode-atts'),
                            resizingEnabled : (flags.indexOf('resizeDisable') === -1),
                            imageLoadEnabled : (flags.indexOf('imageLoadDisable') === -1),
                            debugEnabled : (flags.indexOf('debug') > -1),
                            favorLocal : (flags.indexOf('favorLocal') > -1),
                            ajaxPostLoad : (flags.indexOf('ajaxPostLoad') > -1),
                            checkWPPosts : (flags.indexOf('checkWPPosts') > -1),
                            cacheAll : (flags.indexOf('cacheAll') > -1),
                            gdpr : (flags.indexOf('gdpr') > -1),
                            consentGiven : (flags.indexOf('gdpr') === -1),
                            noCDN : (flags.indexOf('disablecdn') > -1),
                            lightboxEnabled : typeof $self.attr('data-sby-supports-lightbox') !== 'undefined',
                            locator : (flags.indexOf('locator') > -1),
                            autoMinRes : 1,
                            general : general
                        };

                        window.sby.feeds[index] = sbyGetNewFeed(this, index, feedOptions);
                        if (typeof window.sbyAPIReady !== 'undefined') {
                            window.sby.feeds[index].playerAPIReady = true;
                        }
                        window.sby.feeds[index].setResizedImages();
                        window.sby.feeds[index].init();

                        var evt = jQuery.Event('sbyafterfeedcreate');
                        evt.feed = window.sby.feeds[index];
                        jQuery(window).trigger(evt);

                    })
                );
            },
            afterFeedsCreated: function () {
                // enable header hover action
                $('.sb_instagram_header').each(function () {
                    var $thisHeader = $(this);
                    $thisHeader.find('.sby_header_link').on('mouseenter mouseleave', function(e) {
                        switch(e.type) {
                            case 'mouseenter':
                                $thisHeader.find('.sby_header_img_hover').addClass('sby_fade_in');
                                break;
                            case 'mouseleave':
                                $thisHeader.find('.sby_header_img_hover').removeClass('sby_fade_in');
                                break;
                        }
                    });
                });

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
            urlDetect: function(text) {
                var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                return text.match(urlRegex);
            }
        };

        function SbyFeed(el, index, settings) {
            this.el = el;
            this.index = index;
            this.settings = settings;
            this.placeholderURL = window.sby.options.placeholder;
            if (settings.narrowPlayer) {
                this.placeholderURL = window.sby.options.placeholderNarrow
            }
            this.playerAPIReady = false;
            this.consentGiven = settings.consentGiven;
            this.players = {};
            this.minImageWidth = 0;
            this.imageResolution = 150;
            this.resizedImages = {};
            this.needsResizing = [];
            this.outOfPages = false;
            this.isInitialized = false;
            this.mostRecentlyLoadedPosts = [];
        }

        SbyFeed.prototype = {
            init: function() {
                var feed = this;
                feed.settings.consentGiven = feed.checkConsent();

                if (feed.settings.consentGiven) {
                    window.sby.maybeAddYTAPI();
                }

                if (feed.settings.noCDN && !feed.settings.consentGiven) {
                    if ($(this.el).find('.sb_youtube_header').length) {
                        $(this.el).find('.sb_youtube_header').addClass('sby_no_consent')
                    } else if ($(this.el).prev('.sb_youtube_header').length) {
                        $(this.el).prev('.sb_youtube_header').addClass('sby_no_consent')
                    }
                }
                if ($(this.el).find('#sby_mod_error').length) {
                    $(this.el).prepend($(this.el).find('#sby_mod_error'));
                }
                if (this.settings.ajaxPostLoad) {
                    this.getNewPostSet();
                } else {
                    this.afterInitialImagesLoaded();
                    //Only check the width once the resize event is over
                }
                var sby_delay = (function () {
                    var sby_timer = 0;
                    return function (sby_callback, sby_ms) {
                        clearTimeout(sby_timer);
                        sby_timer = setTimeout(sby_callback, sby_ms);
                    };
                })();
                jQuery(window).on('resize',function () {
                    sby_delay(function () {
                        feed.afterResize();
                    }, 500);
                });
            },
            initLayout: function() {
                this.initGalleryLayout();
                this.initGrid();
            },
            initGalleryLayout: function() {
                var $self = $(this.el),
                    feed = this;
                if ($self.hasClass('sby_layout_gallery') && $self.find('.sby_player_outer_wrap').length) {
                    this.maybeRaiseSingleImageResolution($self.find('.sby_player_outer_wrap'), 0, true);
                    $self.find('.sby_player_outer_wrap .sby_video_thumbnail').off().on('click',function (event) {
                        if ((!feed.settings.lightboxEnabled || (feed.settings.lightboxEnabled && feed.settings.noCDN))
                            && (feed.settings.noCDN || !feed.settings.consentGiven)) {
                            if (typeof $(this).closest('.sby_item').length
                                && typeof $(this).closest('.sby_item').attr('data-video-id') !== 'undefined') {
                                $(this).attr('href','https://www.youtube.com/watch?v='+$(this).closest('.sby_item').attr('data-video-id'));
                            }
                            return;
                        }
                        event.preventDefault();
                        feed.onThumbnailClick($(this), true);

                    });

                    $self.find('.sby_item').first().addClass('sby_current');

                    $self.mouseenter(function() {
                        if (!feed.canCreatePlayer()) {
                            return;
                        }
                        if (!$self.find('.sby_player_outer_wrap iframe').length) {
                            $self.addClass('sby_player_added').find('.sby_player_outer_wrap').addClass('sby_player_loading');
                            $self.find('.sby_player_outer_wrap .sby_video_thumbnail').find('.sby_loader').show().removeClass('sby_hidden');
                            feed.createPlayer('sby_player'+feed.index);
                        } else if (typeof feed.player === 'undefined' && feed.playerEagerLoaded()) {
                            feed.createPlayer('sby_player'+feed.index);
                        }
                    });

                    if (window.sbySemiEagerLoading) {
                        feed.createPlayer('sby_player'+feed.index);
                    }

                    if (feed.settings.noCDN) {
                        $self.find('.sby_player_outer_wrap').append('<div class="sby_play_btn">\n' +
                            '                        <span class="sby_play_btn_bg"></span>\n' +
                            '                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-youtube fa-w-18"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" class=""></path></svg>                    </div>');
                    }

                }
            },
            createPlayer: function(playerID,videoID,autoplay,args) {
                var $self = $(this.el),
                    feed = this;
                videoID = typeof videoID !== 'undefined' ? videoID : this.getVideoID($self.find('.sby_item').first());
                autoplay = typeof autoplay !== 'undefined' ? autoplay : 0;

                if (typeof args === 'undefined') {
                    args = {
                        host: window.location.protocol + '//www.youtube-nocookie.com',
                        videoId: videoID,
                        playerVars: {
                            modestbranding: 1,
                            rel: 0,
                            autoplay: autoplay
                        },
                    }
                }
                if (typeof args.events === 'undefined') {
                    args.events = {
                        'onReady': function () {
                            $self.find('.sby_player_outer_wrap').removeClass('sby_player_loading').find('.sby_video_thumbnail').css('z-index', -1).find('.sby_loader').hide().addClass('sby_hidden');
                            if ($('#' + playerID).length && $('#' + playerID).closest('.sby_video_thumbnail_wrap').find('.sby_video_thumbnail').length) {
                                $('#' + playerID).closest('.sby_video_thumbnail_wrap').find('.sby_video_thumbnail').fadeTo(0, 'slow', function () {
                                    $(this).css('z-index', -1);
                                    $(this).find('.sby_loader').hide().addClass('sby_hidden');
                                    $(this).closest('.sby_item').removeClass('sby_player_loading');
                                });
                            }
                            var evt = jQuery.Event('sbyafterplayerready');
                            evt.feed = feed;
                            evt.player = this;
                            jQuery(window).trigger(evt);
                        },
                        'onStateChange': function(data) {
                            $self.find('.sby_player_outer_wrap').removeClass('sby_player_loading').find('.sby_video_thumbnail').css('z-index', -1).find('.sby_loader').hide().addClass('sby_hidden');
                            feed.afterStateChange(playerID,videoID,data,$('#' + playerID).closest('.sby_video_thumbnail_wrap'));
                            if (data.data !== 1) return;
                            if (typeof feed.players !== 'undefined') {
                                $self.find('.sby_item').each(function() {
                                    var itemVidID = feed.getVideoID($(this));
                                    if ($(this).find('iframe').length && (itemVidID !== videoID)) {
                                        if (typeof feed.players[itemVidID] !== 'undefined' && typeof feed.players[itemVidID].pauseVideo === 'function') {
                                            feed.players[itemVidID].pauseVideo();
                                        }
                                    }
                                });
                            }

                        },
                    }
                }
                if (window.sbyEagerLoading) {
                    var newPlayer = YT.get(playerID);
                } else {
                    var newPlayer = new window.YT.Player(playerID, args);
                }

                this.maybeAddCTA(playerID);

                if ($self.hasClass('sby_layout_list') && typeof this.players[videoID] === 'undefined') {
                    this.players[videoID] = newPlayer;
                } else if (typeof this.player === 'undefined') {
                    this.player = newPlayer;
                }

                var evt = jQuery.Event('sbyafterplayercreated');
                evt.feed = this;
                jQuery(window).trigger(evt);

                return newPlayer;
            },
            afterStateChange: function(playerID,videoID,data,$player) {
            },
            afterInitialImagesLoaded: function() {
                this.initLayout();
                this.loadMoreButtonInit();
                this.hideExtraItemsForWidth();
                this.beforeNewImagesRevealed();
                this.revealNewImages();
                this.afterNewImagesRevealed();
                this.afterFeedSet();
                this.sizePlayer();
                this.sizeItems();
                if (this.settings.consentGiven) {
                    this.applyFullFeatures();
                } else {
                    this.removeFeatures();
                }
            },
            afterResize: function() {
                this.setImageHeight();
                this.setImageResolution();
                this.maybeRaiseImageResolution();
                this.setImageSizeClass();
                this.sizePlayer();
                this.sizeItems();
            },
            afterLoadMoreClicked: function($button) {
                $button.find('.sby_loader').removeClass('sby_hidden');
                $button.find('.sby_btn_text').addClass('sby_hidden');
                $button.closest('.sb_youtube').find('.sby_num_diff_hide').addClass('sby_transition').removeClass('sby_num_diff_hide');
            },
            afterNewImagesLoaded: function() {
                var $self = $(this.el),
                    feed = this;
                this.beforeNewImagesRevealed();
                this.revealNewImages();
                this.afterNewImagesRevealed();
                this.sizePlayer();
                this.sizeItems();
                setTimeout(function () {
                    //Hide the loader in the load more button
                    $self.find('.sby_loader').addClass('sby_hidden');
                    $self.find('.sby_btn_text').removeClass('sby_hidden');
                    feed.maybeRaiseImageResolution();
                }, 500);
                if (this.settings.consentGiven) {
                    this.applyFullFeatures();
                } else {
                    this.removeFeatures();
                }
            },
            beforeNewImagesRevealed: function() {
                this.setImageHeight();
                this.maybeRaiseImageResolution(true);
                this.setImageSizeClass();
            },
            afterFeedSet: function() {

            },
            sizePlayer: function() {
                var $self = $(this.el),
                    feed = this;
                if ($self.hasClass('sby_layout_gallery')) {
                    $playerThumbnail = $self.find('.sby_player_item').find('.sby_player_video_thumbnail');
                    var playerWidth = $playerThumbnail.innerWidth(),
                        newPlayerHeight = Math.floor(playerWidth * 9 / 16);
                    if (feed.settings.narrowPlayer) {
                        newPlayerHeight = Math.floor(playerWidth * 3 / 4);
                    }
                    $playerThumbnail.css('height',newPlayerHeight+'px').css('overflow','hidden');

                } else if ($self.hasClass('sby_layout_list')) {
                    $self.find('.sby_item').each(function(){
                        $playerThumbnail = $(this).find('.sby_item_video_thumbnail');
                        var playerWidth = $playerThumbnail.innerWidth(),
                            newPlayerHeight = Math.floor(playerWidth * 9 / 16);
                        if (feed.settings.narrowPlayer) {
                            newPlayerHeight = Math.floor(playerWidth * 3 / 4);
                        }
                        $playerThumbnail.css('height',newPlayerHeight+'px').css('overflow','hidden');
                    });
                }
            },
            sizeItems: function() {
                var $self = $(this.el),
                    feed = this;
                if (!$self.hasClass('sby_layout_list')) {
                    $self.find('.sby_item').find('.sby_item_video_thumbnail').each(function() {
                        if ($(this).hasClass('sby_imgLiquid_ready')) {
                            var thumbWidth = $(this).innerWidth(),
                                newThumbHeight = Math.floor(thumbWidth * 9 / 16);
                            $(this).css('height',newThumbHeight+'px').css('overflow','hidden');
                        }

                    });
                }
            },
            revealNewImages: function() {
                var $self = $(this.el),
                    feed = this;
                this.applyImageLiquid();

                // Call Custom JS if it exists
                if (typeof sbyCustomJS == 'function') setTimeout(function(){ sbyCustomJS(); }, 100);

                $self.find('.sby-screenreader').find('img').remove();

                $self.find('.sby_item.sby_new').each(function (index) {
                    var $self = jQuery(this);

                    //Photo links
                    //If lightbox is disabled
                    var videoID = $self.attr('data-video-id');

                    if (window.sbyEagerLoading && feed.canCreatePlayer() && $('#sby_player_'+videoID).length) {
                        player = new YT.Player('sby_player_'+videoID, {
                            height: '100',
                            width: '100',
                            videoId: videoID,
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                autoplay: 0
                            },
                            events: {
                                'onStateChange': function(data) {
                                    var videoID = data.target.getVideoData()['video_id'];
                                    if (data.data !== 1) return;
                                    $self.find('.sby_item').each(function() {
                                        var itemVidID = jQuery(this).attr('data-video-id');

                                        if (jQuery(this).find('iframe').length && jQuery(data.target.a).attr('id') !== jQuery(this).find('iframe').attr('id')) {
                                            YT.get('sby_player_'+itemVidID).pauseVideo();
                                        }
                                    });
                                }
                            }
                        });
                    }

                    $self.find('.sby_video_thumbnail').on('mouseenter',function() {
                        feed.onThumbnailEnter($(this), false);
                    });
                    $self.find('.sby_player_wrap').on('mouseleave',function() {
                        feed.onThumbnailLeave($(this), false);
                    });
                    //init click
                    $self.find('.sby_video_thumbnail').on('click',function(event) {
                        if ((!feed.settings.lightboxEnabled || (feed.settings.lightboxEnabled && feed.settings.noCDN))
                            && (feed.settings.noCDN || !feed.settings.consentGiven)) {
                            if (typeof $(this).closest('.sby_item').length
                                && typeof $(this).closest('.sby_item').attr('data-video-id') !== 'undefined') {
                                $(this).attr('href','https://www.youtube.com/watch?v='+$(this).closest('.sby_item').attr('data-video-id'));
                            }
                            return;
                        }
                        event.preventDefault();
                        feed.onThumbnailClick($(this), false);
                    });

                    // lightbox
                    if (feed.settings.lightboxEnabled) {
                        $self.find('.sby_video_thumbnail').attr('data-sby-lightbox',feed.index);
                        if (typeof sbyOptions !== 'undefined' && typeof sbyOptions.lightboxPlaceholder !== 'undefined') {
                            if (feed.settings.narrowPlayer) {
                                $self.find('.sby_video_thumbnail').attr('href',sbyOptions.lightboxPlaceholderNarrow);
                            } else {
                                $self.find('.sby_video_thumbnail').attr('href',sbyOptions.lightboxPlaceholder);
                            }
                        }
                    }
                    feed.afterItemRevealed($self);

                    // no info
                    if ($self.find('.sby_info_item').text().trim() === '') {
                        $self.find('.sby_info_item').addClass('sby_no_space');
                    }
                }); //End .sby_item each

                $self.find('.sby_player_item').each(function (index) {
                    var $self = jQuery(this);

                    feed.afterItemRevealed($self);
                }); //End .sby_item each

                //Remove the new class after 500ms, once the sorting is done
                setTimeout(function () {
                    $self.find('.sby_item.sby_new').removeClass('sby_new');
                    //Loop through items and remove class to reveal them
                    var time = 10,
                        num = $self.find('.sby_transition').length;
                    $self.find('.sby_transition').each(function(index) {
                        var $sby_item_transition_el = jQuery(this);

                        setTimeout( function(){
                            $sby_item_transition_el.removeClass('sby_transition');
                        }, time);
                        time += 10;
                    });
                }, 500);


            },
            afterItemRevealed: function() {

            },
            afterNewImagesRevealed: function() {
                this.listenForVisibilityChange();
                this.sendNeedsResizingToServer();
                this.sendCheckWPPostsToServer();
                if (!this.settings.imageLoadEnabled) {
                    $('.sby_no_resraise').removeClass('sby_no_resraise');
                }

                var evt = $.Event('sbyafterimagesloaded');
                evt.el = $(this.el);
                $(window).trigger(evt);
            },
            setResizedImages: function () {
                if ($(this.el).find('.sby_resized_image_data').length
                    && typeof $(this.el).find('.sby_resized_image_data').attr('data-resized') !== 'undefined'
                    && $(this.el).find('.sby_resized_image_data').attr('data-resized').indexOf('{"') === 0) {
                    this.resizedImages = JSON.parse($(this.el).find('.sby_resized_image_data').attr('data-resized'));
                    $(this.el).find('.sby_resized_image_data').remove();
                }
            },
            sendNeedsResizingToServer: function() {
                var feed = this;
                if (feed.needsResizing.length > 0 && feed.settings.resizingEnabled) {
                    var itemOffset = $(this.el).find('.sby_item').length;

                    var submitData = {
                        action: 'sby_resized_images_submit',
                        needs_resizing: feed.needsResizing,
                        offset: itemOffset,
                        feed_id: feed.settings.feedID,
                        location: feed.locationGuess(),
                        post_id: feed.settings.postID,
                        atts: feed.settings.shortCodeAtts,
                    };
                    var onSuccess = function(data) {
                        if (data.trim().indexOf('{') === 0) {
                            var response = JSON.parse(data);
                            if (feed.settings.debugEnabled) {
                                console.log(response);
                            }
                        }
                    };
                    sbyAjax(submitData,onSuccess);
                }
            },
            sendCheckWPPostsToServer: function() {
                var feed = this;
                if (feed.settings.checkWPPosts || feed.settings.singleCheckPosts) {
                    var feedID = typeof feed.settings.feedID !== 'undefined' ? feed.settings.feedID : 'sby_single',
                        posts = feed.mostRecentlyLoadedPosts;
                    feed.mostRecentlyLoadedPosts = [];
                    var submitData = {
                        action: 'sby_check_wp_submit',
                        feed_id: feedID,
                        atts: feed.settings.shortCodeAtts,
                        location: feed.locationGuess(),
                        post_id: feed.settings.postID,
                        offset: ! $(this.el).hasClass('sby_layout_carousel') ? $(this.el).find('.sby_item').length : Math.floor(($(this.el).find('.sby_item').length / 2) -1),
                        posts: posts,
                        cache_all : feed.settings.cacheAll
                    };
                    var onSuccess = function(data) {
                        if (data.trim().indexOf('{') === 0) {
                            var response = JSON.parse(data);
                            if (feed.settings.debugEnabled) {
                                console.log(response);
                            }
                            feed.afterSendCheckWPPostsToServer(response);

                        }
                    };
                    sbyAjax(submitData,onSuccess);
                }
            },
            afterSendCheckWPPostsToServer: function (response) {

            },
            loadMoreButtonInit: function () {
                var $self = $(this.el),
                    feed = this;
                $self.find('.sby_footer .sby_load_btn').off().on('click', function () {
                    feed.afterLoadMoreClicked(jQuery(this));
                    feed.getNewPostSet();
                }); //End click event
            },
            getNewPostSet: function () {
                var $self = $(this.el),
                    feed = this;
                var itemOffset = $self.find('.sby_item').length,
                    submitData = {
                        action: 'sby_load_more_clicked',
                        offset: itemOffset,
                        feed_id: feed.settings.feedID,
                        location: feed.locationGuess(),
                        post_id: feed.settings.postID,
                        atts: feed.settings.shortCodeAtts,
                        current_resolution: feed.imageResolution
                    };
                var onSuccess = function (data) {
                    if (data.trim().indexOf('{') === 0) {
                        var response = JSON.parse(data),
                            checkWPPosts = typeof response.feedStatus.checkWPPosts !== 'undefined' ? response.feedStatus.checkWPPosts : false;;
                        if (feed.settings.debugEnabled) {
                            console.log(response);
                        }
                        if (checkWPPosts) {
                            feed.settings.checkWPPosts = true;
                        } else {
                            feed.settings.checkWPPosts = false;
                        }
                        feed.appendNewPosts(response.html);
                        feed.addResizedImages(response.resizedImages);
                        if (feed.settings.ajaxPostLoad) {
                            feed.settings.ajaxPostLoad = false;
                            feed.afterInitialImagesLoaded();
                        } else {
                            feed.afterNewImagesLoaded();
                        }

                        if (!response.feedStatus.shouldPaginate) {
                            feed.outOfPages = true;
                            $self.find('.sby_load_btn').hide();
                        } else {
                            feed.outOfPages = false;
                        }

                        $('.sby_no_js').removeClass('sby_no_js');
                    }

                };
                sbyAjax(submitData, onSuccess);
            },
            appendNewPosts: function (newPostsHtml) {
                var $self = $(this.el),
                    feed = this;
                if ($self.find('.sby_items_wrap .sby_item').length) {
                    $self.find('.sby_items_wrap .sby_item').last().after(newPostsHtml);
                } else {
                    $self.find('.sby_items_wrap').append(newPostsHtml);
                }
            },
            addResizedImages: function (resizedImagesToAdd) {
                for (var imageID in resizedImagesToAdd) {
                    this.resizedImages[imageID] = resizedImagesToAdd[imageID];
                }
            },
            setImageHeight: function() {
            },
            maybeRaiseSingleImageResolution: function ($item, index, forceChange) {
                var feed = this,
                    imgSrcSet = feed.getImageUrls($item),
                    currentUrl = $item.find('.sby_video_thumbnail > img').attr('src'),
                    currentRes = 150,
                    aspectRatio = 1, // all thumbnails are oriented the same so the best calculation uses 1
                    forceChange = typeof forceChange !== 'undefined' ? forceChange : false;

                if ($item.hasClass('sby_no_resraise')   ||
                    (!feed.settings.consentGiven && feed.settings.noCDN) ) {
                    return;
                }

                $.each(imgSrcSet, function (index, value) {
                    if (value === currentUrl) {
                        currentRes = parseInt(index);
                        // If the image has already been changed to an existing real source, don't force the change
                        forceChange = false;
                    }
                });
                //Image res
                var newRes = 640;
                switch (feed.settings.imgRes) {
                    case 'thumb':
                        newRes = 120;
                        break;
                    case 'medium':
                        newRes = 320;
                        break;
                    case 'large':
                        newRes = 480;
                        break;
                    case 'full':
                        newRes = 640;
                        break;
                    default:
                        var minImageWidth = Math.max(feed.settings.autoMinRes,$item.find('.sby_video_thumbnail').innerWidth()),
                            thisImageReplace = feed.getBestResolutionForAuto(minImageWidth, aspectRatio, $(this.el).find('sby_item').first());
                        switch (thisImageReplace) {
                            case 480:
                                newRes = 480;
                                break;
                            case 320:
                                newRes = 320;
                                break;
                            case 120:
                                newRes = 120;
                                break;
                        }
                        break;
                }

                if (newRes > currentRes || currentUrl === feed.placeholderURL || forceChange) {
                    if (feed.settings.debugEnabled) {
                        var reason = currentUrl === feed.placeholderURL ? 'was placeholder' : 'too small';
                        console.log('rais res for ' + currentUrl, reason);
                    }
                    var newUrl = imgSrcSet[newRes];
                    $item.find('.sby_video_thumbnail > img').attr('src', newUrl);
                    if ($item.find('.sby_video_thumbnail').hasClass('sby_imgLiquid_ready')) {
                        $item.find('.sby_video_thumbnail').css('background-image', 'url("' + newUrl + '")');
                    }
                }

                $item.find('img').on('error', function () {
                    if (!$(this).hasClass('sby_img_error')) {
                        $(this).addClass('sby_img_error');
                        var sourceFromAPI = ($(this).attr('src').indexOf('i.ytimg.com') > -1);

                        if (!sourceFromAPI) {
                            if (typeof $(this).closest('.sby_video_thumbnail').attr('data-full-res') !== 'undefined') {
                                //$(this).attr('src', $(this).closest('.sby_video_thumbnail').attr('data-full-res'));
                                //$(this).closest('.sby_video_thumbnail').css('background-image', 'url(' + $(this).closest('.sby_video_thumbnail').attr('data-full-res') + ')');
                            } else if ($(this).closest('.sby_video_thumbnail').attr('href') !== 'undefined') {
                                //$(this).attr('src', $(this).closest('.sby_video_thumbnail').attr('href') + 'media?size=l');
                                //$(this).closest('.sby_video_thumbnail').css('background-image', 'url(' + $(this).closest('.sby_video_thumbnail').attr('href') + 'media?size=l)');
                            }
                        } else {
                            feed.settings.favorLocal = true;
                            var srcSet = feed.getImageUrls($(this).closest('.sby_item'));
                            if (typeof srcSet[640] !== 'undefined') {
                                //$(this).attr('src', srcSet[640]);
                                //$(this).closest('.sby_video_thumbnail').css('background-image', 'url(' + srcSet[640] + ')');
                            }
                        }
                        setTimeout(function() {
                            feed.afterResize();
                        }, 1500)
                    } else {
                        console.log('unfixed error ' + $(this).attr('src'));
                    }
                });
            },
            maybeRaiseImageResolution: function (justNew) {
                var feed = this,
                    itemsSelector = typeof justNew !== 'undefined' && justNew === true ? '.sby_item.sby_new' : '.sby_item',
                    forceChange = !feed.isInitialized ? true : false;
                $(feed.el).find(itemsSelector).each(function (index) {
                    if (!$(this).hasClass('sby_num_diff_hide')
                        && $(this).find('.sby_video_thumbnail').length
                        && typeof $(this).find('.sby_video_thumbnail').attr('data-img-src-set') !== 'undefined') {
                        feed.maybeRaiseSingleImageResolution($(this),index,forceChange);
                    }
                }); //End .sby_item each
                feed.isInitialized = true;
            },
            getBestResolutionForAuto: function(colWidth, aspectRatio, $item) {
                if (isNaN(aspectRatio) || aspectRatio < 1) {
                    aspectRatio = 1;
                }
                var bestWidth = colWidth * aspectRatio,
                    bestWidthRounded = Math.ceil(bestWidth / 10) * 10,
                    customSizes = [120, 320, 480, 640];

                if ($item.hasClass('sby_highlighted')) {
                    bestWidthRounded = bestWidthRounded *2;
                }

                if (customSizes.indexOf(parseInt(bestWidthRounded)) === -1) {
                    var done = false;
                    $.each(customSizes, function (index, item) {
                        if (item > parseInt(bestWidthRounded) && !done) {
                            bestWidthRounded = item;
                            done = true;
                        }
                    });
                }

                return bestWidthRounded;
            },
            hideExtraItemsForWidth: function() {
                if (this.layout === 'carousel') {
                    return;
                }
                var $self = $(this.el),
                    num = typeof $self.attr('data-num') !== 'undefined' && $self.attr('data-num') !== '' ? parseInt($self.attr('data-num')) : 1,
                    nummobile = typeof $self.attr('data-nummobile') !== 'undefined' && $self.attr('data-nummobile') !== '' ? parseInt($self.attr('data-nummobile')) : num;

                if (!$self.hasClass('.sby_layout_carousel')) {
                    if ($(window).width() < 480) {
                        if (nummobile < $self.find('.sby_item').length) {
                            $self.find('.sby_item').slice(nummobile - $self.find('.sby_item').length).addClass('sby_num_diff_hide');
                        }
                    } else {
                        if (num < $self.find('.sby_item').length) {
                            $self.find('.sby_item').slice(num - $self.find('.sby_item').length).addClass('sby_num_diff_hide');
                        }
                    }
                }

            },
            setImageSizeClass: function () {
                var $self = $(this.el);
                $self.removeClass('sby_small sby_medium');
                var feedWidth = $self.innerWidth(),
                    photoPadding = parseInt(($self.find('.sby_items_wrap').outerWidth() - $self.find('.sby_items_wrap').width())) / 2,
                    cols = this.getColumnCount(),
                    feedWidthSansPadding = feedWidth - (photoPadding * (cols+2)),
                    colWidth = (feedWidthSansPadding / cols);

                if (colWidth > 140 && colWidth < 240) {
                    $self.addClass('sby_medium');
                } else if (colWidth <= 140) {
                    $self.addClass('sby_small');
                }
            },
            setMinImageWidth: function () {
                if ($(this.el).find('.sby_item .sby_video_thumbnail').first().length) {
                    this.minImageWidth = $(this.el).find('.sby_item .sby_video_thumbnail').first().innerWidth();
                } else {
                    this.minImageWidth = 150;
                }
            },
            setImageResolution: function () {
                if (this.settings.imgRes === 'auto') {
                    this.imageResolution = 'auto';
                } else {
                    switch (this.settings.imgRes) {
                        case 'thumb':
                            this.imageResolution = 150;
                            break;
                        case 'medium':
                            this.imageResolution = 320;
                            break;
                        default:
                            this.imageResolution = 640;
                    }
                }
            },
            getImageUrls: function ($item) {
                var srcSet = JSON.parse($item.find('.sby_video_thumbnail').attr('data-img-src-set').replace(/\\\//g, '/')),
                    id = $item.attr('id').replace('sby_', '').replace('player_','');
                if (typeof this.resizedImages[id] !== 'undefined'
                    && this.resizedImages[id] !== 'video'
                    && this.resizedImages[id] !== 'pending'
                    && this.resizedImages[id].id !== 'error'
                    && this.resizedImages[id].id !== 'video'
                    && this.resizedImages[id].id !== 'pending') {

                    if (typeof this.resizedImages[id]['sizes'] !== 'undefined') {
                        var foundSizes = [];
                        if (typeof this.resizedImages[id]['sizes']['full'] !== 'undefined') {
                            foundSizes.push(640);
                            srcSet[640] = sbyOptions.resized_url + this.resizedImages[id].id + 'full.jpg';
                            $item.find('.sby_link_area').attr( 'href', sbyOptions.resized_url + this.resizedImages[id].id + 'full.jpg' );
                            $item.find('.sby_video_thumbnail').attr( 'data-full-res', sbyOptions.resized_url + this.resizedImages[id].id + 'full.jpg' );
                        }
                        if (typeof this.resizedImages[id]['sizes']['low'] !== 'undefined') {
                            foundSizes.push(320);
                            srcSet[320] = sbyOptions.resized_url + this.resizedImages[id].id + 'low.jpg';
                            if (this.settings.favorLocal && typeof this.resizedImages[id]['sizes']['full'] === 'undefined') {
                                $item.find('.sby_link_area').attr( 'href', sbyOptions.resized_url + this.resizedImages[id].id + 'low.jpg' );
                                $item.find('.sby_video_thumbnail').attr( 'data-full-res', sbyOptions.resized_url + this.resizedImages[id].id + 'low.jpg' );
                            }
                        }
                        if (typeof this.resizedImages[id]['sizes']['thumb'] !== 'undefined') {
                            foundSizes.push(150);
                            srcSet[150] = sbyOptions.resized_url + this.resizedImages[id].id + 'thumb.jpg';
                        }
                        if (this.settings.favorLocal) {
                            if (foundSizes.indexOf(640) === -1) {
                                if (foundSizes.indexOf(320) > -1) {
                                    srcSet[640] = sbyOptions.resized_url + this.resizedImages[id].id + 'low.jpg';
                                }
                            }
                            if (foundSizes.indexOf(320) === -1) {
                                if (foundSizes.indexOf(640) > -1) {
                                    srcSet[320] = sbyOptions.resized_url + this.resizedImages[id].id + 'full.jpg';
                                } else if (foundSizes.indexOf(150) > -1) {
                                    srcSet[320] = sbyOptions.resized_url + this.resizedImages[id].id + 'thumb.jpg';
                                }
                            }
                            if (foundSizes.indexOf(150) === -1) {
                                if (foundSizes.indexOf(320) > -1) {
                                    srcSet[150] = sbyOptions.resized_url + this.resizedImages[id].id + 'low.jpg';
                                } else if (foundSizes.indexOf(640) > -1) {
                                    srcSet[150] = sbyOptions.resized_url + this.resizedImages[id].id + 'full.jpg';
                                }
                            }
                        }
                    }
                } else if (typeof this.resizedImages[id] === 'undefined'
                    || (typeof this.resizedImages[id]['id'] !== 'undefined' && this.resizedImages[id]['id'] !== 'pending' && this.resizedImages[id]['id'] !== 'error')) {
                    this.addToNeedsResizing(id);
                }

                return srcSet;
            },
            getVideoID: function ($el) {
                if ($el.hasClass('sby_item') || $el.hasClass('sby_player_item')) {
                    if (typeof $el.find('.sby_video_thumbnail').attr('data-video-id') !== 'undefined') {
                        return $el.find('.sby_video_thumbnail').attr('data-video-id');
                    }
                } else if ($el.closest('sby_item').length || $el.closest('sby_player_item').length) {
                    var $targeEl = $el.closest('sby_item').length ? $el.closest('sby_item') : $el.closest('sby_player_item');
                    if (typeof $targeEl.find('.sby_video_thumbnail').attr('data-video-id') !== 'undefined') {
                        return $targeEl.find('.sby_video_thumbnail').attr('data-video-id');
                    }
                } else if ($el.hasClass('sb_youtube')) {
                    return $el.find('.sby_item').first().find('.sby_video_thumbnail').attr('data-video-id');
                } else if ($(this.el).find('.sby_video_thumbnail').first().length && typeof $(this.el).find('.sby_video_thumbnail').first().attr('data-video-id') !== 'undefined'){
                    return $(this.el).find('.sby_video_thumbnail').first().attr('data-video-id');
                }
                return '';
            },
            getAvatarUrl: function (username,favorType) {
                if (username === '') {
                    return '';
                }

                var availableAvatars = this.settings.general.avatars,
                    favorType = typeof favorType !== 'undefined' ? favorType : 'local';

                if (favorType === 'local') {
                    if (typeof availableAvatars['LCL'+username] !== 'undefined' && parseInt(availableAvatars['LCL'+username]) === 1) {
                        return sbyOptions.resized_url + username + '.jpg';
                    } else if (typeof availableAvatars[username] !== 'undefined') {
                        return availableAvatars[username];
                    } else {
                        return '';
                    }
                } else {
                    if (typeof availableAvatars[username] !== 'undefined') {
                        return availableAvatars[username];
                    } else if (typeof availableAvatars['LCL'+username] !== 'undefined' && parseInt(availableAvatars['LCL'+username]) === 1)  {
                        return sbyOptions.resized_url + username + '.jpg';
                    } else {
                        return '';
                    }
                }
            },
            addToNeedsResizing: function (id) {
                if (this.needsResizing.indexOf(id) === -1) {
                    this.needsResizing.push(id);
                }
            },
            applyImageLiquid: function () {
                var $self = $(this.el),
                    feed = this;
                sbyAddImgLiquid();
                if (typeof $self.find(".sby_player_item").sby_imgLiquid == 'function') {
                    if ($self.find('.sby_player_item').length) {
                        $self.find(".sby_player_item .sby_player_video_thumbnail").sby_imgLiquid({fill: true});
                    }
                    $self.find(".sby_item .sby_item_video_thumbnail").sby_imgLiquid({fill: true});
                }
            },
            listenForVisibilityChange: function() {
                var feed = this;
                sbyAddVisibilityListener();
                if (typeof $(this.el).filter(':hidden').sbyVisibilityChanged == 'function') {
                    //If the feed is initially hidden (in a tab for example) then check for when it becomes visible and set then set the height
                    $(this.el).filter(':hidden').sbyVisibilityChanged({
                        callback: function (element, visible) {
                            feed.afterResize();
                        },
                        runOnLoad: false
                    });
                }
            },
            getColumnCount: function() {
                var $self = $(this.el),
                    cols = this.settings.cols,
                    colsmobile = this.settings.colsmobile,
                    returnCols = cols;

                sbyWindowWidth = window.innerWidth;

                if ($self.hasClass('sby_mob_col_auto')) {
                    if (sbyWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7)) returnCols = 2;
                    if (sbyWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11)) returnCols = 4;
                    if (sbyWindowWidth <= 480 && parseInt(cols) > 2) returnCols = 1;
                } else if (sbyWindowWidth <= 480) {
                    returnCols = colsmobile;
                }

                return parseInt(returnCols);
            },
            onThumbnailClick: function($clicked,isPlayer,videoID) {
                if (!this.canCreatePlayer()) {
                    return;
                }
                var $self = $(this.el);
                if ($self.hasClass('sby_layout_gallery')) {
                    $self.find('.sby_current').removeClass('sby_current');
                    $clicked.closest('.sby_item').addClass('sby_current');

                    $clicked.closest('.sby_item').addClass('sby_current');
                    $self.addClass('sby_player_added').find('.sby_player_outer_wrap').addClass('sby_player_loading');
                    $self.find('.sby_player_outer_wrap .sby_video_thumbnail').find('.sby_loader').show().removeClass('sby_hidden');
                    if (!$self.find('.sby_player_outer_wrap iframe').length) {
                        if (isPlayer) {
                            this.createPlayer('sby_player'+this.index);
                        } else {
                            var videoID = typeof videoID === 'undefined' ? this.getVideoID($clicked.closest('.sby_item')) : videoID;
                            this.createPlayer('sby_player'+this.index,videoID);
                        }
                    } else {
                        if (isPlayer) {
                            var videoID = typeof videoID === 'undefined' ? this.getVideoID($self.find('.sby_item').first()) : videoID;

                            this.playVideoInPlayer(videoID);
                        } else {
                            var videoID = typeof videoID === 'undefined' ? this.getVideoID($clicked.closest('.sby_item')) : videoID;

                            this.changePlayerInfo($clicked.closest('.sby_item'));
                            this.playVideoInPlayer(videoID);
                            this.afterVideoChanged();
                        }
                    }

                } else if ($(this.el).hasClass('sby_layout_grid') || $(this.el).hasClass('sby_layout_carousel')) {
                    var $sbyItem = $clicked.closest('.sby_item'),
                        videoID = typeof videoID === 'undefined' ? this.getVideoID($sbyItem) : videoID;
                    this.playVideoInPlayer(videoID);
                    this.afterVideoChanged();
                } else if ($(this.el).hasClass('sby_layout_list')) {
                    var $sbyItem = $clicked.closest('.sby_item'),
                        videoID = typeof videoID === 'undefined' ? this.getVideoID($sbyItem) : videoID;
                    if ($sbyItem.length && !$sbyItem.find('iframe').length) {
                        $sbyItem.find('.sby_loader').show().removeClass('sby_hidden');
                        $sbyItem.addClass('sby_player_loading sby_player_loaded');
                        this.createPlayer('sby_player_'+videoID,videoID);
                    } else {
                        this.playVideoInPlayer(videoID,$sbyItem.attr('data-video-id'));
                        this.afterVideoChanged();
                    }
                }
            },
            onThumbnailEnter: function($hovered) {
                if (!this.canCreatePlayer()) {
                    return;
                }
                var $self = $(this.el);
                if ($self.hasClass('sby_layout_list')) {
                    var $sbyItem = $hovered.closest('.sby_item'),
                        videoID = this.getVideoID($sbyItem);
                    if (!$sbyItem.find('iframe').length) {
                        $sbyItem.find('.sby_loader').show().removeClass('sby_hidden');
                        $sbyItem.addClass('sby_player_loading sby_player_loaded');
                        this.createPlayer('sby_player_'+videoID,videoID,0);
                    }
                }
            },
            onThumbnailLeave: function($hovered) {
            },
            changePlayerInfo: function($newItem) {

            },
            playerEagerLoaded: function() {
                if (typeof this.player !== 'undefined' || $(this.el).hasClass('sby_player_loaded')) {
                    return true;
                }
            },
            initGrid: function() {
                if (window.sbySemiEagerLoading && jQuery('#sby_lightbox').length) {
                    var feed = this;
                    playerID = 'sby_lb-player';
                    jQuery('#sby_lightbox').addClass('sby_video_lightbox');

                    var videoID = $(this.el).find('sby_item').first().attr('data-video-id'),
                        autoplay = sbyOptions.autoplay;
                    if (typeof window.sbyLightboxPlayer === 'undefined') {
                        var args = {
                            host: window.location.protocol + '//www.youtube-nocookie.com',
                            videoId: videoID,
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                autoplay: autoplay
                            },
                            events: {
                                'onStateChange': function (data) {
                                    var videoID = data.target.getVideoData()['video_id'];
                                    feed.afterStateChange(playerID, videoID, data, $('#' + playerID).closest('.sby_video_thumbnail_wrap'));
                                }
                            }
                        };
                        feed.maybeAddCTA(playerID);

                        window.sbyLightboxPlayer = new window.YT.Player(playerID, args);
                    }
                }
            },
            maybeAddCTA: function(playerID,$el) {},
            canCreatePlayer: function() {
                if ($(this.el).find('#sby_blank').length) {
                    return false;
                }
                return this.playerEagerLoaded() || (this.playerAPIReady && this.settings.consentGiven) || (window.sbyAPIReady && this.settings.consentGiven);
            },
            playVideoInPlayer: function(videoID,playerID) {
                if (typeof this.player !== 'undefined' && typeof this.player.loadVideoById !== 'undefined') {
                    this.player.loadVideoById(videoID);
                } else if (typeof window.sbyLightboxPlayer !== 'undefined'
                    && typeof window.sbyLightboxPlayer.loadVideoById !== 'undefined') {
                    window.sbyLightboxPlayer.loadVideoById(videoID);
                } else if (typeof playerID !== 'undefined'
                    && typeof this.players !== 'undefined'
                    && typeof this.players[playerID] !== 'undefined'
                    && typeof this.players[playerID].loadVideoById !== 'undefined') {
                    this.players[playerID].loadVideoById(videoID);
                }
            },
            afterVideoChanged: function() {
                if ($(this.el).hasClass('sby_layout_gallery')) {
                    $(this.el).find('.sby_player_outer_wrap').removeClass('sby_player_loading');
                    $(this.el).find('.sby_player_outer_wrap .sby_video_thumbnail').find('.sby_loader').hide().addClass('sby_hidden');

                    if ($(window).width() < 480) {
                        $('html, body').animate({
                            scrollTop: $(this.el).find('.sby_player_outer_wrap').offset().top
                        }, 300);
                    }

                }
            },
            checkConsent: function() {
                if (this.settings.consentGiven || !this.settings.gdpr) {
                    this.settings.noCDN = false;
                    return true;
                }
                if (typeof CLI_Cookie !== "undefined") { // GDPR Cookie Consent by WebToffee
                    if (CLI_Cookie.read(CLI_ACCEPT_COOKIE_NAME) !== null)  {

                        this.settings.consentGiven = CLI_Cookie.read('cookielawinfo-checkbox-non-necessary') === 'yes';
                    }

                } else if (typeof window.cnArgs !== "undefined") { // Cookie Notice by dFactory
                    var value = "; " + document.cookie,
                        parts = value.split( '; cookie_notice_accepted=' );

                    if ( parts.length === 2 ) {
                        var val = parts.pop().split( ';' ).shift();

                        this.settings.consentGiven = (val === 'true');
                    }
                } else if (typeof window.cookieconsent !== 'undefined') { // Complianz by Really Simple Plugins
                    this.settings.consentGiven = sbyCmplzGetCookie('complianz_consent_status') === 'allow';
                } else if (typeof window.Cookiebot !== "undefined") { // Cookiebot by Cybot A/S
                    this.settings.consentGiven = Cookiebot.consented;
                } else if (typeof window.BorlabsCookie !== 'undefined') { // Borlabs Cookie by Borlabs
                    this.settings.consentGiven = window.BorlabsCookie.checkCookieConsent('youtube');
                }

                var evt = jQuery.Event('sbycheckconsent');
                evt.feed = this;
                jQuery(window).trigger(evt);

                if (this.settings.consentGiven) {
                    this.settings.noCDN = false;
                }

                return this.settings.consentGiven; // GDPR not enabled
            },
            afterConsentToggled: function() {
                if (this.checkConsent()) {
                    var feed = this;
                    window.sby.maybeAddYTAPI();
                    feed.maybeRaiseImageResolution();
                    feed.applyFullFeatures();
                    setTimeout(function() {
                        feed.afterResize();
                    },500);
                }
            },
            removeFeatures: function() {
                var feed = this;
                if (feed.settings.noCDN) {
                    $(feed.el).find('.sby_video_thumbnail').each(function() {
                        $(this).removeAttr('data-sby-lightbox');
                    });
                }
            },
            applyFullFeatures: function() {
                var feed = this;

                $(feed.el).find('.sby_header_img img').attr('src',$(feed.el).find('.sby_header_img').attr('data-avatar-url'));
                if (typeof $(feed.el).find('.sby_video_thumbnail').first().attr('data-sby-lightbox') === 'undefined'
                    && feed.settings.lightboxEnabled) {
                    $(feed.el).find('.sby_video_thumbnail').each(function() {
                        $(this).attr('data-sby-lightbox',feed.index);
                    });
                }
                var $self = $(feed.el);
                $self.find('.sby_no_consent').removeClass('sby_no_consent');
                if ($self.hasClass('sby_layout_gallery') && $self.find('.sby_player_outer_wrap').length) {
                    this.maybeRaiseSingleImageResolution($self.find('.sby_player_outer_wrap'), 0, true);
                    $self.find('.sby_player_outer_wrap .sby_play_btn').remove();
                    $self.find('.sby_item').first().addClass('sby_current');

                    if (!feed.canCreatePlayer()) {
                        return;
                    }
                    if (!$self.find('.sby_player_outer_wrap iframe').length) {
                        feed.createPlayer('sby_player'+feed.index);
                    }

                }
            },
            locationGuess: function() {
                var $feed = $(this.el),
                    location = 'content';

                if ($feed.closest('footer').length) {
                    location = 'footer';
                } else if ($feed.closest('.header').length
                    || $feed.closest('header').length) {
                    location = 'header';
                } else if ($feed.closest('.sidebar').length
                    || $feed.closest('aside').length) {
                    location = 'sidebar';
                }

                return location;
            }
        };

        function SbyLightboxBuilder() {}

        SbyLightboxBuilder.prototype = {
            getData: function(a){
                var closestFeedIndex = parseInt(a.closest('.sb_youtube').attr('data-sby-index')-1);
                return {
                    feedIndex : closestFeedIndex,
                    link: a.attr("href"),
                    videoTitle: typeof a.attr("data-video-title") !== 'undefined' ? a.attr("data-video-title") : 'YouTube Video',
                    video: a.attr("data-video-id")
                }
            },
            template: function () {
                return "<div id='sby_lightboxOverlay' class='sby_lightboxOverlay'></div>"+
                    "<div id='sby_lightbox' class='sby_lightbox'>"+
                    "<div class='sby_lb-outerContainer'>"+
                    "<div class='sby_lb-container'>"+
                    "<img class='sby_lb-image' alt='Lightbox image placeholder' src='' />"+
                    "<div class='sby_lb-player sby_lb-player-placeholder' id='sby_lb-player'></div>" +
                    "<div class='sby_lb-nav'><a class='sby_lb-prev' href='#' ><p class='sby-screenreader'>Previous Slide</p><span></span></a><a class='sby_lb-next' href='#' ><p class='sby-screenreader'>Next Slide</p><span></span></a></div>"+
                    "<div class='sby_lb-loader'><a class='sby_lb-cancel'></a></div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='sby_lb-dataContainer'>"+
                    "<div class='sby_lb-data'>"+
                    "<div class='sby_lb-details'>"+
                    "<div class='sby_lb-caption'></div>"+
                    "<div class='sby_lb-info'>"+
                    "<div class='sby_lb-number'></div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='sby_lb-closeContainer'><a class='sby_lb-close'></a></div>"+
                    "</div>"+
                    "</div>"+
                    "</div>";
            },
            beforePlayerSetup: function($lightbox,data,index,album,feed){

            },
            afterPlayerSetup: function ($lightbox,data,index,album) {
            },
            afterResize: function(){
                var playerHeight = $('#sby_lightbox .sby_lb-player').height();

                if (playerHeight > 100) {
                    var heightDif = $('#sby_lightbox .sby_lb-outerContainer').height() - playerHeight;
                    if (heightDif > 10) {
                        $('#sby_lightbox .sby_lb-player').css('top',heightDif/2);
                    }
                }
            },
            pausePlayer: function () {
                if (typeof YT.get('sby_lb-player') !== 'undefined' && typeof YT.get('sby_lb-player').pauseVideo === 'function') {
                    YT.get('sby_lb-player').pauseVideo()
                } else if (typeof window.sbyLightboxPlayer !== 'undefined' && typeof window.sbyLightboxPlayer.pauseVideo === 'function') {
                    window.sbyLightboxPlayer.pauseVideo();
                }

            }
        };

        window.sby_init = function() {
            window.sby = new Sby();
            window.sby.createPage( window.sby.createFeeds, {whenFeedsCreated: window.sby.afterFeedsCreated});
        };

        function sbyGetNewFeed(feed,index,feedOptions) {
            return new SbyFeed(feed,index,feedOptions);
        }

        function sbyGetlightboxBuilder() {
            return new SbyLightboxBuilder();
        }

        function sbyAjax(submitData,onSuccess) {
            $.ajax({
                url: sbyOptions.adminAjaxUrl,
                type: 'post',
                data: submitData,
                success: onSuccess
            });
        }

        function sbyIsTouch() {
            if ("ontouchstart" in document.documentElement) {
                return true;
            }
            return false;
        }

        function sbyCmplzGetCookie(cname) {
            var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
            var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'

            //Loop through the cookies and return the cookie value if it find the cookie name
            for (var i = 0; i < cArr.length; i++) {
                var c = cArr[i].trim();
                //If the name is the cookie string at position 0, we found the cookie and return the cookie value
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }

            return "";
        }

    })(jQuery);

    if (typeof window.sbyEagerLoading === 'undefined') {
        window.sbyEagerLoading = typeof window.sbyOptions !== 'undefined' ? window.sbyOptions.eagerload : false;
        if (jQuery('div[data-vc-video-bg]').length) {
            window.sbyEagerLoading = true;
        }
    }
    if (typeof window.sbySemiEagerLoading === 'undefined') {
        window.sbySemiEagerLoading = typeof window.sbyOptions !== 'undefined' ? window.sbyOptions.semiEagerload : false;
        if (jQuery('div[data-vc-video-bg]').length || window.sbyEagerLoading) {
            window.sbySemiEagerLoading = false;
        }
    }

    jQuery(document).ready(function($) {
        if (!window.sbySemiEagerLoading) {
            sby_init();
        }

        // Cookie Notice by dFactory
        $('#cookie-notice a').on('click',function() {
            setTimeout(function() {
                $.each(window.sby.feeds,function(index){
                    window.sby.feeds[ index ].afterConsentToggled();
                });
            },1000);
        });

        // Cookie Notice by dFactory
        $('#cookie-law-info-bar a').on('click',function() {
            setTimeout(function() {
                $.each(window.sby.feeds,function(index){
                    window.sby.feeds[ index ].afterConsentToggled();
                });
            },1000);
        });

        // GDPR Cookie Consent by WebToffee
        $('.cli-user-preference-checkbox').on('click',function(){
            setTimeout(function() {
                $.each(window.sby.feeds,function(index){
                    window.sby.feeds[ index ].settings.consentGiven = false;
                    window.sby.feeds[ index ].afterConsentToggled();
                });
            },1000);
        });

        // Cookiebot
        $(window).on('CookiebotOnAccept', function (event) {
            $.each(window.sby.feeds,function(index){
                window.sby.feeds[ index ].settings.consentGiven = true;
                window.sby.feeds[ index ].afterConsentToggled();
            });
        });

        // Complianz by Really Simple Plugins
        $(document).on('cmplzAcceptAll', function (event) {
            $.each(window.sby.feeds,function(index){
                window.sby.feeds[ index ].settings.consentGiven = true;
                window.sby.feeds[ index ].afterConsentToggled();
            });
        });

        // Complianz by Really Simple Plugins
        $(document).on('cmplzRevoke', function (event) {
            $.each(window.sby.feeds,function(index){
                window.sby.feeds[ index ].settings.consentGiven = false;
                window.sby.feeds[ index ].afterConsentToggled();
            });
        });

        // Borlabs Cookie by Borlabs
        $(document).on('borlabs-cookie-consent-saved', function (event) {
            $.each(window.sby.feeds,function(index){
                window.sby.feeds[ index ].settings.consentGiven = false;
                window.sby.feeds[ index ].afterConsentToggled();
            });
        });
    });

} // if sby_js_exists

if (window.sbySemiEagerLoading) {
    var sbyYScriptId = "sby-youtube-api";
    var sbyYScript = document.getElementById(sbyYScriptId);

    if (sbyYScript === null) {
        var tag = document.createElement("script");
        var firstScript = document.getElementsByTagName("script")[0];

        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = sbyYScriptId;
        firstScript.parentNode.insertBefore(tag, firstScript);

    }
}

window.onYouTubeIframeAPIReady = function() {
    var numFeeds = document.getElementsByClassName('sb_youtube').length;
    if (numFeeds > 0) {
        if (window.sbySemiEagerLoading) {
            if (typeof window.sby !== 'undefined') {
                for (var i = 0; i < numFeeds; i++) {
                    window.sby.feeds[i].playerAPIReady = true;
                }
            } else {
                window.sbyAPIReady = true;
            }
            sby_init();
        } else {
            jQuery('.sb_youtube').each(function(index) {
                var $self = jQuery(this);
                if ($self.find('.sby_live_player').length) {
                    player = new YT.Player($self.find('.sby_live_player').attr('id'), {
                        events: {
                            'onReady': function () {
                                $self.find('.sby_live_player').hide();
                                $self.find('.sby_item').remove();
                                var videoID = YT.get($self.find('.sby_live_player').attr('id')).getVideoData().video_id;
                                $self.find('.sby_player_video_thumbnail').attr('data-video-id',videoID).css('z-index',-1);
                                var itemOffset = $self.find('.sby_item').length,
                                    submitData = {
                                        action: 'sby_live_retrieve',
                                        video_id: videoID,
                                        feed_id: $self.attr('data-feedid'),
                                        atts: $self.attr('data-shortcode-atts'),
                                    };
                                var onSuccess = function (data) {
                                    if (data.trim().indexOf('{') === 0) {
                                        var feed = window.sby.feeds[index],
                                            response = JSON.parse(data),
                                            checkWPPosts = typeof response.feedStatus.checkWPPosts !== 'undefined' ? response.feedStatus.checkWPPosts : false;
                                        if (feed.settings.debugEnabled) {
                                            console.log(response);
                                        }
                                        if (checkWPPosts) {
                                            feed.settings.checkWPPosts = true;
                                        } else {
                                            feed.settings.checkWPPosts = false;
                                        }
                                        feed.appendNewPosts(response.html);
                                        feed.addResizedImages(response.resizedImages);

                                        feed.afterInitialImagesLoaded();

                                        if (!response.feedStatus.shouldPaginate) {
                                            feed.outOfPages = true;
                                            $self.find('.sby_load_btn').hide();
                                        } else {
                                            feed.outOfPages = false;
                                        }

                                        jQuery('.sby_no_js').removeClass('sby_no_js');
                                        $self.find('.sby_live_player').remove();
                                        if ($self.hasClass('sby_layout_gallery')) {
                                            feed.createPlayer('sby_player'+feed.index);
                                        }
                                        $self.find('.sby_player_item').css('opacity',1);
                                        $self.find('.sby_item').css('opacity',1);
                                        $self.find('.sby_player_loading').removeClass('sby_player_loading');
                                        if ($self.hasClass('sby_layout_list')) {
                                            $self.find('.sby_item_video_thumbnail').on('mouseenter',function() {
                                                jQuery(this).css('z-index',-1);
                                            })
                                        }

                                    }

                                };
                                jQuery.ajax({
                                    url: sbyOptions.adminAjaxUrl,
                                    type: 'post',
                                    data: submitData,
                                    success: onSuccess
                                });
                            }
                        }
                    });
                }
            });

            if (window.sbyEagerLoading) {
                var flagLightbox = false,
                    autoplay = false;

                jQuery('.sb_youtube').each(function(index) {
                    var $self = jQuery(this);

                    if ($self.hasClass('sby_layout_list')) {
                        jQuery(this).addClass('sby_player_loaded');

                        $self.find('.sby_item').each(function() {
                            videoID = jQuery(this).attr('data-video-id');
                            //this.createPlayer(,videoID,0);
                            player = new YT.Player('sby_player_'+videoID, {
                                height: '100',
                                width: '100',
                                videoId: videoID,
                                playerVars: {
                                    modestbranding: 1,
                                    rel: 0,
                                    autoplay: autoplay
                                },
                                events: {
                                    'onStateChange': function(data) {
                                        var videoID = data.target.getVideoData()['video_id'];
                                        if (data.data !== 1) return;
                                        $self.find('.sby_item').each(function() {
                                            var itemVidID = jQuery(this).attr('data-video-id');

                                            if (jQuery(this).find('iframe').length && itemVidID !== jQuery(this).find('iframe').attr('id').replace('sby_player_','')) {
                                                YT.get('sby_player_'+itemVidID).pauseVideo();
                                            }
                                        });
                                    }
                                }
                            });
                        });

                    } else if ($self.hasClass('sby_layout_gallery')) {
                        jQuery(this).addClass('sby_player_loaded');

                        player = new YT.Player('sby_player'+index, {
                            height: '100',
                            width: '100',
                            videoId: jQuery(this).find('.sby_item').first().attr('data-video-id'),
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                autoplay: autoplay
                            },
                            events: {
                                'onStateChange': function(data) {
                                    var videoID = data.target.getVideoData()['video_id'];
                                    if (data.data !== 1) return;
                                    $self.find('.sby_item').each(function() {
                                        var itemVidID = jQuery(this).attr('data-video-id');

                                        if (jQuery(this).find('iframe').length && jQuery(data.target.a).attr('id') !== jQuery(this).find('iframe').attr('id')) {
                                            YT.get('sby_player_'+itemVidID).pauseVideo();
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        flagLightbox = true;
                    }
                });

            } else if (typeof window.sby !== 'undefined') {
                for (var i = 0; i < numFeeds; i++) {
                    window.sby.feeds[i].playerAPIReady = true;
                }
            } else {
                window.sbyAPIReady = true;
            }
        }

        if (flagLightbox) {
            if (!jQuery('#sby_lb-player').length) {
                jQuery('.sb_youtube').first().append('<div class="sby_lb-player-loaded sby_lb-player" id="sby_lb-player" style="display: none;"></div>');
            }
            player = new YT.Player('sby_lb-player', {
                height: '100',
                width: '100',
                videoId: jQuery(this).find('.sby_item').first().attr('data-video-id'),
                playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    autoplay: autoplay
                }
            });
            window.sbyLightboxPlayer = player;
        }

    }

};