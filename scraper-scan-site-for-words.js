const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');
const fs = require('fs');

const liveDomain = '';
const stagingDomain = '';
const sitemapLink = `${liveDomain}/sitemap.xml`;
const targetWords = ['', ''];

const foundUrls = [];

const fetchSitemap = async (sitemapUrl) => {
  try {
    const { data } = await axios.get(sitemapUrl);
    return data;
  } catch (error) {
    console.error(`Error fetching sitemap: ${error}`);
  }
};

const parseSitemap = async (sitemapXml) => {
  const parser = new xml2js.Parser();
  try {
    const result = await parser.parseStringPromise(sitemapXml);
    const urls = result.urlset.url.map((url) => url.loc[0].trim());
    return urls;
  } catch (error) {
    console.error(`Error parsing sitemap XML: ${error}`);
  }
};

const scrapePage = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const bodyText = $('body').text();
    const hasTargetWord = targetWords.some((word) => bodyText.includes(word));

    if (hasTargetWord) {
      foundUrls.push(url);
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
};

const startScraping = async (sitemapUrl) => {
  const sitemapXml = await fetchSitemap(sitemapUrl);
  const urls = await parseSitemap(sitemapXml);
  const stagingUrls = urls.map((url) => url.replace(liveDomain, stagingDomain));
  const scrapePromises = stagingUrls.map((url) => scrapePage(url));
  await Promise.all(scrapePromises);

  console.log('Found URLs:', foundUrls);

  const content = foundUrls.join('\n');
  fs.writeFile('foundUrls.txt', content, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Successfully wrote to file');
    }
  });
};

startScraping(sitemapLink);
