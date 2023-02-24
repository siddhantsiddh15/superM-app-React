import {createSlice} from '@reduxjs/toolkit';

// this portion of code get's the cart value from local storage
let savedCart = [];
try{
    savedCart = JSON.parse(localStorage.getItem("cart")) || [];
}catch(error){
    savedCart = [];
}

const initialState = {
    cart : savedCart
}

// adding cart State 
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addProduct : (state,action) => {
            // check if the product exists

            const {cart} = state;

            const productExists = cart.find(product =>{
                return product.id === action.payload.id
            });

            if(productExists){
                const updatedCart = cart.map(product =>{
                    if(product.id === action.payload.id){
                        return {
                            ...product,
                            quantity:product.quantity +1
                        }
                    }

                    return product;
                })

                state.cart = updatedCart
            }else{
                const updatedCart = [...cart, {
                    ...action.payload,
                    quantity :1
                }];

                state.cart = updatedCart
            }

            return state;

        },
        removeProduct : (state, action ) => {
            const {cart} = state;
            const updatedCart = cart.filter(product => {
                return product.id !== action.payload
            });

            state.cart = updatedCart;

            return state;
        }
    }
})

const {addProduct, removeProduct} = cartSlice.actions;

const cartCountSelector = (state) => {
    // this function returns total number of items in the cart
    // This means 4 milk, 2 cheese will give 6 as output

    const {cart} = state;

    const totalItems = cart.reduce((prev, curr) => {
        const totalTillNow = prev + curr.quantity;
        return totalTillNow;
    }, 0);

    return totalItems;
}


const cartValueSelector = (state) => {
    // this function will return the total bill amount of our cart
    const {cart} = state;

    const totalAmount = cart.reduce((prev, curr) => {
        const totalAmountTillNow = prev + (curr.quantity * curr.price);
        return totalAmountTillNow;
    }, 0);

    return totalAmount

}


export {addProduct,
     removeProduct,
     cartCountSelector,
     cartValueSelector,
      cartSlice}