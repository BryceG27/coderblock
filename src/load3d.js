import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

const btn = document.getElementById('button');
const row = document.getElementById('inputRow');

function giveName() {
    const input = document.getElementById('input').value;
    row.classList.add('visually-hidden');
    document.body.classList.remove('presentation');
    
    init(input);
}

function init(input) {
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({canvas}); 
    const renderer2 = new CSS3DRenderer();
    
    const fov = 60, aspect = 2, near = 1.1, far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(15, 8, 20);
    
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    const scene2 = new THREE.Scene();
    
    {
        const color = 0xffffff;
        const intensity = 2.0;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(4, 3, 5);
        scene.add(light);
        scene.add(light.target);
    }    
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);
    
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
            
            // controls.maxDistance = boxSize * 10;
            // controls.target.copy(boxCenter);
            // controls.update();
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
        renderer2.render(scene2, camera);
        
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
    
    gltfLoad('./car/scene.gltf');
    gltfLoad2('./nobile/scene.gltf');
    
    var element = document.createElement('p');
    element.innerText = input;
    element.style.fontSize = '25%';
    element.style.opacity = 0.5;
    
    var object = new CSS3DObject(element);
    object.position.x = 11.5;
    object.position.y = 8;
    object.position.z = -5;
    scene2.add(object);
}

btn.addEventListener('click', () => giveName());