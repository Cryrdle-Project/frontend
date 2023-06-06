import React, { useContext } from "react"
import { GoArrowUp, GoArrowDown } from "react-icons/go"

const USERS_URL = "http://localhost:3999/api/v1/users"

//--IMPORT FROM SMART CONTRACT
import { CryrdleContext } from "../../context/CryrdleContext"

const GuessBarTailWind = ({ guesses }) => {
  const { currentAccount } = useContext(CryrdleContext)

    console.log(" guess bar")
    console.log(guesses)

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

      const list_a = [
        {id: 0, color: 'green'},
        {id: 1, color: 'red'},
        {id: 2, color: 'yellow'},
        {id: 3, color: 'red'},
        {id: 4, color: 'green'},
        {id: 5, color: 'red'},
        {id: 6, color: 'green'},
      ];

    const checkGuess = () => {
        if (guesses.symbol == winningCoin.symbol) {
            console.log("correct")
            return true
        }
        return 1; 
    }


  return (
<>
          {/* {checkGuess() && ( */}
          {guesses.map((items, index) => (
             <div className="max-w-lg mx-auto mt-2  bg-gray-600 rounded-lg shadow-lg">
             <div className="flex flex-wrap items-center ">
             
          
                 <div key={items.id} className="p-2 flex border border-pink-300 items-center justify-center text-xs">

                   {items.name}
             
                
                   {/* <span
                     className={`rounded-full w-5 h-5 bg-${coin.color}-500`}
                   >
                    
                   </span> */}
                 </div>
               
                 <div key={items.id} className="p-2 flex items-center border border-pink-300 justify-center text-xs">

{items.symbol}


{/* <span
  className={`rounded-full w-5 h-5 bg-${coin.color}-500`}
>
 
</span> */}
</div>

             </div>
           </div>
               ))}

  {/* )
} */}


  </>
  )}

export default GuessBarTailWind
