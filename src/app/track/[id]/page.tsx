import React from "react";
import ClientTrackerView from "./ClientTrackerView";
import { defaultClients, defaultTasks } from "@/data/content";

export function generateStaticParams() {
  const clientParams = defaultClients.map((c) => ({ id: c.id }));
  const taskParams = defaultTasks.map((t) => ({ id: t.id }));
  return [...clientParams, ...taskParams];
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ClientTrackerView id={resolvedParams.id} />;
}
