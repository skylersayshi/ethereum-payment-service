import { CheckCircleIcon } from '@heroicons/react/solid'

export default function StatusBar() {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Request completed</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your payment request was successful.</p>
            <p><i>Note: This is not a transaction.</i></p>
          </div>
          <div className="mt-4">
          </div>
        </div>
      </div>
    </div>
  )
}
