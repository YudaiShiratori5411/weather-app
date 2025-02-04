import axios from 'axios';

// 型定義
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

// 5日間予報用の型定義
interface ForecastData {
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
      };
      weather: {
        main: string;
        description: string;
        icon: string;
      }[];
      dt_txt: string;
    }[];
    city: {
      name: string;
    };
  }

// APIキーの設定
const API_KEY = '53ba78a2826750260f5b018e945dd7b2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 天気を取得する関数
export async function getWeather(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ja`);
    return response.data;
  } catch (error) {
    console.error('エラーが発生しました:', error);
    throw error;
  }
}

// 5日間予報を取得する関数
export async function getForecast(city: string): Promise<ForecastData> {
  try {
    const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
    );
    return response.data;
  } catch (error) {
    console.error('予報の取得に失敗しました:', error);
    throw error;
  }
}

// 使用例
async function main() {
  try {
    const weatherData = await getWeather('Mito');

    console.log('都市:', weatherData.name);
    console.log('気温:', weatherData.main.temp, '°C');
    console.log('体感温度:', weatherData.main.feels_like, '°C');
    console.log('湿度:', weatherData.main.humidity, '%');
    console.log('天気:', weatherData.weather[0].description);
    console.log('風速:', weatherData.wind.speed, 'm/s');
  } catch (error) {
    console.error('天気の取得に失敗しました');
  }
}

// エントリーポイントとして実行する場合のみmain()を呼び出す
if (require.main === module) {
    main();
  }