import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Maintenance from "./pages/Maintanence";
import Layout from "./layout";
import { FadeLoader } from "react-spinners";

const Router = () => {
  const loading = useSelector((state) => state.product.loading);

  return loading === "idle" ? (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className=" d-flex justify-content-center align-items-center"
    >
      <FadeLoader />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        {loading === "failed" ? (
          <Route path="*" element={<Maintenance />} />
        ) : (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
