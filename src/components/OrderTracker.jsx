import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

const OrderTracker = ({ order }) => {
  const [currentStep, setCurrentStep] = useState(order?.statusIndex || 0);
  const [animatedStep, setAnimatedStep] = useState(0);

  const steps = [
    { name: "Order Placed", icon: Package, color: "blue" },
    { name: "Packed", icon: Package, color: "yellow" },
    { name: "Shipped", icon: Truck, color: "purple" },
    { name: "Out for Delivery", icon: MapPin, color: "orange" },
    { name: "Delivered", icon: CheckCircle, color: "green" }
  ];

  useEffect(() => {
    if (order) {
      setCurrentStep(order.statusIndex);
      // Animate steps one by one
      const timer = setTimeout(() => {
        let step = 0;
        const interval = setInterval(() => {
          setAnimatedStep(step);
          step++;
          if (step > order.statusIndex) {
            clearInterval(interval);
          }
        }, 300);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No order selected</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">Order #{order.id}</h3>
            <p className="text-blue-100">
              {order.items.join(', ')} • ${order.total}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Estimated Delivery</p>
            <p className="font-semibold">{order.estimatedDelivery}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-6">
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full" />
          
          {/* Progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: `${(animatedStep / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-6 left-6 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full z-10"
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isAnimated = index <= animatedStep;
              const StepIcon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isAnimated ? 1 : 0.8,
                    opacity: isAnimated ? 1 : 0.6 
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-3"
                >
                  {/* Step circle */}
                  <motion.div
                    animate={{
                      backgroundColor: isCompleted ? '#10B981' : '#E5E7EB',
                      scale: isAnimated ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      scale: { duration: 0.3 },
                      backgroundColor: { duration: 0.5 }
                    }}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    <StepIcon 
                      className={`w-6 h-6 ${
                        isCompleted ? 'text-white' : 'text-gray-400'
                      }`} 
                    />
                    
                    {/* Pulse animation for current step */}
                    {index === currentStep && (
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-green-400 rounded-full"
                      />
                    )}
                  </motion.div>

                  {/* Step label */}
                  <div className="text-center">
                    <p className={`font-medium text-sm ${
                      isCompleted ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </p>
                    
                    {/* Timestamp */}
                    {order.trackingSteps[index]?.timestamp && (
                      <p className="text-xs text-gray-500 mt-1">
                        {order.trackingSteps[index].timestamp}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Current Status: {steps[currentStep]?.name}
              </p>
              <p className="text-sm text-gray-600">
                {currentStep === steps.length - 1 
                  ? 'Your order has been delivered successfully!'
                  : `Your order is currently being ${steps[currentStep]?.name.toLowerCase()}`
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderTracker;