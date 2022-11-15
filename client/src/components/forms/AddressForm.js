import { useRef } from "react";

const AddressForm = ({ saveAddressToDbHandler }) => {
  const addressOneRef = useRef();
  const addressTwoRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();
  const telephoneRef = useRef();

  const addressFormHandler = (e) => {
    e.preventDefault();
    const address = {
      lineOne: addressOneRef.current.value,
      lineTwo: addressTwoRef.current.value,
      city: cityRef.current.value,
      postalCode: postalRef.current.value,
      telephone: telephoneRef.current.value,
    };
    saveAddressToDbHandler(JSON.stringify(address));
  };

  return (
    <form className="mt-5 " onSubmit={addressFormHandler}>
      <div className="input-group mb-3 ">
        <span className="input-group-text border-0" id="basic-addon3">
          Address Line 1 <span className="text-danger">&#42;</span>
        </span>
        <input
          required
          type="text"
          ref={addressOneRef}
          className="form-control rounded"
        />
      </div>
      <div className="input-group mb-3 ">
        <span className="input-group-text border-0" id="basic-addon3">
          Address Line 2 <span className="text-danger">&#42;</span>
        </span>
        <input
          required
          type="text"
          ref={addressTwoRef}
          className="form-control rounded"
        />
      </div>
      <div className="input-group mb-3 ">
        <span className="input-group-text border-0" id="basic-addon3">
          City <span className="text-danger">&#42;</span>
        </span>
        <input
          required
          type="text"
          ref={cityRef}
          className="form-control rounded"
        />
      </div>
      <div className="input-group mb-3 ">
        <span className="input-group-text border-0" id="basic-addon3">
          Postal Code <span className="text-danger">&#42;</span>
        </span>
        <input
          required
          type="number"
          ref={postalRef}
          className="form-control rounded"
        />
      </div>
      <div className="input-group mb-3 ">
        <span className="input-group-text border-0" id="basic-addon3">
          Telephone <span className="text-danger">&#42;</span>
        </span>
        <input
          required
          type="number"
          ref={telephoneRef}
          className="form-control rounded"
        />
      </div>
      <button type="submit" className="btn btn-info float-end">
        Save
      </button>
    </form>
  );
};

export default AddressForm;
