import { useState, useEffect, useRef } from 'react';
import { SeamlessPatternGenerator } from '../utils/seamlessPattern';
import { DownloadUtils } from '../utils/downloadUtils';
import './SeamlessPattern.css';

function SeamlessPatternComponent({ pattern, onBack, onNewImage }) {
  const [patternCanvas, setPatternCanvas] = useState(null);
  const [previewCanvas, setPreviewCanvas] = useState(null);
  const [tileSize, setTileSize] = useState(256);
  const [tilesX, setTilesX] = useState(4);
  const [tilesY, setTilesY] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatorRef = useRef(new SeamlessPatternGenerator());
  const previewRef = useRef(null);
  const fullPatternRef = useRef(null);

  useEffect(() => {
    if (pattern) {
      generatePattern();
    }
  }, [pattern, tileSize, tilesX, tilesY]);

  const generatePattern = () => {
    if (!pattern) return;

    setIsGenerating(true);

    setTimeout(() => {
      const fullCanvas = generatorRef.current.generateSeamlessPattern(pattern, {
        tileSize,
        tilesX,
        tilesY,
        blendEdges: true,
      });
      setPatternCanvas(fullCanvas);
      fullPatternRef.current = fullCanvas;

      const preview = generatorRef.current.generatePreview(pattern, 512);
      setPreviewCanvas(preview);
      previewRef.current = preview;

      setIsGenerating(false);
    }, 100);
  };

  const handleDownloadPNG = () => {
    if (patternCanvas) {
      DownloadUtils.downloadPNG(patternCanvas, 'seamless_pattern.png');
    }
  };

  const handleDownloadZIP = async () => {
    if (patternCanvas) {
      await DownloadUtils.downloadPatternSet(patternCanvas, 'seamless_pattern');
    }
  };

  return (
    <div className="seamless-container">
      <div className="seamless-card">
        <div className="step-header">
          <h2 className="step-title">步骤 4: 四方连续图案生成</h2>
          <div className="header-actions">
            <button className="back-button" onClick={onBack}>
              ← 返回
            </button>
            <button className="new-image-button" onClick={onNewImage}>
              新图片
            </button>
          </div>
        </div>

        <div className="controls-section">
          <div className="control-group">
            <label>图块尺寸:</label>
            <input
              type="number"
              value={tileSize}
              onChange={(e) => setTileSize(Number(e.target.value))}
              min="64"
              max="512"
              step="32"
            />
          </div>
          <div className="control-group">
            <label>横向图块数:</label>
            <input
              type="number"
              value={tilesX}
              onChange={(e) => setTilesX(Number(e.target.value))}
              min="2"
              max="8"
            />
          </div>
          <div className="control-group">
            <label>纵向图块数:</label>
            <input
              type="number"
              value={tilesY}
              onChange={(e) => setTilesY(Number(e.target.value))}
              min="2"
              max="8"
            />
          </div>
          <button
            className="regenerate-button"
            onClick={generatePattern}
            disabled={isGenerating}
          >
            {isGenerating ? '生成中...' : '重新生成'}
          </button>
        </div>

        <div className="preview-section">
          <div className="preview-panel">
            <h3>预览 (2×2)</h3>
            {previewCanvas && (
              <img
                src={previewCanvas.toDataURL()}
                alt="预览"
                className="preview-image"
              />
            )}
          </div>

          <div className="full-pattern-panel">
            <h3>完整图案 ({tilesX}×{tilesY})</h3>
            <div className="pattern-container">
              {patternCanvas && (
                <img
                  src={patternCanvas.toDataURL()}
                  alt="四方连续图案"
                  className="full-pattern-image"
                />
              )}
            </div>
          </div>
        </div>

        <div className="download-section">
          <h3>下载选项</h3>
          <div className="download-buttons">
            <button
              className="download-button png"
              onClick={handleDownloadPNG}
              disabled={!patternCanvas}
            >
              📥 下载 PNG
            </button>
            <button
              className="download-button zip"
              onClick={handleDownloadZIP}
              disabled={!patternCanvas}
            >
              📦 下载 ZIP (多尺寸)
            </button>
          </div>
          <p className="download-hint">
            下载的图案可以直接用于设计软件，实现无缝平铺效果
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeamlessPatternComponent;

