import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'

import { fetchReviews } from "@api/review"
import { fetchCategories } from "@api/category"

import Layout from "@components/Layout/Layout"
import ReviewWithProduct from "@components/Cards/ReviewWithProduct"
import CustomSelect from "@components/Forms/CustomSelect"

import "@styles/pages/ReviewsPage.scss"

import PlusIcon from "../../public/icons/plus.svg"

const ReviewsPage = ({ categories, reviews, code }) => {
  const router = useRouter()

  const [activeCategory, setActiveCategory] = useState()

  const onChangeHandler = (e) => {
    setActiveCategory(e.label.toLowerCase())

    router.push({
      pathname: '/reviews/[code]',
      query: { code: e.value }
    })
  }


  const options = categories.map(category => { return { label: category.NAME, value: category.CODE } })
  options.unshift({ label: "Все категории", value: "all" })

  return (
    <Layout categories={categories}>
      <div className="reviews-page">
        <Link href="/reviews/add">
          <div className="reviews-page__add">
            <PlusIcon/>
          </div>
        </Link>

        <div className="container">
          <h1 className="reviews-page__title">
            {activeCategory ? `Отзывы на ${activeCategory}` : `Отзывы`}
          </h1>

          <div className="reviews-page__filter">
            <CustomSelect
              placeholder="Выберите категорию"
              options={options}
              onChange={onChangeHandler}
              defaultValue={options.filter(category => category.value === code)}
            />
          </div>

          {reviews.length === 0 &&
            <p className="reviews-page__none-text">В данной категории товаров, ещё нет отзывов</p>
          }

          <div className="reviews-page__list">
            {reviews.map((review, key) => (
              <div key={key} className="reviews-page__list-item">
                <ReviewWithProduct review={review}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const categories = await fetchCategories()
  const reviews = await fetchReviews(params.code)

  return {
    props: {
      categories: categories.data,
      reviews: reviews.data.data,
      code: params.code
    }
  }
}

export default ReviewsPage
