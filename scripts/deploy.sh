#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Pre-deployment checks
echo -e "${YELLOW}Running pre-deployment checks...${NC}"

# Check if all required environment variables are set
echo "Checking environment variables..."
required_vars=(
  "NEXT_PUBLIC_APP_URL"
  "DATABASE_URL"
  "NEXTAUTH_URL"
  "NEXTAUTH_SECRET"
  "GOOGLE_CLIENT_ID"
  "GOOGLE_CLIENT_SECRET"
  "REDIS_URL"
  "UPSTASH_REDIS_REST_URL"
  "UPSTASH_REDIS_REST_TOKEN"
  "NEXT_PUBLIC_SENTRY_DSN"
  "SENTRY_AUTH_TOKEN"
  "LOGROCKET_APP_ID"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo -e "${RED}Error: $var is not set${NC}"
    exit 1
  fi
done

# Run type checking
echo "Running TypeScript type checking..."
npm run type-check || {
  echo -e "${RED}Type checking failed${NC}"
  exit 1
}

# Run linting
echo "Running ESLint..."
npm run lint || {
  echo -e "${RED}Linting failed${NC}"
  exit 1
}

# Run tests
echo "Running tests..."
npm run test || {
  echo -e "${RED}Tests failed${NC}"
  exit 1
}

# Run build
echo "Building application..."
npm run build || {
  echo -e "${RED}Build failed${NC}"
  exit 1
}

# Run database migrations
echo "Running database migrations..."
npm run prisma:migrate || {
  echo -e "${RED}Database migrations failed${NC}"
  exit 1
}

# Check for security vulnerabilities
echo "Checking for security vulnerabilities..."
npm audit || {
  echo -e "${RED}Security vulnerabilities found${NC}"
  exit 1
}

# Deploy to production
echo -e "${YELLOW}Deploying to production...${NC}"

# Build and push Docker image
echo "Building and pushing Docker image..."
docker build -t your-app-name:latest .
docker push your-app-name:latest

# Deploy using your preferred method (e.g., Kubernetes, Vercel, etc.)
echo "Deploying application..."
# Add your deployment commands here

# Post-deployment checks
echo -e "${YELLOW}Running post-deployment checks...${NC}"

# Check if the application is healthy
echo "Checking application health..."
curl -f http://your-app-url/api/health || {
  echo -e "${RED}Health check failed${NC}"
  exit 1
}

# Run smoke tests
echo "Running smoke tests..."
npm run smoke-test || {
  echo -e "${RED}Smoke tests failed${NC}"
  exit 1
}

# Monitor error rates
echo "Monitoring error rates..."
# Add your error monitoring commands here

echo -e "${GREEN}Deployment completed successfully!${NC}" 