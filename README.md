# Task Management API

A multi-tenant task management system built with Node.js, Express, and PostgreSQL.

## Project Overview

This API provides a complete task management solution with role-based access control and multi-tenant organization support. Platfrom Admin can create organizations and organization admin.Organization Admin can manage projects, and assign tasks with for organization member, also can create org member and manage own organization member.

### Key Features
- Multi-tenant organization structure
- Role-based access control (Platform Admin, Organization Admin, Organization Member)
- JWT + session-based authentication
- Task assignment and status tracking
- RESTful API design

## Tech Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with JWT
- **Session Management**: Express Session + Cookies

## Folder Structure

```
src/
├── modules/              # Feature-based modules
│   ├── auth/            # Authentication (login, register)
│   ├── organization/    # Organization CRUD operations
│   ├── user/           # User management
│   ├── projects/       # Project management
│   └── task/           # Task CRUD and assignment
├── middlewares/        # Cross-cutting concerns
│   ├── check.auth.ts   # Authentication middleware
│   ├── global.error.ts # Global error handler
│   └── notFound.ts     # 404 handler
├── config/             # Configuration files
│   ├── env.ts          # Environment variables
│   ├── prisma.configs.ts # Prisma client setup
│   ├── passsport.ts    # Passport strategy configuration
│   └── connect.db.ts   # Database connection
├── utils/              # Helper functions
│   ├── create.jwt.ts   # JWT token generation
│   ├── set.cookies.ts  # Cookie management
│   ├── sendResponse.ts # Standardized API responses
│   └── seedAdmin.ts    # Database seeding
├── types/              # TypeScript interfaces
└── routes/             # Route aggregation
```

## Database Choice Reasoning

**PostgreSQL** was chosen for the following reasons:

1. **ACID Compliance**: Ensures data consistency for financial and task-critical operations
2. **Relational Structure**: Perfect for the hierarchical relationship between Organizations → Projects → Tasks → Users
3. **JSON Support**: Native JSON columns for flexible metadata storage
4. **Scalability**: Handles concurrent users and complex queries efficiently
5. **Prisma Integration**: Excellent TypeScript support with type-safe database operations

### Database Schema
- **Users**: Authentication and role management
- **Organizations**: Multi-tenant isolation
- **Projects**: Scoped to organizations
- **Tasks**: Assigned to users within projects

## Authorization Enforcement

### Role Hierarchy
```
PLATFORM_ADMIN    # Full system access
├── OG_ADMIN      # Organization-level admin
└── OG_MEMBER     # Organization member
```

### Authorization Flow
1. **Authentication**: JWT tokens validated via `check.auth.ts` middleware
2. **Role Verification**: User roles checked against required permissions
3. **Tenant Isolation**: Users can only access their organization's data
4. **Resource Ownership**: Additional checks for resource-specific permissions

### Implementation
- Middleware validates JWT tokens on protected routes
- Role-based guards prevent unauthorized access
- Organization ID filtering ensures tenant isolation
- Resource ownership verified before CRUD operations

## API Endpoints

```
POST   /api/v1/auth/login              # User authentication
POST   /api/v1/auth/register           # User registration
GET    /api/v1/organizations           # List organizations by platform admin
POST   /api/v1/organizations/create    # Create organization by platform admin
GET    /api/v1/projects/my-org         # List own organization projects
POST   /api/v1/projects/create         # Create own organization project by org Admin
POST    /api/v1/users/create-org-admin # Create org_admin by platform admin
POST   /api/v1/users/create-org-member # Create org_member by org_admin
GET    /api/v1/users/my-org-member     # List own organization member by org_admin

POST   /api/v1/tasks/assigned-tasks    # Assigned a member for this task by org admin
GET   /api/v1/tasks/my-assigned-tasks  # List my assigned task by org_member

```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure DATABASE_URL and JWT_SECRET
   ```

3. **Database Setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Postman Usage Notes

### Authentication Setup
1. **Login Request**: POST `/api/v1/auth/login`
   ```json
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

2. **Token Handling**:
   - JWT token returned in response body
   - Session cookie automatically set
   - Use either method for subsequent requests


### Sample Request Flow
1. **Register/Login** → Get JWT token
2. **Create Organization** → Use token in header
3. **Create Project** → Include organizationId
4. **Create Task** → Include projectId and assignedToId
5. **Update Task Status** → OPEN → COMPLETED

### Error Responses
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Resource not found
- `400`: Bad request (validation errors)

### Testing Tips
- Use environment variables in Postman for base URL and tokens
- Set up pre-request scripts to automatically include auth headers
- Create separate collections for different user roles
- Test tenant isolation by switching between organization contexts
