import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { Card, Box } from '@material-ui/core'


const Imu = ({ depth }) => {

    // const [geometry] = useState(new THREE.BoxGeometry(1, 1, 1))    
    // const [material] = useState(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
    const [scene] = useState(new THREE.Scene({
      background: new THREE.Color( 0xffffff )
    }))    
    const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50))
    const [renderer] = useState(new THREE.WebGLRenderer( { alpha: true } ))
    // const [q] = useState(new THREE.Quaternion(0.847, -0.002, -0.504, 0.168))
    // const [loader, setLoader] = useState()
    const [model] = useState(
      new THREE.Mesh( new THREE.BoxGeometry( 3, 1, 2 ), 
      new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    ))
    const [water] = useState(new THREE.Mesh(
      new THREE.BoxGeometry( 5, 5, 5 ),
      new THREE.MeshBasicMaterial({ 
        color: 0x33bfff,
        transparent: true,
        opacity: 0.5
      })
    ))

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


      useEffect(() => {
        // append THREE.js renderer to the ref within the document                          

        // var loader = new ColladaLoader();
        // loader.load('../public/puddles.dae', (collada) => {
        //  model = collada.scene

        // create the THREE.js camera
        // let container = document.getElementsByClassName('Imu')[0]
          // let width = container.clientWidth
        // let height = container.clientHeight
        // camera.top = height / 2
        // camera.bottom = height / -2
        // camera.left = width / -2
        // camera.right = width / 2

        // add objects to the scene and position them
                 
        // camera.position.z = 2.5        
                          
        // })
    }, [])

    useEffect(()=> { 
      canvasRef.current.appendChild(renderer.domElement)      
      scene.add(model, water)  
      water.position.y = -2.5   
      camera.position.x = 2.5

      console.log(depth)
      
      let frameId

      var animate = () => {        
        camera.position.y = depth  + 2.5        
        model.position.y = depth
        // model.setRotationFromQuaternion()        
        camera.lookAt(model.position.x, model.position.y, model.position.z)
        
        let container = document.getElementsByClassName('Imu')[0]
        renderer.setSize(container.clientWidth, container.clientWidth)
        renderer.render( scene, camera )        
      }
      frameId = requestAnimationFrame(animate)
      
      return () => {
        cancelAnimationFrame(frameId)
        frameId = null
        canvasRef.current.removeChild(renderer.domElement)
        scene.remove(model, water)
      }
    }, [])

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