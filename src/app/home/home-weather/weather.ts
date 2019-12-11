export interface Forecast {
    list: WeatherData[];
}

export interface WeatherData {
    dt: number;
    dt_txt: string;
    main: MainData;
    weather: Weather;
}

export interface MainData {
    humidity: number;
    pressure: number;
    temp: number;
}

export interface Weather {
    main: string;
    icon: string;
    description: string;
}
