import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { Table } from 'antd';
import styled from 'styled-components';
import { Link } from "@reach/router";

import { Axios } from "../../core/axios";

const FilterSection = styled.section`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const ItemContent = styled.div`
    flex: 1;
    border: 1px solid rgb(229, 232, 235);
    margin: 0 10px;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    &:hover {
        box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
        transition: all 0.2s ease 0s;
    }
`

const TabButton = styled.button`
  color: black;
  background: #f6f6f6;
  border-color: #f6f6f6;
  border-radius: 5px;
  font-weight: bold;
` ;
const ColumeGroup = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer
`
const DescriptionDiv = styled.div`
    
    font-weight: 400;
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const Activity = ({ collectionId }) => {
  const accessToken = localStorage.getItem('accessToken');
  const header = { 'Authorization': `Bearer ${accessToken}` };
  const navigate = useNavigate();
  const [listValue, setListValue] = useState('');
  const [saleValue, setSaleValue] = useState('')
  const [bidValue, setBidValue] = useState('')
  const [likeValue, setLikeValue] = useState('')
  const [activityData, setActivityData] = useState(null);
  const [timeSheet, setTimeSheet] = useState('');
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (pageNum) => {
    ActivityDataFunc(pageNum);
  }

  const ActivityDataFunc = async (pageNum)=>{
    setCurrentPage(pageNum);
    if (listValue || saleValue || bidValue || likeValue) {
      let res;
      let filterTypes = [];
      if(listValue == 'filterTypes') filterTypes.push('list');
      if(saleValue == 'filterTypes') filterTypes.push('sale');
      if(bidValue == 'filterTypes') filterTypes.push('bid');
      let filterOption = {
        filterTypes:filterTypes
      };
      let data = {
        collection: collectionId,
        per_page: 20,
        page: pageNum,
        search: filterOption
      };
      if(!accessToken) res = await Axios.post(`api/activity/get-history`, data);
      else res = await Axios.post(`api/activity/get-user-history`, data, {headers:header});
      
      setActivityData(res.data.data)
      localStorage.setItem('usdPrice',res.data.usdPrice) ;
      setTotal(res.data.meta.total);
      // console.log(res.data.data,'everycalls');
  } else {
    let data = {
      collection: collectionId,
      per_page: 20,
      page: pageNum
    };
    let res;
    if(!accessToken) res = await Axios.post(`api/activity/get-history`, data);
    else res = await Axios.post(`api/activity/get-user-history`, data, {headers:header});
    setActivityData(res.data.data) ;
    setTotal(res.data.meta.total);
    localStorage.setItem('usdPrice',res.data.usdPrice) ;

    // console.log(res.data.data,'everycalls-bid');

  }
  }

  useEffect( () => {
    ActivityDataFunc(1) ;
    
  }, [listValue, saleValue, bidValue, likeValue, collectionId])

  const handleMoveDetailitem =(id)=>{
    navigate(`/ItemDetail/${id}`)
    localStorage.setItem('itemId', id);
  }

  const ItemColumn = ({content}) => {
    return (
      <ColumeGroup onClick={() => handleMoveDetailitem(content.id)}>
        <div className="author_list_pp" style={{ width: 40, height: 40, position:'relative' }}>
          <span>
              <img effect="opacity" src={content && content.image ? content.image : "/img/profile.png" } alt="avatar" />
          </span>
        </div>
        <DescriptionDiv style={{ marginLeft: 20 }}>{content.name}</DescriptionDiv>
      </ColumeGroup>
    )
  }

  const actionTimeCheck =(content)=>{
    let endTime ;
    if(content.on_sale ==1 && content.sale_type == 1) {
      endTime = content.sale_end_date ;
    }
    if(content.on_sale ==1 && content.sale_type == 2) {
      endTime = content.auction_end_date ;
    }
    let current_time = new Date().getTime() ;
    // console.log(current_time , endTime + 5 + ) ;
    return (current_time >= (endTime)*1000 && current_time <= (endTime+7 * 24 * 3600)*1000) ;
    return true ;
  }
  const ItemColumnAction = ({content}) => {
    return (
      <>
      {
        content && content.on_sale ==1 && (actionTimeCheck(content)) &&
      <TabButton size="small" className='active'>
        action
      </TabButton>

      }
      </>
    )
  }
  const usd_price_set=(num)=>{
    // console.log(use_price , num,'ddddddddddddd')
    let str = '' ;
    if(num > 1000) str = parseInt(num / 1000) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(0) ;
    return str;
  }
  const usdPrice_num_usd=(num)=> {
    let str = '' ;
    if(num > 1000) str = parseFloat(parseInt(num / 100)/10) + 'K' ;
    if(num > 1000000) str = parseFloat(parseInt(num / 10000)/100) + 'M' ;
    if(num < 1000) str = num.toFixed(2) ;
    return str;
  }
  const TimeView = ({ time }) => {
    // console.log(time * 1000 ,'current',new Date().getTime() ,(new Date().getTime() - time * 1000)/3600/24/1000);
      // const today = new Date();
      const calcLeft = Math.floor(new Date().getTime() - time * 1000);
      const days = parseInt(calcLeft / (3600 * 24 * 1000 )) ;
      const hours = parseInt(calcLeft / (3600 * 1000)) ;
      const mins = parseInt(calcLeft / (60  * 1000)) ;
      // console.log(days , hours , mins);
      if (days >= 1) {
        if (days === 1) {
            // setTimeSheet(`${days} day`)
            return <span style={{whiteSpace:'nowrap'}}>{`${days} day` + ' ' + 'ago'}</span>
        } else {
            // setTimeSheet(`${days} days`)
            return <span style={{whiteSpace:'nowrap'}}>{`${days} days` + ' ' + 'ago'}</span>
        }
      } else if (hours < 24 && hours >= 1) {
          if (hours === 1) {
            // setTimeSheet(`${hours} hour`)
            return <span style={{whiteSpace:'nowrap'}}>{`${hours} hour` + ' ' + 'ago'}</span>
          } else {
            // setTimeSheet(`${hours} hours`)
            return <span style={{whiteSpace:'nowrap'}}>{`${hours} hours` + ' ' + 'ago'}</span>
          }
      } else if (mins < 60 && mins >= 1) {
          if (mins === 1) 
              return <span style={{whiteSpace:'nowrap'}}>{`${mins} min` + ' ' + 'ago'}</span>
          else return <span style={{whiteSpace:'nowrap'}}>{`${mins} mins` + ' ' + 'ago'}</span>
      }

      // return <span>{timeSheet + ' ' + 'ago'}</span>
  }

  const columns = [
   
    {
      title: '',
      dataIndex: "activity",
      render: activity => <DescriptionDiv><i className="fa fa-shopping-cart" aria-hidden="true">&nbsp;&nbsp;<span style={{fontWeight:'300',font:'-webkit-small-control'}}>{activity}</span></i></DescriptionDiv>
    },
    {
      title: 'Item',
      dataIndex: "asset",
      render: content => <ItemColumn content={content}/>
    },
    {
      title: 'Price',
      dataIndex: [],
      render: content => <><div style={{textAlign:'left' ,fontWeight:'bold', whiteSpace:'nowrap'}}><img style={{ width: 16, height: 16, marginBottom: 5 }} src="/img/VXL.png" />&nbsp;{content.price ? usd_price_set(content.price / localStorage.getItem('usdPrice')) : (content.other_price? usd_price_set(content.other_price / localStorage.getItem('usdPrice')):0)}</div><DescriptionDiv style={{textAlign:'left', marginTop:'5px'}}>${content.price ? usdPrice_num_usd(content.price) : (content.other_price? usdPrice_num_usd(content.other_price):0)}</DescriptionDiv></>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'From',
      dataIndex: 'from',
      
      // render: from =>  from.username ? <a target="_brank" href={`https://rinkeby.etherscan.io/address/${from.address}`}>{from.username}</a> : (from.address ? <a target="_brank" href={`https://rinkeby.etherscan.io/address/${from.address}`}>{`${from.address.slice(0, 10)}...`}</a> : <>---</>)
      render: from =>  from.username ? <Link to={`/author/${from.address}`} style={{whiteSpace:'nowrap'}}>{from.username}</Link> : (from.address ? <a target="_brank" href={`https://etherscan.io/address/${from.address}`}>{`${from.address.slice(0, 10)}...`}</a> : <>---</>)
    },
    {
      title: 'To',
      dataIndex: 'to',
      
      // render: to => to.username ? <a target="_brank" href={`https://rinkeby.etherscan.io/address/${to.address}`}>{to.username}</a>: (to.address ? <a target="_brank" href={`https://rinkeby.etherscan.io/address/${to.address}`}>{`${to.address.slice(0, 10)}...`}</a>: <>---</>)
      render: to => to.username ? <Link to={`/author/${to.address}`} style={{whiteSpace:'nowrap'}}>{to.username}</Link>: (to.address ? <a target="_brank" href={`https://etherscan.io/address/${to.address}`}>{`${to.address.slice(0, 5)}...`}</a>: <>---</>)
    },
    {
        title: 'Time',
        dataIndex: 'create_date',
        render: time => <TimeView time={time}/>
        // render: (time,tx) =>  tx.tx_hash ? <a target="_brank" href={`https://rinkeby.etherscan.io/tx/${tx.tx_hash}`}><TimeView time={time}/></a> : <TimeView time={time}/>
    },
    {
        title: 'Txn Hash',
        dataIndex: 'tx_hash',
        render: tx => <span>{tx ?  <a target="_brank" href={`https://etherscan.io/tx/${tx}`}>{tx.slice(0, 5)}...</a> : '---'}</span>
    },
    // {
    //   title: 'Action',
    //   dataIndex: "asset",
    //   render: activity => <ItemColumnAction content={activity}/> 
    // }
  ];

  const activeStyle = {
    background: '#f60cfe',
    fontWeight: 600,
    color: 'white'
  }

  // const handleFilterAction = (evt) => {
  //   const value = evt.target.id;
  //   if(listValue) {
  //     setListValue('');
  //     setSaleValue('');
  //     setBidValue('');
  //     setLikeValue('');
  //   }else {
  //     setListValue('filterTypes');
  //     setSaleValue('filterTypes');
  //     setBidValue('filterTypes');
  //     setLikeValue('filterTypes');
  //   }
  // }
  const handleFilterAction = (evt) => {
    const value = evt.target.id;
    if (value === 'listing') {
        if (listValue) setListValue('')
        else setListValue('filterTypes')
    } else if (value === 'sale') {
        if (saleValue) setSaleValue('')
        else setSaleValue('filterTypes')
    } else if (value === 'bid') {
        if (bidValue) setBidValue('')
        else setBidValue('filterTypes')
    } else {
        if (likeValue) setLikeValue('')
        else setLikeValue('filterTypes')
    }
  }
  // http://3.229.85.229:3001/api/collections/activities/1?search[listing][0]=list&search[sale][1]=sale&search[][2]=bid&search[like][3]=likes&per_page=20&page=1
  // http://3.229.85.229:3001/api/collections/activities/9?search[filterTypes][0]=list&search[filterTypes][1]=sale&search[filterTypes][2]=bid&search[filterTypes][3]=likes&per_page=20&page=1
  return (
    <div>
      <FilterSection>
        <ItemContent style={listValue ? activeStyle : null} id='listing' onClick={handleFilterAction}>Listings</ItemContent>
        <ItemContent style={saleValue ? activeStyle : null} id='sale' onClick={handleFilterAction}>Sales</ItemContent>
        <ItemContent style={bidValue ? activeStyle : null} id='bid' onClick={handleFilterAction}>Bids</ItemContent>
        {/* <ItemContent style={likeValue ? activeStyle : null} id='like' onClick={handleFilterAction}>Likes</ItemContent> */}
      </FilterSection>
      <section style={{ padding: '50px 20px' }}>
        <div className='row'>
          <div className='col-lg-12'>
            <Table columns={columns} style={{ overflowX: 'auto' }} dataSource={activityData} 
              pagination = {{
                total: total, 
                defaultPageSize: 20, 
                defaultCurrent: 1, 
                pageSizeOptions: [20], 
                onChange: handlePageChange, 
                showSizeChanger: false, 
                current: currentPage
            }}/>
          </div>
        </div>
      </section>
    </div>
)};

export default memo(Activity);