# ShopSphere Ecommerce Assignment

This is a production-ready, minimal, modern, and recruiter-friendly frontend assignment built with **Next.js (Pages Router)**, **React.js**, and **Bootstrap 5**.

## Features
- **Server-Side Rendering (SSR)**: Data fetching implemented using `getServerSideProps` for SEO and performance.
- **Responsive Layout**: Fluid and modern Bootstrap grid that adapts to Mobile, Tablet, Laptop, and Desktop screens.
- **Client-Side Search**: Instant, debounced (400ms) client-side filtering by product title.
- **Pagination**: Elegant client-side pagination displaying 8 items per page, persisting search state.
- **Dynamic Routing**: Dynamic product details page (`/product/[id]`) for rich ecommerce presentation.
- **Modern Design**: Clean typography (Inter font), handcrafted CSS modules for hover states, and accessibility best practices without overly excessive animations.

## Tech Stack
- Next.js (Pages Router)
- React.js
- Bootstrap 5 & Bootstrap Icons
- Vanilla CSS Modules (No Tailwind)

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
