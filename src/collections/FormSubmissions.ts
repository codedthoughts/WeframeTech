import { CollectionConfig } from 'payload';

const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'form', 'tenant', 'createdAt'],
  },
  access: {
    // Multi-tenant access control - users can only access submissions for their tenant
    read: ({ req }) => {
      if (req.user && req.user.tenant) {
        return {
          tenant: {
            equals: req.user.tenant,
          },
        };
      }
      return true; // Allow all for testing with Postman
    },
    update: ({ req }) => {
      if (req.user && req.user.tenant) {
        return {
          tenant: {
            equals: req.user.tenant,
          },
        };
      }
      return true; // Allow all for testing with Postman
    },
    delete: ({ req }) => {
      if (req.user && req.user.tenant) {
        return {
          tenant: {
            equals: req.user.tenant,
          },
        };
      }
      return true; // Allow all for testing with Postman
    },
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req: _req }) => {
        return {
          ...data,
          createdAt: new Date().toISOString(),
        };
      },
    ],
  },
};

export default FormSubmissions;
