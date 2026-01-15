# Admin Login Credentials & Troubleshooting

## 🔑 Default Login Credentials

Use these credentials to log in to the admin panel at `/login`:

- **Username**: `admin`
- **Password**: `admin123`

> [!IMPORTANT]
> After your first login, please change the default password immediately using the "Change Password" feature in the admin panel.

## 🔍 Troubleshooting Login Issues

### Issue: Login redirects back to login page without error

**Symptoms:**
- URL changes to `/login?callbackUrl=...`
- No error message is displayed
- Page just reloads

![Login Issue](C:/Users/nguye/.gemini/antigravity/brain/d886a4f4-55ae-4f52-9b87-1f36c5b8c67b/uploaded_image_1768487982963.png)

**Possible Causes & Solutions:**

#### 1. Wrong Password
✅ **Make sure you're using**: `admin123` (not `admin` or other passwords)

#### 2. Missing Environment Variables in Vercel
Check that you've added these to Vercel:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

See [`vercel-env-setup.md`](file:///d:/WG%20Website/vercel-env-setup.md) for instructions.

#### 3. Check Deployment Logs

**How to check logs in Vercel:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Deployments** tab
4. Click on the latest deployment
5. Click **"Functions"** or **"Runtime Logs"**
6. Look for `[AUTH]` and `[USERS]` log messages

**What to look for:**
```
[AUTH] Login attempt: { username: 'admin' }
[USERS] Verifying password for: admin
[USERS] User found, comparing password hash
[USERS] Password comparison result: true/false
[AUTH] Password verification result: true/false
```

If you see `false`, the password is incorrect.

#### 4. Try These Steps

1. **Clear browser cache and cookies**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Clear cookies and cached data
   - Try logging in again

2. **Use incognito/private browsing mode**
   - This eliminates cookie/cache issues

3. **Double-check the password**
   - Type it in a text editor first to make sure: `admin123`
   - Then copy and paste it into the password field

4. **Check the Vercel logs** (see step 3 above)
   - This will tell you exactly why login is failing

## 🔧 How Login Works

1. You enter username and password
2. NextAuth calls the `authorize` function in [`auth.ts`](file:///d:/WG%20Website/auth.ts)
3. It loads `data/users.json` and compares the password hash
4. If match: creates session and redirects to `/admin`
5. If no match: redirects back to `/login` with callback URL

## 📝 Changing the Password

After logging in successfully:

1. Go to `/admin`
2. Click on "Change Password" or go to `/admin/settings` (if available)
3. Enter current password: `admin123`
4. Enter new password
5. Save changes

## 🆘 Still Having Issues?

If you still can't log in:

1. Check Vercel deployment logs (see instructions above)
2. Verify environment variables are set correctly
3. Make sure the deployment completed successfully
4. Try redeploying in Vercel

The enhanced logging added to the code will help identify exactly where the authentication is failing.
