//--------------------------------------------------------------------------------------------------------->


import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/EffectComposer'

import ASCIIShader from './shaders/ASCII.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/ShaderPass'
import {GlitchPass} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/GlitchPass"
const logout = document.querySelector("#logout");
const axiomLink = document.getElementById("axiom-link");
const mainScene = new THREE.Scene()

const mainCamera = new THREE.PerspectiveCamera(
  // 50,
// 40,
  50,
  window.innerWidth / window.innerHeight,
  8,
  // 11,
  15
)
mainCamera.position.z = 10;
mainCamera.position.y = 3;


const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('../public/assets/visualizer.webp');
mainScene.background = backgroundImage;

const backLight = new THREE.DirectionalLight(0x00aaff, 2, 20)
backLight.position.set(-5, 5, -5)
mainScene.add(backLight)

const fillLight = new THREE.DirectionalLight(0x00aaff, 1, 20)
fillLight.position.set(-5, 0, 5)
mainScene.add(fillLight)

const keyLight = new THREE.DirectionalLight(0xff00ff, 2, 20)
keyLight.position.set(5, 0, 0)
mainScene.add(keyLight)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('app').appendChild(renderer.domElement)

const loader = new GLTFLoader()
const modelURL = new URL("../assets/model/axiom.glb",import.meta.url);

const modelContainer = new THREE.Group()
mainScene.add(modelContainer)


loader.load(
  modelURL.href,
  gltf => {
    modelContainer.add(gltf.scene)

  },
  undefined,
  console.error
)


const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
const cube1 = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material)
const cube3 = new THREE.Mesh(geometry, material)
const cube4 = new THREE.Mesh(geometry, material)
const cube5 = new THREE.Mesh(geometry, material)
const cube6 = new THREE.Mesh(geometry, material)

mainScene.add(cube1);
mainScene.add(cube2);
mainScene.add(cube3);
mainScene.add(cube4);
mainScene.add(cube5);
mainScene.add(cube6);

cube1.position.set(4,4,0);
cube2.position.set(7,0,0);
cube3.position.set(-4,2,0);
cube4.position.set(-7,5,0);
cube5.position.set(8,6,0);
cube6.position.set(-7.5,0.5,0);



// Pixelated Effect

const FONT_MAP_SIZE = new THREE.Vector2(64, 64)
const FONT_CHAR_SIZE = new THREE.Vector2(8, 8)

const fontLoader = new THREE.TextureLoader()
const tFont = fontLoader.load('./public/assets/font.png')
tFont.minFilter = THREE.NearestFilter
tFont.magFilter = THREE.NearestFilter

function getLowResSize() {
  const charCountPrecise = [
    window.innerWidth / FONT_CHAR_SIZE.x,
    window.innerHeight / FONT_CHAR_SIZE.y,
  ]

  const charCountCeil = charCountPrecise.map(Math.ceil)

  return {
    charCountPrecise,
    charCountCeil,
  }
}

const startingSizeData = getLowResSize()
const lowResRenderTarget = new THREE.WebGLRenderTarget(
  startingSizeData.charCountCeil[0] * 2,
  startingSizeData.charCountCeil[1] * 2
)

const lowResDepthTexture = new THREE.DepthTexture()
lowResDepthTexture.type = THREE.UnsignedShortType
lowResRenderTarget.depthTexture = lowResDepthTexture

const finalComposer = new EffectComposer(renderer)


const asciiPass = new ShaderPass(ASCIIShader())
asciiPass.uniforms.tLowRes.value = lowResRenderTarget.texture
asciiPass.uniforms.tDepth.value = lowResDepthTexture
asciiPass.uniforms.cameraNear.value = mainCamera.near
asciiPass.uniforms.cameraFar.value = mainCamera.far
asciiPass.uniforms.tFont.value = tFont

const fontCountX = FONT_MAP_SIZE.x / FONT_CHAR_SIZE.x
const fontCountY = FONT_MAP_SIZE.y / FONT_CHAR_SIZE.y

asciiPass.uniforms.fontCharTotalCount.value =
  Math.floor(fontCountX) * Math.floor(fontCountY)

asciiPass.uniforms.fontCharSize.value.set(1 / fontCountX, 1 / fontCountY)

asciiPass.uniforms.fontCharCount.value.set(fontCountX, fontCountY)

function updateAsciiRenderSize() {
  const size = getLowResSize()

  asciiPass.uniforms.renderCharSize.value.set(
    1 / size.charCountPrecise[0],
    1 / size.charCountPrecise[1]
  )

  asciiPass.uniforms.renderCharCount.value.set(
    size.charCountPrecise[0],
    size.charCountPrecise[1]
  )

  lowResRenderTarget.setSize(
    size.charCountCeil[0] * 2,
    size.charCountCeil[1] * 2
  )
}

updateAsciiRenderSize()

finalComposer.addPass(asciiPass)

const glitchPass = new GlitchPass();


document.body.addEventListener("click",()=>{
  finalComposer.addPass(glitchPass);
  setTimeout(()=>{
    finalComposer.removePass(glitchPass);
  },2000);
})


function resizeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  mainCamera.aspect = window.innerWidth / window.innerHeight
  mainCamera.updateProjectionMatrix()
  updateAsciiRenderSize()
}
window.addEventListener('resize', resizeRenderer, 50)

const clock = new THREE.Clock()

function render() {

  modelContainer.rotation.y += 0.01;

  cube1.rotation.x+=0.04;
  cube1.rotation.y+=0.04;

  cube2.rotation.x+=0.04;
  cube2.rotation.y+=0.04;
  
  cube3.rotation.x+=0.04;
  cube3.rotation.y+=0.04;

  cube3.rotation.x+=0.04;
  cube3.rotation.y+=0.04;

  cube4.rotation.x+=0.04;
  cube4.rotation.y+=0.04;

  cube4.rotation.x+=0.04;
  cube4.rotation.y+=0.04;

  cube5.rotation.x+=0.04;
  cube5.rotation.y+=0.04;

  cube6.rotation.x+=0.04;
  cube6.rotation.y+=0.04;

  renderer.setRenderTarget(lowResRenderTarget)
  renderer.render(mainScene, mainCamera)

  renderer.setRenderTarget(null)
  finalComposer.render()
  
  requestAnimationFrame(render)
}
render()


logout.addEventListener("click",async(e)=>{
  e.preventDefault();
  try{
      const response = await fetch("/logout",{
          method:"POST",
          headers:{
              "Content-type":"application/json"
          }
      })
      const result = await response.json();
      console.log(result);
      if(result.message === "Logout successful"){
          window.location.href = "/";

      }else(
          console.log("err")
      )

  }catch(err){
      console.log(err);
  }
  
});
axiomLink.addEventListener("click",()=>{
  window.location.href = "/cryptictime";
})
