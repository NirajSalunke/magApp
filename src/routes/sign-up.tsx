import { createFileRoute } from "@tanstack/react-router";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";
import { useRouter } from "@tanstack/react-router";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Link } from "@tanstack/react-router";
import { EyeClosed, EyeIcon, Loader2Icon } from "lucide-react";
import { cn } from "../lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import axios from "axios";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setcode] = useState("");
  // const [errorAlert, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [togglePass, setTogglePass] = useState("password");
  const [icon, seticon] = useState(<EyeClosed />);
  const [subMessage, setsubMessage] = useState("Sign up");
  const [subMessage1, setsubMessage1] = useState("Log in");
  const [subVerify, setsubVerify] = useState("Verify");

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2Icon className=" animate-spin" />
      </div>
    );
  }
  const eye = () => {
    if (togglePass === "password") {
      setTogglePass("text");
      seticon(<EyeIcon />);
    } else {
      setTogglePass("password");
      seticon(<EyeClosed />);
    }
  };

  const loginsub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      setsubMessage1("Logging in...");
      if (signIn) {
        const result = await signIn.create({
          identifier: emailAddress,
          password,
        });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          toast({
            title: "Log in successful",
            description: "You have successfully logged in!",
          });
          setsubMessage1("Logged In");
          router.navigate({ to: "/" });
        }
      }
    } catch (error: any) {
      setsubMessage1("Try Again!");
      toast({
        title: "Something went Wrong, Try Again!",
        description: error.errors[0].message,
      });
      setsubMessage1("Log in");
    }
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      setsubMessage("Signing In...");
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
      setsubMessage("Done!!");
    } catch (error: any) {
      console.log(error);
      setsubMessage("Try Again!!..");
      toast({
        variant: "destructive",
        title: "Something went Wrong!",
        description: error.errors[0].message,
      });
      setsubMessage("Sign up");
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      setsubVerify("Verifying ...");
      const CompleteSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (CompleteSignUp.status !== "complete") {
        console.log(JSON.stringify(CompleteSignUp, null, 2));
        toast({
          variant: "destructive",
          title: "Try Again",
        });
        setsubVerify("Not Verified");
      }
      if (CompleteSignUp.status === "complete") {
        await setActive({
          session: CompleteSignUp.createdSessionId,
        });
        toast({
          variant: "default",
          title: "Signed in Successfully",
        });
        setsubVerify("Verified!");
        // pending
        const user = useUser().user;
        // const response = await axios.post("/");

        // peding
        router.navigate({ to: "/" });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went Wrong!",
        description: error.errors[0].message,
      });
      setsubVerify("Not Verified");
    }
  };

  return (
    <>
      {isSignedIn ? (
        <div className="text-center w-screen h-screen flex flex-col gap-10 justify-center items-center">
          <div className="font-bold text-3xl max-w-[50vw]">
            Hey {useUser().user?.firstName} , You already filled out the whole
            autobiography earlier. Let’s get back to the good stuff — home’s
            waiting for you!
          </div>
          <Button>
            <Link to={"/"}>Back to Home</Link>
          </Button>
        </div>
      ) : (
        <div className="w-screen h-screen transition-all flex justify-center items-center">
          <div className="w-1/2 h-screen  bg-black">
            <img
              src="/3.jpg"
              alt="img"
              className="h-full  opacity-75 bg-black  object-cover"
              loading="lazy"
            />
          </div>
          <div className="max-w-md w-1/2 mx-auto rounded-none flex flex-col gap-3  md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Welcome to Vault-Base
            </h2>
            {!pendingVerification ? (
              <Tabs defaultValue="sign-up" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
                  <TabsTrigger value="log-in">Log-in</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-up">
                  <form className="my-8" onSubmit={submit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                      <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                          id="firstname"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          placeholder="Niraj"
                          type="text"
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                          id="lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Salunke"
                          type="text"
                        />
                      </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        value={emailAddress}
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        type="email"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4 ">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                          value={password}
                          id="password"
                          placeholder="••••••••"
                          type={togglePass}
                          onChange={(e) => setPass(e.target.value)}
                        />
                        <Button type="button" onClick={eye}>
                          {icon}
                        </Button>
                      </div>
                    </LabelInputContainer>

                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      {subMessage} &rarr;
                      <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                  </form>
                </TabsContent>
                <TabsContent value="log-in">
                  <form className="my-8" onSubmit={loginsub}>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        value={emailAddress}
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        type="email"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        value={password}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </LabelInputContainer>

                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      {subMessage1} &rarr;
                      <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <form className="my-8" onSubmit={verify}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Verification Code</Label>
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setcode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  {subVerify}&rarr;
                  <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
