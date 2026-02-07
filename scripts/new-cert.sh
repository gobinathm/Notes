#!/bin/bash

# =============================================================================
# New Certification Setup Script
# Creates a new certification folder with all template files
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TEMPLATES_DIR="$PROJECT_ROOT/.templates"
CERTS_DIR="$PROJECT_ROOT/certifications"

# Function to print colored output
print_info() { echo -e "${BLUE}ℹ${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

# Function to show usage
show_usage() {
    echo ""
    echo "Usage: $0 <provider> <exam-code> <certification-name>"
    echo ""
    echo "Arguments:"
    echo "  provider           Provider folder name (e.g., aws, github, google-cloud, microsoft)"
    echo "  exam-code          Exam code folder name (e.g., saa-c03, az-900, gh-200)"
    echo "  certification-name Full certification name in quotes"
    echo ""
    echo "Examples:"
    echo "  $0 aws saa-c03 \"AWS Solutions Architect Associate\""
    echo "  $0 microsoft az-900 \"Azure Fundamentals\""
    echo "  $0 google-cloud ace \"Associate Cloud Engineer\""
    echo ""
    exit 1
}

# Check arguments
if [ $# -lt 3 ]; then
    print_error "Missing required arguments"
    show_usage
fi

PROVIDER="$1"
EXAM_CODE="$2"
CERT_NAME="$3"

# Derive values
EXAM_CODE_UPPER=$(echo "$EXAM_CODE" | tr '[:lower:]' '[:upper:]')
EXAM_CODE_LOWER=$(echo "$EXAM_CODE" | tr '[:upper:]' '[:lower:]')
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_MONTH_YEAR=$(date +"%B %Y")

# Target directory
TARGET_DIR="$CERTS_DIR/$PROVIDER/$EXAM_CODE_LOWER"

echo ""
echo "=============================================="
echo "  New Certification Setup"
echo "=============================================="
echo ""
print_info "Provider:          $PROVIDER"
print_info "Exam Code:         $EXAM_CODE_UPPER"
print_info "Certification:     $CERT_NAME"
print_info "Target Directory:  $TARGET_DIR"
echo ""

# Check if templates directory exists
if [ ! -d "$TEMPLATES_DIR" ]; then
    print_error "Templates directory not found: $TEMPLATES_DIR"
    exit 1
fi

# Check if target already exists
if [ -d "$TARGET_DIR" ]; then
    print_warning "Directory already exists: $TARGET_DIR"
    read -p "Overwrite existing files? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Aborted."
        exit 0
    fi
fi

# Create directory
print_info "Creating directory structure..."
mkdir -p "$TARGET_DIR"
print_success "Created: $TARGET_DIR"

# Copy template files
print_info "Copying template files..."

cp "$TEMPLATES_DIR/index-template.md" "$TARGET_DIR/index.md"
print_success "Created: index.md"

cp "$TEMPLATES_DIR/domain-template.md" "$TARGET_DIR/domain-1.md"
print_success "Created: domain-1.md"

cp "$TEMPLATES_DIR/exam-guide-template.md" "$TARGET_DIR/exam-guide.md"
print_success "Created: exam-guide.md"

cp "$TEMPLATES_DIR/cheatsheet-template.md" "$TARGET_DIR/cheatsheet.md"
print_success "Created: cheatsheet.md"

cp "$TEMPLATES_DIR/exam-tips-template.md" "$TARGET_DIR/exam-tips.md"
print_success "Created: exam-tips.md"

# Replace common placeholders
print_info "Replacing placeholders..."

# Function to replace in all files
replace_in_files() {
    local search="$1"
    local replace="$2"
    for file in "$TARGET_DIR"/*.md; do
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|$search|$replace|g" "$file"
        else
            # Linux
            sed -i "s|$search|$replace|g" "$file"
        fi
    done
}

replace_in_files '\[CERT-CODE\]' "$EXAM_CODE_UPPER"
replace_in_files '\[cert-code\]' "$EXAM_CODE_LOWER"
replace_in_files '\[Certification Name\]' "$CERT_NAME"
replace_in_files '\[Provider Name\]' "$PROVIDER"
replace_in_files '\[YYYY-MM-DD\]' "$CURRENT_DATE"
replace_in_files '\[Month Year\]' "$CURRENT_MONTH_YEAR"

print_success "Placeholders replaced"

echo ""
echo "=============================================="
print_success "Certification created successfully!"
echo "=============================================="
echo ""
echo "Next steps:"
echo ""
echo "  1. Edit the files in: $TARGET_DIR"
echo "     - index.md         (exam info, objectives, overview)"
echo "     - domain-1.md      (study content for first domain)"
echo "     - exam-guide.md    (traps and decision trees)"
echo "     - cheatsheet.md    (one-page exam day reference)"
echo "     - exam-tips.md     (strategic study advice)"
echo ""
echo "  2. Update .vitepress/config.mts:"
echo "     - Add to nav dropdown"
echo "     - Add to sidebar"
echo ""
echo "  3. Update certifications/index.md"
echo ""
echo "  4. Update index.md (home page)"
echo ""
echo "  5. Run: npm run docs:dev"
echo ""
print_info "See ADDING_CERTIFICATIONS.md for detailed instructions"
echo ""
