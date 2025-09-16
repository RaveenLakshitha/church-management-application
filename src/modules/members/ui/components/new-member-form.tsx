"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { memberCreateSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface MemberFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: z.infer<typeof memberCreateSchema>;
}

export const MemberForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MemberFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMember = useMutation({
    ...trpc.members.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.members.getAll.queryOptions(),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.members.getById.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  });

  const form = useForm<z.infer<typeof memberCreateSchema>>({
    resolver: zodResolver(memberCreateSchema) as any,
    defaultValues: initialValues || {
      membership_status: "active",
    },
  });

  const isEdit = !!initialValues?.member_id;
  const isPending = createMember.isPending;

  const onSubmit = (values: z.infer<typeof memberCreateSchema>) => {
    if (isEdit) {
      console.log("TODO: UpdateMember");
    } else {
      createMember.mutate(values);
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
                name="member_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Member ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter member ID" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="membership_status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Membership Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-background text-foreground">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
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
                name="first_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter first name" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="middle_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter middle name" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="last_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter last name" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter email address" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="mobile_number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Mobile Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter mobile number" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Gender</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                name="profile_photo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Profile Photo URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter profile photo URL" className="bg-background text-foreground" />
                    </FormControl>
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
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter full address" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="address_line_1"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter address line 1" className="bg-background text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="address_line_2"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter address line 2" className="bg-background text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter city" className="bg-background text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter state" className="bg-background text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="zip_code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter zip code" className="bg-background text-foreground" />
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
                name="qr_code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">QR Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter QR code" className="bg-background text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="member_tags"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Member Tags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter tags as JSON array (e.g., ["tag1", "tag2"])'
                        className="bg-background text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="additional_info"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Additional Information</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter additional info as JSON (e.g., {"key": "value"})'
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
              <Button type="button" variant="outline" onClick={onCancel}>
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