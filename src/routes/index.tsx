// import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../components/ui/button";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const id = "administrator";
  const id2 = "assistant";
  return (
    <main className="p-2">
      <h3>Welcome Home!</h3>
      <Link params={{ user: id }} to={`/dashboard/$user`}>
        Go to admin
      </Link>
      <Link params={{ user: id2 }} to={`/dashboard/$user`}>
        Go to assis
      </Link>
    </main>
  );
}
