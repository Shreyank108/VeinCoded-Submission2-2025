import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, model, controls;

document.querySelectorAll('.state-trigger').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    const index = parseInt(el.dataset.index);
    goToState(index);
  });
});

initThreeScene();
function initThreeScene() {
  const canvas = document.getElementById("threeCanvas");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Enable shadow maps
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xfff0dd, 1, 10);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.8);
  spotLight.position.set(0, 5, 5);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.2;
  spotLight.decay = 2;
  spotLight.distance = 50;
  spotLight.castShadow = true;
  scene.add(spotLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.enableZoom = false;

  const loader = new GLTFLoader();
  loader.load('model/apple_vision_pro.glb', (gltf) => {
    model = gltf.scene;

    const parentWidth = canvas.parentElement.clientWidth;
    const responsiveScale = getResponsiveScale(parentWidth);
    model.scale.setScalar(responsiveScale);

    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    scene.add(model);
  });

  window.addEventListener('resize', () => {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    if (model) {
      const responsiveScale = getResponsiveScale(width);
      model.scale.setScalar(responsiveScale);
    }
  });

  animate();
}

function getResponsiveScale(width) {
  const baseWidth = 800;
  const baseScale = 12;
  let scale = (width / baseWidth) * baseScale;
  return Math.max(8, Math.min(scale, 20));
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.goToState = function (index) {
  if (!camera || !model) return;

  const states = [
   
    { position: [0, 2, 5], lookAt: [0, 1, 0] },
    { position: [-2.53, 0.11, 2.26], lookAt: [-1.79, 0.08, 1.59] },
    { position: [-1.72, -0.15, 0.07], lookAt: [-0.72, -0.06, 0.03] },
    { position: [-3, -0.2, -1.91], lookAt: [0.64, -0.01, -1.05] },
  ];

  const { position, lookAt } = states[index];

  gsap.to(camera.position, {
    x: position[0],
    y: position[1],
    z: position[2],
    duration: 1,
    onUpdate: () => {
      camera.lookAt(...lookAt);
    },
  });
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'p') {
    const position = [camera.position.x, camera.position.y, camera.position.z].map(n => +n.toFixed(2));
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const lookAt = [
      +(camera.position.x + direction.x).toFixed(2),
      +(camera.position.y + direction.y).toFixed(2),
      +(camera.position.z + direction.z).toFixed(2)
    ];

    console.log(`{ position: [${position}], lookAt: [${lookAt}] },`);
  }
});

// Floating animations
gsap.fromTo(".floating-element", { y: 0 }, {
  y: -10,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: {
    amount: 0.5
  }
});

gsap.fromTo(".floating-element-2", { y: 0 }, {
  y: -20,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: {
    amount: 0.5
  }
});

// Floating image effect on hover
const images = document.querySelectorAll("#floating-images .image");
const texts = document.querySelectorAll("#floating-images p");

texts.forEach((text) => {
  let activeAnimations = [];

  text.addEventListener("mouseenter", () => {
    const randomImages = getRandomSubset(images, 3 + Math.floor(Math.random() * 2));

    randomImages.forEach((imgEl) => {
      gsap.killTweensOf(imgEl);
      const tl = gsap.timeline();
      tl.set(imgEl, { opacity: 0, y: 150 });
      tl.to(imgEl, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
      activeAnimations.push(imgEl);
    });
  });

  text.addEventListener("mouseleave", () => {
    images.forEach((imgEl) => {
      gsap.killTweensOf(imgEl);
      gsap.to(imgEl, {
        y: 150,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    });
    activeAnimations = [];
  });
});

function getRandomSubset(nodeList, count) {
  const arr = Array.from(nodeList);
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
