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

            for ( var i = 0; i < 500; i++ ) {

                var r = 200 + parseInt( Math.random() * 55 + 1, 10 );
                var g = 20 + parseInt( Math.random() * 155 + 1, 10 );
                var b = parseInt( Math.random() * 0, 10 );

                var w = this.width * 0.02 + Math.random() * this.width * 0.1;
                // var h = this.height * 0.1 + Math.random() * this.height * 0.4;
                var h = w;

                var x = Math.random() * ( this.width - w );
                var y = Math.random() * ( this.height - h );

                this.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                this.ctx.fillRect( x, y, w, h );
            }
        }

    });

});