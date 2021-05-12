import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import {connect} from "react-redux"
import {fetchProducts} from "@api/product"
import {fetchCategories} from "@api/category"
import {fetchCartPrice} from "@api/cart"
import {getCartQuantity} from "../../selectors/cart"

import Layout from "@components/Layout/Layout"
import ProductCart from "@components/Cards/ProductCart/ProductCart"
import Amount from "@components/Display/Amount"
import Button from "@components/Forms/Button"

const CartPage = ({cartList, cartQuantity, categories}) => {
  const [cartPrice, setCartPrice] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts({ids: cartList.map(item => item.id)}).then(({data}) => {
      setProducts(data.data)
    })
  }, [])

  useEffect(() => {
    fetchCartPrice(cartList).then(({data}) => {
      setCartPrice(data)
    })
  }, [cartList])

  const getDetailsProduct = (id) => {
    return products.find(product => product.id === id)
  }

  const getCartDetailsProduct = (id) => {
    return cartList.find(product => product.id === id)
  }

  const cartDiscount = () => {
    return products.filter(product => product.discount_price > 0).reduce((prev, cur, index) => {
      const cartProduct = getCartDetailsProduct(cur.id)

      if (!cartProduct) return prev

      const discount = cur.price - cur.discount_price

      return parseInt(prev) + discount * cartProduct.quantity
    }, 0)
  }

  const cartTotal = () => {
    return products.reduce((prev, cur, index) => {
      const cartProduct = getCartDetailsProduct(cur.id)

      if (!cartProduct) return prev

      const price = cur.discount_price ? cur.discount_price : cur.price

      return parseInt(prev) + price * cartProduct.quantity
    }, 0)
  }

  return (
    <Layout pageType="cart" categories={categories} hideAboutShop={true}>
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-page__title">
            Корзина
          </h1>

          {products.length > 0 && cartList.length > 0 ?
            <>
              <div className="cart-page__list">
                {cartList.map((cartData, key) => (
                  <div key={key}
                       className="cart-page__list-item"
                  >
                    <ProductCart
                      product={getDetailsProduct(cartData.id)}
                      cartData={cartData}
                    />
                  </div>
                ))}
              </div>

              <div className="cart-page__total">
                <div className="cart-page__total-row">
                  <div className="cart-page__total-cell">Всего товаров</div>
                  <div className="cart-page__total-cell">{cartQuantity}</div>
                </div>

                {cartPrice.discount_price &&
                <div className="cart-page__total-row">
                  <div className="cart-page__total-cell">Цена</div>
                  <div className="cart-page__total-cell"><Amount amount={cartPrice.discount_price}/></div>
                </div>
                }

                {cartPrice.discount_price &&
                <div className="cart-page__total-row">
                  <div className="cart-page__total-cell">Скидка</div>
                  <div className="cart-page__total-cell"><Amount amount={cartPrice.price - cartPrice.discount_price}/>
                  </div>
                </div>
                }

                {cartPrice.price &&
                <div className="cart-page__total-row">
                  <div className="cart-page__total-cell">Итого</div>
                  <div className="cart-page__total-cell">
                    <Amount amount={cartPrice.price}/>
                  </div>
                </div>
                }
              </div>

              <div className="cart-page__continue">
                <Link href="/order">
                  <Button
                    label="Оформить покупку"
                  />
                </Link>
              </div>
            </> :
            <>
              <p>Ваша корзина пуста</p>
              <p>Воспользуйтесь поиском, чтобы найти интересующий вас товар</p>
              <br/><br/>
            </>
          }
        </div>
      </div>
    </Layout>
  )
}

CartPage.propTypes = {
  cartList: PropTypes.array.isRequired,
  cartQuantity: PropTypes.number.isRequired
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list,
    cartQuantity: getCartQuantity(state)
  }
}

export async function getStaticProps({params}) {
  const categories = await fetchCategories()

  return {
    props: {
      categories: categories.data
    }
  }
}

export default connect(mapStateToolProps)(CartPage)
