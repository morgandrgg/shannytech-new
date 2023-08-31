import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { wishActions } from '../redux/slices/wishSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const Wish = () => {
  const wishItems = useSelector((state) => state.wish.wishItems);

  const dispatch = useDispatch();

  const deleteProduct = (productId) => {
    dispatch(wishActions.deleteItem(productId));
  };

  const addToCart = (productId) => {
    dispatch(cartActions.addItem(productId));
    try{
      toast.success("Product added to cart")
    }catch{
      toast.error("Product Not added")
    }
  };
 
  

  return (
    <Helmet title="wish">
      <CommonSection title="WishList" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {wishItems.length === 0 ? (
                <h2 className="fs-4 text-center">No items added to the WishList</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                      <th>Add to Cart</th> {/* New column */}
                    </tr>
                  </thead>

                  <tbody>
                    {wishItems.map((item, index) => (
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
                        <td>
                          <motion.i
                            whileTap={{ scale: 2 }}
                            onClick={() => addToCart(item.id)} 
                            class="ri-shopping-basket-2-line"></motion.i>                      
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">        
              <div>
                {wishItems.length > 0 && (
                  <button className="buy_btn w-100">
                    <Link to="/cart">Proceed to Cart</Link>
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

export default Wish;
