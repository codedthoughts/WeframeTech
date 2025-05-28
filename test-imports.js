// Simple test file to check plugin exports
const formBuilderPlugin = require('@payloadcms/plugin-form-builder');
const multiTenantPlugin = require('@payloadcms/plugin-multi-tenant');

console.log('Form Builder Plugin exports:', Object.keys(formBuilderPlugin));
console.log('Multi-Tenant Plugin exports:', Object.keys(multiTenantPlugin));
