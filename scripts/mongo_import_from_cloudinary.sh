#!/bin/bash
source ../.env.local

# Declare variables
CLOUDINARY_SOURCE_FOLDER="up-rugby-mongo-backup"
# BACKUP_FOLDERNAME is available in cloudinary -> zip file name you wish to import
BACKUP_FOLDERNAME="mongo-backup-2023-10-11-14-43"
FILENAME_ZIP="$BACKUP_FOLDERNAME.zip"
# BACKUP_SECURE_URL_VERSION is available in cloudinary -> select zip file -> original URL -> vXXXXXX
SECURE_URL="https://res.cloudinary.com/$CLOUDINARY_NAME/raw/upload/$BACKUP_SECURE_URL_VERSION/$CLOUDINARY_SOURCE_FOLDER/$FILENAME_ZIP"

echo "$SECURE_URL"
echo "Download back up from cloudinary"
curl -o "$FILENAME_ZIP" "$SECURE_URL"

sleep 1

unzip "$FILENAME_ZIP" -d "./$BACKUP_FOLDERNAME"

# Import the whole DB
mongorestore --uri "$IMPORT_MONGODB_URI" "$BACKUP_FOLDERNAME"

echo "Remove files from current folder"
rm -rf "$FILENAME_ZIP" "$BACKUP_FOLDERNAME"