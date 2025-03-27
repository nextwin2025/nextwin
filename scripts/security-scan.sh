#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Running security scan...${NC}"

# Check for exposed secrets
echo "Checking for exposed secrets..."
if git log -p | grep -i "password\|secret\|key\|token" > /dev/null; then
  echo -e "${RED}Warning: Potential secrets found in git history${NC}"
fi

# Run dependency security audit
echo "Running npm audit..."
npm audit || {
  echo -e "${RED}Security vulnerabilities found in dependencies${NC}"
  exit 1
}

# Run Snyk security scan
echo "Running Snyk security scan..."
if command -v snyk &> /dev/null; then
  snyk test || {
    echo -e "${RED}Snyk security scan failed${NC}"
    exit 1
  }
else
  echo -e "${YELLOW}Snyk not installed. Skipping Snyk scan.${NC}"
fi

# Check for outdated dependencies
echo "Checking for outdated dependencies..."
npm outdated || {
  echo -e "${RED}Outdated dependencies found${NC}"
  exit 1
}

# Run OWASP ZAP scan (if installed)
echo "Running OWASP ZAP scan..."
if command -v zap-cli &> /dev/null; then
  zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://localhost:3000 || {
    echo -e "${RED}OWASP ZAP scan failed${NC}"
    exit 1
  }
else
  echo -e "${YELLOW}OWASP ZAP not installed. Skipping ZAP scan.${NC}"
fi

# Check for common security headers
echo "Checking security headers..."
curl -sI http://localhost:3000 | grep -i "x-frame-options\|x-content-type-options\|x-xss-protection\|content-security-policy" || {
  echo -e "${RED}Missing security headers${NC}"
  exit 1
}

# Check for SSL/TLS configuration
echo "Checking SSL/TLS configuration..."
if command -v testssl &> /dev/null; then
  testssl https://your-app-url || {
    echo -e "${RED}SSL/TLS configuration issues found${NC}"
    exit 1
  }
else
  echo -e "${YELLOW}testssl not installed. Skipping SSL/TLS check.${NC}"
fi

# Check for exposed ports
echo "Checking for exposed ports..."
netstat -tuln | grep -E ":3000|:8080|:80|:443" || {
  echo -e "${RED}Unexpected ports exposed${NC}"
  exit 1
}

# Check for environment variables
echo "Checking environment variables..."
if [ -f .env ]; then
  echo -e "${RED}Warning: .env file found in repository${NC}"
  exit 1
fi

# Check for hardcoded credentials
echo "Checking for hardcoded credentials..."
grep -r "password\|secret\|key\|token" src/ || {
  echo -e "${RED}Potential hardcoded credentials found${NC}"
  exit 1
}

# Check for proper error handling
echo "Checking error handling..."
grep -r "catch (" src/ || {
  echo -e "${RED}Missing error handling${NC}"
  exit 1
}

# Check for proper input validation
echo "Checking input validation..."
grep -r "zod" src/ || {
  echo -e "${RED}Missing input validation${NC}"
  exit 1
}

echo -e "${GREEN}Security scan completed successfully!${NC}" 