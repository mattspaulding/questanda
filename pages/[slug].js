import Header from "../components/Header/header";
import clientPromise from "../lib/mongodb";
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {

    try {
        const client = await clientPromise;
        const db = client.db("questanda");

        const question = await db
            .collection("questions")
            .findOne({ slug: params.slug });

        if (!question) {
            return {
                redirect: {
                    destination: "/",
                },
            }
        }

        return {
            props: { question: JSON.parse(JSON.stringify(question)) },
        };
    } catch (e) {
        console.error(e);
        return {
            redirect: {
                destination: "/",
            },
        }
    }
}

export default function Page({ question }) {
    return (
        <div>
            <Header />
            <h1>Question</h1>
            <p>{question.title}</p>
            <h2>Answer</h2>
            <pre>{question.answer}</pre>
        </div>)
}