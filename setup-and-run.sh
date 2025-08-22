#!/bin/bash

# NextJS Template App - Setup & Run Script
# This script will set up the environment and start the development server

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print header
echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                   NextJS Template App                        ║"
echo "║                    Setup & Run Script                        ║"
echo "║                                                              ║"
echo "║  This script will:                                           ║"
echo "║  • Check prerequisites                                       ║"
echo "║  • Install dependencies                                      ║"
echo "║  • Set up environment variables                              ║"
echo "║  • Initialize and seed the database                          ║"
echo "║  • Start the development server                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo

# Step 1: Check Prerequisites
print_step "Checking prerequisites..."

# Check for Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
    
    # Check if Node version is 18.17 or higher
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    NODE_MINOR=$(echo $NODE_VERSION | cut -d'.' -f2)
    
    if [ "$NODE_MAJOR" -lt 18 ] || ([ "$NODE_MAJOR" -eq 18 ] && [ "$NODE_MINOR" -lt 17 ]); then
        print_warning "Node.js version 18.17+ is recommended. Current: $NODE_VERSION"
    fi
else
    print_error "Node.js is not installed. Please install Node.js 18.17+ from https://nodejs.org/"
    exit 1
fi

# Check for npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_success "npm found: v$NPM_VERSION"
else
    print_error "npm is not installed. Please install npm."
    exit 1
fi

# Check for git
if command_exists git; then
    GIT_VERSION=$(git --version)
    print_success "Git found: $GIT_VERSION"
else
    print_warning "Git is not installed. Some features may not work properly."
fi

echo

# Step 2: Install Dependencies
print_step "Installing dependencies..."
print_info "This may take a few minutes..."

if npm install; then
    print_success "Dependencies installed successfully!"
else
    print_error "Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo

# Step 3: Environment Setup
print_step "Setting up environment variables..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file from .env.example"
        print_warning "Please update the .env file with your actual configuration:"
        print_info "  • SMTP settings for email functionality"
        print_info "  • NEXTAUTH_SECRET for production"
        print_info "  • Database URL if using a different database"
        echo
        print_info "For now, using default development settings..."
    else
        print_error ".env.example file not found. Cannot create environment file."
        exit 1
    fi
else
    print_success "Environment file (.env) already exists"
fi

echo

# Step 4: Database Setup
print_step "Setting up database..."

# Generate Prisma client
print_info "Generating Prisma client..."
if npm run db:generate; then
    print_success "Prisma client generated successfully!"
else
    print_error "Failed to generate Prisma client."
    exit 1
fi

# Run database migrations
print_info "Running database migrations..."
if npm run db:migrate; then
    print_success "Database migrations completed!"
else
    print_error "Failed to run database migrations."
    exit 1
fi

# Seed the database
print_info "Seeding database with sample data..."
if npm run db:seed; then
    print_success "Database seeded successfully!"
    print_info "Sample data includes:"
    print_info "  • 3 test users (admin, manager, analyst)"
    print_info "  • 50 sample MyData records"
    print_info "  • Sample file uploads"
else
    print_error "Failed to seed database."
    exit 1
fi

echo

# Step 5: Final Setup Check
print_step "Verifying setup..."

# Check if all required files exist
REQUIRED_FILES=("package.json" "next.config.js" "prisma/schema.prisma" ".env")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file exists"
    else
        print_error "$file is missing"
        exit 1
    fi
done

echo

# Step 6: Display Setup Information
print_step "Setup Information"
echo -e "${CYAN}"
echo "🎉 Setup completed successfully!"
echo
echo "📊 Test Accounts:"
echo "  • Admin:   username: admin   | password: password123 | role: ROLE1"
echo "  • Manager: username: manager | password: password123 | role: ROLE2" 
echo "  • Analyst: username: analyst | password: password123 | role: ROLE3"
echo
echo "🔗 Useful URLs (once server starts):"
echo "  • Application:     http://localhost:3000"
echo "  • API Reference:   http://localhost:3000/docs/api-reference"
echo "  • Prisma Studio:   Run 'npm run db:studio' in another terminal"
echo
echo "📝 Available Scripts:"
echo "  • npm run dev      - Start development server"
echo "  • npm run build    - Build for production"
echo "  • npm run db:studio - Open Prisma Studio"
echo "  • npm run db:seed  - Reseed database"
echo "  • npm run db:reset - Reset database"
echo -e "${NC}"

# Step 7: Start Development Server
echo
print_step "Starting development server..."
print_info "The server will start on http://localhost:3000"
print_info "Press Ctrl+C to stop the server"
echo
print_success "🚀 Launching NextJS Template App..."

# Wait a moment for user to read
sleep 2

# Start the development server
npm run dev

