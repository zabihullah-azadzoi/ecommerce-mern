const CreateUpdateSubForm = ({
  createSubHandler,
  name,
  setName,
  categories,
  setParent,
  parent = "",
}) => {
  return (
    <form onSubmit={createSubHandler}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className="form-control border-bottom border-0"
          name="name"
          required
          placeholder="Enter new sub category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="categories" className="form-label">
          Select Category
        </label>
        <select
          name="categories"
          required
          className="form-control"
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                selected={parent !== "" && cat._id === parent}
              >
                {cat.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn btn-dark mt-4 ">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateUpdateSubForm;
