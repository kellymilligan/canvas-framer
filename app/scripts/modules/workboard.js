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


        PAPER_MARIGN: 50,

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

            this.paperWidth = this.workboardWidth - this.PAPER_MARIGN * 2;
            this.paperHeight = this.paperWidth / 0.707; // TEMP

            // Resize preivew
            this.$paper[0].style.width = this.paperWidth + 'px';
            this.$paper[0].style.height = this.paperHeight + 'px';

            this.$paper[0].style.marginLeft = this.PAPER_MARIGN + 'px';
            this.$paper[0].style.marginRight = this.PAPER_MARIGN + 'px';

            this.$node[0].style.paddingTop = this.PAPER_MARIGN - 6 + 'px';
            this.$node[0].style.paddingBottom = this.PAPER_MARIGN + 'px';

            // Resize canvasses
            this.paperCtx.canvas.width = 3000;
            this.paperCtx.canvas.height = 2100;
        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

        }

    });

});