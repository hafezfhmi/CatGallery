import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Root from "./routes/Root";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";
import Upload from "./routes/Upload";
import PasswordReset from "./routes/PasswordReset";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="passwordReset/:tokenId" element={<PasswordReset />} />
          <Route
            path="login"
            element={
              <ProtectedRoute isLogged={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="signup"
            element={
              <ProtectedRoute isLogged={false}>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route path="gallery" element={<Gallery />} />
          <Route
            path="upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
