import { _, $, BaseObject } from '../common';

import EventDispatcher from '../utils/event-dispatcher';

export default Object.assign( Object.create( BaseObject ), EventDispatcher, {


    ui: null,


    // Setup
    // -----

    setup: function (options) {

        this.ui = {

            colorWhite: this.node.find( '.js-paper-colour__white' ),
            colorBlack: this.node.find( '.js-paper-colour__black' ),

            sizeA0: this.node.find( '.js-paper-size__a0' ),
            sizeA1: this.node.find( '.js-paper-size__a1' ),
            sizeA2: this.node.find( '.js-paper-size__a2' ),
            sizeA3: this.node.find( '.js-paper-size__a3' ),
            sizeA4: this.node.find( '.js-paper-size__a4' ),
            sizeA5: this.node.find( '.js-paper-size__a5' ),

            orientationPortrait: this.node.find( '.js-orientation__portrait' ),
            orientationLandscape: this.node.find( '.js-orientation__landscape' ),

            marginTop: this.node.find( '.js-margin__top' ),
            marginBottom: this.node.find( '.js-margin__bottom' ),
            marginLeft: this.node.find( '.js-margin__left' ),
            marginRight: this.node.find( '.js-margin__right' ),

            scaleFixed: this.node.find( '.js-scale__fixed' ),
            scaleToPaper: this.node.find( '.js-scale__paper' ),

            footerInclude: this.node.find( '.js-footer__include' ),
            footerExclude: this.node.find( '.js-footer__exclude' ),

            drawButton: this.node.find( '.js-draw__button' ),
            saveButton: this.node.find( '.js-save__button' )
        };

        this.addEvents();
    },

    addEvents: function () {

        _.bindAll( this,
            'onColorWhiteClick',
            'onColorBlackClick',
            'onSizeA0Click',
            'onSizeA1Click',
            'onSizeA2Click',
            'onSizeA3Click',
            'onSizeA4Click',
            'onSizeA5Click',
            'onOrientationPortraitClick',
            'onOrientationLandscapeClick',
            'onMarginTopChange',
            'onMarginBottomChange',
            'onMarginLeftChange',
            'onMarginRightChange',
            'onScaleFixedClick',
            'onScaleToPaperClick',
            'onFooterIncludeClick',
            'onFooterExcludeClick',
            'onDrawButtonClick',
            'onSaveButtonClick'
        );

        this.ui.colorWhite.on( 'click', this.onColorWhiteClick );
        this.ui.colorBlack.on( 'click', this.onColorBlackClick );

        this.ui.sizeA0.on( 'click', this.onSizeA0Click );
        this.ui.sizeA1.on( 'click', this.onSizeA1Click );
        this.ui.sizeA2.on( 'click', this.onSizeA2Click );
        this.ui.sizeA3.on( 'click', this.onSizeA3Click );
        this.ui.sizeA4.on( 'click', this.onSizeA4Click );
        this.ui.sizeA5.on( 'click', this.onSizeA5Click );

        this.ui.orientationPortrait.on( 'click', this.onOrientationPortraitClick );
        this.ui.orientationLandscape.on( 'click', this.onOrientationLandscapeClick );

        this.ui.marginTop.on( 'change paste keyup', this.onMarginTopChange );
        this.ui.marginBottom.on( 'change paste keyup', this.onMarginBottomChange );
        this.ui.marginLeft.on( 'change paste keyup', this.onMarginLeftChange );
        this.ui.marginRight.on( 'change paste keyup', this.onMarginRightChange );

        this.ui.scaleFixed.on( 'click', this.onScaleFixedClick );
        this.ui.scaleToPaper.on( 'click', this.onScaleToPaperClick );

        this.ui.footerInclude.on( 'click', this.onFooterIncludeClick );
        this.ui.footerExclude.on( 'click', this.onFooterExcludeClick );

        this.ui.drawButton.on( 'click', this.onDrawButtonClick );
        this.ui.saveButton.on( 'click', this.onSaveButtonClick );
    },


    // Update
    // ------

    resize: function () {

    },

    mouseMove: function () {

    },

    onAnimFrame: function () {

    },


    // Handlers
    // --------

    onColorWhiteClick: function () {

        this.appConfig.selectedPrintConfig.paperColour = 'white';
        this.ui.colorBlack.removeClass( 'is-selected' );
        this.ui.colorWhite.addClass( 'is-selected' );
    },

    onColorBlackClick: function () {

        this.appConfig.selectedPrintConfig.paperColour = 'black';
        this.ui.colorBlack.addClass( 'is-selected' );
        this.ui.colorWhite.removeClass( 'is-selected' );
    },

    onSizeA0Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A0;
        this.selectPaperSize( this.ui.sizeA0 );
    },

    onSizeA1Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A1;
        this.selectPaperSize( this.ui.sizeA1 );
    },

    onSizeA2Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A2;
        this.selectPaperSize( this.ui.sizeA2 );
    },

    onSizeA3Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A3;
        this.selectPaperSize( this.ui.sizeA3 );
    },

    onSizeA4Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A4;
        this.selectPaperSize( this.ui.sizeA4 );
    },

    onSizeA5Click: function () {

        this.appConfig.selectedPrintConfig.paperSize = this.appConfig.PAPER_SIZES.A5;
        this.selectPaperSize( this.ui.sizeA5 );
    },

    onOrientationPortraitClick: function () {

        this.appConfig.selectedPrintConfig.paperOrientation = 'portrait';
        this.ui.orientationPortrait.addClass( 'is-selected' );
        this.ui.orientationLandscape.removeClass( 'is-selected' );
    },

    onOrientationLandscapeClick: function () {

        this.appConfig.selectedPrintConfig.paperOrientation = 'landscape';
        this.ui.orientationLandscape.addClass( 'is-selected' );
        this.ui.orientationPortrait.removeClass( 'is-selected' );
    },

    onMarginTopChange: function () {

        this.appConfig.selectedPrintConfig.paperMarginTop = this.ui.marginTop[0].value;
    },

    onMarginBottomChange: function () {

        this.appConfig.selectedPrintConfig.paperMarginBottom = this.ui.marginBottom[0].value;
    },

    onMarginLeftChange: function () {

        this.appConfig.selectedPrintConfig.paperMarginLeft = this.ui.marginLeft[0].value;
    },

    onMarginRightChange: function () {

        this.appConfig.selectedPrintConfig.paperMarginRight = this.ui.marginRight[0].value;
    },

    onScaleFixedClick: function () {

        this.appConfig.selectedPrintConfig.drawFixedScale = true;
        this.ui.scaleFixed.addClass( 'is-selected' );
        this.ui.scaleToPaper.removeClass( 'is-selected' );
    },

    onScaleToPaperClick: function () {

        this.appConfig.selectedPrintConfig.drawFixedScale = false;
        this.ui.scaleToPaper.addClass( 'is-selected' );
        this.ui.scaleFixed.removeClass( 'is-selected' );
    },

    onFooterIncludeClick: function  () {

        this.appConfig.selectedPrintConfig.drawFooter = true;
        this.ui.footerInclude.addClass( 'is-selected' );
        this.ui.footerExclude.removeClass( 'is-selected' );
    },

    onFooterExcludeClick: function  () {

        this.appConfig.selectedPrintConfig.drawFooter = false;
        this.ui.footerExclude.addClass( 'is-selected' );
        this.ui.footerInclude.removeClass( 'is-selected' );
    },

    onDrawButtonClick: function () {

        this.dispatchEvent( { type: 'controls:draw' } );
    },

    onSaveButtonClick: function () {

        this.dispatchEvent( { type: 'controls:save' } );
    },


    // Helpers
    // -------

    selectPaperSize: function ( selectedEl ) {

        this.ui.sizeA0.removeClass( 'is-selected' );
        this.ui.sizeA1.removeClass( 'is-selected' );
        this.ui.sizeA2.removeClass( 'is-selected' );
        this.ui.sizeA3.removeClass( 'is-selected' );
        this.ui.sizeA4.removeClass( 'is-selected' );
        this.ui.sizeA5.removeClass( 'is-selected' );

        selectedEl.addClass( 'is-selected ');
    }

});