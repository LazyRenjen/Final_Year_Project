// EditProductModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import "./EditProductModal.css";

const EditProductModal = ({ show, handleClose, product, onUpdate, error, setError }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  // Update editedProduct when the product prop changes
  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "discount" 
        ? parseFloat(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(product._id, editedProduct);
      handleClose();
    } catch (err) {
      setError("Failed to update product");
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      className="product-edit-modal"
    >
      <Modal.Header closeButton className="product-edit-modal__header">
        <Modal.Title className="product-edit-modal__title">Edit Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} className="product-edit-modal__form">
        <Modal.Body className="product-edit-modal__body">
          {error && <Alert variant="danger" className="product-edit-modal__alert">{error}</Alert>}
          
          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={editedProduct.name}
              onChange={handleChange}
              className="product-edit-modal__input"
            />
          </Form.Group>

          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              required
              value={editedProduct.description}
              onChange={handleChange}
              className="product-edit-modal__textarea"
            />
          </Form.Group>

          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Price (रु)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              min="0"
              step="0.01"
              required
              value={editedProduct.price}
              onChange={handleChange}
              className="product-edit-modal__input"
            />
          </Form.Group>

          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              required
              value={editedProduct.stock}
              onChange={handleChange}
              className="product-edit-modal__input"
            />
          </Form.Group>

          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Discount (%)</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              min="0"
              max="100"
              value={editedProduct.discount || 0}
              onChange={handleChange}
              className="product-edit-modal__input"
            />
          </Form.Group>

          <Form.Group className="product-edit-modal__form-group mb-3">
            <Form.Label className="product-edit-modal__label">Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              required
              value={editedProduct.image}
              onChange={handleChange}
              className="product-edit-modal__input"
            />
            {editedProduct.image && (
              <div className="product-edit-modal__image-preview mt-2">
                <img 
                  src={editedProduct.image} 
                  alt="Preview" 
                  className="product-edit-modal__preview-img img-thumbnail"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/product-placeholder.jpg";
                  }}
                />
              </div>
            )}
          </Form.Group>
          
          <Button 
            variant="secondary" 
            onClick={handleClose}
            className="product-edit-modal__cancel-button"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            className="product-edit-modal__save-button"
          >
            Save Changes
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default EditProductModal;