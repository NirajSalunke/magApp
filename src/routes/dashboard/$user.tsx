// import { IconSettings } from "@tabler/icons-react";
import {
  createFileRoute,
  getRouteApi,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
const routeAPI = getRouteApi("/dashboard/$user");
import { cn } from "../../lib/utils";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Adminis_tabs } from "../../components/Adminis_tabs";
export const Route = createFileRoute("/dashboard/$user")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = routeAPI.useParams();
  let [user, setUser] = useState("");

  React.useEffect(() => {
    if (params.user === "assistant") {
      setUser("assistant");
    } else {
      setUser("administrator");
    }
  }, [params.user]);
  const links_assistant = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const links_administrator = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
		<>
			{/* <div className="w-screen h-[6vh]"></div> */}
			<div
				className={cn(
					"rounded-md flex flex-col  md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
					"h-[100vh] " // for your use case, use `h-screen` instead of `h-[60vh]`
				)}
			>
				<Sidebar open={open} setOpen={setOpen} animate={false}>
					{user === "assistant" ? (
						<SidebarBody className="justify-between gap-10">
							<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
								<div className="mt-8 flex flex-col gap-2">
									{links_assistant.map((link, idx) => (
										<SidebarLink key={idx} link={link} />
									))}
								</div>
							</div>
							<div>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</SidebarBody>
					) : (
						<SidebarBody className="justify-between gap-10">
							<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
								<div className="mt-8 flex flex-col gap-2">
									{links_administrator.map((link, idx) => (
										<SidebarLink key={idx} link={link} />
									))}
								</div>
							</div>
							<div>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</SidebarBody>
					)}
        </Sidebar>
        {user === "assistant" ? <Dashboard1 /> : <Dashboard2 />}
				
			</div>
		</>
	);
}

const Dashboard1 = () => {
  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Dashboard2 = () => {
	return (
		<div className="flex flex-1 ">
			<div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
				<div className="flex gap-2">
					<Adminis_tabs />
				</div>
				{/* <div className="flex gap-2 flex-1">
					{[...new Array(2)].map((i) => (
						<div
							key={"second" + i}
							className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
						></div>
					))}
				</div> */}
			</div>
		</div>
	);
};

