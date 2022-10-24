// import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

export default function WelcomeAlert() {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

          {/* <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" /> */}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Login successful!</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>A secured connection with your Metamask wallet has been established.</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
            <Link to="/home">
              <button
                type="button"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Go to Dashboard
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
