import { Storage } from '@google-cloud/storage';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Path to your service account key file
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'gcs-key.json');

const storage = new Storage({ keyFilename });
const bucketName = 'bhramann_storage';
const bucket = storage.bucket(bucketName);

export { storage, bucket }; 