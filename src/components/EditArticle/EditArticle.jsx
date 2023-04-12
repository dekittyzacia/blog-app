import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card } from 'antd'

import ArticleForm from '../ArticleForm/ArticleForm'
import { useEditArticleMutation } from '../../api/userApi'
import './EditArticle.scss'
import { ErrorMessage } from '../UserMessages/UserMessages'

const EditArticle = () => {
  const [editArticle, { data: editArticleResponse, isLoading }] = useEditArticleMutation()
  const navigate = useNavigate()
  const location = useLocation()
  const slug = location.state?.slug || null

  if (!slug) return <ErrorMessage errorMsg={'Something is wrong'} />

  useEffect(() => {
    if (editArticleResponse) {
      navigate('/', { replace: true })
    }
  }, [editArticleResponse])

  const onSubmit = (formArticleData) => {
    const { title, body, description } = formArticleData
    editArticle({ slug, newArticle: { article: { title, body, description } } })
  }
  return (
    <Card className="edit-article">
      <h1 className="edit-article__title">Edit article</h1>
      <ArticleForm onSubmit={onSubmit} isLoading={isLoading} isEdit={true} />
    </Card>
  )
}

export default EditArticle
