#!/bin/bash
# Script to check if the site is deployed correctly

# Define the URLs to check
MAIN_URL="https://nucahome.me"
BUILD_URL="https://nucahome.me/build/index.html"
INDEX_URL="https://nucahome.me/index.html"

echo "Checking site deployment status..."
echo "--------------------------------"

# Check main URL
echo "Checking $MAIN_URL"
if curl -s --head "$MAIN_URL" | grep "200 OK" > /dev/null; then
    echo "✅ Main URL is working!"
else
    echo "❌ Main URL is not working"
fi

# Check build URL
echo "Checking $BUILD_URL"
if curl -s --head "$BUILD_URL" | grep "200 OK" > /dev/null; then
    echo "✅ Build URL is working"
else
    echo "❌ Build URL is not working (expected if site is deployed correctly to root)"
fi

# Check index URL
echo "Checking $INDEX_URL"
if curl -s --head "$INDEX_URL" | grep "200 OK" > /dev/null; then
    echo "✅ Index URL is working"
else
    echo "❌ Index URL is not working"
fi

echo "--------------------------------"
echo "Deployment check complete"
