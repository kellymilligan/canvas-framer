define([

    'lodash',
    'jquery',
    '_baseObject',

    '../utils/math/distance'

], function(

    _,
    $,
    BaseObject,

    distance

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        ctx : null,

        width: 0,
        height: 0,


        setup: function (options) {

            this.ctx = options.config.canvas.getContext( '2d' );
        },

        draw: function () {

            this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect(
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );

            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.globalAlpha = 0.65;

            var SEEDS = 3;
            var seed = 0;

            var halfWidth = this.width * 0.5;
            var halfHeight = this.height * 0.5;

            for ( seed; seed < SEEDS; seed++ ) {

                this.ctx.strokeStyle = seed === 0 ? 'rgb(0, 255, 255)' : seed === 1 ? 'rgb(255, 0, 255)' : 'rgb(255, 255, 0)';
                this.ctx.lineWidth = 0.5;

                // var pX = this.lineWidth * 0.3 + Math.random() * this.width * 0.4;
                var pX = halfWidth;
                // var pY = this.height * 0.3 + Math.random() * this.height * 0.4;
                var pY = halfHeight;

                this.ctx.beginPath();
                this.ctx.moveTo( pX, pY );

                for ( var i = 0; i < 40000; i++ ) {

                    var dX = Math.random() > 0.5 ? 1 : -1;
                    var dY = Math.random() > 0.5 ? 1 : -1;

                    // var x = 10 + Math.random() * ( this.width - 20 );
                    // var y = 10 + Math.random() * ( this.height - 20 );

                    var x = parseInt( Math.min( Math.max( pX + dX, 20 ), this.width - 20 ), 10 );
                    var y = parseInt( Math.min( Math.max( pY + dY, 20 ), this.height - 20 ), 10 );

                    // Prevent rendering over previous pixel
                    if ( x === pX || y === pY ) { continue; }

                    // constrain to circle
                    var d = distance( halfWidth, halfHeight, x, y );
                    // console.log( d );
                    if ( d > ( this.width - 40 ) * 0.5 ) { continue; }

                    pX = x;
                    pY = y;

                    this.ctx.lineTo( x, y );
                }

                this.ctx.stroke();
                // this.ctx.closePath();

            }
        }

    });

});