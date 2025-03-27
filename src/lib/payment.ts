import axios from 'axios';

export async function processCryptoPayment(amount: number, currency: string, userId: string) {
    const url = "https://api.commerce.coinbase.com/charges";
    const payload = {
        name: "NextWin Entry",
        description: "Fantasy Sports Competition Entry",
        local_price: { amount, currency },
        pricing_type: "fixed_price",
        metadata: { userId }
    };

    try {
        const response = await axios.post(url, payload, {
            headers: { 
                "X-CC-Api-Key": process.env.COINBASE_API_KEY || "",
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Crypto Payment Failed:", error);
        throw error;
    }
} 