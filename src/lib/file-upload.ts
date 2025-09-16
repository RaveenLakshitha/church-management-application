// app/lib/utils/file-upload.ts
import { promises as fs } from 'fs';
import path from 'path';
import { uuidv4 } from 'zod';

export async function uploadFile(file: File, folder: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(uploadDir, fileName);

  const arrayBuffer = await file.arrayBuffer();
  const fileSize = Buffer.byteLength(arrayBuffer);
  if (fileSize > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit');
  }

  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  return `/uploads/${folder}/${fileName}`;
}