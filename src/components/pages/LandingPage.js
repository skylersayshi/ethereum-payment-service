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


export default function LandingPage() {

  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    isWallectConnected()
    checkIfTransactionExist()
  }, [])

  return (
    <div>
        <MetamaskLogin />
    </div>
  )
}