import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"

export default function DashboardPage({courses}){
    console.log(courses)
    return(
        <Layout title="User Dashboard">
            <h1>Dashboard</h1>
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