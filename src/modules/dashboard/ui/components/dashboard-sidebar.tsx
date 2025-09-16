"use client"

import { ChevronRight, StarIcon } from "lucide-react"
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
import DescriptionIcon from '@mui/icons-material/Description';
import ChurchIcon from '@mui/icons-material/Church';
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BackupIcon from '@mui/icons-material/Backup';
import ExtensionIcon from '@mui/icons-material/Extension';
import EventIcon from '@mui/icons-material/Event';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SettingsIcon from '@mui/icons-material/Settings';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../assets/logo3.png"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { NavUser } from "@/components/nav-user"
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

const firstSection = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/home",
    items: [],
  },
  {
    icon: GroupIcon,
    label: "User Management",
    href: "/users",
    items: [
      { title: "Users", url: "/users" },
      { title: "Roles", url: "/roles" },
      { title: "Sales Commission Agents", url: "/sales-commission-agents" },
    ],
  },
  {
    icon: ContactsIcon,
    label: "Contacts",
    href: "/contacts",
    items: [
      { title: "Supplier", url: "/contacts?type=supplier" },
      { title: "Customer", url: "/contacts?type=customer" },
      { title: "Customer Groups", url: "/customer-group" },
      { title: "Import Contacts", url: "/contacts/import" },
      { title: "Map", url: "/contacts/map" },
    ],
  },
  {
    icon: PeopleIcon,
    label: "Members",
    href: "/members",
    items: [
      { title: "Members", url: "dashboard/members" },
      { title: "Member Groups", url: "/membergroups" },
      { title: "Memberships", url: "/memberships" },
      { title: "Membership Types", url: "/membership-types" },
      { title: "Member Reports", url: "/reports/membership" },
    ],
  },
  {
    icon: CardMembershipIcon,
    label: "Forms",
    href: "/form",
    items: [
      { title: "Manage Forms", url: "/form" },
    ],
  },
  {
    icon: ChurchIcon,
    label: "Sacramental Records",
    href: "/sacramental",
    items: [
      { title: "Baptism Records", url: "/sacramental/baptism" },
      { title: "Marriage Records", url: "/sacramental/marriage-records" },
      { title: "Communion Records", url: "/sacramental/communion-records" },
    ],
  },
  {
    icon: VolunteerActivismIcon,
    label: "Donations",
    href: "/donations",
    items: [
      { title: "Funds", url: "/funds" },
      { title: "Donations", url: "/donations" },
      { title: "Donors", url: "/donors" },
      { title: "Donation Reports", url: "/donation-reports" },
    ],
  },
  {
    icon: MessageIcon,
    label: "Messaging Center",
    href: "/messaging",
    items: [
      { title: "Send Messages", url: "/messaging/mailbox" },
      { title: "Messaging Center", url: "/messenger" },
    ],
  },
  {
    icon: MonetizationOnIcon,
    label: "Collections",
    href: "/collections",
    items: [
      { title: "Weekly Collections", url: "/collections" },
      { title: "Weekly Collection Payment", url: "/collections/createCollectionPayment" },
      { title: "Weekly Donations", url: "/weekly_donations" },
      { title: "Weekly Donation Payment", url: "/weekly_donations/createWeeklyDonationPayment" },
      { title: "Member Collections", url: "/member_collections" },
      { title: "Yearly Harvests", url: "/yearly-harvests" },
    ],
  },
  {
    icon: AccountBalanceIcon,
    label: "Income & Expenses",
    href: "/transactions",
    items: [
      { title: "Transactions", url: "/transactions" },
      { title: "Transaction Categories", url: "/transaction-categories" },
      { title: "Reports", url: "/reports/income-expense" },
    ],
  },
  {
    icon: StoreIcon,
    label: "Facilities & Rentals",
    href: "/rentals",
    items: [
      { title: "Rentals", url: "/rentals" },
      { title: "Rental Items", url: "/rental-items" },
    ],
  },
  {
    icon: InventoryIcon,
    label: "Products",
    href: "/products",
    items: [
      { title: "List Products", url: "/products" },
      { title: "Add Product", url: "/products/create" },
      { title: "Update Product Price", url: "/update-product-price" },
      { title: "Print Labels", url: "/labels/show" },
      { title: "Variations", url: "/variation-templates" },
      { title: "Import Products", url: "/import-products" },
      { title: "Import Opening Stock", url: "/import-opening-stock" },
      { title: "Selling Price Group", url: "/selling-price-group" },
      { title: "Units", url: "/units" },
      { title: "Categories", url: "/taxonomies?type=product" },
      { title: "Brands", url: "/brands" },
      { title: "Warranties", url: "/warranties" },
    ],
  },
  {
    icon: LocalShippingIcon,
    label: "Purchases",
    href: "/purchases",
    items: [
      { title: "Purchase Requisition", url: "/purchase-requisition" },
      { title: "Purchase Order", url: "/purchase-order" },
      { title: "List Purchase", url: "/purchases" },
      { title: "Add Purchase", url: "/purchases/create" },
      { title: "List Purchase Return", url: "/purchase-return" },
    ],
  },
  {
    icon: LocalShippingIcon,
    label: "Sell",
    href: "/sells",
    items: [
      { title: "Sales Order", url: "/sales-order" },
      { title: "All Sales", url: "/sells" },
      { title: "Add Sale", url: "/sells/create" },
      { title: "List POS", url: "/pos" },
      { title: "POS Sale", url: "/pos/create" },
      { title: "Add Draft", url: "/sells/create?status=draft" },
      { title: "List Drafts", url: "/sells/drafts" },
      { title: "Add Quotation", url: "/sells/create?status=quotation" },
      { title: "List Quotations", url: "/sells/quotations" },
      { title: "List Sell Return", url: "/sell-return" },
      { title: "Shipments", url: "/shipments" },
      { title: "Discounts", url: "/discount" },
      { title: "Subscriptions", url: "/subscriptions" },
      { title: "Import Sales", url: "/import-sales" },
    ],
  },
  {
    icon: LocalShippingIcon,
    label: "Stock Transfers",
    href: "/stock-transfers",
    items: [
      { title: "List Stock Transfers", url: "/stock-transfers" },
      { title: "Add Stock Transfer", url: "/stock-transfers/create" },
    ],
  },
  {
    icon: InventoryIcon,
    label: "Stock Adjustment",
    href: "/stock-adjustments",
    items: [
      { title: "List Stock Adjustments", url: "/stock-adjustments" },
      { title: "Add Stock Adjustment", url: "/stock-adjustments/create" },
    ],
  },
  {
    icon: MoneyOffIcon,
    label: "Expenses",
    href: "/expenses",
    items: [
      { title: "List Expenses", url: "/expenses" },
      { title: "Add Expense", url: "/expenses/create" },
      { title: "Expense Categories", url: "/expense-categories" },
    ],
  },
  {
    icon: AccountBalanceWalletIcon,
    label: "Payment Accounts",
    href: "/account",
    items: [
      { title: "List Accounts", url: "/account/account" },
      { title: "Balance Sheet", url: "/account/balance-sheet" },
      { title: "Trial Balance", url: "/account/trial-balance" },
      { title: "Cash Flow", url: "/account/cash-flow" },
      { title: "Payment Account Report", url: "/account/payment-account-report" },
    ],
  },
  {
    icon: AssessmentIcon,
    label: "Reports",
    href: "/reports",
    items: [
      { title: "Profit Loss", url: "/reports/profit-loss" },
      { title: "Report 606 (Purchase)", url: "/reports/purchase-report" },
      { title: "Report 607 (Sale)", url: "/reports/sale-report" },
      { title: "Purchase Sell Report", url: "/reports/purchase-sell" },
      { title: "Tax Report", url: "/reports/tax-report" },
      { title: "Contacts", url: "/reports/customer-supplier" },
      { title: "Customer Groups Report", url: "/reports/customer-group" },
      { title: "Stock Report", url: "/reports/stock-report" },
      { title: "Stock Expiry Report", url: "/reports/stock-expiry" },
      { title: "Lot Report", url: "/reports/lot-report" },
      { title: "Stock Adjustment Report", url: "/reports/stock-adjustment-report" },
      { title: "Trending Products", url: "/reports/trending-products" },
      { title: "Items Report", url: "/reports/items-report" },
      { title: "Product Purchase Report", url: "/reports/product-purchase-report" },
      { title: "Product Sell Report", url: "/reports/product-sell-report" },
      { title: "Purchase Payment Report", url: "/reports/purchase-payment-report" },
      { title: "Sell Payment Report", url: "/reports/sell-payment-report" },
      { title: "Expense Report", url: "/reports/expense-report" },
      { title: "Register Report", url: "/reports/register-report" },
      { title: "Sales Representative", url: "/reports/sales-representative-report" },
      { title: "Table Report", url: "/reports/table-report" },
      { title: "GST Sales Report", url: "/reports/gst-sales-report" },
      { title: "GST Purchase Report", url: "/reports/gst-purchase-report" },
      { title: "Service Staff Report", url: "/reports/service-staff-report" },
      { title: "Activity Log", url: "/reports/activity-log" },
      { title: "Message History", url: "/reports/message-histories" },
    ],
  },
  {
    icon: BackupIcon,
    label: "Backup",
    href: "/backup",
    items: [],
  },
  {
    icon: ExtensionIcon,
    label: "Modules",
    href: "/manage-modules",
    items: [],
  },
  {
    icon: EventIcon,
    label: "Bookings",
    href: "/bookings",
    items: [],
  },
  {
    icon: KitchenIcon,
    label: "Kitchen",
    href: "/modules/kitchen",
    items: [],
  },
  {
    icon: RestaurantMenuIcon,
    label: "Orders",
    href: "/modules/orders",
    items: [],
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    href: "/business",
    items: [
      { title: "Business Settings", url: "/business" },
      { title: "Business Locations", url: "/business-location" },
      { title: "Invoice Settings", url: "/invoice-schemes" },
      { title: "Barcode Settings", url: "/barcodes" },
      { title: "Receipt Printers", url: "/printers" },
      { title: "Tax Rates", url: "/tax-rates" },
      { title: "Database Management", url: "/database-management" },
      { title: "Tables", url: "/modules/tables" },
      { title: "Modifiers", url: "/modules/modifiers" },
      { title: "Types of Service", url: "/types-of-service" },
    ],
  },
];

export const DashboardSidebar = () => {
    const pathName = usePathname();
    const {data, isPending} = authClient.useSession();

    if(isPending || !data?.user){
      return null;
    }
    
    return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-sidebar-accent-foreground">
        <div>
          <Link href="/" className="flex items-center gap-2 px-2 pt-2">
            <Image src={Logo} height={36} width={36} alt="church.logo" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-lg">Church App</span>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                item.items.length === 0 ? (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathName === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      tooltip={item.label}
                      isActive={pathName === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="text-sm font-medium tracking-tight">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible
                    key={item.href}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "h-10 hover:linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                            pathName === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                          )}
                          tooltip={item.label}
                          isActive={pathName === item.href}
                        >
                          <item.icon />
                          <span className="text-sm font-medium tracking-tight">{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="animate-in data-[state=closed]:animate-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}