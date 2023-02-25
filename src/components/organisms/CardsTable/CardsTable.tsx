import React, { useState, useCallback, useEffect, useMemo } from "react";
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
import Select from 'components/common/Select/Select'
import { AiFillEdit } from "react-icons/ai";
import {
  MdSkipPrevious,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdOutlineDeleteOutline,
  MdOutlineArchive,
  MdOutlineFilterList
} from "react-icons/md";
import * as constants from 'constants/index';

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
  cards: any[]
  members: Member[]
  boards: any[]
  lists: any[]
  dataFilters: Filter[]
  selectedDataFilter: string
  setSelectedDataFilter: (e: string) => void
}

const CardsTable: React.FC<CardsTableProps> = ({
  cards,
  members,
  boards,
  lists,
  dataFilters,
  selectedDataFilter,
  setSelectedDataFilter,
}) => {
  const { getCards, deleteCard, archiveCard } = useTrelloApi()

  const [popupTrigger, setPopupTrigger] = useState(false)
  const [tableFilters, setTableFilters] = useState<string[]>([]);
  const [rowPopup, setRowPopup] = useState(false)
  const [checkedLocalFilter, setCheckedLocalFilter] = useState(false)
  const [currentRow, setCurrentRow] = useState({
    posY: 0,
    posX: 0,
    rowId: '',
    rowUrl: '',
    listId: '',
    name: '',
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
        const names = tradersNames.map(trader => trader.fullName).join(', ')
        return names
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
    const result = window.confirm(`Ta akcja spowoduje usunięcie karty ${currentRow.name} z Trello, czy chcesz usunąć kartę?`)
    if (!result) return
    await deleteCard(currentRow.rowId).then(async () => {
      alert('Karta została usunięta z tablicy w Trello')
      await getCards(selectedDataFilter)
      setRowPopup(false)
    })
  }

  const handleArchiveCard = async () => {
    const result = window.confirm(`Ta akcja spowoduje zarchiwizowanie karty ${currentRow.name} w Trello, czy chcesz zarchiwizować kartę?`)
    if (!result) return
    await archiveCard(currentRow.rowId).then(async () => {
      alert('Karta została zarchiwizowana')
      await getCards(selectedDataFilter)
      setRowPopup(false)
    })
  }

  const isTheSameListName = (listName: string): boolean => {
    let result = true
    if (currentRow.listId) {
      result = filterListName(currentRow.listId).toLowerCase() === listName.toLowerCase() ? false : true
    }
    return result
  }

  const handleSelectedFilter = (id: string) => {
    const newSelectedFilters = tableFilters.includes(id)
      ? tableFilters.filter((t) => t !== id)
      : [...tableFilters, id];
    setTableFilters(newSelectedFilters);
  }

  const filteredData = React.useMemo(() => {
    let selectedFilters = []

    const filteredAccountingColumn = cards.filter((row) => tableFilters.includes(filterListName(row.idList)))
    const filteredMembers = cards.filter(row => row.idMembers.some((id: string) => tableFilters.includes(id)))

    if (!tableFilters.length) {
      return cards;
    }
    
    if(filteredAccountingColumn.length){
      selectedFilters.push(...filteredAccountingColumn)
    }

    if (filteredMembers.length && !filteredAccountingColumn.length) {
      selectedFilters.push(...filteredMembers)
    }

    if (filteredMembers.length && filteredAccountingColumn.length) {
      const memberWithAccounting = filteredAccountingColumn.filter(accounting => filteredMembers.includes(accounting))
      selectedFilters = memberWithAccounting
    }

    return selectedFilters

  }, [cards, tableFilters]);


  const data = React.useMemo<any[]>(() => filteredData, [filteredData]);
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
        )
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
              setCurrentRow({
                posY: e.clientY,
                posX: e.clientX,
                rowId: row.original.id,
                rowUrl: row.original.url,
                listId: row.original.idList,
                name: row.original.name
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
        <div style={{ display: 'flex', alignItems: 'end', marginTop: 10 }}>
          <Button
            title={'Filtruj'}
            onClick={() => setPopupTrigger(true)}
            icon={<MdOutlineFilterList fontSize={'19px'} />}
            style={{ width: 120, margin: 0 }}
          />
          <Popup
            title={'Filtruj'}
            trigger={popupTrigger}
            closePopup={() => setPopupTrigger(false)}
            style={{
              padding: 10,
              width: 350,
              left: 'calc(100% - 350px)',
              top: 0
            }}
          >
            <div className={styles.popupContent}>
              <span>Tablice:</span>
              {dataFilters.map((filter: { value: string; label: string }, index: number) => (
                <Checkbox
                  key={index}
                  id={filter.value}
                  type={"radio"}
                  label={filter.label}
                  value={filter.value}
                  checked={selectedDataFilter === filter.value}
                  onChange={(e) => {
                    setCheckedLocalFilter(false)
                    setSelectedDataFilter(e.target.value)
                  }}
                  style={{
                    width: '100%',
                    margin: '0 0 10px 0'
                  }}
                />
              ))}
              <small>Filtrowanie tablic powoduje reset filtrów poniżej</small>
            </div>
            <div className={styles.popupContent}>
              <span>Listy:</span>
              <Checkbox
                id={constants.ACCOUNTING}
                type={"checkbox"}
                label={constants.ACCOUNTING}
                value={constants.ACCOUNTING}
                checked={tableFilters.includes(constants.ACCOUNTING)}
                onChange={() => handleSelectedFilter(constants.ACCOUNTING)}
                // checked={checkedLocalFilter}
                // onChange={(e) => {
                //   setGlobalFilter(!checkedLocalFilter ? constants.ACCOUNTING : '')
                //   setCheckedLocalFilter(prev => !prev)
                // }}
                style={{
                  width: '100%',
                  margin: '0 0 10px 0'
                }}
              />
            </div>
            <div className={styles.popupContent}>
              <span>Handlowcy:</span>
              {
                traders.map((trader) => (
                  <Checkbox
                    key={trader.name}
                    id={trader.name}
                    type={"checkbox"}
                    label={trader.name}
                    value={trader.name}
                    checked={tableFilters.includes(trader.id)}
                    onChange={() => handleSelectedFilter(trader.id)}
                    style={{
                      width: '100%',
                      margin: '0 0 10px 0'
                    }}
                  />
                ))
              }
            </div>
          </Popup>
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
          top: `calc(${currentRow.posY}px - 120px)`,
          left: `calc(${currentRow.posX}px - 400px)`
        }}
      >
        <a href={currentRow.rowUrl} target="_blank" rel="noopener noreferrer">
          <Button
            title={'Edytuj zlecenie w Trello'}
            icon={<MdKeyboardArrowRight fontSize={'19px'} />}
          />
        </a>
        <Button
          title={'Zarchiwizuj'}
          onClick={handleArchiveCard}
          icon={<MdOutlineArchive fontSize={'19px'} />}
          disabled={isTheSameListName(constants.ACCOUNTING)}
        />
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



// const filteredData = React.useMemo(() => {
//   let selectedFilters = []

//   if (!tableFilters.length) {
//     return cards;
//   } else {
//     const accountingList = cards.filter((row) => tableFilters.includes(filterListName(row.idList)))
//     selectedFilters.push(...accountingList)
//     if(accountingList.length){
//       const membersFilter = 0
//     }
//   }
//   console.log(selectedFilters)
//   return selectedFilters
//   // return cards.filter((row) => row.idMembers.some((id: string) => tableFilters.includes(id)))
// }, [cards, tableFilters]);