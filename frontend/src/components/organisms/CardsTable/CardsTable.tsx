/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import styles from './styles.module.scss'
import { useTable, Column } from "react-table";
import { Card } from "models/card";

interface CardsTableProps {
  cards: Card[]
}

const CardsTable:React.FC<CardsTableProps> = ({cards}) => {
  const data = React.useMemo<Card[]>(() => cards, [cards]);
  const columns = React.useMemo<Column<Card>[]>(
    () => [
      {
        Header: "KONTRACHENT",
        accessor: "title",
      },
      {
        Header: "ZLECAJĄCY",
        accessor: "member",
      },
      {
        Header: "DZIAŁ",
        accessor: 'department'
      },
      {
        Header: "DATA PRZYJĘCIA",
        accessor: 'startDate'
      },
      {
        Header: "DATA ODDANIA",
        accessor: 'endDate'
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
      <div className={styles.tableContainer}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}

export default CardsTable;