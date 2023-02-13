import { Transaction } from '@meshsdk/core';
import React from "react";
import { BlockfrostProvider } from '@meshsdk/core';

export default function TransactionForm({wallet}){
const blockfrostProvider = new BlockfrostProvider('previewbPomiIFdHpUDPrKZVUeTkGaLTl0We46Y');
const [toAddress, setToAddress] = React.useState("");
const [ammount, setAmmount] = React.useState("");
const [message, setMessage] = React.useState("");

const handleAddress = (event) => {
    setToAddress(event.target.value);
  };
const handleAmmount = (event) => {
    setAmmount(event.target.value);
  };

const sendAda = async (toAddress,ammount,wallet) => {  

    const tx = new Transaction({ initiator: wallet })
    .sendLovelace(
        toAddress,
        ammount
    )
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash)
    await blockfrostProvider.submitTx(signedTx)
    
    
    await blockfrostProvider.onTxConfirmed(txHash, () => {
        setMessage("Transaction Confirmed")
      });
};



return(
    <div>
        <label htmlFor="first">Address To:</label>
        <input type="Address" value={toAddress} onChange={handleAddress} id="first" name="first" />
        <label htmlFor="last">Amount:</label>
        <input type="Amount" value={ammount} onChange={handleAmmount} id="last" name="last" />
        <button
         onClick={() => sendAda(toAddress,ammount,wallet)}>
          Submit</button>
          <p>{message}</p>
      </div>
)
}