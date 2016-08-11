define([

    'lodash',
    'jquery',
    'TweenMax',
    '_baseObject'

], function(

    _,
    $,
    TweenMax,
    BaseObject

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        $canvas     : null,
        canvas      : null,
        ctx         : null,

        pixelRatio  : 1,

        invalidated : false,


        setup: function () {

            this.canvas = document.createElement('canvas');
            this.$canvas = $(this.canvas);

            this.$node.append( this.$canvas );

            this.ctx = this.canvas.getContext('2d');

            this.resize();
            this.invalidated = true;
        },

        resize: function () {

            this.pixelRatio = window.devicePixelRatio || 1;

            this.canvas.width = this.windowData.width * this.pixelRatio;
            this.canvas.height = this.windowData.height * this.pixelRatio;

            this.canvas.style.width = this.windowData.width + 'px';
            this.canvas.style.height = this.windowData.height + 'px';
        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

            this.draw();
        },

        draw: function () {

            if ( !this.invalidated ) { return; }

            this.ctx.fillStyle = "rgb(12, 227, 185)";
            this.ctx.fillRect(
                this.mouseData.x - 5,
                this.mouseData.y - 5,
                10,
                10
            );
        }

    });

});