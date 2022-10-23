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
import NoMetamask from './components/NoMetamask'
import MobileHomepage from './Homepage/src/MobileHomepage'

const App = () => {
  	const [userWalletAddress] = useGlobalState('walletAddress')
  	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [hasMetamask, setHasMetamask] = useState(false)
	const [windowTooSmall, setWindowTooSmall] = useState(true)

	//window size handler

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			setHasMetamask(true)
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
                localStorage.setItem('isWalletConnected', 'true')
			})
			.catch(error => {
				setErrorMessage(error.message)
			
			});

		} else {
			console.log('Please install MetaMask browser extension to interact');
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
		if(window.innerWidth>=650){
			setWindowTooSmall(false)
			connectWalletOnPageLoad()
		}
    }, [userWalletAddress])

	if (window.ethereum && window.ethereum.isMetaMask) {
		window.ethereum.on('accountsChanged', accountChangedHandler);
		window.ethereum.on('chainChanged', chainChangedHandler);
	}


  
	if(windowTooSmall) return(<MobileHomepage />)
	return(
	<div>
		{!hasMetamask && !windowTooSmall && ( <NoMetamask />)}	
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/request" element={<RequestPayment />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/test" element={<WalletCard />} />
		  <Route path="/requeststome" element={<RequestsToMe />} />
		  <Route path="/requestsfromme" element={<RequestsFromMe />} />
		  <Route path="/findusers" element={<FindUsers />} />
		  <Route path="/profile" element={<Profile />} />
		  <Route path="/editprofile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App