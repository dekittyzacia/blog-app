/* eslint-disable indent */
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Spin } from 'antd'

import FormInputItem from '../FormInputItem/FormInputItem'
import InputItem from '../InputItem/InputItem'

import './ArticleForm.scss'

const ArticleForm = ({ onSubmit, isLoading, article }) => {
  const defaultValues = article
    ? {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList.map((el) => ({ tag: el })),
      }
    : undefined

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
      <FormInputItem
        label="Title"
        name="title"
        errors={errors}
        registerCb={register}
        type="text"
        formClassName="article-form"
        className="article-form__input"
      />
      <FormInputItem
        label="Short description"
        name="description"
        errors={errors}
        registerCb={register}
        type="text"
        formClassName="article-form"
        className="article-form__input"
      />
      <FormInputItem
        label="Text"
        name="body"
        errors={errors}
        registerCb={register}
        type="text"
        formClassName="article-form"
        className="article-form__input"
      />
      <span className="article-form__tag-title">Tags</span>
      <ul className="article-form__tag-list tag-list">
        {fields.map((field, index) => {
          const fieldRef = React.createRef()
          return (
            <li key={field.id} className="tag-list__item">
              <InputItem ref={fieldRef} {...register(`tagList.${index}.value`)} className="tag-list__input" />
              <button type="button" onClick={() => remove(index)} className="tag-list__delete-button">
                Delete
              </button>
              {index === fields.length - 1 && (
                <button type="button" className="tag-list__add-button" onClick={() => append({ tag: 'tag' })}>
                  Add tag
                </button>
              )}
            </li>
          )
        })}
        {fields.length === 0 && (
          <button type="button" className="tag-list__add-button" onClick={() => append({ tag: ' ' })}>
            Add tag
          </button>
        )}
      </ul>

      {!isLoading ? <input className="article-form__submit-button" type="submit" value="Finished!" /> : <Spin />}
    </form>
  )
}

export default ArticleForm
