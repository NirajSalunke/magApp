import {
	createFileRoute,
	getRouteApi,
	useRouter,
} from "@tanstack/react-router";
import React, { useEffect } from "react";

export const Route = createFileRoute("/dashboard/check/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = getRouteApi("/dashboard/check/");
	const params = router.useParams();
	const navigator = useRouter();
	// const navigate = router.useNavigate();
	console.log(params);

	// useEffect(() => {
	// 	// if (params.id) {
	// 	// 	navigator.navigate();
	// 	// }
	// }, [params.id, navigate]);

	return <div>Hello "/dashboard/check/"!</div>;
}
