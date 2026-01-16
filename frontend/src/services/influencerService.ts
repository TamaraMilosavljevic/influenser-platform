import { getAccessToken } from "@/auth/authStore";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getAllInfluencers(): Promise<any[]> {

    const token = getAccessToken();

    const res = await fetch(`${apiUrl}/influencers`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch influencers");
    return res.json();
}