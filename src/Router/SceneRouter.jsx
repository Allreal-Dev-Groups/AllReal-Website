import { useLocation } from "react-router-dom";
import { HomeScene } from "../Scenes";

export default function SceneRouter() {
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      return <HomeScene />;
    case "/Test":
      return null;
    default:
      return null;
  }
}
