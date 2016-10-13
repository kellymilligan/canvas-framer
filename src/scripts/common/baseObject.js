import _ from 'lodash';
import $ from 'webpack-zepto';

export default {


    appConfig: null,
    windowData: null,
    mouseData: null,

    time: null,

    node: null,


    init: function ( options ) {

        this.appConfig = options.appConfig;
        this.windowData = options.windowData;
        this.mouseData = options.mouseData;

        this.node = options.node;

        this.setup( options );
    },

    setup: function ( options ) {},

    createChild: function ( childObject, node = null, options = {} ) {

        var child = Object.create( childObject );

        child.init({

            'appConfig': this.appConfig,
            'windowData': this.windowData,
            'mouseData': this.mouseData,
            'node': node,
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

};