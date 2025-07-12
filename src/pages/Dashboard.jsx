import React from 'react';
import { motion } from 'framer-motion';
import SavingsDashboard from '../components/SavingsDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SavingsDashboard />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;