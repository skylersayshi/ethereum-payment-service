import React from 'react';
import { useState, useRef, useEffect } from 'react'
import {
  webClient,
  getRecord,
} from '../self_id/identity'

import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { createUser, getUsers } from '../requests/actions/users'
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64'
import { useGlobalState, setGlobalState } from '../store'
import NewHome from './NewHome';
import { Link } from 'react-router-dom';


const MetamaskLoginV2 = () => {
  const [globalAddress] = useGlobalState('walletAddress')
  console.log(globalAddress)
//   const [profile, setProfile] = useState({})
//   const [localDid, setDid] = useState(null)
//   const [selfId, setSelfId] = useState(null)
  const [loaded, setLoaded] = useState(false)
//   const [showGreeting, setShowGreeting] = useState(false)
//   const selfIdRef = useRef(null)
//   const didRef = useRef(null)
//   selfIdRef.current = selfId
//   didRef.current = localDid
  const history = useNavigate()
  const userValid = useSelector((state)=> globalAddress ? state.users.find((user)=> user.walletAddress === globalAddress) : null)
  
  const [userData, setUserData] = useState({
    name: '',
    walletAddress: '',
    twitter: '',
    bio: '',
    profilePic: '',
    city: ''
  })

//   const [userWalletAddress, setUserWalletAddress] = useState(0)
  const dispatch = useDispatch();

  useEffect(()=>{
    //if(userWalletAddress !== 0)
    if(globalAddress){
    dispatch(getUsers())
    setLoaded(true)
    }
  }, [dispatch, globalAddress])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(globalAddress)
      dispatch(createUser({...userData, walletAddress: globalAddress}, history))
    clear();
  }

  const clear = () => {
    setUserData({
      name: '',
      walletAddress: '',
      twitter: '',
      bio: '',
      profilePic: '',
    })
  }


  return (
    
    <div>
        <NewHome />
          <div className="flex-1 flex-col justify-center">

          {/* {
            !loaded && (
              <>
              <button
              onClick={connect}
              className="ml-28 inline-flex items-center m-1 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Connect Wallet</button>
              </>
            )
          } */}
          
          {
            loaded && !userValid && (
              <div className='ml-0'>
                <p className="my-4 font-bold text-gray-500 text-center">You have no profile yet. Please create one!</p>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={e => setUserData({...userData, name: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <div className="mt-1">
                          <input
                            id="bio"
                            name="bio"
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={e => setUserData({...userData, bio: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                          Twitter
                        </label>
                        <div className="mt-1">
                          <input
                            id="twitter"
                            name="twitter"
                            type="text"
                            placeholder='@'
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={e => setUserData({...userData, twitter: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            id="city"
                            name="city"
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={e => setUserData({...userData, city: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                          <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64})=> setUserData({...userData, profilePic: base64})}
                          />      
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              </div>
            )
          }
          { loaded && userValid && (
            <Link to="/home">
            <button
              className="ml-28 mb-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Welcome, {userValid?.name}</button>
            </Link>
          )}

        </div>


        
  </div>
  )
}

export default MetamaskLoginV2



    //     const cdata = await webClient()
    //     const { id, selfId, address, error } = cdata
        
    //     if (error) {
    //       console.log('error: ', error)
    //       return
    //     }
    //     localStorage.setItem('globalWalletAddress', JSON.stringify(address))
    //     localStorage.setItem('isWalletConnected', true)
    //     setUserWalletAddress(JSON.parse(localStorage.getItem('globalWalletAddress')))
    //     setGlobalState('walletAddress', address)
    //     console.log('global address' + globalAddress)
    //     setDid(id)
    //     setSelfId(selfId)
    //     const data = await selfId.get('basicProfile', id)
    //     if (data) {
    //       setProfile(data)
    //     } else {
    //       setShowGreeting(true)
    //     }
    //     setLoaded(true)
    //   }
    
    //   async function updateProfile() {
    //     if (!userData.twitter && !userData.bio && !userData.name) {
    //       console.log('error... no profile information submitted')
    //       return
    //     }
    //     if (!selfId) {
    //       await connect()
    //     }
    //     const user = {...profile}
    //     if (userData) user.twitter = userData.twitter
    //     if (userData) user.bio = userData.bio
    //     if (userData) user.name = userData.name
      
    //     await selfIdRef.current.set('basicProfile', user)
    //     setLocalProfileData()
    //     console.log('profile updated...')
    //   }
    
    //   async function readProfile() {
    //     try {
    //       const { record } = await getRecord()
    //       if (record) {
    //         setProfile(record)
    //         console.log(record)
    //       }
    //       else {
    //         setShowGreeting(true)
    //       }
    //     } catch (error) {
    //       setShowGreeting(true)
    //       console.log(error)
    //     }
    //     setLoaded(true)
    //   }
    
    //   async function setLocalProfileData() {
    //     try {
    //       const data = await selfIdRef.current.get('basicProfile', didRef.current.id)
    //       if (!data) return
    //       setProfile(data)
    //       setShowGreeting(false)
    //     } catch (error) {
    //       console.log('error', error)
    //     }
    //   }