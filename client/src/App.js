import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import List from "./pages/List/List";
import Login from "./pages/LoginAndSignUp/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DataTable from "./Admin/dataTable/UserDataTable";
import Dashboard from "./Admin/dashboard/Dashboard";
import UserList from "./Admin/list/UserList";
import { userColumns } from "./datatablesource";
import HotelList from "./Admin/list/HotelList";
import NewHotel from "./Admin/new/NewHotel";
import RoomList from "./Admin/list/RoomList";
import NewRoom from "./Admin/new/NewRoom";
import Register from "./pages/LoginAndSignUp/Register";

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/hotels" element={<List />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={<DataTable />} />
        
        <Route
          isAdmin={true}
          path="/admin/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
         <Route
          isAdmin={true}
          path="/admin/hotelList"
          element={<ProtectedRoute component={HotelList} />}
        />

        <Route
          path="/admin/userList"
          element={<UserList columns={userColumns} />} 
        />
      
 
          <Route
          isAdmin={true}
          path="/admin/newHotel"
          element={<ProtectedRoute component={NewHotel} />}
        />
          <Route
          isAdmin={true}
          path="/admin/roomList/api"
          element={<ProtectedRoute component={RoomList} />}
        />
         <Route
          isAdmin={true}
          path="/admin/newRoom"
          element={<ProtectedRoute component={NewRoom} />}
        />
     
      </Routes>
    </Router>
  );
};

export default App;
