-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('CHURCH_OWNER', 'CHURCH_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST');

-- CreateEnum
CREATE TYPE "public"."InvitationStatus" AS ENUM ('ACCEPTED', 'REVOKED', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('price_10MhuQIld5Bk5htqogZXP2e', 'price_10MhtcIldSBk5htqx5CvFSmj');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'SUBACCOUNT_USER',
    "churchId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Permissions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subAccountId" TEXT NOT NULL,
    "access" BOOLEAN NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."church" (
    "id" TEXT NOT NULL,
    "connectAccountId" TEXT,
    "customerId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "churchLogo" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "whitelabel" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "goal" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "connectAccountId" TEXT,
    "subAccountLogo" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "goal" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."church_sidebar_option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Menu',
    "link" TEXT NOT NULL DEFAULT '#',
    "churchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "church_sidebar_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubAccountSidebarOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Menu',
    "link" TEXT NOT NULL DEFAULT '#',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subAccountId" TEXT,

    CONSTRAINT "SubAccountSidebarOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "role" "public"."Role" NOT NULL DEFAULT 'SUBACCOUNT_USER',

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification" (
    "id" TEXT NOT NULL,
    "notification" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subAccountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plan" "public"."Plan",
    "price" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "priceId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "churchId" TEXT,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."add_ons" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "priceId" TEXT NOT NULL,
    "churchId" TEXT,

    CONSTRAINT "add_ons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" SERIAL NOT NULL,
    "mobile_number" TEXT,
    "member_id" TEXT NOT NULL,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "gender" TEXT,
    "birthday" TIMESTAMP(3),
    "address" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "membership_status" TEXT NOT NULL DEFAULT 'active',
    "profile_photo" TEXT,
    "member_tags" JSONB,
    "qr_code" TEXT,
    "additional_info" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "user_churchId_idx" ON "public"."user"("churchId");

-- CreateIndex
CREATE INDEX "Permissions_subAccountId_idx" ON "public"."Permissions"("subAccountId");

-- CreateIndex
CREATE INDEX "Permissions_email_idx" ON "public"."Permissions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE INDEX "SubAccount_churchId_idx" ON "public"."SubAccount"("churchId");

-- CreateIndex
CREATE INDEX "church_sidebar_option_churchId_idx" ON "public"."church_sidebar_option"("churchId");

-- CreateIndex
CREATE INDEX "SubAccountSidebarOption_subAccountId_idx" ON "public"."SubAccountSidebarOption"("subAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_email_key" ON "public"."invitation"("email");

-- CreateIndex
CREATE INDEX "invitation_churchId_idx" ON "public"."invitation"("churchId");

-- CreateIndex
CREATE INDEX "notification_churchId_idx" ON "public"."notification"("churchId");

-- CreateIndex
CREATE INDEX "notification_subAccountId_idx" ON "public"."notification"("subAccountId");

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "public"."notification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_subscriptionId_key" ON "public"."subscription"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_churchId_key" ON "public"."subscription"("churchId");

-- CreateIndex
CREATE INDEX "subscription_customerId_idx" ON "public"."subscription"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "add_ons_priceId_key" ON "public"."add_ons"("priceId");

-- CreateIndex
CREATE INDEX "add_ons_churchId_idx" ON "public"."add_ons"("churchId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_member_id_key" ON "public"."Member"("member_id");

-- CreateIndex
CREATE INDEX "Member_membership_status_idx" ON "public"."Member"("membership_status");

-- CreateIndex
CREATE INDEX "Member_mobile_number_idx" ON "public"."Member"("mobile_number");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Permissions" ADD CONSTRAINT "Permissions_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Permissions" ADD CONSTRAINT "Permissions_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "public"."SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubAccount" ADD CONSTRAINT "SubAccount_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."church_sidebar_option" ADD CONSTRAINT "church_sidebar_option_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubAccountSidebarOption" ADD CONSTRAINT "SubAccountSidebarOption_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "public"."SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitation" ADD CONSTRAINT "invitation_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "public"."SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."add_ons" ADD CONSTRAINT "add_ons_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."church"("id") ON DELETE SET NULL ON UPDATE CASCADE;
