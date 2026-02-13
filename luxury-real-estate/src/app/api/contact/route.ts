import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, inquiryType, message, propertyId } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !inquiryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const emailContent = {
      to: 'dwellaainfo@gmail.com',
      subject: `New ${inquiryType} inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1>New Contact Form Submission</h1>
            <p>dwellaa.com</p>
          </div>
          
          <div style="padding: 30px; background-color: #f8f9fa;">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${email}" style="color: #1e40af;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; font-weight: bold;">Inquiry Type:</td>
                <td style="padding: 10px; text-transform: capitalize;">${inquiryType}</td>
              </tr>
              ${propertyId ? `
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px; font-weight: bold;">Property ID:</td>
                <td style="padding: 10px;">${propertyId}</td>
              </tr>
              ` : ''}
            </table>
            
            <h3 style="color: #1e40af; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
            <div style="background-color: white; padding: 20px; border-left: 4px solid #1e40af; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 8px;">
              <p style="margin: 0; color: #1565c0;">
                <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a>
              </p>
              ${phone ? `<p style="margin: 5px 0 0 0; color: #1565c0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #1e40af;">${phone}</a></p>` : ''}
            </div>
          </div>
          
          <div style="background-color: #f1f3f4; padding: 15px; text-align: center; color: #666;">
            <p style="margin: 0;">This message was sent from the contact form at dwellaa.com</p>
          </div>
        </div>
      `,
      text: `
New ${inquiryType} inquiry from ${firstName} ${lastName}

Contact Details:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Inquiry Type: ${inquiryType}
${propertyId ? `Property ID: ${propertyId}` : ''}

Message:
${message}

Reply to: ${email}
${phone ? `Phone: ${phone}` : ''}

This message was sent from the contact form at dwellaa.com
      `
    };

    // For now, just log the email content
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun  
    // - AWS SES
    // - Nodemailer with SMTP
    
    console.log('Email would be sent to dwellaainfo@gmail.com:', emailContent);
    
    // Simulate successful email sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully. We will get back to you soon!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}