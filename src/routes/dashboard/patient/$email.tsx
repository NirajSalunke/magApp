import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import axios from "../../../api/axios";
import React from "react";
import { Patient_resources_table } from "../../../components/Patient_resources_table";

export const Route = createFileRoute("/dashboard/patient/$email")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = getRouteApi("/dashboard/patient/$email").useParams();
	const [data, setData] = React.useState<any>(null);

	React.useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/inventory/get-treatment?email=${params.email}`
				);
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		getData();
	}, [params.email]);

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container w-1/2 leading-[2] m-10 text-lg">
			<div className="w-full flex flex-col ml-60">
				<h1 className="text-5xl underline mb-5">Patient Info</h1> <hr />
				<div>
					<span className="font-bold tracking-wider">Name: </span>
					{data.name}
				</div>
				<div className="flex flex-row space-x-5">
					<div>
						<span className="font-bold tracking-wider">Age:</span> {data.age}
					</div>
					<div>
						<span className="font-bold tracking-wider">Gender:</span>{" "}
						{data.gender}
					</div>
					<div>
						<span className="font-bold tracking-wider">Weight:</span>{" "}
						{data.weight}
					</div>
				</div>
				<div>
					<span className="font-bold tracking-wider">Email:</span> {data.email}
				</div>
				<div>
					<span className="font-bold tracking-wider">Disease:</span>{" "}
					{data.disease}
				</div>
				<div>
					<span className="font-bold tracking-wider">Days:</span> {data.days}
				</div>
				<div>
					<span className="font-bold tracking-wider">Operated By:</span>{" "}
					{data.doctor}
				</div>
				<div>
					<span className="font-bold tracking-wider">Assisted By:</span>{" "}
					{data.assisted}
				</div>
				<div>
					<span className="font-bold tracking-wider">Resources:</span>
				</div>
				<Patient_resources_table resources={data.resources} />
			</div>
		</div>
	);
}
