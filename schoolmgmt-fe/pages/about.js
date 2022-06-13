import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AboutPage (){
    return(
        <Layout title={"About Ecolab"} description={"About page of Ecolab"} keywords={"About Ecolab"}>
            <p>About Page</p>
            <Link href="/">Home</Link>
        </Layout>
    )
}