import React, { useState } from 'react';
import './EditPostForm.css';

const EditPostForm = ({ post, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    location: post.location,
    rating: post.rating,
    images: post.images
  });

  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState(
    // Initialize with existing images
    post.images.map((url, index) => ({
      name: `Image ${index + 1}`,
      url: url
    }))
  );

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title required";
    if (!formData.description.trim()) newErrors.description = "Description required";
    if (!formData.location.trim()) newErrors.location = "Location required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onUpdate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + formData.images.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    const base64Images = await Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }));

    // Create preview URLs and update form data
    const newPreviewImages = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setPreviewImages([...previewImages, ...newPreviewImages]);
    setFormData({ ...formData, images: [...formData.images, ...base64Images] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const renderStars = () => {
    return [5, 4, 3, 2, 1].map(star => (
      <label key={star} className="star-label">
        <input
          type="radio"
          name="rating"
          value={star}
          checked={parseInt(formData.rating) === star}
          onChange={() => setFormData({ ...formData, rating: star })}
        />
        <span className="star-icon">★</span>
      </label>
    ));
  };

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-title">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Title of your post"
            required
          />
          {errors.title && <div className="validation-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Share your experience"
            rows="4"
            required
          />
          {errors.description && <div className="validation-message">{errors.description}</div>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`form-input ${errors.location ? 'error' : ''}`}
            placeholder="Where did this take place?"
            required
          />
          {errors.location && <div className="validation-message">{errors.location}</div>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Rating</label>
          <div className="star-rating">
            {renderStars()}
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Current Images</label>
          <div className="image-preview-list">
            {previewImages.map((img, index) => (
              <div key={index} className="image-preview-item">
                <img src={img.url} alt={`Preview ${index}`} className="image-thumbnail" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-image-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="update-btn"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;