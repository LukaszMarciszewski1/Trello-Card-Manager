/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import styles from './styles.module.scss'
import dayjs from "dayjs";
import { useTable, Column, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { Card } from "models/card";
import Button from "components/common/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import { MdSkipPrevious, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSkipNext } from "react-icons/md";
import Search from "./Search/Search";
import Input from "components/common/Input/Input";
import { useTrelloApi } from 'context/trelloContext';
interface CardsTableProps {
  cards: Card[]
  members: any
}

interface Member {
  fullName: string
  id: string
  username: string
}

const CardsTable: React.FC<CardsTableProps> = ({ cards, members }) => {
  const { getAllCards, getMembers, success, loading } = useTrelloApi()
  // const [members, setMembers] = useState<Member[]>()

  // useEffect(() => {
  //   const fetchMembers = async () => {
  //     await getMembers()
  //       .then((res) => {
  //         setMembers(res)
  //       })
  //   }
  //   fetchMembers()
  // }, [])
  // console.log(members)
  // console.log(cards)
  // el()

  const filterMembers = (rows: any) => {
    if (members?.length) {
      const filteredMembers = members?.filter((member: Member) => rows.includes(member.id));
      if (filteredMembers.length > 1) {
        return filteredMembers[1].fullName;
      }
      return filteredMembers[0]?.fullName;
    }
  };

  const data = React.useMemo<Card[]>(() => cards, [cards]);
  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Kontrachent",
        accessor: "name",
      },
      {
        Header: "Zlecający",
        accessor: (row: any) => filterMembers(row.idMembers),
      },
            {
        Header: "Data oddania",
        accessor: (row: any) => row.due ? dayjs(row.due).format('YYYY/MM/DD') : 'Nie wybrano', 
      },
    ],
    [cards, members]
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
            onClick={() => console.log(row.original)}
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
            type={'number'}
            defaultValue={pageIndex + 1}
            max={pageOptions.length}
            min={1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: 60, height: 30, padding: 3, borderRadius: 3, border: '2px solid #67788a' }}
          />
        </span>
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          icon={<MdSkipPrevious fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          icon={<MdKeyboardArrowLeft fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          icon={<MdKeyboardArrowRight fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          icon={<MdSkipNext fontSize={'19px'} />}
          style={{ width: 40, height: 30 }}
        />
      </div>
    </div>
  );
}

export default CardsTable;


      // {
      //   Header: "Kontrachent",
      //   accessor: "title",
      // },
      // {
      //   Header: "Zlecający",
      //   accessor: "member",
      // },
      // {
      //   Header: "Dział",
      //   accessor: 'department'
      // },
      // {
      //   Header: "Data przyjęcia",
      //   accessor: 'startDate'
      // },
      // {
      //   Header: "Data oddania",
      //   accessor: 'endDate'
      // },
      // {
      //   Header: "Koszt zlecenia (zł)",
      //   accessor: 'orderCost'
      // },
      // {
      //   Header: "Wartość zlecenia (zł)",
      //   accessor: 'orderPrice'
      // },