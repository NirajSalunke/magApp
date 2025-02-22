import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import { useState } from "react";


interface PatientResourcesProps {
	resources: Record<string, number>; // Dynamic object with string keys and number values
}

export const Patient_resources_table: React.FC<PatientResourcesProps> = ({
	resources,
}) => {
	return (
		<Table className="w-full border rounded-xl">
			<TableCaption>A list of your required resources.</TableCaption>
			<TableHeader className="bg-gray-300 text-lg ">
				<TableRow>
					{/* <TableHead className="w-[100px]">Invoice</TableHead> */}
					<TableHead className="border-r">Item</TableHead>
					<TableHead>Quantity</TableHead>
					{/* <TableHead className="text-right">Amount</TableHead> */}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(resources).map(([key, value]) => (
					<TableRow key={key}>
						{/* <TableCell className="font-medium">{key.invoice}</TableCell> */}
						<TableCell className="border-r">{key}</TableCell>
						<TableCell className="px-5">{value}</TableCell>
						{/* <TableCell className="text-right">{key.totalAmount}</TableCell> */}
					</TableRow>
				))}
			</TableBody>
			{/* <TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter> */}
		</Table>
	);
};

