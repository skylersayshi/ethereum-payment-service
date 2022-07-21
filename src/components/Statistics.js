import { useGlobalState, setGlobalState } from "../store";
import axios from 'axios';
import { useEffect, useState } from "react";
  
  export default function Statistics({totalFollowers, totalTransactions}) {
    const [balance] = useGlobalState('userBalance')
    const balanceRounded = parseFloat(balance).toFixed(2)
    const [ETHPrice, setETHPrice] = useState('')
    const USDRate = (ETHPrice*balanceRounded).toFixed(2)

    const getUSDPrice = async () =>{
    axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
        .then(response => {
        console.log(response.data.data.amount);
        setETHPrice(response.data.data.amount)
        console.log('conversion rate: ' + ETHPrice)
    });
    }

    useEffect(()=>{
        getUSDPrice()
    }, [])

    return (
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm mb-1 font-medium text-gray-500 truncate">Account Balance</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 inline">{balanceRounded}  
                <img
                    className="w-6 h-6 mb-1 ml-2 object-contain inline cursor-pointer"
                    src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                    alt="Ethereum Logo"
                    />
              </dd>
              <div className="text-xs font-medium text-gray-500 truncate">${USDRate}</div>

            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Followers</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalFollowers}</dd>
              <div className="text-xs font-medium text-gray-500 truncate">Note: You can only request your followers</div>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalTransactions}</dd>
            </div>
        </dl>
      </div>
    )
  }
  