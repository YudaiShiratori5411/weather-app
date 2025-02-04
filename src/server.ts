import express from 'express';
import path from 'path';
import { getWeather } from './index';
import { getForecast } from './index';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/weather/:city', async (req, res) => {
    try {
        const weatherData = await getWeather(`${req.params.city},jp`);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: '天気データの取得に失敗しました' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/api/forecast/:city', async (req, res) => {
  try {
    const forecastData = await getForecast(`${req.params.city},jp`);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: '予報データの取得に失敗しました' });
  }
});