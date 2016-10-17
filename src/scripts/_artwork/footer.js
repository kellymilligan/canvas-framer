import { _, $, BaseObject } from '../common';

import Artwork from '../_artwork/artwork';

import drawCircle from '../utils/canvas/draw_circle';

export default Object.assign( Object.create( BaseObject ), {


    ctx : null,

    width: 0,


    setup: function (options) {

        this.ctx = options.config.ctx;
    },

    draw: function () {

        const FOOTER_HEIGHT = 160;
        const STAMP_RADIUS = 40;

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = FOOTER_HEIGHT;

        // Background
        this.ctx.save();
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(
            0,
            0,
            this.ctx.canvas.width,
            FOOTER_HEIGHT
        );
        this.ctx.restore();

        // Stamp
        this.ctx.save();
        this.ctx.fillStyle = 'rgb(37, 26, 48)';
        drawCircle( this.ctx, STAMP_RADIUS, FOOTER_HEIGHT - STAMP_RADIUS, STAMP_RADIUS );
        this.ctx.fill();
        this.ctx.restore();

        // Text
        this.ctx.save();
        this.ctx.fillStyle = '#000';
        this.ctx.font = '60px bold "Roboto Mono"';
        this.ctx.fillText("Footer Text...", STAMP_RADIUS * 2 + STAMP_RADIUS, FOOTER_HEIGHT - STAMP_RADIUS * 0.5 );
        this.ctx.restore();
    }

});