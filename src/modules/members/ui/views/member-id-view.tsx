"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Tag, 
  QrCode, 
  Info, 
  Camera, 
  Trash2 
} from "lucide-react";

interface Props {
  memberId: string;
}

export const MemberIdView = ({ memberId }: Props) => {
  const trpc = useTRPC();
  const memberIdNumber = parseInt(memberId, 10);
  const { data: member } = useSuspenseQuery(
    trpc.members.getById.queryOptions({ id: memberIdNumber })
  );

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

  const formatAddress = () => {
    const parts = [
      member.address,
      member.address_line_1,
      member.address_line_2,
      member.city,
      member.state,
      member.zip_code,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  return (
    <div className="flex-1 py-4 px-4 md:px-8 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={member.profile_photo || undefined} alt="Profile" />
                <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
              >
                <Camera />
              </Button>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <h1 className="text-2xl font-bold">
                  {[member.first_name, member.middle_name, member.last_name]
                    .filter(Boolean)
                    .join(" ") || "Member Profile"}
                </h1>
                <Badge variant={getStatusVariant(member.membership_status)}>
                  {member.membership_status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Member ID: {member.member_id}</p>
              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {member.email || "Not provided"}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {formatAddress()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Joined {formatDate(member.created_at)}
                </div>
              </div>
            </div>
            <Button variant="default">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={member.first_name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={member.last_name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input id="middleName" defaultValue={member.middle_name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" defaultValue={member.gender || "Not specified"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input id="birthday" defaultValue={formatDate(member.birthday)} />
                </div>
              </div>
              <Button variant="default">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Email, phone, and address details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={member.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input id="mobileNumber" defaultValue={member.mobile_number || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue={member.address || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input id="addressLine1" defaultValue={member.address_line_1 || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input id="addressLine2" defaultValue={member.address_line_2 || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={member.city || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue={member.state || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" defaultValue={member.zip_code || ""} />
                </div>
              </div>
              <Button variant="default">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Membership Details */}
        <TabsContent value="membership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membership Details</CardTitle>
              <CardDescription>Membership status and related information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Status</Label>
                  <p className="text-muted-foreground text-sm">
                    {member.membership_status}
                  </p>
                </div>
                <Badge variant={getStatusVariant(member.membership_status)}>
                  {member.membership_status}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Member Since</Label>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(member.created_at)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Last Updated</Label>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(member.updated_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Delete Account</Label>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete this member account and all data
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Information */}
        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Tags, QR code, and other supplementary data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {member.member_tags && (
                <div className="space-y-2">
                  <Label className="text-base flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>Tags</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(member.member_tags) 
                      ? member.member_tags.map((tag: any, index: number) => (
                          <Badge key={index} variant="outline">
                            {typeof tag === 'string' ? tag : JSON.stringify(tag)}
                          </Badge>
                        ))
                      : <Badge variant="outline">{JSON.stringify(member.member_tags)}</Badge>
                    }
                  </div>
                </div>
              )}
              {member.qr_code && (
                <div className="space-y-2">
                  <Label className="text-base flex items-center space-x-1">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code</span>
                  </Label>
                  <Input id="qrCode" defaultValue={member.qr_code} readOnly />
                </div>
              )}
              {member.additional_info && (
                <div className="space-y-2">
                  <Label className="text-base">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    defaultValue={JSON.stringify(member.additional_info, null, 2)}
                    rows={6}
                    readOnly
                  />
                </div>
              )}
              <Button variant="default">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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