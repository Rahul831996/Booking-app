import Sidebar from "../sideBar/Sidebar"
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewRoom = () => {
  
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  console.log(hotelId)
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/api/v1/all/hotels");

 

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]:   console.log(e.target.value) }));
  };
  


  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    console.log(roomNumbers)
    try {
      await axios.post(`/api/v1/room/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                   
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.id)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id}  id={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;