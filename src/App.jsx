import { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageSegmentation from './components/ImageSegmentation';
import PatternExtractor from './components/PatternExtractor';
import SeamlessPattern from './components/SeamlessPattern';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [originalImage, setOriginalImage] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [extractedPattern, setExtractedPattern] = useState(null);

  const handleImageUpload = (image) => {
    setOriginalImage(image);
    setStep(2);
  };

  const handleSegmentationComplete = (segmented) => {
    setSegmentedImage(segmented);
    setStep(3);
  };

  const handlePatternExtracted = (pattern) => {
    setExtractedPattern(pattern);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setOriginalImage(null);
    setSegmentedImage(null);
    setExtractedPattern(null);
  };

  return (
    <div className="app">
      <Header onReset={handleReset} />
      <main className="main-content">
        {step === 1 && <ImageUploader onImageUpload={handleImageUpload} />}
        {step === 2 && (
          <ImageSegmentation
            image={originalImage}
            onSegmentationComplete={handleSegmentationComplete}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <PatternExtractor
            image={segmentedImage}
            onPatternExtracted={handlePatternExtracted}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <SeamlessPattern
            pattern={extractedPattern}
            onBack={() => setStep(3)}
            onNewImage={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;

