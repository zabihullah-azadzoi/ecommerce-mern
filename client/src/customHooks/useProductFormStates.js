import { useState, useEffect } from "react";
import { getAllCategories } from "../functions/categoryFunctions";
import { getCategorySubs } from "../functions/productFunctions";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  shipping: "",
  color: "",
  brand: "",
  category: "",
  subs: [],
  images: [],
};

const useProductFormStates = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [allSubs, setAllSubs] = useState([]);

  //fetching all catergories
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((e) => toast.error(e.response.data.error));
  }, []);

  //getting subs for a category
  const { category } = values;
  useEffect(() => {
    if (category !== "") {
      getCategorySubs(category)
        .then((res) => setAllSubs(res.data))
        .catch((e) => {
          toast.error(e.response.data.error);
        });
    }
  }, [category]);

  const valuesChangeHandler = (e) => {
    setValues((preValues) => ({
      ...preValues,
      [e.target.name]: e.target.value,
    }));
  };
  return {
    values,
    setValues,
    categories,
    allSubs,
    valuesChangeHandler,
  };
};

export default useProductFormStates;
