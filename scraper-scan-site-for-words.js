const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');
const fs = require('fs');

const liveDomain = '';
const stagingDomain = '';
const targetWords = ['fs-cmsslider-element', 'fs-cmsslider-element'];
const templatePages = []; // Template page slugs to scan only once
const sitemapLink = `${liveDomain}/sitemap.xml`;

const resultUrls = [];

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
  const seenTemplates = new Set();

  try {
    const result = await parser.parseStringPromise(sitemapXml);
    const urls = [];

    for (const url of result.urlset.url) {
      const loc = url.loc[0].trim();

      // Check if the URL matches any template page
      const templateMatch = templatePages.find((template) => loc.includes(`/${template}/`));

      if (templateMatch) {
        if (!seenTemplates.has(templateMatch)) {
          urls.push(loc);
          seenTemplates.add(templateMatch);
        }
      } else urls.push(loc);
    }

    return urls;
  } catch (error) {
    console.error(`Error parsing sitemap XML: ${error}`);
    return [];
  }
};

const scrapePage = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const bodyText = $('body').text();
    // const isMatch = targetWords.some((word) => bodyText.includes(word));
      const isMatch = targetWords.some((word) => $(`[class^="${word}"]`).length > 0);
    // const isMatch = targetWords.some((word) => $(`form`).length > 0);
    // const isMatch = targetWords.some((word) => $(`.${word}`).length > 0); // Class selector
    // const isMatch = targetWords.some((word) => $(`${[word]}`).length > 0); // Tag selector
    // Select a script tag with the word win src
    // const isMatch = targetWords.some((word) => $(`iframe[src*="${word}"]`).length > 0);

    if (isMatch) {
      resultUrls.push(url);
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

  //   console.log('Found URLs:', resultUrls);

  const content = resultUrls.join('\n');
  fs.writeFile('resultUrls.txt', content, (err) => {
    if (err) console.error('Error writing to file:', err);
    else console.log('Successfully wrote to file');
  });
};

startScraping(sitemapLink);
