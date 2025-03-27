import axios from 'axios';

export async function getYouTubeLiveData(channelId: string, apiKey: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching YouTube Live Data:", error);
        throw error;
    }
}

export async function getYouTubeLiveStats(channelId: string, apiKey: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching YouTube Live Data:", error);
        throw error;
    }
} 