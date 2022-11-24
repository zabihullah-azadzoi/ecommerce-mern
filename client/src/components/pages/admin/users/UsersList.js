import { useState, useEffect } from "react";

import AdminNavbar from "../../../nav/AdminNavbar";
import { getAllUsers } from "../../../../functions/userFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "antd";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user === "null") return;
    getAllUsers(user.token)
      .then((res) => {
        let users = [];
        res.data.forEach((usr) => {
          let userData = {
            _id: usr._id,
            name: usr.name,
            email: usr.email,
            role: usr.role,
          };
          if (usr.address) {
            const userAddress = JSON.parse(usr.address);
            userData.telephone = userAddress.telephone;
            userData.address = `${userAddress.lineOne}, ${userAddress.lineTwo}, ${userAddress.city}-${userAddress.postalCode}`;
          }
          users.push(userData);
        });
        setAllUsers(users);
      })
      .catch((e) =>
        toast.error(e.response ? e.response.data.error : "an error occurred!")
      );
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="mt-3 mb-5 "> All Users</h4>

          <br />
          <div className="row">
            <div className="col mb-5">
              <Card>
                {allUsers.length > 0 && (
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="bg-info text-light">
                        <tr className="text-center">
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                          <th scope="col">Contact Number</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((user) => {
                          return (
                            <tr key={user._id} className="text-center">
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>{user.telephone ? user.telephone : ""}</td>
                              <td>{user.address ? user.address : ""}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
