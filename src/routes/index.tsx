// import * as React from "react";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { Ripple } from "../components/magicui/ripple";
import { MaskContainer } from "../components/ui/svg-mask-effect";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
const origin_api = import.meta.env.VITE_BACKEND_URL;
// import { Ripple } from "../components/magicui/ripple";
import { useToast } from "../hooks/use-toast";
// import { Button } from "../components/ui/button";
// import { Link } from "@tanstack/react-router";
// import { TextGenerateEffect } from "../components/ui/text-generate-effect";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}
const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border-2   p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={4}
          borderWidth={3}
          spread={80}
          glow={false}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
function HomeComponent() {
  const { toast } = useToast();
  const user = useUser().user;
  console.log(user);
  const { isSignedIn } = useUser();
  let flag = false;
  useEffect(() => {
    const sign = async () => {
      const response = await axios.post(
        `${origin_api}/api/user/signup`,
        {
          name: user?.fullName || "",
          email: user?.emailAddresses[0].emailAddress || "",
          id: user?.id || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        flag = true;
        toast({
          variant: "default",
          title: "Signed in Successfully",
        });
      }
    };
    sign();
  }, [user]);
  // const words = `M e d i T r a c k  A I`;
  return (
    <main className="p-2 w-screen ">
      <div className="flex flex-col items-center justify-center h-[88vh] ">
        <span className="md:text-9xl text-7xl ">MediTrack AI</span>
        {/* <TextGenerateEffect words={words} className="" /> */}{" "}
        <Ripple mainCircleOpacity={0.2} />
        <p>Smarter Health, Seamless Tracking.</p>
      </div>
      <div>
        <ul className="grid grid-cols-1   grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
            title=" Assistant Role"
            description="Assistants create patient records and treatments. Each assistant can register new patients and enter treatment details into the system."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={
              <Settings className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title=" Administrator Dashboard"
            description="The administrator reviews flagged patients.
The dashboard displays patients, their predicted risk, and required resources.
"
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
            title=" AI Model Analysis"
            description="Our AI model processes patient treatment data.
Once a patient is discharged, the AI predicts whether they are at risk of readmission."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={
              <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Readmission Risk Detected"
            description="The AI model flags high-risk patients.
If the model predicts a readmission risk, the system alerts the administrator."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={
              <Search className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title=" Optimized Resource Allocation"
            description="Hospitals can proactively manage resources.
Based on the risk predictions, hospitals can allocate resources to prevent readmissions."
          />
        </ul>
      </div>
      <div className="w-full h-[30vh] flex justify-evenly p-5 flex-col ">
        <div className="flex flex-col gap-5">
          {" "}
          <h1 className=" text-3xl">MediTrack AI</h1>
          <h1 className="w">© 2025 MediTrack AI. All Rights Reserved.</h1>
        </div>
      </div>
    </main>
  );
}
