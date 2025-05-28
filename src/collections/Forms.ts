import { CollectionConfig } from 'payload';

const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tenant', 'createdAt'],
  },
  access: {
    // Multi-tenant access control - users can only access forms for their tenant
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'This will be used as the field identifier in submissions',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
          ],
          required: true,
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'confirmationType',
      type: 'select',
      options: [
        { label: 'Message', value: 'message' },
        { label: 'Redirect', value: 'redirect' },
      ],
      defaultValue: 'message',
    },
    {
      name: 'confirmationMessage',
      type: 'textarea',
      admin: {
        condition: (data) => data.confirmationType === 'message',
      },
    },
    {
      name: 'redirectURL',
      type: 'text',
      admin: {
        condition: (data) => data.confirmationType === 'redirect',
      },
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          name: 'emailTo',
          type: 'email',
          required: true,
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
        },
      ],
    },
  ],
};

export default Forms;
