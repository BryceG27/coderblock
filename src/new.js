import * as THREE from '../node_modules/three';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {CSS3DRenderer, CSS3DObject} from '../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js'

function main() {
    
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(15, 8, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    {
        const color = 0xFFFFFF;
        const intensity = 2.0;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(4, 3, 5);
        scene.add(light);
        scene.add(light.target);
    }

    function gltfLoad(newGLTF) {
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(newGLTF, (gltf) => {
            scene.add(gltf.scene);

            const box = new THREE.Box3().setFromObject(gltf.scene);
            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());


            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
        });
    }

    function gltfLoad2(newGLTF) {
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(newGLTF, (gltf) => {
            gltf.scene.scale.set(5,5,5);
            gltf.scene.translateX(13.5);
            gltf.scene.translateY(-1.0);

            scene.add(gltf.scene);

            let box = new THREE.Box3().setFromObject(gltf.scene);
            let boxSize = box.getSize(new THREE.Vector3()).length();
            let boxCenter = box.getCenter(new THREE.Vector3());

            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
        });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
      
    gltfLoad('./car/scene.gltf');
    gltfLoad2('./nobile/scene.gltf');
};
    


main();

