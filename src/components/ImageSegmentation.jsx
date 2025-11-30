import { useState, useEffect, useRef } from 'react';
import { ImageSegmentation } from '../utils/imageSegmentation';
import './ImageSegmentation.css';

function ImageSegmentationComponent({ image, onSegmentationComplete, onBack }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const segmentationRef = useRef(new ImageSegmentation());

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
  }, [image]);

  const handleSegment = async () => {
    if (!image) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const segmented = await segmentationRef.current.segmentImage(image);
      
      clearInterval(progressInterval);
      setProgress(100);
      setSegmentedImage(segmented);
      
      setTimeout(() => {
        onSegmentationComplete(segmented);
      }, 500);
    } catch (error) {
      console.error('分割失败:', error);
      alert('图像分割失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="segmentation-container">
      <div className="segmentation-card">
        <div className="step-header">
          <h2 className="step-title">步骤 2: 服装区域抠图</h2>
          <button className="back-button" onClick={onBack}>
            ← 返回
          </button>
        </div>

        <div className="image-comparison">
          <div className="image-panel">
            <h3>原始图片</h3>
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>

          {segmentedImage && (
            <div className="image-panel">
              <h3>抠图结果</h3>
              <img
                src={segmentedImage.src}
                alt="分割结果"
                className="preview-canvas"
              />
            </div>
          )}
        </div>

        {!segmentedImage && (
          <div className="action-section">
            <button
              className="segment-button"
              onClick={handleSegment}
              disabled={isProcessing}
            >
              {isProcessing ? '处理中...' : '开始抠图'}
            </button>

            {isProcessing && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="progress-text">{progress}%</p>
              </div>
            )}
          </div>
        )}

        {segmentedImage && (
          <div className="success-message">
            <p>✓ 抠图完成！点击"继续"进入下一步</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageSegmentationComponent;

