# Environment Variables Required for Local Development

Create a `.env` file in your project root with the following variables:

## Required Environment Variables

### Database Configuration
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/century21canada"
```

### OpenAI Configuration
```bash
OPENAI_API_KEY="your-openai-api-key-here"
```

### Email Configuration (Resend)
```bash
RESEND_API_KEY="your-resend-api-key-here"
```

### MemberSpace Configuration
```bash
MEMBERSPACE_SITE_ID="empower21canada"
```

### Cloudinary Configuration (for image uploads)
```bash
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Next.js Configuration
```bash
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Environment
```bash
NODE_ENV="development"
```

## Optional Environment Variables

### Analytics/Tracking
```bash
GOOGLE_ANALYTICS_ID="your-ga-id"
FACEBOOK_PIXEL_ID="your-fb-pixel-id"
```

### External APIs
```bash
ZILLOW_API_KEY="your-zillow-api-key"
PROPBOT_API_KEY="your-propbot-api-key"
```

## How to Create Your .env File

1. **Copy the values from Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Copy each value

2. **Create the file:**
   ```bash
   # In your project root directory
   touch .env
   ```

3. **Add the variables:**
   ```bash
   # Example .env file content
   DATABASE_URL="postgresql://username:password@localhost:5432/century21canada"
   OPENAI_API_KEY="sk-..."
   RESEND_API_KEY="re_..."
   MEMBERSPACE_SITE_ID="empower21canada"
   # ... add all other variables
   ```

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Important Notes

- **Never commit your `.env` file** to version control
- The `.env` file should already be in your `.gitignore`
- Use different API keys for development vs production
- Some variables may have different values locally vs in Vercel

## Testing Your Configuration

After creating the `.env` file, you can test if the variables are loaded by:

1. Checking the console for any "missing environment variable" errors
2. Testing API endpoints that require these variables
3. Verifying that database connections work
4. Testing email functionality
