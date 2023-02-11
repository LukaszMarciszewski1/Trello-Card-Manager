/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from './styles.module.scss'
import { useTable, Column, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { Card } from "models/card";
import Button from "components/common/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import { MdSkipPrevious, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSkipNext } from "react-icons/md";
import Search from "./Search/Search";
import Input from "components/common/Input/Input";
interface CardsTableProps {
  cards: Card[]
}

const CardsTable: React.FC<CardsTableProps> = ({ cards }) => {
  const data = React.useMemo<Card[]>(() => cards, [cards]);
  const columns = React.useMemo<Column<Card>[]>(
    () => [
      {
        Header: "Kontrachent",
        accessor: "title",
      },
      {
        Header: "Zlecający",
        accessor: "member",
      },
      {
        Header: "Dział",
        accessor: 'department'
      },
      {
        Header: "Data przyjęcia",
        accessor: 'startDate'
      },
      {
        Header: "Data oddania",
        accessor: 'endDate'
      },
      {
        Header: "Koszt zlecenia (zł)",
        accessor: 'orderCost'
      },
      {
        Header: "Wartość zlecenia (zł)",
        accessor: 'orderPrice'
      },

    ],
    []
  );

  const tableHooks = (hooks: { visibleColumns: ((columns: any) => any[])[]; }) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edytuj",
        Cell: ({ row }: any) => (
          <Button
            type={"button"}
            onClick={() => alert("Editing: " + row.values.price)}
            style={{ width: 36, margin: 0, backgroundColor: '#f0f0f0' }}
            icon={<AiFillEdit fontSize={16} />}
          />
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    page,
    prepareRow,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks as any
  );

  const isEven = (index: number) => index % 2 === 0
  const { pageIndex } = state

  return (
    <div className={styles.tableContainer}>
      <Search
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : " "}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className={isEven(index) ? styles.evenRow : ''} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <span>
          Strona{' '}
          <strong>{pageIndex + 1} z {pageOptions.length}</strong>{' '}
        </span>
        <span>
          | idź do strony: {' '}
          <input
            id={'gotoPage'}
            type={'number'}
            defaultValue={pageIndex + 1}
            max={pageOptions.length}
            min={1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: 50, height: 30, padding: 3, borderRadius: 3, border: '2px solid #67788a' }}
          />
        </span>
        <Button
          type={'button'}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          icon={<MdSkipPrevious fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          type={'button'}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          icon={<MdKeyboardArrowLeft fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          type={'button'}
          onClick={() => nextPage()}
          disabled={!canNextPage}
          icon={<MdKeyboardArrowRight fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          type={'button'}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          icon={<MdSkipNext fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button> */}
      </div>
    </div>
  );
}

export default CardsTable;