// Gears_detail.jsx
import React, { useState, useEffect } from "react";
import { 
  Container, Row, Col, Button, Spinner, Alert, 
  Dropdown, Tab, Tabs, Form, Badge 
} from "react-bootstrap";
import ProductCard from "./components/ProductCard";
import CreateProductModal from "./components/CreateProductModal";
import { useAuth } from "../../contexts/AuthContext";
import * as productAPI from "./api/productService";
import "./Gears.css";
import GearsIcon from "./Gearsicon.png";
import Footer from "../../components/Footer/footer.jsx";

const TrekkingGears = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("comboSet");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Available categories for dropdown
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "clothing", label: "Clothing" },
    { value: "items", label: "Items" },
    { value: "localProduct", label: "Local Products" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tab filter
      const matchesTab = product.type === activeTab;
      
      // Category filter - only applies when viewing "category" tab
      const matchesCategory = activeTab !== "category" || 
                            categoryFilter === "all" || 
                            product.category === categoryFilter;
      
      return matchesSearch && matchesTab && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, activeTab, categoryFilter]);

  const handleCreateProduct = async (newProduct) => {
    try {
      const createdProduct = await productAPI.createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message || "Failed to create product");
    }
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const updatedProduct = await productAPI.updateProduct(productId, updatedData);
      setProducts(products.map(p => p._id === productId ? updatedProduct : p));
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productAPI.deleteProduct(productId);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const getTabTitle = (type) => {
    const titles = {
      comboSet: "Combo Sets",
      seasonalSet: "Seasonal Sets",
      category: "Category Products"
    };
    return titles[type] || type;
  };

  return (
    <Container className="trekking-gears-container">
      <div className="HeaderOfTrekkinggears">
        <div className="HeaderOfTrekkinggears-Title">
          <img src={GearsIcon} alt="Trekking Gears" className="gears-icon" />
          <h1 className="page-title">Trekking Gears</h1>
          {user?.isAdmin && (
            <Button 
              variant="primary" 
              onClick={() => setShowCreateModal(true)}
              className="add-product-btn"
            >
              <i className="icon-anp"></i>
              Add New Product
            </Button>
          )}

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <div className="search-filter-container">
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Badge className="product-count">
              {filteredProducts.length} products
            </Badge>
          </div>
        </div>
      </div>

{/* Category Dropdown - Only shown when on "category" tab */}
{activeTab === "category" && (
              <Dropdown className="category-dropdown">
                <Dropdown.Toggle variant="secondary" id="category-dropdown">
                  {categories.find(c => c.value === categoryFilter)?.label || "Select Category"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item 
                      key={category.value}
                      active={categoryFilter === category.value}
                      onClick={() => setCategoryFilter(category.value)}
                    >
                      {category.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k);
          // Reset category filter when switching tabs
          setCategoryFilter("all");
        }}
        className="product-tabs"
      >
        {["comboSet", "seasonalSet", "category"].map(tab => (
          <Tab key={tab} eventKey={tab} title={getTabTitle(tab)}>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <i className="empty-state-icon"></i>
                <h5>No {getTabTitle(tab).toLowerCase()} found</h5>
                <p>Try adjusting your search or add a new product</p>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredProducts.map(product => (
                  <Col key={product._id}>
                    <ProductCard
                      product={product}
                      onUpdate={handleUpdateProduct}
                      onDelete={handleDeleteProduct}
                      isAdmin={user?.isAdmin}
                      isUser={!!user}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Tab>
        ))}
      </Tabs>

      <CreateProductModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />

      <Footer />
    </Container>
  );
};

export default TrekkingGears;