import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber'
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { Card } from '@material-ui/core'
import useStore from './store'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

const Imu = () => { 


  const mutation = useStore(state => state.mutation)
  const { position, orientation, fov } = mutation
  const actions = useStore(state => state.actions)

    // // const [geometry] = useState(new THREE.BoxGeometry(1, 1, 1))    
    // // const [material] = useState(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
    // const [scene] = useState(new THREE.Scene({
    //   background: new THREE.Color( 0xffffff )
    // }))    
    // const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50))
    // const [renderer] = useState(new THREE.WebGLRenderer( { alpha: true } ))
    // // const [q] = useState(new THREE.Quaternion(0.847, -0.002, -0.504, 0.168))
    // // const [loader, setLoader] = useState()
    // const [model] = useState(
    //   new THREE.Mesh( new THREE.BoxGeometry( 3, 1, 2 ), 
    //   new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    // ))
    // const [water] = useState(new THREE.Mesh(
    //   new THREE.BoxGeometry( 5, 5, 5 ),
    //   new THREE.MeshBasicMaterial({ 
    //     color: 0x33bfff,
    //     transparent: true,
    //     opacity: 0.5
    //   })
    // ))

    // const canvasRef = useRef()

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


      // useEffect(() => {
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
    // }, [])

    // useEffect(()=> { 
    //   canvasRef.current.appendChild(renderer.domElement)      
    //   scene.add(model, water)  
    //   water.position.y = -2.5   
    //   camera.position.x = 2.5

    //   console.log(depth)
      
    //   let frameId

    //   var animate = () => {        
    //     camera.position.y = depth  + 2.5        
    //     model.position.y = depth
    //     // model.setRotationFromQuaternion()        
    //     camera.lookAt(model.position.x, model.position.y, model.position.z)
        
    //     let container = document.getElementsByClassName('Imu')[0]
    //     renderer.setSize(container.clientWidth, container.clientWidth)
    //     renderer.render( scene, camera )        
    //   }
    //   frameId = requestAnimationFrame(animate)
      
    //   return () => {
    //     cancelAnimationFrame(frameId)
    //     frameId = null
    //     canvasRef.current.removeChild(renderer.domElement)
    //     scene.remove(model, water)
    //   }
    // }, [])
  
  const Robot = (props) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // const dae = useLoader(ColladaLoader, modeldae);
    // console.log(dae)
    // useRender(() => {
    //   // mesh.current.setRotationFromQuaternion(orientation)
    //   mesh.current.position.y = position.y
    //   console.log(orientation.x)
    // })
   
    // console.log(orientation + ' tacocat')
    // Set up state for the hovered and active state
  
    // Rotate mesh every frame, this is outside of React without overhead    
    // useFrame(() => (mesh.current.setRotationFromQuaternion(THREE.Quaternion(orientation.x, orientation.y, orientation.z, orientation.w,).normalize())))   

    return (
      <mesh
        {...props}
        ref={mesh}        
        scale={[1, 1, 1]}>
        <boxBufferGeometry attach="geometry" args={[4, 1, 2]} />
        <meshStandardMaterial attach="material" color="black"/>
      </mesh>
    )
  } 

  return (
    <div>
        <Card>                       
            <Canvas 
              colorManagement
              camera={{ position: [3, 3, 3], near: 0.01, far: 50, fov }}
              onCreated={({ camera }) => {
                actions.init(camera)                
              }}
            >            
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Robot />              
            </Canvas>            
        </Card> 
    </div>
  )
}

export default Imu