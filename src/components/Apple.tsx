import {useGLTF} from "@react-three/drei";
import {MeshProps} from "@react-three/fiber";

export const Apple = ({position}: MeshProps) => {
  const {scene} = useGLTF('/apple.glb')

  return (
    <primitive object={scene} position={position} scale={0.5} />
  );
};
