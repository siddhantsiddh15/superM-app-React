import { Link } from "react-router-dom";
import Button from "./Button.js";

// these reducer functions handle the add and delete operations 
import {useDispatch, useSelector} from 'react-redux';
import {addProduct,
  removeProduct} from './Features/cartSlice';

export default function Product(props) {
  const { details } = props;

  const dispatch = useDispatch();

  const handleProductAdd = (details) => {
    dispatch(addProduct(details));
  }

  const handleProductDelete = (id) => {
    dispatch(removeProduct(id))
  }

  const cart = useSelector(state => state.cart);

  const productFromCart = cart.find(
    (product) => product.id === details.id
  );


  const quantity = productFromCart ? productFromCart.quantity : 0;

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${details.id}`}>
          <img
            src={details.image}
            width="100"
            height="100"
            className="product-image"
            alt={details.name}
          />
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={ () => handleProductDelete(details.id)}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        {/* make sure to pass the handleProductAdd as a callback function */}
        <Button outline onClick={() => handleProductAdd(details)}>
          ${details.price}
        </Button>
      </div>
    </div>
  );
}
