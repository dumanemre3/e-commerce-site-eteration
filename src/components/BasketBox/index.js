import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  quantityDec,
  quantityInc,
} from "../../store/features/basket/basketSlice";
import "./index.scss";

function BasketBox() {
  const basketList = useSelector((state) => state.basket.list);
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="basket-container-title">Basket</h2>
      <div className="basketContainer">
        <div className="d-flex flex-column">
          {basketList.length === 0 && (
            <div className="emptyBasket">No item in basket.</div>
          )}
          {basketList.map((item, i) => {
            return (
              <div
                key={i}
                className="d-flex align-items-center justify-content-between mt-1"
              >
                <span className="item-name">{item.name}</span>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-sm quantity-btn quantity-btn--left"
                    onClick={() => dispatch(quantityDec(item.id))}
                  >
                    -
                  </button>
                  <span className="quantity-detail">{item.quantity}</span>
                  <button
                    className="btn btn-sm quantity-btn quantity-btn--right"
                    onClick={() => dispatch(quantityInc(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BasketBox;
