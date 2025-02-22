import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
const CreatePat = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState(0);
  const submit = async () => {};
  return (
    <div className="w-full h-screen p-2 ">
      <div className=" h-[10vh] mb-10">
        <h2 className="text-5xl font-extrabold my-5 ">Create</h2>
        <p className="">Helpful to add new patient.</p>
      </div>
      <ScrollArea className="h-5/6  border rounded-md  ">
        <form onSubmit={submit} className=" flex flex-col p-10 w-2/3 ">
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
              <Select value={gender}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specify Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                  // onSelect={(e) => setgender(e.target.value\)}
                  // onSelectCapture={(e) => setgender(e)}
                  >
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="Nope">Prefer Not to Say</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setage(parseInt(e.target.value))}
                placeholder="19"
                type="number"
              />
            </LabelInputContainer>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreatePat;
