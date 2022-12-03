import React from 'react'

interface FormSectionProps {
  list: JSX.Element | JSX.Element[] | any;
  children?: JSX.Element | JSX.Element[] | any;
}

const SectionsList: React.FC<FormSectionProps > = ({ list, children }) => {
  return (
    <div>{list.map((list: any) => (list))}</div>
  )
}

export default SectionsList