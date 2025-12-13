import { getProducts } from "../pages/Products";
import { getOrders } from "../pages/Orders";
import { getInventoryLogs } from "../pages/Inventory";

export function getTodayStats() {
  const today = new Date().toDateString();

  const inventoryLogs = getInventoryLogs().filter(
    log => new Date(log.date).toDateString() === today
  );

  const todayStockAdded = inventoryLogs.reduce((sum, log) => sum + log.quantity, 0);

  const orders = getOrders().filter(
    order => new Date(order.date).toDateString() === today
  );

  const todayRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const todayOrders = orders.length;

  // Top selling product
  let productCount = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productCount[item.productId] = (productCount[item.productId] || 0) + item.qty;
    });
  });

  let topSellingProduct = null;
  let highest = 0;

  const products = getProducts();

  for (let id in productCount) {
    if (productCount[id] > highest) {
      highest = productCount[id];
      topSellingProduct = products.find(p => p.id === id)?.name;
    }
  }

  // Low stock products
  const lowStock = products.filter(p => p.stock <= 5);

  return {
    todayStockAdded,
    todayRevenue,
    todayOrders,
    topSellingProduct,
    lowStock
  };
}
