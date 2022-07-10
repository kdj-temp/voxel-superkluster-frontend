import React, { useEffect } from "react";
import Wallet from "../components/wallet";
import { createGlobalStyle } from "styled-components";
import useMetaMask from "../wallet-connect/metamask";
import { Redirect } from "react-router-dom";
import { useNavigate } from "@reach/router";
const GlobalStyles = createGlobalStyle`
`;

const WalletPage = ({colormodesettle}) => {

  // const { account } = useMetaMask();
  // const navigate = useNavigate();

  // useEffect(() => {

  //   if (account) {
  //     navigate("/profile");
  //   }

  // }, [
  //   account
  // ])
  useEffect(()=>{
    localStorage.setItem('searchValue','') ;

  },[])
  return (
    <>
      <div>
        <GlobalStyles />
        <section
          className="jumbotron breadcumb no-bg"
          style={{ backgroundImage: `url(${"./img/background/banners/backup2.jpg"})` }}
        >
          <div className="mainbreadcumb">
            <div className="custom-container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">Wallet</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="custom-container">
          <Wallet />
        </section>
      </div>
    </>
  )

}

export default WalletPage;
