import React from 'react'
import './footer.css'
import logo from '../../assets/images/logo.png';
import { Container,Row,Col, ListGroup,ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const Footer = () => {

  const year = new  Date().getFullYear()

  return <footer className="footer">
    <Container>
      <Row>
        <Col lg='4' className='mb-4' md='6'>
          <div className='logo'>
              <img src={logo} alt='logo' className='logo-img'/>
              <div>
                  <h1 className='text-white'>ShannyTech</h1>
              </div>            
          </div>

          <p className="footer_text mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Laudantium accusamus non,
               eos aliquid voluptates distinctio!</p>

        </Col>

        <Col lg='3' className='mb-4' md='3'>
          <div className="footer_quick-links">
            <h4 className="quick_links-title">Top Categories</h4>
            <ListGroup className='mb-3'>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Mobile Phones</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>HeadPhones</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Cables</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Smart Watches</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='2' className='mb-4' md='3'>
          <div className="footer_quick-links">
            <h4 className="quick_links-title">Useful Links</h4>
            <ListGroup className='mb-3'>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop'>Shop</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/cart'>Cart</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='/login'>Login</Link>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Privacy Policy</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='3' md='4'>
          <div className="footer_quick-links">
            <h4 className="quick_links-title">Contact</h4>
            <ListGroup className='footer_contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-tiems-center gap-2'>
                <span><i class="ri-map-pin-line"></i></span>
                <p>RNG plaza, Nairobi </p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-tiems-center gap-2'>
                <span><i class="ri-phone-line"></i></span>
                <p>+254 000 000 000 </p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-tiems-center gap-2'>
                <span><i class="ri-mail-line"></i></span>
                <p>info@shannytech.co.ke</p>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='12'>
          <p className="footer_copyright">Copyright {year} developed by shannytech. All rights reserved </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer