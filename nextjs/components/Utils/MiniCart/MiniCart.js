import PropTypes from "prop-types"
import Link from "next/link"

import { connect } from "react-redux"

import "./MiniCart.scss"

import MiniCartIcon from "../../../public/icons/cart.svg"
import {getCartQuantity} from "../../../selectors/cart";

const MiniCart = ({ count }) => {
  return (
    <Link href="/cart">
      <div
        className="mini-cart"
      >
        <div className="mini-cart__count">{count}</div>
        <MiniCartIcon/>
      </div>
    </Link>
  )
}

MiniCart.propTypes = {
  count: PropTypes.number.isRequired
}

const mapStateToolProps = state => {
  return {
    count: getCartQuantity(state)
  }
}

export default connect(mapStateToolProps)(MiniCart)
