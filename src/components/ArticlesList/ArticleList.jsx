import React, { useEffect, useState } from 'react'
import { v4 as createKey } from 'uuid'
import { Pagination } from 'antd'

import ArticleListItem from '../ArticleListItem/ArticleListItem'
import { useGetArticlesQuery } from '../../api/articlesApi'
import './ArticleList.scss'
import { ErrorMessage, LoadingSpinner } from '../UserMessages/UserMessages'

const ArticleList = () => {
  const [skip, setSkip] = useState(0)
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error, refetch } = useGetArticlesQuery(skip)

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage errorMsg={error} />
  }

  const articles = data.articles
  const articlesCount = data.articlesCount

  const onPageChange = (page) => {
    const skipCount = (page - 1) * 10
    setSkip(skipCount)
    setPage(page)
  }

  return (
    <>
      <Pagination
        onChange={onPageChange}
        current={page}
        total={articlesCount}
        hideOnSinglePage
        className="pagination"
        showSizeChanger={false}
      />
      <ul className="article-list">
        {articles.map((item) => {
          return <ArticleListItem key={createKey()} {...item} />
        })}
      </ul>
      <Pagination
        onChange={onPageChange}
        total={articlesCount}
        hideOnSinglePage
        className="pagination"
        showSizeChanger={false}
      />
    </>
  )
}

export default ArticleList
