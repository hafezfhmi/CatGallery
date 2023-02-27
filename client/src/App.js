import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Root from "./pages/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import PasswordReset from "./pages/PasswordReset";
import ProtectedRoute from "./pages/ProtectedRoute";
import Image from "./pages/Image";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />

        <Route
          path="/auth/signup"
          element={
            <ProtectedRoute isLogged={false}>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <ProtectedRoute isLogged={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/reset/:tokenId" element={<PasswordReset />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/image/create"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route path="/image/:id" element={<Image />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
