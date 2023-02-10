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
  const [zRange, setZRange] = useState(0)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [swing, setSwing] = useState(false)

  const [plus,minus,edge] = useLoader(TextureLoader, ['plus.png','minus.png','edge.png'])

 /* const { rotation } = useSpring({
    rotation: !clicked ? [0, 0, 0] : [0, 0, 5*Math.PI],
    config: {tension:25,friction:6.4}
  });*/

  const { rotation } = useSpring({
    rotation: change
    ?
    (!clicked ? 
      [0, 0, 0] 
      : [0, 0, 5*Math.PI])
    : 
    (swing ? 
      [0, 0, zRange-1*renge] 
      : [0, 0, zRange+renge]),
    config: change?{tension:25,friction:6.2}:{tension:8,friction:1.5}
  });

  useFrame((state, delta) => {
    if(ref.current.rotation.z>=(zRange+renge)){
      setSwing(true)
    }
    else if(ref.current.rotation.z<=(zRange-1*renge)){
      setSwing(false)
    }

    if(clicked){
      setZRange(5*Math.PI);
    }
    else{
      setZRange(0);
    }
  })


  return (
    <animated.mesh
      {...props}
      ref={ref}
      rotation={rotation}
      scale={hovered ? 1.35 : 1}
      onClick={(event) => {
        click(!clicked)
        change=1;
      }}
      onPointerOver={(event) => {
        hover(true)
        
      }}
      onPointerOut={(event) => {
        hover(false)
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
  const [change, setChange] = useState(false)
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
