
exports.handler = async (event) => {
    const city = event.queryStringParameters?.city;

    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "City name is required" })
        };
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Unable to fetch weather data" })
        };
    }
};
