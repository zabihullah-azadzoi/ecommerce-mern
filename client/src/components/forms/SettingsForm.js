import SingleImageUploadForm from "./SingleImageUploadForm";
import ImagesUploadForm from "./ImagesUploadForm";

const SettingsForm = ({ settingsFormSubmitHandler, values, setValues }) => {
  return (
    <form onSubmit={settingsFormSubmitHandler}>
      <div className="form-group">
        <div className="row mt-2">
          <div className="col-md-6">
            <SingleImageUploadForm
              userData={values}
              setUserData={setValues}
              label={"Upload Logo"}
            />
          </div>
        </div>
        <label htmlFor="name" className="form-label">
          Application Name
        </label>
        <input
          className="form-control border-bottom border-0"
          name="name"
          placeholder="Enter a name for Application"
          value={values.name}
          required
          onChange={(e) =>
            setValues((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <br />
        <br />
        <label htmlFor="description" className="form-label">
          Application Description
        </label>
        <input
          className="form-control border-bottom border-0"
          name="description"
          placeholder="Enter description for Application"
          value={values.description}
          required
          onChange={(e) =>
            setValues((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />

        <div className="row mt-5">
          <div className="col-md-6">
            <ImagesUploadForm
              values={values}
              setValues={setValues}
              label={"Upload banner photos"}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark mt-2 "
          disabled={values.name && values.name.length < 6}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
