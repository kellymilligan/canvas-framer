import { _, $, BaseObject } from '../common';

import * as THREE from 'three';
export default Object.assign( Object.create( BaseObject ), {


    ctx: null, // Must be set in setup()

    width: 0,
    height: 0,

    renderer: null,
    scene: null,
    camera: null,

    origin: null,

    material: null,
    mesh: null,


    setup: function (options) {

        this.renderer = new THREE.WebGLRenderer({ canvas: options.config.canvas, antialias: true });
        this.renderer.setPixelRatio( this.appConfig.PRINT_RESOLUTION );
        this.renderer.setClearColor( 'rgb(37, 26, 48)', 1 );

        this.ctx = this.renderer.context; // Required by the workboard

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 100000 );
        this.camera.position.z = 100;

        this.setupActors();
    },

    setupActors: function () {

        this.material = new THREE.MeshBasicMaterial(
        {
            'color': 0x00ffff,
            'wireframe': true,
            'wireframeLinewidth': 0.2
        });

        this.mesh = new THREE.Mesh( new THREE.SphereGeometry( 36, 24, 24 ), this.material );

        this.origin = new THREE.Object3D();

        this.origin.add( this.mesh );
        this.scene.add( this.origin );
    },

    draw: function () {

        // Resize
        this.renderer.setSize( this.width, this.height );
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        // Render
        this.renderer.render( this.scene, this.camera );
    }

});