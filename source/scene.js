import * as THREE from 'three';
import img from '../static/img.png';
import vertexGlsl from './shader/vertex.glsl'
import fragmentGlsl from './shader/fragment.glsl'
import { Reflector } from "../node_modules/three/examples/jsm/objects/Reflector.js"

console.log(new Reflector())
// Create three objects and pass onto App as a callback
function scene(data){
    const scene = new THREE.Group()
    scene.position.y = -10
    //fog

    //lights
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
    var lightBack = new THREE.PointLight(0xFFFFFF, 1);
    
    var spotLightHelper = new THREE.SpotLightHelper( lightFront );
    //scene.add( spotLightHelper );
    
    lightFront.rotation.x = 45 * Math.PI / 180;
    lightFront.rotation.z = -45 * Math.PI / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0,6,0);
    scene.add(lightFront)
    scene.add(ambientLight)
    scene.add(lightBack)

    // set colors
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2c3036),
        roughness: 0.4,
        metalness: 0.3,
        shading: THREE.SmoothShading,
        fog: true
    })

    //create variables for random buildigns
    const coordinateObj = {}
    const buildingSide = 4
    const buildingNum = 80
    const planeWidth = 80
    const planeHeight = 80

    // create ground
    const plane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(200,1,200),
        new THREE.MeshPhongMaterial({
            color:new THREE.Color(0x2c3036),
            shininess: 500,
            opacity: 0.95,
            transparent:true,
            emissive:0x000000,
            emissiveIntensity: 0.1,
            fog: true
        })
    )
    plane.receiveShadow = true
    scene.add(plane)

    //create vec2 coordinate object
    for(let x = -planeWidth/2 + buildingSide/2; x < planeWidth/2 - buildingSide/2; x++){
        for(let y = -planeHeight/2 + buildingSide/2; y < planeHeight/2 - buildingSide/2; y++){
            coordinateObj[`${x},${y}`] = false
        }
    }

    //func to create building and locate 
    const locateBuilding = (buildingNum) =>{
        const buildingArr = []
        for(let i = 0; i < buildingNum; i++){
            const buildingZ = 12 + Math.random()* 20
            const mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(buildingSide,buildingZ,buildingSide),
                baseMaterial
            )
            mesh.castShadow = true
            mesh.receiveShadow = true
            const random = Math.floor(Math.random()* Object.keys(coordinateObj).length)
            const coordStr = Object.keys(coordinateObj)[random]
            const x = parseInt(coordStr.split(',')[0])
            const y = parseInt(coordStr.split(',')[1])
            if(!coordinateObj[coordStr]){
                mesh.position.set(x,0,y)
                buildingArr.push(mesh)
            }
            
            //deal with the overlapping
            coordinateObj[coordStr] = true
            const offset = 2
            for(let coordX = x - buildingSide/2 - offset; coordX < x + buildingSide/2 + offset; coordX++){
                for(let coordY = y - buildingSide/2 - offset; coordY < y + buildingSide/2 + offset; coordY++){
                    coordinateObj[`${coordX},${coordY}`] = true
                }
            }
            
        }
        scene.add(...buildingArr)
    }
    locateBuilding(buildingNum)

    // const cube = new THREE.Mesh(
    //     new THREE.BoxGeometry(1,1,1),
    //     new THREE.ShaderMaterial({
    //         vertexShader: vertexGlsl,
    //         fragmentShader: fragmentGlsl,
    //         uniforms:{
    //         }
    //     })
    // )

    return scene
}

export {scene as default}