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

            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.globalAlpha = 0.01;

            for ( var i = 0; i < 8000; i++ ) {

                var r = 200 + parseInt( Math.random() * 55 + 1, 10 );
                var g = parseInt( Math.random() * 50 + 1, 10 );
                var b = parseInt( Math.random() * 100, 10 );

                var w = this.width * 0.02 + Math.random() * this.width * 0.08;
                // var h = this.height * 0.1 + Math.random() * this.height * 0.4;
                var h = w;

                var x = 10 + Math.random() * ( this.width - 20 - w );
                var y = 10 + Math.random() * ( this.height - 20 - h );

                this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                this.ctx.fillRect( x, y, w, h );
            }
        }

    });

});