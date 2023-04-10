import React, { Fragment } from 'react'
import useFetch from '../../Hooks/useFetch'
import "./Featured.css"

const Featured = () => {

    const {data, loading, error} = useFetch("/api/v1/city/countByCity?cities=mumbai,malta,pune")
     
    return (
        <Fragment>
            <div className="featured">
                 { loading ? (
                    "Loading please wait!"
                 ) : (
                    <Fragment>
                        <div className="featuredItem">
                    <img
                        src="https://www.nationsonline.org/gallery/USA/NYC-Downtown-and-Statue-of-Liberty.jpg"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>New York</h1>
                        <h2>1560 property</h2>
                    </div>
                </div>

                <div className="featuredItem">
                    <img
                        src="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/India/Mumbai/gateway-of-india-mumbai.jpg"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Mumbai</h1>
                        <h2>673  property</h2>
                    </div>
                </div>
                <div className="featuredItem"> 
                    <img
                        src="https://media.nomadicmatt.com/2022/tokyoguide1.jpeg"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Tokeyo</h1>
                        <h2>5342 property</h2>
                    </div>
                </div>
                    </Fragment>
                 )}
            </div>
        </Fragment>
    )
}

export default Featured