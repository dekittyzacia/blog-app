import React, { useEffect } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

import ArticleForm from '../ArticleForm/ArticleForm'
import { useCreateArticleMutation } from '../../api/userApi'
import './NewArticle.scss'

const NewArticle = () => {
  const [createArticle, { data: createArticleResponse, isLoading }] = useCreateArticleMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (createArticleResponse) {
      navigate('/', { replace: true })
    }
  }, [createArticleResponse])

  const onSubmit = (formArticleData) => {
    const { tagList, ...rest } = formArticleData
    const article = { article: Object.assign({}, { tagList: tagList.map((item) => item.value.trim()) }, rest) }
    createArticle(article)
  }

  return (
    <Card className="new-article">
      <h1 className="new-article__title">Create new article</h1>
      <ArticleForm onSubmit={onSubmit} isLoading={isLoading} />
    </Card>
  )
}

export default NewArticle
