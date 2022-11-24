import { useState, useEffect } from "react";
import AdminNavbar from "../../../nav/AdminNavbar";
import { getAllCategories } from "../../../../functions/categoryFunctions";
import { updateSub, getSub } from "../../../../functions/subFunctions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card } from "antd";

import { useParams, useHistory } from "react-router-dom";
import CreateUpdateSubForm from "../../../forms/CreateUpdateSubForm";

const UpdateSub = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [parent, setParent] = useState("");
  const { slug } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => toast.error(error.response.data.error));

    getSub(slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((e) => toast.error(e.response.data.error));
  }, [slug]);

  const updateSubHandler = (e) => {
    e.preventDefault();
    updateSub(user.token, slug, name, parent)
      .then((res) => {
        toast.success(`${res.data.name} updated successfully.`);
        setName("");
        setParent("");
        history.push("/admin/sub");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 ">Update sub category</h4>
          <div className="row">
            <div className="col-md-8 offset-md-2 mb-5">
              <Card>
                <CreateUpdateSubForm
                  createSubHandler={updateSubHandler}
                  name={name}
                  setName={setName}
                  categories={categories}
                  setParent={setParent}
                  parent={parent}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSub;
