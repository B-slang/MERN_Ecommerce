import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  //getting tjis values
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className=" card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>{name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>{email}
                </li>
                <li className="list-group-item">
                        <span className="badge badge-danger">Admin Area</span>

                    </li>
        </ul>
      </div>
    );
  };

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className=" card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create categories{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/category" className="nav-link text-success">
              Manage categories{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Products{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products{" "}
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/order" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome Admin Page"
      description="Manage All Your Product Here!"
      className="container bg-success p-4"
    >
      {/* <h1> Admin DashBoard</h1> */}
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
