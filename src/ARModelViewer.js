import React, { useState, useEffect, useRef } from 'react';
import '@google/model-viewer';
import models from './modelsData.js';

const ARModelViewer = () => {
  const [modelSrc, setModelSrc] = useState(models[0]?.src || '');
  const [animationNames, setAnimationNames] = useState([]);
  const [selectedAnimation, setSelectedAnimation] = useState('');
  const [animationDuration, setAnimationDuration] = useState(0); // Ny state
  const [currentTime, setCurrentTime] = useState(0); // Ny state
  const modelViewerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      if (isPlaying) {
        modelViewer.pause();
      } else {
        modelViewer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
        const handleModelLoad = () => {
            let names = modelViewer.availableAnimations;
            if (names.length > 1) {
              names = ['__all__', ...names];
            }
            setAnimationNames(names);
            if (names.length > 0) {
              setSelectedAnimation(names[0]);
            } else {
              setSelectedAnimation('');
            }
            // Hent animationens varighed
            setAnimationDuration(modelViewer.duration || 0);
            setCurrentTime(0); // Nulstil currentTime
          };

      modelViewer.addEventListener('load', handleModelLoad);

      return () => {
        modelViewer.removeEventListener('load', handleModelLoad);
      };
    }
  }, [modelSrc]);

  // Opdater 'animationName' og nulstil 'currentTime' når 'selectedAnimation' ændres
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.animationName = selectedAnimation;
      modelViewer.currentTime = 0; // Nulstil til start
      setCurrentTime(0);
      // Opdater animationens varighed
      setAnimationDuration(modelViewer.duration || 0);
    }
  }, [selectedAnimation]);

  // Opdater 'currentTime' mens animationen afspilles
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      console.log('Selected Animation:', selectedAnimation);
      modelViewer.animationName = selectedAnimation;
      modelViewer.currentTime = 0; // Nulstil til start
      setCurrentTime(0);
      // Opdater animationens varighed
      setAnimationDuration(modelViewer.duration || 0);
    }
  }, [selectedAnimation]);
  

  const handleAnimationChange = (e) => {
    setSelectedAnimation(e.target.value);
  };

  const handleModelChange = (src) => {
    setModelSrc(src);
  };

  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.currentTime = time;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Model Viewer */}
      <model-viewer
        ref={modelViewerRef}
        id="ar-model-viewer"
        src={modelSrc}
        alt="3D Model"
        ar
        auto-rotate
        camera-controls
        animation-name={selectedAnimation}
        autoplay
        style={{ width: '100%', height: '500px' }}
      ></model-viewer>

      {/* Animation Kontroller */}
      {animationNames.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          {/* Dropdown til animationer */}
          <div className="mb-4">
            <label htmlFor="animationSelect" className="mr-2 font-semibold">
              Vælg Animation:
            </label>
            <select
                id="animationSelect"
                value={selectedAnimation}
                onChange={handleAnimationChange}
                className="px-4 py-2 border rounded-lg bg-white"
                >
                {animationNames.map((anim, index) => (
                    <option key={index} value={anim}>
                    {anim === '__all__' ? 'Alle Animationer' : anim}
                    </option>
                ))}
                </select>
          </div>

          {/* Slider til animationstid */}
          <div className="mt-4">
            <label htmlFor="timeSlider" className="font-semibold">
              Animation Tid:
            </label>
            <input
              id="timeSlider"
              type="range"
              min="0"
              max={animationDuration}
              step="0.01"
              value={currentTime}
              onChange={handleTimeChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>{currentTime.toFixed(2)}s</span>
              <span>{animationDuration.toFixed(2)}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Knapper til at loade modeller */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {models.map((model, index) => (
          <button
            key={index}
            onClick={() => handleModelChange(model.src)}
            className="focus:outline-none"
          >
            <img
              src={model.thumbnail}
              alt={model.name}
              className={`w-20 h-20 rounded-lg border-2 ${
                modelSrc === model.src ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          </button>
        ))}
      </div>

      <button
  onClick={togglePlayPause}
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  {isPlaying ? 'Pause' : 'Afspil'}
</button>

    </div>
    
  );
};

export default ARModelViewer;
