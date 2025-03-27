export async function getTwitchLiveData(userId: string, accessToken: string) {
    const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID || "",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Twitch Live Data:", error);
        throw error;
    }
}

export async function getTwitchStreamStats(userId: string, accessToken: string) {
    const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID || "",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching Twitch Data:", error);
        throw error;
    }
} 