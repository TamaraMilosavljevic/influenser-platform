import InfluencerCard from "@/components/InfluencerCard";
import SearchComponent from "@/components/SearchComponent";
import type { Influencer } from "@/types/influencer.types";

export default function InfluenserList({ influencers }: { influencers: Influencer[] }) {

return (


    <div className="space-y-6">
    
        <p className="pl-3"></p>
            <h1 className="text-4xl font-bold pl-4">Pronađite influensere za saradnju</h1>
        
        <SearchComponent />
    
        <div
            className="
                grid
                grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
                gap-6
                justify-items-center
                mx-auto
                w-full
                max-w-7xl
                bg-backgroud
            "
        >
            
        {influencers.map((influencer) => (
            <InfluencerCard
            key={influencer.userId}
            influencer={influencer}
            />
        ))}

        </div>

    </div>
    
)
}