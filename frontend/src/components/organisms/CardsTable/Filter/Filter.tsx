import React, { useState } from 'react'
import Checkbox from "components/common/Checkbox/Checkbox";
import { useTrelloApi } from 'context/trelloContext';

interface FiltersProps {
  value : string,
  label: string,
}

interface FilterProps {
  filters: FiltersProps[]
  selectedValue: string
  handleChange?: (e: any) => void
}

const filters = [
  {
    value :'all',
    label: 'Wszystkie',
  },
  {
    value :'visible',
    label: 'Widoczne',
  },
  {
    value :'open',
    label: 'Otwarte',
  }
]

const Filter: React.FC<FilterProps> = ({filters, selectedValue, handleChange}) => {
  // const [selectedValue, setSelectedValue] = useState(filters[0].value);
  

  // const handleChange = (e: any) => {
  //   console.log(e.target.value)
  //   setSelectedValue(e.target.value);
  // };

  const buttonFilterStyle = {
    width: 130,
    height: 30,
    margin: '0 0 0 10px'
  }

  return (
    <div style={{ display: 'flex' }}>
    {
      filters.map((filter: { value: string ; label: string  }, index: number) => (
        <Checkbox
          key={index}
          id={filter.value}
          type={"radio"}
          label={filter.label}
          value={filter.value}
          style={buttonFilterStyle}
          checked={selectedValue === filter.value}
          onChange={handleChange}
        />
      ))
    }
  </div>
  )
}

export default Filter