// Define the Order class to represent individual orders
class Order {
  constructor(price, timestamp, quantity, type) {
    this.price = price;          // Price of the order
    this.timestamp = timestamp;  // Timestamp when the order was placed
    this.quantity = quantity;    // Quantity of tokens in the order
    this.type = type;            // Type of order (Buy or Sell)
  }
}

// Create arrays for Buy and Sell orders
const buyOrders = [];
const sellOrders = [];

// Create a class for representing traded orders
class TradeOrder {
  constructor(price, timestamp, quantity, buyer, seller) {
    this.type = 'Traded';         // Order type is 'Traded'
    this.price = price;           // Price of the trade
    this.timestamp = timestamp;   // Timestamp of the trade
    this.quantity = quantity;     // Quantity of tokens in the trade
    this.buyer = buyer;           // Buyer's identity
    this.seller = seller;         // Seller's identity
  }
}

const tradeDatabase = []; // Simulated in-memory database for storing traded orders

// Function to create and store a traded order
function storeTradedOrder(price, timestamp, quantity, buyer, seller) {
  const tradedOrder = new TradeOrder(price, timestamp, quantity, buyer, seller);
  tradeDatabase.push(tradedOrder);
  console.log('Traded Order Stored in Database:', tradedOrder);
}

// Function to sort orders based on Price-Time-Quantity priority
function sortOrders(orders) {
  orders.sort((a, b) => {
    // Sort by Price (descending)
    if (a.price !== b.price) {
      return b.price - a.price;
    }
    
    // If Price is the same, sort by Timestamp (ascending)
    if (a.timestamp !== b.timestamp) {
      return a.timestamp.localeCompare(b.timestamp);
    }
    
    // If Price and Timestamp are the same, sort by Quantity (descending)
    return b.quantity - a.quantity;
  });
}

// Function to match Buy and Sell orders and alter quantities
function matchOrders(buyOrders, sellOrders) {
  const topBuyOrder = buyOrders[0];
  const topSellOrder = sellOrders[0];

  // Task 2a: Check if the top Buy and Sell orders have the same price
  if (topBuyOrder && topSellOrder && topBuyOrder.price === topSellOrder.price) {
    const matchedQuantity = Math.min(topBuyOrder.quantity, topSellOrder.quantity);

    // Task 2b: Alter the quantities of Buy and Sell orders
    topBuyOrder.quantity -= matchedQuantity;
    topSellOrder.quantity -= matchedQuantity;

    if (topBuyOrder.quantity === 0) {
      buyOrders.shift(); // Remove the Buy order if quantity becomes 0
    }

    if (topSellOrder.quantity === 0) {
      sellOrders.shift(); // Remove the Sell order if quantity becomes 0
    }

    // Task 3: Log the trade execution
    console.log('Trade Executed:');
    console.log('Buy Order:', topBuyOrder);
    console.log('Sell Order:', topSellOrder);

    // Task 3: Create and store the traded order
    const buyer = 'User 41';   // Replace with actual buyer's identity
    const seller = 'Client 862'; // Replace with actual seller's identity
    storeTradedOrder(topBuyOrder.price, new Date(), matchedQuantity, buyer, seller);
  }
}

// Function to simulate updates to orders (static data)
function simulateOrderUpdates() {
  // Task 1: Simulate updating orders or adding new orders here

  // Example: Adding new Buy and Sell orders (static data)
  const newBuyOrder1 = new Order(10.5, '1:32 pm', 550, 'Buy');
  const newSellOrder1 = new Order(10.5, '12:06 pm', 180, 'Sell');

  const newBuyOrder2 = new Order(11.0, '2:15 pm', 320, 'Buy');
  const newSellOrder2 = new Order(11.0, '1:45 pm', 250, 'Sell');

  const newBuyOrder3 = new Order(10.0, '3:05 pm', 450, 'Buy');
  const newSellOrder3 = new Order(11.2, '3:00 pm', 100, 'Sell');

  const newBuyOrder4 = new Order(10.5, '3:45 pm', 200, 'Buy');
  const newSellOrder4 = new Order(10.5, '2:30 pm', 200, 'Sell');

  buyOrders.push(newBuyOrder4);
  sellOrders.push(newSellOrder4);

  buyOrders.push(newBuyOrder1);
  sellOrders.push(newSellOrder1);

  buyOrders.push(newBuyOrder2);
  sellOrders.push(newSellOrder2);

  buyOrders.push(newBuyOrder3);
  sellOrders.push(newSellOrder3);

  // Task 2c: Call the matching function
  matchOrders(buyOrders, sellOrders);
}

// Task 1: Simulate continuous updates to orders (static data) every minute
setInterval(simulateOrderUpdates, 60000); // Simulate updates every minute (60000 milliseconds)
