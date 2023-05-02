import React, { useEffect } from 'react';
import { useTrelloApi } from 'hooks/useTrelloApi';
import AppLayout from 'layouts/AppLayout/AppLayout';
import Navbar from 'components/organisms/Navbar/Navbar';

const Settings = () => {
  const {
    getCards,
    getMembers,
    getBoards,
    getLists,
    cards,
    members,
    boards,
    lists,
  } = useTrelloApi();

  useEffect(() => {
    getMembers();
  }, []);

  console.log(members);
  return (
    <AppLayout>
      <Navbar />
      <ul>
        {members?.map((member) => (
          <li key={member.id}>{member.fullName}</li>
        ))}
      </ul>
    </AppLayout>
  );
};

export default Settings;
