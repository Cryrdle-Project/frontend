import React, { useContext } from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const USERS_URL = "http://localhost:3999/api/v1/users";

//--IMPORT FROM SMART CONTRACT
import { CryrdleContext } from "../../context/CryrdleContext";

const GuessBarTailWind = ({ winningCoin, guesses }) => {
  const { currentAccount } = useContext(CryrdleContext);

  console.log(" guess bar");
  console.log(guesses);

  // const checkGuess = () => {
  //     if (guesses.symbol == winningCoin.symbol) {
  //         console.log("correct")
  //         return true
  //     }
  //     return 1;
  // }
  // hard coded data
  const CATEGORIES = [
    "Name",
    "Price",
    "Market Cap",
    "Total supply",
    "Volume 24h",
    "Percent change 24h",
    "Date added",
    // shared tags? if guess <tag> is in <coin> tan
  ];

  return (
    <>
      <div class="w-full mt-40 max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header class="px-5 py-4 border-b border-gray-100">
          <h2 class="font-semibold text-gray-800">Your coin guesses: </h2>
        </header>
        <div class="p-3">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Price</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Market Cap</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Total supply</div>
                  </th>
                  <th class="p-4 whitespace-nowrap">
                    <div class="font-semibold text-center">Volume 24h</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center"> % change 24h</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Date added</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                {guesses.map((items, index) => (
                  <tr>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class=" h-10 flex-shrink-0 mr-2 "></div>
                        <div class="font-medium text-gray-800">
                          {items.name}
                        </div>
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
        
                      <div className={` text-left  ${items.color ? '' : items.price_color}`} >

                        { items.quote.USD.price > 100 ? items.quote.USD.price.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        }) : items.quote.USD.price}
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
                      <div className={`text-lg text-left  ${items.color ? '' : items.market_cap_color}`} >
                        {items.quote.USD.market_cap.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
                    <div className={` text-center  ${items.color ? '' : items.max_supply_color}`} >

                        {items.max_supply ? items.max_supply : 14300002}
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
                    <div className={` text-left  ${items.color ? '' : items.volume_24h_color}`} >

                        {items.quote.USD.volume_24h.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
                    <div className={` text-left  ${items.color ? '' : items.p_change_24h_color}`} >

                        {items.quote.USD.percent_change_24h.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 3,
                          }
                        )}{" "}
                        %
                      </div>
                    </td>

                    <td class="p-2 whitespace-nowrap">
                    <div className={` text-center  ${items.color ? '' : items.date_added_color}`} >

                        {new Date(items.date_added).getFullYear()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuessBarTailWind;
