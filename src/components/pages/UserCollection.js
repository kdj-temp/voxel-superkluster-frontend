import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "@reach/router";
import { FiInfo } from 'react-icons/fi';
import { FaMarsStrokeV } from "react-icons/fa";
import { Tooltip, Button, Tabs, Dropdown, Menu  } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

import useMetaMask from "../wallet-connect/metamask";
import * as selectors from '../../store/selectors';
import { Axios } from "../../core/axios";

import CollectionCard from '../components/CollectionCard';

const GlobalStyles = createGlobalStyle`
`;

const Div = styled.div`
    align-items: center;
    margin: 5px 0px;
`;

const CreateBtn = styled(Button)`
    margin:5px ;
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
const ImportBtn = styled(Button)`
    margin:5px ;
    width: 180px;
    height: 45px;
    color: white;
    background: grey;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid grey !important;
    border-radius: 8px;

    &:hover {
        color: white;
        background: grey;
        border: 1px solid grey !important ;
    }

    &:focus {
        color: white;
        background: grey;
        border: 1px solid grey !important;
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

const ActionMenu = styled(Menu)`
    border-radius: 3px;
    padding: 15px 20px;
    box-shadow: 8px 8px 40px 0px rgb(0 0 0 / 10%);
    width: 340px;

    & li.ant-dropdown-menu-item {
        padding: 8px 0px;
    }

    & h5 {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 600;
    }

    & div.menu-text {    
        text-overflow: ellipsis;
        width: 200px;
        overflow: hidden;
    }
`;

const ActionMenuIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #EEEEEE;
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

const UserCollection = function ({colormodesettle}) {
    const { data } = useSelector(selectors.accessToken);
    const navigate = useNavigate();

    const [isUserCollections, setUserCollections] = useState([]);

    useEffect(() => {
        if(data) {
            getCollections()
        }
    }, [data])

    const getCollections = async () => {
        const header = { 'Authorization': `Bearer ${data}` }
        const result = await Axios.get("/api/users/collections", { headers: header });
        setUserCollections(result.data.data)
    }

    const moveToCreaetCollectionPage = () => {
        navigate("/create-collection");
    }

    const moveToImportCollectionPage = () => {
        navigate("/import-collections");
    }

    const tooltipText = <div className="p-3 text-center" style={{ maxWidth: 300 }}><span>Collections can be created either directly on OpenSea or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to OpenSea. <a href="#" target="_blank">Learn more about creating NFTs for free on SuperKluster</a></span></div>;
    
    const iconBtnStyle = {
        cursor: "pointer", 
        fontSize: 18, 
        margin: '0px 3px 3px'
    }

    const actionMenuStyle = {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '700',
        fontSize: '14px'
    }
    
    const ActionMenuOverlay = () => {
        return (
        <ActionMenu>
            <Menu.Item key={1}>
                <div onClick={moveToImportCollectionPage} style={actionMenuStyle}>
                    <ActionMenuIcon>
                    <FaMarsStrokeV />
                    </ActionMenuIcon>
                    <span className="importColor">Import an existing smart contract</span>
                </div>
            </Menu.Item>
        </ActionMenu>
        );
    }
    useEffect(()=>{
        localStorage.setItem('searchValue','') ;
    
      },[])
    return (
        <>
            <div>
                <GlobalStyles />

                <section className='custom-container'>
                    <Div className="row">
                        <Div>
                            <h2 style={{fontFamily:'Inter'}}>My Collections</h2>
                            <Div>
                                <span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
                                {/* <Tooltip placement="top" title={tooltipText}>
                                    <FiInfo style={iconBtnStyle} />
                                </Tooltip> */}
                            </Div>
                        </Div>
                        <div>
                            <CreateBtn onClick={moveToCreaetCollectionPage}>Create collection</CreateBtn>
                            <ImportBtn onClick={moveToImportCollectionPage}>Import collection</ImportBtn>
                            {/* <Dropdown overlay={ActionMenuOverlay} overlayStyle={{ paddingTop: '12px' }} placement={"bottomRight"} trigger={["click"]}>
                                <IconBtn icon={<MoreOutlined />} size="large" />
                            </Dropdown> */}
                        </div>
                    </Div>
                    <div className="row" >
                        {/* {console.log(isUserCollections,'isUserCollections')}  */}
                        {
                            isUserCollections.map((collection) => (
                                <CollectionCard 
                                    key={collection.id}
                                    data={[collection]}
                                    label="user"
                                />
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    );
}
export default memo(UserCollection);