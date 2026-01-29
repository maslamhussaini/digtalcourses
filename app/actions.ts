'use server'

import nodemailer from 'nodemailer';
import { INITIAL_COURSES } from './config';

export async function submitEnrollment(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    whatsapp: formData.get('whatsapp'),
    city: formData.get('city'),
    gender: formData.get('gender'),
    courses: formData.getAll('courses') as string[],
    paymentScreenshot: formData.get('paymentScreenshot') as File,
    promoCode: formData.get('promoCode') as string,
    attendance: formData.get('attendance'),
    manager: formData.get('manager'),
    numberSaved: formData.get('numberSaved'),
  };

  // 0. Validate Environment Config
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
    return { success: false, message: 'Internal Server Error: Missing Configuration' };
  }

  // 1. Calculate and Verify Price Server-Side
  const selectedCourses = INITIAL_COURSES.filter(c => rawFormData.courses.includes(c.id));

  const baseTotal = selectedCourses.reduce((sum, c) => sum + c.price, 0);
  const courseNames = selectedCourses.map(c => c.name);

  let discount = 0;
  if (rawFormData.promoCode && rawFormData.promoCode.toString().toUpperCase() === 'DISCOUNT500') {
    discount = 500;
  }

  const finalTotal = Math.max(0, baseTotal - discount);

  // 2. Setup Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 3. Prepare Email Content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'maslamhussaini@gmail.com', // Your receiving email
    subject: `New Enrollment: ${rawFormData.name}`,
    html: `
      <h2>New Student Enrollment</h2>
      
      <h3>Personal Details</h3>
      <p><strong>Name:</strong> ${rawFormData.name}</p>
      <p><strong>Email:</strong> ${rawFormData.email || 'N/A'}</p>
      <p><strong>WhatsApp:</strong> ${rawFormData.whatsapp}</p>
      <p><strong>City:</strong> ${rawFormData.city}</p>
      <p><strong>Gender:</strong> ${rawFormData.gender}</p>

      <h3>Course Selection</h3>
      <p><strong>Courses:</strong> ${courseNames.join(', ')}</p>
      <p><strong>Promo Code:</strong> ${rawFormData.promoCode || 'None'} (${discount > 0 ? 'Applied' : 'N/A'})</p>
      <p><strong>Total Price Quoted:</strong> ${finalTotal} PKR</p>

      <h3>Additional Info</h3>
      <p><strong>Attendance Commitment:</strong> ${rawFormData.attendance}</p>
      <p><strong>Admission Manager:</strong> ${rawFormData.manager}</p>
      <p><strong>Number Saved:</strong> ${rawFormData.numberSaved}</p>
    `,
    attachments: [
      {
        filename: rawFormData.paymentScreenshot.name,
        content: Buffer.from(await rawFormData.paymentScreenshot.arrayBuffer()),
      },
    ],
  };

  // 4. Send Email
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, message: 'Failed to send email.' };
  }
}