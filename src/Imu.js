import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { Card, Box } from '@material-ui/core'


const Imu = ({ depth }) => {

    // const [geometry] = useState(new THREE.BoxGeometry(1, 1, 1))    
    // const [material] = useState(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
    // const [scene] = useState(new THREE.Scene())    
    // const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    // const [renderer] = useState(new THREE.WebGLRenderer())
    // const [q] = useState(new THREE.Quaternion(0.847, -0.002, -0.504, 0.168))
    // const [loader, setLoader] = useState()
    // const [avatar, setAvatar] = useState()

    const canvasRef = useRef()

    //   const getQuaternion = useCallback(
    //     () => {
    //         q.rotateTowards(new THREE.Quaternion(-0.5, -0.5, -0.5, 0.5), 0.01)
    //     },
    //     [q],
    //   )

    // const render = useCallback(
    //     () => {
    //         requestAnimationFrame(() => render());
    //         renderer.render(scene, camera);
    //         avatar.setRotationFromQuaternion(q);
    //     },
    //     [scene, camera, avatar, renderer, q],
    //   )

      var camera = new THREE.PerspectiveCamera( 100, 1, 1, 20 )
      var geometry = new THREE.BoxGeometry( 3, 1, 2 )
     
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
      var model = new THREE.Mesh( geometry, material )

      var waterGeometry = new THREE.BoxGeometry( 10, 10, 10 )
      var waterMaterial = new THREE.MeshBasicMaterial( { color: 0x33bfff } )
      waterMaterial.opacity = 0.5
      waterMaterial.transparent = true
      var water = new THREE.Mesh( waterGeometry, waterMaterial )

      useEffect(() => {
        var scene = new THREE.Scene()
        scene.background = new THREE.Color( 0xffffff )
        var container = document.getElementsByClassName('Imu')[0]
        // var camera = new THREE.PerspectiveCamera( 100, 1, 1, 20 )
        var renderer = new THREE.WebGLRenderer({ alpha: true }) 
        renderer.setSize(container.clientWidth, container.clientWidth)
        canvasRef.current.appendChild(renderer.domElement)
        // var geometry = new THREE.BoxGeometry( 3, 1, 2 )
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        // var model = new THREE.Mesh( geometry, material )

        
        
        water.position.y = -5


        // var loader = new ColladaLoader();
        // loader.load('../public/puddles.dae', (collada) => {
        //  model = collada.scene
            scene.add(model, water)
            camera.position.z = 2.5 
            camera.position.y = 2.5
            camera.position.x = 2.5

            camera.lookAt (0, 0, 0) 

            var animate = () => {
                requestAnimationFrame( animate )
                // model.rotation.x += 0.01
                model.rotation.y += 0.01
                camera.position.y -= 0.01
                model.position.y -= 0.01
                renderer.setSize(container.clientWidth, container.clientWidth)
                renderer.render( scene, camera )
            }
            animate()    
        // })
    }, [])

    useEffect(()=> {
      // console.log(water.position.y)
      // camera.position.x = 2.5 - depth
      // model.position.x = -depth
      
    }, [depth])

  return (
    <div>
        <Box className='Imu' maxWidth='600px'>
        <Card>
            this is the imu :)
            <div className = 'test' ref={canvasRef}/>
            this is the imu :)
        </Card>
        </Box>  
    </div>
  )
}

export default Imu