import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as createKey } from 'uuid'
import { format } from 'date-fns'
import { Typography, Avatar } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
const { Text } = Typography
import './ArticleHeader.scss'
import { useSelector } from 'react-redux'

import { useLikeArticleMutation } from '../../api/userApi'
import { mapText } from '../../helpers/mappers'

const ArticleHeader = ({ article: currentArticle, isListItem }) => {
  const [likeArticleRequest, { data: likeArticleResponse }] = useLikeArticleMutation()
  const auth = useSelector((state) => state.user.isLogged)
  const [article, setArticle] = useState(currentArticle)

  useEffect(() => {
    if (likeArticleResponse) {
      setArticle(likeArticleResponse.article)
    }
  }, [likeArticleResponse])

  const title = isListItem ? (
    <Link className="article-header__title" to={`/articles/${article.slug}`}>
      {mapText(article.title, 25)}
    </Link>
  ) : (
    <h1>{article.title}</h1>
  )

  const tagList = article.tagList.map((item) => {
    return (
      <span key={createKey()} className="article-header__tag">
        {mapText(item, 15)}
      </span>
    )
  })

  const likeArticle = () => {
    likeArticleRequest(article.slug)
  }

  return (
    <div className="article-header__header">
      <div className="header-block">
        <span className="article-header__title-block">
          {title}
          <button
            type="button"
            className={`article-header__like-button like-button 
              ${auth && 'like-button--able'}`}
            onClick={likeArticle}
          >
            <HeartOutlined /> {article.favoritesCount}
          </button>
        </span>
        <p className="article-header__taglist">{tagList}</p>
      </div>
      <div className="article-header__author-info">
        <div className="header-block">
          <Text>{article.author.username}</Text>
          <Text>{format(new Date(article.createdAt), "MMMM d',' y")}</Text>
          {article.updatedAt && article.updatedAt !== article.createdAt && (
            <Text>UPD.: {format(new Date(article.updatedAt), "MMMM d',' y")}</Text>
          )}
        </div>
        <Avatar className="article-header__avatar" src={article.author.image}></Avatar>
      </div>
    </div>
  )
}

export default ArticleHeader
