import React, { useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import Select from "react-select";
import Style from "../components/GuessBar/GuessBar.module.css";
import styles from "@/styles/Home.module.css";
import { BiRefresh } from "react-icons/bi";
import images from "../img/index";
import Dropdown from "@/components/Dropdown/Dropdown";
import { CryrdleContext } from "@/context/CryrdleContext";
import GuessBarTailWind from "@/components/GuessBar/GuessBarTailWind";

// hard coded data
const CATEGORIES = [
  "symbol",
  "name",
  "category",
  "total supply",
  "marketCap",
  "price",
  "date added",
  // shared tags? if guess <tag> is in <coin> tan
];

export default function Home() {
  const {
    winningCoin,
    connectWallet,
    disconnectWallet,
    payEntryFee,
    setSecretIndex_admin,
    guess,
    setGuess,
    setGuessAndRender,
    setGuesses,
    reRender,
    currentAccount,
    currentBalance,
    currentGame,
    entryFee,
    isPaid,
    guesses,
    coinsList,
  } = useContext(CryrdleContext);
  const [win, setisWinGame] = useState(false);

  const handleConnectWallet = async () => {
    currentAccount ? await disconnectWallet() : await connectWallet();
  };

  // ----DIRECT ON-CHAIN CALLS
  const handlePayEntryFee = async () => {
    try {
      await payEntryFee();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const addObjectToGuesses = (newObject) => {
    setGuesses((guesses) => [...guesses, newObject]);
  };

  const handleSelectedOption = (selectedOption) => {
    const res = addColors();

    // to do
    // addObjectToGuesses(selectedOption);
  
    console.log("after", guesses);
    // console.log(
    //   'guesses:',
    //   guesses.map((guess) => {
    //     return guess.symbol;
    //   })
    // );
  };

  const handleCheckWin = (returnedStatus) => {
    console.log("handleCheckWin: ", returnedStatus);
    if (returnedStatus) {
      setisWinGame(true);
      // setWinScreen(true);
    }
  };
  const handleReRender = () => {
    reRender();
  };

  return (
    <>
      <Head>
        {/* ----- TITLE */}
        <title>CRYRDLE</title>
      </Head>

      <main>
        <div className="h-screen items-center">
        <div className="items-center">

      
        {currentAccount && (
                <div className="text-s">
                  <div>
                    Balance:&nbsp;
                    {currentBalance
                      ? `${currentBalance.toFixed(3)} ETH`
                      : "Loading..."}
                  </div>

                
                  <div>{currentGame !== null && `Game #${currentGame}`}</div>
                  <div className="text-m">
                    {entryFee !== null &&
                      `Entry Fee: ${entryFee.toFixed(3)} ETH`}
                  </div>

              
                  <div>Is Paid: {isPaid ? "Yes" : "No"}</div>

                  {!isPaid && (
                    <>
                      <button
                        className="text-m"
                        onClick={() => handlePayEntryFee()}
                      >
                        Pay 2 Play
                      </button>
                      <button onClick={() => handleReRender()}>
                        <BiRefresh />
                      </button>
                    </>
                  )}
                </div>
              )}


              {/* ----- CONNECT WALLET */}
              <button
                className={styles.button1}
                onClick={() => handleConnectWallet()}
              >
                {!currentAccount
                  ? "Connect "
                  : `${currentAccount.slice(0, 5)}...${currentAccount.slice(
                      currentAccount.length - 4,
                      currentAccount.length
                    )}` + " | Disconnect "}
                wallet
              </button>

             
              </div>

          <div className="w-full px-8 pt-40 pb-12 mx-auto max-w-sm">
            <Link href="/">
              <Image src={images.logo} alt="logo" width={500} />
            </Link>

         
          </div>

      

          <div className="bg-black w-full rounded-lg px-8 pt-12 pb-8 mx-auto max-w-sm">
            <div className="mb-4">

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Guess a coin and win daily collectable.
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-8">
                In order to start the game:
          </label>

           

              {currentAccount && isPaid && (
                <Dropdown
                  winningCoin={winningCoin}
                  coinsList={coinsList}
                  onGuessMade={handleSelectedOption}
                  checkWin={handleCheckWin}
                />
              )}
            </div>
          </div>

          {currentAccount && isPaid && (
            <div className="max-w-lg mx-auto mt-20 bg-gray-600 rounded-lg shadow-lg">
              <div className="grid grid-cols-7 border-solid border-lime-500">
                {CATEGORIES.map((item) => (
                  <div
                    className="p-4
                   flex items-center justify-center text-s"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* suggestions */}
          {guesses && <GuessBarTailWind guesses={guesses} />}
        </div>
      </main>
    </>
  );
}
