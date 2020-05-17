/* global THREE */

const width = window.innerWidth;
const height = window.innerHeight;

// -- renderer ------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer(); // WebGLレンダラを生成
renderer.setSize(width, height); // canvasの大きさを設定
document.body.appendChild(renderer.domElement); // Canvasをドキュメントに追加

// -- camera --------------------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(30, width / height, 0.01, 20.0); // Cameraを生成
camera.position.set(0.0, 0.0, 10.0); // Cameraを手前に移動

// -- scene ---------------------------------------------------------------------------------------
const scene = new THREE.Scene(); // Sceneを生成

// -- cube ----------------------------------------------------------------------------------------
const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0); // 1辺が1.0の立方体のGeometry
const material = new THREE.MeshStandardMaterial({color: 0x00ff00}); // 緑色のMaterial
const cube = new THREE.Mesh(geometry, material); // geometryの形状を持ちmaterialの材質を持つものを作成
cube.position.set(-1.0, 0.0, 0.0)
scene.add(cube); // sceneに追加

// -- avocado (glTF) -------------------------------------------------------------------------------
let currentGLTF = undefined; // 現在使用中のgltf、update内で使えるようにするため

function initGLTF(gltf) { // モデルが読み込まれたあとの処理
    scene.add(gltf.scene); // gltfのモデルをsceneに追加
    gltf.scene.scale.set(20.0, 20.0, 20.0); // 小さすぎるので大きさを20倍に
    currentGLTF = gltf; // currentGLTFにgltfを代入
}

const loader = new THREE.GLTFLoader(); // glTFモデルを読み込むにはGLTFLoaderを使う

loader.load( // モデルを読み込む
    '../assets/Avocado.glb', // モデルデータのURL
    // モデルが読み込まれたあとの処理
    (gltf) => {
        initGLTF(gltf);
        currentGLTF.scene.position.set(1.0,-0.5,0.0)
    },
    // モデル読み込みの進捗を表示
    (progress) => {
        console.info((100.0 * progress.loaded / progress.total).toFixed(2) + '% loaded');
    },
    // モデル読み込み時のエラーを表示
    (error) => {
        console.error(error);
    }
);

// -- light ---------------------------------------------------------------------------------------
const light = new THREE.DirectionalLight(0xffffff); // 白色の平行光源
light.position.set(1.0, 1.0, 1.0).normalize(); // ライトの向きを設定
scene.add(light); // sceneに追加

// -- update --------------------------------------------------------------------------------------　
const clock = new THREE.Clock(); // 時間を司るClockを作成
clock.start(); // clockを開始

function update() {
    const delta = clock.getDelta(); // 前回のupdateとの差分時間を取得

    cube.rotation.y += 0.7 * delta; // cubeを回転する
    cube.rotation.x += 1.8 * delta;

    if (currentGLTF) { // avocadoのloadされているか判定
        currentGLTF.scene.rotation.y += delta; // avocadoを回転する
    }

    renderer.render(scene, camera); // 描画する

    requestAnimationFrame(update); // 次のフレームにもう一回updateを呼ぶ
};
update(); // updateの最初の一回を呼ぶ