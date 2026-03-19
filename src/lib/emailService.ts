import nodemailer from 'nodemailer';

// Create transporter using Brevo SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });
};

interface EmailData {
  userEmail: string;
  userName: string;
  therapistName?: string;
  sessionDate?: string;
  sessionTime?: string;
}

export const sendEmailCustomer = async (data: EmailData) => {
  const transporter = createTransporter();
  
  const { userEmail, userName, therapistName, sessionDate, sessionTime } = data;

const mailOptions = {
  from: `"TalkCure" <${process.env.BREVO_VERIFIED_SENDER}>`,
  to: userEmail,
  subject: `Online Counselling Session Confirmed`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
          🎉 Session Booked Successfully!
        </h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">
          Your online counselling session has been confirmed
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Hi <strong>${userName}</strong>,
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
          Thank you for choosing TalkCure. We are happy to let you know that your counselling session has been successfully scheduled.
        </p>

        <!-- Session Details Card -->
        <div style="background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 25px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">
            🧠 Session Details
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 140px;">Therapist:</td>
              <td style="padding: 8px 0; color: #1f2937;">${therapistName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Session Date:</td>
              <td style="padding: 8px 0;">${sessionDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Session Time:</td>
              <td style="padding: 8px 0;">${sessionTime}</td>
            </tr>
          </table>
        </div>

        <!-- What's Next Section -->
        <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0;">
          <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">
            ⏳ What’s Next?
          </h3>
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 8px;">You will receive a reminder and session link 15 minutes before the session.</li>
            <li style="margin-bottom: 8px;">Please ensure a quiet and private space for the session.</li>
            <li style="margin-bottom: 8px;">For any changes or rescheduling, contact support at least 6 hours before the session.</li>
          </ul>
        </div>

        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
          If you need help, feel free to reach us anytime. We are here to support you.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 25px 30px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
          Warm regards,<br>
          <strong style="color: #374151;">The TalkCure Team</strong>
        </p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            This email was sent to ${userEmail}. For support, contact us anytime.
          </p>
        </div>
      </div>
    </div>
  `,
  text: `
Hi ${userName},

Your counselling session has been confirmed.

Session Details:
Therapist: ${therapistName}
Date: ${sessionDate}
Time: ${sessionTime}

You will receive a reminder before the session.

Warm regards,
TalkCure Team
  `
};

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Ownership approval email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending ownership approval email:', error);
    throw error;
  }
};

interface EmailDataTherapist {
  therapistEmail: string;
  therapistName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  issues: string[];
  age: number; 
  gender: string;
  sessionDate: string;
  sessionTime: string;
}

export const sendEmailTherapist = async (data: EmailDataTherapist) => {
  const transporter = createTransporter();
  
  const { therapistEmail, therapistName, clientName, clientPhone, clientEmail, issues, age, gender, sessionDate, sessionTime } = data;

  const mailOptions = {
    from: `"TalkCure" <${process.env.BREVO_VERIFIED_SENDER}>`,
    to: therapistEmail,
    subject: `New Counselling Session Assigned`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 26px;">
            🧠 New Session Assigned
          </h1>
          <p style="color: #e0e7ff; margin-top: 10px;">
            A new client session has been scheduled for you
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; color: #374151;">
            Hi <strong>${therapistName}</strong>,
          </p>

          <p style="font-size: 16px; color: #374151;">
            You have been assigned a new counselling session. Below are the details:
          </p>

          <!-- Session Info -->
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 20px;">
            <h3 style="margin-bottom: 15px;">📅 Session Details</h3>
            <table style="width: 100%;">
              <tr>
                <td><strong>Client Name:</strong></td>
                <td>${clientName || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Age:</strong></td>
                <td>${age}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>${gender}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${clientEmail}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${clientPhone}</td>
              </tr>
              <tr>
                <td><strong>Issues:</strong></td>
                <td>${issues?.join(', ') || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Date:</strong></td>
                <td>${sessionDate}</td>
              </tr>
              <tr>
                <td><strong>Time:</strong></td>
                <td>${sessionTime}</td>
              </tr>
            </table>
          </div>

          <!-- Instructions -->
          <div style="background-color: #eef2ff; border-left: 4px solid #6366f1; padding: 20px; margin-top: 25px;">
            <h3 style="margin-bottom: 10px;">⚡ Action Required</h3>
            <ul style="padding-left: 20px; color: #374151;">
              <li>Please be available 10 minutes before the session.</li>
              <li>Review the client details beforehand.</li>
              <li>Ensure a stable internet connection.</li>
            </ul>
          </div>

          <p style="margin-top: 25px; font-size: 16px;">
            If you have any questions, feel free to reach out to the support team.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          Regards,<br/>
          <strong>TalkCure Team</strong>
        </div>
      </div>
    `,
    text: `
Hi ${therapistName},

A new counselling session has been assigned to you.

Client: ${clientName || 'N/A'}
Age: ${age}
Gender: ${gender}
Issues: ${issues?.join(', ') || 'N/A'}

Session Date: ${sessionDate}
Session Time: ${sessionTime}

Please be available before the session.

Regards,
TalkCure Team
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Therapist email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending therapist email:', error);
    throw error;
  }
};