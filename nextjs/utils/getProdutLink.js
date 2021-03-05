export default function getProductLink(product) {
  return `/catalog/${product.category_code}/${product.code}`
}
