import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import Select from 'react-select'
import { Table, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import * as actions from "../../store/actions/thunks";
import * as selectors from '../../store/selectors';

const GlobalStyles = createGlobalStyle`
`;

const FilterBar = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    margin: 0px auto;

    @media (max-width: 768px) {
        width: 100%
    }
    
    @media (max-width: 480px) {
        display: block;
    }
`;

const Div = styled.div`
    width: calc(50% - 20px);
    margin: 0px 10px 0px;

    @media (max-width: 480px) {
        width: calc(100% - 20px);
    }
`;

const StyledSelect = styled(Select)`
    width: 100%;
`;

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#727272",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#ddd",
    }
  }),
  menu: base => ({
    ...base,
    background: "#fff !important",
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  }),
  control: (base, state) => ({
    ...base,
    padding: 2
  })
};

const RankingRedux = () => {

  const { Option } = Select;

  const dispatch = useDispatch();

  const category = useSelector(selectors.categoryState).data;

  useEffect(() => {
    dispatch(actions.fetchNftCategory())
  }, [dispatch]);

  const handleCategoryChange = (value) => {
    // console.log(value)
  }

  const handleCategorySearch = (val) => {
      // console.log('search:', val);
  }

  const handleDateChange = (value) => {
      // console.log(value)
  }

  const handleDateSearch = (val) => {
      // console.log('search:', val);
  }

  const handleTableSort = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  }

  const options = [
    { id: 1, value: 'Last 7 days', label: 'Last 7 days' },
    { id: 2, value: 'Last 24 hours', label: 'Last 24 hours' },
    { id: 3, value: 'Last 30 days', label: 'Last 30 days' },
    { id: 4, value: 'All time', label: 'All time' }
  ];
  
  const columns = [
    {
      title: 'Collection',
      dataIndex: 'collection',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      sorter: {
        compare: (a, b) => a.volume - b.volume,
        multiple: 1,
      },
    },
    {
      title: '24h %',
      dataIndex: 'hours',
      render: content => <span style={{ color: '#14c114' }}>{content}</span>,
    },
    {
      title: '7d %',
      dataIndex: 'sevenD',
      render: content => <span style={{ color: 'red'}}>{content}</span>,
    },
    {
      title: 'Floor Price',
      dataIndex: 'floor_price',
    },
    {
      title: 'Owners',
      dataIndex: 'owner',
    },
    {
      title: 'Items',
      dataIndex: 'item',
    },
  ];
  
  const data = [
    {
      key: '1',
      hoursStatus: true,
      sevenDStatus: true,
      collection: 'Voxel X',
      volume: 24.44,
      hours: '+60.3%',
      sevenD: '-0.14%',
      floor_price: '19',
      owner: '8.9k',
      item: '19.2k',
    },
    {
      key: '2',
      hoursStatus: false,
      sevenDStatus: false,
      collection: 'Despicable Me',
      volume: 11.42,
      hours: '+20.3%',
      sevenD: '-1.14%',
      floor_price: '20',
      owner: '4.5k',
      item: '10k',
    },
  ];

  // const authorsState = useSelector(selectors.authorRankingsState);
  // const authors = authorsState.data ? authorsState.data : [];

  // useEffect(() => {
  //     dispatch(fetchAuthorRanking());
  // }, [dispatch]);

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg text-light' style={{ backgroundImage: `url(${'./img/bg-VXL.png'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
                <h1 className='text-center'>Top NFTs</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '50px 20px' }}>
        <div className='row'>
          <div className='col-lg-12'>
            {/* <div className="items_filter centerEl">
              <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{'zIndex': 999}} defaultValue={options[0]} options={options} /></div>
              <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} /></div>
            </div> */}
            <FilterBar>
                <Div>
                    <StyledSelect
                        showSearch
                        placeholder="Select a category"
                        optionFilterProp="children"
                        defaultValue=""
                        onChange={handleCategoryChange}
                        onSearch={handleCategorySearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="">All</Option>
                        {
                            category?.map((item, index) => (
                                <Option key={index} value={item.id}>{item.label}</Option>
                            ))
                        }
                    </StyledSelect>
                </Div>
                <Div>
                    <StyledSelect
                        showSearch
                        defaultValue={1}
                        optionFilterProp="children"
                        placeholder="Select Collections..."
                        onChange={handleDateChange}
                        onSearch={handleDateSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            options?.map((item, index) => (
                                <Option key={index} value={item.id}>{item.value}</Option>
                            ))
                        }
                    </StyledSelect>
                </Div>
            </FilterBar>
            <Table columns={columns} dataSource={data} onChange={handleTableSort} />
          </div>
        </div>
      </section>
    </div>
)};

export default memo(RankingRedux);