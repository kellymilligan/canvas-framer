import { _, $, BaseObject } from '../common';

import distance from '../utils/math/distance';
import drawCircle from '../utils/canvas/draw_circle';

export default Object.assign( Object.create( BaseObject ), {


    ctx : null,

    width: 0,
    height: 0,


    setup: function (options) {

        this.ctx = options.config.canvas.getContext( '2d' );
    },

    draw: function () {

        // this.ctx.fillStyle = "rgb(0, 0, 0)";
        // this.ctx.fillRect(
        //     0,
        //     0,
        //     this.ctx.canvas.width,
        //     this.ctx.canvas.height
        // );

        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.globalAlpha = 0.1;

        const SEEDS = 4;
        var seed = 0;

        var halfWidth = this.width * 0.5;
        var halfHeight = this.height * 0.5;

        var colours = [
            'rgb(255, 0, 0)',
            'rgb(30, 30, 30)',
            'rgb(60, 60, 60)',
            'rgb(255, 90, 90)'
        ];

        var biasX = [
            0,
            0,
            0,
            0
        ];

        var biasY = [
            0,
            0,
            0,
            0
        ];

        for ( seed; seed < SEEDS; seed++ ) {

            this.ctx.fillStyle = colours[ seed ];

            let pX = halfWidth + parseInt( halfWidth * biasX[ seed ], 10 );
            let pY = halfHeight + parseInt( halfHeight * biasY[ seed ], 10 );

            let spread = 1;
            let boundingMarginX = 1;
            let boundingMarginY = 6;

            for ( let i = 0; i < 40000; i++ ) {

                let dX = Math.random() > 0.5 ? 1 : -1;
                let dY = Math.random() > 0.5 ? 1 : -1;

                let x = parseInt( Math.min( Math.max( pX + dX * spread, boundingMarginX ), this.width - boundingMarginX ), 10 );
                let y = parseInt( Math.min( Math.max( pY + dY * spread, boundingMarginY ), this.height - boundingMarginY ), 10 );

                let r = Math.random() * 0.1 + 0.2;

                // Prevent rendering over previous pos
                if ( x === pX || y === pY ) { continue; }

                // constrain to circle
                // let d = distance( halfWidth, halfHeight, x, y );
                // if ( d > ( this.width - 40 ) * 0.5 ) { continue; }

                pX = x;
                pY = y;

                drawCircle( this.ctx, x, y, r );
                this.ctx.fill();

            }

        }
    }

});