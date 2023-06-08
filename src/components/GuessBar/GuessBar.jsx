import React, { useContext } from "react"
import { GoArrowUp, GoArrowDown } from "react-icons/go"

// --INTERNAL IMPORT
import Style from "./GuessBar.module.css"
const USERS_URL = "http://localhost:3999/api/v1/users"

//--IMPORT FROM SMART CONTRACT
import { CryrdleContext } from "../../context/CryrdleContext"

const GuessBar = ({ guesses }) => {
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
 
    // TO DO fetch wining coin from contract
    // hard coded data
    
    const winningCoin = {
		"id": 1,
		"name": "Bitcoin",
		"symbol": "BTC",
		"slug": "bitcoin",
		"num_market_pairs": 10229,
		"date_added": "2010-07-13T00:00:00.000Z",
		"tags": [],
		"max_supply": 21000000,
		"circulating_supply": 19386050,
		"total_supply": 19386050,
		"is_active": 1,
		"infinite_supply": false,
		"platform": null,
		"cmc_rank": 1,
		"is_fiat": 0,
		" _supply": null,
		"self_reported_market_cap": null,
		"tvl_ratio": null,
		"last_updated": "2023-05-28T11:13:00.000Z",
        "price": 0.07252005708929064,
		"quote": {
			"usd": {
				"price": 0.07252005708929064,
				"volume_24h": 192385061.87251726,
				"volume_change_24h": 25.448}}
	  };

    

    const checkGuess = () => {
      
        if (guesses.symbol == winningCoin.symbol) {
            
            console.log("correct")
            return true

        }

        // else if (guess > winningCoin) {
        //     console.log("too high")
        //     return (
        //         <div className={Style.guessBar_incorrect}>
        //             <span>{guess}</span>
        //             <GoArrowUp
        //                 fill="darkred"
        //                 className={Style.guessBar_incorrect_arrow}
        //             />
        //         </div>
        //     )
        // } 
        return 1; 
    }
 
console.log("WTF         WWWW")

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
          

          {guesses && checkGuess() && guesses.map((el, i) =>
                       
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
                            <div className="p-10">
                            <div className={Style.guessBar_incorrect}>
                                <span>{el}</span>
                                op: {i}
                            </div>
                            </div>
                        )
                    )}
        </div>
      </div>
    </div>
  )
}

export default GuessBar
