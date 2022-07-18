import AddTransactionCard from '../AddTransactionCard'
import Header from '../Header'
import Hero from '../Hero'
import Tabuler from '../Tabular'
import {
  isWallectConnected,
  checkIfTransactionExist,
  connectWallet,
} from '../../shared/Transaction'
import { useGlobalState } from '../../store'
import { useEffect } from 'react'
import MetamaskLogin from '../MetamaskLogin'
import { Link } from 'react-router-dom'


export default function App() {

  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    isWallectConnected()
    checkIfTransactionExist()
  }, [])

  return (
    <div>
      <Link to='/request'><button>Request</button></Link>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        {!connectedAccount ? (
          <div className="text-center mb-10">
            <button
              onClick={connectWallet}
              className="text-white bg-blue-500 py-2 px-5 rounded-xl drop-shadow-xl border border-transparent hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <Tabuler />
            <AddTransactionCard />
          </>
        )}
        <MetamaskLogin />
      </div>
    </div>
  )
}