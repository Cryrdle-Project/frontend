import React, { useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import Select from "react-select";
import Style from "../components/GuessBar/GuessBar.module.css";
import styles from "@/styles/Home.module.css";
import { BiRefresh } from "react-icons/bi";
import images_index from "../img/index";
import Dropdown from "@/components/Dropdown/Dropdown";
import { CryrdleContext } from "@/context/CryrdleContext";
import GuessBarTailWind from "@/components/GuessBar/GuessBarTailWind";
import giffy from "../img/giphy.gif";

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
  const [winState, setisWinGame] = useState(false);

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
  const mappedArray = objArr.map((obj) => {
    const {
      price,
      market_cap,
      volume_24h,
      percent_change_24h,
      
    } = obj.quote.USD;
    const {
      price: winningPrice,
      market_cap: winningMarketCap,
   
      volume_24h: winningVolume,
      percent_change_24h: winningPercentChange,

    } = winningCoin.quote.USD;

    let total_supply = obj.total_supply;
    let winningTotalSupply =  winningCoin.total_supply;
    let date_added = obj.date_added;
    let winningDateAdded = winningCoin.date_added;

    let price_color;
    let market_cap_color;
    let total_supply_color;
    let volume_24h_color;
    let p_change_24h_color;
    let date_added_color;

    let price_arrow;
    let market_cap_arrow;
    let total_supply_arrow;
    let volume_24h_arrow;
    let p_change_24h_arrow;
    let date_added_arrow;

    if (price !== winningPrice) {
      price_color = price < winningPrice ? "bg-yellow-500" : "bg-red-500";
      price_arrow = price < winningPrice ? "↓" : "↑";
    } else {
      price_color = "bg-green-500";
    }

    if (market_cap !== winningMarketCap) {
      market_cap_color =
        market_cap < winningMarketCap ? "bg-yellow-500" : "bg-red-500";
      market_cap_arrow = market_cap < winningMarketCap ? "↓" : "↑";
    } else {
      market_cap_color = "bg-green-500";
    }

    console.log("total_supply_color: ", total_supply);
    console.log("total_supply_color: ", winningTotalSupply);
    if (total_supply !== winningTotalSupply) {
     
      total_supply_color = total_supply < winningTotalSupply ? "bg-yellow-500" : "bg-red-500";
      total_supply_arrow = total_supply < winningTotalSupply ? "↓" : "↑";
    } else {

    
      total_supply_color = "bg-green-500";
    }

    const onum = volume_24h.toFixed(0);
    const wnum = winningVolume.toFixed(0);

    if (onum !== wnum) {
      volume_24h_color = onum < wnum ? "bg-yellow-500" : "bg-red-500";
      volume_24h_arrow = onum < wnum ? "↓" : "↑";
    } else {
      volume_24h_color = "bg-green-500";
    }

    if (percent_change_24h !== winningPercentChange) {
      p_change_24h_color =
        percent_change_24h < winningPercentChange
          ? "bg-yellow-500"
          : "bg-red-500";
      p_change_24h_arrow =
        percent_change_24h < winningPercentChange ? "↓" : "↑";
    } else {
      p_change_24h_color = "bg-green-500";
    }

    if (date_added !== winningDateAdded) {
      date_added_color =
        date_added < winningDateAdded ? "bg-yellow-500" : "bg-red-500";
      date_added_arrow = date_added < winningDateAdded ? "↓" : "↑";
    } else {
      date_added_color = "bg-green-500";
    }

    return {
      ...obj,
      price_color,
      price_arrow,
      market_cap_color,
      market_cap_arrow,
      total_supply_color,
      total_supply_arrow,
      volume_24h_color,
      volume_24h_arrow,
      p_change_24h_color,
      p_change_24h_arrow,
      date_added_color,
      date_added_arrow,
    };
  });
return mappedArray
};


  const handleSelectedOption = (selectedOption) => {
    // winningCoin
    // to do
    // addObjectToGuesses(selectedOption);
    const updatedOption = addColors([selectedOption]);

    setGuesses((guesses) => [...guesses, updatedOption[0]]);
  };

  const handleCheckWin = (returnedStatus) => {
    console.log("handleCheckWin win coin ", winningCoin.name);

    if (returnedStatus.name == winningCoin.name) {
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
            {currentAccount && (
              <button
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleConnectWallet()}
              >
                Disconnect wallet
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </button>
            )}
          </div>

          <div class="slider-thumb "></div>

          <div className="w-full px-8 pt-20 pb-12 mx-auto max-w-sm">
            <Link href="/">
              <Image className="" src={images_index.logo} alt="logo" />
            </Link>
          </div>

          <div class="w-full mx-auto max-w-lg px-8 pt-12 pb-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700/50 dark:border-gray-900/25">
            <a href="#">
              <h5 class="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                The WORDLE for crypto degens.
              </h5>
            </a>
            {!winState && (
              <>
                <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  Guess the coin of the day and win the daily prize pool!
                </p>
                <p class="mb-12 font-normal text-gray-700 dark:text-gray-400">
                  Start by guessing a random currency below.
                </p>
              </>
            )}
            {winState && (
              <>
                <p class="mb-18 text-5xl font-normal text-blue-900 dark:text-gray-400">
                  CONGRATULATIONS!
                </p>
                <Image
                  unoptimized={true}
                  src={giffy}
                  alt="Animated "
                  height={500}
                  width={300}
                />

                <h5 class="mb-4 text-2xl text-center mt-4 font-bold tracking-tight text-gray-900 dark:text-white">
                  You will recieve winning bonus on your crypto wallet in the
                  end of the day $$$
                </h5>
              </>
            )}

            {!currentAccount && (
              <button
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleConnectWallet()}
              >
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
              </button>
            )}

            {currentAccount && isPaid && !winState && (
              <Dropdown
                winningCoin={winningCoin}
                coinsList={coinsList}
                onGuessMade={handleSelectedOption}
                checkWin={handleCheckWin}
              />
            )}
          </div>

          {currentAccount && isPaid && guesses && !winState && (
            <GuessBarTailWind winningCoin={winningCoin} guesses={guesses} />
          )}

          <section class="bg-black mt-60">
            <div class="max-w-lg bg-black px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
              <h1 class="text-3xl font-extrabold leading-10 tracking-tight text-white text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl">
                <span class="inline md:block">Join Us</span>
                <span class=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
                  {" "}
                  We are
                  <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">
                    {" "}
                    Hiring
                  </span>{" "}
                </span>
              </h1>
              <div class="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <button class="bg-tkb border text-sm text-white py-3 px-7 rounded-full">
                  Join Sahilnetic
                </button>
              </div>
            </div>
          </section>
          <hr class="text-white mx-5" />
          <footer class="bg-black pb-5">
            <div class="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
              <div class="sm:flex sm:items-center sm:justify-between">
                <div class="flex justify-center text-teal-300 sm:justify-start">
                  <img
                    class="rounded-full"
                    src="https://sahilnetic.xyz/evilcat.png"
                    width="40"
                    height="40"
                  />
                </div>

                <p class="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                  T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
