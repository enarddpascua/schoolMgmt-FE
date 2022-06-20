import Layout from "@/components/Layout";
import Modal from '@/components/Modal'
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import {FaImage} from 'react-icons/fa'

export default function EditCoursePage({result}){
    const {course_name, course_code, description, possible_career,slug} = result.data.attributes
    const [values, setValues] = useState({
        course_name: course_name,
        description: description,
        course_code: course_code,
        possible_career: possible_career
    })
    const [showModal, setShowModal] = useState(false)
    const [imagePreview, setImagePreview] = useState(result.data.attributes.image.data ? 
        result.data.attributes.image.data.attributes.formats.thumbnail.url : null)

    const imageUploaded = async(e) =>{
        const res = await fetch(`${API_URL}/api/courses/${result.data.id}?populate=*`)
        const data = await res.json()
        setImagePreview(data.data.attributes.image.data ? 
            data.data.attributes.image.data.attributes.formats.thumbnail.url : null)
        setShowModal(false)
    }

    const router = useRouter()
    const handleSubmit = async(e) => {
        e.preventDefault()

        //Validation
        const hasEmptyFields = Object.values(values).some((element) => element === '')
        if(hasEmptyFields){
           toast.error("Please fill in all fields")
        }
        
        const res = await fetch(`${API_URL}/api/courses/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:values})
        })
        if(!res.ok){
            toast.error("Something went wrong")
        }else{
            const course = await res.json()
            router.push(`/courses/${course.data.attributes.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    return(
        <Layout title="Add course">
            <Link href={`/courses/${slug}`}>
                <a>{'<'} Go Back</a>
            </Link>
            <h1>Edit Course</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Course Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="course_name" 
                            value={values.course_name} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='code'>Course Code</label>
                        <input
                        type='text'
                        name='course_code'
                        id='code'
                        value={values.course_code}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor='possibleCareer'>Possible Career Path</label>
                        <textarea
                        type='text'
                        name='possible_career'
                        id='possibleCareer'
                        value={values.possible_career}
                        onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <input type="submit" value="Update Course" className="btn" />
             </div>
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170}/>
            ) : <div>
                    <p>No image uploaded</p>
                </div>}
            <div>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                    <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload courseId={result.data.id} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({query: {id}}){
    const res = await fetch(`${API_URL}/api/courses/${id}?populate=*`)
    const result = await res.json()
 
    return{
        props:{
            result
        }
    }
}