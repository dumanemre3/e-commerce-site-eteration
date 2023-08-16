import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import ProductCard from "../../components/ProductCard";
import groupBy from "../../lib/groupby";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import Maintenance from "../Maintanence";
import { getProducts } from "../../store/features/product/productSlice";

function Homepage() {
  // const basketList = useSelector((state) => state.basket.list);
  const searchText = useSelector((state) => state.search.searchText);
  const products = useSelector((state) => state.product.products);

  const [allProducts, setAllProducts] = useState([]);
  const [listingProducts, setListingProducts] = useState([]);
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [checkedModel, setCheckedModel] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [page, setPage] = useState(0);
  console.log(listingProducts);

  useEffect(() => {
    setAllProducts(products);
    setListingProducts(products);
    let modelGroup = groupBy(products, "model");
    let brandGroup = groupBy(products, "brand");
    setBrands(brandGroup);
    setFilteredBrands(brandGroup);
    setModels(modelGroup);
    setFilteredModels(modelGroup);
  }, [products]);

  useEffect(() => {
    if (listingProducts.length === 0 && products.length > 0) {
      setListingProducts(products);
      setAllProducts(products);
    }
  }, [listingProducts, products]);

  const searchOnChange = (e, type) => {
    if (type === "brand") {
      if (e.target.value === "") setFilteredBrands(brands);
      else {
        let arr = {};
        Object.entries(brands).forEach((x) => {
          if (x[0].toLowerCase().includes(e.target.value.toLowerCase())) {
            arr[x[0]] = x[1];
          }
        });
        setFilteredBrands(arr);
      }
    } else if (type === "model") {
      if (e.target.value === "") setFilteredModels(models);
      else {
        let arr = {};
        Object.entries(models).forEach((x) => {
          if (x[0].toLowerCase().includes(e.target.value.toLowerCase())) {
            arr[x[0]] = x[1];
          }
        });
        setFilteredModels(arr);
      }
    }
  };
  const onChangeValue = (event) => {
    setSelectedSort(event.target.id);
  };
  useEffect(() => {
    let filteredProducts = allProducts;
    if (checkedBrand.length > 0) {
      filteredProducts = filteredProducts.filter((x) =>
        checkedBrand.includes(x.brand)
      );
    }
    if (checkedModel.length > 0) {
      filteredProducts = filteredProducts.filter((x) =>
        checkedModel.includes(x.model)
      );
    }
    if (searchText) {
      filteredProducts = filteredProducts.filter((x) =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    let sortedProduct = filteredProducts.slice();
    if (selectedSort) {
      switch (selectedSort) {
        case "oldToNew":
          sortedProduct.sort(
            (a, b) =>
              Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
          );
          break;
        case "newToOld":
          sortedProduct.sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          );
          break;
        case "priceHighToLow":
          sortedProduct.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case "priceLowToHigh":
          sortedProduct.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        default:
          break;
      }
    }
    setListingProducts(sortedProduct);
  }, [checkedBrand, searchText, checkedModel, selectedSort]);

  return (
    <>
      <div className="col-5 col-md-3 d-flex flex-column">
        <div className="d-flex flex-column">
          <h2 className="filter-container-title">Sort By</h2>
          <div className="brandContainer">
            <div class="form-check" style={{ padding: "0rem" }}>
              <fieldset id="group1">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortBy"
                    id="oldToNew"
                    onChange={onChangeValue}
                  />
                  <label class="form-check-label" for="oldToNew">
                    Old To New
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortBy"
                    id="newToOld"
                    onChange={onChangeValue}
                  />
                  <label class="form-check-label" for="newToOld">
                    New To Old
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortBy"
                    id="priceHighToLow"
                    onChange={onChangeValue}
                  />
                  <label class="form-check-label" for="priceHighToLow">
                    Price High To Low
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortBy"
                    id="priceLowToHigh"
                    onChange={onChangeValue}
                  />
                  <label class="form-check-label" for="priceLowToHigh">
                    Price Low To High
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mt-3">
          <h2 className="filter-container-title">Brands</h2>
          <div className="brandContainer">
            <input
              type="text"
              placeholder="Search for Brands"
              className="form-control mb-3 text-detail"
              onChange={(e) => searchOnChange(e, "brand")}
            />
            {Object.keys(filteredBrands).map((x, i) => {
              return (
                <div className="form-check" key={i}>
                  <div className="checkbox-row">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={x}
                      name={x}
                      value={x}
                      onChange={(e) => {
                        if (e.target.checked && !checkedBrand.includes(x)) {
                          setCheckedBrand([...checkedBrand, x]);
                        } else if (checkedBrand.includes(x)) {
                          let tempArr = [...checkedBrand].filter(
                            (y) => y !== x
                          );
                          setCheckedBrand(tempArr);
                        }
                        setPage(0);
                      }}
                    />
                    <label className="form-check-label" htmlFor={x}>
                      {" "}
                      {x}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex flex-column mt-3">
          <h2 className="filter-container-title">Models</h2>
          <div className="brandContainer">
            <input
              type="text"
              placeholder="Search for Models"
              className="form-control mb-3 text-detail"
              onChange={(e) => searchOnChange(e, "model")}
            />

            {Object.keys(filteredModels).map((x, i) => {
              return (
                <div className="form-check" key={i}>
                  <div className="checkbox-row">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={x}
                      name={x}
                      value={x}
                      onChange={(e) => {
                        if (e.target.checked && !checkedModel.includes(x)) {
                          setCheckedModel([...checkedModel, x]);
                        } else if (checkedModel.includes(x)) {
                          let tempArr = [...checkedModel].filter(
                            (y) => y !== x
                          );
                          setCheckedModel(tempArr);
                        }
                        setPage(0);
                      }}
                    />
                    <label className="form-check-label" htmlFor={x}>
                      {" "}
                      {x}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-7 col-md-6">
        <>
          <div className="row align-items-stretch row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
            {[...listingProducts].splice(page * 12, 12).map((item, index) => {
              return <ProductCard key={index} product={item} />;
            })}
          </div>
          <ReactPaginate
            containerClassName="pagination"
            activeClassName="active"
            previousLabel="<"
            nextLabel=">"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(e) => {
              setPage(e.selected);
            }}
            forcePage={page}
            pageCount={Math.ceil(listingProducts.length / 12)}
            renderOnZeroPageCount={null}
          />
        </>
      </div>
    </>
  );
}

export default Homepage;
