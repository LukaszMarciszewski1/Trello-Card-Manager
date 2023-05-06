import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import {
  useTable,
  Column,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { Member, Board, List } from 'models/trelloDataModels/index';
import Button from 'components/common/Button/Button';
import { useTrelloApi } from 'hooks/useTrelloApi';
import Checkbox from 'components/common/Checkbox/Checkbox';
import Popup from 'components/common/Popup/Popup';
import Loading from 'components/common/Loading/Loading';
import { AiFillEdit } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import {
  MdSkipPrevious,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdOutlineDeleteOutline,
  MdOutlineArchive,
  MdOutlineFilterList,
} from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import * as constants from 'constants/index';

interface Filter {
  value: string;
  label: string;
}
interface CardsTableProps {
  cards: any[];
  members: Member[];
}

const Table: React.FC<CardsTableProps> = ({ cards, members }) => {
  const { getCards, deleteCard, archiveCard } = useTrelloApi();

  const [isRefresh, setIsRefresh] = useState(false);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [tableFilters, setTableFilters] = useState<string[]>([]);
  const [rowPopup, setRowPopup] = useState(false);
  const [currentRow, setCurrentRow] = useState({
    posY: 0,
    posX: 0,
    rowId: '',
    rowUrl: '',
    listId: '',
    name: '',
  });

  const data = React.useMemo<any[]>(() => cards, [cards]);
  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: 'Imię i Nazwisko',
        accessor: 'name',
      },
      {
        Header: 'Trello user',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Rola',
        accessor: 'role',
      },
    ],
    [cards, members],
  );

  const tableHooks = (hooks: {
    visibleColumns: ((columns: any) => any[])[];
  }) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Edytuj',
        Cell: ({ row }: any) => (
          <Button
            type={'button'}
            onClick={(e: { clientY: number; clientX: number }) => {
              setRowPopup(true);
              setCurrentRow({
                posY: e.clientY,
                posX: e.clientX,
                rowId: row.original.id,
                rowUrl: row.original.url,
                listId: row.original.idList,
                name: row.original.name,
              });
            }}
            style={{ width: 36, margin: 0, opacity: 0.7, backgroundColor: 'transparent' }}
            icon={<BiDotsHorizontalRounded fontSize={20} />}
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
    tableHooks as any,
  );

  return (
    <div className={styles.settingsTable}>
      <div className={styles.headerContainer}></div>
      <table {...getTableProps()}>
        {isRefresh ? (
          <div className={styles.refreshContainer}>
            <Loading size={60} />
          </div>
        ) : null}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ' '}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.tableRow} onClick={() =>console.log(row)}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
