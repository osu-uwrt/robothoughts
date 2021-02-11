import * as THREE from 'three'
import { addEffect } from 'react-three-fiber'
import create from 'zustand'

const [useStore, api] = create((set, get) => {
  const box = new THREE.Box3()

  return {    
    camera: undefined,

    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      orientation: new THREE.Quaternion(),
      startTime: Date.now(),

      scale: 15,
      fov: 70,
      hits: false,          
      looptime: 40 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      mouse: new THREE.Vector2(-250, 50),

      // Re-usable objects
      dummy: new THREE.Object3D(),
      ray: new THREE.Ray(),
      box: new THREE.Box3()
    },
    actions: {
      init(camera) {
        const { mutation, actions } = get()

        set({ camera })
        mutation.clock.start()        

        addEffect(() => { 
          const time = Date.now()
          const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime)          
        })
      },
      updatePosition(pos) {
          get().mutation.position.set(pos.x, pos.y + 3, pos.z)
      },
      updateOrientation(q) {
          let temp = new THREE.Quaternion().set(q.x, q.y, q.z, q.w).normalize()
          get().mutation.orientation.copy(temp)        
      },
    }
  }
})

export default useStore
