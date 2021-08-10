"use strict";

(function () {
    var _wp = wp,
        _wp$serverSideRender = _wp.serverSideRender,
        createElement = wp.element.createElement,
        ServerSideRender = _wp$serverSideRender === void 0 ? wp.components.ServerSideRender : _wp$serverSideRender,
        _ref = wp.blockEditor || wp.editor,
        InspectorControls = _ref.InspectorControls,
        _wp$components = wp.components,
        TextareaControl = _wp$components.TextareaControl,
        Button = _wp$components.Button,
        PanelBody = _wp$components.PanelBody,
        Placeholder = _wp$components.Placeholder,
        registerBlockType = wp.blocks.registerBlockType;

    var sbyIcon = createElement('svg', {
        width: 20,
        height: 20,
        viewBox: '0 0 576 512',
        className: 'dashicon'
    }, createElement('path', {
        fill: 'currentColor',
        d: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z'
    }));

    registerBlockType('sby/sby-feed-block', {
        title: 'Feeds for YouTube',
        icon: sbyIcon,
        category: 'widgets',
        attributes: {
            noNewChanges: {
                type: 'boolean',
            },
            shortcodeSettings: {
                type: 'string',
            },
            executed: {
                type: 'boolean'
            }
        },
        edit: function edit(props) {
            var _props = props,
                setAttributes = _props.setAttributes,
                _props$attributes = _props.attributes,
                _props$attributes$sho = _props$attributes.shortcodeSettings,
                shortcodeSettings = _props$attributes$sho === void 0 ? sby_block_editor.shortcodeSettings : _props$attributes$sho,
                _props$attributes$cli = _props$attributes.noNewChanges,
                noNewChanges = _props$attributes$cli === void 0 ? true : _props$attributes$cli,
                _props$attributes$exe = _props$attributes.executed,
                executed = _props$attributes$exe === void 0 ? false : _props$attributes$exe;

            function setState(shortcodeSettingsContent) {
                setAttributes({
                    noNewChanges: false,
                    shortcodeSettings: shortcodeSettingsContent
                });
            }

            function previewClick(content) {
                setAttributes({
                    noNewChanges: true,
                    executed: false,
                });
            }
            function afterRender() {
                // no way to run a script after AJAX call to get feed so we just try to execute it on a few intervals
                if (! executed
                    || typeof window.sbyGB === 'undefined') {
                    window.sbyGB = true;
                    setTimeout(function() { if (typeof sby_init !== 'undefined') {sby_init();}},1000);
                    setTimeout(function() { if (typeof sby_init !== 'undefined') {sby_init();}},2000);
                    setTimeout(function() { if (typeof sby_init !== 'undefined') {sby_init();}},3000);
                    setTimeout(function() { if (typeof sby_init !== 'undefined') {sby_init();}},5000);
                    setTimeout(function() { if (typeof sby_init !== 'undefined') {sby_init();}},10000);
                }
                setAttributes({
                    executed: true,
                });
            }

            var jsx = [React.createElement(InspectorControls, {
                key: "sby-gutenberg-setting-selector-inspector-controls"
            }, React.createElement(PanelBody, {
                title: sby_block_editor.i18n.addSettings
            }, React.createElement(TextareaControl, {
                key: "sby-gutenberg-settings",
                className: "sby-gutenberg-settings",
                label: sby_block_editor.i18n.shortcodeSettings,
                help: sby_block_editor.i18n.example + ": 'channel=\"GoProCamera\" showbutton=\"true\"'",
                value: shortcodeSettings,
                onChange: setState
            }), React.createElement(Button, {
                key: "sby-gutenberg-preview",
                className: "sby-gutenberg-preview",
                onClick: previewClick,
                isDefault: true
            }, sby_block_editor.i18n.preview)))];

            if (noNewChanges) {
                afterRender();
                jsx.push(React.createElement(ServerSideRender, {
                    key: "feeds-for-youtube/feeds-for-youtube",
                    block: "sby/sby-feed-block",
                    attributes: props.attributes,
                }));
            } else {
                props.attributes.noNewChanges = false;
                jsx.push(React.createElement(Placeholder, {
                    key: "sby-gutenberg-setting-selector-select-wrap",
                    className: "sby-gutenberg-setting-selector-select-wrap"
                }, React.createElement(Button, {
                    key: "sby-gutenberg-preview",
                    className: "sby-gutenberg-preview",
                    onClick: previewClick,
                    isDefault: true
                }, sby_block_editor.i18n.preview)));
            }

            return jsx;
        },
        save: function save() {
            return null;
        }
    });
})();