import { _, $, BaseObject } from '../common';

import * as THREE from 'three';

import VertexShader from 'raw!./ripple-v.shader';
import FragmentShader from 'raw!./ripple-f.shader';

export default Object.assign( Object.create( BaseObject ), {


    ctx: null, // Must be set in setup()

    width: 0,
    height: 0,

    renderer: null,
    scene: null,
    camera: null,

    uniforms: null,

    material: null,
    mesh: null,

    _gui: null,
    _config: null,


    setup: function (options) {

        this.renderer = new THREE.WebGLRenderer({ canvas: options.config.canvas, antialias: true });
        this.renderer.setClearColor( 'rgb(37, 26, 48)', 1 );

        this.ctx = this.renderer.context; // Required by the workboard

        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

        this.setupShader();

        this.setupGUI();
    },

    setupShader: function () {

        this._config = {

            detail: 0.58,
            deformation: 1.2,
            depth: 0.25,
            time: 100
        };

        this.uniforms = {

            dimensions: { type: 'v2', value: new THREE.Vector2() },

            DETAIL_LEVEL: { type: 'f', value: this._config.detail },
            DEFORMATION_LEVEL: { type: 'f', value: this._config.deformation },
            DEPTH_LEVEL: { type: 'f', value: this._config.depth },
            TIME: { type: 'f', value: this._config.time }
        };

        this.material = new THREE.ShaderMaterial({ uniforms: this.uniforms, vertexShader: VertexShader, fragmentShader: FragmentShader });

        this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );

        this.scene.add( this.mesh );
    },

    setupGUI: function () {

        this._gui = new dat.GUI();

        this._gui.add( this._config, 'detail', 0.01, 5, 0.01 );
        this._gui.add( this._config, 'deformation', 0.1, 100, 0.1 );
        this._gui.add( this._config, 'depth', 0.1, 1, 0.01 );
        this._gui.add( this._config, 'time', 1, 20000000, 1 );
    },

    applyConfig: function () {

        this.uniforms.DETAIL_LEVEL.value = this._config.detail;
        this.uniforms.DEFORMATION_LEVEL.value = this._config.deformation;
        this.uniforms.DEPTH_LEVEL.value = this._config.depth;
        this.uniforms.TIME.value = this._config.time;
    },

    draw: function () {

        // Resize
        var w = this.width * this.appConfig.PRINT_RESOLUTION;
        var h = this.height * this.appConfig.PRINT_RESOLUTION;

        this.renderer.setSize( w, h );
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.uniforms.dimensions.value = new THREE.Vector2( w, h );

        this.applyConfig();

        // Render
        this.renderer.render( this.scene, this.camera );
    }

});