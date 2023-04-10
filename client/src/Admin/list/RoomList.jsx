import React, { Fragment } from "react";
import Sidebar from "../sideBar/Sidebar";
import RoomDataTable from "../dataTable/RoomDataTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { roomColumns } from "../../datatablesource";

const RoomList = () => {


  return (
    <Fragment>
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <RoomDataTable columns={roomColumns} />
      </div>
    </div>
  </Fragment>
  )
}

export default RoomList