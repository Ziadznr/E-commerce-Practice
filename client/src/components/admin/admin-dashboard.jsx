import React, { useEffect } from 'react';
import useAdminStore from '../../store/AdminStore';
import { useNavigate } from 'react-router-dom';

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
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id).then(() => listProducts());
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-2 w-1/2">
  <input
    type="text"
    placeholder="Search by title, brand, or category..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="border p-2 rounded flex-grow"
  />
  <button
    onClick={() => {
      // Trigger search action here, e.g., call a function to filter products
      // Example: handleSearch(searchQuery);
      console.log('Search clicked:', searchQuery);
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Search
  </button>
</div>

        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="flex border rounded p-4 shadow">
            <img
              src={
                product.details &&
                product.details.image &&
                product.details.image[0]
                  ? product.details.image[0]
                  : '/placeholder.jpg'
              }
              alt="Product"
              className="w-40 h-40 object-cover rounded"
            />
            <div className="flex-1 px-4 space-y-1">
              <h2 className="text-xl font-semibold">{product.title || 'No title'}</h2>
              <p>Price: ${product.price}</p>
              <p>Discount: {product.discount}%</p>
              <p>Discount Price: ${product.discountPrice}</p>
              <p>Remark: {product.remark || 'No remark'}</p>
              <p>Brand: {product.brand && product.brand.brandName ? product.brand.brandName : 'Unknown'}</p>
              <p>Category: {product.category && product.category.categoryName ? product.category.categoryName : 'Unknown'}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button
                onClick={() => navigate(`/admin/update/${product._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
