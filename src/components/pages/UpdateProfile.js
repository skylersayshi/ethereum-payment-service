import NavBar from "../NavBar"
import { Link } from "react-router-dom"
import FileBase from 'react-file-base64'
import { useGlobalState, setGlobalState } from "../../store"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, updateUser } from "../../requests/actions/users"

export default function UpdateProfile() {
  const title='Edit Profile'
  const [globalWalletAddress] = useGlobalState('walletAddress')
  const [globalAccountBalance] = useGlobalState('userBalance')
  const [userWalletAddress, setUserWalletAddress] = useState(globalWalletAddress)
  const userProfile = useSelector((state)=> userWalletAddress ? state.users.find((specificUser)=> specificUser.walletAddress === userWalletAddress) : null)
  const totalFollowers = userProfile?.followers?.length   
  const dispatch = useDispatch()
  const ref = useRef(null)

  const [userData, setUserData] = useState({
    name: userProfile?.name,
    twitter: userProfile?.twitter,
    bio: userProfile?.bio,
    profilePic: userProfile?.profilePic,
    city: userProfile?.city
  });

  console.log(userData)

  useEffect(()=>{
      dispatch(getUsers())
      setUserWalletAddress(globalWalletAddress)
  }, [dispatch])

  const clear = () =>{
    setUserData({
      name: '',
      twitter: '',
      bio: '',
      profilePic: '',
      city: ''
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(userWalletAddress)
      dispatch(updateUser(userProfile._id, {...userData}))
    clear();
  }

    return (
    <div>
    <NavBar title={title}/>
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto mt-16 pb-12 px-4 sm:px-6 lg:px-8">   
      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-900">
                This information will be displayed publicly
              </p>
            </div>
  
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    type="text"
                    name="name"
                    id="name"
                    ref={ref}
                    defaultValue={userProfile?.name}
                    onChange={e => setUserData({...userData, name: e.target.value})}
                    />
                </div>
              </div>
  
              <div className="sm:col-span-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    ref={ref}
                    defaultValue={userProfile?.bio}
                    onChange={e => setUserData({...userData, bio: e.target.value})}
                    />
                </div>
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            
              <div className="sm:col-span-4">
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    ref={ref}
                    defaultValue={userProfile?.twitter}
                    onChange={e => setUserData({...userData, twitter: e.target.value})}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    ref={ref}
                    defaultValue={userProfile?.city}
                    onChange={e => setUserData({...userData, city: e.target.value})}
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <div className="ml-4">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({base64})=> setUserData({...userData, profilePic: base64})}
                    />      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="pt-5">
          <div className="flex justify-end">
            <Link to="/home">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              Cancel
            </button>
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
  </div>
    )
  }
  