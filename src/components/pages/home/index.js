import {React , useEffect } from 'react';
import styled from "styled-components";

import FeatureBox from './components/FeatureBox';


import AuthorListRedux from './components/AuthorListRedux';
import SliderMainParticle from './components/SliderMainParticle';
import AnimationCarousel from './components/AnimationCarousel';
import LinkButton from '../../components/common/LinkButton';
// import CarouselNewRedux from './components/CarouselNewRedux';
import NewItems from './components/NewItems';
import CarouselCollectionRedux from './components/CarouselCollectionRedux';
import HotCollections from './components/HotCollections'

const BannerSection = styled.section`
  height: auto!important ;
  background-color: ${props => props.theme.primBgColor};
  margin-top: 100px;
` ;

const IntroSection = styled.section`
  background-color: ${props => props.theme.primBgColor};
`

const TopSellerSection = styled.section`
  background-color: ${props => props.theme.secBgColor};
`

const NewItemsSection = styled.section`
  background-color: ${props => props.theme.primBgColor};
`

const HotCollectionsSection = styled.section`
  background-color: ${props => props.theme.secBgColor};
`

const TrendingItemsSection = styled.section`
  background-color: ${props => props.theme.primBgColor};
`

const SildPad = styled.div`
  background-color: ${props => props.theme.bannerBgColor};
  border-radius: 16px;
`

const TitleText = styled.span`
  font-family: "inter";
  font-size: 35px;
  font-weight: bold;
  line-height: 70px;
  font-style: normal;
  text-align: center;
  color: ${props => props.theme.primaryColor};
`

const Title = styled.div`
  padding-bottom:25px;
`

const StyledDiv = styled.div`
  background-color: ${props => props.theme.primBgColor};
`

const Home= ({colormodesettle}) => {

  useEffect(()=>{
    localStorage.setItem('searchValue','') ;
  },[])
  
  return (
    <>
      <StyledDiv >
          <BannerSection id='section_1' className='no-top no-bottom vh-100 custom-container'>
            <div style={{height: '30px'}}></div>
            <SildPad className='v-center custom-container'>
                <SliderMainParticle/>
            </SildPad>
          </BannerSection>

          <TrendingItemsSection>
            <div className='custom-container'>
              <Title className='text-center'>
                <TitleText>Trending Items</TitleText>
              </Title>
              <div className='col-lg-12'>
                <AnimationCarousel colormodesettle = {colormodesettle} />
              </div>
            </div>
          </TrendingItemsSection>

          <HotCollectionsSection>
            <div className="custom-container">
              <Title className='text-center'>
                <TitleText>Hot Collections</TitleText>
              </Title>
              <div className='col-lg-12'>
                {/* <CarouselCollectionRedux/> */}
                <HotCollections />
              </div>
            </div>
          </HotCollectionsSection>

          <NewItemsSection>
            <div className="custom-container">
              <Title className='text-center'>
                <TitleText>New Items</TitleText>
              </Title>
              <div className='col-lg-12' style={{display:'flex', justifyContent:'center'}}>
                <NewItems />
              </div>
            </div>
          </NewItemsSection>

          <TopSellerSection>
            <div className="custom-container">
              <Title className='text-center'>
                <TitleText>Top Sellers</TitleText>
              </Title>
              <div className='col-lg-12'>
                <AuthorListRedux/>
              </div>
              <div className='col-lg-12' style={{marginTop: '30px'}}>
                <LinkButton url={'/ranking'} text='View All' />
              </div>
            </div>
          </TopSellerSection>

          <IntroSection>
            <div className='custom-container'>
              <Title className='text-center'>
                <TitleText>Time to NFT with SuperKluster</TitleText>
              </Title>
              <FeatureBox/>
            </div>
          </IntroSection>
      </StyledDiv>
    </>
  );

};
export default Home;