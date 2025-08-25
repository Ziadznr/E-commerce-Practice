import React, { useEffect } from "react";
import useAdminStore from "../../store/AdminStore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    listProducts,
    deleteProduct,
    loading,
    error,
    message,
    getFilteredProducts,
    setSearchQuery,
    searchQuery,
  } = useAdminStore();

  useEffect(() => {
    listProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id).then(() => listProducts());
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            placeholder="Search by title, brand, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
          <button
            className="btn btn-primary"
            onClick={() => console.log("Search clicked:", searchQuery)}
          >
            Search
          </button>
        </div>
        <button
          onClick={() => navigate("/create")}
          className="btn btn-success"
        >
          <i className="bi bi-plus-circle me-1"></i> Add Product
        </button>
      </div>

      {/* Alerts */}
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* Product List */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div className="col-md-6 col-lg-4" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  product.details?.image?.[0]
                    ? product.details.image[0]
                    : "/placeholder.jpg"
                }
                className="card-img-top"
                alt="Product"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {product.title || "No title"}
                </h5>
                <ul className="list-unstyled mb-3">
                  <li>
                    <strong>Price:</strong> ${product.price}
                  </li>
                  <li>
                    <strong>Discount:</strong> {product.discount}%
                  </li>
                  <li>
                    <strong>Discount Price:</strong> $
                    {product.discountPrice}
                  </li>
                  <li>
                    <strong>Remark:</strong>{" "}
                    {product.remark || "No remark"}
                  </li>
                  <li>
                    <strong>Brand:</strong>{" "}
                    {product.brand?.brandName || "Unknown"}
                  </li>
                  <li>
                    <strong>Category:</strong>{" "}
                    {product.category?.categoryName || "Unknown"}
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                <button
                  onClick={() => navigate(`/admin/update/${product._id}`)}
                  className="btn btn-warning btn-sm"
                >
                  <i className="bi bi-pencil-square me-1"></i> Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
