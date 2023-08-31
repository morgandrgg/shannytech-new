import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const deleteProduct = (productId) => {
    dispatch(cartActions.deleteItem(productId));
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No items added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={item.imgUrl} alt="" />
                        </td>
                        <td>{item.productName}</td>
                        <td>Ksh {item.price}</td>
                        <td>{item.quantity}px</td>
                        <td>
                          <motion.i
                            whileTap={{ scale: 2 }}
                            onClick={() => deleteProduct(item.id)}
                            className="ri-delete-bin-line"
                          ></motion.i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              {cartItems.length > 0 && (
                <div>
                  <h6 className="d-flex align-items-center justify-content-between">
                    Subtotal
                  </h6>
                  <span className="fs-6 fw-bold">Ksh {totalAmount}</span>
                </div>
              )}
              <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
              <div>
                {cartItems.length > 0 && (
                  <button className="buy_btn w-100">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </button>
                )}
                <button className="buy_btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
