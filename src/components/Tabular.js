import { useEffect, useState } from 'react'
import Identicon from 'identicon.js'
import { faker } from '@faker-js/faker'
import { getAllTransactions } from '../shared/Transaction'
import { useGlobalState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../requests/actions/transactions'

const Tabuler = () => {
  const [transactionsStore] = useGlobalState('transactions')
  const [transactionCount] = useGlobalState('transactionCount')
  const [transactions, setTransaction] = useState([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const dispatch = useDispatch()
  const allTransactions = useSelector((state)=> state.transactions)
  const firstTransactions = allTransactions.slice(start, end)

  const makeImage = (address) => {
    const data = new Identicon(address, 400).toString()
    return `data:image/png;base64,${data}`
  }

  // const loadMoreTransactions = () => {
  //   setTransaction((prevState) => [
  //     ...prevState,
  //     ...transactionsStore.slice(start, end),
  //   ])
  //   setStart(end)
  //   setEnd(end * 2)
  // }

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`

  useEffect(() => {
    //  getAllTransactions().then((data) => {
    //   setTransaction([...data.slice(start, end)])
    //   setStart(end)
    //   setEnd(end * 2)
    // })
    dispatch(fetchTransactions())
  }, [])

  return (
    <>
      <section className="antialiased rounded-xl text-gray-600 p-5">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800 text-center">
                {allTransactions.length} Total Transactions
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Sender</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Receiver</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Amount</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Timestamp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Remark</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {firstTransactions.map((tx, index) => (
                      <tr key={index + 1}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src={makeImage(tx.senderAddress)}
                                width="40"
                                height="40"
                                alt="Alex Shatov"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              {faker.name.findName()}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            <a
                              href={`https://ropsten.etherscan.io/address/${tx.senderAddress}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-blue-500"
                            >
                              {shortenAddress(tx.senderAddress)}
                            </a>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">
                            <a
                              href={`https://ropsten.etherscan.io/address/${tx.receiverAddress}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-blue-500"
                            >
                              {shortenAddress(tx.receiverAddress)}
                            </a>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex flex-row justify-center items-center text-left font-medium">
                            <img
                              className="w-3 h-3 object-contain cursor-pointer mr-1"
                              src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                              alt="Ethereum Logo"
                            />
                            <span className="text-green-500">{tx.amountETH}</span>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">
                            {tx.createdAt.slice(0,10)}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center">{tx.remark}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center mt-2 mb-10">
        {/* <button
          onClick={loadMoreTransactions}
          className="text-white bg-indigo-600 py-2 px-5 rounded-lg drop-shadow-xl border border-transparent hover:bg-transparent hover:text-indigo-500 hover:border hover:border-indigo-500 focus:outline-none focus:ring"
        >
          Load more
        </button> */}
      </div>
    </>
  )
}

export default Tabuler