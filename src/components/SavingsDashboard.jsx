import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle, Gift } from 'lucide-react';
import { mockSavingsData } from '../utils/mockData';

const SavingsDashboard = () => {
  const { monthlySpending, totalSavings, missedOffers, avgMonthlySavings, spendingCategories } = mockSavingsData;

  const savingsRate = 22; // Mock savings rate percentage
  const spendingTrend = -8.5; // Mock trend (negative means spending less)

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, trendDirection }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${
            trendDirection === 'up' ? 'bg-green-100' : 
            trendDirection === 'down' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              trendDirection === 'up' ? 'text-green-600' : 
              trendDirection === 'down' ? 'text-red-600' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
            trendDirection === 'up' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {trendDirection === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Your Savings Dashboard</h1>
        <p className="text-xl text-gray-600">Track your spending patterns and discover savings opportunities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Savings"
          value={`$${totalSavings}`}
          subtitle="This year"
          trend={15.2}
          trendDirection="up"
        />
        <StatCard
          icon={Target}
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="Of total spending"
          trend={3.4}
          trendDirection="up"
        />
        <StatCard
          icon={TrendingDown}
          title="Monthly Average"
          value={`$${avgMonthlySavings}`}
          subtitle="Saved per month"
          trend={spendingTrend}
          trendDirection="up"
        />
        <StatCard
          icon={AlertCircle}
          title="Missed Offers"
          value={missedOffers}
          subtitle="Opportunities"
          trend={12}
          trendDirection="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Spending Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Monthly Spending vs Savings</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-600">Spending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-600">Savings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="spending" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending Categories Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {spendingCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {spendingCategories.map((category) => (
              <div key={category.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="text-sm font-medium text-gray-800">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Savings Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Gift className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Savings Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Based on your shopping patterns, we've identified potential savings of up to $150 this month.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-1">Bundle Deals</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Save 15% when buying electronics together
                </p>
                <span className="text-green-600 font-medium">Potential: $45</span>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-1">Seasonal Sales</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Winter clearance on fitness equipment
                </p>
                <span className="text-green-600 font-medium">Potential: $75</span>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-1">Loyalty Rewards</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Unlock premium member pricing
                </p>
                <span className="text-green-600 font-medium">Potential: $30</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SavingsDashboard;