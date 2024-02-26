const axios = require('axios');
const API_KEY = process.env.MORALIS_API_KEY;

exports.handler = async (event, context) => {
    try {
        const { address,tokenId } = event.queryStringParameters;
        const apiUrl = `https://deep-index.moralis.io/api/v2.2/nft/${address}/${tokenId}`

        const response = await axios.get(apiUrl, {
            headers: {
                'X-API-Key': API_KEY,
                'Accept': 'application/json'
            }
        });

        const data = response.data;

        if (response.status !== 200) {
            throw new Error(`Failed to fetch token data: ${data.message || response.statusText}`);
        }


        return {
            statusCode: 200,
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
