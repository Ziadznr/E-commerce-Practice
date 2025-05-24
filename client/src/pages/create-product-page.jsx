import React, { useState, useEffect } from 'react';
import useAdminStore from '../store/AdminStore'; // adjust path if needed
import axios from 'axios';

const CreateProductPage = () => {
  const { createProduct, loading, error, message } = useAdminStore();

  const [form, setForm] = useState({
    title: '',
    shortDes: '',
    price: '',
    discount: false,
    discountPrice: '',
    image: '',
    stock: true,
    remark: '',
    categoryName: '',
    categoryImg: '',
    brandName: '',
    brandImg: '',
    details: {
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      img6: '',
      img7: '',
      img8: '',
      des: '',
      color: '',
      size: '',
    },
  });

  // Suggestions and lists for autocomplete
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch brands and categories on component mount
  useEffect(() => {
    async function fetchLists() {
      try {
        const brandRes = await axios.get('/ProductBrandList');
        const categoryRes = await axios.get('/ProductCategoryList');
        setBrands(Array.isArray(brandRes.data) ? brandRes.data : []);
        setCategories(Array.isArray(categoryRes.data) ? categoryRes.data : []);
      } catch (err) {
        console.error('Error fetching brand/category lists:', err);
      }
    }
    fetchLists();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('details.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        details: { ...prev.details, [key]: value },
      }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === 'brandName') {
        if (!value.trim()) {
          setBrandSuggestions([]);
        } else if (Array.isArray(brands)) {
          const filtered = brands
            .filter((b) => b.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);
          setBrandSuggestions(filtered);
        }
      }

      if (name === 'categoryName') {
        if (!value.trim()) {
          setCategorySuggestions([]);
        } else if (Array.isArray(categories)) {
          const filtered = categories
            .filter((c) => c.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);
          setCategorySuggestions(filtered);
        }
      }
    }
  };

  const handleBrandSelect = (brand) => {
    setForm((prev) => ({
      ...prev,
      brandName: brand.name,
      brandImg: brand.image || '',
    }));
    setBrandSuggestions([]);
  };

  const handleCategorySelect = (category) => {
    setForm((prev) => ({
      ...prev,
      categoryName: category.name,
      categoryImg: category.image || '',
    }));
    setCategorySuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic required field checks
    if (
      !form.title.trim() ||
      !form.price.trim() ||
      !form.categoryName.trim() ||
      !form.categoryImg.trim() ||
      !form.brandName.trim() ||
      !form.brandImg.trim()
    ) {
      alert('Please fill in all required fields: Title, Price, Category Name & Image, Brand Name & Image.');
      return;
    }

    await createProduct(form);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6">Create New Product</h2>

      {error && <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Product Title */}
        <div>
          <label className="block font-semibold mb-1">Product Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Product title"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <textarea
            name="shortDes"
            value={form.shortDes}
            onChange={handleChange}
            rows={3}
            className="border p-2 rounded w-full"
            placeholder="Brief product description"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price *</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Product price"
            required
          />
        </div>

        {/* Discount checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="discount"
            checked={form.discount}
            onChange={handleChange}
            id="discountCheckbox"
          />
          <label htmlFor="discountCheckbox" className="font-semibold">
            Discount Available
          </label>
        </div>

        {/* Discount Price - only if discount is true */}
        {form.discount && (
          <div>
            <label className="block font-semibold mb-1">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={form.discountPrice}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Discounted price"
            />
          </div>
        )}

        {/* Main Product Image URL */}
        <div>
          <label className="block font-semibold mb-1">Main Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Image URL"
          />
        </div>

        {/* Stock Availability */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="stock"
            checked={form.stock}
            onChange={handleChange}
            id="stockCheckbox"
          />
          <label htmlFor="stockCheckbox" className="font-semibold">
            In Stock
          </label>
        </div>

        {/* Remark */}
        <div>
          <label className="block font-semibold mb-1">Remark</label>
          <textarea
            name="remark"
            value={form.remark}
            onChange={handleChange}
            rows={2}
            className="border p-2 rounded w-full"
            placeholder="Additional remarks"
          />
        </div>

        {/* Brand Name with autocomplete */}
        <div className="relative">
          <label className="block font-semibold mb-1">Brand Name *</label>
          <input
            type="text"
            name="brandName"
            value={form.brandName}
            onChange={handleChange}
            autoComplete="off"
            className="border p-2 rounded w-full"
            placeholder="Start typing brand name"
            required
          />
          {brandSuggestions.length > 0 && (
            <ul className="absolute z-20 bg-white border w-full max-h-40 overflow-y-auto rounded shadow mt-1">
              {brandSuggestions.map((brand) => (
                <li
                  key={brand._id}
                  onClick={() => handleBrandSelect(brand)}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Brand Image URL */}
        <div>
          <label className="block font-semibold mb-1">Brand Image URL *</label>
          <input
            type="text"
            name="brandImg"
            value={form.brandImg}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Brand image URL"
            required
          />
        </div>

        {/* Category Name with autocomplete */}
        <div className="relative">
          <label className="block font-semibold mb-1">Category Name *</label>
          <input
            type="text"
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
            autoComplete="off"
            className="border p-2 rounded w-full"
            placeholder="Start typing category name"
            required
          />
          {categorySuggestions.length > 0 && (
            <ul className="absolute z-20 bg-white border w-full max-h-40 overflow-y-auto rounded shadow mt-1">
              {categorySuggestions.map((cat) => (
                <li
                  key={cat._id}
                  onClick={() => handleCategorySelect(cat)}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category Image URL */}
        <div>
          <label className="block font-semibold mb-1">Category Image URL *</label>
          <input
            type="text"
            name="categoryImg"
            value={form.categoryImg}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Category image URL"
            required
          />
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-bold mb-2">Product Details</h3>

          {/* Images 1-8 */}
          {[...Array(8)].map((_, idx) => {
            const key = `img${idx + 1}`;
            return (
              <div key={key} className="mb-2">
                <label className="block font-semibold mb-1">{`Image ${idx + 1}`}</label>
                <input
                  type="text"
                  name={`details.${key}`}
                  value={form.details[key]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder={`Image URL ${idx + 1}`}
                />
              </div>
            );
          })}

          {/* Description */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="details.des"
              value={form.details.des}
              onChange={handleChange}
              rows={3}
              className="border p-2 rounded w-full"
              placeholder="Detailed product description"
            />
          </div>

          {/* Color */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Color</label>
            <input
              type="text"
              name="details.color"
              value={form.details.color}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Product color"
            />
          </div>

          {/* Size */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Size</label>
            <input
              type="text"
              name="details.size"
              value={form.details.size}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Product size"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
