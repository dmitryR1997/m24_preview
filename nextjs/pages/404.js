import React from "react"

import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout/Layout"

import "@styles/pages/NonePage.scss"

const NonePage = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div className="none-page">
        <div className="container">
          <h1>404</h1>
          Страницы с адресом {window.location.pathname} нет на сайте.
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data,
    }
  }
}

export default NonePage