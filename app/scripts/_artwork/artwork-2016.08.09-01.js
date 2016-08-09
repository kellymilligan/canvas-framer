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


        ctx : null,

        width: 0,
        height: 0,


        setup: function (options) {

            this.ctx = options.config.ctx;

            console.log( this.ctx );
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
            this.ctx.globalAlpha = 0.5;

            var SEEDS = 3;
            var seed = 0;

            for ( seed; seed < SEEDS; seed++ ) {

                this.ctx.strokeStyle = seed === 0 ? 'rgb(0, 255, 255)' : seed === 1 ? 'rgb(255, 0, 255)' : 'rgb(255, 255, 0)';
                this.ctx.lineWidth = 0.5;

                var pX = this.width * 0.3 + Math.random() * this.width * 0.4;
                var pY = this.height * 0.3 + Math.random() * this.height * 0.4;

                this.ctx.beginPath();
                this.ctx.moveTo( pX, pY );

                for ( var i = 0; i < 300000; i++ ) {

                    var dX = Math.random() > 0.5 ? 1 : -1;
                    var dY = Math.random() > 0.5 ? 1 : -1;

                    // var x = 10 + Math.random() * ( this.width - 20 );
                    // var y = 10 + Math.random() * ( this.height - 20 );

                    var x = Math.min( Math.max( pX + dX, 20 ), this.width - 20 );
                    var y = Math.min( Math.max( pY + dY, 20 ), this.height - 20 );

                    // Prevent rendering over previous pixel
                    // if ( x === pX || y === pY ) { continue; }

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