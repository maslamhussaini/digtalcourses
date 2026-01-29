# Testing Guide for Digital Skills Registration App

This guide will help you verify the application's functionality and responsiveness.

## 1. Setup Environment
Before testing email functionality, you must configure your email credentials.

1.  Rename `.env.example` to `.env.local`:
    ```bash
    ren .env.example .env.local
    ```
2.  Open `.env.local` and fill in your Gmail credentials:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```
    *Note: If you use 2-Factor Authentication, you must generate an App Password in your Google Account settings.*

## 2. Run the Application
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3. Responsiveness Tests
| Device Type | Action | Expected Result |
| :--- | :--- | :--- |
| **Mobile** | Resize browser window width to ~375px (or use DevTools Mobile View). | - Form items should stack vertically.<br>- No horizontal scrolling.<br>- Text should be readable. |
| **Tablet** | Resize width to ~768px. | - The "Select Courses" section should switch to a 2-column grid.<br>- Layout remains centered. |
| **Desktop** | Maximize window. | - Content stays centered with a max-width.<br>- Layout is clean and balanced. |

## 4. Functionality Tests

### Price Calculation
1.  Select "Social Media Marketing" (5000 PKR).
2.  Select "Graphic Designing" (5000 PKR).
3.  **Verify**: Total Fee shows **10000 PKR**.
4.  Enter Promo Code `DISCOUNT500` and click "Apply".
5.  **Verify**: Total Fee updates to **9500 PKR**.

### Form Submission (Happy Path)
1.  Fill in all required fields (Name, Email, WhatsApp, City, Gender).
2.  Upload a dummy image for "Payment Screenshot".
3.  Select "Yes, Saved" for the footer question.
4.  Click "Submit Application".
5.  **Expected**: Alert says "Form submitted successfully!" and you receive an email with the details and attachment.

### Form Submission (Error Handling)
1.  Temporarily rename `.env.local` back to `.env.example` (or remove credentials).
2.  Try to submit the form.
3.  **Expected**: Alert says "Internal Server Error: Missing Configuration".
