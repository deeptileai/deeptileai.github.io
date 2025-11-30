import { useRef, useState } from 'react';
import './ImageUploader.css';

function ImageUploader({ onImageUpload }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          setPreview(image);
          onImageUpload(image);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="uploader-container">
      <div className="uploader-card">
        <h2 className="uploader-title">步骤 1: 上传服装照片</h2>
        <p className="uploader-description">
          请上传一张包含服装的照片，系统将自动识别并抠出服装区域
        </p>
        
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <div className="upload-icon">📷</div>
          <p className="upload-text">
            {isDragging ? '松开以上传' : '点击或拖拽图片到此处上传'}
          </p>
          <p className="upload-hint">支持 JPG、PNG 等常见图片格式</p>
        </div>

        {preview && (
          <div className="preview-container">
            <img
              src={preview.src}
              alt="预览"
              className="preview-image"
            />
            <p className="preview-info">
              图片尺寸: {preview.width} × {preview.height} 像素
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;

