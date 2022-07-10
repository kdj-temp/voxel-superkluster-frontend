import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";

import { Axios } from "../../../../core/axios";
import UserTopSeller from './UserTopSeller';

const TopSellerPad = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, auto);

    @media (max-width: 1620px) {
        grid-template-columns: repeat(2, auto);
    }

    @media (max-width: 1100px) {
        grid-template-columns: repeat(1, auto);
    }
`

const AuthorList = () => {

    const [isTopSellers, setTopSellers] = useState([]);

    useEffect(() => {
        getTopSellers();
    }, [])

    const getTopSellers = async () => {
        const authors = await Axios.post("/api/users/top-sellers");
        setTopSellers(authors.data.data);
        localStorage.setItem('usePrice',authors.data.usdPrice) ;
    }

    return (
        <TopSellerPad>
            { isTopSellers && isTopSellers.map((author, index) => (
                    <UserTopSeller user={author} key = {index} number={index + 1}/>
            ))}
        </TopSellerPad>
    );
};

export default memo(AuthorList);