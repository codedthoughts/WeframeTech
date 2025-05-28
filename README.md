# Payload CMS Multi-Tenant Form Builder

## 📋 Project Overview

This project implements a multi-tenant form builder system using Payload CMS with Supabase PostgreSQL database. It enables organizations to create and manage forms across multiple tenants, with secure form submission capabilities and tenant-based access control.

## 🚀 Features

- **Multi-Tenant Architecture**: Isolate forms and submissions by tenant
- **Dynamic Form Builder**: Create custom forms with various field types
- **Form Submission API**: Submit and retrieve form data via REST API
- **Access Control**: Tenant-specific data access and permissions
- **Admin Dashboard**: User-friendly interface for managing forms and submissions

## 🛠️ Tech Stack

- **Payload CMS**: Headless CMS framework
- **Next.js**: React framework for the frontend
- **Supabase**: PostgreSQL database provider
- **TypeScript**: Type-safe JavaScript
- **Vercel**: Deployment platform

## 🗄️ Database Provider

This project uses **Supabase** as the PostgreSQL database provider, offering:

- Managed PostgreSQL database
- Automatic backups
- Connection pooling
- Database monitoring
- Simplified setup process

## 🧩 Implementation Details

### Form Builder Implementation

The form builder functionality is implemented using the `@payloadcms/plugin-form-builder` plugin, which provides:

- Custom form creation with various field types
- Form submission handling
- Email notifications
- Confirmation messages or redirects

### Multi-Tenancy Implementation

Multi-tenancy is implemented using the `@payloadcms/plugin-multi-tenant` plugin, which enables:

- Tenant isolation
- Per-tenant form management
- Access control based on tenant
- User-tenant associations

## 📡 API Endpoints

### Custom API Endpoints

- **GET** `/api/submit-form?formId=YOUR_FORM_ID` - Fetch form by ID
- **POST** `/api/submit-form` - Submit a form response

### Form Management

- **GET** `/api/forms` - List all forms
- **GET** `/api/forms/:id` - Get a specific form
- **POST** `/api/forms` - Create a new form
- **PATCH** `/api/forms/:id` - Update a form
- **DELETE** `/api/forms/:id` - Delete a form

### Form Submissions

- **GET** `/api/form-submissions` - List all form submissions
- **GET** `/api/form-submissions/:id` - Get a specific submission
- **POST** `/api/form-submissions` - Create a form submission directly

### Tenants

- **GET** `/api/tenants` - List all tenants
- **GET** `/api/tenants/:id` - Get a specific tenant
- **POST** `/api/tenants` - Create a new tenant

## 🔐 Authentication & Permissions

The application uses Payload's built-in authentication system with custom access control:

- **User-Tenant Association**: Users are associated with specific tenants
- **Collection-Level Access Control**: Ensures tenants can only access their own data
- **API Authentication**: JWT-based authentication for API requests
- **Role-Based Permissions**: Different permission levels for admin and tenant users

## 🛠️ Project Structure

```
payload-multitenant-form/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── (frontend)/       # Frontend routes
│   │   ├── (payload)/        # Payload admin routes
│   │   └── api/              # API routes
│   ├── collections/          # Payload collections
│   │   ├── Forms.ts          # Forms collection
│   │   ├── FormSubmissions.ts # Form submissions collection
│   │   ├── Tenants.ts        # Tenants collection
│   │   ├── Users.ts          # Users collection with tenant relation
│   │   └── Media.ts          # Media collection
│   └── payload.config.ts     # Payload configuration
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd payload-multitenant-form
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Get your PostgreSQL connection string from the Supabase dashboard (Settings > Database)

4. **Configure environment variables**
   - Create a `.env` file in the project root:
   ```
   PAYLOAD_SECRET=your_secure_random_string
   DATABASE_URI=postgresql://postgres.username:password@aws-0-region.pooler.supabase.com:5432/postgres
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Access the admin panel**
   - Open [http://localhost:3000/admin](http://localhost:3000/admin)
   - Create your first admin user when prompted

### Deployment to Vercel

1. **Push your code to GitHub**

2. **Create a new Vercel project**
   - Connect your GitHub repository
   - Configure the following settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: pnpm build
     - Output Directory: .next

3. **Configure environment variables in Vercel**
   - Add the same environment variables as in your local `.env` file

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your application will be available at the provided Vercel URL

## 📝 Testing with Postman

### Creating a Tenant

**POST** `http://localhost:3000/api/tenants`

**Body:**
```json
{
  "name": "Tenant A"
}
```

### Creating a Form

**POST** `http://localhost:3000/api/forms`

**Body:**
```json
{
  "title": "Contact Us",
  "tenant": "tenant_id_here",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email Address",
      "name": "emailAddress",
      "type": "email",
      "required": true
    },
    {
      "label": "Message",
      "name": "message",
      "type": "textarea",
      "required": true
    }
  ],
  "confirmationType": "message",
  "confirmationMessage": "Thank you for your submission!"
}
```

### Submitting a Form

**POST** `http://localhost:3000/api/submit-form`

**Body:**
```json
{
  "formId": "form_id_here",
  "tenantId": "tenant_id_here",
  "submissionData": {
    "fullName": "John Doe",
    "emailAddress": "john@example.com",
    "message": "This is a test submission!"
  }
}
```

### Fetching a Form

**GET** `http://localhost:3000/api/submit-form?formId=form_id_here`

### Fetching Form Submissions

**GET** `http://localhost:3000/api/form-submissions?where[form][equals]=form_id_here`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.
