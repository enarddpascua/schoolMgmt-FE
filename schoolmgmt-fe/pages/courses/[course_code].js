import Link from "next/link"
import Image from "next/image"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Course.module.css'

export default function CourseDetails({result}){
    const deleteCourse = (e) => {
        console.log('delete')
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
                <h1>{result.course_name}</h1>
                {result.image && (
                    <div className={styles.image}>
                        <Image src={result.image} width={960} height={600}/>
                    </div>
                )}
                <h3>Lorem ipsum: </h3>
                <p>child of lorem</p>
                <h3>Description: </h3>
                <p>child of description</p>
                <h3>Campus:</h3>
                <p>child of campus</p>

                <Link href='/courses'>
                    <a className={styles.back}>{'<'} Go Back</a>
                </Link>
            </div>
        </Layout>    
    )
}

export async function getServerSideProps({query: {course_code}}){
    const res = await fetch(`${API_URL}/api/courses/${course_code}`)
    const course = await res.json()
    return {
        props:{
            result: course[0]
        }
    }
}