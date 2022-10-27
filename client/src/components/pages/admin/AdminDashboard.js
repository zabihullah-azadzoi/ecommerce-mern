import AdminNavbar from "../../nav/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2">
          <AdminNavbar />
        </div>
        <div className="col">Admin dashboard Page</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
