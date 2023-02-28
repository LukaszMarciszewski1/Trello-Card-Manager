import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

import * as constants from 'constants/index';
import { Card, CardDescription } from "models/card";
import { Member } from "models/member";
import { fabric, departments } from "data/formData/index";
import { materials } from "data/formData/materials";
import { useForm, useFieldArray } from "react-hook-form";
import getInitials from "helpers/getInitials";

import {
  getPriceForOnePieceOfSection,
  getTotalPrice,
  getPriceForSection,
  isMoreThanMaximumSize,
  getSelectedSizeName,
  isDisplayFabric
} from "calculations/priceListOfServices";

import FormLayout from "components/layouts/FormLayout/FormLayout";
import FormSectionLayout from 'components/layouts/FormSectionLayout/FormSectionLayout'
import SectionTabs from "components/organisms/SectionTabs/SectionTabs";
import SectionTabsContent from 'components/organisms/SectionTabs/TabsContent/TabsContent'
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import Checkbox from "components/common/Checkbox/Checkbox";
import Select from "components/common/Select/Select";
import Textarea from "components/common/Textarea/Textarea";
import MessageModal from "components/organisms/MessageModal/MessageModal";
import MaterialsForm from "./Materials/Materials";
import { RiAddLine } from "react-icons/ri";
import { useTrelloApi } from "hooks/useTrelloApi";
import { Material } from "models/material";

interface FormProps {
  listId: any
  boardName: string
  members: Member[]
}

const defaultSectionValues = {
  materialAccess: true,
  materialType: materials[0]?.application,
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

const PlotterForm: React.FC<FormProps> = ({boardName, listId, members}) => {
  dayjs.locale("pl");
  const { addCard, success, error, loading, boards, lists } = useTrelloApi()

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
      department: boardName
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
  const [submitMessage, setSubmitMessage] = useState(false)
  const [validMaterialsForm, setValidMaterialsForm] = useState(false)
  const [watchMaterialsForm, setWatchMaterialsForm] = useState(false)

  useEffect(() => {
    setSectionForms(watchForChangesInSectionForms)
  }, [watchForChangesInSectionForms])

  useEffect(() => {
    setValue('orderPrice', getTotalPrice(sectionForms))
    setValue('orderCost', Number((getTotalPrice(sectionForms) * 0.75).toFixed(1)))
    fields.map((item, index) => {
      setValue(`description.${index}.price`, getPriceForSection(sectionForms, index))
      setValue(`description.${index}.priceForOnePiece`, getPriceForOnePieceOfSection(sectionForms, index))
    })
  }, [getTotalPrice(sectionForms), watchCustomPrice, watchFormSizeWidth, watchFormSizeHeight, watchPacking])

  useEffect(() => {
    fields.map((item, index) => {
      setValue(`description.${index}.customPrice`, isMoreThanMaximumSize(sectionForms, index))
      setValue(`description.${index}.size`, getSelectedSizeName(sectionForms, index))
    })
  }, [watchFormSizeWidth, watchFormSizeHeight, sectionForms])

  const handleWatchCustomPriceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchCustomPrice(e.target.value)
  }

  const handleWatchFormSizeWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeWidth(e.target.value)
    console.log(e.target.value)
  }

  const handleWatchFormSizeHeightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWatchFormSizeHeight(e.target.value)
  }

  const handleWatchPacking = () => {
    setWatchPacking(!watchPacking)
  }

  const closeModal = () => {
    setWatchMaterialsForm(false)
    setSubmitMessage(false)
    setValidMaterialsForm(false)
    reset()
  }

  interface GetMaterials {
    (index: number): Material[];
  }

  const getMaterials: GetMaterials = (index: number) => {
    return materials.filter(material => (
      material.application.toLowerCase() === sectionForms[index]?.materialType?.toLowerCase()
    ))
  }

  const handleSubmitForm = (data: Card) => {
    // const listId = listId
    setWatchMaterialsForm(true)
    if (data && listId && validMaterialsForm) {
      addCard(data, listId);
      setSubmitMessage(true)
    }
  }

  const materialTabsValues: string[] = [
    constants.FLEX_FLOCK,
    constants.SOLVENT,
    constants.SUBLIMATION,
    constants.TRANSFERS,
  ]

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormLayout>
        <MessageModal
          trigger={submitMessage}
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
                id={"title"}
                placeholder={""}
                label={constants.CONTRACTOR}
                type="text"
                error={errors.title}
                style={{ padding: "10px", height: 48, fontSize: 17 }}
                {...register("title", { required: true })}
              />
            </>
            <div className={styles.checkboxListContainer}>
              {members?.map((member: Member) => (
                <Checkbox
                  key={member.id}
                  id={member.id}
                  type={"radio"}
                  value={member.id}
                  label={getInitials(member.fullName)}
                  error={errors.member}
                  style={{ height: 48 }}
                  {...register("member", { required: true })}
                />
              ))}
            </div>
          </div>
          {fields.map((field, index) => {
            return (
              <FormSectionLayout key={field.id}>
                <div className={styles.formGroupColumn}>
                  <Input
                    id={field.id}
                    label={constants.LOGO}
                    type="text"
                    error={errors.description?.[index]?.logo}
                    {...register(`description.${index}.logo` as const, {
                      required: true,
                    })}
                    defaultValue={field.logo}
                  />
                  <div className={styles.sectionTabsContainer}>
                    <SectionTabs
                      tabsLabel={constants.CHOOSE_MATERIAL_TYPE}
                      setTabTitle={(e: string) => setValue(`description.${index}.materialType`, e)}
                    >
                      {
                        materialTabsValues.map((value, i) => (
                          <SectionTabsContent title={value} key={i}>
                            <MaterialsForm
                              {...{ control, register }}
                              registerName={`description[${index}].materials`}
                              materials={getMaterials(index)}
                              dataForm={sectionForms[index]}
                              materialsType={sectionForms[index]?.materialType}
                              setValidMaterialsForm={setValidMaterialsForm}
                              watchMaterialsForm={watchMaterialsForm}
                            />
                          </SectionTabsContent>
                        ))
                      }
                    </SectionTabs>
                  </div>
                  <Textarea
                    id={field.id}
                    label={constants.ADDITIONAL_DESC}
                    maxRow={30}
                    {...register(`description.${index}.additionalDesc` as const)}
                  />
                </div>
                <div className={styles.formGroupColumn}>
                  {
                    !isDisplayFabric(sectionForms[index]) ? (
                      <Select
                        label={constants.FABRIC}
                        options={fabric}
                        id={field.id}
                        defaultValue={field.fabric}
                        {...register(`description.${index}.fabric` as const)}
                      />
                    ) : null
                  }
                  <Input
                    id={field.id}
                    placeholder={constants.AMOUNT}
                    label={constants.AMOUNT}
                    type="number"
                    step={"1"}
                    min={1}
                    error={errors.description?.[index]?.amount}
                    {...register(`description.${index}.amount` as const,
                      { onChange: handleWatchCustomPriceValue, required: true })
                    }
                  />
                  <div className={styles.rowWrapper}>
                    <Input
                      id={field.id}
                      placeholder={constants.WIDTH}
                      label={constants.WIDTH}
                      type="number"
                      step={"0.1"}
                      min={0.1}
                      error={errors.description?.[index]?.width}
                      {...register(`description.${index}.width` as const,
                        { onChange: handleWatchFormSizeWidthValue, required: true })
                      }
                    />
                    <Input
                      id={field.id}
                      placeholder={constants.HEIGHT}
                      label={constants.HEIGHT}
                      type="number"
                      step={"0.1"}
                      min={0.1}
                      error={errors.description?.[index]?.height}
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
                      className={styles.checkbox}
                      type={'checkbox'}
                      {...register(`description.${index}.packing` as const, { onChange: handleWatchPacking })}
                    />
                  </div>
                  <div className={styles.rowWrapper}>
                    {
                      isMoreThanMaximumSize(sectionForms, index) ? (
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
                      ) : (
                        <>
                          <div style={{ width: 120, marginRight: 15 }}>
                            <Input
                              id={field.id}
                              label={constants.PRICE_FOR_ONE_PIECE}
                              type="number"
                              {...register(`description.${index}.priceForOnePiece` as const)}
                              readOnly
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
                      )
                    }
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
              </FormSectionLayout>
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
        <div className={`${styles.formColumnContainer} ${styles.rightColumnContainer}`}>
          <div className={`${styles.formGroupColumn} ${styles.rightGroupColumn}`}>
            <div className={styles.inputContainer}>
              <Select
                label={constants.RECIPIENT}
                options={departments.plotter}
                id={"recipient"}
                {...register("recipient")}
              />
              <div style={{ display: 'none' }}>
                <Input
                  id={"startDate"}
                  // placeholder={constants.START_DATE}
                  // label={constants.START_DATE}
                  value={new Date().toISOString().slice(0, 10)}
                  type="date"
                  style={{ display: 'none' }}
                  {...register("startDate")}
                />
              </div>
              {/* <Input
                id={"startDate"}
                placeholder={constants.START_DATE}
                label={constants.START_DATE}
                value={new Date().toISOString().slice(0, 10)}
                type="date"
                {...register("startDate")}
              /> */}
              <Input
                id={"endDate"}
                placeholder={constants.END_DATE}
                label={constants.END_DATE}
                type="date"
                error={errors.endDate}
                {...register("endDate", { required: true })}
              />
            </div>
            <div className={styles.divider}>
              <div className={styles.inputContainer}>
                <Input
                  id={"attachment"}
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
            <div className={styles.divider}>
              <Button type={"submit"} title={constants.SUBMIT_TASK} />
            </div>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};

export default React.memo(PlotterForm);
