import React, { useEffect, useState } from 'react';
import Table from 'components/organisms/Table/Table';
import { useSettingsApi } from 'hooks/useSettings';
import { DisplayUser, Role } from 'models/user';
import Modal from '../../components/Modal/Modal';
import { useForm } from 'react-hook-form';
import Input from 'components/common/Input/Input';
import styles from './styles.module.scss';
import Select from 'components/common/Select/Select';
import { MdLockOutline } from 'react-icons/md';
import Button from 'components/common/Button/Button';

interface UsersProps {
  header: string;
}

const roleOptions = [
  {
    label: Role.Admin,
    value: Role.Admin,
  },
  {
    label: Role.User,
    value: Role.User,
  },
];

const Users: React.FC<UsersProps> = ({ header }) => {
  const { users, getAllUsers, updateUser } = useSettingsApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<DisplayUser | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DisplayUser>();

  useEffect(() => {
    getAllUsers();
    if(currentRow){
      setValue("role", currentRow.role);
    }
  }, [currentRow]);

  const handleEditRow = (row: DisplayUser) => {
    setCurrentRow(row);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (data: any) => {
    const { role } = data;
    try {
      if (currentRow) {
        await updateUser(currentRow.id, role).then(() => setCurrentRow({...currentRow, role: role}));
      }
    } catch (err) {
      alert('Nieprawidłowy email lub hasło');
      console.log(err);
    }
  };

  return (
    <>
      <Table dataResponse={users} handleEditRow={handleEditRow} />
      <Modal
        trigger={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        currentRowName={
          currentRow && (
            <span>
              <small>{header}</small> / {currentRow.name}
            </span>
          )
        }
      >
        <>
          {currentRow ? (
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className={styles.inputGroup}>
                <Input
                  id={'name'}
                  placeholder={'imię i nazwisko'}
                  label={'Imię i nazwisko'}
                  type='text'
                  value={currentRow.name}
                  disabled={true}
                  {...register('name')}
                />
                <Input
                  id={'email'}
                  placeholder={'email'}
                  label={'Email'}
                  type='text'
                  value={currentRow.email}
                  disabled={true}
                  {...register('email')}
                />
              </div>
              <div className={styles.inputGroup}>
                <Input
                  id={'username'}
                  placeholder={'Trello username'}
                  label={'Trello username'}
                  type='text'
                  value={currentRow.username}
                  disabled={true}
                  {...register('username')}
                />
                <Select
                  label={'status'}
                  options={roleOptions}
                  id={'role'}
                  defaultValue={currentRow.role}
                  {...register('role')}
                />
              </div>
              <Button
                style={{ width: 100, height: 36 }}
                type='submit'
                title={'zapisz'}
              />
            </form>
          ) : null}
        </>
      </Modal>
    </>
  );
};

export default Users;
