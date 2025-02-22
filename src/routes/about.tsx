// import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
// import { SignedIn, UserProfile } from "@clerk/clerk-react";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-5 flex flex-col gap-10">
      <h3>About</h3>
    </div>
  );
}
