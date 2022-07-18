import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState, useGlobalState } from '../store';
import { createRequest } from "../requests/api";
import { getUsers } from "../requests/actions/users";
import axios from "axios";
import store from '../redux/store';


const RequestForm = () =>{
  const [userWalletAddress, setUserWalletAddress] = useState(0)
  const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null) 
  const allUsers = useSelector((state)=> state.users)   
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getUsers())
      setUserWalletAddress(JSON.parse(localStorage.getItem('globalWalletAddress')))
  }, [])

    const [requestData, setRequestData] = useState({
        requestToName: '',
        requestToAddress: '',
        requestFromName: '',
        requestFromAddress: '',
        amountETH: '',
        remark: ''
    })

    useEffect(()=>{
        if(userProfile) setRequestData(prev =>({...prev.requestData, requestFromAddress: userProfile.walletAddress, requestFromName: userProfile.name}));
    }, [userProfile])

    const handleSubmit = async (event) =>{
      event.preventDefault();  
      dispatch(createRequest({...requestData}))
      clear()
    }

    const clear = () => {
      setRequestData({
        requestToName: '',
        requestToAddress: '',
        requestFromName: '',
        requestFromAddress: '',
        amountETH: '',
        remark: ''
      })
    }
    

return(
    <>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  start your 14-day free trial
                </a>
              </p>
            </div>

            <div className="mt-8">

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div>


                            <label htmlFor="amountETH" className="block text-sm font-medium text-gray-700">
                            Request Amount
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                type="text"
                                name="amountETH"
                                id="amountETH"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                value={requestData.amountETH}
                                onChange={(e)=>{setRequestData({...requestData, amountETH: e.target.value})}}
                                />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    ETH
                                </span>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="requestToName" className="block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <div className="mt-1">
                        <input
                            type="text" 
                            id="requestToName" 
                            name="requestToName"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search by Name"
                            value={requestData.requestToName}
                            onChange={(e)=>{setRequestData({...requestData, requestToName: e.target.value})}}
                        />                     
                    </div>

                    <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
                      For
                    </label>
                    <div className="mt-1">
                        <input
                            type="text" 
                            id="remark" 
                            name="remark"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="What's it for?"
                            value={requestData.remark}
                            onChange={(e)=>{setRequestData({...requestData, remark: e.target.value})}}
                        />                     
                    </div>

                    <div>
                        <h1>Currently logged in as {requestData.requestFromName}</h1>
                        <p>Wallet Address: {requestData.requestFromAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div> */}
      </div>
    </> 
)

}

export default RequestForm