import React, { memo, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "@reach/router";
import { FiInfo } from 'react-icons/fi';
import { Tooltip, Button  } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

import useMetaMask from "../wallet-connect/metamask";
import * as selectors from "../../store/selectors";
import { Axios } from "../../core/axios";

import NftCard from '../components/NftCard';

const GlobalStyles = createGlobalStyle`
`;

const Div = styled.div`
    align-items: center;
    margin: 5px 0px;
`;

const CreateBtn = styled(Button)`
    width: 180px;
    height: 45px;
    color: white;
    background: #f70dff;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #f70dff;
    border-radius: 8px;

    &:hover {
        color: white;
        background: #f70dff;
        border: 1px solid #f70dff;
    }

    &:focus {
        color: white;
        background: #f70dff;
        border: 1px solid #f70dff;
    }
`;

const IconBtn = styled(Button)`
    &.ant-btn-icon-only.ant-btn-lg {
        width: 45px;
        height: 45px;
        border-radius: 8px;
        margin: 0px 10px;
    }

    &:hover {
        color: rgba(0, 0, 0, 0.85);
        box-shadow: 0 0 12px rgba(205, 205, 205, 0.7);
        border: 1px solid #d9d9d9;
    }

    &:focus {
        color: rgba(0, 0, 0, 0.85);
        border: 1px solid #d9d9d9;
    }
`;

const Collection = function () {
    const { account } = useMetaMask();
    const navigate = useNavigate();

    const moveToCreaetCollectionPage = () => {
        navigate("/create-collection");
    }

    const moveToItemPage = () => {
        navigate("/collection-item");
    }

    const tooltipText = <div className="p-3 text-center" style={{ maxWidth: 300 }}><span>Collections can be created either directly on SuperKluster or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to SuperKluster. <a href="#" target="_blank">Learn more about creating NFTs for free on OpenSea</a></span></div>;
    const iconBtnStyle = {
        cursor: "pointer", 
        fontSize: 18, 
        margin: '0px 3px 3px'
    }

    return (
        <div>
            <GlobalStyles />

            <section className='custom-container'>
                <Div className="row">
                    <Div>
                        <h2 style={{fontFamily:'Inter'}}>My Collections</h2>
                        <Div>
                            <span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
                            <Tooltip placement="top" title={tooltipText}>
                                <FiInfo style={iconBtnStyle} />
                            </Tooltip>
                        </Div>
                    </Div>
                    <Div>
                        <CreateBtn onClick={moveToCreaetCollectionPage}>Create a collection</CreateBtn>
                        <IconBtn  icon={<MoreOutlined />} size="large" />
                    </Div>
                </Div>
                <Div className="row">
                    <Div className="mt-3 mb-3">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4" onClick={moveToItemPage}>
                            <div className="card nftCard">
                                <img className="card-img-top" src="/img/background/1.jpg" alt="Bologna" />
                                <div className="card-body text-center">
                                    <h4 className="card-title">Collection id</h4>
                                    <h6 className="card-subtitle mb-2 ">by you</h6>
                                    <p className="card-text">Explore Collection Id collection</p>
                                    <span>Collection num</span>
                                    {/* <a href="#" className="card-link">Book a Trip</a> */}
                                </div>
                            </div>
                        </div>
                    </Div>
                </Div>
            </section>
        </div>
    );
}
export default memo(Collection);