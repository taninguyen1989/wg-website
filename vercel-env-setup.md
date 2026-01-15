# Vercel Environment Variables Setup Guide

## 🔍 Problem

Your website is showing a **"Server error - There is a problem with the server configuration"** when trying to log in because the required environment variables are not set in Vercel.

![Login Error](C:/Users/nguye/.gemini/antigravity/brain/d886a4f4-55ae-4f52-9b87-1f36c5b8c67b/uploaded_image_1768486671649.png)

## ✅ Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Log in to your account
3. Find and click on your project: **wg-website**

### Step 2: Navigate to Environment Variables

1. Click on **Settings** tab (top navigation)
2. Click on **Environment Variables** in the left sidebar

### Step 3: Add Required Variables

Add the following environment variables one by one. Click **"Add New"** for each:

#### Variable 1: NEXTAUTH_SECRET

- **Name**: `NEXTAUTH_SECRET`
- **Value**: `hpqxRbrr40pZvENWaTWCKg70L5gpGtLCcDTD4z0X+54=`
- **Environment**: Select all (Production, Preview, Development)

> [!IMPORTANT]
> This is a secure random string I generated for you. Keep it secret!

#### Variable 2: NEXTAUTH_URL

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-production-domain.vercel.app`
  
  ⚠️ **Replace with your actual Vercel domain!** 
  
  Find it in your Vercel project dashboard (e.g., `https://wg-website-git-main-scott-nguyens-projects-e566d7f8.vercel.app`)

- **Environment**: Production only

#### Variable 3: RESEND_API_KEY (if using contact form)

- **Name**: `RESEND_API_KEY`
- **Value**: Your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)
- **Environment**: Select all

#### Variable 4: SALES_EMAIL

- **Name**: `SALES_EMAIL`
- **Value**: `tani.nguyen1989@gmail.com`
- **Environment**: Select all

### Step 4: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **"Redeploy"**

**OR** Vercel may automatically trigger a new deployment when you save environment variables.

### Step 5: Verify

After deployment completes (~2-3 minutes):

1. Visit your production URL
2. Navigate to `/login`
3. Try logging in with your credentials
4. You should now successfully log in! ✅

## 📋 Complete Environment Variables Checklist

Make sure you have all these set in Vercel:

- [ ] `NEXTAUTH_SECRET` = `hpqxRbrr40pZvENWaTWCKg70L5gpGtLCcDTD4z0X+54=`
- [ ] `NEXTAUTH_URL` = Your production URL
- [ ] `RESEND_API_KEY` = Your Resend API key (for contact form emails)
- [ ] `SALES_EMAIL` = `tani.nguyen1989@gmail.com`

## 🔧 Troubleshooting

### If login still doesn't work:

1. **Check the deployment logs** in Vercel:
   - Go to Deployments → Click on latest deployment → View Function Logs
   - Look for any error messages

2. **Verify environment variables** are set:
   - Settings → Environment Variables
   - Make sure all variables are showing

3. **Clear your browser cache** and try again

4. **Check your production URL** is correct in `NEXTAUTH_URL`

## 📝 Visual Guide

**Where to find your domain:**
- In Vercel Dashboard → Your Project → Domains section
- Copy the domain shown there (should look like `your-project.vercel.app`)

**Setting environment variables:**
```
Settings → Environment Variables → Add New
↓
Enter: Name = NEXTAUTH_SECRET
Enter: Value = hpqxRbrr40pZvENWaTWCKg70L5gpGtLCcDTD4z0X+54=
Select: ✓ Production ✓ Preview ✓ Development
Click: Save
```

Repeat for each variable!

---

> [!NOTE]
> After adding these environment variables, your login should work properly. The authentication system needs these to encrypt session tokens and verify users.
