import './App.css';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './redux/store'
import { loadBlockchain } from "./redux/slices/we3ConnectSlice"

function App() {
  const dispatch = useAppDispatch();

  const {web3, accounts, contract} = useAppSelector((state) => state.web3Connect)
  console.log("Web3", web3);
  // console.log("accounts", accounts);
  // console.log("contract", contract);

  const handleWeb3Connect = () =>{
    console.log("clicked");
    dispatch(loadBlockchain());
  }

  return (
    <div className="App">
      Hello World
      <button onClick={() =>handleWeb3Connect()}>
        Connect Wallet
      </button>
      
    </div>
  );
}

export default App;

