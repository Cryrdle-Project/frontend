import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import Web3Modal from "web3modal"

// *** MOVED SOME TO BACKEND ***
// ROUTE DEV/ADMIN CALLS TO BACKEND WHERE PROVIDER CAN BE GENERATED SAFELY FROM PRIVATE KEYS
// ROUTE USER CALLS FROM FRONTEND WHERE METAMASK REQUESTS SIGNER ON CLIENT
//
//--INTERNAL IMPORTS
import { CryrdleAddress, CryrdleABI } from "./constants"
//
// --FETCH SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CryrdleAddress, CryrdleABI, signerOrProvider)

const connectToSmartContract = async () => {
  try {
    const signer = await getSigner()
    const contract = fetchContract(signer)
    return contract
  } catch (error) {
    console.log("Error while connecting with contract")
  }
}
const getSigner = async () => {
  try {
    const web3Modal = new Web3Modal() // library to making connection flows easy
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    return signer
  } catch (error) {
    console.log("Error while getting signer")
  }
}

export const CryrdleContext = React.createContext()

export const CryrdleProvider = ({ children }) => {
  //---use states
  const [render, toggleReRender] = useState(false)
  const [currentAccount, setCurrentAccount] = useState("")
  const [currentBalance, setCurrentBalance] = useState(0)
  const [currentGame, setCurrentGame] = useState(0)
  const [entryFee, setEntryFee] = useState(null)
  const [isPaid, setIsPaid] = useState(null)
  const [guesses, setGuesses] = useState([])
  const [coinsList, setCoinsList] = useState([])

  // listen on mount
  useEffect(() => {
    setGuesses([])
    // async functions
    const getCoins = async () => {
      return await getAllCoins()
    }
    const getInfo = async () => {
      return await getCurrentGameInfo()
    }

    if (currentAccount) {
      getCoins()
      getInfo()
      getBalance()
      checkIfUserIsPaid()
      getMyGuesses()
    }
  }, [currentAccount, render]) // <-- re-render on state change

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
      console.log("Connecting wallet...")
      if (!window.ethereum) return console.log("Install MetaMask!")

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      console.log("Connected with: ", accounts[0])
      setCurrentAccount(accounts[0])

      if (currentAccount) {
        const signer = await getSigner()
        const balanceBN = await signer.getBalance()
        const balanceString = ethers.utils.formatEther(balanceBN)
        const balance = parseFloat(balanceString)
        setCurrentBalance(balance)
      }
    } catch (error) {
      console.log("Error while connecting to wallet")
      console.log(error)
    }
  }
  const disconnectWallet = async () => {
    try {
      console.log("Disconnecting wallet...")
      if (!window.ethereum) return console.log("Install MetaMask!")
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setCurrentAccount(null)
      setGuesses([])
      reRender()
      console.log("Disconnected with: ", accounts[0])
    } catch (error) {
      console.log("Error while disconnecting to wallet")
    }
  }

  const reRender = () => {
    toggleReRender(!render)
  }

  const getCurrentGameInfo = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask!")

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "current-game-info"
      )

      const json = await res.json()
      console.log("Current game info:", json)
      const { game, players, fee, winner } = json
      setCurrentGame(game)
      setEntryFee(fee)
    } catch (error) {
      console.log("Error while retrieving current game info")
    }
  }
  const getBalance = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask!")
      const signer = await getSigner()
      const balanceBN = await signer.getBalance()
      const balanceString = ethers.utils.formatEther(balanceBN)
      const balance = parseFloat(balanceString)
      setCurrentBalance(balance)
      return balance
    } catch (error) {
      console.log("Error while getting balance")
    }
  }
  const checkIfUserIsPaid = async () => {
    try {
      console.log("Checking if user is paid..")
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `is-paid/${currentAccount}`
      )
      const data = await res.json()
      if (data === true) {
        setIsPaid(true)
        // console.log("isPaid:", isPaid)
        await createUser()
      } else {
        setIsPaid(false)
        // console.log("isPaid:", isPaid)
      }
    } catch (error) {
      console.log("Error while checking if user is paid")
      // console.log(error)
    }
  }

  //---CONTRACT INTERACTIONS

  const payEntryFee = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask!")
      const entryFeeWEI = entryFee * 10 ** 18
      const contract = await connectToSmartContract()
      const tx = await contract.joinCryrdle({
        value: entryFeeWEI,
      })
      await tx.wait()
      console.log("Joined Cryrdle")
      console.log("Txn hash: ", tx.hash)
      reRender()
    } catch (error) {
      console.log("Something went wrong while joining Cryrdle!")
      console.log(error)
    }
  }
  const setGuess = async (_guess) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "set-guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: currentAccount, guess: _guess }),
      })
      if (res.ok) {
        const json = await res.json()
        console.log("res:", json)
        reRender()
      }
    } catch (error) {
      console.log("Error while adding guess")
      console.log(error)
    }
  }
  const setSecretIndex_admin = async (secretIndex) => {
    try {
      // const secretIndex = parseInt(secretIndex)
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "set-coin-of-the-day",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coinIdx: secretIndex }),
        }
      )
      if (res.ok) {
        const json = await res.json()
        console.log("res:", json)
        console.log("Txn hash: ", json.transactionHash)
        // console.log("GameNum incremented: ", json)
        reRender()
      }
    } catch (error) {
      console.log("Error while joining Cryrdle")
      console.log(error)
    }
  }

  //-----USERS context

  const createUser = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: currentAccount }),
      })
    } catch (error) {
      console.log("Error while adding user to today's game")
      console.log(error)
    }
  }

  const getAllUsers = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "users")
    const json = await res.json()
    return json.data
  }

  const getSingleUser = async () => {
    console.log("fetching single user..")
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `users/${currentAccount}`
    )
    const data = await res.json()
    if (data == null) {
      console.log("No user found")
      return null
    } else {
      console.log("data:", data)
      return data
    }
  }

  const getMyGuesses = async () => {
    console.log("fetching single user..")
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `users/guesses/${currentAccount}`
    )
    const data = await res.json()

    if (res == null) {
      console.log("No user found")
      return null
    } else if (data.length === 0) {
      console.log("No guesses made for this game")
      return null
    } else {
      console.log("myGuesses:", data)
      setGuesses(data)
    }
  }

  // // COINS context

  const getAllCoins = async () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "coins")
      .then((response) => response.json())
      .then((data) => {
        // map through the data and add the Label field
        const coinsWithLabels = data.map((coin) => {
          return {
            ...coin,
            label: `${coin.name} (${coin.symbol})`,
          }
        })
        setCoinsList(coinsWithLabels)
      })
      .catch((error) => console.error(error))
  }

  return (
    <CryrdleContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        getAllUsers,
        getSingleUser,
        payEntryFee,
        setSecretIndex_admin,
        setGuess,
        reRender,
        currentAccount,
        currentBalance,
        currentGame,
        entryFee,
        isPaid,
        guesses,
        coinsList,
      }}
    >
      {children}
    </CryrdleContext.Provider>
  )
}
