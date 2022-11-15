import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  getAllProducts,
  filterProducts,
} from "../../../functions/productFunctions";
import { getAllCategories } from "../../../functions/categoryFunctions";
import { getAllSubs } from "../../../functions/subFunctions";
import HomeProductCard from "../../cards/HomeProductCard";
import ShopFiltersMenu from "./ShopFiltersMenu";

const initialState = {
  sliderValue: [0, 0],
  title: "Trending Products",
  categories: [],
  subs: [],
  ratingStars: 0,
  categoriesIds: [],
  subId: "",
  brandValue: "",
  colorValue: "",
  shippingValue: "",
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { text } = useSelector((state) => state.search);
  const [states, setStates] = useState(initialState);
  const { title, sliderValue } = states;

  //filter states resetting function
  const resetFilters = ({
    sliderValue,
    ratingStars,
    categoriesIds,
    subId,
    brandValue,
    colorValue,
    shippingValue,
  }) => {
    setStates((prevState) => ({
      ...prevState,
      sliderValue: sliderValue || [0, 0],
      ratingStars: ratingStars || 0,
      categoriesIds: categoriesIds || [],
      subId: subId || "",
      brandValue: brandValue || "",
      colorValue: colorValue || "",
      shippingValue: shippingValue || "",
    }));
  };

  // fetching default products for shop page
  const renderTrendingProducts = () => {
    setIsLoading(true);
    setStates((prevState) => ({ ...prevState, title: "Trending Products" }));
    getAllProducts(20, 1, "sold")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : "an error occurred!");
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    renderTrendingProducts();
    //fetching all categories
    getAllCategories()
      .then((res) => {
        setStates((prevState) => ({ ...prevState, categories: res.data }));
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : "an error occurred!");
      });

    //fetching all sub categories
    getAllSubs()
      .then((res) =>
        setStates((prevState) => ({ ...prevState, subs: res.data }))
      )
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, []);

  const filterProductsHandler = (query) => {
    setIsLoading(true);
    filterProducts(query)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response ? e.response.data.error : "an error occurred!");
        setIsLoading(false);
      });
  };

  // filtering products based on searchbar text
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (text === "") {
        renderTrendingProducts();
      } else {
        //resetting all other filter values
        resetFilters({});
        setStates((prevState) => ({
          ...prevState,
          title: `Search results for "${text}"`,
        }));
        filterProductsHandler({ text: text });
      }
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [text]);

  //filtering products based on price range change
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (sliderValue[1] > 0) {
        filterProductsHandler({ price: sliderValue });
      }
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [sliderValue]);

  //filtering products based on categories

  const categoryFilterHandler = (categoriesIds) => {
    resetFilters({ categoriesIds });

    if (categoriesIds.length > 0) {
      setStates((prevState) => ({ ...prevState, title: "Search results .." }));
      filterProductsHandler({ categories: categoriesIds });
    } else {
      renderTrendingProducts();
    }
  };

  //filtering products based on rating stars
  const ratingFilterHandler = (ratingStars) => {
    resetFilters({ ratingStars });

    setStates((prevState) => ({
      ...prevState,
      title: `${ratingStars} stars rated Products`,
    }));
    filterProductsHandler({ rating: ratingStars });
  };

  //filtering products based on sub category
  const subFilterHandler = (subId, subName) => {
    resetFilters({ subId });

    setStates((prevState) => ({
      ...prevState,
      title: `Search results for "${subName}" sub category.`,
    }));
    filterProductsHandler({ sub: subId });
  };

  //filtering products based on brand
  const brandFilterHandler = (brand) => {
    resetFilters({ brandValue: brand });

    setStates((prevState) => ({
      ...prevState,
      title: `Search results for "${brand}" brand.`,
    }));

    filterProductsHandler({ brand: brand });
  };

  //filtering products based on color
  const colorFilterHandler = (color) => {
    resetFilters({ colorValue: color });

    setStates((prevState) => ({
      ...prevState,
      title: `Search results for "${color}" color.`,
    }));

    filterProductsHandler({ color: color });
  };

  //filtering products based on shipping
  const shippingFilterHandler = (shipping) => {
    resetFilters({ shippingValue: shipping });

    setStates((prevState) => ({
      ...prevState,
      title: `shipping: "${shipping}"`,
    }));

    filterProductsHandler({ shipping: shipping });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <p>filter products</p>
          <ShopFiltersMenu // all filters menu component
            states={states}
            categoryFilterHandler={categoryFilterHandler}
            ratingFilterHandler={ratingFilterHandler}
            subFilterHandler={subFilterHandler}
            brandFilterHandler={brandFilterHandler}
            colorFilterHandler={colorFilterHandler}
            shippingFilterHandler={shippingFilterHandler}
            resetFilters={resetFilters}
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            <h3 className="mt-3 mb-3 text-danger">{title}</h3>
            {isLoading
              ? "Loading..."
              : products && products.length > 0
              ? products.map((product) => {
                  return (
                    <div className="col-md-4 text-center" key={product._id}>
                      <HomeProductCard product={product} />
                    </div>
                  );
                })
              : "No Product found!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
