import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";

import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "../components/ui/toaster";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
	component: RootComponent,
});
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env.local file");
}
function RootComponent() {
	const location = useLocation().pathname;
	return (
		<>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
				<Toaster />
				{location !== "/sign-up" && !location.startsWith("/dashboard") && (
					<Navbar />
				)}
				<Outlet />
			</ClerkProvider>
		</>
	);
}
