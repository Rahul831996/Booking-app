import React, { Fragment, useContext, useState } from 'react';
import "./Reserve.css";
import useFetch from '../../Hooks/useFetch';
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Reserve = ({ setOpen, hotelId, day }) => {

    const navigate = useNavigate();

    const [selectedRoom, setSelectedRoom] = useState([])

    const { data, loading, error } = useFetch(`/api/v1/hotel/room/${hotelId}`)

    // converted object into array
    let roomData = Object.values(data);

    const { dates, options } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates;

    };

    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()));

        return !isFound;
    }
    

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRoom(
            checked ? [...selectedRoom, value] : selectedRoom.filter((item) => item !== value)
        );
    };

    const handleClick = async () => {
        try {
          await Promise.all(
            selectedRoom.map((roomId) => {
              const res = axios.put(`/api/v1/availability/${roomId}`, {
                dates: allDates,
              });
              return res.data;
            })
          );
          setOpen(false);
          navigate("/");
        } catch (err) {}
      };

    return (
        <Fragment>
            <div className='reserve'>
                <div className='typeRow'>
                    <div className="types">
                        <h3>Room Type</h3>
                        <h3>Price for {day *options.room }nights</h3>
                        <h3>Included</h3>
                        <h3>Select rooms</h3>
                    </div>
                </div>
                <div className="rContainer">
                
                    {roomData.map((item) => (
                        item.map((iData) =>

                            <div className="rItem" key={iData?._id}>
                                <div className="rInfo">
                                    <div className="rInfo1">
                                        <h2 className="rTitle">{iData?.title}</h2>
                                        <p className="rDesc">{iData?.desc}</p>
                                        <span className="rMax">Max Prople: {iData?.maxPeople}</span>
                                    </div>
                                    <div className="rInfo2">
                                        <p> ${iData?.price}</p>
                                    </div>
                                    <div className='rInfo3'>
                                        <p>Morning Tea & Coffe ☕</p>
                                        <p>Good Breakfast  🍽️</p>
                                    </div>
                                    <div className="rInfo4">
                                        {iData?.roomNumbers.map((roomNumber) => (
                                            <div className="room">
                                                <label>{roomNumber?.number}</label>
                                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} className='rSelectRooms' />
                                            </div>
                                        )) 
                                        }
                                    </div>
                                </div>
                            </div>

                        )
                    )
                    )}
                     <div className="closeBtn">
                     <button disabled={loading} className='rButton' onClick={handleClick}>Reserve Now!</button>
                    <button className='closebtn' onClick={() => setOpen(false)} >Close</button>
                     </div>
                </div>
            </div>
        </Fragment>

    )
};

export default Reserve