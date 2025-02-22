import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "@tanstack/react-router";
import { useToast } from "../hooks/use-toast";

export const Route = createFileRoute("/oauth-callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast();
  const { handleRedirectCallback } = useClerk();

  const router = useRouter();
  useEffect(() => {
    const processOAuth = async () => {
      try {
        const result = await handleRedirectCallback({});
        console.log("OAuth Result:", result);
        if (result) {
          router.navigate({ to: "/" });
          toast({
            variant: "default",
            title: "Well Done!!",
          });
        } else {
          console.error("OAuth failed: No session created");
          router.navigate({ to: "/sign-up" });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Something went wrong, Try Again!",
          description: error.errors[0].message,
        });
        console.error("OAuth callback error:", error);
        router.navigate({ to: "/sign-up" });
      }
    };

    processOAuth();
  }, []);

  return (
    <div className="text-center w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <div className="font-bold text-3xl max-w-[50vw]">
        Googling Googling .....
      </div>
    </div>
  );
}
