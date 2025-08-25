import React, { useState, useEffect } from "react";
import useAdminStore from "../store/AdminStore"; // adjust path if needed
import axios from "axios";

const CreateProductPage = () => {
  const { createProduct, loading, error, message } = useAdminStore();

  const [form, setForm] = useState({
    title: "",
    shortDes: "",
    price: "",
    discount: false,
    discountPrice: "",
    image: "",
    stock: true,
    remark: "",
    categoryName: "",
    categoryImg: "",
    brandName: "",
    brandImg: "",
    details: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
      img7: "",
      img8: "",
      des: "",
      color: "",
      size: "",
    },
  });

  // Suggestions and lists for autocomplete
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchLists() {
      try {
        const brandRes = await axios.get("/ProductBrandList");
        const categoryRes = await axios.get("/ProductCategoryList");
        setBrands(Array.isArray(brandRes.data) ? brandRes.data : []);
        setCategories(Array.isArray(categoryRes.data) ? categoryRes.data : []);
      } catch (err) {
        console.error("Error fetching brand/category lists:", err);
      }
    }
    fetchLists();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("details.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        details: { ...prev.details, [key]: value },
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === "brandName") {
        if (!value.trim()) {
          setBrandSuggestions([]);
        } else if (Array.isArray(brands)) {
          const filtered = brands
            .filter((b) => b.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);
          setBrandSuggestions(filtered);
        }
      }

      if (name === "categoryName") {
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
      brandImg: brand.image || "",
    }));
    setBrandSuggestions([]);
  };

  const handleCategorySelect = (category) => {
    setForm((prev) => ({
      ...prev,
      categoryName: category.name,
      categoryImg: category.image || "",
    }));
    setCategorySuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.price.trim() ||
      !form.categoryName.trim() ||
      !form.categoryImg.trim() ||
      !form.brandName.trim() ||
      !form.brandImg.trim()
    ) {
      alert(
        "Please fill in all required fields: Title, Price, Category Name & Image, Brand Name & Image."
      );
      return;
    }

    await createProduct(form);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Create New Product</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleSubmit} className="row g-4">
            {/* Product Title */}
            <div className="col-md-6">
              <label className="form-label">Product Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Product title"
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label">Price *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                placeholder="Product price"
                required
              />
            </div>

            {/* Short Description */}
            <div className="col-12">
              <label className="form-label">Short Description</label>
              <textarea
                name="shortDes"
                value={form.shortDes}
                onChange={handleChange}
                className="form-control"
                rows={2}
                placeholder="Brief product description"
              />
            </div>

            {/* Discount */}
            <div className="col-md-6 form-check ms-2">
              <input
                type="checkbox"
                name="discount"
                checked={form.discount}
                onChange={handleChange}
                id="discountCheckbox"
                className="form-check-input"
              />
              <label htmlFor="discountCheckbox" className="form-check-label">
                Discount Available
              </label>
            </div>

            {/* Discount Price */}
            {form.discount && (
              <div className="col-md-6">
                <label className="form-label">Discount Price</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={form.discountPrice}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Discounted price"
                />
              </div>
            )}

            {/* Main Image */}
            <div className="col-12">
              <label className="form-label">Main Product Image</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="form-control"
                placeholder="Main image URL"
              />
            </div>

            {/* Stock */}
            <div className="col-md-6 form-check ms-2">
              <input
                type="checkbox"
                name="stock"
                checked={form.stock}
                onChange={handleChange}
                id="stockCheckbox"
                className="form-check-input"
              />
              <label htmlFor="stockCheckbox" className="form-check-label">
                In Stock
              </label>
            </div>

            {/* Remark */}
            <div className="col-12">
              <label className="form-label">Remark</label>
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                className="form-control"
                rows={2}
                placeholder="Additional remarks"
              />
            </div>

            {/* Brand Name */}
            <div className="col-md-6 position-relative">
              <label className="form-label">Brand Name *</label>
              <input
                type="text"
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                className="form-control"
                placeholder="Start typing brand name"
                autoComplete="off"
                required
              />
              {brandSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 shadow mt-1">
                  {brandSuggestions.map((brand) => (
                    <li
                      key={brand._id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleBrandSelect(brand)}
                      style={{ cursor: "pointer" }}
                    >
                      {brand.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Brand Image */}
            <div className="col-md-6">
              <label className="form-label">Brand Image URL *</label>
              <input
                type="text"
                name="brandImg"
                value={form.brandImg}
                onChange={handleChange}
                className="form-control"
                placeholder="Brand image URL"
                required
              />
            </div>

            {/* Category Name */}
            <div className="col-md-6 position-relative">
              <label className="form-label">Category Name *</label>
              <input
                type="text"
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                className="form-control"
                placeholder="Start typing category name"
                autoComplete="off"
                required
              />
              {categorySuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 shadow mt-1">
                  {categorySuggestions.map((cat) => (
                    <li
                      key={cat._id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleCategorySelect(cat)}
                      style={{ cursor: "pointer" }}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Category Image */}
            <div className="col-md-6">
              <label className="form-label">Category Image URL *</label>
              <input
                type="text"
                name="categoryImg"
                value={form.categoryImg}
                onChange={handleChange}
                className="form-control"
                placeholder="Category image URL"
                required
              />
            </div>

            {/* Product Details */}
            <div className="col-12">
              <h5 className="fw-bold mt-3">Product Details</h5>
            </div>

            {[...Array(8)].map((_, idx) => {
              const key = `img${idx + 1}`;
              return (
                <div className="col-md-6" key={key}>
                  <label className="form-label">{`Image ${idx + 1}`}</label>
                  <input
                    type="text"
                    name={`details.${key}`}
                    value={form.details[key]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={`Image URL ${idx + 1}`}
                  />
                </div>
              );
            })}

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="details.des"
                value={form.details.des}
                onChange={handleChange}
                className="form-control"
                rows={3}
                placeholder="Detailed description"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Color</label>
              <input
                type="text"
                name="details.color"
                value={form.details.color}
                onChange={handleChange}
                className="form-control"
                placeholder="Product color"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Size</label>
              <input
                type="text"
                name="details.size"
                value={form.details.size}
                onChange={handleChange}
                className="form-control"
                placeholder="Product size"
              />
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-bold"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
