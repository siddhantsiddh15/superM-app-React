import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Input from "./Input.js";
import Button from "./Button.js";

// TODO: Replace with your own publishable key
const stripeLoadedPromise = loadStripe("pk_test_51M0hpaSGAts6H1RFYEOw4lMZvNtmscSfLVqGxjwwoPSKnH78mHrTFZKYP5LHelX39q7V6p0ngyFeuW7JycOELH3B00amBTmNlX");

export default function Cart({ cart }) {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    const cartItems = cart.map((ele) => {
      let price_id = '';
      const {name, quantity} = ele;

      if(name ==='Milk'){
        price_id = 'price_1M13B5SGAts6H1RFR4Mgwmgp';
      }else if(name === 'Cheese'){
        price_id = 'price_1M127zSGAts6H1RFyeyg8GV6';
      }else if(name ==='Tomato'){
        price_id = 'price_1M13BzSGAts6H1RFysnHbzvZ';
      }else price_id = 'price_1M13DrSGAts6H1RFqV2ATxqF'
      return { price:price_id, quantity };
    });

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: cartItems,
          mode: "payment",
          successUrl: "https://admirable-gecko-2c2512.netlify.app/",
          cancelUrl: "https://admirable-gecko-2c2512.netlify.app/",
          customerEmail: email,
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quanity</th>
                  <th width="25%">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
                <br />
                <em>
                  Enter your own Stripe Publishable Key in Cart.js for the
                  checkout to work
                </em>
              </p>
              <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Pay</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
