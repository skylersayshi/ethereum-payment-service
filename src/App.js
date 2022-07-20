import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeLoggedIn from './components/pages/HomeLoggedIn'
import RequestForm from './components/RequestForm'
import Homepage from './components/pages/Homepage'
import RequestPayment from './components/RequestPayment'
import AddTransactionCard from './components/AddTransactionCard'
import WalletCard from './components/WalletCard'
import {ethers} from 'ethers'
import { useGlobalState, setGlobalState } from './store';
import RequestsToMe from './components/pages/RequestsToMe'
import RequestsFromMe from './components/pages/RequestsFromMe'
import Footer from './components/Footer'
import FindUsers from './components/pages/FindUsers'
import Profile from './components/pages/Profile'
import UpdateProfile from './components/pages/UpdateProfile'

const App = () => {
  const [userWalletAddress] = useGlobalState('walletAddress')
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
                localStorage.setItem('isWalletConnected', 'true')
                console.log(localStorage.getItem('isWalletConnected'))
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
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
		// reload the page to avoid any errors with chain change mid use of application
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

  console.log(userWalletAddress)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomeLoggedIn />} />
          <Route path="/request" exact element={<RequestPayment />} />
          <Route path="/home" exact element={<Homepage />} />
          <Route path="/send" exact element={<AddTransactionCard />} />
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