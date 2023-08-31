import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

import Helmet from '../components/Helmet/Helmet.js';
import "../styles/home.css";

import {Container, Row,Col} from "reactstrap"
import bannerImage from '../assets/images/banner.png'
import Services from '../services/Services';
import ProductList from '../components/UI/ProductList.jsx';
import Clock from "../components/UI/Clock";

import counterImg from '../assets/images/counter-timer-img.png'
import useGetData from "../custom-hooks/useGetData";

const Home = () => {

  const {data: products, loading} = useGetData('products')

  const [trendingProducts,setTrendingProducts] =useState([])
  const [bestSalesProducts,setBestSalesProducts] =useState([])
  const [audioProducts, setAudioProducts] = useState([])
  const [cableProducts, setCableProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const year = new Date().getFullYear();

  useEffect(()=>{
    const filteredTrendingProducts = products.filter(
      (item) =>item.category === "cable"
    );

    const filteredBestSalesProducts = products.filter(
      (item) =>item.category === "audio"
    );

    const filteredAudioProducts = products.filter(
      (item) =>item.category === "lifestyle"
    );

    const filteredCableProducts = products.filter(
      (item) =>item.category === "cable"
    );

    const filteredPopularProducts = products.filter(
      (item) =>item.category === "powerbank"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setAudioProducts(filteredAudioProducts);
    setCableProducts(filteredCableProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products])

  return <Helmet title={"Home"}>
    <section className='hero_section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero_content">
              <p className="hero_subtitle">Trending Products in {year}</p>
              <h2>Make Your Take Aways Modern</h2>
              <p>Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit. Velit provident animi earum,
                  deserunt magnam voluptate.</p>
              <motion.button whileTap={{scale: 1.2}} className="buy_btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>
          <Col lg='6' md='6'>
            <div className="hero_img">
              <img src={bannerImage} alt="bannerImage" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <Services/>
    <section className="trending_products">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
           <h2 className="section_title">Trending Products</h2>
          </Col>

          {
            loading ? <h5 className="fw-bold">Loading.......</h5> : <ProductList data={trendingProducts}/>
          }


        </Row>
      </Container>
    </section>

    <section className="best_sales">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
           <h2 className="section_title">Best Sales</h2>
          </Col>
          {
            loading ? <h5 className="fw-bold">Loading.......</h5> : <ProductList data={bestSalesProducts}/>
          }
        </Row>
      </Container>
    </section>

    <section className="timer_count">
      <Container>
       <Row>
        <Col lg='6' md='12' className="count_down-col">

          <div className="clock_top_content">
            <h4 className="text-white fs-6 mb-2">Limited offers</h4>
            <h3 className="text-white fs-5 mb-3">Quality Headphones</h3>
          </div>

          <Clock/>

          <motion.button whileTap={{scale: 1.2}} className="buy_btn store_btn"><Link to='/shop'>Visit Store</Link></motion.button>
        </Col>

        <Col lg='6' md='12' className="text-end counter_img">
          <img src={counterImg} alt="" />
        </Col>
       </Row>
      </Container>
    </section>

    <section className="new_arrivals">
      <Container>
        <Row>
          <Col lg='12' className="text-center mb-5">
          <h2 className="section_title">New Arrivals</h2>
          </Col>

          {
            loading ? <h5 className="fw-bold">Loading.......</h5> : <ProductList data={audioProducts}/>
          }
          {
            loading ? <h5 className="fw-bold">Loading.......</h5> : <ProductList data={cableProducts}/>
          }

        </Row>
      </Container>
    </section>

    <section className="popular_category">
      <Container>
        <Row>
          <Col lg='12' className="text-center mb-5">
          <h2 className="section_title">Popular in Category</h2>
          </Col>

         {
            loading ? <h5 className="fw-bold">Loading.......</h5> : <ProductList data={popularProducts}/>
          }

        </Row>
      </Container>
    </section>


  </Helmet>;
  
};

export default Home