import * as THREE from 'three';
import img from '../static/img.png';
import vertexGlsl from './shader/vertex.glsl'
import fragmentGlsl from './shader/fragment.glsl'



// Create three objects and pass onto App as a callback
function scene(data){
    const scene = new THREE.Group()
    const material = new THREE.MeshStandardMaterial({
        wireframe: false
    })
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )

    //create random buildigns
    const coordinateObj = {}
    const buildingSide = 2
    const buildingNum = 200
    const planeWidth = 50
    const planeHeight = 50

    const plane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(planeWidth,1,planeHeight),
        material
    )

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
            const buildingZ = 4 + Math.random()* 10
            const mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(buildingSide,buildingZ,buildingSide),
                material
            )
            const random = Math.floor(Math.random()* Object.keys(coordinateObj).length)
            const coordStr = Object.keys(coordinateObj)[random]
            const x = parseInt(coordStr.split(',')[0])
            const y = parseInt(coordStr.split(',')[1])
            if(!coordinateObj[coordStr]){
                mesh.position.set(x,buildingZ/2,y)
                buildingArr.push(mesh)
            }
            
            //deal with the overlapping
            coordinateObj[coordStr] = true
            const offset = 3
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

    scene.add(light)
    scene.add(plane)
    return scene
}

export {scene as default}