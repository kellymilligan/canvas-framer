define([

    'lodash',
    'jquery',
    '_baseObject',

    'three',

    'raw!../shaders/ripple-v.shader',
    'raw!../shaders/ripple-f.shader'

], function(

    _,
    $,
    BaseObject,

    THREE,

    VertexShader,
    FragmentShader

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        ctx: null, // Must be set in setup()

        width: 0,
        height: 0,

        renderer: null,
        scene: null,
        camera: null,

        uniforms: null,

        material: null,
        mesh: null,


        setup: function (options) {

            this.renderer = new THREE.WebGLRenderer({ canvas: options.config.canvas, antialias: true });
            this.renderer.setClearColor( 'rgb(37, 26, 48)', 1 );

            this.ctx = this.renderer.context; // Required by the workboard

            this.scene = new THREE.Scene();

            this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

            this.setupShader();
        },

        setupShader: function () {

            this.uniforms = {

                dimensions: { type: 'v2', value: new THREE.Vector2() },

                DETAIL_LEVEL: { type: 'f', value: 0.58 },
                DEFORMATION_LEVEL: { type: 'f', value: 1.2 },
                DEPTH_LEVEL: { type: 'f', value: 0.25 },
                TIME: { type: 'f', value: 100.0 }
            };

            this.material = new THREE.ShaderMaterial({ uniforms: this.uniforms, vertexShader: VertexShader, fragmentShader: FragmentShader });

            this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );

            this.scene.add( this.mesh );
        },

        draw: function () {

            // Resize
            var w = this.width * this.appConfig.PRINT_RESOLUTION;
            var h = this.height * this.appConfig.PRINT_RESOLUTION;

            this.renderer.setSize( w, h );
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.uniforms.dimensions.value = new THREE.Vector2( w, h );

            // Render
            this.renderer.render( this.scene, this.camera );
        }

    });

});