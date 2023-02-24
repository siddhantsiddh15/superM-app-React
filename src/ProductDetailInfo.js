import Button from "./Button.js";


import {addProduct} from './Features/cartSlice';
import { useDispatch} from 'react-redux';

export default function ProductDetailInfo({ product
 }) {

  const dispatch = useDispatch();

  const handleProductAdd = (product) => {
    dispatch(addProduct(product))
  }

  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => handleProductAdd(product)}>${product.price}</Button>
    </>
  );
}
