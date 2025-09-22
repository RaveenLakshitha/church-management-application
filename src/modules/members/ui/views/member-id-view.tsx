"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, MapPin, Calendar, QrCode, Trash2, Phone, User, Home, CreditCard, Edit3, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { memberUpdateSchema } from "../../schemas";
import { MemberGetOne } from "../../types";
import { UpdateMemberDialog } from "../components/update-member-dialog";
import { InfoCard } from "../components/InfoCard";

interface Props {
  memberId: string;
}

export const MemberIdView = ({ memberId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const memberIdNumber = parseInt(memberId, 10);
  const { data: member } = useSuspenseQuery(
    trpc.members.getById.queryOptions({ id: memberIdNumber })
  );

  const removeMember = useMutation({
    ...trpc.members.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.members.getAll.queryOptions());
        router.push("/dashboard/members");
        toast.success("Member deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }),
  });

  if (!member) {
    return (
      <ErrorState
        title="Member Not Found"
        description="The requested member profile could not be found."
      />
    );
  }

  const getInitials = () => {
    const first = member.first_name?.[0] || "";
    const last = member.last_name?.[0] || "";
    return (first + last).toUpperCase() || "M";
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const initialValues: MemberGetOne = {
    id: member.id,
    member_id: member.member_id,
    first_name: member.first_name || "",
    middle_name: member.middle_name || "",
    last_name: member.last_name || "",
    email: member.email || "",
    mobile_number: member.mobile_number || "",
    gender: member.gender || "",
    birthday: member.birthday ? new Date(member.birthday).toISOString() : "",
    profile_photo: member.profile_photo || "",
    address: member.address || "",
    address_line_1: member.address_line_1 || "",
    address_line_2: member.address_line_2 || "",
    city: member.city || "",
    state: member.state || "",
    zip_code: member.zip_code || "",
    membership_status: member.membership_status || "active",
    qr_code: member.qr_code || "",
    created_at: member.created_at,
    updated_at: member.updated_at,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
        {/* Hero Profile Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-3xl" />
          <Card className="relative overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Avatar className="relative h-32 w-32 border-4 border-background shadow-2xl">
                    <AvatarImage src={member.profile_photo || undefined} alt="Profile" />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border-2 border-background">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        {[member.first_name, member.middle_name, member.last_name]
                          .filter(Boolean)
                          .join(" ") || "Member Profile"}
                      </h1>
                      <Badge 
                        variant={getStatusVariant(member.membership_status)}
                        className="px-4 py-1 text-sm font-semibold"
                      >
                        {member.membership_status}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground font-medium">
                      Member ID: #{member.member_id}
                    </p>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Mail className="h-5 w-5 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium truncate">{member.email || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium">{formatDate(member.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium truncate">{member.city || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-3">
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Edit3 className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="personal" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-background">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="membership" className="flex items-center gap-2 data-[state=active]:bg-background">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Membership</span>
              </TabsTrigger>
              <TabsTrigger value="additional" className="flex items-center gap-2 data-[state=active]:bg-background">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Additional</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <p className="font-medium">{member.first_name || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <p className="font-medium">{member.last_name || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Middle Name</label>
                    <p className="font-medium">{member.middle_name || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="font-medium">{member.gender || "Not specified"}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Birthday</label>
                    <p className="font-medium">{formatDate(member.birthday)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <InfoCard 
                  icon={Mail} 
                  label="Email Address" 
                  value={member.email || "Not provided"} 
                />
                <InfoCard 
                  icon={Phone} 
                  label="Mobile Number" 
                  value={member.mobile_number || "Not provided"} 
                />
              </div>
              <div className="space-y-6">
                <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5 text-primary" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                        <p className="font-medium">{member.address || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">Address Line 1</label>
                        <p className="font-medium">{member.address_line_1 || "Not provided"}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">Address Line 2</label>
                        <p className="font-medium">{member.address_line_2 || "Not provided"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-muted-foreground">City</label>
                          <p className="font-medium">{member.city || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-muted-foreground">State</label>
                          <p className="font-medium">{member.state || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">Zip Code</label>
                        <p className="font-medium">{member.zip_code || "Not provided"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Membership Details */}
          <TabsContent value="membership" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Membership Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Current Status</p>
                      <p className="text-xl font-bold">{member.membership_status}</p>
                    </div>
                    <Badge variant={getStatusVariant(member.membership_status)} className="px-4 py-2">
                      {member.membership_status}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">Registration date</p>
                      </div>
                      <p className="font-semibold">{formatDate(member.created_at)}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">Profile modification</p>
                      </div>
                      <p className="font-semibold">{formatDate(member.updated_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="overflow-hidden border-destructive/20 bg-destructive/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-destructive">Delete Member Account</p>
                          <p className="text-sm text-muted-foreground">
                            This action cannot be undone. This will permanently delete the member account and all associated data.
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => removeMember.mutate({ id: memberIdNumber })}
                          disabled={removeMember.isPending}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {removeMember.isPending ? "Deleting..." : "Delete Account"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Additional Information */}
          <TabsContent value="additional" className="space-y-6">
            <div className="max-w-2xl">
              <InfoCard 
                icon={QrCode} 
                label="QR Code" 
                value={member.qr_code || "Not provided"} 
                className="w-full"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Update Member Dialog */}
        <UpdateMemberDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export const MemberIdviewLoading = () => {
  return (
    <LoadingState
      title="Loading Member Profile"
      description="This may take a few seconds..."
    />
  );
};

export const MemberIDviewError = () => {
  return (
    <ErrorState
      title="Failed to Load Member Profile"
      description="Please try again later"
    />
  );
};