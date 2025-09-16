"use client";

import * as React from "react";
import { useEffect, useState, useRef, useId } from "react";
import {
  PanelLeftCloseIcon,
  PanelLeftIcon,
  SearchIcon,
  MailIcon,
  BellIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSidebar } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

// Notification Menu Component
const NotificationMenu = ({
  notificationCount = 3,
  onItemClick,
}: {
  notificationCount?: number;
  onItemClick?: (item: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8 relative rounded-full">
        <BellIcon size={16} />
        {notificationCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {notificationCount > 9 ? "9+" : notificationCount}
          </Badge>
        )}
        <span className="sr-only">Notifications</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-80">
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.("notification1")}>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">New message received</p>
          <p className="text-xs text-muted-foreground">2 minutes ago</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.("notification2")}>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">System update available</p>
          <p className="text-xs text-muted-foreground">1 hour ago</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.("notification3")}>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Weekly report ready</p>
          <p className="text-xs text-muted-foreground">3 hours ago</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.("view-all")}>
        View all notifications
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// User Menu Component
const UserMenu = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
  onItemClick,
}: {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onItemClick?: (item: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground">
        <Avatar className="h-7 w-7">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="text-xs">
            {userName.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <ChevronDownIcon className="h-3 w-3 ml-1" />
        <span className="sr-only">User menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{userName}</p>
          <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.("profile")}>Profile</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.("settings")}>Settings</DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.("billing")}>Billing</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.("logout")}>Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const DashboardNavbar = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
  notificationCount = 3,
  messageIndicator = true,
  onMessageClick,
  onNotificationItemClick,
  onUserItemClick,
}: {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageIndicator?: boolean;
  onMessageClick?: () => void;
  onNotificationItemClick?: (item: string) => void;
  onUserItemClick?: (item: string) => void;
}) => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const searchId = useId();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search query submission if needed
  };

  return (
    <nav
      className={cn(
        "flex px-4 gap-x-2 items-center py-3 border-b bg-background/60 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-lg shadow-black/5"
      )}
    >
      {/* Left Side: Sidebar Toggle and Search */}
      <div className="flex items-center gap-2">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {(state === "collapsed" || isMobile) ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
      </div>


      {/* Right Side: Messages, Notifications, User Menu, and Theme Toggle */}
      <div className="flex items-center gap-2 ml-auto">
        
        {/* Theme Toggle */}
        <ModeToggle />

        {/* Messages */}
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground relative size-8 rounded-full shadow-none"
          aria-label="Open messages"
          onClick={(e) => {
            e.preventDefault();
            if (onMessageClick) onMessageClick();
          }}
        >
          <MailIcon size={16} aria-hidden={true} />
          {messageIndicator && (
            <div
              aria-hidden={true}
              className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
            />
          )}
        </Button>

        {/* Notifications */}
        <NotificationMenu
          notificationCount={notificationCount}
          onItemClick={onNotificationItemClick}
        />

      </div>
    </nav>
  );
};