import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPage(){
    const [values, setValues] = useState({
        course_name:"",
        description: "",
        course_code: "",
        possible_career: ""
    })
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
            <Link href="/courses">
                <a>{'<'} Go Back</a>
            </Link>
            <h1>Add New Course</h1>
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
                    <input type="submit" value="Add Course" className="btn" />
             </div>
            </form>
        </Layout>
    )
}