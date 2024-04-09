import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Link from "next/link"

export default function Page({ ip }) {
  const [showAskForm, setShowAskForm] = useState(true)
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const form_values = Object.fromEntries(formData);
    const title = form_values.title;
    const body = { title, ip }
    setShowAskForm(false)
    const response = await fetch('/api/ask', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const data = await response.json()
    router.push(data.slug)

  }

  return (
    <div>
      <Head>
        <html lang="en" />
        <title>
          Questanda | Ask anything.
        </title>
        <meta property="og:title" content="Questanda | Ask anything." />
        <meta
          property="og:image"
          content="https://www.questanda.com/logo.png"
        />
      </Head>
      <Header />
      <div className="center">
        <div>
          <div>
            <h1>Questanda</h1>
          </div>
          {showAskForm ? <div>
            <form id="ask-form" onSubmit={onSubmit}>
              <label for="title">Ask anything...</label>
              {/* <input type="text" id="title" name="title" placeholder="Go on... Ask." /> */}
              <textarea required id="title" name="title" placeholder="Go on... Ask." rows="10" cols="30"></textarea>
              <input type="submit" value="Ask" />
            </form>
            <ul>
              <li>
                <Link href="/why-is-the-sky-blue">Why is the sky blue?</Link>
              </li>
              <li>
                <Link href="/is-pluto-a-planet">Is Pluto a planet?</Link>
              </li>
              <li>
                <Link href="/are-bananas-healthy">Are bananas healthy?</Link>
              </li>
            </ul>
          </div> :
            <div>Seeking wisdom...</div>}
        </div>
      </div></div>

  )
}

export async function getServerSideProps({ req }) {
  const forwarded = req.headers["x-forwarded-for"]
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

  return {
    props: {
      ip,
    },
  }
}