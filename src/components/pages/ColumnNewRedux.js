import React, { memo, useEffect, useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { Pagination } from 'antd';

import * as selectors from "../../store/selectors";
import * as actions from "../../store/actions/thunks";
import NftCard from "./NftCard";

const NoDataDiv = styled.div`
  margin: 20px 0px;
  color: grey;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const ColumnNewRedux = ({ filterData }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectors.nftDetailState).data;
  const [tempArr,setTempArr]= useState([]);
  const [isTotalNum, setTotalNum]=useState(1);

  useEffect(() => {
    if (data) {
      // console.log("data.data: ", data.data)
      setTempArr(data.data)
      if (data.meta) {
        // console.log("data.meta: ", data.meta)
        setTotalNum(data.meta.total)
      }
    }
  }, [data]);

  useEffect(() => {
    
    dispatch(actions.fetchNftDetail(1, filterData)) ;
    
  }, [dispatch, filterData]);

  const onChange = (pageNumber) => {
    dispatch(actions.fetchNftDetail(pageNumber, filterData));
    // localStorage.setItem('isSearchKey' ,'0') ;
  }

  const onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
  }

  return (
    <div className="row" style={{ padding: 10 }}>
      { tempArr && tempArr.length ?
          tempArr.map((nft, index) => (
            <NftCard
              nft={nft}
              key={index}
            />
          )) : <NoDataDiv>No Data</NoDataDiv>
      }
      <div className="spacer-single"></div>
      <div className="text-center">
        <Pagination showQuickJumper defaultCurrent={1} total={isTotalNum} defaultPageSize={15} pageSizeOptions={[15, 25]} onChange={onChange} onShowSizeChange={onShowSizeChange} />
      </div>
    </div>
  );
};

export default memo(ColumnNewRedux);
