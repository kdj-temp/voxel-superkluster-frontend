import React, { memo, useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import { Statistic } from "antd";
import { FaHeart , FaDollarSign, FaCheck } from "react-icons/fa";
import { Tooltip } from 'antd';
import { ReactComponent as EthIcon } from "../../assets/svg/eth.svg";

import { Axios } from "../../core/axios";
import * as selectors from '../../store/selectors';
// import Clock from "./Clock";
import { useNavigate} from "@reach/router";
// import api from "../../core/api";
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-loading-skeleton/dist/skeleton.css'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { currencyName, currencyLogo } from '../../store/utils';
import { usePriceMode } from "../../contexts/PriceModeContext"

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
  transition: all ease 400ms;

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
    width: calc(50% - 15px);
    margin-right: 0!important;
    .nft__item .nft__item_wrap {
      // height: 190px;
    }
  }

  @media (min-width: 375px) and (max-width: 479px) {
    width: calc(50% - 15px);
    margin-right: 0!important;

    .nft__item .nft__item_wrap {
      // height: 150px;
    }
  }

  @media (max-width: 374px) {
    width: calc(100% - 20px);
    margin-right: auto!important;

    .nft__item .nft__item_wrap {
      // height: 200px;
    }
  }
`;

const EmptyCard = () => {

  return (
    <Fragment>
        <NFTCard style={{minWidth:'200px', flex:'1 1 auto', maxWidth:'350px'}} />       
    </Fragment>
  );
};

export default memo(EmptyCard);
