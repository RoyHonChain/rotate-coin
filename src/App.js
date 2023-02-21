import './App.css';
import { useRef, useState } from 'react'
import { Canvas, useFrame , useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated, config, useSprings } from '@react-spring/three'


let change=0;

function Coin(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  const renge = 0.18
  const turns = 5*Math.PI
  //const [zRange, setZRange] = useState(0)
  const zRangeA = useRef(0)
  const zRangeB = useRef(turns)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const [plus,minus,edge] = useLoader(TextureLoader, ['plus.png','minus.png','edge.png'])

  const { rotation } = useSpring({
    rotation: !clicked ? [0, 0, zRangeA.current] : [0, 0, zRangeB.current],
    config:{tension:25,friction:6.0}
  });


  return (
    <animated.mesh
      {...props}
      ref={ref}
      rotation={rotation}
      scale={hovered ? 1.35 : 1}
      onClick={(event) => {
        click(!clicked)
        if(!clicked){
          zRangeA.current=zRangeB.current+turns
        }
        else{
          zRangeB.current=zRangeA.current+turns
        }

        change=1;
      }}
      onPointerOver={(event) => {
        hover(true)
        
      }}
      onPointerOut={(event) => {
        hover(false)
        console.log('currentZ ',ref.current.rotation.z)
        console.log('zRangeA ',zRangeA.current)
        console.log('zRangeB ',zRangeB.current)
        console.log('---------------------------------------')
        change=0;
        }}>
      <cylinderGeometry args={[1,1,0.2,100]}/>
      <meshBasicMaterial attach="material-0" map={edge} />
      <meshBasicMaterial attach="material-1" map={minus} />
      <meshBasicMaterial attach="material-2" map={plus} />
      
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
      
      <Coin position={[0, 0, 0]}/>
    </Canvas>
    </div>
  )
}
