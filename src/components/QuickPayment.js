import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../requests/actions/users'
import { createRequest } from '../requests/actions/requests'
import { setGlobalState, useGlobalState } from '../store'
import { CheckCircleIcon } from '@heroicons/react/solid'
import StatusBar from './StatusBar'
import { sendMoney } from '../shared/Transaction'
import { createTransaction } from '../requests/actions/transactions'
import axios from 'axios'

export default function QuickPayment({quickPay, setQuickPay, userProfile}) {
    
    const [connectedAccount] = useGlobalState('walletAddress')
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [remark, setRemark] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()

    if(address && amount && remark){
        console.log('loaded values')
    }

    const [ETHPrice, setETHPrice] = useState('')

    const getUSDPrice = async () =>{
    axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
        .then(response => {
        setETHPrice(response.data.data.amount)
    });
    }

    useEffect(()=>{
        getUSDPrice()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!address || !amount || !remark) return
        setLoading(true)
    
        sendMoney({ connectedAccount, address, amount, remark })
          .then(() => {
            setGlobalState('transaction', { address, amount, remark })
            dispatch(createTransaction({
                senderName: userProfile.name,
                senderAddress: userProfile.walletAddress,
                receiverName: 'Anonymous',
                receiverAddress: address,
                amountETH: amount,
                remark: remark
            }))
            setLoading(false)
            resetForm()
          })
          .catch((error) => {
            setLoading(false)
            console.log(error)
          })
    }

    const resetForm = () => {
        setAddress('')
        setAmount('')
        setRemark('')
    }

  return (
    <>
      {quickPay ? (
    <>
    <div
    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
    <div className="relative w-auto my-6 mx-auto max-w-3xl">        
        <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                  Recipient
                </label>
                <div className="mt-1">
                  <input
                    id="recipient"
                    name="recipient"
                    type="text"
                    required
                    placeholder="Recipient wallet address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">
                            <img
                                className="w-4 h-4 pb-1 object-contain inline cursor-pointer"
                                src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                                alt="Ethereum Logo"
                            />
                        </span>
                    </div>
                    <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00 ETH"
                    aria-describedby="price-currency"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                            ETH
                        </span>
                    </div>
                </div>
                <div className="block text-sm font-medium text-gray-700">${(ETHPrice*amount).toFixed(2)}</div>
            </div>

            <div>
                <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
                  Remark
                </label>
                <div className="mt-1">
                  <input
                    id="remark"
                    name="remark"
                    type="text"
                    required
                    placeholder="Reason for payment"
                    value={remark}
                    onChange={(e)=>setRemark(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
            </div>

              <div>
                {!loading ? (
                <div>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Send Payment
                    </button>
                    <button 
                        onClick={()=>setQuickPay(false)}
                        className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-600"
                    >
                        Back
                    </button>
                </div>
                ) : (
                    <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-200 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sending...
                  </button> 
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    </div>
        
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
) : null}
    </>
  );
}