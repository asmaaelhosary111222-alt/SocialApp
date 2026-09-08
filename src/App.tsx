import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./components/auth-layout/register/Register";
import Login from "./components/auth-layout/login/Login";
import AuthLayout from "./components/auth-layout/AuthLayout";
import ChangePassword from "./components/auth-layout/change-password/ChangePassword";

import LayOut from "./components/layout/LayOut";

import Home from "./components/home/Home";
import ProfilePage from "./components/profile/ProfilePage";
import Notifications from "./components/notifications/Notifications";

const router = createBrowserRouter([
  // =========================
  // Main App Routes
  // =========================
  {
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },

  // =========================
  // Authentication Routes
  // =========================
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // =========================
  // 404 Route
  // =========================
  {
    path: "*",
    element: (
      <div className="flex min-h-screen items-center justify-center bg-[#080B18] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-[#94A3B8]">
            Page not found...
          </p>
        </div>
      </div>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}