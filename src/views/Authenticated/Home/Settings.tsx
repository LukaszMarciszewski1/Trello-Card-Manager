import React, { useEffect, useState } from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import styles from './styles.module.scss';
import CmsTable from 'components/organisms/Table/Table';
import { useTrelloApi } from 'hooks/useTrelloApi';
import { dataFilters } from 'data/dataFilters/dataFilters';
import { useSettingsApi } from 'hooks/useSettings';

const Settings = () => {
  const [selectedFilter, setSelectedFilter] = useState(dataFilters[1].value);
  const { getCards, getMembers, cards, members } = useTrelloApi();
  const { users, getAllUsers } = useSettingsApi();

  useEffect(() => {
    getCards(selectedFilter);
    getMembers();
  }, [selectedFilter]);

  useEffect(() => {
    getAllUsers()
  }, [])
  console.log(users)

  return (
    <Tabs navTitle={'Ustawienia:'}>
      <TabsContent title={'Użytkownicy'}>
        <CmsTable cards={users} members={members} />
      </TabsContent>
      <TabsContent title={'Produkty'}>
        <div />
      </TabsContent>
      <TabsContent title={'Cennik'}>
        <div />
      </TabsContent>
    </Tabs>
  );
};

export default Settings;
