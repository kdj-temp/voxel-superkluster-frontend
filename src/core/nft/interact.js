import { pinJSONToIPFS } from "./pinata.js";
import { Axios } from "../axios";
import Web3 from 'web3';
import Swal from 'sweetalert2';
import { ethers, BigNumber } from 'ethers';
import 'sweetalert2/src/sweetalert2.scss'
// const BigNumber = require('bignumber.js');
require("dotenv").config();


// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("./abis/Voxel.json");
const VoxelTokenABI = require("./abis/Voxel.json");
const VoxelxCollectionABI = require("./abis/VoxelxCollection.json");
const SK721CollectionABI = require("./abis/SK721Collection.json");
const Extenal721CollectionABI = require("./abis/Extenal721contract.json") ;
const Extenal1155CollectionABI = require("./abis/External1155contract.json") ;
const SKMarketPlaceABI = require("./abis/SKMarketPlace.json");
// const tokenAddress = "0x73a72fFe2a551399CbcD89751fD7Fe08cc39e368";
// const tokenAddress = "0x69a0C61Df0ea2d481696D337A09A3e2421a06051";
const tokenAddress = '0x69a0C61Df0ea2d481696D337A09A3e2421a06051';
const voxelxCollectionAddress = "0x128a527883514439e5521f7f2aa867c1669f18a7";
const collectionAddress = "0xf5753aA0757088CF243Ca798299DCf43C4aA584b";
// const collectionAddress = "0xbaE91591180E525af4796F7256BEa3946C0D6eB3";
const contractAddress = '0x04ee3A27D77AB9920e87dDc0A87e90144F6a278C';

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

    if (data["nonce"] != null || data['nonce'] != undefined) {
      const nonce = data["nonce"];
//       const signature_1 = await library?.eth.personal.sign(
//         `Welcome to SuperKluster by Voxel X Network!
// This request will not trigger a blockchain transaction or cost any gas fees.
// Your authentication status will reset after 24 hours.
// Wallet address:${account}
// Nonce:${nonce}`,
//         account
//       );
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [`Welcome to SuperKluster by Voxel X Network!
This request will not trigger a blockchain transaction or cost any gas fees.
Your authentication status will reset after 24 hours.
Wallet address:${account}
Nonce:${nonce}`,
        account]
      });

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

export const handleSwitchChain_1 = async (wallet = 'metamask') => {
   // MetaMask injects the global API into window.ethereum
 if (window.ethereum) {
  try {
    // check if the chain to connect to is installed
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x5' }], // chainId must be in hexadecimal numbers
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
                chainId: '0x5',
                rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
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
    if(wallet != 'metamask') return;
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

export const handleSwitchChain = async (library) => {
  if(!library) return;
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: '0x1' }]
    });
    return true;
  } catch (e) {
    return false;
  }
}

export const getBalance = async (acc, library) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  // const web3 = new Web3(library.provider)
  const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai-infura.wallet.coinbase.com/?targetName=infura-goerli'));
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

export const getListAction = async (param, data, rowData , datas, library ) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const header = param[0];
  const owner = param[1];
  const chainType = param[2];
  const infoData = data;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const deadline = Date.now() + 30;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);

  let res = {status: true, txHash: ''};

  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = datas.contract_address;
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
        res.status = true;
        return res;
      } else {
        res.status = false;
        return res;
      }
    } else {
      res.status = true;
      return res
    }
  }

  if (chainType == "offChain") {
    try {
      const results = await Axios.post(`/api/supply-assets/mint`, rowData, { headers: header });
      // const result = results.data;
      // return result ;
      // if (result) {
        // const isOperator = await contract.methods.isApprovedForAll(owner, operator).call();
        // let supply = localStorage.getItem('ownedSupplyNum');
        // const mintNft = await marketContract.methods.addItem(collectionContract, result.tokenId,  infoData.quantity, result.tokenUri, result.deadline, result.signature).send({ from: owner, gas: '800000' });
        // const mintNft = await marketContract.methods.addItem(result.collectionAddr, result.tokenId,  supply, result.tokenUri, result.deadline, result.signature).send({ from: owner, gas: '800000' });
        // if (mintNft) { 
        //   // localStorage.setItem("approve_flg" , true) ;// add for approve
        //   res.txHash = mintNft.transactionHash;
        //   return res;
        // } else {
        //   res.status = false;
        //   return res;
        // }
      // }
    } catch (err) {
      Swal.fire({
        title: 'Oops...',
        text: err.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Close',
        timer: 5000,
        customClass: 'swal-height'
      })
    }
  }
  
  // return true
}

export const getApprove = async (acc, library, buy_price = 0) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const VXLTokenContract =  new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const allowance = await VXLTokenContract.methods.allowance(acc, operator).call();
  
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
export const isApproved = async (acc, library) => {
  // const _library = getMetamaskLibrary();
  // if(!library) library = _library;
  // const web3 = new Web3(library.provider);
  const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai-infura.wallet.coinbase.com/?targetName=infura-goerli'));
  const operator = contractAddress;
  const VXLTokenContract =  new web3.eth.Contract(VoxelTokenABI, tokenAddress);
  const allowance = await VXLTokenContract.methods.allowance(acc, operator).call();
  
  
  if (allowance > 0) {
    return true
  }
  return false ;
}

export const getBuyAction = async (ethOption, library, account, datas, creator, price, quantity, royaltyAmount, deadline, signature, shouldMint, tokenURI, mintQty, collectionAddr = null, seller = null) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  let _price = BigNumber.from(price.hex);
  _price = _price.mul(quantity);
  // const price = web3.utils.toWei(((datas.price / datas.usdPrice).toFixed(2)).toString() ,'ether');
  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = datas.contract_address;
  } else {
    collectionContract = datas.collection.contract_address;
  }
  if(collectionAddr) collectionContract = collectionAddr;
  if(!datas.royalty_address || datas.royalty_address == '') {
    datas.royalty_address = ethers.constants.AddressZero;
  }
  
  if(seller) datas.owner_of = seller;

  let buyNft;
  if(!ethOption) buyNft = await marketContract.methods.buyItem(collectionContract, datas.owner_of, creator, datas.token_id, quantity, price, royaltyAmount, mintQty, tokenURI, shouldMint, deadline, signature).send({ from: account,  gas: '800000' });
  else {
    buyNft = await marketContract.methods.buyItemWithETH(collectionContract, datas.owner_of, creator, datas.token_id, quantity, price, royaltyAmount, mintQty, tokenURI, shouldMint, deadline, signature).send({ from: account,  gas: '800000', value: _price.toString() });
  }
  if (buyNft && buyNft.status == true) {
    return buyNft.transactionHash;
  } else {
    return '0x0';
  }
}

export const getBuyAction_buyer_auction = async (ethOption, library, account, datas, creator, price, royaltyAmount, deadline, signature, shouldMint, tokenURI, mintQty) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const quantity = 1;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  let _price = BigNumber.from(price.hex);
  _price = _price.mul(quantity);
  // const price = web3.utils.toWei(((bid_datas.price / datas.usdPrice).toFixed(2)).toString() ,'ether');
  let collectionContract;
  if(datas.is_voxel == true) {
    collectionContract = datas.contract_address;
  } else {
    collectionContract = datas.collection.contract_address;
  }
  if(datas.royalty_address == null || datas.royalty_address == '') {
    datas.royalty_address = ethers.constants.AddressZero;
  }
  let buyNft;
  if(!ethOption) buyNft = await marketContract.methods.buyItem(collectionContract, datas.owner_of, creator, datas.token_id, quantity, price, royaltyAmount, mintQty, tokenURI, shouldMint, deadline, signature).send({ from: account,  gas: '800000' });
  else buyNft = await marketContract.methods.buyItemWithETH(collectionContract, datas.owner_of, creator, datas.token_id, quantity, price, royaltyAmount, mintQty, tokenURI, shouldMint, deadline, signature).send({ from: account,  gas: '800000', value: _price.toString()  });
  if (buyNft && buyNft.status == true) {
    return buyNft.transactionHash;
  } else {
    return '0x0';
  }
}

export const getAcceptAction = async (library, account, datas , token_id , datas_voxel, signedData) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  // return true ;
  const quantity = signedData._quantity;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  let collectionContract = signedData._collection;
  if(datas_voxel.royalty_address == null || datas_voxel.royalty_address == '') {
    datas_voxel.royalty_address = ethers.constants.AddressZero;
  }
  const buyNft = await marketContract.methods.acceptItem(collectionContract, datas['bidder']['address'], signedData.creator, token_id, quantity, signedData._price, signedData._royaltyAmount, signedData.mintQty, signedData.tokenURI, signedData.shouldMint, signedData._deadline, signedData.signature).send({ from: account,  gas: '800000' });
  if (buyNft && buyNft.status == true) {
    return buyNft.transactionHash;
  } else {
    return "0x0";
  }
}

export const signMessage = async (param, library) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const account = localStorage.getItem('account');
  let message;
  if (param.type === "fixed") {
    if(param.toDate) {
      const endDate = Math.round(new Date(param.toDate).getTime() / 1000);
      message = `Wallet address:${account} TokenId:${param.tokenId} Price:${param.price} End Date:${endDate}`;
    } else {
      message = `Wallet address:${account} TokenId:${param.tokenId} Price:${param.price}`;
    }
  
    const signature = await library.provider.request({
      method: "personal_sign",
      params: [message, account]
    });
  
    if (signature) {
      return signature
    }
  }
  if (param.type === "auction") {
    let sDate = Math.round(new Date(param.auction_start_date).getTime() / 1000);
    let eDate = Math.round(new Date(param.auction_end_date).getTime() / 1000);
    let message = `Wallet address:${account} TokenId:${param.tokenId} StartPrice:${param.price} Auction Start Date:${sDate} Auction End Date:${eDate} Method:${param.method}`;
  
    const signature = await library.provider.request({
      method: "personal_sign",
      params: [message, account]
    });
  
    if (signature) {
      return signature
    }
  }
}

export const transterItem = async (library, from, to, tokenId, supply, collectionAddr, chainId, is_721) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  if(collectionAddr == null) return "0x0";
  let collectionContract = new web3.eth.Contract(Extenal721CollectionABI, collectionAddr);
  if(!is_721) {
    collectionContract = new web3.eth.Contract(Extenal1155CollectionABI, collectionAddr);
  }
  let transferNft;
  if(is_721) {
    transferNft = await collectionContract.methods.transferFrom(from, to, tokenId).send({ from: from,  gas: '800000' });
  }
  else {
    transferNft = await collectionContract.methods.safeTransferFrom(from, to, tokenId, supply, '0x0').send({from: from, gas: '800000'});
  }
  if (transferNft && transferNft.status == true) {
    return transferNft.transactionHash;
  } else {
    return "0x0";
  }
}

export const getMetamaskLibrary = () => {
  let provider;
  if(window.ethereum.providers) {
    provider = window.ethereum.providers.find(provider => provider.isMetaMask && !provider.isBitKeep);
  } else {
    provider = window.ethereum;
  }
  const data = {
    provider : provider
  };
  return data;
}

export const getRoyalties = async (account, library) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  // const web3 = new Web3(library.provider);
  const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai-infura.wallet.coinbase.com/?targetName=infura-goerli'));
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  // console.log("before royalty");
  let royalties = await marketContract.methods.getClaimRoyalty().call({from:account});

  // console.log("after royalty");
  let _royaltiesVXL = BigNumber.from(royalties[0]);
  if (!_royaltiesVXL.eq(BigNumber.from('0'))) {
    _royaltiesVXL = ethers.utils.formatEther(_royaltiesVXL);
  }
  let _royaltiesETH = BigNumber.from(royalties[1]);
  if (!_royaltiesETH.eq(BigNumber.from('0'))) {
    _royaltiesETH = ethers.utils.formatEther(_royaltiesETH);
  }
  return {royalty_vxl: _royaltiesVXL, royalty_eth: _royaltiesETH};
}

export const claimRoyalties = async (account, library) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);

  await marketContract.methods.claimRoyalty(account).send({ from: account,  gas: '800000' });
}

export const batchTransfer = async (library, itemList, collections, 
  pinkAddr, 
  greenAddr, 
  blueAddr, 
  orangeAddr, 
  aquaAddr, 
  dredAddr, 
  oliveAddr, 
  dgrayAddr,
  dgreenAddr,
  mpurpleAddr, 
  account) => {
  try {
    const _library = getMetamaskLibrary();
    if(!library) library = _library;
    const web3 = new Web3(library.provider);
    const operator = contractAddress;
    const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);

    let receiverPink = {};
    let receiverBlue = {};
    let receiverGreen = {};
    let receiverOrange = {};
    let receiverAqua = {};
    let receiverDred = {};
    let receiverOlive = {};
    let receiverDgray = {};
    let receiverDgreen = {};
    let receiverMpurple = {};

    receiverPink.receiver = pinkAddr;
    receiverBlue.receiver = blueAddr;
    receiverGreen.receiver = greenAddr;
    receiverOrange.receiver = orangeAddr;
    receiverAqua.receiver = aquaAddr;
    receiverDred.receiver = dredAddr;
    receiverOlive.receiver = oliveAddr;
    receiverDgray.receiver = dgrayAddr;
    receiverDgreen.receiver = dgreenAddr;
    receiverMpurple.receiver = mpurpleAddr;

    receiverBlue.collections = [];
    receiverPink.collections = [];
    receiverGreen.collections = [];
    receiverOrange.collections = [];
    receiverAqua.collections = [];
    receiverDred.collections = [];
    receiverOlive.collections = [];
    receiverDgray.collections = [];
    receiverDgreen.collections = [];
    receiverMpurple.collections = [];

    let pinkCnt = 0;
    let blueCnt = 0;
    let greenCnt = 0;
    let orangeCnt = 0;
    let aquaCnt = 0;
    let dredCnt = 0;
    let oliveCnt = 0;
    let dgrayCnt = 0;
    let dgreenCnt = 0;
    let mpurpleCnt = 0;

    for (let i = 0; i < itemList.length; i ++) {
      
      let collectionInfo = {};
      collectionInfo.collection = itemList[i][2];
      collectionInfo.batch = itemList[i][3];
      collectionInfo.tokenIds = [itemList[i][1]];
      collectionInfo.quantities = [1];

      if(itemList[i][5] == 'pink') {
        receiverPink.collections.push(collectionInfo);
        pinkCnt ++;
      }
      if(itemList[i][5] == 'green') {
        receiverGreen.collections.push(collectionInfo);
        greenCnt ++;
      }
      if(itemList[i][5] == 'blue') {
        receiverBlue.collections.push(collectionInfo);
        blueCnt ++;
      }
      if(itemList[i][5] == 'orange') {
        receiverOrange.collections.push(collectionInfo);
        orangeCnt ++;
      }
      if(itemList[i][5] == 'aqua') {
        receiverAqua.collections.push(collectionInfo);
        aquaCnt ++;
      }
      if(itemList[i][5] == 'dred') {
        receiverDred.collections.push(collectionInfo);
        dredCnt ++;
      }
      if(itemList[i][5] == 'olive') {
        receiverOlive.collections.push(collectionInfo);
        oliveCnt ++;
      }
      if(itemList[i][5] == 'dgray') {
        receiverDgray.collections.push(collectionInfo);
        dgrayCnt ++;
      }
      if(itemList[i][5] == 'dgreen') {
        receiverDgreen.collections.push(collectionInfo);
        dgreenCnt ++;
      }
      if(itemList[i][5] == 'mpurple') {
        receiverMpurple.collections.push(collectionInfo);
        mpurpleCnt ++;
      }
    }

    let callData = [];
    if(pinkCnt) callData.push(receiverPink);
    if(greenCnt) callData.push(receiverGreen);
    if(blueCnt) callData.push(receiverBlue);
    if(orangeCnt) callData.push(receiverOrange);
    if(aquaCnt) callData.push(receiverAqua);
    if(dredCnt) callData.push(receiverDred);
    if(oliveCnt) callData.push(receiverOlive);
    if(dgrayCnt) callData.push(receiverDgray);
    if(dgreenCnt) callData.push(receiverDgreen);
    if(mpurpleCnt) callData.push(receiverMpurple);
    
    const batchTransfer = await marketContract.methods.bundleTransfer(callData).send({ from: account,  gas: '800000' });
    return batchTransfer.transactionHash;
  } catch (e) {
    if(e.code == 4001) return '4001';
    return '0x0';
  }
}

export const isApprovedForBatchTransfer = async (library, collections, account) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  for (let i = 0 ; i < collections.length; i ++) {
    const contract = new web3.eth.Contract(VoxelxCollectionABI, collections[i]);
    const isOperator = await contract.methods.isApprovedForAll(account, operator).call();
    if(isOperator == true) continue;
    return false;
  }
  return true;
}

export const approveForBatchTransfer = async (library, collections, account) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  for (let i = 0 ; i < collections.length; i ++) {
    const contract = new web3.eth.Contract(VoxelxCollectionABI, collections[i]);
    const isOperator = await contract.methods.isApprovedForAll(account, operator).call();
    if(isOperator == true) continue;
    const approvedInfo = await contract.methods.setApprovalForAll(operator, true).send({ from: account });
  }
}

export const setReveal = async (library, collectionAddr, revealUrl, signedData, account) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  const setReveal = await marketContract.methods.setReveal(collectionAddr, revealUrl, signedData.deadline, signedData.signature).send({ from: account,  gas: '800000' });
  return setReveal.transactionHash;
}

export const buyCart = async (ethOption, library, sellers, _cartPrice, _payload, deadline, _signature, account) => {
  const _library = getMetamaskLibrary();
  if(!library) library = _library;
  const web3 = new Web3(library.provider);
  const operator = contractAddress;
  const marketContract = new web3.eth.Contract(SKMarketPlaceABI, operator);
  for (let i = 0; i < sellers.length; i ++) {
    sellers[i].price = sellers[i].price.hex;
  }
  _cartPrice = _cartPrice.hex;

  let buyCart;
  if(ethOption) buyCart = await marketContract.methods.buyCartWithETH(sellers, _cartPrice, _payload, deadline, _signature).send({ from: account,  gas: '800000', value: _cartPrice });
  else buyCart = await marketContract.methods.buyCart(sellers, _cartPrice, _payload, deadline, _signature).send({ from: account,  gas: '800000' });
  return buyCart.transactionHash;
}