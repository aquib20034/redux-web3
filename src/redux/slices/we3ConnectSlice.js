import Web3 from "web3";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/contract";

export const initialState ={
    web3:null,
    contract:null,
    accounts:[],
    web3LoadingErrorMsg: null
}

//web3      
//contract 
//accounts

export const loadBlockchain = createAsyncThunk("loadBlockchain", async(_, thunkAPI) => {
    try{
        // "0x4" rinkeby
        if(Web3.givenProvider && Web3.givenProvider.chainId == "0x4"){
            await Web3.givenProvider.enable();
            
            const web3      = new Web3(Web3.givenProvider);
            console.log("Web3", web3);

            const contract  = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
            const accounts  = await web3.eth.getAccounts();

            return {
                web3,
                accounts,
                contract
            }
        }else{
            return{
                web3LoadingErrorMsg: "error in connecting wallet"
            }
        } 

    }catch(error){
        console.log("Error", error);
    }

})


const web3ConnectSlice = createSlice({
    name:"web3Connect",
    initialState,
    reducers:{},
    extraReducers:{
        [loadBlockchain.fulfilled.toString()]:(
            state, 
            {payload}
        ) => {
            state.web3 = payload ?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;


        }
    }
})


export const web3Reducer = web3ConnectSlice.reducer;