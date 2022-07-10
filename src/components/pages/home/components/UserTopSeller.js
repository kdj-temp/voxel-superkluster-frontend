/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from "styled-components";

const calculate_k = (num)=>{
    let str = '' ;
    if(num > 1000) str = (parseInt(num / 1000)) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(0) ;
    return str;
  }
const calculate_k_usd=(num)=> {
    let str = '' ;
    if(num > 1000) str = parseFloat(parseInt(num / 100)/10) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(2) ;
    return str;
}

const AuthorItem = styled.div`
    width : 500px;
    height: 90px;
    margin: 7.5px 7.5px;
    padding: 15px 15px;
    border: 1px solid ${props => props.theme.cardBorderColor};
    border-radius: 12px;
    background: ${props => props.theme.AuthorItemBgColor};
    display: flex;
    align-items: center;
    cursor: pointer;
    max-width: 100%;
`

const Number = styled.span`
    font-family: "inter";
    font-size: 17px;
    font-weight: 400;
    line-height: 34px;
    font-style: normal;
    color: ${props => props.theme.primaryColor};
    margin-left: 5px;
`

const AuthorLogo = styled.div`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    overflow: hidden;
    margin: 0px 20px;
`

const AuthorInfo = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const AuthorName = styled.div`
    font-family: "inter";
    font-size: 17px;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    color: ${props => props.theme.primaryColor};
`

const VolumeInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const FloorPrice = styled.div`
    margin-right: 20px;
    display: flex;
    flex-wrap: nowrap;
`

const Volume = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

const Title = styled.div`
    font-family: "inter";
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    text-align: left;
    color: ${props => props.theme.secondaryColor};
`

const Value = styled.div`
    font-family: "inter";
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    text-align: left;
    color: ${props => props.theme.primaryColor};
`

const UserTopSeller = ({ user, number }) => {

    return (
        <div>
            <a href={`/author/${user.sellerAddress}`}>
                <AuthorItem>
                        <Number>{number}.</Number>
                        <AuthorLogo>
                            <LazyLoadImage src={user && user.sellerAvatar ? user.sellerAvatar : '/img/misc/avatar-1.png'} alt="" width='109%' height='100%'/>
                        </AuthorLogo>
                        <AuthorInfo>
                            <AuthorName>{user && user.sellerName ? user.sellerName : "unnamed"}</AuthorName>
                            <VolumeInfo>
                                <FloorPrice>
                                    <Title>Floor Price: &nbsp;</Title>
                                    <Value>72ETH</Value>
                                </FloorPrice>
                                <Volume>
                                    <Title>Volume: &nbsp;</Title>
                                    <Value>2,200ETH</Value>
                                </Volume>
                            </VolumeInfo>
                        </AuthorInfo>
                </AuthorItem>
            </a>
        </div>
    );
};

export default memo(UserTopSeller);