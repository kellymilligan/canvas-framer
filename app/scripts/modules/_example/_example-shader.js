define([

    'lodash',
    'jquery',
    'TweenMax',
    '_baseObject',

    'three',

    'raw!../shaders/background-v.shader',
    'raw!../shaders/background-f.shader'

], function(

    _,
    $,
    TweenMax,
    BaseObject,

    THREE,

    BackgroundVertexShader,
    BackgroundFragmentShader

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        renderer    : null,
        scene       : null,
        camera      : null,

        uniforms    : null,

        material    : null,
        mesh        : null,


        setup: function () {

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize( this.windowData.width, this.windowData.height );
            this.renderer.setClearColor( 'rgb(37, 26, 48)', 1 );

            this.scene = new THREE.Scene();

            // this.camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000 );
            // this.camera.position.z = 100;

            this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

            this.$node.append( this.renderer.domElement );

            this.setupShader();

            this.resize();
            this.render();
        },

        setupShader: function () {

            this.uniforms = {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() }
            };

            this.material = new THREE.ShaderMaterial(
            {
                uniforms: this.uniforms,
                vertexShader: BackgroundVertexShader,
                fragmentShader: BackgroundFragmentShader
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );

            this.scene.add( this.mesh );
        },

        resize: function () {

            this.uniforms.resolution.value = new THREE.Vector2( this.windowData.width, this.windowData.height );

            this.camera.aspect = this.windowData.ratio;
            this.camera.updateProjectionMatrix();

            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( this.windowData.width, this.windowData.height );
        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

            this.render();
        },

        render: function () {

            this.uniforms.time.value = this.time;

            this.renderer.render( this.scene, this.camera );
        }

    });

});