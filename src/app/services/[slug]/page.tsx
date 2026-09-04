import React from "react";
import ServiceDetailClient from "./ServiceDetailClient";
import { services } from "@/data/content";

export function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <ServiceDetailClient slug={resolvedParams.slug} />;
}
