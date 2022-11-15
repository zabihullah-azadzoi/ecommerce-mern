import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const { text } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const history = useHistory();

  const searchChangeHandler = (e) => {
    dispatch({
      type: "SEARCH_TEXT",
      payload: {
        text: e.target.value,
      },
    });
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    history.push("/shop");
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <div className="input-group rounded dark">
        <div className="">
          <input
            type="search"
            value={text}
            className="form-control rounded d-inline me-1"
            placeholder="Search"
            onChange={searchChangeHandler}
          />
          <SearchOutlined onClick={searchSubmitHandler} />
        </div>
      </div>
    </form>
  );
};

export default Search;
