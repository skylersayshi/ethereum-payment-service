import { Fragment, useState, useEffect } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { UsersIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../requests/actions/users'
import { createRequest } from '../requests/actions/requests'
import { setGlobalState, useGlobalState } from '../store'
import { CheckCircleIcon } from '@heroicons/react/solid'
import StatusBar from './StatusBar'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RequestPayment() {

    const [userWalletAddress] = useGlobalState('walletAddress')
    const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null) 
    const allUsers = useSelector((state)=> state.users)   
    const dispatch = useDispatch()
    const [statusBar, setStatusBar] = useState(false)
    useEffect(()=>{
        dispatch(getUsers())
    }, [])
  
    const [requestData, setRequestData] = useState({
          requestToName: '',
          requestToAddress: '',
          requestFromName: '',
          requestFromAddress: '',
          amountETH: '',
          remark: ''
    })

    const clear = () =>{
      setRequestData({
          requestToName: '',
          requestToAddress: '',
          requestFromName: '',
          requestFromAddress: '',
          amountETH: '',
          remark: ''
      })
    }
  
    useEffect(()=>{
          if(userProfile) setRequestData(prev =>({...prev.requestData, requestFromAddress: userProfile.walletAddress, requestFromName: userProfile.name}));
    }, [userProfile])
  
    const handleSubmit = async (event) =>{
        event.preventDefault();  
        dispatch(createRequest({...requestData}))
        setStatusBar(true)
        clear()
    }

    const [query, setQuery] = useState('')

    const [open, setOpen] = useState(true)

    const [slider, setSlider] = useGlobalState('falseState')

    const changeMultipleStates = () =>{
      setSlider(!slider)
      setOpen(!open)
      setStatusBar(!statusBar)
    }

    const filteredPeople =
        query === ''
        ? []
        : allUsers.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase()) || person.walletAddress.toLowerCase().includes(query.toLowerCase())
            })

    

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={changeMultipleStates}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox>                              
               {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <SearchIcon
                        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search by user or wallet address..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    {( filteredPeople.length > 0) && (
                      <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                        <div
                          className={classNames(
                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                            activeOption && 'sm:h-96'
                          )}
                        >
                          <div className="-mx-2 text-sm text-gray-700">
                            {(filteredPeople).map((person) => (
                              <Combobox.Option
                                as="div"
                                // key={person.id}
                                value={person}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center rounded-md p-2',
                                    active && 'bg-gray-100 text-gray-900'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <img src={person?.profilePic} alt="" className="h-6 w-6 flex-none rounded-full" />
                                    <span className="ml-3 flex-auto truncate">{person?.name}</span>
                                    {active && (
                                      <ChevronRightIcon
                                        className="ml-3 h-5 w-5 flex-none text-gray-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </div>
                        </div>
                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            <div className="flex-none p-6 text-center">
                              <img src={activeOption?.profilePic} alt="" className="mx-auto h-16 w-16 rounded-full" />
                              <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                              <p className="text-sm leading-6 text-gray-500">{activeOption?.bio}</p>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6">
                              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                <dt className="col-end-1 font-semibold text-gray-900">Twitter</dt>
                                <dd className="truncate">
                                  <a href={`https://twitter.com/${activeOption.twitter}`} className="text-indigo-600 underline">
                                    @{activeOption.twitter}
                                  </a>
                                </dd>
                                <dt className="col-end-1 font-semibold text-gray-900">Etherscan</dt>
                                <dd className="truncate">
                                  <a href={`https://etherscan.io/address/${activeOption.walletAddress}`} className="text-indigo-600 underline">
                                    {activeOption.walletAddress}
                                  </a>
                                </dd>
                                
                              </dl>
                            



                            <div className="mt-8">
                                <div className="mt-6">
                                {statusBar ? (
                                  <div>
                                    <StatusBar />
                                    <button
                                        className="w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={()=>changeMultipleStates()}
                                    >
                                      Close
                                    </button>
                                  </div>

                                ) : (
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
                                                onChange={(e)=>{setRequestData({...requestData, amountETH: e.target.value, requestToAddress: activeOption.walletAddress, requestToName: activeOption.name})}}
                                                />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                    ETH
                                                </span>
                                            </div>
                                        </div>
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
                              )}
                                </div>
                                </div>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}

                    {query!=='' && filteredPeople.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                        <p className="mt-4 font-semibold text-gray-900">No people found</p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try again.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
