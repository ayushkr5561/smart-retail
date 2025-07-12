import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VoiceSearch from '../components/VoiceSearch';
import ImageSearch from '../components/ImageSearch';
import ProductCard from '../components/ProductCard';
import AisleSwiper from '../components/AisleSwiper';
import ARScanner from '../components/ARScanner';
import { mockProducts } from '../utils/mockData';

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [arProduct, setArProduct] = useState(null);
  const [showARScanner, setShowARScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1500);
  };

  const handleImageSearch = (detectedProduct) => {
    handleSearch(detectedProduct);
  };

  const handleTryAR = (product) => {
    setArProduct(product);
    setShowARScanner(true);
  };

  const handleQuickView = (product) => {
    // Quick view implementation would go here
    console.log('Quick view for:', product.name);
  };

  const handleAddToCart = (product) => {
    // Add to cart implementation would go here
    console.log('Added to cart:', product.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-6xl font-bold leading-tight">
              The Future of Shopping
              <span className="block text-4xl font-normal text-blue-200 mt-2">
                Powered by AI & AR
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience next-generation retail with voice search, image recognition, 
              augmented reality previews, and personalized analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Search Like Never Before
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Use your voice or upload an image to find exactly what you're looking for
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">🗣️ Voice Search</h3>
                <VoiceSearch 
                  onSearch={handleSearch}
                  isListening={isListening}
                  setIsListening={setIsListening}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">📷 Image Search</h3>
                <ImageSearch onImageSearch={handleImageSearch} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {(searchQuery || isSearching) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
                </h2>
                {!isSearching && (
                  <p className="text-gray-600 mt-2">
                    Found {searchResults.length} products
                  </p>
                )}
              </div>

              {isSearching ? (
                <div className="flex justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onTryAR={handleTryAR}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Digital Aisle */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <AisleSwiper
            onTryAR={handleTryAR}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Revolutionary Shopping Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the cutting-edge technologies that make shopping effortless and enjoyable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🎤",
                  title: "Voice Commands",
                  description: "Natural language product search with AI understanding"
                },
                {
                  icon: "📷",
                  title: "Visual Search",
                  description: "Upload photos to find similar products instantly"
                },
                {
                  icon: "🥽",
                  title: "AR Preview",
                  description: "See products in your space before buying"
                },
                {
                  icon: "📊",
                  title: "Smart Analytics",
                  description: "Personalized insights and savings recommendations"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AR Scanner Modal */}
      <ARScanner
        product={arProduct}
        isOpen={showARScanner}
        onClose={() => setShowARScanner(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;