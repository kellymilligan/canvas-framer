define([

    'lodash',
    'jquery',
    '_baseObject'

], function(

    _,
    $,
    BaseObject

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        ctx: null, // Must be set in setup()

        width: 0,
        height: 0,


        setup: function (options) {

            this.ctx = options.config.canvas.getContext( '2d' );
        },

        draw: function () {

            this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

            this.ctx.fillStyle = '#0ff';
            this.ctx.globalAlpha = 0.5;
            this.ctx.globalCompositeOperation = 'lighter';

            for ( var i = 1; i < 200; i++ ) {

                var w = Math.random() * 40 + 10;
                var h = Math.random() * 40 + 10;

                this.ctx.fillRect(
                    this.width * 0.1 + Math.random() * this.width * 0.8 - w * 0.5,
                    this.height * 0.1 + Math.random() * this.height * 0.8 - h * 0.5,
                    w,
                    h
                );
            }

        }

    });

});