# VRT Radio API mapper

Maps REST endpoints for VRT radio stations ([https://services.vrt.be](https://services.vrt.be)) to a nicer output (for use in other services, like Home Assistant REST sensor):

```json
{
  "current": {
    "artist": "LETHERETTE",
    "channel": {"code":"41"},
    "start": "2018-04-24T21:02:01.243Z",
    "stop": "2018-04-24T21:04:13.243Z",
    "title": "Turn On",
    "trackName": "LETHERETTE - Turn On",
    "type": "NOW"
  },
  "previous": {
    "artist": "DIMENSION",
    "channel": {"code":"41"},
    "start": "2018-04-24T20:51:59.914Z",
    "stop": "2018-04-24T20:56:22.914Z",
    "title": "Techno",
    "trackName": "DIMENSION - Techno",
    "type": "PREVIOUS"
  },
  "timestamp":"2018-04-24T21:02:52.234Z",
  "program": "Happy Sunday"
}
```
