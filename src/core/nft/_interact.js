import { pinJSONToIPFS } from "./pinata.js";
import { Axios } from "../axios";
import Web3 from 'web3';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
require("dotenv").config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("./abis/Voxel.json");
const VoxelTokenABI = require("./abis/Voxel.json");
const VoxelxCollectionABI = require("./abis/VoxelxCollection.json");
const SK721CollectionABI = require("./abis/SK721Collection.json");
const Extenal721CollectionABI = require("./abis/Extenal721contract.json") ;
const SKMarketPlaceABI = require("./abis/SKMarketPlace.json");
const tokenAddress = "0x73a72fFe2a551399CbcD89751fD7Fe08cc39e368";
const voxelxCollectionAddress = "0x128a527883514439e5521f7f2aa867c1669f18a7";
const collectionAddress = "0x92d68627c2CF44eBD1D1BB0901f414B82a7ba098";
// const collectionAddress = "0xbaE91591180E525af4796F7256BEa3946C0D6eB3";
// const contractAddress = "0x9f61bcc7eeba9ba6185057da6417be157aa319ce";
const contractAddress = "0xC9dB3b61eB85834Cb5064D52E5cd1dCa35C71b1C";

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3("alchemyKey");

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Fill in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, name, description) => {
  if (url.trim() === "" || name.trim() === "" || description.trim() === "") {
    return {
      success: false,
      status: "Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = {};
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new Web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};

export const addWalletListener = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.on({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const signWallet = async (account, library) => {
  try {

    const { data } = await Axios({
      url: `/api/users/connect?public_address=${account}`,
    });

    if (data["nonce"]) {
      const nonce = data["nonce"];
      const signature = await library?.eth.personal.sign(
        `Welcome to VoxelX!
This request will not trigger a blockchain transaction or cost any gas fees.
Your authentication status will reset after 24 hours.
Wallet address:${account}
Nonce:${nonce}`,
        account
      );

      if (signature) {

        const { data } = await Axios.post(
          `/api/auth`,
          {
            public_address: account,
            signature: signature,
          }
        );

        if (data) {
          const accessToken = data["accessToken"];
          return accessToken;
        }
      }
    }
  }
  catch {
    return null
  }

  return null;
}

export const handleSwitchChain = async () => {
   // MetaMask injects the global API into window.ethereum
 if (window.ethereum) {
  try {
    // check if the chain to connect to is installed
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x4',
                rpcUrl: 'https://api.mycryptoapi.com/eth/',
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    // alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    Swal.fire({
      title: 'Oops...',
      text: 'MetaMask is not installed. Please consider installing it',
      icon: 'error',
      confirmButtonText: 'Close',
      timer: 5000,
customClass: 'swal-height'
    }).then(({value}) => {
      // window.location.href = 'https://metamask.io/download.html';
      window.open(`https://metamask.io/download.html`, '_blank', );

    })
    
  } 
}

export const getBalance = async (acc) => {
  const web3 = new Web3(window.ethereum)
  const contract = new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const balance = await contract.methods.balanceOf(acc).call();
  const decimal = await contract.methods.decimals().call();
  let result = (balance / Math.pow(10, decimal)).toString();
  if (result) {
    return result;
  }
}
export const getBalanceLive = async (acc) => {
  const web3 = new Web3(window.ethereum)
  const contract = new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const balance = await contract.methods.balanceOf(acc).call();
  const decimal = await contract.methods.decimals().call();
  let result = (balance / Math.pow(10, decimal)).toString();
  if (result) {
    return result;
  }
}

export const getNetwork = async () => {
  if (window.ethereum) {
    const chainId = window.ethereum.networkVersion;
    return chainId;
  }
}

export const getListAction = async (param, data, rowData , datas ) => {
  const header = param[0];
  const owner = param[1];
  const chainType = param[2];
  const infoData = data;
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const deadline = Date.now() + 30;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);


  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = collectionAddress;
  } else {
    collectionContract = datas.collection.contract_address;
  }
  const contract = new web3.eth.Contract(VoxelxCollectionABI, collectionContract);

  if (chainType == "onChain") { 
    let isOperator ;

    isOperator = await contract.methods.isApprovedForAll(owner, operator).call();
    if (!isOperator) {

      const approvedInfo = await contract.methods.setApprovalForAll(operator, true).send({ from: owner });
      if (approvedInfo) {

        return true
      } else {
        return false
      }
    } else {

      return true
    }
  }

  if (chainType == "offChain") {
    const results = await Axios.post(`/api/assets/mint`, rowData, { headers: header });
    const result = results.data;
    // return result ;
    if (result) {
      // const isOperator = await contract.methods.isApprovedForAll(owner, operator).call();

      const mintNft = await marketContract.methods.addItem(collectionContract, result.tokenId, infoData.quantity, result.tokenUri, deadline).send({ from: owner, gas: '800000' });
      
      if (mintNft) { 
        // localStorage.setItem("approve_flg" , true) ;// add for approve
        return true
      } else {
        return false
      }
    }
  }
  
  // return true
}

export const getApprove = async (acc,buy_price) => {
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const VXLTokenContract =  new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const RinkebyContract =  new web3.eth.Contract(VoxelTokenABI, "0x01BE23585060835E02B77ef475b0Cc51aA1e0709");
  const allowance = await VXLTokenContract.methods.allowance(acc, operator).call();
  
  const balance_vxl = await RinkebyContract.methods.balanceOf(acc).call() ;
  // return balance_vxl ;
  // if(balance_vxl == 0) return true ;
  const price = web3.utils.toWei(buy_price.toString(),'ether');
  // return allowance - price ;
  if (allowance - price > 0) {
    return true
  } else {
    const approveTokenRes = await VXLTokenContract.methods.approve(operator, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({ from: acc, gas: '800000' }) ;
    if(approveTokenRes || approveTokenRes.status == true) {
      return true
    } else {
      return false
    }
  }
}
export const isApproved = async (acc) => {
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const VXLTokenContract =  new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const allowance = await VXLTokenContract.methods.allowance(acc, operator).call();
  
  
  if (allowance > 0) {
    return true
  }
  return false ;
}

export const getBuyAction = async (param, datas) => {
  const quantity = 1;
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  const price = web3.utils.toWei(((datas.price / datas.usdPrice).toFixed(2)).toString() ,'ether');
  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = collectionAddress;
  } else {
    collectionContract = datas.collection.contract_address;
  }
  const buyNft = await marketContract.methods.buyItem(collectionContract, datas.owner_of, datas.token_id, quantity, price, param.deadline).send({ from: param.account,  gas: '800000' });
  if (buyNft && buyNft.status == true) {
    return true
  } else {
    return false
  }
}
export const getBuyAction_buyer_auction = async (param, datas,bid_datas) => {
  const quantity = 1;
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  const price = web3.utils.toWei(((bid_datas.price / datas.usdPrice).toFixed(2)).toString() ,'ether');
  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = collectionAddress;
  } else {
    collectionContract = datas.collection.contract_address;
  }
  const buyNft = await marketContract.methods.buyItem(collectionContract, datas.owner_of, datas.token_id, quantity, price, param.deadline).send({ from: param.account,  gas: '800000' });
  if (buyNft && buyNft.status == true) {
    return true
  } else {
    return false
  }
}

export const getAcceptAction = async (param, datas , token_id , datas_voxel) => {
  
  // return true ;
  const quantity = 1;
  const web3 = new Web3(window.ethereum);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  const price = web3.utils.toWei(((datas['price']/ datas_voxel.usdPrice ).toFixed(2)).toString(),'ether');
  let collectionContract;
  if(datas_voxel.is_voxel == true) {
    collectionContract = collectionAddress;
  } else {
    collectionContract = datas_voxel.collection.contract_address;
  }
  const buyNft = await marketContract.methods.acceptItem(collectionContract, datas['bidder']['address'] , token_id , quantity, price,  param.deadline).send({ from: param.account,  gas: '800000' });
  if (buyNft && buyNft.status == true) {
    return true
  } else {
    return false
  }
}

export const signMessage = async (param) => {
  const web3 = new Web3(window.ethereum);
  const account = localStorage.getItem('account');
  let message;
  if (param.type === "fixed") {
    if(param.toDate) {
      const endDate = Math.round(new Date(param.toDate).getTime() / 1000);
      message = `Wallet address:${account} TokenId:${param.tokenId} Price:${param.price} End Date:${endDate}`;
    } else {
      message = `Wallet address:${account} TokenId:${param.tokenId} Price:${param.price}`;
    }
  
    const signature = await web3.eth.personal.sign(
      message,
      account
    );
  
    if (signature) {
      return signature
    }
  }
  if (param.type === "auction") {
    let sDate = Math.round(new Date(param.auction_start_date).getTime() / 1000);
    let eDate = Math.round(new Date(param.auction_end_date).getTime() / 1000);
    let message = `Wallet address:${account} TokenId:${param.tokenId} StartPrice:${param.price} Auction Start Date:${sDate} Auction End Date:${eDate} Method:${param.method}`;
  
    const signature = await web3.eth.personal.sign(
      message,
      account
    );
  
    if (signature) {
      return signature
    }
  }
}