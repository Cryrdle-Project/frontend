import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import Select from "react-select";
import Style from '../components/GuessBar/GuessBar.module.css';
import styles from '@/styles/Home.module.css';
import { BiRefresh } from 'react-icons/bi';
import images from '../img/index';
import Dropdown from '@/components/Dropdown/Dropdown';
import { CryrdleContext } from '@/context/CryrdleContext';
import GuessBar from '@/components/GuessBar/GuessBar';

// hard coded data
const CATEGORIES = [
  'symbol',
  'name',
  'category',
  'total supply',
  'marketCap',
  'price',
  'date_added'
  // shared tags? if guess <tag> is in <coin> tan
];

export default function Home () {
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
    coinsList
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
      console.log('error: ', error);
    }
  };

  const addObjectToGuesses = (newObject) => {
    setGuesses((guesses) => [...guesses, newObject]);
  };

  
  const handleSelectedOption = (selectedOption) => {
    console.log('before', guesses);
    console.log(typeof selectedOption);

    addObjectToGuesses(selectedOption);
    console.log('after', guesses);
    console.log(
      'guesses:',
      guesses.map((guess) => {
        return guess.symbol;
      })
    );
  };

  const handleCheckWin = (returnedStatus) => {
    console.log('handleCheckWin: ', returnedStatus);
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

      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">
            <Image src={images.logo} alt="logo" width={300} />
          </Link>

          <br />
          <br />

          {/* ----- CONNECT WALLET */}
          <button
            className={styles.button1}
            onClick={() => handleConnectWallet()}
          >
            {!currentAccount
              ? 'Connect '
              : `${currentAccount.slice(0, 5)}...${currentAccount.slice(
                  currentAccount.length - 4,
                  currentAccount.length
                )}` + ' | Disconnect '}
                wallet
          </button>

          {currentAccount && (<div>
            <div>
              Balance:&nbsp;
              {currentBalance
                ? `${currentBalance.toFixed(3)} ETH`
                : 'Loading...'}
            </div>

          <br />
          <div>{currentGame !== null && `Game #${currentGame}`}</div>
          <div>{entryFee !== null && `Entry Fee: ${entryFee.toFixed(3)} ETH`}</div>

          <br />

          <div>Is Paid: {isPaid ? 'Yes' : 'No'}</div>

          {!isPaid && (
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

          {/* ----- DROPDOWN SECTION */}
          <br />
          <h2>Guess Bar</h2>
          {/* {currentAccount && isPaid && ( */}
          {(
            <Dropdown
             winningCoin={winningCoin}
              coinsList={coinsList}
              onGuessMade={handleSelectedOption}
              checkWin={handleCheckWin}
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

          <GuessBar guess={guess}/>
          <div>

            {guesses &&
              guesses.map((guess, index) => (
                <div key={index} className={Style.hero_guessBar_headers}>
                  <div>{guess.symbol}</div>
                  <div>{guess.name}</div>
                  <div>{guess.category}</div>
                  <div>{guess.cmc_rank}</div>
                  <div>
                    {(guess.marketCap / 1000000000).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 3 }
                    )}
                    B
                  </div>
                  <div>
                    $
                    { guess.price
                    // (guess.price).toLocaleString(undefined, {
                    //   maximumFractionDigits: 2,
                    // })
                    }
                  </div>
                  <div>
                    {/* {
                    new Date(guess.date_added).toISOString().slice(0, 10)
                    } */}
                  {guess.date_added}
                  </div>
                </div>
              ))}
          </div>

        
        </div>
        )}
        </div>
      </main>
    </>
  );
}
