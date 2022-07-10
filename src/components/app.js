/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, Fragment ,useState } from "react";
import { useDispatch } from 'react-redux';
import "../../src/App.css";
import { Router, Location, Redirect } from "@reach/router";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home from './pages/home';
import Explore from "./pages/explore";
import ExploreCollection from "./pages/ExploreCollection";
import RankingRedux from "./pages/RankingRedux";
import Auction from "./pages/Auction";
import UserCollection from "./pages/UserCollection";
import ImportCollection from "./pages/ImportCollection";
import CollectionDetail from "./pages/CollectionDetail";
import ItemDetailRedux from "./pages/ItemDetailRedux";
import ListItemPage from "./pages/ListItemPage";
import WalletPage from "./pages/wallet";
import Works from "./pages/works";
import News from "./pages/news";
import Create from "./pages/create";
import CreateCollection from "./pages/CreateCollection";
import Contact from "./pages/contact";
import Minter from "./pages/Minter";
import EditProfile from "./pages/editProfile";
import AuthorPage from "./pages/author_page";
import SKTerms from "./pages/SKTerms";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";
import Footer from "./menu/footer";
import useMetaMask from "./wallet-connect/metamask" ;
import { saveAccessToken } from "../store/actions" ;
import { ethers } from 'ethers';
import { useWeb3React } from "@web3-react/core";


import { createGlobalStyle ,ThemeProvider  } from "styled-components";
import { getMetamaskLibrary } from "../core/nft/interact";

const getColor = (color) => {
  if(color == '#3c3f42') return 'rgba(226,226,266,0.1)';
  return '#FBFBFB';
}

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
  .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner , .ant-picker-time-panel-column > li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner:hover{
    background: ${({ theme }) => theme.ExpolerCollectionSubTxtTimer};

  }
  .ant-picker-input > input[disabled] ,  .previewCardTSy , .field-set span , .ant-select-item-option-content , .box-url p , .ant-select-selection-item , .author-info span , .author-info span a , .ant-tabs-tab-btn , .CD-bitTxt , .eOwoHt , .follow-div span{
    color: ${({ theme }) => theme.ExpolerCollectionSubTxt};
  }
  header#myHeader , .navbar.white .btn  , .navbar.sticky.white .btn {
    color: ${({ theme }) => theme.headerColor};
  }
  ::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
  }
  .GTIKn , .nft_attr span , .d-nft-inception , .item_info .item_info_counts > div i , .item_info_counts , .ant-pagination-item-ellipsis , .card-text , .card-subtitle , .has_offers , .nItemSale , .nftCardStatistic , .author_list , .onStep , footer.footer-light a , .copy{
    color: ${({ theme }) => theme.collectionMTxt};
  }
  .de_countdown , .box-url , .bOEzwf , .bOEzwf:hover{
    background : ${({ theme }) => theme.collectionBgc};
  }
  .ant-table-thead > tr > th , .ant-table-tbody > tr > td {
    border-bottom : ${({ theme }) => theme.rankBBottom};
  }
  .alrt1 , .DumKu , .gCHlFx{
    border : ${({ theme }) => theme.CDborder};
  }
  .DumKu:hover , .gCHlFx:hover {
    border : ${({ theme }) => theme.CDborder};
    color : ${({ theme }) => theme.text};
    background : ${({ theme }) => theme.pageColor}; 
  }
  .ant-select-dropdown , .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background : ${({ theme }) => theme.rankInputBgc};
    border : ${({ theme }) => theme.rankInputBgc};
    color : ${({ theme }) => theme.text};
  }
  .ant-pagination-options-quick-jumper input{
    background : ${({ theme }) => theme.rankInputBgc};
    border : ${({ theme }) => theme.rankInputBorder};
    color : ${({ theme }) => theme.text};

  }
  .ant-select-item.ant-select-item-option.ant-select-item-option-active , .ant-select-item.ant-select-item-option.ant-select-item-option-selected{
    background : ${({ theme }) => theme.rankInputSelectedBgc};
    color : ${({ theme }) => theme.rankInputSelectedColor};
  }
  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link  , .ant-pagination-item{
    color : ${({ theme }) => theme.text};
    background : ${({ theme }) => theme.pageColor};
    border : ${({ theme }) => theme.CDborder};

  }
  .swal2-popup {
    background: ${({ theme }) => theme.sweetalarmBackground} !important;
    color: ${({ theme }) => theme.sweetalarmColor} !important;
  }
  .ant-menu-item-selected a, .ant-menu-item-selected a:hover{
    color: ${({ theme }) => theme.mobileHoverTxtColor} !important;
  }
  .ant-menu-submenu-arrow , .ant-empty-description , .settingTxtColor , .importColor , .dNdLgf , .ant-form-item-label > label ,.nft-big .slick-prev::before , .nft-big .slick-next::before , .ant-select , .dropdown-toggle::after , .shareMenu.ant-dropdown-menu-item , .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title  , .ant-dropdown-menu-title-content > a, .ant-tabs , .auctionTime  , .item-dropdown .dropdown a , .ant-menu-item a , .ant-menu , .ant-drawer-title , .box-url .box-url-label , .ant-pagination-options-quick-jumper , .col-black , h1 , h2, h3 ,h4  , h5 , .item_info .item_author .author_list_info , .d-title , .nft__item_lg .d-buttons .btn-main.btn-light , .ant-statistic-content-value{
    color: ${({ theme }) => theme.text};
  }
  .ant-drawer-close , .countdown-amount , .d-title  , .de_countdown , .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: ${({ theme }) => theme.text};
  }
  .ant-alert-message , .notificationMsg , .ant-popover-inner-content , .ant-popover-title , .properites-fontSy , .progress-properties , .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover , .container .superKluster_Slide .slick-arrow:before{
    color: ${({ theme }) => theme.text} !important;
  }
  .card{
    background-color: ${({ theme }) => theme.collectionBgc};
  }
  .notificationDel , .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover , .modal-content , .ant-dropdown-menu-item-divider ,.fzboVF , .ant-dropdown-menu , .item-dropdown , .ant-drawer-content , .ant-menu-sub.ant-menu-inline , .ant-menu , .ant-drawer-header , body , footer.footer-light  {
    background: ${({ theme }) => theme.body};
  }
  .navbar.sticky.white{
    background: ${({ theme }) => theme.body == '#212428' ? 'rgba(33,36,40,.8)' : 'rgba(250,250,250,.8)'};
  }
  .nft__item{
    background: ${({ theme }) => theme.collectionBgc};
    border: ${({ theme }) => theme.collectionBorder};
  }
  .jjXvpk  {
    background-color: ${({ theme }) => theme.detailTypebgc};
    border: ${({ theme }) => theme.detailTypebgc};
    color: ${({ theme }) => theme.detailTypeColor};
  }
  .nav-pills > .nav-item > .nav-link {
    background-color: ${({ theme }) => theme.detailTypebgc};
    border: ${({ theme }) => theme.itemDetaildetailTypebgc};
    color: ${({ theme }) => theme.itemDetaildetailTypeColor};
  }
  .cTUTtB{
    background: ${({ theme }) => theme.authorBtnBgc};
    color: ${({ theme }) => theme.authorBtnColor};
  }
  .ant-table-thead > tr > th , .ant-table{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .ant-table-thead > tr > th , .ant-table-tbody > tr > td  {
    border : ${({ theme }) => theme.Noborder};
  }
  .ant-btn{
    border: ${({ theme }) => theme.detailTypebgcicon} ;
  }
  .socialIconColor{
    border: ${({ theme }) => theme.detailTypebgcicon} ;
    background: ${({ theme }) => theme.detailTypebgcicon_white} ;
  }
  .nft-big .slick-next , .nft-big .slick-prev , .ant-dropdown-menu-item:hover {
    background : ${({ theme }) => theme.body} ;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover{
    background: ${({ theme }) => theme.hoverBgc};
  }
  
  .nft_attr{
    background: ${({ theme }) => theme.body} !important;
    border : ${({ theme }) => theme.detailProperBorder};
  }
  .react-loading-skeleton{
    --base-color : ${({ theme }) => theme.LazyBaseColor};
    --highlight-color : ${({ theme }) => theme.LazyHighColor} !important ; 

  }
  .btn_viewColet{
    color: ${({ theme }) => theme.detailBtnViewColor};
    background-color: ${({ theme }) => theme.detailBtnViewBgc};
    border: ${({ theme }) => theme.detailBtnViewBorder};
  }
  .ant-table-cell.ant-table-column-sort.ant-table-column-has-sorters , .ant-table-cell.ant-table-column-sort{
    background: ${({ theme }) => theme.hoverBgc};
  }

  .container .featured_Nft_Slide .slick-arrow:before {
    border: ${({ theme }) => theme.arraycolor} ;
  }

   .ant-input , .ant-input-affix-wrapper{
    background-color: ${({ theme }) => theme.rankInputBgc};
    border : ${({ theme }) => theme.InputBorderColor};
    color : ${({ theme }) => theme.text};
  }
  .notificationIconstyle{
    background-color: ${({ theme }) => theme.notificationBgc};
    border : ${({ theme }) => theme.notificationBgc};
  }
  .toatlValueStyle{
    background-color: ${({ theme }) => getColor(theme.notificationBgc)};
  }
  .cartstyle{
    background-color: ${({ theme }) => theme.notificationBgc};
    border : ${({ theme }) => theme.notificationBgc};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right:20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .form-control:hover{
    background-color: ${({ theme }) => theme.body};
  }
  .icons.icon_color_svg svg {
    fill : ${({ theme }) => theme.text};
  }
  .toggle::before , {
    background : ${({ theme }) => theme.text};
  }
  .toggle{
    background : ${({ theme }) => theme.toggleBgc};
  }
  h6{
    color : ${({ theme }) => theme.h6color};
  }
  .particles_background_style {
    opacity : ${({ theme }) => theme.canvasDisplay};
  }
  .particles_background_style_light {
    opacity : ${({ theme }) => theme.canvasDisplayLight};
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
    background-color : ${({ theme }) => theme.mobileHoverColor};
  }
  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
    border-right : ${({ theme }) => theme.mobileBorderColor};
  }
  .ant-drawer-header {
    border-bottom : ${({ theme }) => theme.mobileBorderColor};
  }
  .imageUploader {
    background : ${({ theme }) => theme.uploadFileSysColor} !important ;
  }
  .form-control:disabled, .form-control[readonly] {
    background-color : ${({ theme }) => theme.diableInputBody} !important ;
  }
  .form-control {
    border : ${({ theme }) => theme.formCborder} ;
    color : ${({ theme }) => theme.text} ;
  }
  .url-input {
    color : ${({ theme }) => theme.text} ;
  }
  .form-control:focus{
    background : ${({ theme }) => theme.body} ;
    color : ${({ theme }) => theme.text} ;
  }
  .modal-header , .borderSy{
    border-bottom :${({ theme }) => theme.borderSy} ;
  }
  .modal-footer{
    border-top:${({ theme }) => theme.borderSy} ;
  }
  
  .warning_div .ant-alert-description ,    .NorTxt , .ant-statistic-content , .ant-checkbox-wrapper , .foTxNP , .author_list .author_list_info a {
    color : ${({ theme }) => theme.text}  !important ;
  }
  .author_list .author_list_info a:hover {
    color : ${({ theme }) => theme.TSellerhoverColor} ;
  }
  .breadcumb .mainbreadcumb h1 {
    color : white ;
  }
  .nftcards , .card-box-shadow-style {
    box-shadow : ${({ theme }) => theme.collectionShadowColor} ;
  }
  .react-multi-carousel-list .react-multiple-carousel__arrow::before{
    color : ${({ theme }) => theme.text} ;
    background : ${({ theme }) => theme.transparent} ;
    border : ${({ theme }) => theme.arrBorderColor} ;
  }
  .ant-select{
    border : ${({ theme }) => theme.InputBorderColor} ;
  border-radius:8px ;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn , .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn:hover{
    color : #f60cfe ;
  }
  .pinkarr {
    color : ${({ theme }) => theme.pinkarr} !important;
  }
  .ofBgc{
    border-top : ${({ theme }) => theme.formCborder} ;
    border-bottom : ${({ theme }) => theme.formCborder} ;
    background : ${({ theme }) => theme.ofBgc} ;
  }
  .ant-picker-cell , .ant-picker-focused .ant-picker-separator , .ant-picker-separator , .ant-picker-suffix  , .ant-picker-input > input , .ant-collapse > .ant-collapse-item > .ant-collapse-header , #settingVerify , .threeDTXT , .btn-main.btn-light.viewartwork  {
    color: ${({ theme }) => theme.text}  !important;
  }
  .ant-btn-icon-only.ant-btn-lg{
    background: ${({ theme }) => theme.dotscolor} ;
  }
  .img-fluid.logoCS {
    background-image : ${({ theme }) => theme.logosrc} ;
    background-size: cover;
    min-width:300px ;
    height:50px;
  }
  .onStep{
    color : ${({ theme }) => theme.sellNFTsubletter} ;
  }  
  .onStep:hover{
    color : white ;
  }  
  .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
    background : ${({ theme }) => theme.body} ;
  }
  .helpermodel{
    background : ${({ theme }) => theme.body} ;
    color : ${({ theme }) => theme.text} ;
  }
  .progress-div{
    border : ${({ theme }) => theme.createBorderSy} ;
  }
  .ant-popover-inner{
    background-color : ${({ theme }) => theme.rangeBGColor} !important;
  }
  .headerIconSy{
    background : ${({ theme }) => theme.greycolor} !important;
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
     background : ${({ theme }) => theme.sellgreyCo} !important;
  }
  .ant-collapse-content , .ant-collapse {
    background-color : ${({ theme }) => theme.listAppColor} !important;
  }
  .ant-collapse-content {
    color: ${({ theme }) => theme.collectionMTxt};
  }
  .ant-picker , .ant-picker-panel{
    border : ${({ theme }) => theme.InputBorderColor};
    background : ${({ theme }) => theme.rankInputBgc} !important;
  }
  .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before{
  
  }
   .ant-picker-time-panel-column > li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner , .ant-picker-header button ,  .ant-picker-header , .ant-picker-content th {
    color: ${({ theme }) => theme.text};
    border: ${({ theme }) => theme.body};

  }
  .ant-picker-footer {
    background: ${({ theme }) => theme.rankInputBgc};
    border: ${({ theme }) => theme.rankInputBgc};
  }
  .nftCardCounter {
    border: ${({ theme }) => theme.nftCardAuctionTimerBr};
  }
  .eth_logo{
    filter: ${({ theme }) => theme.brightcolor_logo};
  }
  .iconColor{
    color: ${({ theme }) => theme.LazyHighColor};
  }
  .item_info_views_Extra{
    border: ${({ theme }) => theme.shareButtonBorder};
  }
  .shareMenu.ant-dropdown-menu{
    box-shadow: ${({ theme }) => theme.dropdownMenu} !important ;
  }
  .shareMenu.ant-dropdown-menu-item:hover{
    background: ${({ theme }) => theme.dropdownMenuItem} !important ;
  }
  .ant-tabs-top > .ant-tabs-nav::before{
    border-bottom: ${({ theme }) => theme.tabsborderbottom} !important ;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color: ${({ theme }) => theme.tabColor} !important ;
  }
  .extraIcon{
    color: ${({ theme }) => theme.text} !important ;
  }
  .shareMenu.ant-dropdown-menu-item{
    border-top: ${({ theme }) => theme.borderShareBtnColor} !important ;
  }
  .timeleft-txt {
    font-size: 12px;
    color: ${({ theme }) => theme.timeleftColor};
    margin-top: -10px;
  }
  .auctionTime {
    border: 1px solid ${({ theme }) => theme.switchColor};
    border-radius: 5px;
    padding: 10px;
  }
  .modal-content {
    border: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
    border-radius: 7px!important;
    .modal-header {
      border: 1px solid ${({ theme }) => theme.modalBorderColor};
    }
  }
  .card-border {
    border: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }
  .modal-body > .card-top-border {
    border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  }
  .modal-top-bar {
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
    border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }
  .modal-bottom-bar {
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }
  
  .styledStatic .ant-statistic-content .ant-statistic-content-value {
    font-size: 16px!important;
    margin-bottom: 13px!important;
    color: ${({ theme }) => theme.startBidPriceColor}!important;
  }

  .nft-item-price-value {
    color: ${({ theme }) => theme.startBidPriceColor}!important;
  }

  .de_tab_content {
    background-color: ${({ theme }) => theme.tabContentBgColor}!important;
  }

  .ant-table-wrapper::-webkit-scrollbar {
    height: 5px;
  }
  
  /* Track */
  .ant-table-wrapper::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrackBgColor}; 
  }
   
  /* Handle */
  .ant-table-wrapper::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumbBgColor}; 
  }
  
  /* Handle on hover */
  .ant-table-wrapper::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarThumbHoverBgColor}; 
  }

  
  .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }

  .ant-collapse-content, .ant-collapse {
    border: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }
  .ant-collapse > .ant-collapse-item {
    border: 1px solid ${({ theme }) => theme.modalBorderColor}!important;
  }
`;

export const lightTheme = {
  scrollbarTrackBgColor: '#e3e3e3',
  scrollbarThumbBgColor: '#bdbdbd',
  scrollbarThumbHoverBgColor: '#979797',
  tabContentBgColor: 'rgba(255,255,255,0.85)',
  borderShareBtnColor:'1px solid #bcb9b98f' ,
  tabColor:'black' ,
  tabsborderbottom:'1px solid #e3e3e3',
  dropdownMenuItem:'#bdbaba',
  dropdownMenu:'2px 2px 30px 0px rgb(20 20 20 / 10%)',
  shareButtonBorder:'1px solid #d0cfcf' ,
  LazyBaseColor:'#ebebeb',
  LazyHighColor:'#b9b4b4' ,
  sweetalarmBackground: 'white' ,
  sweetalarmColor: '#363537' ,
  brightcolor_logo : 'brightness(0.5)',
  nftCardAuctionTimerBr : '1px solid #e2a7e4',
  rankInputBorder:'1px solid #d9d9d9' ,
  listAppColor:'white',
  sellgreyCo:'#f5f5f5',
  greycolor:'#e6e6e6',
  rangeBGColor:'white',
  createBorderSy:'1px solid #bac2cd' ,
  sellNFTsubletter:'black',
  borderSy:'1px solid #dee2e6' ,
  dotscolor:'#969696',
  ofBgc:'#e7e7e7',
  formCborder:'1px solid rgb(223, 223, 223)',
  pinkarr:'black',
  InputBorderColor:'1px solid lightgrey',
  arrBorderColor:'1px solid black',
  collectionShadowColor:' 0px 0px 15px 2px rgba(0,0,0,0.10)',
  TSellerhoverColor:'#f70dff' ,
  arraycolor: 'solid 1px black' ,
  diableInputBody:'#e9ecef',
  uploadFileSysColor:'rgb(235, 235, 235)',
  mobileBorderColor:'1px solid #f0f0f0',
  mobileHoverTxtColor:'#1890ff',
  mobileHoverColor : '#e6f7ff',
  logosrc:'url("/img/logo.PNG")' ,
  canvasDisplay:'0',
  canvasDisplayLight:'0.5',
  h6color:'black',
  toggleBgc:'#E2E2E2',
  rankInputSelectedBgc:'#b1afaf',
  rankInputSelectedColor:'blue',
  hoverBgc:'#f0f0f0',
  Noborder : '',
  rankTableBgc: '#ffffff',
  rankBBottom: '1px solid #d6d6d6 ' ,
  rankInputBgc: 'white',
  notificationBgc: '#e2e2e2',
  authorBtnBgc : 'white',
  authorBtnColor : 'black',
  CDborder: '1px solid #e5e8eb',
  collectionBorder:'',
  collectionBgc: 'white' ,
  detailBtnViewColor: 'rgb(247, 13, 255)' ,
  detailBtnViewBgc: 'white' ,
  detailBtnViewBorder: '1px solid rgb(247, 13, 255)' ,
  detailProperBorder :'solid 1px rgba(0, 0, 0, 0.15)',
  detailTypebgc: '#dcdbdb',
  detailTypebgcicon: '#dcdbdb',
  itemDetaildetailTypebgc: '#eeeeee',
  detailTypebgcicon_white: 'white',
  detailTypeColor: '#262626' ,
  body: 'white',
  pageColor: 'white' ,
  ExpolerCollectionSubTxt: 'grey' ,
  ExpolerCollectionSubTxtTimer:'#bababa',
  text: '#363537',
  headerColor: 'black' ,
  collectionMTxt: '#6c757d' ,
  placeholderColor: '#757575',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  timeleftColor: 'black',
  switchColor: 'black',
  modalBorderColor: '#dee2e6',
  headerBgColor: 'rgba(255, 255, 255)',
  startBidPriceColor: '#727272',
  secBgColor: '#F8F8F8',
  primaryColor: '#000000',
  borderColor: '#D8D8D8',
  inputBoxColor: '#FFFFFF',
  secondaryColor: '#787878',
  primBgColor: '#FFFFFF',
  bannerBgColor: '#FFF7FF',
  IntroBoxColor: '#FFF7FF',
  boxBorder: 'none',
  boxBgIconColor: '#f355f3',
  cardBorderColor: '#E2E2E2',
  AuthorItemBgColor: '#FFFFFF'
}

export const darkTheme = {
  scrollbarTrackBgColor: '#484848',
  scrollbarThumbBgColor: '#686868',
  scrollbarThumbHoverBgColor: '#555',
  tabContentBgColor: 'rgba(33,36,41,.6);',
  borderShareBtnColor:'1px solid #1313136e' ,
  tabColor:'#f60cfe' ,
  tabsborderbottom:'1px solid #1c1c1a',
  dropdownMenu:'0px 0px 15px 2px #09090969',
  dropdownMenuItem:'#bdbaba',
  shareButtonBorder:'1px solid #444444' ,
  LazyBaseColor:'#3c3f42',
  LazyHighColor:'#212428' ,
  sweetalarmBackground: '#282828' ,
  sweetalarmColor: '#ececec' ,
  brightcolor_logo : 'brightness(3)',
  nftCardAuctionTimerBr : '1px solid #f780ff',
  rankInputBorder:'1px solid #3e3c3c' ,
  listAppColor:'#212427',
  sellgreyCo:'#595959',
  greycolor:'black',
  rangeBGColor:'#19191b',
  createBorderSy:'1px solid #47494c' ,
  sellNFTsubletter:'#c9ced3',
  borderSy:'1px solid #18191a1px solid #18191a' ,
  dotscolor:'white',
  ofBgc:'#292929',
  formCborder:'solid 1px #3b3838',
  pinkarr:'#f60cfe',
  InputBorderColor:'none'/*'1px solid #3c3f42'*/,
  arrBorderColor:'1px solid white',
  collectionShadowColor:' 0px 0px 15px 2px rgba(0,0,0,0.10)',
  TSellerhoverColor:'#f70dff' ,
  arraycolor: 'solid 1px white' ,
  diableInputBody:'#2a2f34',
  uploadFileSysColor:'rgb(38 41 45)',
  mobileBorderColor:'1px solid #000000',
  mobileHoverTxtColor:'#1890ff',
  mobileHoverColor : '#413f3f',
  logosrc:'url("/img/logo2.png")' ,
  canvasDisplay:'1',
  canvasDisplayLight:'0',
  h6color:'#f70dff',
  toggleBgc:'black',
  rankInputSelectedBgc:'#2f3236',
  rankInputSelectedColor:'blue',
  hoverBgc:'#232527b3',
  Noborder : '',
  rankTableBgc: '#26292d',
  rankBBottom: 'solid 1px rgba(255, 255, 255, .1)' ,
  rankInputBgc: '#3c3f42',
  notificationBgc: '#3c3f42',
  authorBtnBgc : '#585558',
  authorBtnColor : '#eaeaea',
  CDborder: 'solid 1px rgb(0 0 0 / 15%)',
  collectionBorder:'',
  collectionBgc: '#26292d' ,
  detailBtnViewColor: '#fff' ,
  detailBtnViewBgc: '#f70dff' ,
  detailBtnViewBorder: 'solid #f70dff' ,
  detailProperBorder :'solid 1px rgba(255, 255, 255, .15)',
  detailTypebgc: '#585558',
  detailTypebgcicon: '#2d2c2d',
  itemDetaildetailTypebgc: '#585558',
  detailTypebgcicon_white: '#212428',
  detailTypeColor: '#eaeaea' ,
  body: '#212428',
  pageColor : '#26292d' ,
  ExpolerCollectionSubTxt: '#d4cccc' ,
  ExpolerCollectionSubTxtTimer:'#575656',
  headerColor: 'white' ,
  text: '#FAFAFA',
  collectionMTxt: '#c9ced3' ,
  placeholderColor: '#c9ced3',
  gradient: 'linear-gradient(#091236, #1E215D)',
  timeleftColor: '#ffffff',
  switchColor: '#ffffff',
  modalBorderColor: 'rgb(54 55 56)',
  headerBgColor: 'rgba(0, 0, 0, 0.85)',
  startBidPriceColor: '#ffffff',
  secBgColor:'#121416',
  primaryColor: '#FFFFFF',
  borderColor: '#545454',
  inputBoxColor: '#353434',
  secondaryColor: '#A7A7A7',
  primBgColor: '#191C1F',
  bannerBgColor: '#121416',
  IntroBoxColor: 'transparent',
  boxBorder: '1px solid #292d31',
  boxBgIconColor: '#545657',
  cardBorderColor: '#292D31',
  AuthorItemBgColor: '#121416'
}

export const ScrollTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  const { library } = useWeb3React();
  const dispatch = useDispatch();
  const { disconnect } = useMetaMask();
  const [colorMode , setColorMode] = useState(()=>{
    const saved = localStorage.getItem("settleThemeMode") ;
    const initialValue = JSON.parse(saved) ;
    return !initialValue  ;
  }) ;
  const [profileMode , setProfileMode] =  useState(()=>{
    const saved = localStorage.getItem("settileProfileMode") ;
    const initialValue = JSON.parse(saved) ;
    return initialValue ;
  }) ;
  const [notificationMode , setNotificationMode] =  useState(()=>{
    const saved = localStorage.getItem("settileNotificationMode") ;
    const initialValue = JSON.parse(saved) ;
    return initialValue ;
  }) ;

  const signOut = async () => {
    await disconnect();
    await dispatch(saveAccessToken(undefined));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('account');
    localStorage.removeItem('balance');
    localStorage.removeItem('itemId');
    localStorage.removeItem('searchValue');
    // 
    localStorage.removeItem('itemId');
    localStorage.removeItem('currentPrice');
    localStorage.removeItem('itemData');
    localStorage.removeItem('footerflg');
    localStorage.removeItem('UserName');
    localStorage.removeItem('itemurl');
    localStorage.removeItem('isSearchKey');
    window.location.reload();
  }

  useEffect(() => {
    if(!library) return;
    async function listenAccountChange() {
      let accessToken = localStorage.getItem('accessToken');
      if(!accessToken) return;
      library.provider.on('accountsChanged', async function() {
        signOut();
      })
    }

    async function listenWalletUnlock() {
      let accessToken = localStorage.getItem('accessToken');
      if(!accessToken) return;
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const signer = await web3Provider.getSigner();
      signer.getAddress()
      .then((res) => {

      })
      .catch(e => {
        signOut();
      })
    }
    listenAccountChange();
    listenWalletUnlock();
  }, [library]);

  useEffect(() => {
    async function listenMMAccount() {
      let accessToken = localStorage.getItem('accessToken');
      if(!accessToken) return;
      if(localStorage.getItem('provider') != 'injected') return;
      const library = getMetamaskLibrary();
      let account = localStorage.getItem('account');
      if(!library.provider || account == null) return;
      library.provider.on("accountsChanged", async function() {
        signOut();
      });
    }

    async function listenWalletUnlock() {
      let accessToken = localStorage.getItem('accessToken');
      if(!accessToken) return;
      if(localStorage.getItem('provider') != 'injected') return;
      const library = getMetamaskLibrary();
      const web3Provider = new ethers.providers.Web3Provider(library.provider, 'any');
      const signer = await web3Provider.getSigner();
      signer.getAddress()
      .then((res) => {

      })
      .catch(e => {
        signOut();
      })
    }
    listenMMAccount();
    listenWalletUnlock();
  }, []);

  const funcs = {
    setColorModeFunc: (category) => {
      setColorMode(category)
    },
    setProfileModeFunc: (category) => {
      setProfileMode(category)
    },
    setNotificationModeFunc: (category) => {
      setNotificationMode(category)
    }
  }
  const colormodesettle = {
    ColorMode: colorMode ,
    ProfileMode: profileMode,
    NotificationMode : notificationMode,
  }

  return(
    <ThemeProvider theme={colorMode == '1' ? lightTheme : darkTheme}>
        <Fragment>
          <div className="wraper">
            <GlobalStyles />
            <Location>
              { props => (
                <Header {...props} funcs = {funcs} colormodesettle = {colormodesettle} />
              )}
            </Location>
            <PosedRouter>
              <ScrollTop path="/">
                <Home exact path="/" colormodesettle = {colormodesettle} >
                  <Redirect to="/home"  />
                </Home>
                <Explore path="/explore" colormodesettle = {colormodesettle} />
                <ExploreCollection path='/explore-collections' colormodesettle = {colormodesettle} />
                <RankingRedux path="/ranking" colormodesettle = {colormodesettle} />
                <Auction path="/Auction" colormodesettle = {colormodesettle} />
                <CreateCollection path='/create-collection' colormodesettle = {colormodesettle} />
                <UserCollection path='/collection' colormodesettle = {colormodesettle} />
                <CollectionDetail path='/collection-detail/:collectionId' colormodesettle = {colormodesettle} />
                <ImportCollection path='/import-collections' colormodesettle = {colormodesettle} />
                <ItemDetailRedux path="/ItemDetail/:nftId" funcs = {funcs}  colormodesettle = {colormodesettle} />
                <ListItemPage path="/assets/sell/:nftId" colormodesettle = {colormodesettle} />
                <WalletPage path="/wallet" colormodesettle = {colormodesettle} />
                <Works path="/works" colormodesettle = {colormodesettle} /> 
                {/* no remove search key */}
                <News path="/news" colormodesettle = {colormodesettle} />
                {/* no rmove search key */}
                <Create path="/create" colormodesettle = {colormodesettle} />
                <Contact path="/contact" colormodesettle = {colormodesettle} />
                <Minter path="/mint" colormodesettle = {colormodesettle} />
                <EditProfile path="/settings" funcs = {funcs} colormodesettle = {colormodesettle} />
                <AuthorPage path="/author/:authorId" colormodesettle = {colormodesettle} />
                <SKTerms path="/terms-of-service" colormodesettle = {colormodesettle} />
                <Privacy path="/privacy-policy" colormodesettle = {colormodesettle} />
                <Faq path="/Faq" colormodesettle = {colormodesettle} />
              </ScrollTop>
            </PosedRouter>
            <ScrollToTopBtn />
            <Footer colormodesettle = {colormodesettle} />
          </div>
        </Fragment>
    </ThemeProvider>  
  )
};
export default App;
