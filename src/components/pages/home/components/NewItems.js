import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import { Axios } from "../../../../core/axios";
import NftCard from '../../../components/common/NFTCard';

const NewItemsPad = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: 1fr 0 0 0 0 0;
    overflow: hidden;

    @media (max-width: 1900px) {
        grid-template-columns: repeat(4, auto);
    }

    @media (max-width: 1540px) {
        grid-template-columns: repeat(3, auto);
    }

    @media (max-width: 1180px) {
        grid-template-columns: repeat(2, auto);
    }

    @media (max-width: 820px) {
        grid-template-columns: repeat(1, auto);
    }
`

const NewItems = () => {

    const [newItems, setNewItems] = useState([]);

    const getNewItems = async () => {
        const newItems = await Axios.post('/api/supply-assets/new-items');
        setNewItems(newItems.data.data);
    }

    useEffect(() => {
        getNewItems();
    }, [])

    return (
        <NewItemsPad>
            {
                newItems && newItems.map((item, index) => (
                    <NftCard key={index} nft={item} />
                ))
            }
        </NewItemsPad>
    )
}

export default NewItems;