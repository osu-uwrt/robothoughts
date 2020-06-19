import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as THREELOADER from 'three-collada-loader';
import { Card } from '@material-ui/core'


const Imu = ({}) => {

    const [geometry] = useState(new THREE.BoxGeometry(1, 1, 1))    
    const [material] = useState(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
    const [scene] = useState(new THREE.Scene())    
    const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    const [renderer] = useState(THREE.WebGLRenderer())
    const [q] = useState(new THREE.Quaternion(0.847, -0.002, -0.504, 0.168))
    const [loader] = useState(new THREELOADER())
    const [avatar, setAvatar] = useState(null)

    const canvasRef = useRef(null)

    useEffect(() => {
        var temp = null
        renderer.setSize(window.innerWidth / 4, window.innerHeight / 4)
        loader.load('../public/puddles.dae', (collada) => {
            temp = collada.scene      
        })
        setAvatar(temp)
        canvasRef.current = renderer.domElement
        getQuaternion()  
        render()
        // this can be removed (only for testing)      
        camera.position.z = 1;

    })

    const render = () => {
        requestAnimationFrame(() => render());
        renderer.render(scene, camera);
        avatar.setRotationFromQuaternion(q);
    }

    const getQuaternion = () => {
        q.rotateTowards(new THREE.Quaternion(-0.5, -0.5, -0.5, 0.5), 0.01)
        // setTimeout(() => getQuaternion(), 100);
      }

  return (
    // <div>
    //     <Card>
    //         this is the imu :)
    //         {renderer.domElement}
    //     </Card>  
    // </div>
    <div ref={canvasRef} /> 
  )
}

export default Imu