import { useState, useEffect } from "react";

import { auth, firebaseAuth } from "../../../firebase";
import { toast } from "react-toastify";

import { Card } from "antd";
import { currentUser } from "../../../functions/authFunctions";
import { createOrUpdateUser } from "../../../functions/userFunctions";
import { useSelector } from "react-redux";

import UpdateProfileForm from "../../forms/UpdateProfileForm";
import UpdatePasswordForm from "../../forms/UpdatePasswordForm";
import AdminNavbar from "../../nav/AdminNavbar";
import UserNavbar from "../../nav/UserNavbar";

import profileImage from "../../../assets/profile.png";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [userHasPassword, setUserHasPassword] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== "null") {
      currentUser(user.token)
        .then((res) => setUserData(res.data.user))
        .catch((e) =>
          toast.error(e.response ? e.response.data.error : "an error occurred!")
        );

      //checking if user has logged in using google auth or password
      const currentLoggedInUser = auth.currentUser;
      const existingPassword =
        currentLoggedInUser.multiFactor.user.providerData.find(
          (provider) => provider.providerId === "password"
        );

      if (existingPassword) {
        setUserHasPassword(true);
      } else {
        setUserHasPassword(false);
      }
    }
  }, [user]);

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("confirm password doesn't match the new password!");
    }

    setLoading(true);

    if (!userHasPassword) {
      setLoading(true);
      //updating user password
      auth.currentUser
        .updatePassword(passwords.newPassword)
        .then((user) => {
          setLoading(false);

          toast.success("Password has been successfully updated.");
          setPasswords({
            confirmPassword: "",
            newPassword: "",
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } else {
      const user = auth.currentUser;

      //re authenticating user in order to verify old password
      const credential = firebaseAuth.EmailAuthProvider.credential(
        user.email,
        passwords.oldPassword
      );

      user
        .reauthenticateWithCredential(credential)
        .then((result) => {
          if (result.user) {
            setLoading(false);
            //updating user password
            auth.currentUser
              .updatePassword(passwords.newPassword)
              .then((user) => {
                toast.success("Password has been successfully updated.");
                setPasswords({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              })
              .catch((error) => {
                setLoading(false);
                toast.error(error.message);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error && "Old password is invalid");
          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        });
    }
  };

  const updateProfileFormSubmitHandler = (e) => {
    e.preventDefault();

    createOrUpdateUser(user.token, userData)
      .then((res) => {
        toast.success("Information updated successfully.");

        // reloading the page for reflecting the changes

        setTimeout(() => {
          window.location.reload();
        }, [3000]);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  };

  const setUserDataHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const setPasswordsHandler = (e) => {
    setPasswords((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2 p-0">
          {user && user.role === "admin" ? <AdminNavbar /> : <UserNavbar />}
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5">Profile</h4>
          <div className="row">
            <div className="col-md-8">
              <Card className="mb-5">
                <h5 className="mb-5">General Information</h5>
                {userData && (
                  <UpdateProfileForm
                    updateProfileFormSubmitHandler={
                      updateProfileFormSubmitHandler
                    }
                    userData={userData}
                    setUserData={setUserData}
                    setUserDataHandler={setUserDataHandler}
                  />
                )}
              </Card>
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col  mb-md-0">
                  {userData && (
                    <div className="card testimonial-card">
                      <div className="avatar mx-auto bg-white text-center pt-2">
                        <img
                          src={
                            userData.image ? userData.image.url : profileImage
                          }
                          className="rounded-circle "
                          style={{
                            height: "10rem",
                            width: "10rem",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      </div>
                      <div className="card-body text-center">
                        <h4 className="mb-4 ">{userData.name}</h4>
                        <hr />
                        {userData.occupation && userData.company && (
                          <p className="dark-grey-text mt-4">
                            {`${userData.occupation} - ${userData.company}`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Card className="mt-3">
                    <h5 className=" mb-5">Update Password</h5>
                    <UpdatePasswordForm
                      userHasPassword={userHasPassword}
                      updatePasswordHandler={updatePasswordHandler}
                      passwords={passwords}
                      setPasswordsHandler={setPasswordsHandler}
                      loading={loading}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
