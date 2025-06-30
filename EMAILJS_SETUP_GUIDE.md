# EmailJS Setup Guide for StepStyle Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" 
4. Click "Connect Account" and login with: **stepstyle2052025@gmail.com**
5. Give it a Service ID (e.g., "stepstyle_gmail")
6. Click "Create Service"

## Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template:

**Template Name:** StepStyle Contact Form
**Template ID:** stepstyle_contact

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
Hello StepStyle Team,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the StepStyle website contact form.
```

4. Click "Save"

## Step 4: Get Your Keys
1. Go to "Account" → "General"
2. Copy your **Public Key**
3. Go to "Email Services" and copy your **Service ID**
4. Go to "Email Templates" and copy your **Template ID**

## Step 5: Update the Code
Replace these values in `Frontend/src/js/about.js`:

```javascript
// Line 24: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");

// Line 376: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID  
emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', templateParams)
```

## Step 6: Test
1. Open your about page
2. Fill out the contact form
3. Submit it
4. Check your Gmail inbox: **stepstyle2052025@gmail.com**

## Free Plan Limits
- 200 emails per month
- Perfect for a small business website

## Security Note
The public key is safe to use in frontend code - it's designed for client-side use.

---

**Need Help?** 
- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact: stepstyle2052025@gmail.com
