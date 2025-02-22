import { createFileRoute, getRouteApi } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/check/$id')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = getRouteApi('/dashboard/check/$id')
  const params = router.useParams();
  console.log(params.id);
  return <div>Hello "/dashboard/check/$id"!</div>
}
