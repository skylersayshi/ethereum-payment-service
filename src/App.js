import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import Homepage from './components/pages/Homepage'
import RequestPayment from './components/RequestPayment'
import AddTransactionCard from './components/AddTransactionCard'
import WalletCard from './components/WalletCard'
import {ethers} from 'ethers'
import { useGlobalState, setGlobalState } from './store';
import RequestsToMe from './components/pages/RequestsToMe'
import RequestsFromMe from './components/pages/RequestsFromMe'
import FindUsers from './components/pages/FindUsers'
import Profile from './components/pages/Profile'
import UpdateProfile from './components/pages/UpdateProfile'
import NewHome from './components/NewHome'
import MetamaskLoginV2 from './components/MetamaskLoginV2'

const App = () => {
  const [userWalletAddress] = useGlobalState('walletAddress')
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
                localStorage.setItem('isWalletConnected', 'true')
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
    	setGlobalState('walletAddress', newAccount)
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
      setGlobalState('userBalance', ethers.utils.formatEther(balance))
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	}

    const connectWalletOnPageLoad = async () =>{
            try {
                connectWalletHandler()
            } catch (error) {
                console.log(error)
            }
    }

    useEffect(()=>{
        connectWalletOnPageLoad()
    }, [userWalletAddress])

	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/request" exact element={<RequestPayment />} />
          <Route path="/home" exact element={<Homepage />} />
          <Route path="/test" exact element={<WalletCard />} />
		  <Route path="/requeststome" exact element={<RequestsToMe />} />
		  <Route path="/requestsfromme" exact element={<RequestsFromMe />} />
		  <Route path="/findusers" exact element={<FindUsers />} />
		  <Route path="/profile" exact element={<Profile />} />
		  <Route path="/editprofile" exact element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App