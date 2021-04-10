import requests
import json
import sys
from bs4 import BeautifulSoup

productUrl = sys.argv[1]
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'}

s = requests.Session()
res = s.get(productUrl, headers=headers)

soup = BeautifulSoup(res.text, "html.parser")

data = soup.find_all("script", type="application/ld+json")[1].encode_contents()

print(json.dumps(json.loads(data)))

sys.stdout.flush()  # <---- Important for node to work with python
