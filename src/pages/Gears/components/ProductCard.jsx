// ProductCard.jsx
import React, { useState } from "react";
import { Edit, Trash, ShoppingBag } from "lucide-react";
import EditProductModal from "./EditProductModal.jsx";
import * as productAPI from "../api/productService.js";
import EsewaIntegration from "../PaymentStatus/EsewaIntegration.jsx";
import "./ProductCard.css";

const ProductCard = ({ product, onUpdate, onDelete, isAdmin, isUser }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getDiscountedPrice = () => {
    if (product.discount && product.discount > 0) {
      const discountAmount = (product.price * product.discount) / 100;
      return product.price - discountAmount;
    }
    return product.price;
  };
  
  const calculateSavings = () => {
    if (product.discount && product.discount > 0) {
      const discountAmount = (product.price * product.discount) / 100;
      return formatPrice(discountAmount);
    }
    return "0.00";
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
 
  const handlePurchaseClick = async () => {
    if (product.stock <= 0) {
      setError("This product is out of stock");
      return;
    }
  
    try {
      // Verify stock is still available before proceeding
      const currentProduct = await productAPI.getProductById(product._id);
      if (!currentProduct) {
        setError("Product not found");
        return;
      }
      if (currentProduct.stock <= 0) {
        setError("This product is now out of stock");
        return;
      }
      
      // Prepare product data with discount information
      const productWithDiscount = {
        ...currentProduct, // Use the freshly fetched product data
        finalPrice: getDiscountedPrice(),
        originalPrice: currentProduct.price,
        quantity: 1 // Default quantity is 1
      };
  
      setSelectedProduct(productWithDiscount);
      setShowPaymentModal(true);
    } catch (err) {
      console.error("Purchase error:", err);
      setError(err.message || "Failed to process purchase");
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedProduct(null);
  };

  const getStockBadge = () => {
    if (product.stock <= 0) {
      return <span className="badgeoutofstock">Out of Stock</span>;
    } else if (product.stock < 5) {
      return <span className="badgelowstock">Low Stock: {product.stock}</span>;
    } else {
      return <span className="badgeinstock">In Stock: {product.stock}</span>;
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="imagecontainer">
          <img
            src={product.image}
            alt={product.name}
            className="productimage"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/product-placeholder.jpg";
            }}
          />
          <div className="stockbadge">{getStockBadge()}</div>
          
          {product.discount > 0 && (
            <div className="discountinfo">
              <span className="originalprice">रु{formatPrice(product.price)}</span>
              <span className="discountedprice">रु{formatPrice(getDiscountedPrice())}</span>
              <span className="discountpercentage">({product.discount}% OFF)</span>
            </div>
          )}
        </div>

        <div className="product-body">
          <h3 className="product-title">{product.name}</h3>

          <span className="category-badge">
            {product.type === "comboSet"
              ? "Combo Set"
              : product.type === "seasonalSet"
              ? "Seasonal Set"
              : product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
          </span>

          <p className="product-description">{product.description}</p>

          <div className="product-footer">
            <div className="price-container">
              {product.discount > 0 ? (
                <div className="price-discount">
                  <span className="original-price">
                  रु{formatPrice(product.price)}
                  </span>
                  <span className="discounted-price">
                  रु{formatPrice(getDiscountedPrice())}
                  </span>
                  <div className="savings-text">
                    You save: रु{calculateSavings()}
                  </div>
                </div>
              ) : (
                <span className="regular-price">रु{formatPrice(product.price)}</span>
              )}
            </div>

            <div className="button-group">
              {isUser && (
                <button
                  className={`buy-button ${product.stock <= 0 ? 'disabled' : ''}`}
                  onClick={handlePurchaseClick}
                  disabled={product.stock <= 0}
                >
                  <ShoppingBag size={16} />
                  {product.stock <= 0 ? "Out of Stock" : "Buy Now"}
                </button>
              )}

              {isAdmin && (
                <>
                  <button
                    className="edit-button"
                    onClick={() => setShowEditModal(true)}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(product._id)}
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProductModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        product={product}
        onUpdate={onUpdate}
        error={error}
        setError={setError}
      />

      {showPaymentModal && selectedProduct && (
        <EsewaIntegration 
          amount={parseFloat(selectedProduct.finalPrice)}
          product={selectedProduct}
          onClose={handlePaymentClose}
        />
      )}
    </>
  );
};

export default ProductCard;