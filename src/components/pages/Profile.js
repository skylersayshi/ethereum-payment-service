import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../requests/actions/users'
import { fetchTransactions } from '../../requests/actions/transactions'
import { useGlobalState, setGlobalState } from '../../store'
import NavBar from '../NavBar'
import moment from 'moment'

const user = {
    name: 'Whitney Francis',
    email: 'whitney@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
  ]
  const breadcrumbs = [
    { name: 'Jobs', href: '#', current: false },
    { name: 'Front End Developer', href: '#', current: false },
    { name: 'Applicants', href: '#', current: true },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
  ]
  const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  }
  const timeline = [
    {
      id: 1,
      type: eventTypes.applied,
      content: 'Applied to',
      target: 'Front End Developer',
      date: 'Sep 20',
      datetime: '2020-09-20',
    },
    {
      id: 2,
      type: eventTypes.advanced,
      content: 'Advanced to phone screening by',
      target: 'Bethany Blake',
      date: 'Sep 22',
      datetime: '2020-09-22',
    },
    {
      id: 3,
      type: eventTypes.completed,
      content: 'Completed phone screening with',
      target: 'Martha Gardner',
      date: 'Sep 28',
      datetime: '2020-09-28',
    },
    {
      id: 4,
      type: eventTypes.advanced,
      content: 'Advanced to interview by',
      target: 'Bethany Blake',
      date: 'Sep 30',
      datetime: '2020-09-30',
    },
    {
      id: 5,
      type: eventTypes.completed,
      content: 'Completed interview with',
      target: 'Katherine Snyder',
      date: 'Oct 4',
      datetime: '2020-10-04',
    },
  ]
  const comments = [
    {
      id: 1,
      name: 'Leslie Alexander',
      date: '4d ago',
      imageId: '1494790108377-be9c29b29330',
      body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
    },
    {
      id: 2,
      name: 'Michael Foster',
      date: '4d ago',
      imageId: '1519244703995-f4e0f30006d5',
      body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
    },
    {
      id: 3,
      name: 'Dries Vincent',
      date: '4d ago',
      imageId: '1506794778202-cad84cf45f1d',
      body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Profile = () => {
    const [differentUserProfileAddress] = useGlobalState('viewUserProfile')
    console.log(differentUserProfileAddress)
    const differentUserProfile = useSelector((state)=> differentUserProfileAddress ? state.users.find((user)=> user.walletAddress === differentUserProfileAddress) : null)
    const allTransactions = useSelector((state)=> state.transactions)
    const userTransactions = allTransactions.filter((transaction)=>transaction.senderAddress === differentUserProfileAddress || transaction.receiverAddress === differentUserProfileAddress)
    const dispatch = useDispatch()
    console.log(userTransactions)

    useEffect(()=>{
        dispatch(getUsers)
        dispatch(fetchTransactions)
    }, [dispatch, differentUserProfileAddress])

  return (
<>
    <div className="min-h-full">
    <NavBar />
    <main className="-mt-32">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
            <div className="relative">
                <img
                className="h-16 w-16 rounded-full"
                src={differentUserProfile?.profilePic ? differentUserProfile?.profilePic : 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'}
                alt=""
                />
                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
            </div>
            </div>
            <div>
            <h1 className="text-2xl font-bold text-white">{differentUserProfile?.name}</h1>
            <p className="text-sm font-medium text-slate-200">
                Member since <time dateTime="2020-08-25">{differentUserProfile?.createdAt.slice(0,10)}</time>
            </p>
            </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
            Follow
            </button>
        </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    User Information
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Public Details</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-slate-900">{differentUserProfile?.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        <a href={`https://etherscan.io/address/${differentUserProfile?.walletAddress}`} className="text-indigo-600 underline">
                        {differentUserProfile?.walletAddress}
                        </a>
                    </dd>
                    </div>
                    <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Followers</dt>
                    <dd className="mt-1 text-sm text-gray-900">{differentUserProfile?.followers.length}</dd>
                    </div>
                    <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Twitter</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        <a href={`http://www.twitter.com/${differentUserProfile?.twitter}`} className="text-indigo-600 underline">@{differentUserProfile?.twitter}</a>
                    </dd>
                    </div>
                    <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        {differentUserProfile?.bio}
                    </dd>
                    </div>
                    <div className="sm:col-span-2">
                    </div>
                </dl>
                </div>
            </div>
            </section>             
        </div>

        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Payment History
            </h2>
            {/* Activity Feed */}
            <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                {userTransactions.map((item) => (
                    <li>
                    <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                        <div>   
                            <CheckIcon className="h-8 w-8 rounded-full flex items-center justify-center bg-green-400 text-white" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                            <p className="text-sm text-gray-500">
                                {item?.senderName} paid {item?.receiverName} for <b>{item?.remark}</b>
                            </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{moment(item?.createdAt).fromNow()}</time>
                            </div>
                        </div>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </section>
        </div>
    </main>
    </div>
</>
  )
}

export default Profile
