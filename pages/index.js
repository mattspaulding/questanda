import { useRouter } from "next/router";

export default function Page({ ip }) {
  const router = useRouter();
  async function onSubmit(event) {
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
    <form onSubmit={onSubmit}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
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