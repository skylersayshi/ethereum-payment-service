import { useState, useEffect } from 'react';
import { PaperClipIcon } from '@heroicons/react/solid'
import { useGlobalState, setGlobalState } from '../store'
import { sendMoney } from '../shared/Transaction'
import { deleteRequest } from '../requests/actions/requests'
import { createTransaction } from '../requests/actions/transactions'
import { useDispatch } from 'react-redux'

export default function PayRequest({request, ETHPrice}) {

    const [connectedAccount, setConnectedAccount] = useGlobalState('walletAddress')
    const [address, setAddress] = useState(request.requestFromAddress)
    const [amount, setAmount] = useState(request.amountETH)
    const [remark, setRemark] = useState(request.remark)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (!address || !amount || !remark) return
        setLoading(true)
    
        sendMoney({ connectedAccount, address, amount, remark })
          .then(() => {
            setGlobalState('transaction', { address, amount, remark })
            dispatch(createTransaction({
                senderName: request.requestToName,
                senderAddress: request.requestToAddress,
                receiverName: request.requestFromName,
                receiverAddress: request.requestFromAddress,
                amountETH: request.amountETH,
                remark: request.remark
            }))
            dispatch(deleteRequest(request._id))
            setLoading(false)
            setSuccess(true)
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
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Details</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Recipient</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{request.requestFromName}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{request.requestFromName}'s address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{request.requestFromAddress}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sender</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">You</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Your address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{request.requestToAddress}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Remark</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{request.remark}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{request.amountETH} ETH = ${(request.amountETH * ETHPrice).toFixed(2)}</dd>
          </div>
          <div className="inline-flex bg-white px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-gray-500"></div>
            {/* <button
                onClick={handleSubmit}
                type="button"
                className="grid-cols-1 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Pay {request.amountETH} ETH to {request.requestFromName}
            </button> */}
            {!loading ? (
              <button
                type="submit"
                onClick={handleSubmit}
                className="grid-cols-1 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {!success ? `Pay ${request.amountETH} ETH to ${request.requestFromName}` : 'Success!'}
              </button>
            ) : (
              <button
                className="grid-cols-1 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled
              >
                Sending...
              </button>
            )}
          </div>
        </dl>
      </div>
    </div>
  )
}
