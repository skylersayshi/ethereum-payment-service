// // import { InjectedConnector } from '@web3-react/injected-connector';

// // export const injected = new InjectedConnector({
// //     supportedChainIds: [1, 3, 4, 5, 42],
// // })

// import React, {useEffect, useState} from 'react'
// import {ethers} from 'ethers'

// 	const connectWalletHandler = () => {
// 		if (window.ethereum && window.ethereum.isMetaMask) {
// 			console.log('MetaMask Here!');

// 			window.ethereum.request({ method: 'eth_requestAccounts'})
// 			.then(result => {
// 				const userWallet = accountChangedHandler(result[0]);
// 				console.log('Wallet Connected');
// 				const userBalance = getAccountBalance(result[0]);
//                 localStorage.setItem('isWalletConnected', 'true')
//                 console.log(localStorage.getItem('isWalletConnected'))
// 			})
// 			.catch(error => {
// 				console.log(error.message);
			
// 			});

// 		} else {
// 			console.log('Need to install MetaMask');
// 			console.log('Please install MetaMask browser extension to interact');
// 		}
//         return {userWallet, userBalance}
// 	}

// 	// update account, will cause component re-render
// 	const accountChangedHandler = (newAccount) => {
// 		const userAddress = newAccount;
// 		getAccountBalance(newAccount.toString());

//         return userAddress
// 	}

// 	const getAccountBalance = (account) => {
// 		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
// 		.then(balance => {
// 			(ethers.utils.formatEther(balance));
// 		})
// 		.catch(error => {
// 			console.log(error.message);
// 		});
//         return userBalance
// 	};

// 	const chainChangedHandler = () => {
// 		// reload the page to avoid any errors with chain change mid use of application
// 		window.location.reload();
// 	}

//     const connectWalletOnPageLoad = async () =>{
//             try {
//                 connectWalletHandler()
//             } catch (error) {
//                 console.log(error)
//             }
//     }


// export {
//     connectWalletHandler,
//     accountChangedHandler,
//     getAccountBalance,
//     chainChangedHandler,
//     connectWalletOnPageLoad,
//     userBalance,
//     userAddress,

// }