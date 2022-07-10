import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";

import { Axios } from "../../../../core/axios";
import CollectionCard from "../../../components/common/CollectionCard";

const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 1200 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1199, min: 768 },
      items: 3
    },
    smallTablet: {
      breakpoint: { max: 767, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const HotCollections = () => {

    const [hotCollections, setHotCollections] = useState([]);

    const getHotCollections = async () => {
        const res = await Axios.post("/api/collections/hot-collections");
        setHotCollections(res.data.data);
    }

    useEffect(() => {
        getHotCollections();
    }, [])

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
        </div>
    )

    return (
        <div>
            <Carousel responsive={responsive}>
                {
                    hotCollections && hotCollections.map((collection, index) => (
                        <CollectionCard key={index} collection={collection} />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default HotCollections;