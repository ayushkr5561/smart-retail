import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Maximize, ShoppingCart } from 'lucide-react';
import { mockCategories, mockProducts } from '../utils/mockData';

const AisleSwiper = ({ onTryAR, onQuickView, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const getProductsByCategory = (categoryName) => {
    return mockProducts.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    );
  };

  const scrollToCategory = (direction) => {
    if (direction === 'next') {
      setActiveCategory(prev => 
        prev === mockCategories.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveCategory(prev => 
        prev === 0 ? mockCategories.length - 1 : prev - 1
      );
    }
  };

  const currentCategory = mockCategories[activeCategory];
  const categoryProducts = getProductsByCategory(currentCategory.name);

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToCategory('prev')}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToCategory('next')}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {mockCategories.map((category, index) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap ${
                index === activeCategory
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <p className="font-semibold">{category.name}</p>
                <p className={`text-sm ${
                  index === activeCategory ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {category.count} items
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Hero Section */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-6xl">{currentCategory.icon}</span>
              <div>
                <h3 className="text-4xl font-bold">{currentCategory.name}</h3>
                <p className="text-xl text-blue-100">
                  Discover amazing {currentCategory.name.toLowerCase()} products
                </p>
              </div>
            </div>
            <p className="text-lg text-blue-100">
              {currentCategory.count} carefully curated products • Free shipping on orders over $50
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Special Offer</p>
              <p className="text-2xl font-bold">Up to 30% Off</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        key={`products-${activeCategory}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categoryProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay with quick actions */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onQuickView(product)}
                  className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onTryAR(product)}
                  className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  title="Try in AR"
                >
                  <Maximize className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              {/* Price badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ${product.price}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {product.name}
              </h4>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(product)}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {categoryProducts.length > 0 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            View All {currentCategory.name} Products
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default AisleSwiper;