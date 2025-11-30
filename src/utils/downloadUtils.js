import JSZip from 'jszip';

/**
 * 下载工具函数
 */
export class DownloadUtils {
  static downloadPNG(canvas, filename = 'pattern.png') {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  static async downloadZIP(files, zipFilename = 'patterns.zip') {
    const zip = new JSZip();

    files.forEach((file, index) => {
      const filename = file.filename || `pattern_${index + 1}.png`;
      zip.file(filename, file.canvas.toDataURL('image/png').split(',')[1], {
        base64: true,
      });
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async downloadPatternSet(patternCanvas, baseFilename = 'pattern') {
    const files = [
      {
        canvas: patternCanvas,
        filename: `${baseFilename}_full.png`,
      },
    ];

    const sizes = [512, 256, 128];
    sizes.forEach((size) => {
      const resizedCanvas = this.resizeCanvas(patternCanvas, size, size);
      files.push({
        canvas: resizedCanvas,
        filename: `${baseFilename}_${size}x${size}.png`,
      });
    });

    await this.downloadZIP(files, `${baseFilename}_set.zip`);
  }

  static resizeCanvas(sourceCanvas, targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);
    return canvas;
  }
}

