import React from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import useGetData from '../custom-hooks/useGetData';
import ProductsList from '../components/UI/ProductList';

const Shop = () => {
  const { data: productsData, loading } = useGetData('products');

  const handleFilter = (e) => {
    // ... your existing code for filtering products
  };

  const handleSearch = (e) => {
    // ... your existing code for searching products
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className='filter_widget'>
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value='audio'>Audio</option>
                  <option value='cables'>Cables</option>
                  <option value='powerbanks'>Powerbank</option>
                  <option value='lifestyle'>Lifestyle</option>
                  <option value='wearable'>Wearable</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className='filter_widget'>
                <select>
                  <option>Sort By</option>
                  <option value='ascending'>Ascending</option>
                  <option value='descending'>Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className='search_box'>
                <input type='text' placeholder='Search.....' onChange={handleSearch} />
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {loading ? (
              <h1 className='text-center fs-4'>Loading...</h1>
            ) : productsData.length === 0 ? (
              <h1 className='text-center fs-4'>No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
