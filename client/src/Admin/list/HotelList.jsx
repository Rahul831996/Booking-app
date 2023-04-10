import React, { Fragment, useContext,useEffect } from "react";
import Sidebar from "../sideBar/Sidebar";
import HotelDataTable from "../dataTable/HotelDataTable";
import { hotelColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HotelList = () => {

  const navigate = useNavigate()

  const {user} = useContext(AuthContext)

  useEffect(() => {
    if(user.user.role !== "admin"){
      navigate("/")
    }
  },[navigate])

  return (
    <Fragment>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <HotelDataTable columns={hotelColumns} />
        </div>
      </div>
    </Fragment>
  );
};

export default HotelList;
