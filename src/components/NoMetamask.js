
import { Link } from "react-router-dom"
export default function NoMetamask() {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-yellow-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 align-items-center">
            We noticed an issue connecting to your Metamask account.{' '}
            <a href="https://metamask.io/" className="font-medium text-yellow-700 underline hover:text-yellow-600">
              Please install Metamask
            </a>
            {' '}or{' '}
            <a href="https://rodeopay.xyz/" className="font-medium text-yellow-700 underline hover:text-yellow-600">Log In</a> 
            {' '}to continue.
          </p>
        </div>
      </div>
    </div>
  )
}
