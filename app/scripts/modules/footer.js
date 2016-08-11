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


        FOOTER_HEIGHT: 10,

        ctx : null,

        width: 0,


        setup: function (options) {

            this.ctx = options.config.ctx;

            console.log( this.ctx );
        },

        draw: function () {

            this.ctx.fillStyle = "rgb(255, 0, 0)";
            this.ctx.fillRect(
                0,
                0,
                this.ctx.canvas.width,
                this.FOOTER_HEIGHT
            );
        }

    });

});