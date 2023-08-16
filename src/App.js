import { useDispatch } from "react-redux";
import "./App.css";
import Router from "./route";
import { useEffect } from "react";
import { getProducts } from "./store/features/product/productSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return <Router />;
}

export default App;
