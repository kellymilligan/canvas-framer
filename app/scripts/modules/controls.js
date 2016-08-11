define([

    'lodash',
    'jquery',
    '_baseObject',

    '../utils/event-dispatcher'

], function(

    _,
    $,
    BaseObject,

    EventDispatcher

) { 'use strict';

    // return _.assign( _.create( BaseObject ), {
    return _.assign( _.create( BaseObject ), EventDispatcher, {


        ui: null,


        setup: function (options) {

            this.ui = {

                colorWhite: this.$node.find( '.js-paper-colour__white' ),
                colorBlack: this.$node.find( '.js-paper-colour__black' ),

                sizeA0: this.$node.find( '.js-paper-size__a0' ),
                sizeA1: this.$node.find( '.js-paper-size__a1' ),
                sizeA2: this.$node.find( '.js-paper-size__a2' ),
                sizeA3: this.$node.find( '.js-paper-size__a3' ),
                sizeA4: this.$node.find( '.js-paper-size__a4' ),
                sizeA5: this.$node.find( '.js-paper-size__a5' ),

                orientationPortrait: this.$node.find( '.js-orientation__portrait' ),
                orientationLandscape: this.$node.find( '.js-orientation__landscape' ),

                marginTop: this.$node.find( '.js-margin__top' ),
                marginBottom: this.$node.find( '.js-margin__bottom' ),
                marginLeft: this.$node.find( '.js-margin__left' ),
                marginRight: this.$node.find( '.js-margin__right' ),

                scaleToggle: this.$node.find( '.js-scale__toggle' ),
                footerToggle: this.$node.find( '.js-footer__toggle' ),

                drawButton: this.$node.find( '.js-draw__button' ),
                saveButton: this.$node.find( '.js-save__button' )
            };

            console.log( this.ui );

            this.addEvents();
        },

        addEvents: function () {

            _.bindAll( this,
                'onDrawButtonClick',
                'onColorWhiteClick',
                'onColorBlackClick'
            );

            this.ui.colorWhite.on( 'click', this.onColorWhiteClick );
            this.ui.colorBlack.on( 'click', this.onColorBlackClick );

            this.ui.drawButton.on( 'click', this.onDrawButtonClick );
        },

        resize: function () {

        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

        },


        // Handlers
        // --------

        onColorWhiteClick: function () {

            this.appConfig.selectedPrintConfig.paperColour = '#fff';
        },

        onColorBlackClick: function () {

            this.appConfig.selectedPrintConfig.paperColour = '#000';
        },

        onDrawButtonClick: function () {

            this.dispatchEvent( { type: 'controls:draw' } );
        }

    });

});