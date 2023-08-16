import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../../store/features/basket/basketSlice";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const basketList = useSelector((state) => state.basket.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currencyFormatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  const buttonClick = () => {
    if (basketList.findIndex((x) => x.id === product.id) > -1) {
      dispatch(remove(product.id));
    } else {
      dispatch(add(product));
    }
  };

  return (
    <div className="col">
      <Link
        to={`/product-detail/${product.id}`}
        className="card"
        style={{ height: "100%" }}
      >
        <div className="d-flex w-100 p-1 flex-column">
          <img
            className="card-img-top"
            style={{ borderRadius: "4px" }}
            src={`${product.image}?t=${product.id}`}
            alt="Card image cap"
          />
        </div>
        <div className="card-body" style={{ cursor: "pointer" }}>
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div className="flex-1">
              <h5 className="card-title">{product.name}</h5>
            </div>
            <p className="card-price">
              {currencyFormatter.format(product.price)}
            </p>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-grid gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                buttonClick();
              }}
              className="btn btn-primary btn-sm"
            >
              {basketList.findIndex((x) => x.id === product.id) > -1
                ? "Remove Item"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default React.memo(ProductCard);
