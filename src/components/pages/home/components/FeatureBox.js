import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { Link } from '@reach/router';
import styled from "styled-components";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const Title = styled.div`
  font-family: "inter";
  font-size: 24px;
  font-weight: bold;
  line-height: 24px;
  font-style: normal;
  text-align: left;
  color: ${props => props.theme.primaryColor};
  padding-bottom: 15px;
`

const Text = styled.span`
  font-family: "inter";
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
  font-style: normal;
  text-align: left;
  color: ${props => props.theme.primaryColor};
`

const BoxPad = styled.div`
  height : 100%;
  background: ${props => props.theme.IntroBoxColor};
  border: ${props => props.theme.boxBorder};
`

const BoxBgIcon = styled.i`
  position: absolute;
  font-size: 520px !important;
  color: ${props => props.theme.boxBgIconColor} !important;
  background: none !important;
  width: auto !important;
  height: auto !important;
  left:40%;
  top: 5%;
  opacity: 0.1;
`

const featurebox= () => (
  <div className='row'>
    <div className="col-lg-4 col-md-6 mb-3">
      <Link to="/wallet">
        <BoxPad className="feature-box f-boxed style-3">
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <i className="bg-color-2 i-boxed icon-wallet"></i>
          </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <Title>Set up your wallet</Title>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce style={{wordBreak:'keep-all'}}>
                <Text>Before you can create, buy and sell NFTs you will need to set up a crypto wallet. The top right sign in button will provide you with a list of compatible wallets that you can connect too.</Text>
              </Reveal>
            </div>
            <BoxBgIcon className="icon-wallet"></BoxBgIcon>
        </BoxPad>
      </Link>
    </div>

    <div className="col-lg-4 col-md-6 mb-3" >
      <Link to="/create">
        <BoxPad className="feature-box f-boxed style-3">
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
          </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <Title>Add your NFTs</Title>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce style={{wordBreak:'keep-all'}}>
                <Text>Upload your file, complete description details, customize your NFT, choose your preferred Blockchain and click create to share your NFT with the world!</Text>
              </Reveal>
            </div>
            <BoxBgIcon className="icon_cloud-upload_alt"></BoxBgIcon>
        </BoxPad>
      </Link>
    </div>

    <div className="col-lg-4 col-md-6 mb-3">
      <Link to="/collection">
        <BoxPad className="feature-box f-boxed style-3">
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
          </Reveal>
            <div className="text">
              <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                <Title>Sell your NFTs</Title>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce style={{wordBreak:'keep-all'}}>
                <Text>Select your NFT, choose the type of auction and share your NFT with potential buyers from all around the world!</Text>
              </Reveal>
            </div>
            <BoxBgIcon className="icon_tags_alt"></BoxBgIcon>
        </BoxPad>
      </Link>
    </div>
  </div>
);
export default featurebox;