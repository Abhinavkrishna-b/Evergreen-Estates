# Evergreen Estates

Evergreen Estates is a full-stack real estate marketplace built with a Node.js/Express backend and a React + Vite frontend. It supports property listings, buyer and seller profiles, in-app messaging, and an admin panel for property verification and user management.

## Key Features

- Property listings with images, specs, and location data
- Buyer and seller profiles with role-based access
- In-app messaging between buyers and sellers 
- Admin dashboard for property verification and user management
- JWT-based authentication with separate user/admin auth systems

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), bcryptjs
- **Frontend:** React, Vite, JSX, CSS
- **Auth:** JWT tokens 

## Project Structure

```
evergreen-estates/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── propertyController.js
│   │   ├── userController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   ├── verifyToken.js
│   │   ├── verifyAdmin.js
│   │   └── verifyRole.js
│   ├── models/
│   │   ├── User.js
│   │   ├── BuyerProfile.js
│   │   ├── SellerProfile.js
│   │   ├── Admin.js
│   │   ├── Property.js
│   │   ├── Conversation.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── HorizontalCard/
│   │   │   ├── FeaturedProperties/
│   │   │   ├── PropertyHeader/
│   │   │   ├── PropertySpecs/
│   │   │   ├── ImageGallery/
│   │   │   ├── ActionButtons/
│   │   │   ├── Map/
│   │   │   ├── FilterBar/
│   │   │   ├── UserInfo/
│   │   │   ├── SavedList/
│   │   │   ├── MyListings/
│   │   │   ├── Messages/
│   │   │   ├── ChatBox/
│   │   │   ├── AdminSidebar/
│   │   │   ├── DashboardStats/
│   │   │   ├── PendingVerifications/
│   │   │   ├── RecentProperties/
│   │   │   ├── PropertyManagementTable/
│   │   │   ├── UserManagementTable/
│   │   │   └── VerificationTable/
│   │   ├── routes/
│   │   │   ├── Homepage/
│   │   │   ├── PropertiesPage/
│   │   │   ├── PropertyDetails/
│   │   │   ├── LoginPage/
│   │   │   ├── SignupPage/
│   │   │   ├── AdminLogin/
│   │   │   ├── AdminSignup/
│   │   │   ├── UserProfile/
│   │   │   ├── SellerProfile/
│   │   │   ├── CreatePost/
│   │   │   ├── AdminDashboard/
│   │   │   ├── AdminProperties/
│   │   │   ├── AdminVerification/
│   │   │   ├── AdminUsers/
│   │   │   └── AdminSettings/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── AdminAuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── propertyService.js
│   │   │   ├── adminService.js
│   │   │   └── messageService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

## Quick Start

**Prerequisites:** Node.js 16+, npm, MongoDB (local or Atlas)

**Backend**

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

**Frontend**

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5000`.

## Environment Variables

**backend/.env**

\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
USER_JWT_SECRET=your_user_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_EXPIRE=7d
\`\`\`

**frontend/.env**

\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

## API Overview

| Module | Base Route | Notes |
|---|---|---|
| Auth | `/api/auth` | register, login, me |
| Admin Auth | `/api/admin` | register, login, me |
| Properties | `/api/properties` | CRUD, filters, my-properties |
| Admin Properties | `/api/admin/properties` | verify, badge, force delete |
| Admin Users | `/api/admin/users` | ban, unban, delete |
| Admin Dashboard | `/api/admin/dashboard` | stats |
| User Profile | `/api/users` | profile, saved properties, seller profile |
| Messages | `/api/messages` | conversations, send message |

## Development Notes

- Protected routes require `Authorization: Bearer <token>` header.
- User tokens and admin tokens use **separate JWT secrets** - a user token cannot access admin routes and vice versa.
- Role-based routes are used.
- Messaging uses HTTP polling - ChatBox polls every 3s, conversation list polls every 5s.
- Property images are currently stored as URLs; Cloudinary upload integration is a planned improvement.

## Testing

Use Postman to exercise API endpoints directly. Backend console logs print MongoDB connection status and request errors on startup.
