import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./CreateProductModal.css";

const CreateProductModal = ({ show, onHide, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "comboSet",
    category: "clothing",
    price: 0,
    stock: 0,
    image: "",
    discount: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numerical fields to numbers
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        discount: Number(formData.discount)
      };
      await onCreate(productData);
      setFormData({
        name: "",
        description: "",
        type: "comboSet",
        category: "clothing",
        price: 0,
        stock: 0,
        image: "",
        discount: 0
      });
    } catch (error) {
      console.error("Creation error:", error);
    }
  };

  const getDiscountedPrice = () => {
    if (formData.discount && formData.discount > 0) {
      const discountAmount = (formData.price * formData.discount) / 100;
      return (formData.price - discountAmount).toFixed(2);
    }
    return formData.price;
  };

  return (
    <Modal show={show} onHide={onHide} centered className="create-product-modal">
      <Modal.Header closeButton className="create-product-modal__header">
        <Modal.Title className="create-product-modal__title">Create New Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} className="create-product-modal__form">
        <Modal.Body className="create-product-modal__body">
          <Form.Group className="create-product-modal__form-group mb-3">
            <Form.Label className="create-product-modal__label">Product Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="create-product-modal__input"
            />
          </Form.Group>

          <Form.Group className="create-product-modal__form-group mb-3">
            <Form.Label className="create-product-modal__label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="create-product-modal__textarea"
            />
          </Form.Group>

          <Form.Group className="create-product-modal__form-group mb-3">
            <Form.Label className="create-product-modal__label">Product Type</Form.Label>
            <Form.Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="create-product-modal__select"
            >
              <option value="comboSet">Combo Set</option>
              <option value="seasonalSet">Seasonal Set</option>
              <option value="category">Category</option>
            </Form.Select>
          </Form.Group>

          {formData.type === "category" && (
            <Form.Group className="create-product-modal__form-group mb-3">
              <Form.Label className="create-product-modal__label">Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="create-product-modal__select"
              >
                <option value="clothing">Clothing</option>
                <option value="items">Items</option>
                <option value="localProduct">Local Products</option>
              </Form.Select>
            </Form.Group>
          )}

          <div className="create-product-modal__price-section">
            <Form.Group className="create-product-modal__form-group mb-3">
              <Form.Label className="create-product-modal__label">Price (रु)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="create-product-modal__input"
              />
            </Form.Group>

            <Form.Group className="create-product-modal__form-group mb-3">
              <Form.Label className="create-product-modal__label">Discount (%)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="create-product-modal__input"
              />
            </Form.Group>
          </div>

         {formData.discount > 0 && (
           <div className="create-product-modal__discount-preview">
             <div className="create-product-modal__original-price">
               Original: रु{Number(formData.price).toFixed(2)}
             </div>
             <div className="create-product-modal__final-price">
               After {formData.discount}% discount: रु{getDiscountedPrice()}
             </div>
           </div>
         )}

          <Form.Group className="create-product-modal__form-group mb-3">
            <Form.Label className="create-product-modal__label">Stock</Form.Label>
            <Form.Control
              type="number"
              min="0"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="create-product-modal__input"
            />
          </Form.Group>

          <Form.Group className="create-product-modal__form-group mb-3">
            <Form.Label className="create-product-modal__label">Image URL</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="create-product-modal__input"
            />
          </Form.Group>

          {formData.image && (
            <div className="create-product-modal__image-preview">
              <img 
                src={formData.image} 
                alt="Product preview" 
                className="create-product-modal__preview-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentNode.innerHTML = '<div class="create-product-modal__preview-placeholder">Invalid image URL</div>';
                }} 
              />
            </div>
          )}

          <Button 
            variant="secondary" 
            onClick={onHide}
            className="create-product-modal__cancel-button"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            className="create-product-modal__create-button"
          >
            Create Product
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;