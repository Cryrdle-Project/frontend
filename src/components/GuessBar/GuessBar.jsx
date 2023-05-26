import React, { useContext } from "react"
import { GoArrowUp, GoArrowDown } from "react-icons/go"

// --INTERNAL IMPORT
import Style from "./GuessBar.module.css"
const USERS_URL = "http://localhost:3999/api/v1/users"

//--IMPORT FROM SMART CONTRACT
import { CryrdleContext } from "../../context/CryrdleContext"

const GuessBar = ({ guess }) => {
  const { currentAccount } = useContext(CryrdleContext)

  // const checkGuess = async () => {
  //     try {
  //         const res = await Axios.post(
  //             `${USERS_URL}/${currentAccount}`,
  //             guess
  //         )
  //         console.log(res.data)
  //         return res.data
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }

  return (
    <div className={Style.guessBar}>
      <div className={Style.guessBar_box}>
        <div className={Style.guessBar_box_guesses}>
          {/* TODO: REDO LOGIC TO FOR JSON, COMPARE KEYVALUE PAIR */}
          {/* MAP WINNING ANSWER, LOOP CATEGORIES FOR EACH GUESS v WINNER */}
          {/* THIS SHOULD ALL BE DONE IN THE BACKEND ACTUALLY */}
          {/* 
                    - make post request to backend with guess
                    - backend compares guess to winning coin
                    */}
          {/* checkGuess() */}
          {/* {guess.map((el, i) =>
                        el == winningCoin[i] ? (
                            <div className={Style.guessBar_correct}>
                                <span>{el}</span>
                            </div>
                        ) : el > winningCoin[i] && i >= 3 ? (
                            // too high (and not the first 3 - ToDo)
                            <div className={Style.guessBar_incorrect}>
                                <span>{el}</span>
                                <GoArrowUp
                                    fill="darkred"
                                    className={Style.guessBar_incorrect_arrow}
                                />
                            </div>
                        ) : el < winningCoin[i] && i >= 3 ? (
                            // too low (and not the first 3 - ToDo)
                            <div className={Style.guessBar_incorrect}>
                                <span>{el}</span>
                                <GoArrowDown
                                    fill="darkred"
                                    className={Style.guessBar_incorrect_arrow}
                                />
                            </div>
                        ) : (
                            // incorrect, non-numerical
                            <div className={Style.guessBar_incorrect}>
                                <span>{el}</span>
                            </div>
                        )
                    )} */}
        </div>
      </div>
    </div>
  )
}

export default GuessBar
