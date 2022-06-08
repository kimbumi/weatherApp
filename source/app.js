import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";


class App{
    constructor(scene,data){
        this.initialize()
        this.render()
        this.createObject(scene,data)
        window.addEventListener('resize', () => {
            this.resize()
        })
    }
    initialize(){
        // create renderer and canvas
        this.renderer = new THREE.WebGLRenderer({antialias:true})
        document.body.appendChild( this.renderer.domElement )

        // create scene
        this.scene = new THREE.Scene();

        // create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight,
            0.1,
            100
        )
        this.camera.position.set(0,3,4)
        this.scene.add(this.camera)

        // orbit control
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.control.enableDamping = true
    }

    // create model
    createObject(callback, data){
        // add to the scene
        this.scene.add(callback(data))
    }   

    // update animation
    update(){
        this.control.autoRotate = false
        this.control.update()
    }
    // render and update every frames
    render(){
        this.update()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.render(this.scene,this.camera)
        requestAnimationFrame(()=>{
            this.render()
        })
    }
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerHeight,window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}


export {App as default}