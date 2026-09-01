import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREA_ORDER, AREAS, isAreaSlug } from "../../lib/dashboard-areas";
import AreaView from "../../components/dashboard/area-view";

export function generateStaticParams() {
  return AREA_ORDER.map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  if (!isAreaSlug(area)) return { title: "Dashboard — Omnia" };
  return { title: `${AREAS[area].title} — Omnia` };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  if (!isAreaSlug(area)) notFound();
  return <AreaView area={AREAS[area]} />;
}
