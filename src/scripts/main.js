import { _, $ } from './common';

import Controls from './modules/controls';
import Workboard from './modules/workboard';

export default function () {


    let ui = null;

    let appConfig = null;
    let windowData = null;
    let mouseData = null;

    let controls = null;
    let workboard = null;

    start();


    // Setup
    // -----

    function start() {

        ui = {

            $window: $(window),
            $document: $(document),
            $html: $(document.documentElement),
            $root: $('.js-root'),
            $controls: $('.js-controls'),
            $workboard: $('.js-workboard')
        };

        appConfig = {

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
                A5: {
                    WIDTH       : 148,
                    HEIGHT      : 210
                }
            },

            // pixels per mm ( 300dpi / 2.54 / 10 )
            PRINT_RESOLUTION    : 11.81102362204724, //11.8,

            CONTROLS_WIDTH      : 240,

            // Selected
            selectedPrintConfig : null
        };

        windowData = {

            width: 0,
            height: 0,
            ratio: 0,
        };

        mouseData = {

            x: 0,
            y: 0,
            nX: 0,
            nY: 0
        };

        setDefaults();

        createControls();
        createWorkboard();

        addEvents();

        onResize();

        // Start anim frame
        window.requestAnimationFrame( onAnimFrame );
    }

    function setDefaults() {

        appConfig.selectedPrintConfig = {

            'paperColour'       : '#fff',
            'paperSize'         : appConfig.PAPER_SIZES.A3,
            'paperOrientation'  : 'portrait',
            'paperMarginTop'    : 10,
            'paperMarginBottom' : 10,
            'paperMarginLeft'   : 10,
            'paperMarginRight'  : 10,

            'drawFixedScale'    : true,
            'drawFooter'        : false
            // 'drawFooter'        : true
        };
    }

    function createControls () {

        controls = Object.create( Controls );

        controls.init({
            'appConfig': appConfig,
            'windowData': windowData,
            'mouseData': mouseData,
            'node': ui.$controls,
            'config': {}
        });
    }

    function createWorkboard () {

        workboard = Object.create( Workboard );

        workboard.init({
            'appConfig': appConfig,
            'windowData': windowData,
            'mouseData': mouseData,
            'node': ui.$workboard,
            'config': {}
        });
    }

    function addEvents () {

        ui.$window.on( 'resize', onResize );
        ui.$document.on( 'mousemove', onMouseMove );

        controls.addEventListener( 'controls:draw', onControlsDraw );
        controls.addEventListener( 'controls:save', onControlsSave );
    }


    // Handlers
    // --------

    function onResize () {

        windowData.width = ui.$window.width();
        windowData.height = ui.$window.height();
        windowData.ratio = windowData.width / windowData.height;

        ui.$html[0].style.fontSize = 10 * windowData.scale + 'px';

        controls.resize();
        workboard.resize();
    }

    function onMouseMove (e) {

        mouseData.x = e.clientX;
        mouseData.y = e.clientY;

        mouseData.nX = ( mouseData.x / windowData.width ) * 2 - 1;
        mouseData.nY = ( mouseData.y / windowData.height ) * 2 - 1;
    }

    function onAnimFrame (t) {

        let time = Date.now();

        window.requestAnimationFrame( onAnimFrame );
    }

    function onControlsDraw () {

        onResize();
        workboard.drawArtwork();
    }

    function onControlsSave () {

        window.open( workboard.getCanvas().toDataURL() );
    }

}