import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

export default function Page({ ip }) {
  const [showAskForm, setShowAskForm] = useState(true)
  const router = useRouter();
  async function onSubmit(event) {
    setShowAskForm(false)
    event.preventDefault()

    const formData = new FormData(event.target)
    const form_values = Object.fromEntries(formData);
    const title = form_values.title;
    const body = { title, ip }
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
        <title>
          Questanda | Ask anything.
        </title>
        <meta property="og:title" content="Questanda | Ask anything." />
        <meta
          property="og:image"
          content="https://www.questanda.com/logo.png"
        />
      </Head>
      <div>
        <div>
          <h1>Questanda</h1>
          <p>Ask anything.</p>
        </div>
        {showAskForm ?
          <form id="ask-form" onSubmit={onSubmit}>
            <input type="text" name="title" />
            <button type="submit">Submit</button>
          </form> : null}
      </div>
    </div>

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