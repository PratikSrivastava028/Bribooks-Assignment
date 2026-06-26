# ShopSphere Ecommerce Assignment

**Live Demo:** [https://bribooks-assignment.onrender.com](https://bribooks-assignment.onrender.com)

A frontend ecommerce application built with Next.js (Pages Router) and Bootstrap 5. It fetches product data from the FakeStore API and displays it in a responsive grid.

## Features
- **Server-Side Rendering (SSR)**: Data fetching implemented using `getServerSideProps` for performance.
- **Responsive Layout**: Fluid Bootstrap grid that adapts to Mobile, Tablet, Laptop, and Desktop screens.
- **Client-Side Search**: Debounced client-side filtering by product title.
- **Pagination**: Client-side pagination displaying 8 items per page, persisting search state.
- **Dynamic Routing**: Product details page (`/product/[id]`) for rich ecommerce presentation.

## Tech Stack
- Next.js (Pages Router)
- React.js
- Bootstrap 5 & Bootstrap Icons
- Vanilla CSS Modules 

## Setup Instructions

### 1. Install Dependencies
Make sure you have Node.js installed. In the project directory, run:
```bash
npm install
```

### 2. Run Development Server
Start the development server using:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
To test the production build, run:
```bash
npm run build
npm start
```
