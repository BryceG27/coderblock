import * as THREE from '../node_modules/three';
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {CSS3DRender, CSS3DObject} from '../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js'

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 0, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    {
        const color = 0xFFFFFF;
        const intensity = 0.8;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);
        scene.add(light);
        scene.add(light.target);
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();
    
        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        // camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    
        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;
    
        camera.updateProjectionMatrix();
    
        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
      }

    function gltfLoad(newGLTF) {
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(newGLTF, (gltf) => {
            scene.add(gltf.scene);

            const box = new THREE.Box3().setFromObject(gltf.scene);
            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());

            frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
        });
    }

    function gltfLoad2(newGLTF) {
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(newGLTF, (gltf) => {
            gltf.scene.scale.set(5,5,5);
            gltf.scene.translateX(12.5);
            gltf.scene.translateY(-1.0);

            scene.add(gltf.scene);

            let box = new THREE.Box3().setFromObject(gltf.scene);
            let boxSize = box.getSize(new THREE.Vector3()).length();
            let boxCenter = box.getCenter(new THREE.Vector3());

            frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

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

    let divString = '<div>' +
        '<h1>This is an H1 Element.</h1>' +
        '<span class="large">Hello Three.js cookbook</span>' +
        '<textarea> And this is a textarea</textarea>' +
        '</div>';

    function create3DText(text) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = text;
        var div = wrapper.firstChild;

        div.style.width = '375px';
        div.style.height = '375px';
        div.style.opacity = 1;
        div.style['will-change'] = 'all'
        div.style.transition = 'top 0.2s linear'
        div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

        var object = new CSS3DObject(div);
        return object;
    }

    const cssElement = create3DText(divString);
    scene.add(cssElement);
  
    requestAnimationFrame(render);

    gltfLoad('./car/scene.gltf');
    gltfLoad2('./nobile/scene.gltf');

};

main();

