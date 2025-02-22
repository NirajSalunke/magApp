// import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Assis_table from "./Assis_table";
import { ScrollArea } from "./ui/scroll-area";

export default function Assis_tab() {
  return (
    <Tabs defaultValue="resources" className="w-full">
      <TabsContent value="resources">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Patients</CardTitle>
            <CardDescription>List of all patients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="">
              <Assis_table />
            </ScrollArea>
          </CardContent>
          {/* <CardFooter>
						<Button>Save changes</Button>
					</CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
