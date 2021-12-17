import './assets/style.css'
import * as THREE from 'three';
import { DoubleSide } from 'three';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch{
    constructor(){
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('container').appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        this.addMesh();
        this.time = 0;
        this.render();
    }

    addMesh(){
        this.geometry = new THREE.PlaneBufferGeometry( 1, 1, 10,10);
        this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        this.material = new THREE.ShaderMaterial({
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms:{
                progress:{type: "f", value: 0}
            },
            side: THREE.DoubleSide
        })
        this.mesh = new THREE.Points( this.geometry, this.material );
	    this.scene.add( this.mesh );
    }

    render(){
        this.time++;
        this.mesh.rotation.x = this.time / 2000;
	    this.mesh.rotation.y = this.time / 1000;
        // console.log(this.time);
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.render( this.scene, this.camera );
        
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch();


