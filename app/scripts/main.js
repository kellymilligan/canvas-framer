define([

    'lodash',
    'jquery',

    './modules/controls',
    './modules/workboard'

], function(

    _,
    $,

    Controls,
    Workboard

) { 'use strict';

    require('!style!css!sass!../styles/main.scss');

    var main = {


        $window    : null,
        $document  : null,
        $html      : null,
        $root      : null,

        $controls  : null,
        $workboard : null,

        appConfig  : null,
        windowData : null,
        mouseData  : null,

        controls   : null,
        workboard  : null,


        start: function() {

            _.bindAll( this,
                'onResize',
                'onMouseMove',
                'onAnimFrame'
            );

            this.$window = $(window);
            this.$document = $(document);
            this.$html = $(document.documentElement);
            this.$root = $('.js-root');

            this.$controls = $('.js-controls');
            this.$workboard = $('.js-workboard');

            this.appConfig = {

                // Sizes in mm, portrait by default
                PAPER_SIZES: {
                    A0: {
                        WIDTH       : 841,
                        HEIGHT      : 1189
                    },
                    A1: {
                        WIDTH       : 594,
                        HEIGHT      : 841
                    },
                    A2: {
                        WIDTH       : 420,
                        HEIGHT      : 594
                    },
                    A3: {
                        WIDTH       : 297,
                        HEIGHT      : 420
                    },
                    A4: {
                        WIDTH       : 210,
                        HEIGHT      : 297
                    },
                },

                // pixels per mm ( 300dpi / 2.54 / 10 )
                PRINT_RESOLUTION    : 11.8,

                CONTROLS_WIDTH      : 200,

                // Selected
                selectedPrintConfig : null
            };

            this.windowData = {

                width: 0,
                height: 0,
                ratio: 0,
            };

            this.mouseData = {

                x: 0,
                y: 0,
                nX: 0,
                nY: 0
            };

            this.setDefaults();

            this.createControls();
            this.createWorkboard();

            this.addEvents();

            this.onResize();

            // Start anim frame
            window.requestAnimationFrame(this.onAnimFrame);
        },

        setDefaults: function () {

            this.appConfig.selectedPrintConfig = {

                'paperSize'         : this.appConfig.PAPER_SIZES.A3,
                'paperMarginTop'    : 20,
                'paperMarginBottom' : 20,
                'paperMarginLeft'   : 20,
                'paperMarginRight'  : 20
            };
        },

        createControls: function () {

            this.controls = _.create( Controls );

            this.controls.init({
                'appConfig': this.appConfig,
                'windowData': this.windowData,
                'mouseData': this.mouseData,
                '$node': this.$controls,
                'config': {}
            });
        },

        createWorkboard: function () {

            this.workboard = _.create( Workboard );

            this.workboard.init({
                'appConfig': this.appConfig,
                'windowData': this.windowData,
                'mouseData': this.mouseData,
                '$node': this.$workboard,
                'config': {}
            });
        },

        addEvents: function () {

            this.$window.on( 'resize', this.onResize );
            this.$document.on( 'mousemove', this.onMouseMove );
        },


        // HANDLERS -----------------------------------------------------

        onResize: function () {

            this.windowData.width = this.$window.width();
            this.windowData.height = this.$window.height();
            this.windowData.ratio = this.windowData.width / this.windowData.height;

            this.$html[0].style.fontSize = 10 * this.windowData.scale + 'px';

            this.controls.resize();
            this.workboard.resize();
        },

        onMouseMove: function (e) {

            this.mouseData.x = e.clientX;
            this.mouseData.y = e.clientY;

            this.mouseData.nX = ( this.mouseData.x / this.windowData.width ) * 2 - 1;
            this.mouseData.nY = ( this.mouseData.y / this.windowData.height ) * 2 - 1;
        },

        onAnimFrame: function (t) {

            var time = Date.now();

            window.requestAnimationFrame(this.onAnimFrame);
        }

    };

    main.start();

});