import Link from "next/link"
import Image from "next/image"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Course.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'

export default function CourseDetails({result}){
    const router = useRouter()

    const deleteCourse = async (e) => {
        if(confirm('Are you sure?')){
            const res= await fetch(`${API_URL}/api/courses/${result.id}`,{
                method:'DELETE'
            })
        
            const data = await res.json()
            if(!res.ok){
                toast.error(data.message)
            }else{
                router.push('/courses')
            }
        }
    }
    return (
        <Layout>
            <div className={styles.course}>
                <div className={styles.controls}>
                    <Link href={`/courses/edit/${result.id}`}>
                        <a>
                            <FaPencilAlt/> Edit Course
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteCourse}>
                        <FaTimes /> Delete Course
                    </a>
                </div>

                <span>
                    {}
                </span>
                <h1>{result.attributes.course_name}</h1>
                <ToastContainer/>
                <div className={styles.image}>
                    <Image src={result.attributes.image.data ? result.attributes.image.data.
                    attributes.formats.medium.url : '/images/courseDefault.png'} 
                    width={960} height={600}/>
                </div>
                <h3>Possible career paths</h3>
                <p>{result.attributes.possible_career}</p>
                <h3>Description: </h3>
                <p>{result.attributes.description}</p>
                <h3>Course Code</h3>
                <p>{result.attributes.course_code}</p>

                <Link href='/courses'>
                    <a className={styles.back}>{'<'} Go Back</a>
                </Link>
            </div>
        </Layout>    
    )
}

export async function getServerSideProps({query: {slug}}){
    const res = await fetch(`${API_URL}/api/courses?populate=*&filters[slug]=${slug}`)
    const course = await res.json()

    return {
        props:{
            result: course.data[0],
            revalidate: 1
        },
    }
}