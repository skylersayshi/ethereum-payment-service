import { useState, useEffect, Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../requests/actions/users'
import { useGlobalState, setGlobalState } from '../../store'
import { getRequests } from '../../requests/actions/requests'
import RequestsSentTable from '../RequestsFromMeTable'
import { Link } from 'react-router-dom'
import RequestsToMeTable from '../RequestsToMeTable'
import NavBar from '../NavBar'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/home', current: false },
  { name: 'Requests To Me', href: '/requeststome', current: false },
  { name: 'Requests From Me', href: '/requestsfromme', current: false },
  { name: 'Find Users', href: '/findusers', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RequestsSent() {

    const [globalWalletAddress] = useGlobalState('walletAddress')
    const [globalAccountBalance] = useGlobalState('userBalance')
    const [userWalletAddress, setUserWalletAddress] = useState(globalWalletAddress)
    const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null)
    const allRequests = useSelector((state)=> state.requests)
    const myRequests = allRequests.filter(single => single.requestToAddress === userWalletAddress)
    const myRequestsSorted = []
    for(let i = myRequests.length-1; i >= 0; i--){
      myRequestsSorted.push(myRequests[i])
    }   
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getRequests())
        dispatch(getUsers())
        setUserWalletAddress(globalWalletAddress)
    }, [globalWalletAddress])

    const title = 'Requests To Me'

  return (
    <>
    <div className="min-h-full">
      <NavBar title={title}/>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <RequestsToMeTable myRequestsSorted={myRequestsSorted}/>
        </div>
      </main>
    </div>
  </>
  )
}
