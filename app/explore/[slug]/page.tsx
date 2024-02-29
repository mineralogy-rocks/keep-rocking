import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMineralDetail } from "@/actions";
import MineralPage from "./client";


type metadataProps = {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: metadataProps): Promise<Metadata | undefined> {
  const { slug } = params;
  const data = await getMineralDetail(slug);

  if (!data) return;

  return {
    title: data.name,
    description: data.description,
  };
}


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getMineralDetail(slug);

  if (!data) notFound();

  return (
    <Suspense fallback={<div></div>}>
      <MineralPage data={data} />
    </Suspense>
  );
}
