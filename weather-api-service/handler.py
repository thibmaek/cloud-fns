import json
import requests
import random

def main(evt, ctx):
  params = evt['queryStringParameters']
  svc_type = evt['pathParameters']['type']

  if params is None:
    return {
      'statusCode': 400,
      'body': 'No parameters provided'
    }

  if 'lat' not in params:
    return {
      'statusCode': 400,
      'body': 'No latitude provided'
    }

  if 'lon' not in params:
    return {
      'statusCode': 400,
      'body': 'No longitude provided'
    }

  lat = round(float(params['lat']), 2)
  lon = round(float(params['lon']), 2)

  url = get_url(lat, lon, svc_type)

  data_request = requests.get(url).text
  data_res = json.loads(data_request.replace('\r\n',' '))
  data = {"data": data_res}

  response = { "statusCode": 200, "body": json.dumps(data) }
  return response

def get_url(lat, lon, svc_type):
  random_int = random.randint(0,999999999999999)
  buienradar_url = f"https://gpsgadget.buienradar.nl/data/raintext?lat={lat}&lon={lon}&c={random_int}"

  if svc_type == 'buienradar':
    return buienradar_url
  elif svc_type == 'buienalarm':
    return f"https://cdn-secure.buienalarm.nl/api/3.4/forecast.php?lat={lat}&lon={lon}&region=nl&unit=mm%2Fu&c={random_int}"
  else:
    return buienradar_url
