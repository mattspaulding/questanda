import clientPromise from "../lib/mongodb";
function generateSiteMap(questions) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.questanda.com</loc>
     </url>
     ${questions
            .map((question) => {
                return `
       <url>
           <loc>${`https://www.questanda.com/${question.slug}`}</loc>
       </url>
     `;
            })
            .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}


export async function getServerSideProps({ res }) {

    try {
        const client = await clientPromise;
        const db = client.db("questanda");
        const questions = await db
            .collection("questions")
            .find({}).toArray();

        // We generate the XML sitemap with the posts data
        const sitemap = generateSiteMap(questions);
        res.setHeader('Content-Type', 'text/xml');
        // we send the XML to the browser
        res.write(sitemap);
        res.end();

        return {
            props: {},
        };
    } catch (e) {
        console.error(e);
    }
}

export default SiteMap;