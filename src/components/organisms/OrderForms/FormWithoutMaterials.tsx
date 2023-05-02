import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useForm, useFieldArray } from 'react-hook-form';
import * as constants from 'constants/index';

import { fabric, departments } from 'data/formData/index';
import { Card, CardDescription } from 'models/card';
import { Member } from 'models/trelloDataModels/member';
import { useTrelloApi } from 'hooks/useTrelloApi';
import { useWatchSectionForm } from 'hooks/useWatchSectionForm';

import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  getSelectedSizeName,
} from 'services/calculator';

import FormLayout from 'layouts/FormLayout/FormLayout';
import FormSectionLayout from 'layouts/FormSectionLayout/FormSectionLayout';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import Checkbox from 'components/common/Checkbox/Checkbox';
import Select from 'components/common/Select/Select';
import Textarea from 'components/common/Textarea/Textarea';
import MessageModal from 'components/organisms/MessageModal/MessageModal';
import { RiAddLine } from 'react-icons/ri';

interface FormWithoutMaterialsProps {
  listId: string | undefined;
  boardName: string;
  member: Member | undefined;
}
const defaultSectionValues = {
  materialAccess: false,
  logo: '',
  amount: 1,
  fabric: fabric[0].value,
  size: constants.CHOOSE_SIZE.toUpperCase(),
  width: 0.1,
  height: 0.1,
  price: 0,
  priceForOnePiece: 0,
  customPrice: false,
  packing: false,
  additionalDesc: '',
  materials: [],
};

const FormWithoutMaterials: React.FC<FormWithoutMaterialsProps> = ({
  boardName,
  listId,
  member,
}) => {
  const { addCard, success, error, loading, members } = useTrelloApi();
  const { watchSectionForm, setWatchSectionForm } = useWatchSectionForm();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<Card>({
    defaultValues: {
      description: [defaultSectionValues],
      department: boardName,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'description',
    control,
  });

  const watchForChangesInSectionForms = watch('description');
  const [sectionForms, setSectionForms] = useState<CardDescription[]>([]);

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms);
  }, [watchForChangesInSectionForms]);

  useEffect(() => {
    setValue('orderPrice', getTotalPrice(sectionForms));
    setValue(
      'orderCost',
      Number((getTotalPrice(sectionForms) * 0.75).toFixed(1)),
    );
    fields.map((item, index) => {
      setValue(`description.${index}.customPrice`, true);
      setValue(
        `description.${index}.price`,
        getPriceForSection(sectionForms, index),
      );
      setValue(
        `description.${index}.priceForOnePiece`,
        getPriceForOnePieceOfSection(sectionForms, index),
      );
    });
  }, [
    getTotalPrice(sectionForms),
    watchSectionForm.customPrice,
    watchSectionForm.sizeWidth,
    watchSectionForm.sizeHeight,
    watchSectionForm.packing,
  ]);

  useEffect(() => {
    fields.map((item, index) => {
      setValue(
        `description.${index}.size`,
        getSelectedSizeName(sectionForms, index),
      );
    });
  }, [watchSectionForm.sizeWidth, watchSectionForm.sizeHeight, sectionForms]);

  const handleWatchCustomPriceValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWatchSectionForm({ ...watchSectionForm, customPrice: e.target.value });
  };

  const handleWatchFormSizeWidthValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWatchSectionForm({ ...watchSectionForm, sizeWidth: e.target.value });
  };

  const handleWatchFormSizeHeightValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWatchSectionForm({ ...watchSectionForm, sizeHeight: e.target.value });
  };

  const handleWatchPacking = () => {
    setWatchSectionForm({
      ...watchSectionForm,
      packing: !watchSectionForm.packing,
    });
  };

  const handleSubmitForm = (data: Card) => {
    if (data && listId) {
      addCard(data, listId);
      setWatchSectionForm({ ...watchSectionForm, message: true });
    }
  };

  const closeModal = () => {
    reset();
    setWatchSectionForm({ ...watchSectionForm, message: false });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormLayout>
        <MessageModal
          trigger={watchSectionForm.message}
          success={success}
          error={error}
          loading={loading}
          closeModal={closeModal}
          boardName={boardName}
        />
        <div className={styles.formColumnContainer}>
          <div className={styles.formGroupRow}>
            <>
              <Input
                id={'title'}
                placeholder={''}
                label={constants.CONTRACTOR}
                type='text'
                error={errors.title}
                style={{ padding: '10px', height: 48, fontSize: 17 }}
                {...register('title', { required: true })}
              />
            </>
            <div className={styles.checkboxesListContainer}>
              <span>{constants.TRADERS}</span>
              <div className={styles.checkboxesList}>
                {member ? (
                  <Checkbox
                    key={member.id}
                    id={member.id}
                    type={'radio'}
                    value={member.id}
                    title={member.fullName}
                    label={member.fullName}
                    error={errors.member}
                    checked={true}
                    style={{ height: 48, width: 'auto', whiteSpace: 'nowrap' }}
                    {...register('member', { required: true })}
                  />
                ) : null}
              </div>
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <FormSectionLayout key={field.id}>
                <div
                  className={styles.formGroupColumn}
                  style={{ justifyContent: 'space-between' }}
                >
                  <Input
                    id={field.id}
                    label={constants.LOGO}
                    type='text'
                    error={errors.description}
                    {...register(`description.${index}.logo` as const, {
                      required: true,
                    })}
                    defaultValue={field.logo}
                  />
                  <Textarea
                    id={field.id}
                    label={constants.ADDITIONAL_DESC}
                    maxRow={30}
                    {...register(
                      `description.${index}.additionalDesc` as const,
                    )}
                  />
                </div>
                <div className={styles.formGroupColumn}>
                  <Select
                    label={constants.FABRIC}
                    options={fabric}
                    id={field.id}
                    defaultValue={field.fabric}
                    {...register(`description.${index}.fabric` as const)}
                  />
                  <Input
                    id={field.id}
                    label={constants.AMOUNT}
                    type='number'
                    step={'1'}
                    min={0}
                    {...register(`description.${index}.amount` as const, {
                      onChange: handleWatchCustomPriceValue,
                      required: true,
                    })}
                  />
                  <div className={styles.rowWrapper}>
                    <Input
                      id={field.id}
                      label={constants.WIDTH}
                      type='number'
                      step={'0.1'}
                      min={0}
                      {...register(`description.${index}.width` as const, {
                        onChange: handleWatchFormSizeWidthValue,
                        required: true,
                      })}
                    />
                    <Input
                      id={field.id}
                      label={constants.HEIGHT}
                      type='number'
                      step={'0.1'}
                      min={0}
                      {...register(`description.${index}.height` as const, {
                        onChange: handleWatchFormSizeHeightValue,
                        required: true,
                      })}
                    />
                  </div>
                  <Input
                    id={field.id}
                    label={constants.SIZE}
                    type='text'
                    {...register(`description.${index}.size` as const)}
                    readOnly
                  />
                  <div
                    className={styles.formGroupRow}
                    style={{ margin: '10px 0 5px' }}
                  >
                    <label>{constants.PACKING}</label>
                    <input
                      id={field.id}
                      className={styles.checkbox}
                      type={'checkbox'}
                      {...register(`description.${index}.packing` as const, {
                        onChange: handleWatchPacking,
                      })}
                    />
                  </div>
                  <div className={styles.rowWrapper}>
                    <>
                      <div style={{ width: 120, marginRight: 15 }}>
                        <Input
                          id={field.id}
                          label={constants.PRICE_FOR_ONE_PIECE}
                          style={{ border: '2px solid green' }}
                          type='number'
                          min={0}
                          {...register(
                            `description.${index}.priceForOnePiece` as const,
                            {
                              onChange: handleWatchCustomPriceValue,
                            },
                          )}
                        />
                      </div>
                      <Input
                        id={field.id}
                        label={constants.SECTION_PRICE}
                        type='number'
                        {...register(`description.${index}.price` as const)}
                        readOnly
                      />
                    </>
                  </div>
                  {sectionForms.length > 1 ? (
                    <Button
                      type={'button'}
                      title={constants.DELETE_SECTION}
                      onClick={() => remove(index)}
                      style={{ margin: '20px 0 0' }}
                    />
                  ) : null}
                </div>
              </FormSectionLayout>
            );
          })}
          <Button
            type={'button'}
            title={constants.ADD_SECTION}
            onClick={() => append(defaultSectionValues)}
            style={{ fontSize: '1.2rem' }}
            icon={<RiAddLine fontSize={'1.5rem'} fontWeight={'bold'} />}
          />
        </div>
        <div
          className={`${styles.formColumnContainer} ${styles.rightColumnContainer}`}
        >
          <div
            className={`${styles.formGroupColumn} ${styles.rightGroupColumn}`}
          >
            <div className={styles.inputContainer}>
              <Select
                label={constants.RECIPIENT}
                options={departments.embroidery}
                id={'recipient'}
                {...register('recipient')}
              />
              <div style={{ display: 'none' }}>
                <Input
                  id={'startDate'}
                  value={new Date().toISOString().slice(0, 10)}
                  type='date'
                  {...register('startDate')}
                />
              </div>
              <Input
                id={'endDate'}
                placeholder={constants.END_DATE}
                label={constants.END_DATE}
                type='date'
                error={errors.endDate}
                {...register('endDate', { required: true })}
              />
            </div>
            <div className={styles.divider}>
              <div className={styles.inputContainer}>
                <Input
                  id={'attachment'}
                  label={constants.ATTACHMENT}
                  type='file'
                  {...register('attachment')}
                />
                <Input
                  id={'filePath'}
                  placeholder={constants.FILE_PATH_PLACEHOLDER}
                  label={constants.FILE_PATH}
                  type='text'
                  {...register(`filePath`)}
                />
              </div>
            </div>
            <Input
              id={'orderPrice'}
              label={constants.ORDER_PRICE}
              type='number'
              {...register(`orderPrice`)}
              readOnly
            />
            <Input
              id={'orderCost'}
              label={constants.ORDER_COST}
              type='number'
              {...register(`orderCost`)}
              readOnly
            />
            <div className={styles.divider}>
              <Button type={'submit'} title={constants.SUBMIT_TASK} />
            </div>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};

export default FormWithoutMaterials;
