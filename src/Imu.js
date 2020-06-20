import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { Card } from '@material-ui/core'
import './test.css'


const Imu = ({}) => {

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

    
      useEffect(() => {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        canvasRef.current.appendChild(renderer.domElement)
        var geometry = new THREE.BoxGeometry( 2, 1, 3 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var model = new THREE.Mesh( geometry, material );
        // var loader = new ColladaLoader();
        // loader.load('../public/puddles.dae', (collada) => {
        //  model = collada.scene
            scene.add( model );
            camera.position.z = 5;
            var animate = function () {
                requestAnimationFrame( animate );
                model.rotation.x += 0.01;
                model.rotation.y += 0.01;
                renderer.render( scene, camera );
            }
            animate()      
        // })
    })

  return (
    <div className='testParent'>
        <Card >
            this is the imu :)
            <div className = 'test' ref={canvasRef}/>
            this is the imu :)
        </Card>  
    
    </div>
  )
}

export default Imu