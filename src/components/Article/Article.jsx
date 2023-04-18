import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Card, Typography, Popconfirm } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'
const { Paragraph } = Typography
import './Article.scss'

import { useGetArticleBySlugQuery } from '../../api/articlesApi'
import { useDeleteArticleMutation } from '../../api/userApi'
import ArticleHeader from '../ArticleHeader/ArticleHeader'
import NotFoundPage from '../../pages/NotFoundPage'
import { LoadingSpinner, ErrorMessage } from '../UserMessages/UserMessages'

const Article = ({ slug }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { data, isLoading, isError, error } = useGetArticleBySlugQuery(slug)
  const [deleteArticle] = useDeleteArticleMutation()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error && error.originalStatus) {
    return <NotFoundPage />
  }

  if (isError) {
    return <ErrorMessage error={{ message: error.data }} />
  }

  const article = data.article
  const currentUsername = user ? user.username : ''
  const isAuthor = article.author.username === currentUsername

  const onDeleteArticle = () => {
    navigate('/', { replace: true })
    deleteArticle(slug)
  }

  return (
    <article className="article">
      <Card>
        <ArticleHeader article={article} />
        <div className="article__sub-block">
          <Paragraph className="article__description">{article.description}</Paragraph>
          <div className={isAuthor ? '' : 'hidden'}>
            <Link
              className="article__button button__edit"
              to={`/articles/${slug}/edit`}
              state={{ slug: slug, article: article }}
            >
              Edit
            </Link>
            <Popconfirm
              title="HOLD ON, HOLD ON!"
              description="Are you sure to delete this greatest article?"
              onConfirm={onDeleteArticle}
              onCancel={() => {}}
              okText="Yes, i hate it"
              cancelText="Wait.. Im not sure"
              icon={<QuestionOutlined style={{ color: 'red' }} />}
            >
              <button type="button" className="article__button button__delete">
                Delete
              </button>
            </Popconfirm>
          </div>
        </div>
        <ReactMarkdown className="article__body">{article.body}</ReactMarkdown>
      </Card>
    </article>
  )
}

export default Article
