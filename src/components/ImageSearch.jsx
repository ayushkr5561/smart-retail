import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, Search } from 'lucide-react';

const ImageSearch = ({ onImageSearch }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate image analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      onImageSearch("wireless headphones"); // Mock result
    }, 3000);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!uploadedImage ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            
            <motion.div
              animate={{ y: dragActive ? -5 : 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <div className={`p-4 rounded-full ${
                  dragActive ? 'bg-blue-200' : 'bg-gray-200'
                }`}>
                  <Upload className={`w-8 h-8 ${
                    dragActive ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                </div>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {dragActive ? 'Drop image here' : 'Upload product image'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop or click to browse
                </p>
                
                <div className="flex space-x-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Browse Files</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
              </motion.button>
            </div>
            
            <div className="p-6">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="flex justify-center">
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Analyzing image...</p>
                      <p className="text-sm text-gray-500">Finding similar products</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="flex justify-center">
                      <Search className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Analysis complete!</p>
                      <p className="text-sm text-gray-500">Found matching products</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageSearch;