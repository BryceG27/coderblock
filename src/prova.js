import * as THREE from '../node_modules/three';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#c');

const p = document.querySelector('#root').innerHTML;
console.log(p);

var renderer3D, scene, camera3D;

const controls = new OrbitControls(camera3D, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

function init() {
    scene = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer3D = new THREE.CSS3DRenderer({canvas});
    renderer3D.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer3D.domElement);

    camera3D.position.set(10, 0, 20);

    
    camera3D.position.x = 500;
    camera3D.position.y = 500;
    camera3D.position.z = 500;
    
    var cssElement = create3DText(content);
    cssElement.position.set(100, 100, 100);
    scene.add(cssElement);
    
    render();
    
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
        if (resizeRendererToDisplaySize(renderer3D)) {
            const canvas = renderer3D.domElement;
            camera3D.aspect = canvas.clientWidth / canvas.clientHeight;
            camera3D.updateProjectionMatrix();
        }
        
        renderer3D.render(scene3D, camera3D);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
    
    function create3DText(content) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = content;
        var div = wrapper.firstChild;
        
        div.style.width = '370px';
        div.style.height = '370px';
        div.style.opacity = 0.7;
        div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();
        
        var object = new THREE.CSS3DObject(div);
        return object;
    }
}

init();