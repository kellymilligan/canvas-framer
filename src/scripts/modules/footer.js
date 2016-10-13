import { _, $, BaseObject } from '../common';

import Artwork from '../_artwork/artwork';

export default Object.assign( Object.create( BaseObject ), {


    ctx : null,

    width: 0,


    setup: function (options) {

        this.ctx = options.config.ctx;

        console.log( this.ctx );
    },

    draw: function () {

        const FOOTER_HEIGHT = 10;

        this.ctx.fillStyle = "rgb(255, 0, 0)";
        this.ctx.fillRect(
            0,
            0,
            this.ctx.canvas.width,
            FOOTER_HEIGHT
        );
    }

});