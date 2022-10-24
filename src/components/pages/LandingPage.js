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
import MetamaskLoginV2 from '../MetamaskLoginV2'
import { Footer } from '../../Homepage/src/components'
import styles from '../../Homepage/src/style'


export default function LandingPage() {

  const [connectedAccount] = useGlobalState('connectedAccount')

  // useEffect(() => {
  //   // isWallectConnected()
  //   // checkIfTransactionExist()
  // }, [])

  return (
    <div>
        <MetamaskLoginV2 />
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mt-32 rounded-lg`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
    </div>
  )
}