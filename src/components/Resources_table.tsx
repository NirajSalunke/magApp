"use client";

import * as React from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import {
	ColumnDef,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import axios from "../api/axios";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";

export type Resources = {
	id: string;
	name: string;
	disease: number;
	days: number;
	email: string;
};

export const columns: ColumnDef<Resources>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name <ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "disease",
		header: "Disease",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("disease")}</div>
		),
	},
	{
		accessorKey: "days",
		header: "Days",
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("days")}</div>
		),
	},
];

export function Resources_table() {
	const [data, setData] = React.useState<Resources[]>([]);

	React.useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/inventory/get-all-readmisson"
				);

				// Ensure we extract `data` correctly from the response
				const diseases = [
					"Asthama",
					"COPD",
					"Cancer",
					"Diabetes",
					"Heart Disease",
					"Hypertension",
					"Infection",
					"Kidney Disease",
					"Liver Disease",
					"Mental Health"
				  ];
				const apiData = response.data.data || [];
				console.log(apiData);
				const transformedData = apiData.map((item: any) => ({
					id: item._id,
					name: item._doc.name,
					disease: diseases[item._doc.disease],
					days:item.days,
					email: item._doc.email,
				}));

				setData(transformedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		getData();
	}, []);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: { pageSize: 10 },
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter names..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<Link
												params={{
													email: row.original.email,
												}}
												to="/dashboard/patient/$email"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</Link>
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
