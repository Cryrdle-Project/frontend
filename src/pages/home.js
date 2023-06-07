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


  const addColors = (objArr) => {

    const mappedArray = objArr.map(obj => {


      let color;
    
      if (obj.price == winningCoin.price) {
        color = 'green';
      } else if (difference < winningCoin.price ||  difference > winningCoin.price ) {
        color = 'yellow';
      } else if (difference < winningCoin.price + 500 ||  difference > winningCoin.price + 500) {
        color = 'red';
      }
    
      return { ...obj, color };
    });
    console.log("after", mappedArray);
    return mappedArray;
  }

  const handleSelectedOption = (selectedOption) => {
    

    // winningCoin
    // to do
    addObjectToGuesses(selectedOption);
    const updatedOption = addColors(guesses);

  
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
       
          <div className="items-center absolute grid text-m gap-4  pt-12 pl-8 max-w-sm">
            {currentAccount && (
              <div className="text-m font-bold gap-4 ">
                <div className="">
                  Balance:&nbsp;
                  {currentBalance
                    ? `${currentBalance.toFixed(3)} ETH`
                    : "Loading..."}
                </div>

                <div>{currentGame !== null && `Game ${currentGame}`}</div>
                <div className="text-m">
                  {entryFee !== null && `Entry Fee: ${entryFee.toFixed(3)} ETH`}
                </div>

                <div>Is Paid: {isPaid ? "Yes" : "No"}</div>

                {!isPaid && (
                  <>
                    <button
                      className="text-m mt-2"
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
                 {currentAccount    && (   <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

onClick={() => handleConnectWallet()}>
    Disconnect wallet

    <path
      fill-rule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clip-rule="evenodd"
    ></path>
  </button>)}



     
          </div>



          <div class="slider-thumb "></div>


          <div className="w-full px-8 pt-20 pb-12 mx-auto max-w-sm">
            <Link href="/">
              <Image src={images.logo} alt="logo" width={500} />
            </Link>
          </div>



   {/*  */}
   
   <div class="w-full mx-auto max-w-lg px-8 pt-12 pb-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700/50 dark:border-gray-900/25">
            <a href="#">
              <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              The WORDLE for crypto degens.
              </h5>
            </a>
            <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            Guess the coin of the day and win the daily prize pool! 
            </p>

            <p class="mb-12 font-normal text-gray-700 dark:text-gray-400">
            Start by guessing a random currency below.
            </p>
         
            {!currentAccount    && (   <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

onClick={() => handleConnectWallet()}>
    Connect wallet in order to play
<svg
    aria-hidden="true"
    class="w-4 h-4 ml-2 -mr-1"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clip-rule="evenodd"
    ></path>
  </svg>

  </button>)}
   


              {currentAccount && isPaid && (
                <Dropdown
                  winningCoin={winningCoin}
                  coinsList={coinsList}
                  onGuessMade={handleSelectedOption}
                  checkWin={handleCheckWin}
                />
              )}
         
         </div>
          {/*  */}

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
