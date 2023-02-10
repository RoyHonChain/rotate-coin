import './App.css';
import { useRef, useState } from 'react'
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated, config } from '@react-spring/three'



/*function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}*/

function Coin(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const [plus,minus,edge] = useLoader(TextureLoader, ['plus.png','minus.png','edge.png'])

  const { rotation } = useSpring({
    rotation: !clicked ? [0, 0, 0] : [0, 0, 5*Math.PI],
    config: {tension:25,friction:6.4}
  });

  /*useFrame((state, delta) => {
    console.log(ref.current.rotation.z);
    console.log(ref.current.transx);
  })*/

  return (
    <animated.mesh
      {...props}
      ref={ref}
      rotation={rotation}
      scale={hovered ? 1.35 : 1}
      onClick={(event) => {
        click(!clicked)
      }}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <cylinderGeometry args={[1,1,0.2,100]}/>
      <meshBasicMaterial attach="material-0" map={edge} />
      <meshBasicMaterial attach="material-1" map={plus} />
      <meshBasicMaterial attach="material-2" map={minus} />
    </animated.mesh>
  )
}



export default function App() {
  return (
    <div className='App'>
    <Canvas camera={{position:[0,7,-2.2],fov:50,rotation:[-0.6*Math.PI,0,0]}}  >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Coin position={[0, 0, 0]} />
    </Canvas>
    </div>
  )
}
