import React, { useEffect, useState } from "react";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
function CheckoutBox() {
  const [totalPrice, setTotalPrice] = useState(0);
  const basketList = useSelector((state) => state.basket.list);
  useEffect(() => {
    let total = 0;
    basketList.forEach((item) => {
      total += item.quantity * Number(item.price);
    });
    setTotalPrice(total);
  }, [basketList]);
  const notify = () =>
    toast.info("⌛ Please wait, You'll pay soon 💸", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div className="mt-5 checkoutContainer">
      <div className="d-flex flex-column align-items-center">
        <h2 className="checkout-container-title">Total Price</h2>
        <div className="checkout-container-price ">₺{totalPrice}</div>
      </div>
      <button
        className="btn btn-primary d-block w-100 mt-2 btn-sm"
        onClick={notify}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        Checkout
      </button>
    </div>
  );
}

export default CheckoutBox;
