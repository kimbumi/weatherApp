import * as THREE from 'three';
import img from '../static/img.png';
import vertexGlsl from './shader/vertex.glsl'
import fragmentGlsl from './shader/fragment.glsl'

// 썬더, 비, 눈, 안개, 기본


// Create three objects and pass onto App as a callback
function scene(data){
    const clear = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.ShaderMaterial({
            vertexShader: vertexGlsl,
            fragmentShader: fragmentGlsl,
            uniforms:{
            }
        })
    )
    const rainy = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.ShaderMaterial({
            vertexShader: vertexGlsl,
            fragmentShader: fragmentGlsl,
            uniforms:{
            }
        })
    )
    return (data >= 800) ? clear : rainy
}

export {scene as default}