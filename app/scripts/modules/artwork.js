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

            for ( var i = 0; i < 100; i++ ) {

                var r = parseInt( Math.random() * 255 + 1, 10 );
                var g = parseInt( Math.random() * 255 + 1, 10 );
                var b = parseInt( Math.random() * 255 + 1, 10 );

                var w = this.width * 0.1 + Math.random() * this.width * 0.4;
                var h = this.height * 0.1 + Math.random() * this.height * 0.4;

                var x = Math.random() * ( this.width - w );
                var y = Math.random() * ( this.height - h );

                this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                this.ctx.fillRect( x, y, w, h );
            }
        }

    });

});