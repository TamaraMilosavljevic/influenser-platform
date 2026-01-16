import InfluencerCard from "@/components/InfluencerCard";
import SearchComponent from "@/components/SearchComponent";
import { getAllInfluencers } from "@/services/influencerService";

export default async function InfluenserList() {

    var influencers = await getAllInfluencers();

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

        {/* {influencers.map((influencer: any) => (
        <InfluencerCard
            key={influencer.id}
            influencer={influencer}
        />
        ))} */}

        </div>

    </div>
    
)
}