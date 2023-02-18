import React, { useState } from "react";
import styles from './styles.module.scss'
import { useAsyncDebounce, Row } from "react-table";
import Input from "components/common/Input/Input";

interface GlobalFilterProps {
  preGlobalFilteredRows: Row[],
  globalFilter: string | number | undefined,
  setGlobalFilter: (e: string | undefined) => void,
}


const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className={styles.searchContainer}>
      <Input
        id={"search"}
        placeholder={`${count} pozycji...`}
        label={'Wyszukaj:'}
        value={value || ""}
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
export default GlobalFilter