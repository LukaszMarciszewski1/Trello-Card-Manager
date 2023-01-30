import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

import * as constants from 'constants/index';
import { traders, fabric, departments } from "data/appData/index";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardDescription } from "models/card";
import { AddCardForm } from 'api/trello'

import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  getSelectedSizeName,
} from "calculation/calculator";


import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import Checkbox from "components/common/Checkbox/Checkbox";
import Select from "components/common/Select/Select";
import SectionForm from "components/templates/SectionForm/SectionForm";
import Textarea from "components/common/Textarea/Textarea";
import SuccessModal from "components/templates/SuccessModal/SuccessModal";
import { RiAddLine } from "react-icons/ri";

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
  materials: []
};

const EmbroideryForm: React.FC = () => {
  dayjs.locale("pl");

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
      department: constants.EMBROIDERY
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "description",
    control,
  });

  const watchForChangesInSectionForms = watch('description');
  const [sectionForms, setSectionForms] = useState<CardDescription[]>([])
  const [watchCustomPrice, setWatchCustomPrice] = useState('')
  const [watchFormSizeWidth, setWatchFormSizeWidth] = useState('')
  const [watchFormSizeHeight, setWatchFormSizeHeight] = useState('')
  const [watchPacking, setWatchPacking] = useState(false)
  const [successSubmit, setSuccessSubmit] = useState(false)

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms)
  }, [watchForChangesInSectionForms])

  useEffect(() => {
    setValue('orderPrice', getTotalPrice(sectionForms))
    setValue('orderCost', Number((getTotalPrice(sectionForms) * 0.75).toFixed(1)))
    fields.map((item, index) => {
      setValue(`description.${index}.customPrice`, true)
      setValue(`description.${index}.price`, getPriceForSection(sectionForms, index))
      setValue(`description.${index}.priceForOnePiece`, getPriceForOnePieceOfSection(sectionForms, index))
    })
  }, [
    getTotalPrice(sectionForms),
    watchCustomPrice,
    watchFormSizeWidth,
    watchFormSizeHeight,
    watchPacking
  ])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.size`, getSelectedSizeName(sectionForms, index))
    })
  }, [
    watchFormSizeWidth,
    watchFormSizeHeight,
    sectionForms
  ])

  const handleWatchCustomPriceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchCustomPrice(e.target.value)
  }

  const handleWatchFormSizeWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeWidth(e.target.value)
  }

  const handleWatchFormSizeHeightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeHeight(e.target.value)
  }

  const handleWatchPacking = () => {
    setWatchPacking(!watchPacking)
  }

  const handleSubmitForm = (data: Card) => {
    const listId = process.env.REACT_APP_TRELLO_EMBROIDERY_LIST
    if (data && listId) {
      AddCardForm(data, listId);
      setSuccessSubmit(true)
      reset()
    }
  }

  const closeModal = () => setSuccessSubmit(false)

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.formContainer}>
        <SuccessModal
          trigger={successSubmit}
          closeModal={closeModal}
          boardName={constants.EMBROIDERY}
        />
        <div className={styles.formGroupContainer}>
          <div className={styles.formGroupRow}>
            <>
              <Input
                id={"title"}
                placeholder={""}
                label={constants.CONTRACTOR}
                type="text"
                error={errors.title}
                style={{ padding: "10px", height: 48, fontSize: 17 }}
                {...register("title", { required: true })}
              />
            </>
            <div className={styles.checkboxList}>
              {traders?.map((trader, index) => (
                <Checkbox
                  key={index}
                  id={trader.initial}
                  type={"radio"}
                  value={trader.id}
                  label={trader.initial}
                  error={errors.member}
                  {...register("member", { required: true })}
                />
              ))}
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <SectionForm key={field.id}>
                <div className={styles.sectionContent}>
                  <div className={styles.formGroupColumn} style={{ justifyContent: 'space-between' }}>
                    <Input
                      id={field.id}
                      label={constants.LOGO}
                      type="text"
                      error={errors.description}
                      {...register(`description.${index}.logo` as const, {
                        required: true,
                      })}
                      defaultValue={field.logo}
                    />
                    <Textarea
                      id={field.id}
                      label={constants.ADDITIONAL_DESC}
                      {...register(`description.${index}.additionalDesc` as const)}
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
                      type="number"
                      step={"1"}
                      min={0}
                      {...register(`description.${index}.amount` as const,
                        { onChange: handleWatchCustomPriceValue, required: true })
                      }
                    />
                    <div className={styles.rowContainer}>
                      <Input
                        id={field.id}
                        label={constants.WIDTH}
                        type="number"
                        step={"0.1"}
                        min={0}
                        {...register(`description.${index}.width` as const,
                          { onChange: handleWatchFormSizeWidthValue, required: true })
                        }
                      />
                      <Input
                        id={field.id}
                        label={constants.HEIGHT}
                        type="number"
                        step={"0.1"}
                        min={0}
                        {...register(`description.${index}.height` as const,
                          { onChange: handleWatchFormSizeHeightValue, required: true })
                        }
                      />
                    </div>
                    <Input
                      id={field.id}
                      label={constants.SIZE}
                      type="text"
                      {...register(`description.${index}.size` as const)}
                      readOnly
                    />
                    <div className={styles.formGroupRow} style={{ margin: '10px 0 5px' }}>
                      <label>{constants.PACKING}</label>
                      <input
                        id={field.id}
                        className={styles.defaultCheckbox}
                        type={'checkbox'}
                        {...register(`description.${index}.packing` as const, { onChange: handleWatchPacking })}
                      />
                    </div>
                    <div className={styles.rowContainer}>
                      <>
                        <div style={{ width: 120, marginRight: 15 }}>
                          <Input
                            id={field.id}
                            label={constants.PRICE_FOR_ONE_PIECE}
                            style={{ border: '2px solid green' }}
                            type="number"
                            min={0}
                            {...register(`description.${index}.priceForOnePiece` as const,
                              { onChange: handleWatchCustomPriceValue })
                            }
                          />
                        </div>
                        <Input
                          id={field.id}
                          label={constants.SECTION_PRICE}
                          type="number"
                          {...register(`description.${index}.price` as const)}
                          readOnly
                        />
                      </>
                    </div>
                    {
                      sectionForms.length > 1 ? (
                        <Button
                          type={"button"}
                          title={constants.DELETE_SECTION}
                          onClick={() => remove(index)}
                          style={{ margin: '20px 0 0' }}
                        />
                      ) : null
                    }
                  </div>
                </div>
              </SectionForm>
            );
          })}
          <Button
            type={"button"}
            title={constants.ADD_SECTION}
            onClick={() => append(defaultSectionValues)}
            style={{ fontSize: "1.2rem" }}
            icon={<RiAddLine fontSize={"1.5rem"} fontWeight={"bold"} />}
          />
        </div>
        <div className={`${styles.formGroupContainer} ${styles.rightPanel}`}>
          <div className={`${styles.formGroupColumn} ${styles.rightPanelColumn}`}>
            <div className={styles.inputContainer}>
              <Select
                label={constants.RECIPIENT}
                options={departments.embroidery}
                id={"recipient"}
                {...register("recipient")}
              />
              <Input
                id={"startDate"}
                placeholder={constants.START_DATE}
                label={constants.START_DATE}
                value={new Date().toISOString().slice(0, 10)}
                type="date"
                {...register("startDate")}
              />
              <Input
                id={"endDate"}
                placeholder={constants.END_DATE}
                label={constants.END_DATE}
                type="date"
                error={errors.endDate}
                {...register("endDate", { required: true })}
              />
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.inputContainer}>
                <Input
                  id={"attachment"}
                  placeholder={constants.ATTACHMENT}
                  style={{ backgroundColor: '#fdfdfd' }}
                  label={constants.ATTACHMENT}
                  type="file"
                  {...register("attachment")}
                />
                <Input
                  id={"filePath"}
                  placeholder={constants.FILE_PATH_PLACEHOLDER}
                  label={constants.FILE_PATH}
                  type="text"
                  {...register(`filePath`)}
                />
              </div>
            </div>
            <Input
              id={'orderPrice'}
              label={constants.ORDER_PRICE}
              type="number"
              {...register(`orderPrice`)}
              readOnly
            />
            <Input
              id={'orderCost'}
              label={constants.ORDER_COST}
              type="number"
              {...register(`orderCost`)}
              readOnly
            />
            <div className={styles.buttonContainer}>
              <Button type={"submit"} title={constants.SUBMIT_TASK} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmbroideryForm;