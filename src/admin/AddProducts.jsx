import React,{useState} from 'react'
import {Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { toast } from 'react-toastify'

import {db,storage} from '../firebase.config'
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {

  const [enterTitle, SetEnterTitle] = useState('')
  const [enterShortDesc, SetEnterShortDesc] = useState('')
  const [enterDescription, SetEnterDescription] = useState('')
  const [enterCategory, SetEnterCategory] = useState('')
  const [enterPrice, SetEnterPrice] = useState('')
  const [enterProductImg, SetEnterProductImg] = useState(null)
  const [loading, SetLaoding] = useState(false)

  const navigate = useNavigate()

  const addProduct = async (e) => {
  e.preventDefault();

  SetLaoding(true);

  try {
    const docRef = collection(db, 'products');
    const storageRef = ref(
      storage,
      `productImages/${Date.now() + enterProductImg.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

    uploadTask.on(
      'state_changed',
      null, // Use null for progress callback if not needed
      (error) => {
        toast.error('Image not uploaded!', error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadUrl,
          });
          SetLaoding(false);
          toast.success('Product added successfully');
          navigate('/dashboard/all-products');
        } catch (error) {
          SetLaoding(false);
          toast.error('Product not added', error);
        }
      }
    );
  } catch (error) {
    SetLaoding(false);
    toast.error('Product not added', error);
  }
};



  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? <h4 className='py-5 fw-bold'>Loading......</h4> : <>
              
              <h4 className='mb-5'>Add Prdoduct</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className='form_group'>
                <span>Product tittle</span>
                <input type="text" placeholder='oraimo-headphones' required
                 value={enterTitle} onChange={e=> SetEnterTitle(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form_group'>
                <span>Short Description</span>
                <input type="text" placeholder='lorem...' required
                value={enterShortDesc} onChange={e=> SetEnterShortDesc(e.target.value)}/>
              </FormGroup>

              <FormGroup className='form_group'>
                <span>Description</span>
                <input type="text" placeholder='Description' required
                value={enterDescription} onChange={e=> SetEnterDescription(e.target.value)}/>
              </FormGroup>

              <div className='d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className='form_group w-50'>
                  <span>Price</span>
                  <input type="value" placeholder='Ksh 1000' required
                  value={enterPrice} onChange={e=> SetEnterPrice(e.target.value)}/>
                </FormGroup>

                <FormGroup className='form_group w-50'>
                  <span>Category</span>
                <select className='w-100 p-2'
                value={enterCategory} onChange={e=> SetEnterCategory(e.target.value)}>
                  <option>Select Category</option>
                  <option value="audio">Audio</option>
                  <option value="cables">Cable</option>
                  <option value="powerbank">Powerbanks</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="wearable">Wearable</option>
                </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className='form_group'>
                <span>Product Iamge</span>
                <input type="file" accept="image/*" onChange={e=>SetEnterProductImg(e.target.files[0])} required/>
              </FormGroup>
              </div>

              <button className="buy_btn" type='submit'>
                Add Product
              </button>
            </Form>

              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts