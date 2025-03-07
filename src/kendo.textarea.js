(function (f, define) {
    define(["./kendo.core", "./kendo.floatinglabel"], f);
})(function () {

var __meta__ = {// jshint ignore:line
    id: "textarea",
    name: "TextArea",
    category: "web",
    description: "The TextArea widget represents a multi-line plain-text editing control which enables you to style and provide a floating label functionality to textarea elements",
    depends: ["core", "floatinglabel"]
};

(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,
        isPlainObject = $.isPlainObject,
        NS = ".kendoTextArea",
        CHANGE = "change",
        DISABLED = "disabled",
        READONLY = "readonly",
        INPUT = "k-input",
        FOCUSED = "k-state-focused",
        LABELCLASSES = "k-label k-input-label",
        STATEDISABLED = "k-state-disabled",
        STATEREADONLY = "k-state-readonly",
        ARIA_DISABLED = "aria-disabled",
        TEXTAREACONTAINER = "k-textarea-container",
        proxy = $.proxy;

    var TextArea = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            options = $.extend(true, {}, options);

            that.options.value = options.value || that.element.val();
            that.options.readonly = options.readonly !== undefined ? options.readonly : Boolean(that.element.attr("readonly"));
            that.options.enable = options.enable !== undefined ? options.enable : !(Boolean(that.element.attr("disabled")));
            that.options.placeholder = options.placeholder || that.element.attr("placeholder");

            if(!that.options.value.replace(/\s/g, '').length){
                that.options.value = '';
                that.element.val('');
            }

            that.value(that.options.value);
            that._wrapper();
            that._label();
            that._editable({
                readonly: that.options.readonly,
                disable: !(that.options.enable)
            });
            that._applyAttributes();

            that.element
                .addClass(INPUT)
                .css("resize", that.options.resizable)
                .attr("autocomplete", "off");

            kendo.notify(that);
        },

        events: [
            CHANGE
        ],

        attributes: [
            "maxLength",
            "rows",
            "placeholder"
        ],

        options: {
            name: 'TextArea',
            value: '',
            readonly: false,
            enable: true,
            placeholder: '',
            label: null,
            resizable: "none",
            maxLength: null,
            cols: 20,
            rows: 1
        },

        _applyAttributes: function(){
            var that = this;
            var property;
            var attributes = {};

            for (property in that.attributes) {
                attributes[that.attributes[property]] = that.options[that.attributes[property]];
            }

            that.element.attr(attributes);
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._value = value;
            that.element.val(value);
        },

        readonly: function(readonly) {
            var that = this;

            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });

            if (that.floatingLabel) {
                that.floatingLabel.readonly(readonly === undefined ? true : readonly);
            }
        },

        enable: function(enable) {
            var that = this;

            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });

            if (that.floatingLabel) {
                that.floatingLabel.enable(enable = enable === undefined ? true : enable);
            }
        },

        focus: function() {
            var that = this;

            that.element[0].focus();
        },

        destroy: function() {
            var that = this;

            if (that.floatingLabel) {
                that.floatingLabel.destroy();
            }

            that.element.off(NS);
            Widget.fn.destroy.call(that);
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var wrapper = that.wrapper;
            var disable = options.disable;
            var readonly = options.readonly;

            element.off(NS);

            if (!readonly && !disable) {
                element.removeAttr(DISABLED)
                       .removeAttr(READONLY)
                       .attr(ARIA_DISABLED, false);

                wrapper.removeClass(STATEDISABLED)
                        .removeClass(STATEREADONLY);

                element.on("focusin" + NS, proxy(that._focusin, that));
                element.on("focusout" + NS, proxy(that._focusout, that));
            } else {
                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable);

                wrapper.toggleClass(STATEDISABLED, disable)
                        .toggleClass(STATEREADONLY, readonly);
            }
        },

        _label: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var id = element.attr("id");
            var floating;
            var labelText;

            if (options.label !== null) {
                floating = isPlainObject(options.label) ? options.label.floating : false;
                labelText = isPlainObject(options.label) ? options.label.content : options.label;

                if (floating) {
                    that._floatingLabelContainer = that.wrapper.wrap("<span></span>").parent();
                    that.floatingLabel = new kendo.ui.FloatingLabel(that._floatingLabelContainer, { widget: that, useReadOnlyClass: true });
                    that._floatingLabelContainer.addClass(TEXTAREACONTAINER);
                }

                if (kendo.isFunction(labelText)) {
                    labelText = labelText.call(that);
                }

                if (!labelText) {
                    labelText = "";
                }

                if (!id) {
                    id = options.name + "_" + kendo.guid();
                    element.attr("id", id);
                }

                that._inputLabel = $("<label class='" + LABELCLASSES + "' for='" + id + "'>" + labelText + "</label>'").insertBefore(that.wrapper);
            }
        },

        _focusin: function() {
            var that = this;

            that.wrapper.addClass(FOCUSED);
        },

        _focusout: function() {
            var that = this;
            var value = that._value;
            var newValue = that.element.val();

            that.wrapper.removeClass(FOCUSED);

            if (value !== newValue) {
                that._value = newValue;

                that.trigger(CHANGE);
            }
        },

        _wrapper: function () {
            var that = this;
            var element = that.element;
            var DOMElement = element[0];
            var wrapper;

            wrapper = element.wrap("<span class='k-widget k-textarea'></span>").parent();
            wrapper[0].style.cssText = DOMElement.style.cssText;
            DOMElement.style.width = "100%";
            that._inputWrapper = that.wrapper = wrapper.addClass(DOMElement.className).removeClass('input-validation-error');
        }
    });
    ui.plugin(TextArea);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) { (a3 || a2)(); });
