/* This example requires Tailwind CSS v2.0+ */
import moment from 'moment'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PayRequest from './PayRequest'
import AddTransactionCard from './AddTransactionCard'
const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]
  
  export default function RequestsToMeTable({myRequestsSorted}) {
    const [pay, setPay] = useState(false)
    const [requestInfo, setRequestInfo] = useState({})

    const sendToPaymentDetailsPage = (request) =>{
      setPay(true)
      setRequestInfo(request)
    }
    const [ETHPrice, setETHPrice] = useState('')
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

    if(!pay) {return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Request From 
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Remark
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Time of Request
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Pay</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {myRequestsSorted.map((request) => (
                      <tr key={request._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            {/* <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={person.requestToName} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{request.requestFromName}</div>
                              <div className="text-gray-500"><a href={`https://etherscan.io/address/${request.requestFromAddress}`}>{request.requestFromAddress}</a></div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{request.remark}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {parseFloat(request.amountETH).toFixed(2)} ETH
                          </span>
                          <div className="text-gray-500 text-xs ml-2">${(request.amountETH * ETHPrice).toFixed(2)}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <time dateTime={request.createdAt}>{moment(request.createdAt).fromNow()}</time>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button onClick={()=>sendToPaymentDetailsPage(request)} className="text-indigo-600 hover:text-indigo-900">
                            Pay<span className="sr-only">, {request._id}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) } else return (<PayRequest request={requestInfo} ETHPrice={ETHPrice}/>)
  }
  