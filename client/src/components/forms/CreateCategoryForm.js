import SingleImageUploadForm from "./SingleImageUploadForm";

const CreateCategoryForm = ({
  createCategoryHandler,
  name,
  setName,
  image,
  setImage,
}) => {
  return (
    <form onSubmit={createCategoryHandler}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className="form-control border-bottom border-0"
          name="name"
          placeholder="Enter new Category name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <div className="row mt-5">
          <div className="col-md-6">
            <SingleImageUploadForm userData={image} setUserData={setImage} />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark mt-2 "
          disabled={name.length < 3}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
