import { createUploadthing, type FileRouter } from "uploadthing/server";
import { TRPCError } from "@trpc/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const f = createUploadthing();

export const ourFileRouter = {
  profilePhoto: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      console.log("Upload middleware triggered");
      
      try {
        const session = await auth.api.getSession({
          headers: await headers(),
        });
        
        console.log("Session:", session);
        
        if (!session || !session.user?.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to upload files",
          });
        }
        
        return { userId: session.user.id };
      } catch (error) {
        console.error("Middleware error:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user:", metadata.userId);
      console.log("File details:", file);
      
      // Return both url and ufsUrl for compatibility
      return { 
        url: file.url, 
        ufsUrl: file.url,
        name: file.name,
        size: file.size
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;