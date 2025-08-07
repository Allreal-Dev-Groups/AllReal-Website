import { Outlet } from "react-router";
import { CanvasWrapper, GlobalLoader } from "../Core";

const MainLayout = () => {
  return (
    <>
      <CanvasWrapper />
      <GlobalLoader />
      <main className="overlay-content">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
