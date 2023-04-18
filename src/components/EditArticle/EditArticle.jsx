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
  const article = location.state?.article || null
  console.log(article)

  if (!slug) return <ErrorMessage errorMsg={'Something is wrong'} />

  useEffect(() => {
    if (editArticleResponse) {
      navigate('/', { replace: true })
    }
  }, [editArticleResponse])

  const onSubmit = (formArticleData) => {
    const { title, body, description, tagList } = formArticleData
    editArticle({
      slug,
      newArticle: { article: { title, body, description, tagList: tagList.map((item) => item.value.trim()) } },
    })
  }
  return (
    <Card className="edit-article">
      <h1 className="edit-article__title">Edit article</h1>
      <ArticleForm onSubmit={onSubmit} isLoading={isLoading} isEdit={true} article={article} />
    </Card>
  )
}

export default EditArticle
