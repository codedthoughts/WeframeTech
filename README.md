# Payload Multi-Tenant Form Builder

This project implements a multi-tenant form builder using Payload CMS with Supabase PostgreSQL database. It allows creating and managing forms across multiple tenants, with form submission capabilities.

## Database Provider

This project uses **Supabase** as the PostgreSQL database provider. Supabase offers:

- Managed PostgreSQL database
- Automatic backups
- Connection pooling
- Database monitoring

## Implementation Details

### Form Builder Implementation

The form builder functionality is implemented using the `@payloadcms/plugin-form-builder` plugin. This allows:

- Creating custom forms with various field types
- Managing form submissions
- Customizing form validation

### Multi-Tenancy Implementation

Multi-tenancy is implemented using the `@payloadcms/plugin-multi-tenant` plugin, which provides:

- Tenant isolation
- Per-tenant form management
- Access control based on tenant

## API Endpoints

### Form Management

- **GET** `/api/forms` - List all forms
- **GET** `/api/forms/:id` - Get a specific form
- **POST** `/api/forms` - Create a new form
- **PATCH** `/api/forms/:id` - Update a form
- **DELETE** `/api/forms/:id` - Delete a form

### Form Submissions

- **POST** `/api/form-submissions` - Submit a form response
- **GET** `/api/form-submissions` - List all form submissions
- **GET** `/api/form-submissions/:id` - Get a specific submission

### Tenants

- **GET** `/api/tenants` - List all tenants
- **GET** `/api/tenants/:id` - Get a specific tenant
- **POST** `/api/tenants` - Create a new tenant

## Authentication & Permissions

The application uses Payload's built-in authentication system. Access control is implemented at the collection level to ensure tenants can only access their own forms and submissions.

## Setup Instructions

1. Create a Supabase account and project
2. Configure environment variables in `.env`:
   ```
   PAYLOAD_SECRET=your_payload_secret
   DATABASE_URI=your_supabase_connection_string
   ```
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Access the admin panel at `http://localhost:3000/admin`

## Testing with Postman

You can test the API endpoints using Postman:

1. Create a tenant
2. Create a form associated with the tenant
3. Submit form responses
4. Query form submissions

See the API documentation section for request/response examples.
