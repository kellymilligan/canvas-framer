import { _, $, BaseObject } from '../common';

import Artwork from '../_artwork/artwork';

import drawCircle from '../utils/canvas/draw_circle';


const TEXT_NAME = '...';

export default Object.assign( Object.create( BaseObject ), {


    ctx : null,

    width: 0,


    setup: function (options) {

        this.ctx = options.config.ctx;
    },

    draw: function () {

        const FOOTER_HEIGHT = 80;
        const STAMP_RADIUS = 18;

        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = FOOTER_HEIGHT;

        // Background
        this.ctx.save();
        this.ctx.fillStyle = this.appConfig.selectedPrintConfig.paperColour;
        this.ctx.fillRect(
            0,
            0,
            this.ctx.canvas.width,
            FOOTER_HEIGHT
        );
        this.ctx.restore();

        // Stamp
        this.ctx.save();
        this.ctx.fillStyle = this.appConfig.selectedPrintConfig.paperColour === 'white' ? 'rgb(37, 26, 48)' : 'rgb(90, 244, 199)';
        drawCircle( this.ctx, STAMP_RADIUS, FOOTER_HEIGHT - STAMP_RADIUS, STAMP_RADIUS );
        this.ctx.fill();
        this.ctx.restore();

        // Text
        const textColor = this.appConfig.selectedPrintConfig.paperColour === 'white' ? 'black' : 'white';

        let renderCount = '' + this.appConfig.currentRenderCount;
        renderCount = ( '000' + renderCount ).substring( renderCount.length );

        let textMeta = 'RENDER #' + renderCount;

        this.ctx.save();
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = textColor;
        this.ctx.font = '24px "Roboto Mono"';
        this.ctx.fillText( TEXT_NAME, this.width * 0.5, FOOTER_HEIGHT - STAMP_RADIUS * 0.5 );
        this.ctx.restore();

        this.ctx.save();
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = textColor;
        this.ctx.font = '24px "Roboto Mono"';
        this.ctx.fillText( textMeta, this.width, FOOTER_HEIGHT - STAMP_RADIUS * 0.5 );
        this.ctx.restore();
    }

});