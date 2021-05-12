import { useEffect, useState } from "react"

import { fetchProducts } from "@api/product"

import Slider from "@components/Surfaces/Slider";
import CatalogProduct from "@components/Cards/CatalogProduct";

import "./RealetedProducts.scss"

const RealetedProducts = ({ params }) => {
  const [products, setProducts] = useState([])

  const loadProducts = () => {
    fetchProducts(params).then(({ data }) => {
      setProducts(data.data)
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="realeted-products">
      <div className="container">
        <div className="realeted-products__title">
          Возможно Вас заинтересует
        </div>

        <div className="realeted-products__list">
          <Slider
            visibleHiddenSlides
          >
            {products.map((product, key) => {
              return (
                <div key={key} className="realeted-products__list-item">
                  <CatalogProduct
                    product={product}
                    size="xs"
                  />
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default RealetedProducts
