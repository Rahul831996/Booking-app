import React, { Fragment } from 'react'
import "./FeaturedProperties.css"
import useFetch from "../../Hooks/useFetch"
const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("/api/v1/all/hotels?featured=true");

 console.log(data)

    return (
        <Fragment>
            <div className="fp">
                {
                    loading ? (
                        "Loading please wait !"
                    ) : (
                         <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt="img"
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
                    )
                }
            </div>
        </Fragment>
    )
}

export default FeaturedProperties