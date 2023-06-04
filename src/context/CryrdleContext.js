import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import data from './hardcoded_coins.json';

// *** MOVED SOME TO BACKEND ***
// ROUTE DEV/ADMIN CALLS TO BACKEND WHERE PROVIDER CAN BE GENERATED SAFELY FROM PRIVATE KEYS
// ROUTE USER CALLS FROM FRONTEND WHERE METAMASK REQUESTS SIGNER ON CLIENT
//
// --INTERNAL IMPORTS
import { CryrdleABI, CryrdleAddress } from './constants';

//
// --FETCH SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CryrdleAddress, CryrdleABI, signerOrProvider);

const connectToSmartContract = async () => {
  try {
    const signer = await getSigner();
    return fetchContract(signer);
  } catch (error) {
    console.log('Error while connecting with contract');
    console.error(error);
  }
};
const getSigner = async () => {
  try {
    const web3Modal = new Web3Modal(); // library to making connection flows easy
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    return provider.getSigner();
  } catch (error) {
    console.log('Error while getting signer');
  }
};

export const CryrdleContext = React.createContext();

export const CryrdleProvider = ({ children }) => {
<<<<<<< HEAD
  //---use states
  const [render, toggleReRender] = useState(false)
  const [currentAccount, setCurrentAccount] = useState("")
  const [currentBalance, setCurrentBalance] = useState(0)
  const [currentGame, setCurrentGame] = useState(0)
  const [entryFee, setEntryFee] = useState(null)
  const [isPaid, setIsPaid] = useState(null)
  const [guesses, setGuesses] = useState([])
  const [guess, setGuess] = useState([])
  const [coinsList, setCoinsList] = useState([])
  const [winningCoin, setWinningCoin] = useState("")

=======
  // ---use states
  const [render, toggleReRender] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentGame, setCurrentGame] = useState(0);
  const [entryFee, setEntryFee] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [coinsList, setCoinsList] = useState([]);
  const [winningCoin, setWinningCoin] = useState('');
>>>>>>> onchain-calls

  // listen on mount
  useEffect(() => {
    setGuesses([]);

    const coinsWithLabels = Object.values(data).map((coin) => {
      return {
        ...coin,
        label: `${coin.name} (${coin.symbol})`

      };
    });

    setCoinsList(coinsWithLabels);

    // setWinningCoin(coinsWithLabels[0])

    // const getCoins = async () => {

    //   // need to be connected to contract
    //   // return await getAllCoins()
    // }
    const getInfo = async () => {
      return await getCurrentGameInfo();
    };

    if (currentAccount) {
      console.log('re-render on state change');
      // getCoins()
      getInfo();
      getBalance();
      checkIfUserIsPaid();
      getMyGuesses();
    }
  }, [currentAccount, render]); // <-- re-render on state change

  // const checkIfUserIsConnected = async () => {
  //   try {
  //     if (!window.ethereum) return console.log("Install MetaMask!")

  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     }) // array of accounts provided by metamask
  //     if (accounts.length) {
  //       setCurrentAccount(accounts[0])
  //       await getBalance()
  //     } else {
  //       console.log("No account found")
  //     }

  //     console.log("accounts: ", accounts)
  //   } catch (error) {
  //     console.log("Something went wrong while checking connecting to wallet")
  //   }
  // }
  const connectWallet = async () => {
    try {
      console.log('Connecting wallet...');
      if (!window.ethereum) return console.log('Install MetaMask!');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      console.log('Connected with: ', accounts[0]);
      setCurrentAccount(accounts[0]);

      if (currentAccount) {
        const signer = await getSigner();
        const balanceBN = await signer.getBalance();
        const balanceString = ethers.utils.formatEther(balanceBN);
        const balance = parseFloat(balanceString);
        setCurrentBalance(balance);
      }
    } catch (error) {
      console.log('Error while connecting to wallet');
      console.log(error);
    }
  };
  const disconnectWallet = async () => {
    try {
      console.log('Disconnecting wallet...');
      if (!window.ethereum) return console.log('Install MetaMask!');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setCurrentAccount(null);
      setGuesses([]);
      reRender();
      console.log('Disconnected with: ', accounts[0]);
    } catch (error) {
      console.log('Error while disconnecting to wallet');
    }
  };

  const reRender = () => {
    toggleReRender(!render);
  };

  const getCurrentGameInfo = async () => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask!');
      const contract = await connectToSmartContract();

      const currentGameBN = await contract.currentGameId();
      const currentGame = currentGameBN.toNumber();
      console.log('Current game id:', currentGame);
      setCurrentGame(currentGame);

      const participationFeeBN = await contract.getParticipationFee();
      const participationFee = participationFeeBN.toNumber() / 10 ** 18;
      console.log('The participation fee is: ', participationFee, 'ETH');
      setEntryFee(participationFee);
    } catch (error) {
      console.log('Error while retrieving current game info');
      console.error(error);
    }
  };
  const getBalance = async () => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask!');
      const signer = await getSigner();
      const balanceBN = await signer.getBalance();
      const balanceString = ethers.utils.formatEther(balanceBN);
      const balance = parseFloat(balanceString);
      setCurrentBalance(balance);
      return balance;
    } catch (error) {
      console.log('Error while getting balance');
    }
  };

  const checkIfUserIsPaid = async () => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask!');
      const contract = await connectToSmartContract();
      const isPaid = await contract.paidParticipationFee(
        currentGame,
        currentAccount
      );

      setIsPaid(isPaid);
    } catch (error) {
      console.log('Error while checking if user is paid');
      console.log(error);
    }
  };

  // ---CONTRACT INTERACTIONS

  const payEntryFee = async () => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask!');
      const entryFeeWEI = entryFee * 10 ** 18;
      const contract = await connectToSmartContract();
      const tx = await contract.joinCryrdle({
        value: entryFeeWEI
      });
      await tx.wait();
      console.log('Joined Cryrdle');
      console.log('Txn hash: ', tx.hash);
      reRender();
    } catch (error) {
      console.log('Something went wrong while joining Cryrdle!');
      console.log(error);
    }
<<<<<<< HEAD
  }

    // const setGuess = async = (_guess) => {
    //   try {
    //     const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "set-guess", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ address: currentAccount, guess: _guess }),
    //     })
    //     if (res.ok) {
    //       const json = await res.json()
    //       console.log("res:", json)
    //       reRender()
    //     }
    //   } catch (error) {
    //     console.log("Error while adding guess")
    //     console.log(error)
    //   }
    // }



  const setGuessAndRender = (_guess) => {
    try {
   
      if (_guess == winningCoin.name) {
     
        
        setGuess(_guess)
        reRender()
      }
=======
  };
  const setGuess = async (_guess) => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask!');
      const entryFeeWEI = entryFee * 10 ** 18;
      const contract = await connectToSmartContract();
      const tx = await contract.joinCryrdle({
        value: entryFeeWEI
      });
      await tx.wait();
      console.log('Joined Cryrdle');
      console.log('Txn hash: ', tx.hash);
      reRender();
>>>>>>> onchain-calls
    } catch (error) {
      console.log('Error while adding guess');
      console.log(error);
    }
  };

  const getMyGuesses = async () => {
    console.log('fetching single user..');
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `users/guesses/${currentAccount}`
    );
    const data = await res.json();

    if (res === null) {
      console.log('No user found');
      return null;
    } else if (data.length === 0) {
      console.log('No guesses made for this game');
      return null;
    } else {
      console.log('myGuesses:', data);
      setGuesses(data);
    }
  };

  // // COINS context

  const getAllCoins = async () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + 'coins')
      .then((response) => response.json())
      .then((data) => {
        // map through the data and add the Label field
        const coinsWithLabels = data.map((coin) => {
          return {
            ...coin,
            label: `${coin.name} (${coin.symbol})`
          };
        });
        setCoinsList(coinsWithLabels);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log('data[0]:', coinsList[0]);
    setWinningCoin(coinsList[0]);
  }, [coinsList]);

  console.log('winningCoin:', winningCoin);
  return (
    <CryrdleContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        payEntryFee,
        setGuess,
        setGuessAndRender,
        reRender,
        setGuesses,
        currentAccount,
        currentBalance,
        currentGame,
        entryFee,
        isPaid,
        guesses,
<<<<<<< HEAD
        winningCoin,
        guess,
        coinsList,
=======
        coinsList
>>>>>>> onchain-calls
      }}
    >
      {children}
    </CryrdleContext.Provider>
  );
};
