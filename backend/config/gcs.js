import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Decode base64 key and write to /tmp/gcs-key.json on Render or similar platforms
if (process.env.GCS_KEY_BASE64) {
  const keyContent = Buffer.from(process.env.GCS_KEY_BASE64, 'base64').toString('utf8');
  const keyPath = path.join('/tmp', 'gcs-key.json');
  fs.writeFileSync(keyPath, keyContent);

  // Set the env variable for Google Cloud to pick up
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
}

// Now initialize GCS using that path
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const storage = new Storage({ keyFilename });

const bucketName = 'bhramann_storage';
const bucket = storage.bucket(bucketName);

export { storage, bucket };
