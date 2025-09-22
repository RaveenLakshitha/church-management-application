"use client";

// components/TestUpload.tsx
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const TestUpload = () => {
  return (
    <div>
      <h2>Test Upload</h2>
      <UploadDropzone<OurFileRouter, "profilePhoto">
        endpoint="profilePhoto"
        onDrop={(acceptedFiles) => {
          console.log("Files dropped:", acceptedFiles);
        }}
        onBeforeUploadBegin={(files) => {
          console.log("Before upload, files selected:", files);
          return files;
        }}
        onUploadBegin={() => {
          console.log("Upload started");
        }}
        onUploadProgress={(progress) => {
          console.log("Upload progress:", progress);
        }}
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
          alert(`Upload successful: ${res?.[0].url}`);
        }}
        onUploadError={(error) => {
          console.error("Upload error:", {
            message: error.message,
            cause: error.cause,
            stack: error.stack,
            name: error.name,
          });
          alert(`Upload failed: ${error.message}`);
        }}
        onUploadAborted={() => {
          console.log("Upload aborted");
          alert("Upload was aborted");
        }}
        content={{
          allowedContent: "PNG, JPG, JPEG, or GIF (Max 4MB)",
        }}
        config={{
          mode: "auto",
          appendOnPaste: true,
        }}
      />
    </div>
  );
};