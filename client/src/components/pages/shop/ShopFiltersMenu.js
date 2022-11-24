import { useCallback } from "react";
import { Menu, Slider, Checkbox, Radio, Space } from "antd";
import StarRatings from "react-star-ratings";

import useMenuModeToggler from "../../../customHooks/useMenuModeToggler";

const brands = ["Apple", "Samsung", "Hp", "Dell", "Toshiba"];
const colors = ["Black", "White", "Red", "Silver", "Blue"];

const ShopFiltersMenu = ({
  states,
  categoryFilterHandler,
  subFilterHandler,
  ratingFilterHandler,
  brandFilterHandler,
  colorFilterHandler,
  shippingFilterHandler,
  resetFilters,
}) => {
  const {
    sliderValue,
    categories,
    subs,
    brandValue,
    colorValue,
    shippingValue,
    categoriesIds,
  } = states;

  const { menuMode } = useMenuModeToggler();

  // category list checkbox options
  let options = [];
  if (categories.length > 0) {
    options = categories.map((cat) => {
      return { label: cat.name, value: cat._id };
    });
  }

  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  //sub categories list
  const subsRenderHandler = () => {
    return (
      <div>
        {subs.length > 0 &&
          subs.map((sub) => {
            return (
              <div
                className="badge badge-secondary p-2 m-2"
                style={{ cursor: "pointer" }}
                key={sub._id}
                onClick={() => subFilterHandler(sub._id, sub.name)}
              >
                {sub.name}
              </div>
            );
          })}
      </div>
    );
  };

  //brands list
  const brandsRenderHandler = () => {
    return (
      <Radio.Group
        onChange={(e) => brandFilterHandler(e.target.value)}
        value={brandValue}
      >
        <Space direction="vertical">
          {brands.map((brand) => {
            return (
              <Radio value={brand} key={brand}>
                {brand}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );
  };
  //colors list
  const colorsRenderHandler = () => {
    return (
      <Radio.Group
        onChange={(e) => colorFilterHandler(e.target.value)}
        value={colorValue}
      >
        , "sub6"
        <Space direction="vertical">
          {colors.map((color) => {
            return (
              <Radio value={color} key={color}>
                {color}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );
  };

  //shipping list
  const shippingRenderHandler = () => {
    return (
      <Radio.Group
        onChange={(e) => shippingFilterHandler(e.target.value)}
        value={shippingValue}
      >
        <Space direction="vertical">
          <Radio value={"Yes"} key={"Yes"}>
            Yes
          </Radio>

          <Radio value={"No"} key={"No"}>
            No
          </Radio>
        </Space>
      </Radio.Group>
    );
  };

  //rating stars menu component
  const starGenerator = useCallback(() => {
    let starsArray = [];
    for (let i = 5; i >= 1; i--) {
      starsArray.push({
        id: i,
        star: (
          <StarRatings
            rating={i}
            starDimension="25px"
            starSpacing="5px"
            starRatedColor="red"
            numberOfStars={i}
            name="rating"
          />
        ),
      });
    }

    return (
      <>
        {starsArray.map((star) => {
          return (
            <div
              style={{ width: "fit-content", cursor: "pointer" }}
              key={star.id}
              onClick={() => ratingFilterHandler(star.id)}
            >
              {star.star}
            </div>
          );
        })}
      </>
    );
  }, [ratingFilterHandler]);

  //menu items
  const items = [
    getItem("Price", "sub1", [
      getItem(
        <Slider
          range
          defaultValue={sliderValue}
          value={sliderValue}
          max={10000}
          min={0}
          onChange={(value) => resetFilters({ sliderValue: value })}
        />,
        "g1",
        null,
        "group"
      ),
    ]),
    getItem("Categories", "sub2", [
      getItem(
        <Checkbox.Group
          className="d-flex flex-column"
          value={categoriesIds}
          options={options}
          onChange={(values) => categoryFilterHandler(values)}
        />,
        "g2",
        null,
        "group"
      ),
    ]),
    getItem("Rating", "sub3", [getItem(starGenerator(), "g3", null, "group")]),
    getItem("Sub Categories", "sub4", [
      getItem(subsRenderHandler(), "g4", null, "group"),
    ]),
    getItem("Brands", "sub5", [
      getItem(brandsRenderHandler(), "g5", null, "group"),
    ]),
    getItem("Colors", "sub6", [
      getItem(colorsRenderHandler(), "g6", null, "group"),
    ]),
    getItem("Shipping", "sub7", [
      getItem(shippingRenderHandler(), "g7", null, "group"),
    ]),
  ];

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7"]}
      mode={menuMode}
      items={items}
    />
  );
};

export default ShopFiltersMenu;
