import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.target)
    const form_values = Object.fromEntries(formData);
 
    const response = await fetch('/api/ask', {
      method: 'POST',
      body: form_values.title,
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