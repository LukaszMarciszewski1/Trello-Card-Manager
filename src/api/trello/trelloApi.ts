import { useState } from 'react';
import axios from 'axios';
import { Card, CardDescription } from 'models/card';
import { Member, Board, List } from 'models/trelloDataModels/index';
import { cardFormData } from './cardFormData/cardFormData';

const {
  REACT_APP_TRELLO_KEY,
  REACT_APP_TRELLO_TOKEN,
  REACT_APP_TRELLO_URL,
  REACT_APP_TRELLO_GET_BOARDS,
} = process.env;

const config = {
  params: {
    key: REACT_APP_TRELLO_KEY,
    token: REACT_APP_TRELLO_TOKEN,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};

const createTrelloCard = async (data: Card, listId: string): Promise<Card> => {
  const formInitialDataCard = cardFormData.initialFormData(data, listId);
  const formChecklistDataCard = cardFormData.checklistFormData();

  const response = await axios.post<Card>(
    `${REACT_APP_TRELLO_URL}/cards`,
    formInitialDataCard,
    config,
  );

  await Promise.all(
    [...data.attachment]?.map(async (file: File) => {
      const formFileDataCard = cardFormData.fileFormData(file);
      await axios.post(
        `${REACT_APP_TRELLO_URL}/cards/${response.data.id}/attachments`,
        formFileDataCard,
        config,
      );
    }) ?? [],
  );

  const checklistRes = await axios.post(
    `${REACT_APP_TRELLO_URL}/cards/${response.data.id}/checklists`,
    formChecklistDataCard,
    config,
  );

  await Promise.all(
    data?.description?.map(async (desc: CardDescription) => {
      await axios.post(
        `${REACT_APP_TRELLO_URL}/checklists/${checklistRes.data.id}/checkItems`,
        {
          name: desc.logo,
          checked: false,
        },
        config,
      );
    }) ?? [],
  );

  return response.data;
};

const deleteTrelloCard = async (id: string): Promise<void> => {
  await axios.delete(`${REACT_APP_TRELLO_URL}/cards/${id}`, config);
};

const archiveTrelloCard = async (id: string): Promise<void> => {
  await axios.put(`${REACT_APP_TRELLO_URL}/cards/${id}`, {
    ...config.params,
    closed: true,
  });
};

const getTrelloBoards = async (): Promise<Board[]> => {
  const response = await axios.get(`${REACT_APP_TRELLO_GET_BOARDS}`, config);
  const boardInfoList = response.data?.map((board: Board) => ({
    name: board.name,
    id: board.id,
  }));
  return boardInfoList;
};

const getTrelloCards = async (filter: string): Promise<Card[]> => {
  const boards = await getTrelloBoards();
  const response = await Promise.all(
    boards
      .map(async (board: { id: string }) => {
        const boardCards = await axios.get(
          `${REACT_APP_TRELLO_URL}/boards/${board.id}/cards/${filter}`,
          config,
        );
        return boardCards.data;
      }),
  ).then((res) => {
    const allCards = [].concat(...res);
    return allCards;
  });

  return response;
};

const getTrelloLists = async (filter: string): Promise<List[]> => {
  const boards = await getTrelloBoards();
  const response = await Promise.all(
    boards
      .map(async (board: { id: string }) => {
        const boardList = await axios.get(
          `${REACT_APP_TRELLO_URL}/boards/${board.id}/lists/${filter}`,
          config,
        );
        return boardList.data;
      }),
  ).then((res) => {
    const allLists = [].concat(...res);
    return allLists;
  });

  return response;
};

const getTrelloMembers = async (): Promise<Member[]> => {
    const boards = await getTrelloBoards();
    const response = await Promise.all(
      boards.map(async (board: { id: string }) => {
        const boardMembers = await axios.get(
          `${REACT_APP_TRELLO_URL}/boards/${board.id}/members`,
          config,
        );
        return boardMembers.data;
      }),
    ).then((res) => {
        const allMembers = [].concat(...res);
        const ids = allMembers?.map((obj: Member) => obj.id);
        return allMembers.filter(({ id }, index) => !ids.includes(id, index + 1),
        );
    });

    return response
};

const trelloApi = {
  createTrelloCard,
  deleteTrelloCard,
  archiveTrelloCard,
  getTrelloBoards,
  getTrelloCards,
  getTrelloLists,
  getTrelloMembers,
};

export default trelloApi;
