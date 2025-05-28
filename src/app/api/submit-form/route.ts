import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import payloadConfig from '../../../payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: payloadConfig });
    const body = await req.json();
    const { formId, submissionData, tenantId } = body;

    if (!formId || !submissionData || !tenantId) {
      return NextResponse.json(
        {
          message: 'Missing required fields: formId, submissionData, or tenantId',
        },
        { status: 400 }
      );
    }

    // Validate that the form exists and belongs to the tenant
    const formResponse = await payload.find({
      collection: 'forms',
      where: {
        and: [
          { id: { equals: formId } },
          { tenant: { equals: tenantId } },
        ],
      },
    });

    if (!formResponse.docs || formResponse.docs.length === 0) {
      return NextResponse.json(
        {
          message: 'Form not found or does not belong to the specified tenant',
        },
        { status: 404 }
      );
    }

    const form = formResponse.docs[0];

    // Create a form submission with all required fields
    // Using type assertion to bypass TypeScript errors
    const formSubmissionData = {
      form: formId,
      submissionData,
      tenant: tenantId, // Tenant is required in our schema
    } as any; // Type assertion to bypass strict type checking
    
    const submission = await payload.create({
      collection: 'form-submissions',
      data: formSubmissionData,
    });

    // Handle form confirmation
    const confirmation = {
      type: 'message',
      message: 'Thank you for your submission!',
      redirectURL: '',
    };
    
    // Add confirmation details if available in the form
    if (form) {
      // Using type assertion since we know these fields exist in our schema
      const formWithConfirmation = form as {
        confirmationType?: string;
        confirmationMessage?: string;
        redirectURL?: string;
      };
      if (formWithConfirmation.confirmationType) {
        confirmation.type = formWithConfirmation.confirmationType;
      }
      if (formWithConfirmation.confirmationMessage) {
        confirmation.message = formWithConfirmation.confirmationMessage;
      }
      if (formWithConfirmation.redirectURL) {
        confirmation.redirectURL = formWithConfirmation.redirectURL;
      }
    }

    return NextResponse.json({
      message: 'Form submitted successfully',
      submission,
      confirmation,
    });
  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while submitting the form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch a form by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const formId = url.searchParams.get('formId');
    
    if (!formId) {
      return NextResponse.json(
        {
          message: 'Missing required parameter: formId',
        },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: payloadConfig });
    
    const formResponse = await payload.findByID({
      collection: 'forms',
      id: formId,
    });

    if (!formResponse) {
      return NextResponse.json(
        {
          message: 'Form not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      form: formResponse,
    });
  } catch (error: unknown) {
    console.error('Error fetching form:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while fetching the form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
