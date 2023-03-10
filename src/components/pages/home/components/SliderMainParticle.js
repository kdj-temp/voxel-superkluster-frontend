/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from '@reach/router';
import { Carousel } from 'antd';

import { Axios } from "../../../../core/axios";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const H1 = styled.h1`
   color: black;
   font-weight: 700!important
`;

const GlobalStyles = createGlobalStyle`
    . {
      padding: 26px;
    }
   .hero-image {
      max-height: 550px!important;
      transform: translate3d(0, 0, 0) perspective(300px) rotateY(-10deg) scale(.95)!important;
      animation: backgrounda 2s ease-in-out infinite alternate!important;
      -webkit-box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1)!important;
      -moz-box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1)!important;
      box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1)!important;
      transition: all .6s;
      -webkit-transition: all .6s;
      animation: animate 1s linear infinite;
      perspective: 800px;
      margin: 1px;
   }
   .hero-image:hover {
      transform: translate3d(0, 0, 0) perspective(300px) rotateY(0deg) scale(1.05) !important;
   }
    div.bannerstyle.superKluster_Slide .slick-arrow:before {
        color: #fcfcfcfa !important;
    } 
    .bannerstyle .superKluster_Slide .slick-arrow {
        width: 40px;
        height: 40px;
        border: 1px solid grey;
        border-radius: 50%;
        padding: 8px 2px 0px 0px;

        &:before {
          font-size: 1rem;
          font-family: 'FontAwesome'!important;
        }
    }
    .bannerstyle .superKluster_Slide .slick-prev {
        left:2% !important ;  
        z-index: 1 ;
        background: #f60cfe;
        border: 2px solid #f60cfe;
        position: absolute;
        display: block;
        height:30px;
        width:30px;
        color: black;
        font-size: 20px;
        font-weight: 700;
        opacity: .3;
        padding: 10px;
        text-align: center;
        transition: all .6s;
          color: #ffffff00;
          line-height: 100%;
        -webkit-transition: all .6s;
        &:before {
          content: "\f053" !important;
          color: white !important;
          right: 8px;
          top: 4px;
          position: absolute;
        }
        &:hover {
          opacity: 1;

          background: #f60cfe;
          border: 2px solid #f60cfe;
        }
    }
    .bannerstyle .superKluster_Slide .slick-next {
      right:2% !important ;
      right:10px ;  
      background: #f60cfe;
        border: 2px solid #f60cfe;
        position: absolute;
        display: block;
        height:30px;
        opacity: .3;
        width:30px;
        color: black;
        font-size: 20px;
        font-weight: 700;
        padding: 10px;
        text-align: center;
        transition: all .6s;
          color: #ffffff00;
          line-height: 100%;
        -webkit-transition: all .6s;
        &:before {
          content: "\f054" !important;
          color: white !important;
          right: 5px;
          top: 4px;
          position: absolute;
        }
        &:hover {
          opacity: 1;
          background: #f60cfe;
          border: 2px solid #f60cfe;
          }
    }
`;

const Slidermainparticle= () => {
  const [isSliderEffect, setSliderEffect] = useState(false);
  const [arrowState, setArrowState] = useState(false);
  const [bannerData , setBannerData] = useState() ;
  const accessToken = localStorage.getItem('accessToken');
  const header = { 'Authorization': `Bearer ${accessToken}` };

  
  const get_banner = async() =>{
    const postData = {};
    await Axios.post("/api/assets/get-banners", postData, { headers: header })
      .then((res) => {
        setBannerData(res.data.data);
      })
      .catch((err) => { 
      });
  }

  useEffect(() => {
    get_banner() ;
    
    if (window.innerWidth > 768) {
      setSliderEffect(true)
    }
    else if (window.innerWidth < 600) {
      setArrowState(true)
    }
    else {
      setArrowState(false);
      setSliderEffect(false)
    }
  }, [])

  const confirmUrlLink=(url)=>{
    return url.includes('http')  ;
  }

  return (
    <>
      

      <div className=" bannerstyle" style={{width:'100%'}}>
        <GlobalStyles />
        <Carousel className="superKluster_Slide" autoplay arrows={arrowState ? false : true} dotPosition="bottom" dots={false} autoplaySpeed={5000} focusOnSelect={true}>
          {
            bannerData && bannerData.length > 0 ?
              bannerData.map((banner, index) => (
                <div key={index}>
                  <div className="row align-items-center" style={{padding:'0 8%'}}>
                    <div className='col-md-6 slidermainLeft1' style ={{marginBottom:'12px'}}>
                      <div className="mainStyleSlider">
                        <div className="spacer-single"></div>
                        <h6><span className="text-uppercase color" style={{letterSpacing: '-1px', fontWeight: '900'}}>{banner.small_header}</span></h6>
                        <Reveal className='onStep' keyframes={fadeInUp} delay={!isSliderEffect ? 0 : 300} duration={!isSliderEffect ? 0 : 900} triggerOnce>
                          <H1 className="col-black">{banner.big_header}</H1>
                        </Reveal>
                        <Reveal className='onStep' keyframes={fadeInUp} delay={!isSliderEffect ? 0 : 600} duration={!isSliderEffect ? 0 : 900} triggerOnce>
                          <p className="lead col-black">
                          {banner.description}
                          </p>
                        </Reveal>
                        <div className="spacer-10"></div>
                        <Reveal className='onStep d-inline' keyframes={inline} delay={!isSliderEffect ? 0 : 800} duration={!isSliderEffect ? 0 : 900} triggerOnce>
                          {
                            (banner && banner.redirect_link !='' && confirmUrlLink(banner.redirect_link)) ?
                              <Link to="" onClick={()=> window.open(banner.redirect_link, "_blank")} className="btn-main inline lead text-white" style = {{wordBreak:'keep-all'}}>{banner.button_text}</Link>
                              :
                              <Link to={banner.redirect_link} onClick={()=> window.open("#", "_self")} className="btn-main inline lead text-white" style = {{wordBreak: 'keep-all'}}>{banner.button_text}</Link>
                          }
                          <div className="mb-sm-30"></div>
                        </Reveal>
                      </div>
                    </div>
                    <div className='col-md-6  slidermainRight1'>
                      <a href={banner.website_link} target="_blank"><LazyLoadImage src={banner.banner} className={` ${banner.class_name} ` ?   `lazy img-fluid ${banner.class_name}  ` : "lazy img-fluid"} style={banner.class_name  && banner.class_name.includes('hero') ? {  marginTop: 50, width: '80%' ,height: 'auto', borderRadius: 10 ,marginLeft:'10%' }: {}} data-wow-delay="1.25s" alt=""/></a>
                    </div>
                  </div>
                </div>
                
              ))
              :
              <></>
          }
        </Carousel>
      </div>
    </>
  );
}

export default Slidermainparticle;