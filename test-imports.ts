// Simple test file to check plugin exports
import * as formBuilderPlugin from '@payloadcms/plugin-form-builder';
import * as multiTenantPlugin from '@payloadcms/plugin-multi-tenant';

console.log('Form Builder Plugin exports:', Object.keys(formBuilderPlugin));
console.log('Multi-Tenant Plugin exports:', Object.keys(multiTenantPlugin));
