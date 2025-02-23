import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import { CumulativeResourceTable } from "./CumulativeResourcesTable";
import { Resources_table } from "./Resources_table";

export function Adminis_tabs() {
	return (
		<Tabs defaultValue="resources" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="resources">Resources</TabsTrigger>
				<TabsTrigger value="cumulative-resources">
					Cumulative Resources
				</TabsTrigger>
			</TabsList>
			<TabsContent value="resources">
				<Card>
					<CardHeader>
						<CardTitle>Resources</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when you're done.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Resources_table />
					</CardContent>
					{/* <CardFooter>
						<Button>Save changes</Button>
					</CardFooter> */}
				</Card>
			</TabsContent>
			<TabsContent value="cumulative-resources">
				<Card>
					<CardHeader>
						<CardTitle>Cumulative Resources</CardTitle>
						<CardDescription>cumulative resources shown here.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<CumulativeResourceTable />
					</CardContent>
					{/* <CardFooter>
						<Button>Save changes</Button>
					</CardFooter> */}
				</Card>
			</TabsContent>
		</Tabs>
	);
}
