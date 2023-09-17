# https://book-store-l2a8.vercel.app/

# Application Routes:

## Auth

api/v1/auth/signup (POST)
api/v1/auth/signin (POST)

## User

api/v1/users (GET) -["Admin"]
api/v1/users/:id (Single GET) -["Admin"]
api/v1/users/:id (PATCH)  -["Admin"]
api/v1/users/:id (DELETE)  -["Admin"]
api/v1/users/profile (GET)

## Category

api/v1/categories/create-category (POST) -["Admin"]
api/v1/categories (GET)
api/v1/categories/:id (Single GET)
api/v1/categories/:id (PATCH)  -["Admin"]
api/v1/categories/:id (DELETE)  -["Admin"]

## Books

api/v1/books/create-book (POST)  -["Admin"]
api/v1/books (GET)
api/v1/books/:categoryId/category (GET)
api/v1/books/:id (GET)
api/v1/books/:id (PATCH)  -["Admin"]
api/v1/books/:id (DELETE)  -["Admin"]

## Orders

api/v1/orders/create-order (POST) -["Customer"]
api/v1/orders (GET) -["Customer", "Admin"]
api/v1/orders/:orderId (GET) -["Customer", "Admin"]
