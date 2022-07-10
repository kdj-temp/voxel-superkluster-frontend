import React, { memo, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import { Statistic } from "antd";
import { Oval } from  'react-loader-spinner'
// import Clock from "./Clock";
import { useNavigate} from "@reach/router";
// import api from "../../core/api";
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-loading-skeleton/dist/skeleton.css'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { currencyLogo } from "../../store/utils";

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

const NFTCard = styled.div`

  padding: 0!important;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all ease 400ms;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12);
  }

  @media (min-width: 1200px) {
    width: calc(20% - 20px);

    .nft__item .nft__item_wrap {
      // height: 180px;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    width: calc(25% - 20px);

    .nft__item .nft__item_wrap {
      // height: 160px;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    width: calc(33.3333% - 20px);

    .nft__item .nft__item_wrap {
      // height: 170px;
    }
  }

  @media (min-width: 360px) and (max-width: 767px) {
    width: calc(50% - 20px);

    .nft__item .nft__item_wrap {
      // height: 190px;
    }
  }

  @media (min-width: 375px) and (max-width: 479px) {
    width: calc(50% - 20px);
    margin-right: auto!important;

    .nft__item .nft__item_wrap {
      // height: 250px;
    }
  }

  @media (max-width: 374px) {
    width: calc(90% - 20px);
    margin-right: auto!important;

    .nft__item .nft__item_wrap {
      // height: 200px;
    }
  }
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 10px 0px 18px 0px;
  align-items: center;
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
      color: #727272!important;
    }
  }
`;

const SkeletonCard = () => {
  return (
    <div className="nft__item m-0">
      <div className="icontype">
        <i className="fa fa-bookmark"></i>
      </div>
      <div className="author_list_pp" style={{ width: 40, height: 40, zIndex: 2 }}>
        <span>
            <SkeletonTheme color="#eee" highlightColor="#ccc">
              <Skeleton height={40} width ={40} circle={true} />
            </SkeletonTheme>
        </span>
      </div>
      <div className="nft__item_wrap">
        <Outer>
          <span>
            <SkeletonTheme color="#eee" highlightColor="#ccc">
              <Skeleton style={{ width: '100%', height: 200 }} />
            </SkeletonTheme>
          </span>
        </Outer>
      </div>
      <div className="nft__item_info">
        <span>
          <h4 style={{marginTop:'5px'}} >
            <SkeletonTheme color="#eee" highlightColor="#ccc">
              <Skeleton />
            </SkeletonTheme>
          </h4>
        </span>
        <div className="has_offers" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: 5 }}>
          <SkeletonTheme color="#eee" highlightColor="#ccc">
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        <div className="nft__item_action">
          <span >
            <SkeletonTheme color="#eee" highlightColor="#ccc">
              <Skeleton count={1} />
            </SkeletonTheme>
          </span>
        </div>
        <div className="nft__item_like">
          <span></span>
        </div>
      </div>
    </div>
  )
}

const DetailNftCard = ({
  nft,
  className = "d-item mb-4 nftcards",
  loadingState
}) => {
  
  const navigate = useNavigate();

  const [loadImgStatus, setLoadImgStatus] = useState(false);

  const navigateTo = (link) => {
    navigate(link);
  };
  
  const openItems =(id)=>{
    navigate(`/ItemDetail/${id}`)
    localStorage.setItem('itemId', id);
  }
  
  return (
    <Fragment>
      {/* {NftData.map((nftValue) => ( */}

        <NFTCard className={className} onClick={()=>openItems(nft.asset.id)} style={{maxWidth:'350px'}}>
          {loadingState && <SkeletonCard />}
          {
            !loadingState &&
            <div className="nft__item m-0">
            
              <div className="icontype">
                <i className="fa fa-bookmark"></i>
              </div>
          
            
              {/* <div className="de_countdown">
                <Clock deadline='dedline' time={nft.created_at} />
              </div> */}
            
              <div className="author_list_pp" style={{ width: 40, height: 40 }}>
                <span>
                    <LazyLoadImage effect="opacity" src={nft && nft.collection.avatar ? nft.collection.avatar : "/img/profile.png" } afterLoad={() => setLoadImgStatus(true)} alt="" />
                    <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <LazyLoadImage
                      effect="opacity"
                      src={nft.asset.image ? nft.asset.image : "/img/collections/coll-item-1.jpg"}
                      className="nft__item_preview"
                      alt=""
                    />
                  </span>
                </Outer>
              </div>
            
                {/* <div className="de_countdown">
                  <Clock deadline='deadline' />
                </div> */}
              
              <div className="nft__item_info">
                <span onClick={() => navigateTo(``)}>
                  <h4 style={{marginTop:'5px'}} >{nft.asset.name ? nft.asset.name : "Unnamed"}</h4>
                </span>
                
                <CardDescription className="has_offers">
                  {nft.asset.description ? nft.asset.description : ""}
                </CardDescription>

                <CardBottom >
                  <div style={{ width: 'max-content' }}>
                    <span style={{ fontWeight: 'bold', color: '#f70dff' }}>
                      Buy Now
                    </span>
                  </div>
                  <div style={{ width: '50%', textAlign: 'right' }}>
                    {nft.price ? <StyledStatistic className="nftCardStatistic" value={nft.price} precision={2} prefix={<img style={{ width: 16, height: 16, marginBottom: 5 }} src={currencyLogo(nft? nft.chain_id : null)} />} /> : "Not for sale"}
                  </div>
                </CardBottom>
              </div>
            </div>
          }
          
        </NFTCard>
       
    </Fragment>
  );
};

export default memo(DetailNftCard);
