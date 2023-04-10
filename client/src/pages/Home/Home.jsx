import React, { Fragment } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Featured from '../../components/Featured/Featured';
import PorpertyList from "../../components/PropertyList/PropertyList"
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import MailList from '../../components/MailList/MailList';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <Fragment>
      <Navbar/>
      <Header/>
      <div className='homeContainer'>
       <Featured/>
        <h1 className='homeTitle'>
          Browse by property type
        </h1>
        <PorpertyList/>
          <h1 className='homeTitle'>
            Stays guest loves
          </h1>
          <FeaturedProperties/>
          <MailList/>
          <Footer/>
          
      </div>
    </Fragment>
  )
}

export default Home; 