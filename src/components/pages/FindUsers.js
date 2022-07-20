import NavBar from "../NavBar"
import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setGlobalState, useGlobalState } from '../../store'
import { getUsers } from "../../requests/actions/users"
import { Link } from 'react-router-dom'

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
  
  export default function FindUsers() {
    const [userWalletAddress] = useGlobalState('walletAddress')
    const [viewUserProfile, setViewUserProfile] = useGlobalState('viewUserProfile')
    const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null) 
    const allUsers = useSelector((state)=> state.users)   
    const dispatch = useDispatch()
    const [statusBar, setStatusBar] = useState(false)

    useEffect(()=>{
        dispatch(getUsers())
    }, [])

    const [open, setOpen] = useState(true)

    const [slider, setSlider] = useGlobalState('falseState')

    const changeMultipleStates = () =>{
      setSlider(!slider)
      setOpen(!open)
      setStatusBar(!statusBar)
    }

    const [query, setQuery] = useState('')
    const filteredPeople =
        query === ''
        ? []
        : allUsers.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase()) || person.walletAddress.toLowerCase().includes(query.toLowerCase())
            })
    
    const title = 'Find Users'
    return (
    <>
      <div className="min-h-full">
        <NavBar title={title}/>
        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-md text-gray-700">
                    A list of all users including their name, address, and profile.
                    </p>
                </div>
                </div>
                    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                            Search by Name or Wallet Address
                        </label>
                        <div className="relative text-sky-100 focus-within:text-gray-400">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                            id="search"
                            name="search"
                            className="block w-full bg-white bg-opacity-50 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 placeholder-white focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
                            placeholder="Search By Name or Wallet Address"
                            type="search"
                            onChange={(event) => setQuery(event.target.value)}
                            />
                        </div>
                        </div>
                    </div>
                <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Address
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredPeople.map((person) => (
                            <tr key={person.walletAddress}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={person.profilePic ? person.profilePic : 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'} alt="" />
                                    </div>
                                    <div className="ml-4">
                                    <div className="font-medium text-gray-900">{person.name}</div>
                                    <div className="text-gray-500">{person.email}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                    <a href={`https://etherscan.io/address/${person.walletAddress}`} className="text-indigo-600 underline">
                                    {person.walletAddress}
                                  </a>
                                </div>
                                <div className="text-gray-500">{person.department}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 mr-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Follow
                                </button>
                                <Link to="/profile" className="text-indigo-600 hover:text-indigo-900"
                                    onClick={()=>{setGlobalState('viewUserProfile', person.walletAddress)}}
                                >
                                    View Profile<span className="sr-only">, {person.name}</span>
                                </Link>
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
          </div>
        </main>
      </div>
    </>
    )
  }
  