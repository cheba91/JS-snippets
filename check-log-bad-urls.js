const https = require('https');
const xml2js = require('xml2js');
const fs = require('fs');

const parser = new xml2js.Parser();
const API_KEY = ''; //https://developers.google.com/speed/docs/insights/v5/get-started;
const BASE_URL = '';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const TRESHOLD = 60;

const fetch = (url, expectedContentType = 'application/json') => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        if (res.statusCode !== 200) return reject(new Error(`Received status code ${res.statusCode}`));
        if (res.headers['content-type'] && !res.headers['content-type'].includes(expectedContentType))
          return reject(new Error(`Expected ${expectedContentType} but received: ${res.headers['content-type']}`));

        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            if (expectedContentType === 'application/json') {
              const jsonResponse = JSON.parse(data);
              resolve(jsonResponse);
            } else resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (err) => reject(err));
  });
};

const getSitemapUrls = async (sitemapUrl) => {
  const response = await fetch(sitemapUrl, 'application/rss+xml');
  const parsed = await parser.parseStringPromise(response);
  const urls = parsed.urlset.url.map((url) => url.loc[0]);
  return urls;
};

const getPageSpeedScore = async (url) => {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url.trim()
  )}&key=${API_KEY}&strategy=mobile&category=performance`;
  const jsonResponse = await fetch(apiUrl);
  return jsonResponse.lighthouseResult.categories.performance.score * 100;
};

(async () => {
  const urls = await getSitemapUrls(SITEMAP_URL);
  let completedCount = 0;
  const errorUrls = [];
  const allScores = [];
  const lowScores = [];

  // Ensure the output files are empty or create them if they don't exist
  fs.writeFileSync('results.txt', '', 'utf8');

  for (let url of urls) {
    try {
      const score = await getPageSpeedScore(url);
      const resultString = `${url.trim()}  score:${Math.round(score)}`;
      allScores.push(score);
      if (score < TRESHOLD) lowScores.push(resultString);
      console.log(resultString);
    } catch (err) {
      console.error(`Error processing sitemap or URL:`, err.message);
      errorUrls.push(url);
    }
    completedCount++;

    // Write file on last iteration
    if (completedCount === urls.length) {
      const finalString = `Results for ${BASE_URL}:
Total URLs scanned: ${urls.length}
Average score for all URLs: ${Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)}

${errorUrls.length} URLs returned error:
${errorUrls.join('\n')}

${allScores.filter((score) => score < TRESHOLD).length} URLs with score below ${TRESHOLD}:
${lowScores.join('\n')}`;

      fs.appendFileSync('results.txt', finalString, 'utf8');
    }
  }
})();
/*
npm init -y
npm install axios xml2js
node checker.js
*/
