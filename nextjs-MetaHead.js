import Head from 'next/head';

export default function Meta({
   title = 'Default page title', //Max 60chars
   description = 'Default page description', //Max 160chars
   slug = '/home', // current slug
   image = '/favicon.ico', // link to image of current page
   ogType = 'post', // type of current page
}) {
   const staticData = {
      baseUrl: 'https://my-site.com',
      companyName: 'Company Name',
      twitterHandle: '@twitterHandle',
   };
   return (
      <Head>
         {/* //basic metadata */}
         <title>{title}</title>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="description" content={description} />
         {/* //twitter metadata */}
         <meta name="twitter:card" content="summary" />
         <meta name="twitter:site" content={staticData.twitterHandle} />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={staticData.baseUrl + image} />
         {/* //canonical link */}
         <link rel="canonical" href={staticData.baseUrl + slug} />
         {/* //open graph metadata */}
         <meta property="og:locale" content="en_US" />
         <meta property="og:site_name" content={staticData.companyName} />
         <meta property="og:type" content={ogType} />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={staticData.baseUrl + image} />
         <meta property="og:url" content={staticData.baseUrl + slug} />
      </Head>
   );
}
