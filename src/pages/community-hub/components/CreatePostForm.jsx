import React, { useState } from 'react';
import "./CreatePostForm.css";

const CreatePostForm = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rating: 5,
    images: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await onCreate(formData);
      // Form submission successful
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + formData.images.length > 3) {
    alert('Maximum 3 images allowed');
    return;
  }
    
    if (files.length === 0) return;
    
    // Create preview URLs
    const newPreviewImages = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setPreviewImages([...previewImages, ...newPreviewImages]);
    
    // Convert to base64 for storage/submission
    const base64Images = await Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }));
    
    setFormData({ 
      ...formData, 
      images: [...formData.images, ...base64Images] 
    });
  };
  
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    
    setFormData({ ...formData, images: updatedImages });
    setPreviewImages(updatedPreviews);
  };
  
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  return (
    <div className="post-form-container">
      <div className="form-header">
        <h2>Share Your Experience</h2>
        <p>Tell the community about your visit</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className={`form-input ${errors.title ? 'error' : ''}`}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Give your experience a title"
          />
          {errors.title && <div className="validation-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Share the details of your experience"
          />
          {errors.description && <div className="validation-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            id="location"
            type="text"
            className={`form-input ${errors.location ? 'error' : ''}`}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Where did this take place?"
          />
          {errors.location && <div className="validation-message">{errors.location}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Rating</label>
          <div className="star-rating">
            <div className="star-rating-input">
              {[5, 4, 3, 2, 1].map((star) => (
                <label 
                  key={star} 
                  className={formData.rating >= star ? 'active' : ''}
                  title={`${star} stars`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={() => handleRatingChange(star)}
                  />
                  ★
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Images</label>
          <div className="image-upload">
            <label className="image-upload-label">
              <div className="image-upload-icon">📷</div>
              <span className="image-upload-text">Click to upload images</span>
              <span className="image-upload-subtext">Supported formats: JPG, PNG, GIF</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          {previewImages.length > 0 && (
            <div className="image-previews">
              {previewImages.map((img, index) => (
                <div key={index} className="image-preview">
                  <img src={img.url} alt={`Preview ${index + 1}`} />
                  <button 
                    type="button" 
                    className="image-preview-remove"
                    onClick={() => removeImage(index)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-cancel"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="submit-loading"></span>
                Posting...
              </>
            ) : (
              'Share Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;