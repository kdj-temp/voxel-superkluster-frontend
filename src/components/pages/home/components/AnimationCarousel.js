/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { memo, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link, useNavigate } from "@reach/router";
import { Axios } from "../../../../core/axios";
import Carousel from "react-multi-carousel";

const GlobalStyles = createGlobalStyle`
    .featured_Nft_Slide .slick-arrow:before {
        z-index: 100;
        padding: 10px 12px 10px 14px;
        background-color: transparent ;
        border-radius: 50%;
    }

    .featured_Nft_Slide .slick-prev {
        left: 2%;
        z-index: 1 ;
        background: #f60cfe !important;
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
          left: -8px;
          top: -26px;
          position: absolute;
        }
        &:hover {
          opacity: 1;-webkit-box-shadow: 0px 0px 15px 1px rgba(246,12,254,0.39); 
          box-shadow: 0px 0px 15px 1px rgba(246,12,254,0.39);
        }
    }
    

    .featured_Nft_Slide .slick-next {
        right: 2%;
        background: #f60cfe !important;
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
          right: -4px;
          top: -26px;
          position: absolute;
        }
        &:hover {
          opacity: 1;-webkit-box-shadow: 0px 0px 15px 1px rgba(246,12,254,0.39); 
          box-shadow: 0px 0px 15px 1px rgba(246,12,254,0.39);
          }
    }


}
`;

const AnimationCarousel = function({colormodesettle}) {

    const navigate = useNavigate();

    const [itemData, setItemData] = useState([]);
    const [usdPrice , setUsdPrice]= useState() ;
    const [trendingColor, setTrendingColor] = useState('rgba(0,0,0,0.4');

    useEffect(() => {
        const interval = setInterval(() => {
            let newObj = [...itemData] ;
            itemData.map((item , inx) => {
                if(item.onSale == '1') {
                    newObj[inx]['saleEndDate'] = (newObj[inx]['saleEndDate'] - 1000) > 0 ? (newObj[inx]['saleEndDate'] - 1000) : 0  ;
                }    
            })
            
            setItemData(newObj) ;
        }, 1000);

        return () => clearInterval(interval) ;
    }, [itemData]) ;

    const getReturnValues_days = (countDown) => {
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        return days ;
    };

    const getReturnValues_hours = (countDown) => {
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        return hours ;
    };

    const moveToCollectionPage = (param) => {
        navigate(`/collection-detail/${param}`);
    }

    const getReturnValues_minutes = (countDown) => {
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        return minutes ;
    };

    const getReturnValues_seconds = (countDown) => {
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        return seconds ;
    };

    const today_date = new Date();

    let t_date = new Date(today_date);
    // let year = t_date.getFullYear();
    let month = '' + (t_date.getMonth() + 1);
    let day = '' + t_date.getDate();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const usdPrice_num = (num) => {
        let str = '' ;
        if(num > 1000) str = parseInt(num / 1000) + 'K' ;
        if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
        if(num < 1000) str = num.toFixed(0) ;
        return str;
    }

    const usdPrice_num_usd=(num)=> {
        let str = '' ;
        if(num > 1000) str = parseFloat(parseInt(num / 100)/10) + 'K' ;
        if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
        if(num < 1000) str = num.toFixed(2) ;
        return str;
    }

    useEffect(() => {
        getFeaturedItem()
    }, []) ;

    useEffect(() => {
        if(!colormodesettle.ColorMode) setTrendingColor('#26292d');
        else setTrendingColor('rgb(255,255,255)');
    }, [colormodesettle])

    const getFeaturedItem = async () => {
        const result = await Axios.post(`/api/supply-assets/trending-items`);
        const assets = result.data;
        if(assets.data) {
            let temp = assets.data ;
            setUsdPrice(assets.usdPrice) ;
            assets.data.map((item, index) => {
                if(item.saleType != '2'){
                    temp[index]['saleType'] = 1;
                    temp[index]['endTime'] = item.saleEndDate;
                    temp[index]['saleEndDate'] = (item.saleEndDate * 1000 - new Date().getTime()) > 0 ? item.saleEndDate * 1000 - new Date().getTime() : 0;
                }else  {
                    temp[index]['saleType'] = 2;
                    temp[index]['endTime'] = item.auctionEndDate;
                    temp[index]['saleEndDate'] = (item.auctionEndDate* 1000 - new Date().getTime()) > 0 ? (item.auctionEndDate* 1000 - new Date().getTime()) : 0;
                }
            })
            setItemData(temp) ;
        }
    }

    const moveToDetailPage = (itemId) => {
        navigate(`/ItemDetail/${itemId}`);
    }

    const responsive = {
        tablet: {
          breakpoint: { max: 10000, min: 1800 },
          items: 3
        },
        smallTablet: {
          breakpoint: { max: 1800, min: 768 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 767, min: 0 },
          items: 1
        }
      };
      return (
        <div className='nft-big' style={{overflow:'hidden', padding:'10px 0'}}>
            <GlobalStyles/>
            <section id="section-hero" className="no-bottom">
                <div className="animation-section">
                    {
                        itemData && itemData.length > 0 ?
                            <Carousel responsive={responsive}>
                                {
                                    itemData.map((item, index) => (
                                        <div className="nft__item_lg" key={index} style={{margin:'0 10px'}}>
                                            <div className="row align-items-center" style={{margin:'0px auto', borderRadius:'20px', background:trendingColor, boxShadow: '0px 0px 15px 2px rgb(0 0 0 / 10%)', maxWidth:'650px'}}>
                                                <div className="col-lg-6" onClick={()=>moveToDetailPage(item.assetId)} style={{ cursor: 'pointer', height:'300px', padding:'0 0 0 0'}}>
                                                    <img src={item.image} style={{ opacity: 1, filter: 'none' , height:'100%' , width:'100%', objectFit: 'cover', objectPosition: 'center top', marginLeft:'0px' }} className="img-fluid" alt="" />
                                                </div>
                                                <div className="col-lg-6" >
                                                    <div className="TrendingRight" style ={{maxWidth:'100%', minWidth:'0px'}}> 
                                                        <div className="d-desc currentTrendingDetail" style ={{paddingLeft:'0px', overflow:'hidden', textOverflow:'ellipsis'}}>
                                                            <h3 style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.name ? item.name : "Unnamed"}</h3>
                                                            <div className="d-author">
                                                                <div className="author_list_pp">
                                                                    <div  onClick={(e) => {moveToCollectionPage(item.collection.link);e.preventDefault();}}>
                                                                        <img className="lazy" style={{ opacity: 1, filter: 'none' }} src={item.collection && item.collection.avatar ? item.collection.avatar : "/img/collections/coll-1.jpg"}alt="" />
                                                                        <i className="fa fa-check"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="author_list_info">
                                                                    <Link to={`/author/${item.owner && item.owner.public_address}`} className="username">{item.collection && item.collection.name ? item.collection.name : "Unnamed"}</Link>
                                                                </div>
                                                            </div>
                                                            <div className="d-attr" >
                                                                <div style={item.onSale == '1' ?{}:{display:'none'}}>
                                                                    <span className="d-title" style={{marginTop:'3px', marginLeft:'-8px'}}>
                                                                        {
                                                                            item.onSale == '1' && item.saleType == 1 ?
                                                                                "Current Price"
                                                                            :
                                                                                item.onSale == '1' && item.saleType == 2 ?
                                                                                "Current Bid"
                                                                                : ""
                                                                        }
                                                                        </span>
                                                                    <div className="de_countdown is-countdown" style={{paddingLeft:'7px'}}>
                                                                        <h3>{item && item.onSale == '1' && (item.price/usdPrice) ? `${usdPrice_num(item.price/usdPrice)} VXL` : ""}</h3>
                                                                        <h5 className="NorTxt" style={{paddingTop:'8px'}}>{item && item.onSale == '1' ? `${usdPrice_num_usd(item.price)} USD` : "" }</h5>
                                                                    </div>
                                                                </div>
                                                                
                                                                    {
                                                                        item.onSale == '1' && item.saleType == 2 ?
                                                                            <div>
                                                                                <span className="d-title" style={{paddingTop:'2px'}}>Sale ends in</span>
                                                                                <div className="de_countdown is-countdown" style={{paddingLeft:'18px'}}>
                                                                                    <span className="countdown-row countdown-show4">
                                                                                        <span className="countdown-section">
                                                                                            <span className="countdown-amount">{getReturnValues_days(item.saleEndDate)}d</span>
                                                                                        </span>
                                                                                        <span className="countdown-section">
                                                                                            <span className="countdown-amount">{getReturnValues_hours(item.saleEndDate)}h</span>
                                                                                        </span>
                                                                                        <span className="countdown-section">
                                                                                            <span className="countdown-amount">{getReturnValues_minutes(item.saleEndDate)}m</span>
                                                                                        </span>
                                                                                        <span className="countdown-section">
                                                                                            <span className="countdown-amount">{getReturnValues_seconds(item.saleEndDate)}s</span>
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                
                                                                                <h5 className="NorTxt">{(new Date(item.endTime*1000).toLocaleString())}</h5>
                                                                            </div>
                                                                            : 
                                                                                item.onSale == '1' && item.saleType == 1 ?
                                                                                    <></>
                                                                                    :<div className="NotforSale"> <h4>Not for sale</h4></div>
                                                                    }
                                                                    
                                                                
                                                            </div>
                                                            <div className="spacer-10"></div>
                                                            <div className="d-buttons placeBidBtn" style={{}}>
                                                                {/* <a href={`/ItemDetail/${item.assetId}`} className="btn-main">Place a bid</a> */}
                                                                <div className="btn-main viewartwork" onClick={()=>moveToDetailPage(item.assetId)} style={{padding:'8px 8px 8px 8px', width:'auto'}}>
                                                                    <span style={{whiteSpace:'nowrap'}}>View artwork</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Carousel>
                            : 
                            null
                    }
                    
                </div>
            </section>
        </div>
      );
}

export default memo(AnimationCarousel);

