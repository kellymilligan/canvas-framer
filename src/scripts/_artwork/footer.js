import { _, $, BaseObject } from '../common';

import Artwork from '../_artwork/artwork';

export default Object.assign( Object.create( BaseObject ), {


    ctx : null,

    width: 0,


    setup: function (options) {

        this.ctx = options.config.ctx;
    },

    draw: function () {

        console.log( this.width );

        const FOOTER_HEIGHT = 200;

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = FOOTER_HEIGHT;

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(
            0,
            0,
            this.ctx.canvas.width,
            FOOTER_HEIGHT
        );

        this.ctx.fillStyle = '#000';
        this.ctx.font = "60px 'Roboto Mono'";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Footer Text...", 0, FOOTER_HEIGHT * 0.5);
    }

});