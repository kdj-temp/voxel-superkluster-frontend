import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate} from "@reach/router";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Statistic } from "antd";
import * as selectors from '../../store/selectors';
import { Axios } from "../../core/axios";
import { currencyLogo, currencyName } from "../../store/utils";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  height: 100%;
  width: 100%;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 10px 0px 18px 0px;
  align-items: flex-end;
`;

const CardDescription = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-content {
    font-size: 14px!important;
    overflow: hidden!important;
    white-space: nowrap!important;

    .ant-statistic-content-prefix, .ant-statistic-content-value {
      font-size: 14px!important;
      font-weight: bold!important;
    }
  }
`;

const NFTCard = styled.div`

  padding: 0!important;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all ease 400ms;
  width: calc(100% - 20px);

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 1200px) {
    .nft__item .nft__item_wrap {
      // height: 180px;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .nft__item .nft__item_wrap {
      // height: 160px;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .nft__item .nft__item_wrap {
      // height: 170px;
    }
  }

  @media (min-width: 480px) and (max-width: 767px) {
    .nft__item .nft__item_wrap {
      // height: 190px;
    }
  }

  @media (min-width: 375px) and (max-width: 479px) {
    margin-right: auto!important;
    margin-left: auto!important;

    .nft__item .nft__item_wrap {
      // height: 250px;
    }
  }

  @media (max-width: 374px) {
    margin-right: auto!important;
    margin-left: auto!important;

    .nft__item .nft__item_wrap {
      // height: 200px;
    }
  }
`;

const NewNftCard = ({
  nft,
  account,
  index,
  className = "d-item mb-4 card-box-shadow-style",
  ethPrice
}) => {
  
  const navigate = useNavigate();
  const authorInfo = useSelector(selectors.authorInfoState).data;
  const accessToken = localStorage.getItem('accessToken');
  const [isLikedState, setLikedState] = useState(false);
  const [heartIconState, setHeartIconState] = useState(false);
  const [isLikeCounter, setLikeCounter] = useState(0);
  const [AuctionEndDate ,setAuctionEndDate] = useState() ;
  const [AuctionStartDate ,setAuctionStartDate] = useState() ;

  const header = { 'Authorization': `Bearer ${accessToken}` };

  const setInitialDate = ()=>{
    let end_date = nft && nft.auction_end_date && nft.auction_end_date != null ? nft.auction_end_date : 0 ;
    let start_date = nft && nft.auction_start_date && nft.auction_start_date != null ? nft.auction_start_date : 0 ;
    end_date = (end_date * 1000 - new Date().getTime()) > 0 ? end_date * 1000 - new Date().getTime() : 0 ;
    start_date = (start_date * 1000 - new Date().getTime()) > 0 ? start_date * 1000 - new Date().getTime() : 0 ;
    setAuctionEndDate(end_date) ;
    setAuctionStartDate(start_date) ;
  }

  useEffect(()=>{
    // console.log(AuctionEndDate,`AuctionEndDate${nft.assetId}`);
    const timer_duration_end = AuctionEndDate > 0 && setTimeout(()=> setAuctionEndDate(AuctionEndDate => (AuctionEndDate - 1000) >= 0 ? (AuctionEndDate - 1000) : 0) ,1000) ;
    const timer_duration_start = AuctionStartDate > 0 && setTimeout(()=> setAuctionStartDate(AuctionStartDate => (AuctionStartDate - 1000) >= 0 ? (AuctionStartDate - 1000) : 0) ,1000) ;
    return ()=> {
      clearTimeout(timer_duration_end) ;
      clearTimeout(timer_duration_start) ;
    }

  },[AuctionEndDate]);

  useEffect(()=>{
    window.addEventListener('focus', setInitialDate);
    return ()=>{
      window.removeEventListener('focus' , setInitialDate);
    }
  },[])

  useEffect(() => {
    if (account == nft.owner_of) {
      setHeartIconState(false) 
    } else {
      setHeartIconState(true)
    }
    setInitialDate();
    setLikeCounter(nft.favs && nft.favs.length)
  }, [nft, account]);

  useEffect(() => {
    if (nft && authorInfo) {
      const favs = nft.favs;
      const myFav = favs.filter((item) => (authorInfo && authorInfo.id) == (item.user && item.user.id));
      if (myFav.length > 0) {
        setLikedState(true)
      }
    }
  }, [authorInfo, nft])
  const get_remain_date_newTemplate =(remain_date)=>{
    // console.log(remain_date, nft.id) ;
    let remain_day = getReturnValues_days(remain_date) ;
    let remain_hour = getReturnValues_hours(remain_date) ;
    let remain_min = getReturnValues_minutes(remain_date) ;
    let remain_sec = getReturnValues_seconds(remain_date) ;
    if(remain_sec + remain_day + remain_hour + remain_min == 0) return '0' ;
    if (remain_day > 0) {
      if (remain_day == 1)
        return (remain_day) + ' day';
      else
        return (remain_day) + ' days';
    } else {
      return (remain_hour+':'+remain_min+':'+remain_sec) ;
    }    
  }
  const get_remain_date =(remain_date)=>{
    // console.log(remain_date, nft.id) ;
    let remain_day = getReturnValues_days(remain_date) ;
    let remain_hour = getReturnValues_hours(remain_date) ;
    let remain_min = getReturnValues_minutes(remain_date) ;
    let remain_sec = getReturnValues_seconds(remain_date) ;
    if (remain_day > 1 ) return `${remain_day} days` ;
    if (remain_hour > 1) return `${remain_hour} hours`;
    if (remain_min > 1 ) return `${remain_min} mins` ;
    return `${remain_sec} seconds` ;
  }
  const getReturnValues_days = (countDown) => {
    // calculate time left
        // console.log(Countdown,'Countdown');
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        return days ;
    
    };
  const getReturnValues_hours = (countDown) => {
    // calculate time left
    // console.log(countDown) ;
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return hours ;

  };

  const getReturnValues_minutes = (countDown) => {
      // calculate time left
      const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

      return minutes ;

  };
  const getReturnValues_seconds = (countDown) => {
      // calculate time left
      
      const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      return seconds ;
      
  };
  
  const moveToCollectionPage = (param) => {
    navigate(`/collection-detail/${param}`) ;
  }
  // const openItems =(id)=>{
  //   // console.log('id', id)
  //   navigate(`/ItemDetail/${id}`)
  //   localStorage.setItem('itemId', id);
  // }
  const openItems =(e,nfts ,id)=>{

    console.log() ;
    // e.preventDefault() ;
    // navigate(`/ItemDetail/${id}`)
    
    localStorage.setItem('itemId', id);
    // localStorage.setItem('itemurl' ,nfts.animation) ;
    // console.log('setitemobjurl' , nft.animation) ;
  }
  const usd_price_set=(num)=>{
    // console.log(use_price , num,'ddddddddddddd')
    let str = '' ;
    if(num > 1000) str = parseInt(num / 1000) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(0) ;
    return str;
  }
  const usd_price_set_usd=(num)=> {
    let str = '' ;
    if(num > 1000) str = parseFloat(parseInt(num / 100)/10) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(2) ;
    return str;
  }
  const calculate_k = (num)=>{
    let str = '' ;
    if(num > 1000) str = parseFloat(parseInt(num / 100)/10) + 'K' ;
    else str = num.toFixed(2) ;
    return str;
  }
  const handleLike = async () => {
    const postData = {
      id: nft.assetId
    }

    await Axios.post('/api/users/like', postData, { headers: header })
                .then((res) => {
                  setLikeCounter(res.data.msg === "Added this asset to like list." ? isLikeCounter + 1 : isLikeCounter - 1)
                  setLikedState(!isLikedState);
                })
                .catch((err) => {
                  Object.values(err).map(function(item) {
                    if (item.data && item.data.msg) {
                      // console.log(item.data.msg)
                    }
                  })
                });
  }  

  const heartIconStyle = {
    fontSize: 16,
    color: isLikedState ? '#f70dff' : '#d9d9d9', 
    marginTop: -4
  }

  const usd_price_set_eth = (num) => {
    let str = '';
    let res = (num / parseFloat(ethPrice)).toFixed(3);
    return res.toString();
  }
  
  return (
    <NFTCard className={className} index={index+1} style={{maxWidth:'350px'}}>
      <div className="nft__item m-0 nftcardpage" style={{ position: 'relative', display:'flex' , flexDirection:'column' , justifyContent:'space-between' ,paddingRight:'4px',paddingLeft:'4px',paddingTop:'0px',paddingBottom:'0px'}} >
          { 
            account && heartIconState ? 
              <div className="heartIconCard"  style={{ position: 'absolute', right: 12 }}>
                <FaHeart style={heartIconStyle} onClick={handleLike} />
                <span style={{ marginLeft: 5, fontSize: 14 }}>{isLikeCounter >= 1000 ? `${isLikeCounter / 1000}K` : isLikeCounter}</span>
              </div>
            : null
          }
          <a className="nftcardA" onClick={(e)=>openItems(e, nft ,nft.assetId)} href={`/ItemDetail/${nft.assetId}`} style={{height:'100%' }}>

            <div className="author_list_pp hoverauthor" style={{ width: 40, height: 40 ,marginTop:'6px' ,marginLeft:'6px'}} onClick={(e) => {moveToCollectionPage(nft.collection.link);e.preventDefault();}} >
                <span>
                    <img src={nft.collection.avatar ? nft.collection.avatar : "/img/collections/coll-1.jpg" } alt="" />
                    {
                        nft.owner_verified == '1' ? <i className="fa fa-check"></i> : ""
                    }
                </span>
                
            </div>
            <div className="nft__item_wrap" style={{marginTop:'3px'}}>
                <Outer>
                    <span>
                        <img
                            src={nft.image_preview ? (nft.image.slice(-3).toLowerCase() == "gif" ? nft.image:nft.image_preview) : nft.image}
                            className="nft__item_preview"
                            alt=""
                        />
                    </span>
                </Outer>
            </div>
  
            <div className="nft__item_info" style={(get_remain_date_newTemplate(AuctionEndDate) != '0' && nft.auction_start_date * 1000 <= new Date().getTime()) || (get_remain_date_newTemplate(AuctionStartDate) != '0' && nft.auction_start_date * 1000 > new Date().getTime()) ? {paddingRight:'16px',paddingLeft:'16px'}:{paddingRight:'16px',paddingLeft:'16px'}}>
                <span>
                <h4 style={{marginTop:'5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow:'ellipsis'}} >{nft.name}</h4>
                </span>
                {/* <CardDescription className="has_offers">
                {nft.description ? nft.description : ""}
                </CardDescription> */}
                {/* {console.log(nft , 'nft_detailpage')} */}

                {
                      nft && nft.saleType == 2  && nft.auction_end_process && nft.auction_end_process == true && (nft && nft.top_bid && nft.top_bid != "null") ?
                        <CardBottom >
                          <div style={{ width: 'max-content', minHeight: 28 }}>
                            <span style={{ fontSize:'11px', fontWeight: 'bold', color: '#f70dff' }}>
                              Auction ended
                            </span>
                          </div>
                          <div className="nItemSale" style={{ textAlign: 'right' }}>
                            <span style={{ fontSize:'11px', color: '#f70dff' }}>
                                winning bid
                              </span>
                              {nft && nft.top_bid && nft.top_bid != "null" && <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.top_bid/localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} />}
                              {nft && nft.top_bid && nft.top_bid != "null" ? <><div className="usd_color"><img style={{ width: 13, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" />{usd_price_set_eth(nft.top_bid)} (${usd_price_set_usd(nft.top_bid)})</div></> : <></>}
                              {nft && nft.top_bid && nft.top_bid != "null" && <></> } 
                          </div>
                        </CardBottom>  
                      :
                      nft && nft.saleType == 2  && nft.auction_end_date * 1000 >= new Date().getTime() ?
                      nft.auction_start_date * 1000 >= new Date().getTime() ?
                        <CardBottom >
                          <div style={{ width: 'max-content', marginBottom: '15px' }}>
                            {/* <br/> */}
                            <span className="mobile-margin" style={{ fontSize:'12px', fontWeight: 'bold', color: '#f70dff' }}>
                              {/* <br/> */}
                              Time to Start
                            </span>
                            <div className="nItemSale mt-2 mobile-margin" >
                              <span>
                              {get_remain_date_newTemplate(new Date().getTime() - nft.auction_start_date * 1000) != '0' && nft.saleType == 2 && nft.auction_start_date * 1000 <= new Date().getTime() && 
                                // <div className="NorTxt nftCardCounter" style={{paddingRight:'16px',paddingLeft:'16px'}}> 
                                    <> <div className="timeleft-txt">{get_remain_date_newTemplate(new Date().getTime() - nft.auction_start_date * 1000)}</div></> 
                                // </div>
                              }
                              {get_remain_date_newTemplate(new Date().getTime() - nft.auction_start_date * 1000) != '0' && nft.saleType == 2 && nft.auction_start_date * 1000 >= new Date().getTime()&& 
                                // <div className="NorTxt nftCardCounter" style={{paddingRight:'16px',paddingLeft:'16px'}}> 
                                <><div className="timeleft-txt">{get_remain_date_newTemplate(nft.auction_start_date * 1000 - new Date().getTime())}</div></>
                                // </div>
                              }
                              </span>
                            </div>
                            
                          </div>
                          <div   style={{ width: 'max-content' }}>
                              <span style={{ fontSize:'12px', color: '#f70dff', whiteSpace:'nowrap' }}>
                                {nft.auction_start_date * 1000 <= new Date().getTime() ? "Highest bid" : "Starting bid"}
                                
                              </span>
                              <div className="nItemSale bid-value mobile-margin" >
                                {nft && nft.top_bid && nft.top_bid != "null" ? <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.top_bid/localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> : <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.price/localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> }
                                {nft && nft.top_bid && nft.top_bid != "null" ? <><div className="usd_color"><img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" /> {`${usd_price_set_eth(nft.top_bid)} ($${usd_price_set_usd(nft.to_bid)})`} </div></> : <><div className="usd_color"><img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" /> {`${usd_price_set_eth(nft.price)} ($${usd_price_set_usd(nft.price)})`} </div></>}
                              </div>
                          </div>
                        </CardBottom>  
                        :
                        <CardBottom >
                          <div style={{ width: 'max-content', marginBottom: '15px' }}>
                            {/* <br/> */}
                            <span className="mobile-margin" style={{ fontSize:'12px', fontWeight: 'bold', color: '#f70dff' }}>
                              {/* <br/> */}
                              Time Left
                            </span>
                            <div className="nItemSale mt-2 mobile-margin" >
                              <span>
                              {get_remain_date_newTemplate(AuctionEndDate) != '0' && nft.saleType == 2 && nft.auction_start_date * 1000 <= new Date().getTime() && 
                                // <div className="NorTxt nftCardCounter" style={{paddingRight:'16px',paddingLeft:'16px'}}> 
                                    <> <div className="timeleft-txt">{get_remain_date_newTemplate(AuctionEndDate)}</div></> 
                                // </div>
                              }
                              </span>
                            </div>
                            
                          </div>
                          <div   style={{ width: 'max-content' }}>
                              <span style={{ fontSize:'12px', color: '#f70dff', whiteSpace:'nowrap' }}>
                                {nft.auction_start_date * 1000 <= new Date().getTime() ? "Highest bid" : "Starting bid"}
                                
                              </span>
                              <div className="nItemSale bid-value mobile-margin" >
                                {nft && nft.top_bid && nft.top_bid != "null" ? <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.top_bid/localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> : <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.price/localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> }
                                {nft && nft.top_bid && nft.top_bid != "null" ? <><div className="usd_color"><img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" /> {`${usd_price_set_eth(nft.top_bid)} ($${usd_price_set_usd(nft.to_bid)})`} </div></> : <><div className="usd_color"><img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" /> {`${usd_price_set_eth(nft.price)} ($${usd_price_set_usd(nft.price)})`} </div></>}
                              </div>
                          </div>
                        </CardBottom>
                      :
                      <CardBottom >
                        <div className="nItemSale" style={{ width: 'max-content', minHeight: 80 }}>
                            <span style={{ fontWeight: 'bold', color: '#f70dff', fontSize: '11px' }}>
                              {nft ? "Price" : null}
                            </span>
                            {nft && nft.saleType !=2 && nft.price && nft.price != "null" && nft.price > 0 ? <StyledStatistic style={{ margin: 0 }} value={usd_price_set(nft.price / localStorage.getItem('usdPrice'))}  prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> : <div style={{ fontSize: 12}}>{nft.on_sale ?"Free Item":"Not for sale" }</div>}
                            {nft && nft.saleType !=2 && nft.price && nft.price != "null"  && nft.price > 0  ? <><div className="usd_color"><img style={{ width: 13, height: 16, marginBottom: 5 }} src="/img/icons/ethIcon.png" />{usd_price_set_eth(nft.price)} (${usd_price_set_usd(nft.price)})</div></> :<></>}
                            {/* {nft && nft.on_sale ? <div style={{minHeight:'26px'}}></div>:<></>} */}
                        </div>
                        <div style={{ textAlign: 'right' , width: 'max-content', minHeight: 80, whiteSpace:'nowrap' }}>
                            <span style={{ fontSize:'11px', color: '#f70dff' }}>
                              {nft.auction_start_date * 1000 <= new Date().getTime() ? "Highest bid" : "Highest bid"}                         
                            </span>
                            <div className="nItemSale" >
                              {nft && nft.top_bid && nft.top_bid != "null" ? <><div className="usd_color"> - </div></> : <><div className="usd_color"> - </div></>}
                            </div>
                        </div>
                      </CardBottom>
                    }
                

                {/* <CardBottom >
                    <div style={{ width: 'max-content' }}>
                      {
                        nft.onSale ?
                        <span style={{ fontWeight: 'bold', color: '#f70dff' }}>
                        Buy Now
                        </span> : null
                      }
                    </div>
                    <div className="nItemSale" style={{ width: '50%', textAlign: 'right' }}>
                        {nft.price && nft.price != "null" ? <StyledStatistic className="nftCardStatistic" value={nft.price} precision={2} prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/VXL.png" />} /> : "Not for sale"}
                    </div>
                </CardBottom> */}
            </div>
          </a>
      </div>
  </NFTCard>
  );
};

export default memo(NewNftCard);
