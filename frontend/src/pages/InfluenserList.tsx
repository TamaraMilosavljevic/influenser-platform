import * as React from "react";
import InfluencerCard from "@/components/InfluencerCard";
import SearchComponent from "@/components/SearchComponent";
import type { Influencer } from "@/types/influencer.types";
import { getAllInfluencers } from "@/services/influencerService";

export default function InfluenserList({
  influencers: initialInfluencers,
  valueEnumValues,
  industryEnumValues,
}: {
  influencers: Influencer[];
  valueEnumValues: string[];
  industryEnumValues: string[];
}) {

  const [influencers, setInfluencers] = React.useState<Influencer[]>(initialInfluencers);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full px-6 sm:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Pronađite influensere
          <span className="block">za saradnju</span>
        </h1>

        <div className="w-full max-w-4xl">
          <SearchComponent
            valueEnumValues={valueEnumValues}
            industryEnumValues={industryEnumValues}
            onSearch={async (params) => {
                setLoading(true);
                try {
                const data = await getAllInfluencers(params);
                setInfluencers(data);
                } finally {
                setLoading(false);
                }
            }}
            />


        </div>

        <div
          className="
            grid
            grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
            gap-4
            justify-items-start
            place-content-start
            w-full
          "
        >
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.userId} influencer={influencer} />
          ))}
        </div>

        {loading && (
          <div className="text-sm text-muted-foreground">Učitavanje...</div>
        )}
      </div>
    </div>
  );
}
