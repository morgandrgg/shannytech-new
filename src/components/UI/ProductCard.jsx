import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { wishActions } from '../../redux/slices/wishSlice';




import '../../styles/product-card.css';
import { cartActions } from '../../redux/slices/cartSlice';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success('Product added successfully');
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
        if (!isLiked) {
      dispatch(wishActions.addItem(item));
    } else {
      dispatch(wishActions.deleteItem(item.id));
    }
  };

  

  return (
    <Col lg='3' md='6' sm='6' xs='6' className='mb-2 product_dis_item'>
      <div className='product_item card h-100'>
        <div className='wish'>
          {isLiked ? (
          <motion.span
            whileTap={{ scale: 1.2 }}
            className="remix-heart-filled"
            onClick={handleLike}
          ><i className="ri-heart-fill"></i></motion.span>
        ) : (
          <motion.span
            whileTap={{ scale: 1.2 }}
            className="remix-heart-outline"
            onClick={handleLike}
          ><i className="ri-heart-line"></i></motion.span>
        )}
        </div>
        <div className='product_img'>
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt=''
            className='card-img-top product_img'
          />
        </div>
        <div className='p-2 product-info'>
          <h3 className='product_name'>
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className='product_card-bottom d-flex align-items-center justify-content-between p-2'>
          <span className='price'>Ksh {item.price}</span>
          <motion.span
            whileTap={{ scale: 1.2 }}
            onClick={addToCart}
            className='add-to-cart-icon'>
            <i className='ri-add-line'></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
