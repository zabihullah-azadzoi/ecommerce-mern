import moment from "moment";

import SingleImageUploadForm from "./SingleImageUploadForm";

const UpdateProfileForm = ({
  updateProfileFormSubmitHandler,
  userData,
  setUserDataHandler,
  setUserData,
}) => {
  return (
    <form onSubmit={updateProfileFormSubmitHandler}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              className="form-control"
              type="text"
              value={userData.name}
              name="name"
              onChange={setUserDataHandler}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          {" "}
          <div className="mb-3">
            <label className="form-label" htmlFor="company">
              Company
            </label>
            <input
              className="form-control"
              type="text"
              value={userData.company ? userData.company : ""}
              name="company"
              onChange={setUserDataHandler}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="birthDate">
              Birth Date
            </label>

            <input
              className="form-control"
              value={
                userData.birthDate
                  ? moment(userData.birthDate).format("yyyy-MM-DD")
                  : ""
              }
              onChange={setUserDataHandler}
              type="date"
              name="birthDate"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="occupation">
              Occupation
            </label>
            <input
              className="form-control"
              type="text"
              value={userData.occupation ? userData.occupation : ""}
              onChange={setUserDataHandler}
              name="occupation"
              required
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              value={userData.email}
              onChange={setUserDataHandler}
              name="email"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              className="form-control"
              type="tel"
              value={userData.phone ? userData.phone : ""}
              onChange={setUserDataHandler}
              name="phone"
              required
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <SingleImageUploadForm
            userData={userData}
            setUserData={setUserData}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4">Save</button>
    </form>
  );
};

export default UpdateProfileForm;
