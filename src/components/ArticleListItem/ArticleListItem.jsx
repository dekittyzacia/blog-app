import React from 'react'
import { Card, Typography } from 'antd'

import './ArticleListItem.scss'
import ArticleHeader from '../ArticleHeader/ArticleHeader'

const { Paragraph } = Typography

const ArticleListItem = (article) => {
  return (
    <Card className="article-card">
      <ArticleHeader isListItem={true} article={article} />
      <Paragraph>{article.description}</Paragraph>
    </Card>
  )
}

export default ArticleListItem
