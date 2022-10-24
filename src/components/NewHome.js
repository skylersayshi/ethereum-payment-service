/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Tabuler from './Tabular'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function NewHome() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* <polygon points="50,0 100,0 50,100 0,100" /> */}
          </svg>

          <main className="mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
                <img src="https://i.imgur.com/3DBY3Xk.png" className="h-20 mb-12 object-center" />
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline text-gray-600">The best way to handle</span>{' '}
                <span className="block text-indigo-600 xl:inline">YOUR money</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                An application for users to easily request and send ETH to users across the world. <Link to="/info" className='text-underline'><b>Learn More...</b></Link>
              </p>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                You are being prompted to <b className='text-indigo-400'>Connect your Wallet</b> by signing into your Metamask account. If you are an existing user, click the <b className='text-indigo-400'>Welcome</b> button below to access your <b className='text-indigo-400'>Dashboard.</b> If you are a new user, please enter your public information below.
              </p>
              <p className='mt-4'><em className='text-gray-500'>Note: This application currently transacts ONLY on the Goerli Testnet for further testing. Mainnet payments will not be successful.</em></p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:mt-32 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Tabuler />
      </div>
    </div>
  )
}
