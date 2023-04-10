import React, { Fragment, useContext, useEffect } from "react";
import "./UserList.css";
import Sidebar from "../sideBar/Sidebar";
import UserDataTable from "../dataTable/UserDataTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserList = ({ columns }) => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Fragment>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <UserDataTable columns={columns} />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
