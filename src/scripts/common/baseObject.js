define([

    'lodash',
    'jquery'

], function(

    _,
    $

) { 'use strict';

    return {


        appConfig: null,
        windowData: null,
        mouseData: null,

        time: null,

        $node: null,


        init: function (options) {

            this.appConfig = options.appConfig;
            this.windowData = options.windowData;
            this.mouseData = options.mouseData;

            this.$node = options.$node;

            this.setup(options);
        },

        setup: function (options) {},

        createChild: function (object, $node, options) {

            $node = $node || null;
            options = options || {};

            var child = _.create(object);

            child.init({
                'appConfig': this.appConfig,
                'windowData': this.windowData,
                'mouseData': this.mouseData,
                '$node': $node,
                'config': options
            });

            return child;
        },

        resize: function () {},

        mouseMove: function () {},

        animFrame: function (t, options) {

            this.time = t;

            this.onAnimFrame(options);
        },

        onAnimFrame: function () {},

        applyCssTransform: function (element, transformString) {

            element.style.mozTransform = transformString;
            element.style.webkitTransform = transformString;
            element.style.transform = transformString;
        }

    };

});