/**
 * Mock API Service for Experiment 2.3:
 * Demonstrates: Advanced JPA (Lazy vs Eager), JPQL, Criteria API,
 * Refresh Token Session Management, and Flyway Migrations.
 */

// Simulated LocalStorage keys
const AT_KEY = 'orbit_access_token';
const RT_KEY = 'orbit_refresh_token';

// --- MOCK JWT UTILS ---
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createToken = (user, type = 'access') => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = type === 'access' 
    ? Math.floor(Date.now() / 1000) + 15 // Access token expires in 15 SECONDS for demo purposes
    : Math.floor(Date.now() / 1000) + 86400; // Refresh token expires in 1 day
  
  const payload = btoa(JSON.stringify({
    sub: user.username,
    type: type,
    roles: [user.role],
    exp: exp
  }));
  return `${header}.${payload}.mock_sig`;
};

// --- AUTHENTICATION ---
export const authenticate = async (username, password) => {
  await delay(800);
  if (username !== 'admin' || password !== 'orbit2026') {
    throw { response: { status: 401, data: { message: "BadCredentialsException" } } };
  }
  const user = { username, role: 'ROLE_ADMIN' };
  const accessToken = createToken(user, 'access');
  const refreshToken = createToken(user, 'refresh');
  
  // In a real Spring App, RT might be stored in an HttpOnly cookie
  localStorage.setItem(AT_KEY, accessToken);
  localStorage.setItem(RT_KEY, refreshToken);
  
  return { status: 200, data: { accessToken, refreshToken } };
};

// Simulated interceptor logic for refreshing tokens
export const refreshAccessToken = async () => {
  await delay(500);
  const rt = localStorage.getItem(RT_KEY);
  if (!rt) throw { response: { status: 403, data: { message: "TokenRefreshException: Refresh token is missing" } } };
  
  // Simulate decoding RT to ensure it's valid
  try {
    const payload = JSON.parse(atob(rt.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) throw new Error("Expired RT");
    
    // Issue new short-lived AT
    const newAT = createToken({ username: payload.sub, role: payload.roles[0] }, 'access');
    localStorage.setItem(AT_KEY, newAT);
    return newAT;
  } catch (e) {
    localStorage.removeItem(AT_KEY);
    localStorage.removeItem(RT_KEY);
    throw { response: { status: 403, data: { message: "TokenRefreshException: Refresh token expired or invalid. Please login again." } } };
  }
};

export const logoutApi = () => {
  localStorage.removeItem(AT_KEY);
  localStorage.removeItem(RT_KEY);
};

// --- ADVANCED JPA ENTITY SIMULATION ---

// Database Schema Mock
const suppliers = [
  { id: 101, name: "Stellar Tech", region: "NA" },
  { id: 102, name: "Quantum Forge", region: "EU" }
];

const categories = [
  { id: 1, name: "Microprocessors" },
  { id: 2, name: "Cooling Systems" }
];

const products = [
  { id: 1001, name: "Quantum CPU v9", price: 450.00, stock: 120, supplierId: 101, categoryIds: [1] },
  { id: 1002, name: "Liquid He-Cooler", price: 85.00, stock: 45, supplierId: 102, categoryIds: [2] },
  { id: 1003, name: "Neural Engine X", price: 1250.00, stock: 12, supplierId: 101, categoryIds: [1] }
];

// 1. Simulating Lazy Loading (Hibernate N+1 scenario)
export const fetchProductsLazy = async () => {
  await delay(600);
  // Returns products without joining Supplier or Category entities
  return { status: 200, data: products.map(p => ({
    id: p.id, name: p.name, price: p.price, stock: p.stock,
    supplier: "Proxy_Supplier_Uninitialized",
    categories: "PersistentBag_Uninitialized"
  }))};
};

// 2. Simulating Eager Loading (JPQL: "SELECT p FROM Product p JOIN FETCH p.supplier JOIN FETCH p.categories")
export const fetchProductsEager = async () => {
  await delay(900);
  // Maps relationships eagerly
  const mapped = products.map(p => ({
    ...p,
    supplier: suppliers.find(s => s.id === p.supplierId),
    categories: categories.filter(c => p.categoryIds.includes(c.id))
  }));
  return { status: 200, data: mapped };
};

// --- JPQL & CRITERIA API SIMULATION ---
export const executeQuery = async (queryType) => {
  await delay(1200);
  if (queryType === 'JPQL_HIGH_VALUE') {
    // "SELECT p FROM Product p WHERE p.price > 100 AND p.stock < 50 ORDER BY p.price DESC"
    const results = products.filter(p => p.price > 100 && p.stock < 50).sort((a,b) => b.price - a.price);
    return { status: 200, data: { query: "SELECT p FROM Product p WHERE p.price > 100 AND p.stock < 50", executionTime: '12ms', results } };
  } else if (queryType === 'CRITERIA_JOIN') {
    // "SELECT s.name, COUNT(p.id) FROM Supplier s JOIN s.products p GROUP BY s.name"
    const results = suppliers.map(s => ({
      supplier: s.name,
      productCount: products.filter(p => p.supplierId === s.id).length
    }));
    return { status: 200, data: { query: "CriteriaBuilder cb = session.getCriteriaBuilder(); ...", executionTime: '45ms', results } };
  }
  return { status: 400, data: { message: "Invalid query" } };
};

// --- FLYWAY MIGRATION SIMULATION ---
export const getFlywayMigrations = async () => {
  await delay(400);
  return {
    status: 200,
    data: [
      { version: '1.0', description: 'init_schema', type: 'SQL', script: 'V1.0__init_schema.sql', checksum: '194857392', installedOn: '2026-04-18 10:14:02', state: 'Success' },
      { version: '1.1', description: 'add_suppliers', type: 'SQL', script: 'V1.1__add_suppliers.sql', checksum: '984572111', installedOn: '2026-04-18 11:22:45', state: 'Success' },
      { version: '2.0', description: 'alter_products_stock_trigger', type: 'SQL', script: 'V2.0__alter_products_stock_trigger.sql', checksum: '45812948', installedOn: '2026-04-19 09:10:00', state: 'Success' }
    ]
  };
};
