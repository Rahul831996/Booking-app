import React, { Fragment, useContext } from 'react'
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import "./Hotel.css"
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MailList from '../../components/MailList/MailList';
import useFetch from '../../Hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';


const Hotel = () => {


  const { id } = useParams()


  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { data, error, loading, } = useFetch(`/api/v1/find/${id}`)
 

  const {user} = useContext(AuthContext) 
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);


const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
};

const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handelClick = () => {
    if(user) {
      setOpenModel(true);

    } else{
      navigate("/login");
    }
  }
 

  return (
    <Fragment>
      <Navbar />
      <Header />
      {
        loading ? (
          "Loading please wait !."
        ) : (
          <div className="hotelContainer">
             {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data?.hotel?.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{data?.hotel?.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data?.hotel?.address}</span>
              </div>
              <span className="hotelDistance">
                {data?.hotel?.distance}
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data?.hotel?.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
                {data?.hotel?.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}> 
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data?.hotel?.title}</h1>
                  <p className="hotelDesc">
                    {data?.hotel?.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the center of city, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${ days * data.hotel?.cheapestPrice * options.room }</b> ({days} nights)
                  </h2>
                  <button onClick={handelClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
             {openModel && <Reserve setOpen={setOpenModel} hotelId={id} day={days}/>}
            <MailList />
            <Footer />
            
          </div>
        )
      }
    </Fragment>
  )
}

export default Hotel;