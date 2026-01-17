import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, Bookmark, Star } from "lucide-react"
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import MockImage from "@/assets/img/MockImage";
import type { Influencer } from "@/types/influencer.types";

type ProfileCardProps = {
  influencer: Influencer;
};

export default function InfluencerCard({ influencer }: ProfileCardProps) {

// const safeRating = Math.max(0, Math.min(influencer.rating, influencer.ratingOutOf));
  return (
    <Card className="w-full max-w-[420px] overflow-hidden rounded-3xl bg-white shadow-sm">
      <CardContent className="p-4 sm:p-5">

          <div className="overflow-hidden rounded-2xl bg-[#C4C4C4]">
            <MockImage imageStyle="w-full h-64 object-cover" />
          </div>


        {/* Header */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl sm:text-2xl font-semibold leading-tight"><strong>{influencer.name}</strong></h3>
              <BadgeCheck className="h-5 w-5 text-black/80" aria-label="Verified" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
                {influencer.experience}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-start justify-between gap-3">
          {/* <div className="min-w-0 flex-1">
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <Badge
                  key={`${t}-${idx}`}
                  variant="secondary"
                  className="rounded-md bg-black/45 text-white hover:bg-black/50"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div> */}

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {}}
            className="shrink-0 rounded-xl border-black/10"
            aria-label="Bookmark"
          >
            {/* <Bookmark className={`h-5 w-5 ${influencer.bookmarked ? "fill-black text-black" : "text-black/70"}`} /> */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}