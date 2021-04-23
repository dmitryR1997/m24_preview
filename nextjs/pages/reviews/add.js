import React, {useEffect, useState} from "react"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

import { connect, useDispatch } from "react-redux"
import { addReview } from "@api/review"
import { fetchProducts } from "@api/product"
import { fetchCategories } from "@api/category"
import { openModal } from "@actions/layout"

import Layout from "@components/Layout/Layout"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"
import CustomSelect from "@components/Forms/CustomSelect"
import Textarea from "@components/Forms/Textarea"
import Stars from "@components/Forms/Stars"
import Loader from "@components/Layout/Loader"
import Message from "@components/Cards/Message"

import "@styles/pages/AddReviewPage.scss"

const AddReviewPage = ({ categories }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { control, handleSubmit, errors, reset, setValue } = useForm()

  const [loading, setLoading] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({})

  const toReviews = () => {
    router.push("/reviews/all")
  }

  const formHandler = (data) => {
    setLoading(true)

    addReview(data).then(({ data }) => {
      setLoading(false)

      dispatch(openModal(
        <Message
          classes="send-review-success"
          title="Ваш отзыв успешно отправлен!"
          description="После модерации, отзыв будет опубликован на сайте"
          onClose={toReviews}
        />
      ))
    })
  }

  const fetchProductsByCategory = async (id) => {
    if(!id) return

    setLoadingProducts(true)

    const productsRes = await fetchProducts({ section_id: id, include_sections: true, page_size: 1000 })
    const products = productsRes.data.data

    setLoadingProducts(false)
    setProducts(products.map(product => { return { label: product.name, value: product.id } }))
  }

  useEffect(() => {
    setProducts([])
    setValue("product", false)
    fetchProductsByCategory(category.value)
  }, [category])

  return (
    <Layout categories={categories} hideAboutShop={true}>
      <div className="add-review-page">
        <div className="container">
          <h1 className="add-review-page__title">
            Новый отзыв
          </h1>

          <form onSubmit={handleSubmit(formHandler)} className="add-review-page__form">
            <div className="add-review-page__group-title">
              Ваши данные
            </div>
            <div className="add-review-page__form-group">
              <Controller
                name="first_name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input  label="Ваше имя"
                          id="first_name"
                          handler={onChange}
                          value={value}
                          error={errors.first_name}
                />}
              />
            </div>

            <div className="add-review-page__form-group">
              <Controller
                name="last_name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input  label="Фамилия"
                          id="last_name"
                          handler={onChange}
                          value={value}
                          error={errors.last_name}
                  />}
              />
            </div>

            <div className="add-review-page__form-group">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input  label="Ваш email"
                          id="email"
                          handler={onChange}
                          value={value}
                          error={errors.email}
                  />}
              />
            </div>

            <div className="add-review-page__form-group">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                  pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
                }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Input label="Номер телефона"
                         id="phone"
                         handler={onChange}
                         value={value}
                         mask="+7 (999) 999-99-99"
                         error={errors.phone}
                  />}
              />
            </div>

            <div className="add-review-page__group-title">
              Товар
            </div>
            <div className="add-review-page__form-group">
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ onChange, value }) =>
                  <CustomSelect
                    placeholder="Выберите категорию"
                    options={categories.map(category => {
                      return {label: category.NAME, value: category.ID}
                    })}
                    onChange={(e) => {
                      setCategory(e)
                      onChange(e)
                    }}
                    defaultValue={value}
                    error={errors.category}
                  />
                }
              />
            </div>

            {loadingProducts &&
              <Loader/>
            }

            {products.length > 0 &&
              <div className="add-review-page__form-group">
                <Controller
                  name="product"
                  control={control}
                  rules={{ required: true }}
                  render={({onChange, value}) => {
                    return (
                      <CustomSelect
                        placeholder="Выберите продукт"
                        options={products}
                        onChange={onChange}
                        defaultValue={value}
                        error={errors.product}
                      />
                    )
                  }}
                />
              </div>
            }

            <div className="add-review-page__group-title">
              Отзыв
            </div>
            <div className="add-review-page__form-group">
              <Controller
                name="plus"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Textarea label="Достоинства"
                            id="plus"
                            handler={onChange}
                            value={value}
                            error={errors.plus}
                            textarea={true}
                  />}
              />
            </div>
            <div className="add-review-page__form-group">
              <Controller
                name="minus"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Textarea label="Недостатки"
                            id="minus"
                            handler={onChange}
                            value={value}
                            error={errors.minus}
                            textarea={true}
                  />}
              />
            </div>
            <div className="add-review-page__form-group">
              <Controller
                name="text"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Textarea label="Общее впечатление"
                            id="text"
                            handler={onChange}
                            value={value}
                            error={errors.text}
                            textarea={true}
                  />}
              />
            </div>

            <div className="add-review-page__form-stars">
              <Controller
                name="rating"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ onChange, value }) =>
                  <Stars
                    value={parseInt(value)}
                    onChange={onChange}
                    starLabel={true}
                    enableClickHandler={true}
                  />}
              />
            </div>

            <div className="add-review-page__form-button">
              <Button
                label="Добавить отзыв"
                isLoading={loading}
                isBlock={true}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

AddReviewPage.propTypes = {
}

const mapStateToolProps = state => {
  return {
  }
}

export async function getStaticProps({ params }) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(AddReviewPage)
