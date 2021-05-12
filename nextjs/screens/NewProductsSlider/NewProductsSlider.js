import Slider from "@components/Surfaces/Slider"
import SliderProductCard from "@components/Cards/SliderProduct"

import Banner from "@components/Cards/Banner/Banner"

import "./NewProductsSlider.scss"

const NewProductsSlider = ({ slides }) => {
  const renderSlides = []

  slides.forEach((slide, key) => {
    renderSlides.push(
      slide.view === "product" ?
        <SliderProductCard
          key={key}
          product={product}
        /> :
        <Banner
          key={key}
          type={slide.type}
          title={slide.title}
          description={slide.title_second}
          image={slide.image}
          view={slide.view}
          link={slide.link}
          lazyLoadImage={key !== 0}
        />
    )
  })

  if(slides.length === 0) return null

  return (
    <section className="new-products-slider">
      <div className="container">
        <Slider
          visibleHiddenSlides
          pagination
        >
          {renderSlides}
        </Slider>
      </div>
    </section>
  )
}

export default NewProductsSlider
