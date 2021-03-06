import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"

export default function DashboardPage({courses}){
    return(
        <Layout title="User Dashboard">
            <h1>Dashboard</h1>
            <h3>iiskor kaba?</h3>
            <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
            </p>
            <h3>Okay</h3>
            <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
            </p>
        </Layout>
    )
}

export async function getServerSideProps({req}){
    const {token} = parseCookies(req)
    const res = await fetch(`${API_URL}/api/course/me`,{
        method: 'GET',
        headers:{
                Authorization: `Bearer ${token}`
        }
    })
    const courses = await res.json()
    return{
        props:{
            courses
        }
    }
}