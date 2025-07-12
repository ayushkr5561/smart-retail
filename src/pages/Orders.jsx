import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderTracker from '../components/OrderTracker';
import { mockOrders } from '../utils/mockData';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'shipped':
        return Truck;
      case 'processing':
        return Clock;
      default:
        return Package;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Your Orders</h1>
            <p className="text-xl text-gray-600">
              Track your packages in real-time with our advanced order tracking system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
              
              {mockOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                const isSelected = selectedOrder?.id === order.id;
                
                return (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOrder(order)}
                    className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {order.items.join(', ')}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">
                        ${order.total}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Ordered: {order.orderDate}
                      </p>
                      <p className="text-xs text-gray-500">
                        Delivery: {order.estimatedDelivery}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Tracker */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Tracking</h2>
              <OrderTracker order={selectedOrder} />
            </div>
          </div>

          {/* Order Summary */}
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Order ID:</span> {selectedOrder.id}</p>
                    <p><span className="text-gray-500">Date:</span> {selectedOrder.orderDate}</p>
                    <p><span className="text-gray-500">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs capitalize ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Items Ordered</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">• {item}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Payment & Delivery</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Total:</span> <span className="font-semibold">${selectedOrder.total}</span></p>
                    <p><span className="text-gray-500">Estimated Delivery:</span> {selectedOrder.estimatedDelivery}</p>
                    <p><span className="text-gray-500">Shipping:</span> Free</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;