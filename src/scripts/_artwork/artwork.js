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
        // this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.globalAlpha = 0.2;

        var colours = [
            // 'rgb(0, 100, 255)',
            // 'rgb(0, 255, 100)',
            // 'rgb(0, 150, 150)',
            // 'rgb(100, 0, 255)'

            'rgb(255, 0, 86)',
            'rgb(0, 255, 169)'
        ];

        var biasX = [
            0,
            0/*,
            0,
            0*/
        ];

        var biasY = [
            0,
            0/*,
            0,
            0*/
        ];

        const SEEDS = colours.length;
        var seed = 0;

        var halfWidth = this.width * 0.5;
        var halfHeight = this.height * 0.5;

        for ( seed; seed < SEEDS; seed++ ) {

            this.ctx.fillStyle = colours[ seed ];

            let pX = halfWidth + parseInt( halfWidth * biasX[ seed ], 10 );
            let pY = halfHeight + parseInt( halfHeight * biasY[ seed ], 10 );

            for ( let i = 0; i < 100000; i++ ) {

                let r = Math.random() * 0.1 + 0.25;

                // Prevent rendering over previous pos
                // if ( x === pX || y === pY ) { continue; }

                // constrain to circle
                // let d = distance( halfWidth, halfHeight, x, y );
                // if ( d > ( this.width - 40 ) * 0.5 ) { continue; }

                let iteration = this.iterate( pX, pY );

                while ( iteration[ 0 ] === pX && iteration[ 1 ] === pY ) {

                    console.log('extra iteration');
                    iteration = this.iterate( pX, pY );
                }

                drawCircle( this.ctx, iteration[ 0 ], iteration[ 1 ], r );
                this.ctx.fill();

                pX = iteration[ 0 ];
                pY = iteration[ 1 ];
            }

        }
    },

    iterate: function (pX, pY) {

        let spread = 1;
        let boundingMarginX = 1;
        let boundingMarginY = 6;

        let dX = Math.random() > 0.5 ? 1 : -1;
        let dY = Math.random() > 0.5 ? 1 : -1;

        let x = parseInt( Math.min( Math.max( pX + dX * spread, boundingMarginX ), this.width - boundingMarginX ), 10 );
        let y = parseInt( Math.min( Math.max( pY + dY * spread, boundingMarginY ), this.height - boundingMarginY ), 10 );

        return [ x, y ];
    }

});