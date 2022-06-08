import * as THREE from 'three';
import img from '../static/img.png';
import vertexGlsl from './shader/vertex.glsl'
import fragmentGlsl from './shader/fragment.glsl'



// Create three objects and pass onto App as a callback
function scene(data){
    const scene = new THREE.Group()
    const material = new THREE.MeshStandardMaterial({
        wireframe: true
    })
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )

    //create random buildigns
    const coordinateArr = []
    const buildingSide = 2
    const buildingNum = 2
    const planeWidth = 10
    const planeHeight = 10

    const plane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(planeWidth,1,planeHeight,planeWidth,1,planeHeight),
        material
    )

    // create vector2 coordinate map
    for(let x = -planeWidth/2; x < planeWidth/2; x++){
        for(let y = -planeHeight/2; y < planeHeight/2; y++){
            coordinateArr.push([x,y])
        }
    }
    console.log(coordinateArr)

    // pick random coordinate and locate building
    const createRandomBuilding = (num) => {
        const buildingArr = []
        const buildingZ = 4
        if(!coordinateArr.length){
            return;
        }
        for(let n = 0; n < num; n++){
            const random = Math.floor(Math.random() * coordinateArr.length)
            const building =  new THREE.Mesh(
                 new THREE.BoxGeometry(buildingSide,buildingZ,buildingSide),
                material
            )
            const coorX = coordinateArr[random][0]
            const coorY = coordinateArr[random][1]
            building.position.set(coorX/2,buildingZ/2,coorY/2)
            buildingArr.push(building)
            console.log(building.position)
        }
        return buildingArr
    }
    // const result = createRandomBuilding(buildingNum)
    // console.log(result)

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
    // scene.add(...result)
    return scene
}

export {scene as default}