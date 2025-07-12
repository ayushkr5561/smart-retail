import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ARScanner from '../components/ARScanner';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../utils/mockData';
import { Maximize, Eye, ShoppingCart } from 'lucide-react';

const TryRoom = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showARScanner, setShowARScanner] = useState(false);

  const featuredProducts = mockProducts.slice(0, 6);

  const handleTryAR = (product) => {
    setSelectedProduct(product);
    setShowARScanner(true);
  };

  const handleQuickView = (product) => {
    console.log('Quick view for:', product.name);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-800">AR Try Room</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience products in your space before you buy. Our augmented reality technology 
              lets you visualize items with actual size, lighting, and positioning.
            </p>
          </div>

          {/* AR Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <Maximize className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">True-to-Scale</h3>
                <p className="text-purple-100">
                  See products at their actual size with precise measurements
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">360° Viewing</h3>
                <p className="text-purple-100">
                  Rotate and examine products from every angle
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Instant Purchase</h3>
                <p className="text-purple-100">
                  Buy directly from the AR experience with one click
                </p>
              </div>
            </div>
          </motion.div>

          {/* Product Selection */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                AR-Ready Products
              </h2>
              <p className="text-gray-600 text-lg">
                Select a product to experience it in augmented reality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onTryAR={handleTryAR}
                    onQuickView={handleQuickView}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              How AR Shopping Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Select Product",
                  description: "Choose any AR-enabled product from our catalog"
                },
                {
                  step: "2",
                  title: "Launch AR View",
                  description: "Click 'Try in AR' to open the immersive experience"
                },
                {
                  step: "3",
                  title: "Place & Examine",
                  description: "Position the product and view from all angles"
                },
                {
                  step: "4",
                  title: "Purchase",
                  description: "Buy with confidence directly from the AR view"
                }
              ].map((step, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* AR Scanner Modal */}
      <ARScanner
        product={selectedProduct}
        isOpen={showARScanner}
        onClose={() => setShowARScanner(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default TryRoom;