/**
 * 四方连续图案生成工具
 * 实现无缝平铺效果
 */
export class SeamlessPatternGenerator {
  generateSeamlessPattern(patternImage, options = {}) {
    const {
      tileSize = 256,
      tilesX = 4,
      tilesY = 4,
      blendEdges = true,
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = tileSize * tilesX;
    canvas.height = tileSize * tilesY;
    const ctx = canvas.getContext('2d');

    const processedPattern = this.processPatternForSeamless(
      patternImage,
      tileSize,
      blendEdges
    );

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        ctx.drawImage(
          processedPattern,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      }
    }

    return canvas;
  }

  processPatternForSeamless(image, size, blendEdges) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, size, size);

    if (blendEdges) {
      this.blendEdges(canvas, size);
    }

    return canvas;
  }

  blendEdges(canvas, size) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    const blendWidth = Math.floor(size * 0.1);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < blendWidth; x++) {
        const leftIndex = (y * size + x) * 4;
        const rightIndex = (y * size + (size - blendWidth + x)) * 4;

        const blendFactor = x / blendWidth;

        for (let c = 0; c < 3; c++) {
          const leftValue = data[leftIndex + c];
          const rightValue = data[rightIndex + c];
          const blended = leftValue * (1 - blendFactor) + rightValue * blendFactor;
          data[leftIndex + c] = blended;
          data[rightIndex + c] = blended;
        }
      }
    }

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < blendWidth; y++) {
        const topIndex = (y * size + x) * 4;
        const bottomIndex = ((size - blendWidth + y) * size + x) * 4;

        const blendFactor = y / blendWidth;

        for (let c = 0; c < 3; c++) {
          const topValue = data[topIndex + c];
          const bottomValue = data[bottomIndex + c];
          const blended = topValue * (1 - blendFactor) + bottomValue * blendFactor;
          data[topIndex + c] = blended;
          data[bottomIndex + c] = blended;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  generatePreview(patternImage, previewSize = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = previewSize;
    canvas.height = previewSize;
    const ctx = canvas.getContext('2d');

    const processedPattern = this.processPatternForSeamless(
      patternImage,
      previewSize / 2,
      true
    );

    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 2; x++) {
        ctx.drawImage(
          processedPattern,
          x * (previewSize / 2),
          y * (previewSize / 2),
          previewSize / 2,
          previewSize / 2
        );
      }
    }

    return canvas;
  }
}

