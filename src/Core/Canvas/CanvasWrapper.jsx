import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SceneRouter from "../../Router/SceneRouter";

export default function CanvasWrapper() {
  return (
    <Canvas className="Canvas-Conatiner">
      <Suspense fallback={null}>
        <SceneRouter />
      </Suspense>
    </Canvas>
  );
}
