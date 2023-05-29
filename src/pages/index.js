import React, { useState, useContext } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
// import Select from "react-select";
import Style from "../components/GuessBar/GuessBar.module.css"
import styles from "@/styles/Home.module.css"
import { BiRefresh } from "react-icons/bi"
import images from "../img/index"
import Dropdown from "@/components/Dropdown/Dropdown"
import { CryrdleContext } from "../context/CryrdleContext"
import GuessBar from "@/components/GuessBar/GuessBar"

// hard coded data
const CATEGORIES = [
  "symbol",
  "name",
  "category",
  "cmc_rank",
  "marketCap",
  "price",
  "date_added",
  // shared tags? if guess <tag> is in <coin> tan
]

export default function Home() {
  let {
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
  } = useContext(CryrdleContext)
  const [inputValue, setInputValue] = useState("")

  const handleConnectWallet = async () => {
    currentAccount ? await disconnectWallet() : await connectWallet()
  }

  //----DIRECT ON-CHAIN CALLS
  const handlePayEntryFee = async () => {
    try {
      await payEntryFee()
    } catch (error) {
      console.log("error: ", error)
    }
  }

  //----DATABASE CALLS
  const handleGetUsersRequest = async () => {
    await getAllUsers()
  }
  const handleGetSingleUserRequest = async () => {
    await getSingleUser()
  }
  const handleSelectedOption = async (selectedOption) => {
    await setGuess(selectedOption)
    console.log(
      "guesses:",
      guesses.map((guess) => {
        return guess.symbol
      })
    )
  }
  const handleCheckWin = (returnedStatus) => {
    if (returnedStatus) {
      setisWinGame(true)
      setWinScreen(true)
    }
  }
  const handleReRender = () => {
    reRender()
  }

  //----ADMIN SECTION
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setSecretIndex_admin(inputValue)
  }

  console.log(currentAccount  )
  console.log("current account")
  return (
    <>
      <Head>
        {/* ----- TITLE */}
        <title>CRYRDLE</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">
            <Image src={images.logo} alt="logo" width={300} />
          </Link>
    
          <br />

          {/* ----- CONNECT WALLET */}
          <button
            className={styles.button1}
            onClick={() => handleConnectWallet()}
          >
            {!currentAccount
              ? "Connect"
              : `${currentAccount.slice(0, 5)}...${currentAccount.slice(
                  currentAccount.length - 4,
                  currentAccount.length
                )}` + " | Disconnect"}
                wallet
          </button>

          {currentAccount && (
            <div>
              Balance:&nbsp;
              {currentBalance
                ? `${currentBalance.toFixed(3)} ETH`
                : "Loading..."}
            </div>
          )}
          <br />
          <div>{currentGame && `Game Number: ${currentGame}`}</div>
          <div>{entryFee && `Entry Fee: ${entryFee.toFixed(3)} ETH`}</div>

          <br />

          <br />
          {currentAccount && !isPaid && (
            <>
              <button
                className={styles.button2}
                onClick={() => handlePayEntryFee()}
              >
                Pay 2 Play
              </button>
              <button onClick={() => handleReRender()}>
                <BiRefresh />
              </button>
            </>
          )}

          <div>Is Paid: {isPaid ? "Yes" : "No"}</div>

          {/* ----- DATABASE CHECKS */}
          <div>
            <br />
            <h2>Database calls</h2>
            <button
              className={styles.button2}
              onClick={() => handleGetUsersRequest()}
            >
              View Game Info
            </button>
            <br />

            <button
              className={styles.button2}
              onClick={() => handleGetSingleUserRequest()}
            >
              Get My Info
            </button>
          </div>
          <br />

          {/* ----- DROPDOWN SECTION */}
          <br />
          <h2>Guess Bar</h2>
          {/* {currentAccount && isPaid && ( */}
          {( 
            <Dropdown
              coinsList={coinsList}
              onGuessMade={handleSelectedOption}
              // checkWin={handleCheckWin}
            />
          )}





          {/* ----- DISPLAY GUESSES */}
          {/* TODO: MOVE TO GUESSBAR COMPONENT */}

          <div className={Style.hero_guessBar_headers_box}>
            <div className={Style.hero_guessBar_headers}>
              {CATEGORIES.map((el, i) => (
                <div key={i} className={Style.guessBar_guesses_header}>
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <GuessBar /> */}
          <div>
            {guesses &&
              guesses.map((guess, index) => (
                <div key={index} className={Style.hero_guessBar_headers}>
                  <div>{JSON.parse(guess).symbol}</div>
                  <div>{JSON.parse(guess).name}</div>
                  <div>{JSON.parse(guess).category}</div>
                  <div>{JSON.parse(guess).cmc_rank}</div>
                  <div>
                    {(JSON.parse(guess).marketCap / 1000000000).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 3 }
                    )}
                    B
                  </div>
                  <div>
                    $
                    {JSON.parse(guess).price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div>
                    {new Date(JSON.parse(guess).date_added)
                      .toISOString()
                      .slice(0, 10)}
                  </div>
                </div>
              ))}
          </div>

          {/* ----- ADMIN SECTION */}
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2>Admin Section</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
