import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

// Decode base64 key and write to a temp file
if (process.env.GCS_KEY_BASE64) {
  const keyContent = Buffer.from(process.env.GCS_KEY_BASE64, 'base64').toString('utf8');
  const keyPath = path.join(os.tmpdir(), 'gcs-key.json');
  fs.writeFileSync(keyPath, keyContent);

  // Set the path so GCP SDK picks it up
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
}

// Initialize Google Cloud Storage
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const storage = new Storage({ keyFilename });

const bucketName = 'bhramann_storage';
const bucket = storage.bucket(bucketName);

export { storage, bucket };
