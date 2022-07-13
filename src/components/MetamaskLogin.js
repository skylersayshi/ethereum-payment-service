import React from 'react';
import { useState, useRef, useEffect } from 'react'
import {
  webClient,
  getRecord,
} from '../self_id/identity';

import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUser, updateUser } from '../requests/actions/users';
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64';


const MetamaskLogin = () => {
  const [bio, setBio] = useState('')
  const [twitter, setTwitter] = useState('')
  const [name, setName] = useState('')
  const [profile, setProfile] = useState({})
  const [localDid, setDid] = useState(null)
  const [selfId, setSelfId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const selfIdRef = useRef(null)
  const didRef = useRef(null)
  selfIdRef.current = selfId
  didRef.current = localDid

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0)

  const user = useSelector((state)=> currentId ? state.users.find((specificUser)=> specificUser.walletAddress === currentId) : null);
  const [userData, setUserData] = useState({
    name: '',
    walletAddress: '',
    twitter: '',
    bio: '',
    profilePic: '',
  });

  useEffect(()=>{
    if(user) setUserData(user);
  }, [user])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    updateProfile()
    if(currentId===0){
      dispatch(createUser({...userData, walletAddress: walletAddress}))
      
    } else {        
      dispatch(updateUser(currentId, {...userData, walletAddress: walletAddress}));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(0);
    setUserData({
      name: '',
      walletAddress: '',
      twitter: '',
      bio: '',
      profilePic: '',
    })
  }

  async function connect() {
    const cdata = await webClient()
    const { id, selfId, address, error } = cdata
    
    if (error) {
      console.log('error: ', error)
      return
    }
    setWalletAddress(address)
    console.log(walletAddress)
    setDid(id)
    setSelfId(selfId)
    const data = await selfId.get('basicProfile', id)
    if (data) {
      setProfile(data)
    } else {
      setShowGreeting(true)
    }
    setLoaded(true)
  }

  async function updateProfile() {
    if (!userData.twitter && !userData.bio && !userData.name) {
      console.log('error... no profile information submitted')
      return
    }
    if (!selfId) {
      await connect()
    }
    const user = {...profile}
    if (twitter) userData.twitter = twitter
    if (bio) userData.bio = bio
    if (name) userData.name = name
  
    await selfIdRef.current.set('basicProfile', user)
    setLocalProfileData()
    console.log('profile updated...')
    console.log('wallet address:' + walletAddress)
  }

  async function readProfile() {
    try {
      const { record } = await getRecord()
      if (record) {
        setProfile(record)
        console.log(record)
      }
      else {
        setShowGreeting(true)
      }
    } catch (error) {
      setShowGreeting(true)
      console.log(error)
    }
    setLoaded(true)
  }

  async function setLocalProfileData() {
    try {
      const data = await selfIdRef.current.get('basicProfile', didRef.current.id)
      if (!data) return
      setProfile(data)
      setShowGreeting(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    
    <div style={{ paddingTop: 50, width: 500, margin: '0 auto', display: 'flex', flex: 1 }}>
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-5xl text-center">
              Decentralized Identity
            </h1>
            <p className="text-xl text-center mt-2 text-gray-400">An authentication flow built with Ceramic & IDX</p>
            <p>Wallet Address: {walletAddress}</p>
            {
              Object.keys(profile).length ? (
                <div className="mb-4">
                  <h1>{Object.keys(profile)}</h1>
                  <h2 className="text-2xl font-semibold mt-6">{profile.name}</h2>
                  <p className="text-gray-500 text-sm my-1">{profile.bio}</p>
                  {
                    profile.twitter && (
                      <p className="text-lg	text-gray-900">Follow me on Twitter - @{profile.twitter}</p>
                    )
                  }
                </div>
              ) : null
            }

          {
            !loaded && (
              <>
              <button
              onClick={connect}
              className="pt-4 shadow-md bg-purple-800 mt-4 mb-2 text-white font-bold py-2 px-4 rounded"
            >Authenticate</button>
            
            <button className="pt-4 shadow-md bg-blue-500 mb-2 text-white font-bold py-2 px-4 rounded" onClick={readProfile}>Read Profile</button>
            </>
            )
          }
          {
            loaded && showGreeting && (
              <p className="my-4 font-bold text-center">You have no profile yet. Please create one!</p>
            )
          }
          {
            loaded && (
              <>
                <input className="pt-4 rounded bg-gray-100 px-3 py-2" placeholder="Name" onChange={e => setUserData({...userData, name: e.target.value})} />
                <input className="pt-4 rounded bg-gray-100 px-3 py-2 my-2" placeholder="Bio" onChange={e => setUserData({...userData, bio: e.target.value})} />
                <input className="pt-4 rounded bg-gray-100 px-3 py-2" placeholder="Twitter username" onChange={e => setUserData({...userData, twitter: e.target.value})} />
                <div>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=> setUserData({...userData, profilePic: base64})}
                  />      
                </div>
                <button className="pt-4 shadow-md bg-green-500 mt-2 mb-2 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Update Profile</button>
                <button className="pt-4 shadow-md bg-blue-500 mb-2 text-white font-bold py-2 px-4 rounded" onClick={readProfile}>Read Profile</button>
              </>
            )
          }
        </div>
  </div>
  )
}

export default MetamaskLogin






              // <>
              //   <input className="pt-4 rounded bg-gray-100 px-3 py-2" placeholder="Name" onChange={e => setName(e.target.value) setUserData(e.target.value)} />
              //   <input className="pt-4 rounded bg-gray-100 px-3 py-2 my-2" placeholder="Bio" onChange={e => setBio(e.target.value)} />
              //   <input className="pt-4 rounded bg-gray-100 px-3 py-2" placeholder="Twitter username" onChange={e => setTwitter(e.target.value)} />
              //   <button className="pt-4 shadow-md bg-green-500 mt-2 mb-2 text-white font-bold py-2 px-4 rounded" onClick={updateProfile}>Update Profile</button>
              //   <button className="pt-4 shadow-md bg-blue-500 mb-2 text-white font-bold py-2 px-4 rounded" onClick={readProfile}>Read Profile</button>
              // </>