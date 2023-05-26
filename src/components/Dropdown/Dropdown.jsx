import React, { useState } from "react"
import Select from "react-select"
import { GoArrowRight } from "react-icons/go"

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

const Dropdown = ({ onGuessMade, checkWin, coinsList }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selected) => {
    setSelectedOption(selected)
  }

  const handleClick = () => {
    if (selectedOption) {
      onGuessMade(JSON.stringify(selectedOption)) // todo: use full label?
      // JSON.parse() << reverse operation
      // onGuessMade(selectedOption.symbol) // todo: use full label?
      // checkWin(selectedOption.symbol == winningCoin.symbol)
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
