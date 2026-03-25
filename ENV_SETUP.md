# Angaza Future International - Environment Configuration Guide

This guide provides all environment variables needed for local development and offline VS Code setup.

## Quick Start for Local Development

Copy the environment variables below into your `.env` file in the project root:

```bash
# ============================================================================
# NODE ENVIRONMENT & SERVER CONFIGURATION
# ============================================================================
NODE_ENV=development
PORT=3000

# ============================================================================
# AUTHENTICATION & OAUTH CONFIGURATION
# ============================================================================
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=angaza-dev
JWT_SECRET=dev-secret-key-change-in-production-12345
OWNER_OPEN_ID=dev-owner-id
OWNER_NAME=Angaza Future International

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
DATABASE_URL=mysql://root:password@localhost:3306/angaza_dev

# ============================================================================
# MANUS BUILT-IN SERVICES (LLM, Storage, Notifications, etc.)
# ============================================================================
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key-here
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-api-key-here
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# ============================================================================
# ANALYTICS CONFIGURATION
# ============================================================================
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# ============================================================================
# APPLICATION BRANDING & METADATA
# ============================================================================
VITE_APP_TITLE=Angaza Future International
VITE_APP_LOGO=/logo.svg

# ============================================================================
# EMAIL & NOTIFICATIONS
# ============================================================================
ORGANIZATION_EMAIL=info@angazafuture.org

# ============================================================================
# PAYMENT INTEGRATION (Optional)
# ============================================================================
STRIPE_SECRET_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# ============================================================================
# STORAGE CONFIGURATION (AWS S3)
# ============================================================================
AWS_S3_BUCKET=angaza-storage
AWS_S3_REGION=us-east-1

# ============================================================================
# DEVELOPMENT & DEBUG OPTIONS
# ============================================================================
DEBUG=false
CORS_ORIGIN=http://localhost:3000
```

## Detailed Environment Variables Reference

### NODE ENVIRONMENT & SERVER CONFIGURATION

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `NODE_ENV` | Application environment mode | `development` | Use `development` for local, `production` for deployment |
| `PORT` | Server port for local development | `3000` | Change if port 3000 is already in use |

### AUTHENTICATION & OAUTH CONFIGURATION

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `OAUTH_SERVER_URL` | Manus OAuth server endpoint | `https://api.manus.im` | Backend OAuth provider |
| `VITE_OAUTH_PORTAL_URL` | Manus OAuth login portal | `https://portal.manus.im` | Frontend login redirect URL |
| `VITE_APP_ID` | OAuth application identifier | `angaza-dev` | Register at Manus OAuth portal |
| `JWT_SECRET` | Session cookie signing secret | `dev-secret-key-...` | Use strong random string in production |
| `OWNER_OPEN_ID` | Organization owner's unique ID | `dev-owner-id` | From Manus OAuth registration |
| `OWNER_NAME` | Organization owner's display name | `Angaza Future International` | Used in notifications and admin features |

### DATABASE CONFIGURATION

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `DATABASE_URL` | MySQL/TiDB connection string | `mysql://root:password@localhost:3306/angaza_dev` | Format: `mysql://user:pass@host:port/database` |

**Local MySQL Setup:**
```bash
# Install MySQL (macOS)
brew install mysql

# Start MySQL
mysql.server start

# Create database
mysql -u root -p
CREATE DATABASE angaza_dev;

# Run migrations
pnpm db:push
```

### MANUS BUILT-IN SERVICES

These services enable AI, storage, notifications, and data access:

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `BUILT_IN_FORGE_API_URL` | Manus Forge API endpoint | `https://api.manus.im` | Used for LLM, storage, notifications |
| `BUILT_IN_FORGE_API_KEY` | Server-side API key | `your-api-key-here` | Keep secret! Used server-side only |
| `VITE_FRONTEND_FORGE_API_KEY` | Client-side API key | `your-frontend-key-here` | Limited permissions for frontend |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend API endpoint | `https://api.manus.im` | Same as BUILT_IN_FORGE_API_URL usually |

**Features Enabled:**
- Image generation (for blog posts, gallery)
- Voice transcription (for audio content)
- LLM/AI features (for content generation)
- File storage (S3 for images, documents)
- Email notifications (contact form, admin alerts)
- Data API access (for external data sources)

### ANALYTICS CONFIGURATION

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `VITE_ANALYTICS_ENDPOINT` | Analytics service endpoint | `https://analytics.example.com` | Leave empty if not using analytics |
| `VITE_ANALYTICS_WEBSITE_ID` | Website tracking ID | `abc123def456` | Leave empty if not using analytics |

### APPLICATION BRANDING & METADATA

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `VITE_APP_TITLE` | Browser tab title | `Angaza Future International` | Displayed in browser and navbar |
| `VITE_APP_LOGO` | Logo URL | `/logo.svg` | CDN URL or local path |

### EMAIL & NOTIFICATIONS

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `ORGANIZATION_EMAIL` | Primary contact email | `info@angazafuture.org` | Contact form submissions sent here |

### PAYMENT INTEGRATION (Optional)

For Stripe payment processing (future feature):

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` | Leave empty if not using Stripe |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` | Leave empty if not using Stripe |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` | Leave empty if not using Stripe |

### STORAGE CONFIGURATION

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `AWS_S3_BUCKET` | S3 bucket name | `angaza-storage` | Manus provides this in production |
| `AWS_S3_REGION` | AWS region | `us-east-1` | Default region for S3 |

### DEVELOPMENT & DEBUG OPTIONS

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `DEBUG` | Enable debug logging | `false` | Set to `true` for verbose logs |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` | For local development only |

## Local Development Setup Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up Database
```bash
# Install MySQL (if not already installed)
brew install mysql  # macOS
# or
sudo apt-get install mysql-server  # Linux

# Start MySQL
mysql.server start

# Create database and run migrations
pnpm db:push
```

### 3. Create .env File
Copy the environment variables from the "Quick Start" section above into a `.env` file in the project root.

### 4. Start Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Offline Mode

Most features work offline except:
- **OAuth Login** - Requires OAUTH_SERVER_URL and VITE_OAUTH_PORTAL_URL
- **Contact Form Notifications** - Requires BUILT_IN_FORGE_API_KEY
- **Image Uploads** - Requires S3 configuration
- **LLM Features** - Requires BUILT_IN_FORGE_API_KEY
- **Email Notifications** - Requires BUILT_IN_FORGE_API_KEY

## Getting Manus API Keys

1. Register at [Manus Dashboard](https://manus.im)
2. Create an application
3. Copy your `VITE_APP_ID`
4. Generate API keys for `BUILT_IN_FORGE_API_KEY` and `VITE_FRONTEND_FORGE_API_KEY`
5. Get OAuth credentials for `OAUTH_SERVER_URL` and `VITE_OAUTH_PORTAL_URL`

## Project Features & Their Environment Dependencies

| Feature | Required Variables | Optional Variables |
|---------|-------------------|-------------------|
| **Admin Dashboard** | `JWT_SECRET`, `OWNER_OPEN_ID`, `DATABASE_URL` | - |
| **Contact Form** | `BUILT_IN_FORGE_API_KEY`, `ORGANIZATION_EMAIL` | - |
| **Blog Posts** | `DATABASE_URL` | `BUILT_IN_FORGE_API_KEY` (for image generation) |
| **Image Upload** | `BUILT_IN_FORGE_API_KEY`, `AWS_S3_BUCKET` | - |
| **Authentication** | `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `VITE_APP_ID` | - |
| **Notifications** | `BUILT_IN_FORGE_API_KEY` | - |
| **Analytics** | - | `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` |
| **Payments** | - | `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY` |

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running: `mysql.server status`
- Check DATABASE_URL format and credentials
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### OAuth Login Not Working
- Verify OAUTH_SERVER_URL and VITE_OAUTH_PORTAL_URL are correct
- Check VITE_APP_ID matches registered application
- Ensure JWT_SECRET is set

### Contact Form Not Sending
- Check BUILT_IN_FORGE_API_KEY is valid
- Verify ORGANIZATION_EMAIL is correct
- Check server logs for error messages

### Image Upload Failing
- Ensure BUILT_IN_FORGE_API_KEY is set
- Check AWS_S3_BUCKET configuration
- Verify file size is under 5MB

## Production Deployment

When deploying to production:
1. Use strong, random values for `JWT_SECRET`
2. Set `NODE_ENV=production`
3. Use production Manus API endpoints
4. Configure real database with backups
5. Enable analytics and monitoring
6. Set up proper error logging
7. Use environment-specific secrets management

## Support

For issues or questions:
- Email: info@angazafuture.org
- Check project documentation
- Review Manus API documentation
