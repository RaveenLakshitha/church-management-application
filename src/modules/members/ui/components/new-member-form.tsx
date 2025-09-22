"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Paperclip } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { memberCreateSchema, memberUpdateSchema } from "../../schemas";
import { MemberGetOne } from "../../types";
import { generateReactHelpers } from "@uploadthing/react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface MemberFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: MemberGetOne;
}

export const MemberForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MemberFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload } = useUploadThing("profilePhoto", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        const fileUrl = res[0].url || res[0].ufsUrl || "";
        form.setValue("profile_photo", fileUrl);
        setIsUploading(false);
        setUploadProgress(100);
        toast.success("Profile photo uploaded successfully!");
      }
    },
    onUploadError: (error) => {
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
      toast.error(`Upload failed: ${error.message}`);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const createMember = useMutation({
    ...trpc.members.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.members.getAll.queryOptions()
        );
        onSuccess?.();
        toast.success("Member created successfully!");
        router.push("/dashboard/members");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  });

  const updateMember = useMutation({
    ...trpc.members.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.members.getAll.queryOptions()
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.members.getById.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
        toast.success("Member updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  });

  const isEdit = !!initialValues?.id;
  const form = useForm<z.infer<typeof memberCreateSchema>>({
    resolver: zodResolver(isEdit ? memberUpdateSchema : memberCreateSchema),
    defaultValues: initialValues
      ? {
          id: initialValues.id,
          member_id: initialValues.member_id || "",
          first_name: initialValues.first_name || "",
          middle_name: initialValues.middle_name || "",
          last_name: initialValues.last_name || "",
          email: initialValues.email || "",
          mobile_number: initialValues.mobile_number || "",
          gender: initialValues.gender || "",
          birthday: initialValues.birthday || "",
          profile_photo: initialValues.profile_photo || "",
          address: initialValues.address || "",
          address_line_1: initialValues.address_line_1 || "",
          address_line_2: initialValues.address_line_2 || "",
          city: initialValues.city || "",
          state: initialValues.state || "",
          zip_code: initialValues.zip_code || "",
          membership_status: initialValues.membership_status || "active",
          qr_code: initialValues.qr_code || "",
        }
      : {
          membership_status: "active",
          qr_code: "",
          profile_photo: undefined, // Use undefined for new members
        },
  });

  const isPending = createMember.isPending || isUploading || updateMember.isPending;

  const onSubmit = async (values: z.infer<typeof memberCreateSchema>) => {
    if (isEdit) {
      if (selectedFile) {
        setIsUploading(true);
        try {
          const res = await startUpload([selectedFile]);
          if (res && res.length > 0) {
            form.setValue("profile_photo", res[0].url || res[0].fileUrl || "");
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (error) {
          setIsUploading(false);
          toast.error("Failed to upload profile photo");
          return;
        }
      }
      const updatedValues = form.getValues();
      updateMember.mutate({ ...updatedValues, id: initialValues!.id });
    } else {
      if (selectedFile) {
        setIsUploading(true);
        try {
          const res = await startUpload([selectedFile]);
          if (res && res.length > 0) {
            form.setValue("profile_photo", res[0].url || res[0].fileUrl || "");
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (error) {
          setIsUploading(false);
          toast.error("Failed to upload profile photo");
          return;
        }
      } else {
        form.setValue("profile_photo", undefined); // Set to undefined if no photo
      }
      const updatedValues = form.getValues();
      createMember.mutate(updatedValues);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-sm border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="member_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Member ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter member ID"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter first name"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Middle Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter middle name"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter last name"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter mobile number"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-background text-foreground">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Birthday</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder="Select birthday"
                        className="bg-background text-foreground"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            field.onChange(new Date(value).toISOString());
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                        value={field.value ? field.value.slice(0, 16) : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profile_photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Profile Photo
                    </FormLabel>
                    <FormControl>
                      <div>
                        <UploadDropzone<OurFileRouter, "profilePhoto">
                          endpoint="profilePhoto"
                          config={{ mode: "manual" }}
                          onDrop={(acceptedFiles) => {
                            if (acceptedFiles.length > 0) {
                              setSelectedFile(acceptedFiles[0]);
                            } else {
                              setSelectedFile(null);
                            }
                          }}
                          onClientUploadComplete={(res) => {
                            if (res && res.length > 0) {
                              const fileUrl = res[0].url || res[0].fileUrl || "";
                              form.setValue("profile_photo", fileUrl);
                              setIsUploading(false);
                              setUploadProgress(100);
                              toast.success("Profile photo uploaded successfully!");
                            }
                          }}
                          onUploadError={(error) => {
                            setIsUploading(false);
                            setUploadProgress(0);
                            setSelectedFile(null);
                            toast.error(`Upload failed: ${error.message}`);
                          }}
                          onUploadProgress={(progress) => {
                            setUploadProgress(progress);
                          }}
                          content={{
                            allowedContent: "PNG, JPG, JPEG, or GIF (Max 4MB)",
                          }}
                        />
                        {selectedFile && !isUploading && (
                          <div className="mt-4 p-3 bg-muted rounded flex items-center gap-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Selected: {selectedFile.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                File ready to upload
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                form.setValue("profile_photo", "");
                                toast.info("Profile photo removed");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                        {isUploading && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Uploading... {uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {form.watch("profile_photo") && !isUploading && (
                          <div className="mt-4 p-3 bg-muted rounded flex items-center gap-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Uploaded successfully!
                              </p>
                            </div>
                            <img
                              src={form.watch("profile_photo")}
                              alt="Uploaded preview"
                              className="w-16 h-16 object-cover rounded"
                              onError={() => {
                                toast.error("Failed to load image preview");
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => {
                                form.setValue("profile_photo", "");
                                setSelectedFile(null);
                                toast.info("Profile photo removed");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a profile photo (PNG, JPG, JPEG, or GIF, max 4MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b pb-2">
              Address Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter full address"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address_line_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Address Line 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter address line 1"
                          className="bg-background text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address_line_2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Address Line 2
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter address line 2"
                          className="bg-background text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter city"
                          className="bg-background text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">State</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter state"
                          className="bg-background text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Zip Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter zip code"
                          className="bg-background text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b pb-2">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="qr_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">QR Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter QR code"
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Processing..." : isEdit ? "Update Member" : "Create Member"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};