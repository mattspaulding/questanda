const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("questanda");

  switch (req.method) {
    case "POST":
      const body = JSON.parse(req.body)
      const { title, ip } = body

      let bodyObject = { title };

      bodyObject.slug = slugify(bodyObject.title)

      bodyObject.answer = await generateAnswer(bodyObject.title)

      bodyObject.date = new Date(Date.now())
      bodyObject.ip = ip;
      // await db.collection("questions").createIndex({slug: 1} , {unique:true})
      // await db.collection("questions").createIndex({title: 1 }, {unique:true})

      try {
        let myPost = await db.collection("questions").insertOne(bodyObject);
      } catch (e) {

        if (e.code == 11000) {
          res.status(200).json({ slug: bodyObject.slug })
          break;
        }
      }

      res.status(200).json({ slug: bodyObject.slug })
      break;
  }
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

async function generateAnswer(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });


  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
}