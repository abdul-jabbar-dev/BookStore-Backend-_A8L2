# https://book-store-l2a8.vercel.app/

# Application Routes:

## Auth

https://book-store-l2a8.vercel.app/api/v1/auth/signup (POST)

https://book-store-l2a8.vercel.app/api/v1/auth/signin (POST)

## User

https://book-store-l2a8.vercel.app/api/v1/users (GET) -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/users/:id (Single GET) -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/users/:id (PATCH)  -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/users/:id (DELETE)  -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/users/profile (GET)


## Category

https://book-store-l2a8.vercel.app/api/v1/categories/create-category (POST) -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/categories (GET)

https://book-store-l2a8.vercel.app/api/v1/categories/:id (Single GET)

https://book-store-l2a8.vercel.app/api/v1/categories/:id (PATCH)  -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/categories/:id (DELETE)  -["Admin"]


## Books

https://book-store-l2a8.vercel.app/api/v1/books/create-book (POST)  -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/books (GET)

https://book-store-l2a8.vercel.app/api/v1/books/:categoryId/category (GET)

https://book-store-l2a8.vercel.app/api/v1/books/:id (GET)

https://book-store-l2a8.vercel.app/api/v1/books/:id (PATCH)  -["Admin"]

https://book-store-l2a8.vercel.app/api/v1/books/:id (DELETE)  -["Admin"]

## Orders

https://book-store-l2a8.vercel.app/api/v1/orders/create-order (POST) -["Customer"]

https://book-store-l2a8.vercel.app/api/v1/orders (GET) -["Customer", "Admin"]

https://book-store-l2a8.vercel.app/api/v1/orders/:orderId (GET) -["Customer", "Admin"]
