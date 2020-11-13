// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xf3f3f3, 1.0);
document.body.appendChild(renderer.domElement);

// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
scene.background = new THREE.Color( 0xe1fced );
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100 );
camera.position.set(0, 1, 5);
const light  = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// メッシュの作成と追加
const grid   = new THREE.GridHelper(10, 5);
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshBasicMaterial({color: 0xff6371})
);

sphere.position.set(0, 2, 0);
scene.add(grid, sphere);

let geometry = new THREE.BoxGeometry(10, 1, 1);
let material = new THREE.LineBasicMaterial({ color: 0xff6371});
let box= new THREE.Line(geometry, material);
scene.add(box);


const loader = new THREE.GLTFLoader();
const url = 'tjsmount.gltf';

loader.load(url, (data) => {

  const gltf = data;
  const object = gltf.scene;
  new THREE.MeshBasicMaterial({color: 0x6699FF})
  object.position.set(0,-5,0)
  scene.add(object);

});

// OrbitControls の追加
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

// レンダリング
const animation = () => {

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animation);

};

animation();