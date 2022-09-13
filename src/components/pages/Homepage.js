import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Tab, Transition } from '@headlessui/react'
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
  LocationMarkerIcon,
  UserIcon
} from '@heroicons/react/outline'
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { setGlobalState, useGlobalState } from '../../store';
import { getUsers } from '../../requests/actions/users';
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import useBeforeRender from '../../utils/utils'
import RequestPayment from '../RequestPayment'
import Tabuler from '../Tabular'
import Statistics from '../Statistics'
import StatusBar from '../StatusBar'
import { fetchTransactions } from '../../requests/actions/transactions'
import QuickPayment from '../QuickPayment'
import SendPayment from '../SendPayment'
import LoadingBar from '../LoadingBar'

const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: false },
  { name: 'Requests To Me', href: '/requeststome', icon: CreditCardIcon, current: false },
  { name: 'Requests From Me', href: '/requestsfromme', icon: CreditCardIcon, current: false },
  { name: 'Find Users', href: '/findusers', icon: UserGroupIcon, current: false },
  { name: 'View Profile', href: '/profile', icon: UserIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Edit Public Profile', href: '/editprofile', icon: CogIcon },
  // { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  // { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Homepage() {
    const [viewUserProfile, setViewUserProfile] = useGlobalState('viewUserProfile')
    const [userWalletAddress] = useGlobalState('walletAddress')
    // const [globalAccountBalance] = useGlobalState('userBalance')
    // const [userWalletAddress, setUserWalletAddress] = useState(globalWalletAddress)
    const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null)
    const allTransactions = useSelector((state)=> state.transactions)
    const userTransactions = allTransactions.filter((transaction => transaction.senderAddress === userWalletAddress || transaction.receiverAddress === userWalletAddress))  
    const totalFollowers = userProfile?.followers?.length   
    const dispatch = useDispatch()
    useEffect(()=>{
        // setUserWalletAddress(globalWalletAddress)
        dispatch(getUsers())
        dispatch(fetchTransactions())
    }, [dispatch, userWalletAddress])
    
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [requestETH, setRequestETH] = useState(false)
    const [sendETH, setSendETH] = useState(false)
    const [quickPay, setQuickPay] = useState(false)
    const logout = () =>{
        setGlobalState('walletAddress', '')
    }

    const totalTransactions = userTransactions.length

    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(true)
    const filteredTransactions =
        query === ''
        ? []
        : userTransactions.filter((person) => {
            return person.receiverAddress.toLowerCase().includes(query.toLowerCase()) || person.receiverName.toLowerCase().includes(query.toLowerCase())
            || person.senderAddress.toLowerCase().includes(query.toLowerCase()) || person.senderName.toLowerCase().includes(query.toLowerCase())
            || person.remark.toLowerCase().includes(query.toLowerCase()) || person.amountETH.toLowerCase().includes(query.toLowerCase())
            })
    
  return (
    <>
    {!userProfile ? (<LoadingBar />) : (
      <div className="min-h-full">
        { requestETH === true ? (
            <RequestPayment requestETH={requestETH} setRequestETH={setRequestETH}/>
        ): null}
        { sendETH === true ? (
            <SendPayment sendETH={sendETH} setSendETH={setSendETH}/>
        ): null}
        { quickPay === true ? (
            <QuickPayment quickPay={quickPay} setQuickPay={setQuickPay} userProfile={userProfile}/>
        ): null}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Link to='/' className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://i.imgur.com/3DBY3Xk.png"
                      alt="rodeo logo"
                    />
                  </Link>
                  <nav
                    className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={()=>{setGlobalState('viewUserProfile', userWalletAddress)}}
                          className={classNames(
                            item.current
                              ? 'bg-cyan-800 text-white'
                              : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="px-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <Link to="/" className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://i.imgur.com/3DBY3Xk.png"
                alt="rodeo logo"
              />
            </Link>
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    onClick={()=>{setGlobalState('viewUserProfile', userWalletAddress)}}
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search transactions"
                      type="search"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <span className="sr-only">View notifications</span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userWalletAddress === 0 ? '' : userProfile?.profilePic}
                        alt=""
                      />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>{userWalletAddress === 0 ? '' : userProfile?.name}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                        <Link to="/">
                          <div
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={logout}
                          >
                            Logout
                          </div>
                        </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="flex-1 min-w-0">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src={userWalletAddress === 0 ? '' : userProfile?.profilePic}
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src={userWalletAddress === 0 ? '' : userProfile?.profilePic}
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            {userWalletAddress === 0 ? '' : userProfile?.name}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <LocationMarkerIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            {userProfile?.city ? userProfile?.city : 'The Metaverse'}
                          </dd>
                          {/* <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            Verified account
                          </dd> */}
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={()=>setSendETH(true)}
                    >
                      Send ETH to User
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={()=>setRequestETH(true)}
                    
                    >
                      Request ETH
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={()=>setQuickPay(true)}
                    
                    >
                      Quick Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                <div className="mt-2 grid grid-cols-1 gap-5">
                  <Statistics totalFollowers={totalFollowers} totalTransactions={totalTransactions}/>
                </div>
              </div>

              <h2 className="max-w-6xl mx-auto mt-8 mb-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  {userTransactions.map((transaction) => (
                    <li key={transaction._id}>
                      <a href={transaction?.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate">{transaction?.name}</span>
                              <span>
                                <span className="text-gray-900 font-medium">{transaction?.amountETH}</span>{' '}
                                {transaction?.currency}
                              </span>
                              <time>{transaction?.createdAt}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Transaction
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Amount
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Remark
                            </th>
                            <th
                              className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                              scope="col"
                            >
                              Status
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        {filteredTransactions.length === 0 ? (
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userTransactions.map((transaction) => (
                            <tr key={transaction._id} className="bg-white">
                              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex">
                                  <a href='#' className="group inline-flex space-x-2 truncate text-sm">
                                    <CashIcon
                                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  { transaction.senderAddress === userWalletAddress ? (
                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    Payment to {transaction.receiverName}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                     Payment from {transaction.senderName}
                                    </p>
                                  )}
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <span className="text-gray-900 font-medium">{transaction.amountETH} </span>
                                ETH
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <span className="text-gray-900 font-medium">{transaction.remark} </span>
                              </td>
                              <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  Success
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <time dateTime={transaction.datetime}>{transaction.createdAt.slice(0,10)}</time>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        ) : (
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction._id} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <a href='#' className="group inline-flex space-x-2 truncate text-sm">
                                  <CashIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                { transaction.senderAddress === userWalletAddress ? (
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  Payment to {transaction.receiverName}
                                  </p>
                                ) : (
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    Payment from {transaction.senderName}
                                  </p>
                                )}
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{transaction.amountETH} </span>
                              ETH
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{transaction.remark} </span>
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Success
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <time dateTime={transaction.datetime}>{transaction.createdAt.slice(0,10)}</time>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                        )}
                      </table>
                      {/* Pagination */}
                      {/* <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">20</span> results
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                      </nav> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )}
    </>
  )
}
