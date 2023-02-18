import React, { useState, useCallback } from "react";
import { traders } from "data/formData/index";
import styles from './styles.module.scss'
import dayjs from "dayjs";
import { useTable, Column, useSortBy, useGlobalFilter, usePagination, Row } from "react-table";
import { Card } from "models/card";
import Button from "components/common/Button/Button";
import Search from "./Search/Search";
import { useTrelloApi } from 'hooks/useTrelloApi';
import Checkbox from "components/common/Checkbox/Checkbox";
import Popup from "components/common/Popup/Popup";
import { AiFillEdit } from "react-icons/ai";
import {
  MdSkipPrevious,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdOutlineDeleteOutline
} from "react-icons/md";

interface Member {
  fullName: string
  id: string
  username: string
}
interface Filter {
  value: string
  label: string
}
interface CardsTableProps {
  cards: Card[]
  members: Member[]
  boards: any[]
  lists: any[]
  filters: Filter[]
  selectedFilter: string
  setFilter: (e: string) => void
}

const CardsTable: React.FC<CardsTableProps> = ({
  cards,
  members,
  boards,
  lists,
  filters,
  selectedFilter,
  setFilter,
}) => {
  const { getCards, deleteCard } = useTrelloApi()

  const [rowPopup, setRowPopup] = useState(false)
  const [rowActions, setRowActions] = useState({
    posY: 0,
    posX: 0,
    rowId: '',
    rowUrl: ''
  })

  const compareArrays = (array1: { id: string; }[], array2: { id: string; }[]) => {
    let result: any[] = [];
    array1.map((obj1: { id: string; }) => {
      array2.map((obj2: { id: string; }) => {
        if (obj1.id === obj2.id) {
          result.push(obj1);
        }
      });
    });
    return result;
  };

  const filterMemberName = useCallback((rows: string[]) => {
    if (members?.length) {
      const filteredMembers = compareArrays(members, traders)
      const tradersNames: Member[] = filteredMembers?.filter((member: { id: string; }) => (
        rows.includes(member.id)
      ));
      if (tradersNames.length) {
        return tradersNames[0].fullName
      }
    }
  }, [members]);

  const filterBoardName = useCallback((row: string) => {
    if (boards?.length) {
      const filteredBoards: any[] = boards?.filter((board: { id: string }) => row.includes(board.id));
      return filteredBoards[0].name
    }
  }, [boards])

  const filterListName = useCallback((row: string) => {
    if (lists?.length) {
      const filteredLists: any[] = lists?.filter((list: { id: string }) => row.includes(list.id));
      return filteredLists[0].name
    }
  }, [lists])

  const getDescriptionPrice = (text: string) => {
    let value = text.match(/Wartość zlecenia: (.+?) zł/);
    if (value) {
      return Number(value[1])
    }
  }

  const handleDeleteCard = async () => {
    const result = window.confirm("Ta akcja spowoduje usunięcie karty z Trello, czy chcesz usunąć kartę?")
    if (!result) return
    await deleteCard(rowActions.rowId).then(async () => {
      alert('Karta została usunięta z tablicy w Trello')
      await getCards(selectedFilter)
      setRowPopup(false)
    })
  }

  const data = React.useMemo<Card[]>(() => cards, [cards]);
  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Kontrachent",
        accessor: "name",
      },
      {
        Header: "Dział",
        accessor: (row: { idBoard: string }) => filterBoardName(row.idBoard),
      },
      {
        Header: "Zlecający",
        accessor: (row: { idMembers: string[] }) => row.idMembers.length ? filterMemberName(row.idMembers) : 'Nie wybrano',
      },
      {
        Header: "Data oddania",
        accessor: (row: { due: string }) => row.due ? dayjs(row.due).format('YYYY/MM/DD') : 'Nie wybrano',
      },
      {
        Header: "Lista",
        accessor: (row: { idList: string, closed: boolean }) => (
          !row.closed ? filterListName(row.idList) : `Zarchiwizowana/${filterListName(row.idList)}`
        ),
      },
      {
        Header: "Wartość zl. (zł)",
        accessor: (row: { desc: string }) => row.desc ? getDescriptionPrice(row.desc) : '',
      },
    ],
    [cards, members, boards, lists]
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
            onClick={(e: { clientY: number; clientX: number; }) => {
              setRowPopup(true)
              setRowActions({
                posY: e.clientY,
                posX: e.clientX,
                rowId: row.original.id,
                rowUrl: row.original.url
              })
            }}
            style={{ width: 36, margin: 0, opacity: 0.7 }}
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

  return (
    <div className={styles.tableContainer}>
      <div className={styles.headerContainer}>
        <Search
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <div style={{ display: 'flex', marginTop: 10 }}>
          {filters.map((filter: { value: string; label: string }, index: number) => (
            <Checkbox
              key={index}
              id={filter.value}
              type={"radio"}
              label={filter.label}
              value={filter.value}
              checked={selectedFilter === filter.value}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                width: 130,
                height: 30,
                margin: '0 0 0 12px'
              }}
            />
          ))}
        </div>
      </div>
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
                  <td className={index % 2 === 0 ? styles.evenRow : ''} {...cell.getCellProps()}>
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
          <strong>{state.pageIndex + 1} z {pageOptions.length}</strong>{' '}
        </span>
        <span>
          | idź do strony: {' '}
          <input
            type={'number'}
            defaultValue={state.pageIndex + 1}
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
      <Popup
        title={'Akcje zlecenia'}
        trigger={rowPopup}
        closePopup={() => setRowPopup(false)}
        style={{
          padding: 10,
          width: 300,
          top: `calc(${rowActions.posY}px - 120px)`,
          left: `calc(${rowActions.posX}px - 400px)`
        }}
      >
        <a href={rowActions.rowUrl} target="_blank" rel="noopener noreferrer">
          <Button
            title={'Edytuj zlecenie w Trello'}
            icon={<MdKeyboardArrowRight fontSize={'19px'} />}
          />
        </a>
        <Button
          title={'Usuń zlecenie'}
          onClick={handleDeleteCard}
          icon={<MdOutlineDeleteOutline fontSize={'19px'} />}
        />
      </Popup>
    </div>
  );
}

export default CardsTable;