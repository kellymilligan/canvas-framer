define([

    'lodash',
    'jquery',
    '_baseObject'//,

    // '../utils/create_canvas',
    // '../utils/resize_canvas'

], function(

    _,
    $,
    BaseObject//,

    // createCanvas,
    // resizeCanvas

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        WORKBOARD_MARGIN: 50,

        workboardWidth: 0,

        paperWidth: 0,
        paperHeight: 0,

        $paper: null,

        paperCtx: null,
        artworkCtx: null,


        setup: function (options) {

            this.$paper = this.$node.find('.js-workboard__paper');

            var paperCanvas = document.createElement( 'canvas' );
            this.paperCtx = paperCanvas.getContext('2d');
            this.$paper.append( paperCanvas );

            var artworkCanvas = document.createElement( 'canvas' );
            this.artworkCtx = artworkCanvas.getContext('2d');

            this.resize();
        },

        resize: function () {

            this.workboardWidth = this.windowData.width - this.appConfig.CONTROLS_WIDTH;

            this.paperWidth = this.workboardWidth - this.WORKBOARD_MARGIN * 2;
            this.paperHeight = this.paperWidth / 0.707; // TEMP

            // Resize preivew
            this.$paper[0].style.width = this.paperWidth + 'px';
            this.$paper[0].style.height = this.paperHeight + 'px';

            this.$paper[0].style.marginLeft = this.WORKBOARD_MARGIN + 'px';
            this.$paper[0].style.marginRight = this.WORKBOARD_MARGIN + 'px';

            this.$node[0].style.paddingTop = this.WORKBOARD_MARGIN - 6 + 'px';
            this.$node[0].style.paddingBottom = this.WORKBOARD_MARGIN + 'px';

            // Resize canvasses
            var printWidth = this.appConfig.selectedPrintConfig.paperSize.WIDTH * this.appConfig.PRINT_RESOLUTION;
            var printHeight = this.appConfig.selectedPrintConfig.paperSize.HEIGHT * this.appConfig.PRINT_RESOLUTION;

            this.paperCtx.canvas.width = printWidth;
            this.paperCtx.canvas.height = printHeight;
        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

        }

    });

});