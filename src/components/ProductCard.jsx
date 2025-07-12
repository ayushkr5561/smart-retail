import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, Maximize } from 'lucide-react';

const ProductCard = ({ product, onTryAR, onQuickView, onAddToCart }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-12 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
        
        {/* Overlay buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center space-x-3"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onTryAR(product)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Try in AR"
          >
            <Maximize className="w-5 h-5 text-gray-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Quick View"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </motion.button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </motion.button>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>

        <div className="flex items-center mb-3">
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
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Color options */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Colors:</p>
            <div className="flex space-x-2">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                   color.toLowerCase() === 'white' ? '#fff' :
                                   color.toLowerCase() === 'blue' ? '#3B82F6' :
                                   color.toLowerCase() === 'silver' ? '#C0C0C0' :
                                   color.toLowerCase() === 'gray' ? '#6B7280' :
                                   color.toLowerCase() === 'navy' ? '#1E3A8A' :
                                   color.toLowerCase() === 'pink' ? '#EC4899' :
                                   '#6B7280'
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{product.colors.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;