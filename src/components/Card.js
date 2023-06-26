import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  let price = Number(props.drinkItem.price);
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const finalPrice = price * qty;

  const handleAddToCart = async () => {
    await dispatch({
      type: 'ADD',
      id: props.drinkItem._id,
      name: props.drinkItem.name,
      price: finalPrice,
      qty: qty
    });
    await console.log(data);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDecreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleIncreaseQty = () => {
    setQty(qty + 1);
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
        <img
          src={props.drinkItem.img}
          alt="drinkImages"
          style={{ height: '250px', objectFit: 'contain', cursor: 'pointer' }}
          onClick={handleImageClick}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title d-flex justify-content-center">{props.drinkItem.name}</h5>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '38px' }}>
              <button className="btn btn-secondary" onClick={handleDecreaseQty}>
                -
              </button>
              <span className="mx-2">{qty}</span>
              <button className="btn btn-secondary" onClick={handleIncreaseQty}>
                +
              </button>
            </div>
            <br />
            <div className="card-footer d-flex justify-content-center">
              <span className="fs-5">Total Price: Rs.{finalPrice}</span>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <button onClick={handleAddToCart} className="btn btn-success justify-center ms-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.drinkItem.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={props.drinkItem.img}
              alt="drinkImages"
              style={{ height: '250px', objectFit: 'contain' }}
            />
          </div>
          <p>{props.drinkItem.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
