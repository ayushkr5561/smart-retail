import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, ZoomIn, ZoomOut, Move3D, Star, ShoppingCart } from 'lucide-react';

const ARScanner = ({ product, isOpen, onClose, onAddToCart }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!isOpen || !product) return null;

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 2000);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsRotating(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">AR View</h2>
              <p className="text-gray-600">{product.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>

          <div className="flex">
            {/* AR View Area */}
            <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-[500px] flex items-center justify-center">
              {/* Simulated AR Environment */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30" />
              
              {/* Grid pattern to simulate AR space */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                  {[...Array(96)].map((_, i) => (
                    <div key={i} className="border border-gray-400" />
                  ))}
                </div>
              </div>

              {/* Product in AR */}
              <motion.div
                animate={{
                  scale: zoom,
                  x: position.x,
                  y: position.y,
                  rotateY: isRotating ? 360 : 0
                }}
                transition={{
                  rotateY: { duration: 2, ease: "easeInOut" },
                  scale: { duration: 0.2 },
                  x: { duration: 0.2 },
                  y: { duration: 0.2 }
                }}
                className="relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-contain drop-shadow-2xl"
                />
                
                {/* AR Overlay Effects */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 border-2 border-blue-400 rounded-lg"
                />
                
                {/* Size indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  Actual Size Preview
                </div>
              </motion.div>

              {/* AR Controls */}
              <div className="absolute bottom-6 left-6 flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRotate}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <RotateCcw className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomIn}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomOut}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetView}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Move3D className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              {/* AR Info Overlay */}
              <div className="absolute top-6 right-6 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg">
                <p className="text-sm font-medium text-gray-800">AR Mode Active</p>
                <p className="text-xs text-gray-600">Zoom: {Math.round(zoom * 100)}%</p>
              </div>
            </div>

            {/* Product Info Panel */}
            <div className="w-80 p-6 border-l border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </p>
                  )}
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Available Colors:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAddToCart(product)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart - ${product.price}</span>
                  </motion.button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    ✓ Free shipping on orders over $50
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">AR Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Actual size visualization</li>
                    <li>• 360° product rotation</li>
                    <li>• Zoom and positioning</li>
                    <li>• Real-time lighting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARScanner;