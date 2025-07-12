// Mock data for the smart retail app
export const mockProducts = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Electronics",
    rating: 4.8,
    reviews: 1234,
    description: "Premium wireless headphones with active noise cancellation",
    colors: ["Black", "Silver", "Blue"],
    inStock: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Fitness",
    rating: 4.6,
    reviews: 892,
    description: "Advanced fitness tracking with heart rate monitor",
    colors: ["Black", "White", "Pink"],
    inStock: true
  },
  {
    id: 3,
    name: "Premium Coffee Machine",
    price: 449.99,
    originalPrice: 529.99,
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Kitchen",
    rating: 4.9,
    reviews: 567,
    description: "Professional-grade espresso machine for home use",
    colors: ["Stainless Steel", "Black"],
    inStock: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/586093/pexels-photo-586093.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Furniture",
    rating: 4.7,
    reviews: 445,
    description: "Comfortable office chair with lumbar support",
    colors: ["Gray", "Black", "Navy"],
    inStock: true
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Gaming",
    rating: 4.5,
    reviews: 723,
    description: "High-precision gaming mouse with RGB lighting",
    colors: ["Black", "White"],
    inStock: true
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    price: 99.99,
    originalPrice: 129.99,
    image: "https://images.pexels.com/photos/4790266/pexels-photo-4790266.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Smart Home",
    rating: 4.4,
    reviews: 1156,
    description: "Voice-controlled smart speaker with premium sound",
    colors: ["Charcoal", "Glacier", "Sandstone"],
    inStock: true
  }
];

export const mockCategories = [
  { name: "Electronics", icon: "💻", count: 245 },
  { name: "Fitness", icon: "🏃‍♂️", count: 128 },
  { name: "Kitchen", icon: "🍳", count: 89 },
  { name: "Furniture", icon: "🪑", count: 156 },
  { name: "Gaming", icon: "🎮", count: 203 },
  { name: "Smart Home", icon: "🏠", count: 97 }
];

export const mockOrders = [
  {
    id: "ORD-2024-001",
    status: "delivered",
    statusIndex: 4,
    items: ["Wireless Headphones", "Smart Watch"],
    total: 499.98,
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-18",
    trackingSteps: [
      { name: "Order Placed", completed: true, timestamp: "2024-01-15 10:30 AM" },
      { name: "Packed", completed: true, timestamp: "2024-01-15 2:45 PM" },
      { name: "Shipped", completed: true, timestamp: "2024-01-16 8:20 AM" },
      { name: "Out for Delivery", completed: true, timestamp: "2024-01-18 9:15 AM" },
      { name: "Delivered", completed: true, timestamp: "2024-01-18 2:30 PM" }
    ]
  },
  {
    id: "ORD-2024-002",
    status: "shipped",
    statusIndex: 2,
    items: ["Coffee Machine"],
    total: 449.99,
    orderDate: "2024-01-20",
    estimatedDelivery: "2024-01-23",
    trackingSteps: [
      { name: "Order Placed", completed: true, timestamp: "2024-01-20 3:15 PM" },
      { name: "Packed", completed: true, timestamp: "2024-01-21 11:30 AM" },
      { name: "Shipped", completed: true, timestamp: "2024-01-21 4:45 PM" },
      { name: "Out for Delivery", completed: false, timestamp: null },
      { name: "Delivered", completed: false, timestamp: null }
    ]
  }
];

export const mockSavingsData = {
  monthlySpending: [
    { month: "Oct", spending: 1250, savings: 180 },
    { month: "Nov", spending: 980, savings: 220 },
    { month: "Dec", spending: 1420, savings: 315 },
    { month: "Jan", spending: 890, savings: 195 }
  ],
  totalSavings: 910,
  missedOffers: 3,
  avgMonthlySavings: 227.5,
  spendingCategories: [
    { name: "Electronics", value: 45, color: "#3B82F6" },
    { name: "Fitness", value: 20, color: "#10B981" },
    { name: "Kitchen", value: 15, color: "#F59E0B" },
    { name: "Furniture", value: 12, color: "#EF4444" },
    { name: "Other", value: 8, color: "#8B5CF6" }
  ]
};

export const voiceCommands = [
  "Find wireless headphones under $300",
  "Show me fitness trackers",
  "I need a coffee machine",
  "Search for ergonomic chairs",
  "Find gaming accessories"
];

export const searchSuggestions = [
  "laptop", "smartphone", "headphones", "fitness tracker", 
  "coffee machine", "office chair", "gaming mouse", "smart watch"
];