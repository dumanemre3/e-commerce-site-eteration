import axios from "axios";

export const getProducts = async () => {
  const response = await axios
    .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((err) => {
      return { success: false, data: err.response?.data };
    });

  return response;
};
