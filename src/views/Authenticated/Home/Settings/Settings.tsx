import React, { useEffect, useState } from 'react';
import Tabs from 'components/organisms/Tabs/Tabs';
import TabsContent from 'components/organisms/Tabs/TabsContent/TabsContent';
import styles from './styles.module.scss';
import Table from 'components/organisms/Table/Table';
import { useTrelloApi } from 'hooks/useTrelloApi';
import { dataFilters } from 'data/dataFilters/dataFilters';
import { useSettingsApi } from 'hooks/useSettings';
import Modal from './components/Modal/Modal';
import Users from './containers/Users/Users';

const Settings = () => {
  return (
    <Tabs navTitle={'Ustawienia:'}>
      <TabsContent title={'Użytkownicy'}>
        <Users header={'Użytkownicy'}/>
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
