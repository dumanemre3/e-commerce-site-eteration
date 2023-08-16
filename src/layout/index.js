import React, { useEffect } from "react";
import Header from "./Header";
import "../App.css";
import BasketBox from "../components/BasketBox";
import CheckoutBox from "../components/CheckoutBox";
import { getProducts } from "../store/features/product/productSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout({}) {
  return (
    <main>
      <Header />
      <div className="container-fluid mt-4">
        <div className="row">
          <Outlet />
          <div className="col-12 col-md-3 d-flex flex-column ps-1">
            <BasketBox />
            <CheckoutBox />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
