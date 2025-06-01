export interface weatherData {
    location: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    minTemp: number;
    maxTemp: number;
    icon: string;
    timestamp: number;
    rainChance: number;
    windSpeed: number;
}
export interface forecastData {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
}
export interface newsData {
    title: string;
    description: string;
    urlToImage: string;
    source: {
        name: string;
    };
    publishedAt: string;
    url: string;
}

