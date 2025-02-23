import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { useUser } from "@clerk/clerk-react";
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

const origin_api = import.meta.env.VITE_BACKEND_URL;
// console.log(origin_api);

const CreatePat = () => {
  const router = useRouter();
  const { toast } = useToast();
  if (!origin_api) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>No Origin URl NOT found!</h1>
      </div>
    );
  }

  const [subMessage, setSubMessage] = useState("Create Patient");

  const [date, setDate] = React.useState<Date>();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState(0);
  const [weight, setweight] = useState(0);
  const [insurance, setInsurance] = useState("");
  const [home, setHome] = useState(false);
  const handleCheckboxChange = (checked: boolean) => {
    setHome(checked);
  };
  const [income, setincome] = useState(0);
  const [disease, setdisease] = useState("");
  const [facility, setfacility] = useState(false);

  const [doctor, setDoctor] = useState("");
  // const [assistant, setAssistant] = useState(useUser().user?.fullName);
  const assistant = useUser().user?.fullName;
  const handleCheckboxChange2 = (checked: boolean) => {
    setfacility(checked);
  };
  const [injury, setinjury] = useState(0);
  const [majorInjury, setmajoyInjury] = useState("");
  const data = {
    patientData: {
      name: firstName + " " + lastName,
      age,
      email,
      gender,
      weight,
      income,
      home,
      insurance,
    },
    treatmentData: {
      name: firstName + " " + lastName,
      email,
      disease: parseInt(disease),
      startAt: date,
      facility,
      numofexternalInjuries: injury,
      externalInjuries: majorInjury,
      doctor,
      assistant,
      status: "admitted",
    },
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubMessage("Creating Patient...");
    // console.log(data);
    // console.log(`${origin_api}/api/assistant/send-patient-data`);
    try {
      const response = await axios.post(
        `${origin_api}/api/assistant/send-patient-data`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response" + response);
      if (response.data.success) {
        // console.log(response);
        toast({
          variant: "default",
          title: "Patient Created!",
          description: "Patient created successfully. Redirecting",
        });
        setSubMessage("Patient Created Successfully!");
        setSubMessage("Create Patient");
        router.navigate({ to: "/" });
      }
    } catch (error: any) {
      // console.log(error);
      // console.log(error.status);
      setSubMessage("Something went Wrong, Try Again!!");
      if (error.status === 400) {
        toast({
          variant: "destructive",
          title: "Something went wrong, Try again!",
          description: "Patient Already Created!!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong, Try again!",
          // description: "Patient Already Created!!",
        });
      }
      setTimeout(() => {
        setSubMessage("Create Patient");
      }, 2000);
    }
  };
  return (
    <div className="w-full h-screen p-2 ">
      <div className=" h-[10vh] mb-7">
        <h2 className="text-5xl font-extrabold mb-5 ">Create</h2>
        <p className="">Helpful to add new patient.</p>
      </div>
      <ScrollArea className="h-5/6  border rounded-md  ">
        <form onSubmit={submit} className=" flex flex-col p-10 w-2/3 ">
          <div className=" h-[10vh] ">
            <h2 className="text-2xl font-extrabold  ">Patient Information</h2>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                onChange={(e) => setfirstName(e.target.value)}
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
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Salunke"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={email}
                id="email"
                placeholder="projectmayhem@fc.com"
                onChange={(e) => setemail(e.target.value)}
                type="email"
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setgender}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specify Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="Nope">Prefer Not to Say</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Insurance</Label>
              <Select value={insurance} onValueChange={setInsurance}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Insurance Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Insurance</SelectLabel>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="self-pay">Self-Pay</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="age">Weight</Label>
              <Input
                id="weight"
                value={weight}
                onChange={(e) => setweight(parseInt(e.target.value))}
                placeholder="69"
                type="number"
                min={0}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setage(parseInt(e.target.value))}
                placeholder="19"
                type="number"
                min={0}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age">
                Family Income ( in Thousands and &#8377; )
              </Label>
              <Input
                id="income"
                value={income}
                onChange={(e) => setincome(parseInt(e.target.value))}
                placeholder="35"
                type="number"
                min={0}
              />
            </LabelInputContainer>
          </div>
          <div className="flex m-2 items-center space-x-2">
            <Checkbox
              id="home"
              checked={home}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Can Patient's health be well cared at Home!
            </label>
          </div>
          {/* <p className="mt-5">Now,{"  "} Fill Medical Treatment.</p> */}
          <div className=" h-[10vh] mt-10 ">
            <h2 className="text-2xl font-extrabold  ">Treatment Information</h2>
          </div>
          <div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label>Disease</Label>
                <Select value={disease} onValueChange={setdisease}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Disease Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Diseases</SelectLabel>
                      <SelectItem value={"0"}>Asthama</SelectItem>
                      <SelectItem value={"1"}>COPD</SelectItem>
                      <SelectItem value={"2"}>Cancer</SelectItem>
                      <SelectItem value={"3"}>Diabetes</SelectItem>
                      <SelectItem value={"4"}>Heart Disease</SelectItem>
                      <SelectItem value={"5"}>Hypertension</SelectItem>
                      <SelectItem value={"6"}>Infection</SelectItem>
                      <SelectItem value={"7"}>Kidney Disease</SelectItem>
                      <SelectItem value={"8"}>Liver Disease</SelectItem>
                      <SelectItem value={"9"}>Mental Health</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </LabelInputContainer>
              <LabelInputContainer>
                <Label>Major External Injury</Label>
                <Select value={majorInjury} onValueChange={setmajoyInjury}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Injury Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Diseases</SelectLabel>
                      <SelectItem value={"0"}>
                        Burn and small injuires
                      </SelectItem>
                      <SelectItem value={"1"}>Concussion</SelectItem>
                      <SelectItem value={"2"}>Dislocation</SelectItem>
                      <SelectItem value={"3"}>Electrocution</SelectItem>
                      <SelectItem value={"4"}>Fracture</SelectItem>
                      <SelectItem value={"5"}>Laceration</SelectItem>
                      <SelectItem value={"6"}>Poisioning</SelectItem>
                      <SelectItem value={"7"}>Sprain</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </LabelInputContainer>
            </div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="email">Date of Admit</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="injury">
                  Number of External Injuries ( If any )
                </Label>
                <Input
                  id="injury"
                  value={injury}
                  onChange={(e) => setinjury(parseInt(e.target.value))}
                  placeholder="12"
                  type="number"
                  min={0}
                />
              </LabelInputContainer>
            </div>
            <div className="flex my-5 mx-2 items-center space-x-2">
              <Checkbox
                id="home"
                checked={facility}
                onCheckedChange={handleCheckboxChange2}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Does Patient Requires Special Facilities!
              </Label>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="doctor">Doctor&apos;s Name</Label>
                <Input
                  id="doctor"
                  onChange={(e) => setDoctor(e.target.value)}
                  value={doctor}
                  placeholder="Dr. Niraj"
                  type="text"
                />
              </LabelInputContainer>
            </div>
          </div>
          <Button onClick={submit}>{subMessage}</Button>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreatePat;
