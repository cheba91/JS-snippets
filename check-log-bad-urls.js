const https = require('https');
const xml2js = require('xml2js');
const fs = require('fs');

const parser = new xml2js.Parser();
const API_KEY = '';//https://developers.google.com/speed/docs/insights/v5/get-started
const SITEMAP_URL = 'https://www.mobilocard.com/sitemap.xml';
const TRESHOLD = 60;

function fetch(url, expectedContentType = 'application/json') {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            if (res.statusCode !== 200) {
                reject(new Error(`Received status code ${res.statusCode}`));
                return;
            }

            if (res.headers['content-type'] && !res.headers['content-type'].includes(expectedContentType)) {
                reject(new Error(`Expected ${expectedContentType} but received: ${res.headers['content-type']}`));
                return;
            }

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    if (expectedContentType === 'application/json') {
                        const jsonResponse = JSON.parse(data);
                        resolve(jsonResponse);
                    } else {
                        resolve(data);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function getSitemapUrls(sitemapUrl) {
    const response = await fetch(sitemapUrl, 'application/rss+xml');
    const parsed = await parser.parseStringPromise(response);
    const urls = parsed.urlset.url.map(url => url.loc[0]);
    return urls;
}

async function getPageSpeedScore(url) {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url.trim())}&key=${API_KEY}&strategy=mobile&category=performance`;
    const jsonResponse = await fetch(apiUrl);
    return {
        "mobilescore": jsonResponse.lighthouseResult.categories.performance.score * 100,
    };
}

(async () => {
    const sitemapUrl = SITEMAP_URL;
    const tresh = TRESHOLD;

    const urls = await getSitemapUrls(sitemapUrl);

    // Ensure the output files are empty or create them if they don't exist
    fs.writeFileSync('results.txt', '', 'utf8');
    fs.writeFileSync('lowscores.txt', '', 'utf8');
    fs.writeFileSync('errorurls.txt', '', 'utf8');

    for (let url of urls) {
        try {
            const score = await getPageSpeedScore(url);
            const resultString = `URL:${url.trim()}    MPS:${score.mobilescore}\n`;
            console.log(resultString);
            fs.appendFileSync('results.txt', resultString, 'utf8');

            if (score.mobilescore < tresh) {
                fs.appendFileSync('lowscores.txt', resultString, 'utf8');
            }

        } catch (err) {
            console.error(`Error processing sitemap or URL:`, err.message);
            fs.appendFileSync('errorurls.txt', url, 'utf8');
        }
    }


})();
/*
npm init -y
npm install axios xml2js
node checker.js
*/
