import Head from "next/head";
import Header from "../components/Header";
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
            <Head>
                <title>
                    {question.title} | Questanda
                </title>
                <meta
                    name="description"
                    content={question.answer}
                    key="desc"
                />
                <meta property="og:title" content={question.title} />
                <meta
                    property="og:description"
                    content={question.answer}
                />
                <meta
                    property="og:image"
                    content="https://www.questanda.com/logo.png"
                />
            </Head>
            <Header />
            <h1>{question.title}</h1>
            <pre>{question.answer}</pre>
        </div>)
}