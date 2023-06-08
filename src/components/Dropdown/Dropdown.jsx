import React, { useState, useContext } from "react"
import Select from "react-select"
import { GoArrowRight } from "react-icons/go"
import { CryrdleContext } from "../../context/CryrdleContext"


// --INTERNAL IMPORT
import Style from "./Dropdown.module.css"

const dropdownStyle = {
  option: (base, state) => ({
    ...base,
    padding: "1rem",
  }),
  control: () => ({
    display: "flex",
    padding: "0rem 0rem rem 0.5rem",
    // padding: '1rem',
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
}


const Dropdown = ({ winningCoin, coinsList, onGuessMade, checkWin }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selected) => {
    setSelectedOption(selected)
  }

  

  const handleClick = () => {

    // console.log(selectedOption ? selectedOption.symbol : "no option selected")
    console.log("handleClick");
    
    if (selectedOption) {
      onGuessMade(selectedOption) // todo: use full label?
      
      console.log("handle",selectedOption)
      
      checkWin(selectedOption)
      // checkWin(coins[selectedOption.symbol] == answer)
      // TODO: NEED TO ADD ADDRESS ACCOUNT FIRST + ADD GAME PERIODS
      // Axios.post(`${COINS_URL}/${selectedOption.symbol}`).then(
      //     (response) => {console.log(response)})
    }
  }


  return (
    <div className={Style.dropdown_box}>
      <div className="rounded-lg bg-gray-300">
        <Select
          options={coinsList}
          onChange={handleChange}
          placeholder="Enter your guess..."
          isClearable={true}
          styles={dropdownStyle}
        />
      </div>
      <div className={Style.dropdown_box_right}>
        <GoArrowRight onClick={handleClick} />
      </div>
    </div>
  )
}

export default Dropdown
