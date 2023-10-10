#!/bin/bash
source ../.env.local

# Declare variables
DATE_HOUR=$(date +"%Y-%m-%d-%H:%M")
FOLDERNAME="mongo-backup-$DATE_HOUR"
FILENAME_ZIP="$FOLDERNAME.zip"
CLOUDINARY_DESTINATION_FOLDER="up-rugby-mongo-backup"

# Export the whole DB
echo "Export the whole DB"
mongodump --uri "$MONGODB_URI" -o "./$FOLDERNAME"

cd "./$FOLDERNAME/up-rugby"
zip "../../$FILENAME_ZIP" *.json *.bson
cd ../..

# Creation temporary env variable
export CLOUDINARY_URL="$CLOUDINARY_URL"

echo "Upload back up to cloudinary"
cld uploader upload "$FILENAME_ZIP" public_id="$FOLDERNAME" folder="$CLOUDINARY_DESTINATION_FOLDER"

sleep 1

echo "Remove files from current folder"
rm -rf "$FILENAME_ZIP" "$FOLDERNAME"
