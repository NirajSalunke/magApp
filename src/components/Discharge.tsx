import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Router } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useRouter } from "@tanstack/react-router";
// import { useToast } from "../hooks/use-toast";
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
const Discharge = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [key, setKey] = useState("");
  const [value, setValue] = useState(0);
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (key && value) {
      setItems((prevItems) => ({ ...prevItems, [key]: value }));
      setKey("");
      setValue(0);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
    }
    return;
  };

  const [items, setItems] = useState({});
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [diagnosis, setdiagnosis] = useState(1);
  const [procedures, setprocedures] = useState(1);
  const [date, setDate] = React.useState<Date>();
  const origin_api = import.meta.env.VITE_BACKEND_URL;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      updateData: {
        endAt: date,
        numofdiagnosis: diagnosis,
        procedures,
        resources: items,
        status: "discharged",
      },
    };
    try {
      const response = await axios.put(
        `${origin_api}/api/assistant/update-treatment`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast({
          variant: "default",
          title: "Patient Discharged!",
        });
        // router.navigate({ to: "/" });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went Wrong!",
        description: "Failed to Discharge!",
      });
    }
  };

  if (!origin_api) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>No Origin URl NOT found!</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-screen p-2">
      <div className=" h-[10vh] mb-10">
        <h2 className="text-5xl font-extrabold mb-5 ">Discharge</h2>
        <p className="">To Update about Discharge and Resources Needed</p>
      </div>
      <ScrollArea className=" h-5/6 border rounded-md">
        <form onSubmit={submit} className="flex flex-col p-10 w-2/3 ">
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
          <div className=" h-[10vh] ">
            <h2 className="text-2xl font-extrabold  ">Discharge Information</h2>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="age">Number of diagnosis </Label>
              <Input
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setdiagnosis(parseInt(e.target.value))}
                placeholder="3"
                type="number"
                min={1}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age">Number of Procedures Performed</Label>
              <Input
                id="procedures"
                value={procedures}
                onChange={(e) => setprocedures(parseInt(e.target.value))}
                placeholder="6"
                type="number"
                min={1}
              />
            </LabelInputContainer>
          </div>
          <div className="my-5">
            <LabelInputContainer>
              <Label htmlFor="email">Date of Discharge</Label>
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
          </div>
          <div className="p-4">
            <div className=" h-[10vh] ">
              <h2 className="text-2xl font-extrabold  ">
                Discharge Information
              </h2>
            </div>
            <h2 className="text-lg font-extrabold  mb-2">
              Resources exhausted
            </h2>
            <div className="flex gap-2 mb-4">
              <LabelInputContainer>
                <Label>Name of Item</Label>
                <Input
                  placeholder="Items"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label>Quantity of Item</Label>
                <Input
                  placeholder="Quantities"
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                  type="number"
                  min={0}
                />
              </LabelInputContainer>
            </div>
            <Button onClick={addItem}>Add</Button>
            <div className="grid grid-cols-3 gap-10  my-2 p-2">
              {Object.entries(items).map(([key, value], index) => (
                <Card
                  key={index}
                  className=" w-48 h-24 flex flex-col  justify-center "
                >
                  <CardContent className="p-4">
                    <p className="font-bold">{key}</p>
                    <p>Quantity: {value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Button onClick={submit}>Discharge Patient</Button>
        </form>
      </ScrollArea>
    </div>
  );
};

export default Discharge;
