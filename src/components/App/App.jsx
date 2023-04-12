import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '../Layout/Layout'
import AllArticlePage from '../../pages/AllArticlePage'
import ArticlePage from '../../pages/ArticlePage'
import NotFoundPage from '../../pages/NotFoundPage'
import SignInPage from '../../pages/SignInPage'
import SignUpPage from '../../pages/SignUpPage'
import EditProfilePage from '../../pages/EditProfilePage'
import NewArticlePage from '../../pages/NewArticlePage'
import EditArticlePage from '../../pages/EditArticlePage'
import RequireAuth from '../../hoc/RequireAuth'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllArticlePage />} />
          <Route path="/articles" element={<AllArticlePage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <EditProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <NewArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
