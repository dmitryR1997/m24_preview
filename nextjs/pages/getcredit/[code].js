import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import {useForm, Controller} from "react-hook-form"

import {connect, useDispatch} from "react-redux"
import {fetchProduct} from "@api/product"
import {fetchCategories} from "@api/category"
import {getCredit} from "@api/order"

import Layout from "@components/Layout/Layout"
import Input from "@components/Forms/Input"
import Button from "@components/Forms/Button"
import Checkbox from "@components/Forms/Checkbox/Checkbox";
import SingleRangeInput from "@components/Forms/SingleRangeInput"
import Amount from "@components/Display/Amount"

import num_word from "@utils/NumWord"

import Cookies from "js-cookie";
import {openModal} from "@actions/layout";
import Message from "@components/Cards/Message/Message";
import Link from "next/link";


const GetcreditPage = ({categories}) => {
  const [creditPrice, setCreditPrice] = useState(false)
  const [products, setProducts] = useState([])
  const {control, handleSubmit, errors, watch} = useForm()
  const watchFields = watch(["credit_term", "start_sum"])
  const router = useRouter()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const toHomePage = () => {
    router.push("/")
  }

  const formHandler = (data) => {
    let fullName = ""

    if(data.first_name) {
      fullName += data.first_name
    }

    if(data.middle_name) {
      fullName += ` ${data.middle_name}`
    }

    if(data.last_name) {
      fullName += ` ${data.last_name}`
    }

    const form = {
      credit_line: {
        client: {
          fullname: fullName,
          phone: data.phone,
          email: data.email,
          adress: data.address
        },
        payment: {
          duration: watchFields.credit_term[0],
          initial: watchFields.start_sum[0],
          discount: 14
        },
        products: products,
        price: creditPrice
      },
      roistat_visit: Cookies.get("roistat_visit")
    }

    setLoading(true)

    getCredit(form).then(({ data }) => {
      setLoading(false)

      dispatch(openModal(
        <Message
          classes="get-credit-success"
          title="???????? ???????????? ?????????????? ????????????????????!"
          description="???????????????? ???????????????? ?? ???????? ?? ?????????????????? ??????????"
          onClose={toHomePage}
        />
      ))
    })
  }

  useEffect(() => {
    if (!router.isReady) return

    const {code} = router.query

    fetchProduct(code).then(({data}) => {
      const price = data.discount_price ? data.discount_price : data.price

      setCreditPrice(price)

      setProducts(products => [...products, {
        id: data.old_id,
        quantity: 1,
        price: creditPrice,
        product: data.old_id,
        name: data.name
      }])
    })
  }, [router.isReady])

  useEffect(() => {
  }, [watchFields])

  return (
    <Layout categories={categories}>
      <div className="getcredit-page">
        <div className="container">
          <h1 className="getcredit-page__title">
            ???????????? ???? ??????????????????
          </h1>

          {watchFields.start_sum &&
            <div className="getcredit-page__result">
              <div className="getcredit-page__result-item">
                <span>?????????? ??????????????????</span>
                <Amount
                  amount={creditPrice}
                />
              </div>
              <div className="getcredit-page__result-item">
                <span>????????????. ????????????</span>
                <Amount
                  amount={((creditPrice - watchFields.start_sum[0]) / watchFields.credit_term[0])}
                />
              </div>
            </div>
          }

          <form onSubmit={handleSubmit(formHandler)} className="getcredit-page__form">
            <div className="getcredit-page__form-range">
              <SingleRangeInput min={1}
                                max={24}
                                name="credit_term"
                                step={1}
                                control={control}
                                value={12}
                                label="???????? ??????????????????"
                                valueLabel={num_word(watchFields.credit_term ? watchFields.credit_term[0] : 1, [" ??????????", " ????????????", " ??????????????"])}
              />
            </div>

            {creditPrice &&
            <div className="getcredit-page__form-range">
              <SingleRangeInput min={1000}
                                max={creditPrice}
                                value={1000}
                                step={1000}
                                label="???????????????????????????? ????????????"
                                valueLabel=" ???"
                                control={control}
                                name="start_sum"
              />
            </div>
            }

            <div className="getcredit-page__form-group">
              <Controller
                name="first_name"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={({onChange, value}) =>
                  <Input label="???????? ??????"
                         id="first_name"
                         handler={onChange}
                         value={value}
                         error={errors.first_name}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="last_name"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={({onChange, value}) =>
                  <Input label="??????????????"
                         id="last_name"
                         handler={onChange}
                         value={value}
                         error={errors.last_name}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="middle_name"
                control={control}
                render={({onChange, value}) =>
                  <Input label="????????????????"
                         id="middle_name"
                         handler={onChange}
                         value={value}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="email"
                control={control}
                rules={{required: true}}
                defaultValue=""
                render={({onChange, value}) =>
                  <Input label="?????? email"
                         id="email"
                         handler={onChange}
                         value={value}
                         error={errors.email}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                  pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
                }}
                defaultValue=""
                render={({onChange, value}) =>
                  <Input label="?????????? ????????????????"
                         id="phone"
                         handler={onChange}
                         value={value}
                         mask="+7 (999) 999-99-99"
                         error={errors.phone}
                  />}
              />
            </div>

            <div className="getcredit-page__form-group">
              <Controller
                name="address"
                control={control}
                render={({onChange, value}) =>
                  <Input label="??????????"
                         id="address"
                         handler={onChange}
                         value={value}
                  />}
              />
            </div>

            <Controller
              name="agree_age"
              control={control}
              rules={{required: true}}
              render={props =>
                <div className="getcredit-page__form-check">
                  <Checkbox label="?????? ?????????????????????? 18 ??????"
                            id="agree_age"
                            onClick={e => props.onChange(e.target.checked)}
                            error={errors.agree_age}
                  />
                </div>
              }
            />

            <div className="getcredit-page__form-button">
              <Button
                label="?????????????????? ????????????"
                isLoading={loading}
                isBlock={true}
              />
            </div>

            <div className="getcredit-page__text">
              ?????????????????? ???????????? ???? ??????????????????, ???? ?????????? ???????????????? ????<br/>
              <Link href="/content/agree/">?????????????????? ???????????????????????? ????????????</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

GetcreditPage.propTypes = {}

const mapStateToolProps = state => {
  return {}
}

export async function getServerSideProps({params}) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(GetcreditPage)
