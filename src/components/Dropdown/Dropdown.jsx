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


const Dropdown = ({ onGuessMade, checkWin, coinsList, winningCoin }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selected) => {
    setSelectedOption(selected)
  }

  const handleClick = () => {
    console.log(selectedOption ? selectedOption.symbol : "no option selected")
    console.log(JSON.stringify(selectedOption))

    if (selectedOption) {
      onGuessMade(selectedOption.symbol) // todo: use full label?
      // JSON.parse() << reverse operation
      // onGuessMade(selectedOption.symbol) // todo: use full label?
      console.log(selectedOption.symbol)
      console.log(winningCoin)
      checkWin(selectedOption.symbol == "PPC")
      // checkWin(coins[selectedOption.symbol] == answer)
      // TODO: NEED TO ADD ADDRESS ACCOUNT FIRST + ADD GAME PERIODS
      // Axios.post(`${COINS_URL}/${selectedOption.symbol}`).then(
      //     (response) => {console.log(response)})
    }
  }

  return (
    <div className={Style.dropdown_box}>
      <div className={Style.dropdown_box_left}>
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
