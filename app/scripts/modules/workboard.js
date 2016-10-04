define([

    'lodash',
    'jquery',
    '_baseObject',

    '../_artwork/artwork'

], function(

    _,
    $,
    BaseObject,

    Artwork

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        WORKBOARD_MARGIN: 50,

        workboardWidth: 0,

        previewWidth: 0,
        previewHeight: 0,

        artworkWidth: 0,
        artworkHeight: 0,

        paperCtx: null,
        artworkCtx: null,

        artwork: null,

        drawConfig: null,

        $paper: null,


        setup: function (options) {

            this.$paper = this.$node.find('.js-workboard__paper');

            var paperCanvas = document.createElement( 'canvas' );
            this.paperCtx = paperCanvas.getContext('2d');
            this.$paper.append( paperCanvas );

            // The artwork class is responsible for creating it's required context
            var artworkCanvas = document.createElement( 'canvas' );
            this.artwork = this.createChild( Artwork, null, { canvas: artworkCanvas } );

            if ( this.artwork.ctx ) {

                this.artworkCtx = this.artwork.ctx;
            }
            else {

                // Handle noContext error and print error message
                this.artworkCtx = artworkCanvas.getContext( '2d' );
                this.resize();
                this.paperCtx.font = "72pt Roboto Mono";
                this.paperCtx.fillStyle = "red";
                this.paperCtx.fillText("ERROR: No arwork canvas context... Check console...", 280, 400);
                throw new Error( 'The artwork canvas doesn\'t have a context! Ensure you\'re creating one in setup() in artwork.js' );
            }

            this.resize();
        },

        resize: function () {

            var width = this.appConfig.selectedPrintConfig.paperOrientation === 'landscape' ? this.appConfig.selectedPrintConfig.paperSize.HEIGHT : this.appConfig.selectedPrintConfig.paperSize.WIDTH;
            var height = this.appConfig.selectedPrintConfig.paperOrientation === 'landscape' ? this.appConfig.selectedPrintConfig.paperSize.WIDTH : this.appConfig.selectedPrintConfig.paperSize.HEIGHT;

            var scaleAdjustment = this.appConfig.selectedPrintConfig.drawFixedScale ? this.appConfig.selectedPrintConfig.paperSize.WIDTH / this.appConfig.PAPER_SIZES.A3.WIDTH : 1;

            // Prep for artwork creation
            var artworkWidth = width - this.appConfig.selectedPrintConfig.paperMarginLeft - this.appConfig.selectedPrintConfig.paperMarginRight;
            var artworkHeight = height - this.appConfig.selectedPrintConfig.paperMarginTop - this.appConfig.selectedPrintConfig.paperMarginBottom;

            this.artwork.width = artworkWidth / scaleAdjustment;
            this.artwork.height = artworkHeight / scaleAdjustment;

            // Resize preivew
            this.workboardWidth = this.windowData.width - this.appConfig.CONTROLS_WIDTH;

            this.previewWidth = this.workboardWidth - this.WORKBOARD_MARGIN * 2;
            this.previewHeight = this.previewWidth / ( width / height );

            this.$paper[0].style.width = this.previewWidth + 'px';
            this.$paper[0].style.height = this.previewHeight + 'px';

            this.$paper[0].style.marginLeft = this.WORKBOARD_MARGIN + 'px';
            this.$paper[0].style.marginRight = this.WORKBOARD_MARGIN + 'px';

            this.$node[0].style.paddingTop = this.WORKBOARD_MARGIN - 6 + 'px';
            this.$node[0].style.paddingBottom = this.WORKBOARD_MARGIN + 'px';

            // Resize paper canvas
            var paperWidth = parseInt( width * this.appConfig.PRINT_RESOLUTION, 10 );
            var paperHeight = parseInt( height * this.appConfig.PRINT_RESOLUTION, 10 );

            this.paperCtx.canvas.width = paperWidth;
            this.paperCtx.canvas.height = paperHeight;

            var paperMargins = {
                top: this.appConfig.selectedPrintConfig.paperMarginTop * this.appConfig.PRINT_RESOLUTION,
                bottom: this.appConfig.selectedPrintConfig.paperMarginBottom * this.appConfig.PRINT_RESOLUTION,
                left: this.appConfig.selectedPrintConfig.paperMarginLeft * this.appConfig.PRINT_RESOLUTION,
                right: this.appConfig.selectedPrintConfig.paperMarginRight * this.appConfig.PRINT_RESOLUTION
            };

            // Resize artwork canvas
            var artworkPaperWidth = paperWidth - paperMargins.left - paperMargins.right;
            var artworkPaperHeight = paperHeight - paperMargins.top - paperMargins.bottom;

            this.artworkCtx.canvas.width = artworkPaperWidth;
            this.artworkCtx.canvas.height = artworkPaperHeight;

            this.artworkCtx.scale( this.appConfig.PRINT_RESOLUTION * scaleAdjustment, this.appConfig.PRINT_RESOLUTION * scaleAdjustment );

            // Store draw config
            this.drawConfig = {

                paperWidth: paperWidth,
                paperHeight: paperHeight,
                paperMargins: paperMargins,
                artworkPaperWidth: artworkPaperWidth,
                artworkPaperHeight: artworkPaperHeight
            };
        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

        },

        drawArtwork: function () {

            this.paperCtx.clearRect( 0, 0, this.paperCtx.canvas.width, this.paperCtx.canvas.height );
            this.artworkCtx.clearRect( 0, 0, this.artworkCtx.canvas.width, this.artworkCtx.canvas.height );

            this.artworkCtx.save();
            this.artwork.draw();
            this.artworkCtx.restore();

            this.paperCtx.fillStyle = this.appConfig.selectedPrintConfig.paperColour;
            this.paperCtx.fillRect( 0, 0, this.paperCtx.canvas.width, this.paperCtx.canvas.height );

            this.paperCtx.drawImage(
                this.artworkCtx.canvas,
                this.drawConfig.paperMargins.left,
                this.drawConfig.paperMargins.top,
                this.drawConfig.artworkPaperWidth,
                this.drawConfig.artworkPaperHeight
            );
        },

        getCanvas: function () {

            return this.paperCtx.canvas;
        }

    });

});