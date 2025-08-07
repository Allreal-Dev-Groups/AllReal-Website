import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { HomePage } from "../Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <></>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Test", element: <HomePage /> },
    ],
  },
]);
