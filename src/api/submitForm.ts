import { Payload } from 'payload';

export const submitForm = async (req, res, payload: Payload) => {
  try {
    const { formId, data, tenantId } = req.body;

    if (!formId || !data || !tenantId) {
      return res.status(400).json({
        message: 'Missing required fields: formId, data, or tenantId',
      });
    }

    // Validate that the form exists and belongs to the tenant
    const form = await payload.find({
      collection: 'forms',
      where: {
        and: [
          { id: { equals: formId } },
          { tenant: { equals: tenantId } },
        ],
      },
    });

    if (!form.docs || form.docs.length === 0) {
      return res.status(404).json({
        message: 'Form not found or does not belong to the specified tenant',
      });
    }

    // Create a form submission
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        tenant: tenantId,
        data,
      },
    });

    return res.status(200).json({
      message: 'Form submitted successfully',
      submission,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({
      message: 'An error occurred while submitting the form',
      error: error.message,
    });
  }
};
