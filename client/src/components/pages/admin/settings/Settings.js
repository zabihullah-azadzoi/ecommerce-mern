import { useState, useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card } from "antd";

import {
  getSettings,
  updateSettings,
} from "../../../../functions/settingsFunctions";
import { toast } from "react-toastify";
import SettingsForm from "../../../forms/SettingsForm";

const Settings = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    images: [],
  });

  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.data) {
          setValues({
            name: res.data.name || "",
            description: res.data.description || "",
            image: res.data.logo || "",
            images: res.data.bannerPhotos || [],
          });
        }
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, []);

  const settingsFormSubmitHandler = (e) => {
    e.preventDefault();
    const settings = {
      name: values.name,
      description: values.description,
      logo: values.image,
      bannerPhotos: values.images,
    };

    updateSettings(user.token, settings)
      .then((res) => {
        toast.success("Settings updated successfully");

        setTimeout(() => {
          history.go(0);
        }, 2000);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 ">Application Settings</h4>
          <div className="row">
            <div className="col-md-8 offset-md-2 mb-5">
              <Card>
                <SettingsForm
                  settingsFormSubmitHandler={settingsFormSubmitHandler}
                  values={values}
                  setValues={setValues}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
