import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { add, remove } from "../../store/features/basket/basketSlice";
import "./index.scss";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const products = useSelector((state) => state.product.products);
  const basketList = useSelector((state) => state.basket.list);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);

  const buttonClick = () => {
    if (basketList.findIndex((x) => x.id === product.id) > -1) {
      dispatch(remove(product.id));
    } else {
      dispatch(add(product));
    }
  };
  useEffect(() => {
    if (loading === "succeeded") {
      let findedProduct = products.find((product) => product.id === id);
      if (findedProduct) setProduct(findedProduct);
      else navigate("/");
    }
  }, [id, products, loading]);

  const currencyFormatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  return (
    <div className="col-12 col-md-9 d-flex flex-column pe-1">
      {product ? (
        <div class=" mb-5" style={{ marginTop: "33px" }}>
          <div class="row d-flex justify-content-center">
            <div class="col-md-12">
              <div
                class="card"
                style={{
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 3px 3px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                }}
              >
                <div class="row">
                  <div class="col-md-6 position-relative">
                    <img
                      className="w-100"
                      src={product.image}
                      style={{
                        borderRadius: "4px",
                        position: "sticky",
                        top: "10px",
                      }}
                    />
                  </div>
                  <div class="col-md-6">
                    <div class="product p-1">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <span class="ml-1 detail-card-title">
                            {product.name}
                          </span>
                        </div>
                      </div>
                      <div class="">
                        <p className="detail-card-price">
                          {currencyFormatter.format(product.price)}
                        </p>
                      </div>
                      <div class="mt-4 mb-3">
                        <button
                          onClick={buttonClick}
                          className="btn btn-primary btn-sm w-100"
                        >
                          {basketList.findIndex((x) => x.id === product.id) > -1
                            ? "Remove Item"
                            : "Add to Cart"}
                        </button>
                      </div>
                      <p class="about">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 d-flex justify-content-center mt-5">
          <FadeLoader />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
