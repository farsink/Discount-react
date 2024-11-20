import React, { useState, useEffect } from 'react';
import './View.css';
import { Button, Container, Row, Col, Modal, Form, InputGroup, Card } from 'react-bootstrap';

function View() {
  const [show, setShow] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [original, setOriginal] = useState(0);
  const [firstProduct, setFirstProduct] = useState(0);
  const [secondProduct, setSecondProduct] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState('.00');
  const [isSecondProduct, setIsSecondProduct] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [formData, setFormData] = useState({
    selectedValue: 0,
    YouPay: '',
    YouSave: '',
  });

  const handleClose = () => {
    setShow(false);
    resetFields();
  };

  const handleShow = () => setShow(true);

  const resetFields = () => {
    setDiscount(0);
    setOriginal(0);
    setFirstProduct(0);
    setSecondProduct(0);
    setIsSecondProduct(false);
    setInputDisabled(true);
    setFormData({
      selectedValue: 0,
      YouPay: '',
      YouSave: '',
    });
  };

  const validate = (tag) => {
    const { value, id } = tag;
    let regex = /^[\d.]*$/; // Allows numbers and decimals
    if (regex.test(value)) {
      if (id === 'Discount') {
        setDiscount(parseFloat(value));
      } else if (id === 'Original') {
        setOriginal(parseFloat(value));
      } else if (id === 'First') {
        setFirstProduct(parseFloat(value));
      } else if (id === 'Second') {
        setSecondProduct(parseFloat(value));
      }
    } else {
      alert(`Invalid input for ${id}`);
    }
  };

  const handleSelect = (value) => {
    if (value === '1') {
      setSelectedSymbol('%');
      setIsSecondProduct(false);
      setInputDisabled(false);
      setFormData((prev) => ({ ...prev, selectedValue: '1' }));
    } else if (value === '2') {
      setIsSecondProduct(true);
      setSelectedSymbol('%');
      setInputDisabled(false);
      setFormData((prev) => ({ ...prev, selectedValue: '2' }));
    } else if (value === '3') {
      setSelectedSymbol('.00');
      setIsSecondProduct(false);
      setInputDisabled(false);
      setFormData((prev) => ({ ...prev, selectedValue: '3' }));
    } else {
      setInputDisabled(true);
      setFormData((prev) => ({ ...prev, selectedValue: '0' }));
    }
  };

  const Calculate = () => {
    const selected = formData.selectedValue;

    if (selected === '1') {
      // % Off
      const YouPay = original - (original * discount) / 100;
      const YouSave = original - YouPay;
      setFormData((prev) => ({
        ...prev,
        YouPay: YouPay.toFixed(2),
        YouSave: YouSave.toFixed(2),
      }));
    } else if (selected === '2') {
      // % Off on Second Product
      const totalOriginal = firstProduct + secondProduct;
      const discountAmount = (secondProduct * discount) / 100;
      const YouPay = totalOriginal - discountAmount;
      const YouSave = discountAmount;
      setFormData((prev) => ({
        ...prev,
        YouPay: YouPay.toFixed(2),
        YouSave: YouSave.toFixed(2),
      }));
    } else if (selected === '3') {
      // Fixed Amount Off
      const YouPay = original - discount;
      const YouSave = discount;
      setFormData((prev) => ({
        ...prev,
        YouPay: YouPay.toFixed(2),
        YouSave: YouSave.toFixed(2),
      }));
    } else {
      alert('Please select a discount type!');
    }
  };

  useEffect(() => {
    console.log('Latest Values:', { discount, original, firstProduct, secondProduct });
  }, [discount, original, firstProduct, secondProduct]);

  return (
    <>
      <div className='container-fluid back-img h-100'>
        <div className='row h-100 align-items-center'>
          <div className='col-md-6 text-start text-light p-3 m-3'>
            <h1>Confused About The Discount Rates?</h1>
            <p>Calculate discounts on products based on your budget and purchase history.</p>
            <Button variant='success' onClick={handleShow} className='mt-4 mx-2'>
              Calculate Now
            </Button>
          </div>
          <div className='col-md-6'>
            <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Calculate The Discount</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Select
                    className='mb-3'
                    onChange={(e) => handleSelect(e.target.value)}
                    aria-label='Default select example'
                  >
                    <option value='0'>Select type of Discount</option>
                    <option value='1'>% Off</option>
                    <option value='2'>% Off on Second Product</option>
                    <option value='3'>Fixed Amount Off</option>
                  </Form.Select>

                  {!inputDisabled && (
                    <>
                      {!isSecondProduct && (
                        <>
                          <p>Original Price:</p>
                          <InputGroup className='mb-3'>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              id='Original'
                              onChange={(e) => validate(e.target)}
                              aria-label='Original Price'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                        </>
                      )}

                      {isSecondProduct && (
                        <>
                          <p>First Product:</p>
                          <InputGroup className='mb-3'>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              id='First'
                              onChange={(e) => validate(e.target)}
                              aria-label='First Product Price'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                          <p>Second Product:</p>
                          <InputGroup className='mb-3'>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              id='Second'
                              onChange={(e) => validate(e.target)}
                              aria-label='Second Product Price'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                        </>
                      )}
                      <p>Discount:</p>
                      <InputGroup className='mb-3'>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          id='Discount'
                          onChange={(e) => validate(e.target)}
                          aria-label='Discount'
                        />
                        <InputGroup.Text>{selectedSymbol}</InputGroup.Text>
                      </InputGroup>
                      <Card style={{ width: '100%' }}>
                        <Card.Body>
                          <Card.Title className='mb-2'>After Discount</Card.Title>
                          <p>You Pay...</p>
                          <InputGroup className='mb-3'>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              id='Pay'
                              value={formData.YouPay}
                              readOnly
                              aria-label='You Pay'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                          <p>You Save...</p>
                          <InputGroup className='mb-3'>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              id='Saving'
                              value={formData.YouSave}
                              readOnly
                              aria-label='You Save'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                        </Card.Body>
                      </Card>
                    </>
                  )}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={resetFields}>
                  Clear All
                </Button>
                <Button variant='primary' onClick={Calculate}>
                  Calculate
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <Container>
        <div className='row m-3 text-primary p-3'>
            <h1>Discount Calculator - Calculate discount on the sale price</h1>
            <Button variant='success' onClick={handleShow} className='mt-4 mx-2'>Calculate Now</Button>
        </div>
        <Row className='m-5 gap-4'>
            <Col md={10} lg={6} sm={12}>
                <h3>What is a Discount?</h3>
                <p>A discount is a deduction from the general price of goods and services. It means an item is sold at a price that is lower as compared to the usual price. Discounts are usually represented as percentages. However, it may also be a fixed amount off on the original price of goods or services.</p>

<p>Discounts are of different types. Quantity discount is where you get a discount based on the number of items you purchase. Suppliers usually offer trade discounts to their distributors. The discount may help the distributor adjust the prices of the goods so that all the items are sold. You have promotional discounts that are a popular sale promotion technique. For example, get 15% off on the purchase of a shirt or the buy one get one free offer.</p>

<p>You have a percentage discount on an item that is shown as an amount per hundred. A percentage discount of 10% means an item that originally costs Rs 1,000 is now available for Rs 900. You have saved Rs 100 on the purchase.</p>

<p>The cash discount is a popular incentive that is offered by retail stores to shoppers as a direct price-off incentive on purchases. It is offered as an immediate cash discount or even on the use of a coupon code. Retail stores use cash discounts to propagate a sense of urgency as the offers are available for a limited number of days.</p>
<Button  variant='success' onClick={handleShow} className='mt-4 text-center'>Calculate Now</Button>
            </Col>
            <Col >
                <h3>What is a Discount Calculator?</h3>
                <p>A discount calculator is a utility tool that shows you the price of goods and services after a discount and also the amount you save. The discount may be a fixed amount off or a percentage discount.

The discount calculator consists of a formula box, where you enter the price before the discount, the discount as a percentage or an amount. The discount calculator shows you the price after the discount and the amount you have saved.</p>
            
            <h3>How does Discount Calculators Work?</h3>
            <p>You can calculate the discount as a percentage as follows. For example, you may want to calculate the sale price of a shirt that regularly costs Rs 1,000.</p>

<p>
    If the shirt is 20% off, you must convert 20% to a decimal (20/100 = 0.2). You have Rs 1,000 * 0.2 = Rs 200. You then subtract the discount from the original price as Rs 1,000 – Rs 200 = Rs 800. The shirt is on sale for Rs 800. You have saved Rs 200 on the purchase of the shirt.
    
    You can calculate the discount as a fixed amount as follows. For example, you have a discount of Rs 300 on a shirt that costs Rs 1,500. The price after the discount is Rs 1,200. The discount percentage is:
</p>

= 300/1500 = 20% (amount of discount/Cost of the shirt).
<p>
    
    Discount Calculator Formula
    
    A discount calculator typically uses a formula to determine the final price after applying a discount to the original price. The general formula for calculating the discounted price is:
</p>

<p>Discounted price = original price - (original price × discount / 100)</p>
            
            </Col>
        </Row>

    </Container>


    </>
  );
}

export default View;
