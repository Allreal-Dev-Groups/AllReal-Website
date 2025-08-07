import { useGLTF } from "@react-three/drei";

export default function HomeScene() {
   const model = useGLTF("/Models/Test.glb");
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
