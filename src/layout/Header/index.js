import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/features/search/searchSlice";

function Header() {
  const [totalPrice, setTotalPrice] = useState(0);
  const basketList = useSelector((state) => state.basket.list);
  useEffect(() => {
    let total = 0;
    basketList.forEach((item) => {
      total += item.quantity * Number(item.price);
    });
    setTotalPrice(total);
  }, [basketList]);
  const dispatch = useDispatch();
  const searchOnChange = (event) => {
    dispatch(update(event.target.value));
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand bg-primary"
        style={{ height: "50px" }}
      >
        <div className="container-fluid">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ width: "100%" }}
          >
            <div className="d-flex gap-4">
              <a title="Dashboard" id="logo" href="/" className="navbar-brand">
                <img
                  className="brand-header-logo js-lazy-loaded qa-js-lazy-loaded"
                  src="https://gitlab.eteration.com/uploads/-/system/appearance/header_logo/1/eteration-gitlab-logo.png"
                  loading="lazy"
                  height={"30"}
                />
              </a>

              <input
                className="form-control me-2 bg-white text-secondary"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchOnChange}
              />
            </div>

            <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
              <li className="text-white py-5">₺{totalPrice}</li>
              <li className="text-white">Emre Duman</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
