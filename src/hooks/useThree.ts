import { onMounted, ref, shallowRef, nextTick } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { isFunction } from 'lodash'
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import * as THREE from 'three'
// import * as _ from 'lodash'

export function useThree() {
  const container = ref<HTMLElement>()
  const scene = shallowRef<THREE.Scene>()
  const camera = shallowRef<THREE.Camera>()
  const renderer = shallowRef<THREE.WebGLRenderer>()
  const cssRenderer = shallowRef<CSS2DRenderer>()
  const controls = shallowRef<OrbitControls>()
  const composers = new Map()
  const mixers: any = []
  const clock = new THREE.Clock()
  const renderMixins = new Map()
  const animate = () => {
    const delta = new THREE.Clock().getDelta()
    renderer.value!.render(scene.value!, camera.value!)
    const mixerUpdateDelta = clock.getDelta()
    mixers.forEach((mixer: any) => mixer.update(mixerUpdateDelta))
    composers.forEach((composer) => composer.render(delta))
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin())
    cssRenderer.value!.render(scene.value!, camera.value!)
    TWEEN.update()
    requestAnimationFrame(() => animate())
  }

  const boostrap = () => {
    const { clientWidth, clientHeight } = container.value!
    //Scene
    scene.value = new THREE.Scene()
    //Camera
    camera.value = new THREE.PerspectiveCamera(
      45,
      clientWidth / clientHeight,
      1,
      10000
    )
    camera.value.position.set(20, 15, 20)
    //Renderer
    renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.value.shadowMap.enabled = false
    renderer.value.outputColorSpace = THREE.SRGBColorSpace
    renderer.value.toneMapping = THREE.ACESFilmicToneMapping
    renderer.value.toneMappingExposure = 0.85
    renderer.value.setSize(clientWidth, clientHeight)
    renderer.value.setClearColor(0x000000, 1)
    container.value!.appendChild(renderer.value.domElement)
    //CssRenderer
    cssRenderer.value = new CSS2DRenderer()
    cssRenderer.value.setSize(clientWidth, clientHeight)
    cssRenderer.value.domElement.className = 'css2d-renderer'
    cssRenderer.value.domElement.style.position = 'absolute'
    cssRenderer.value.domElement.style.top = '0px'
    cssRenderer.value.domElement.style.pointerEvents = 'none'
    container.value!.appendChild(cssRenderer.value.domElement)

    //Controls
    controls.value = new OrbitControls(camera.value, renderer.value.domElement)
    controls.value.minPolarAngle = 0
    controls.value.enableDamping = true
    controls.value.dampingFactor = 0.1
    controls.value.target.set(0, 5, 0)
    controls.value.maxPolarAngle = Math.PI / 2
    controls.value.minDistance = 10
    controls.value.maxDistance = 100
    controls.value.update()

    //Lights（环境贴图承担主要光照，降低环境光避免淹没反射）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.value.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(20, 20, 20)
    directionalLight.position.multiplyScalar(1)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    // scene.value.add(new THREE.DirectionalLightHelper(directionalLight, 5))
    scene.value.add(directionalLight)

    //composer
    // const composer = new EffectComposer(renderer.value)
    // const renderPass = new RenderPass(scene.value, camera.value)
    // composer.addPass(renderPass)
    // outlinePass.value = new OutlinePass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight),
    //   scene.value,
    //   camera.value
    // )
    // outlinePass.value.edgeStrength = 20.0 // 边框的亮度
    // outlinePass.value.edgeGlow = 1 // 光晕[0,1]
    // outlinePass.value.usePatternTexture = false // 是否使用父级的材质
    // outlinePass.value.edgeThickness = 10.0 // 边框宽度
    // outlinePass.value.downSampleRatio = 1 // 边框弯曲度
    // outlinePass.value.pulsePeriod = 1 // 呼吸闪烁的速度
    // outlinePass.value.visibleEdgeColor.set('#f20c00') // 呼吸显示的颜色
    // outlinePass.value.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
    // outlinePass.value.clear = true
    // composer.addPass(outlinePass.value)
    // composers.set('outline', composer)
  }

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(
    `${import.meta.env.VITE_API_DOMAIN}/js/draco/gltf/`
  )
  dracoLoader.setDecoderConfig({ type: 'js' })

  const loadGltf = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    const onCompleted = (object: GLTF, resolve: any) => resolve(object)
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve))
    })
  }

  const loadEnvMap = (
    url = `${import.meta.env.VITE_API_DOMAIN}/models/kloofendal_48d_partly_cloudy_puresky_2k.hdr`
  ) => {
    return new Promise<THREE.Texture>((resolve, reject) => {
      if (!renderer.value || !scene.value) {
        reject(new Error('Renderer or Scene not ready'))
        return
      }
      const pmremGenerator = new THREE.PMREMGenerator(renderer.value)
      pmremGenerator.compileEquirectangularShader()
      new RGBELoader().setDataType(THREE.HalfFloatType).load(
        url,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping
          const envMap = pmremGenerator.fromEquirectangular(texture).texture
          scene.value!.environment = envMap
          scene.value!.background = envMap
          scene.value!.environmentIntensity = 1
          scene.value!.backgroundIntensity = 1
          scene.value!.backgroundBlurriness = 0
          texture.dispose()
          pmremGenerator.dispose()
          resolve(envMap)
        },
        undefined,
        (err) => {
          console.error('[EnvMap] load failed:', url, err)
          reject(err)
        }
      )
    })
  }

  onMounted(() => {
    nextTick(() => {
      boostrap()
      loadEnvMap().catch((err) => console.error(err))
      animate()
    })
  })

  return {
    container,
    scene,
    camera,
    renderer,
    cssRenderer,
    controls,
    mixers,
    renderMixins,
    composers,
    loadGltf,
    loadEnvMap,
  }
}

export default useThree
