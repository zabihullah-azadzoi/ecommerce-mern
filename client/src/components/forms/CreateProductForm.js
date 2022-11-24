import { Select } from "antd";

const CreateProductForm = ({
  productFormSubmitHandler,
  valuesChangeHandler,
  values,
  categories,
  allSubs,
  onSetValues,
}) => {
  const colors = ["Black", "White", "Red", "Silver", "Blue"];
  const brands = ["Apple", "Samsung", "Hp", "Dell", "Toshiba"];

  return (
    <form onSubmit={productFormSubmitHandler} className=" pt-3 pb-2">
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          name="title"
          required
          value={values.title}
          onChange={valuesChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          className="form-control"
          type="text"
          required
          name="description"
          value={values.description}
          onChange={valuesChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="price">
          Price
        </label>
        <input
          className="form-control"
          type="number"
          name="price"
          value={values.price}
          onChange={valuesChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="quantity">
          Quantity
        </label>
        <input
          className="form-control"
          type="number"
          name="quantity"
          value={values.quantity}
          onChange={valuesChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="shipping">
          Shipping
        </label>
        <select
          className="form-control"
          name="shipping"
          required
          value={values.shipping && values.shipping}
          onChange={valuesChangeHandler}
        >
          <option value="">Please Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="color">
          Color
        </label>
        <select
          className="form-control"
          name="color"
          required
          value={values.color && values.color}
          onChange={valuesChangeHandler}
        >
          <option value="">Please Select</option>
          {colors.map((color) => (
            <option value={color} key={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="brand">
          Brand
        </label>
        <select
          className="form-control"
          required
          name="brand"
          value={values.brand && values.brand}
          onChange={valuesChangeHandler}
        >
          <option value="">Please Select</option>
          {brands.map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          className="form-control"
          name="category"
          required
          value={values.category && values.category}
          onChange={valuesChangeHandler}
        >
          <option value="">Please Select</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      {values.category !== "" && (
        <div className="mb-3">
          <label className="form-label" htmlFor="subs">
            Sub Categories
          </label>
          <Select
            mode="multiple"
            placeholder="choose sub categories"
            value={values.subs && values.subs}
            onChange={(value) =>
              onSetValues((prevState) => ({ ...prevState, subs: value }))
            }
            style={{
              width: "100%",
            }}
          >
            {allSubs.length > 0 &&
              allSubs.map((sub) => (
                <Select.Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Select.Option>
              ))}
          </Select>
        </div>
      )}
      <button className="btn btn-secondary" type="submit">
        Save
      </button>
    </form>
  );
};

export default CreateProductForm;
