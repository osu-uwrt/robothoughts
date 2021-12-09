import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const renderModelViewer = () => {

    console.log("-------------------------------------------------------Rendering--------------")

    // the canvas for the scene to be painted on
    const canvas = document.querySelector('canvas.webgl')

    console.log(canvas);

    // the sceen to be rendered
    const scene = new THREE.Scene();

    //the gltf file loader
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    
    mtlLoader.load("./tempest.mtl", (material) => {

        console.log("Loaded Material!!!")
        material.preload();

        objLoader.setMaterials(material);
        objLoader.load("./tempest.obj", (object) => {
            
            scene.add(object)

            renderer.render(scene, camera)

            updateAnimation(object)

            console.log(canvas)
        
        },  (xhr) => {console.log((xhr.loaded / xhr.total * 100) + 'percent loaded object');}, (error) => {
            console.log("----obj loader error----")
            console.log(error);
        })
    })  


    //add a light to the scene
    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    // get the size of the canvas
     const sizes = {
        width: canvas.clientWidth,
        height: canvas.clientHeight
    }

    //add the scene camera location
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    //render the scene
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const updateAnimation = (object) => {
        object.rotation.set(canvas.getAttribute("x_rotation"), canvas.getAttribute("y_rotation"), canvas.getAttribute("z_rotation"));

        renderer.render(scene, camera);
        
        window.requestAnimationFrame(() => updateAnimation(object));
    }

    //update with window resize
    window.addEventListener('resize', () =>
    {
        // get the canvas
        const canvas = document.querySelector('canvas.webgl')

        // Update sizes
        sizes.width = canvas.clientWidth
        sizes.height = canvas.clientHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}

export default renderModelViewer