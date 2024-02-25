import { Suspense } from "react";

import { getMineralDetail } from "@/actions";
import MineralPage from "./client";


type metadataProps = {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: metadataProps) {
  const { slug } = params;
  const data = await getMineralDetail(slug);

  return {
    title: data.name,
    description: data.description,
  };
}


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getMineralDetail(slug);

  return (
    <Suspense fallback={<div></div>}>
      <MineralPage data={data} />
    </Suspense>
  );
}
