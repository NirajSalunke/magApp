import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
const origin_api = import.meta.env.VITE_BACKEND_URL;
import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useToast } from "../hooks/use-toast";
import { HomeIcon } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import axios from "axios";
import { IconMedicalCrossCircle } from "@tabler/icons-react";
// import { toast } from "@/hooks/use-toast";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/dashboard/niraj",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
const Navbar = () => {
  const user = useUser().user;
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress === "ctrlaltniraj@gmail.com") {
      setRole("administrator");
    } else {
      setRole("assistant");
    }
  }, [role]);
  return (
    <div className="w-screen h-[10vh] flex px-10  items-center justify-between">
      <div className="flex gap-2  font-bold items-center">
        <IconMedicalCrossCircle /> MediTrack AI
      </div>
      <div className="flex gap-10">
        <NavigationMenu>
          <NavigationMenuList className="gap-10">
            <SignedIn>
              <NavigationMenuItem>
                <Link params={{ user: role }} to="/dashboard/$user">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </SignedIn>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="h-[10vh] flex justify-center items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button>
              <Link to="/sign-up">Sign-up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
