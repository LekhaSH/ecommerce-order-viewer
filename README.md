eCommerce Order Viewer

A simple web application to search for users, view their orders, and drill down into order items using a provided API.

📌 Features
Search users by name, email, city, or state.

View a selected user's orders with order details.

View items within a selected order.

Responsive UI with a pastel theme for better user experience.

Clear breadcrumbs to track the current selection.

Empty state messages when no data is available.

Hover and clickable row interactions for better usability.

⚙️ Setup & Run Instructions
1. Prerequisites
Node.js and npm installed.

Backend API running locally at:
http://localhost:5174
(Endpoints: /api/users?q=..., /api/users/:id/orders, /api/orders/:id/items)

2. Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/ecommerce-order-viewer.git
Navigate into the project folder:

bash
Copy
Edit
cd ecommerce-order-viewer
Ensure your backend is running and serving the expected API endpoints.

3. Running the Project
Open the index.html file in Live Server (VS Code extension) or any local HTTP server.

In the browser, navigate to the running address (usually http://127.0.0.1:5500 for Live Server).

Use the search bar to search for users, then click to view their orders and order items.

📌 Assumptions
The backend API strictly follows the provided endpoints:

Search Users: /api/users?q=searchTerm

User Orders: /api/users/:id/orders

Order Items: /api/orders/:id/items

The backend returns JSON arrays for users, orders, and items.

Each user has an id, first_name, last_name, email, city, and state.

Each order has id, status, created_at, shipped_at, delivered_at, and num_of_item.

Each item has product_name, sku, brand, category, retail_price, and status.


🏆 Milestones Achieved
Milestone 1: Setup environment, tools, and API connections.

Milestone 2: Integrated backend API for fetching users, orders, and items.

Milestone 3: Built a responsive UI to search users and display results.

Milestone 4: Implemented full search → orders → items workflow.

Milestone 5: Enhanced UI with pastel colors, hover effects, spacing, and improved empty state handling.

🖥️ Demo Workflow
Search for a user.

Select a user to view their orders.

Click on an order to view its items.

Navigate easily with breadcrumb context.

⏱️ Estimated Demo Time: ~2 minutes
