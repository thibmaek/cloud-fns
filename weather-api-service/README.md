# weather-api-service

Proxy API for various weather services:

## Precipation alerts

Via Buienalarm & Buienradar

e.g `GET http://localhost:3000/dev/precipation-alerts/buienalarm?lat=1&lon=3`:

```json
{
  "data": {
    "bounds": {
      "E": 10.856429,
      "N": 55.973602,
      "S": 48.895302,
      "W": 0
    },
    "delta": 300,
    "grid": {
      "x": 240,
      "y": 540
    },
    "levels": {
      "heavy": 2.5,
      "light": 0.25,
      "moderate": 1
    },
    "precip": [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "source": "nl",
    "start": 1668004200,
    "start_human": "15:30",
    "success": true,
    "temp": 14
  }
}
```
