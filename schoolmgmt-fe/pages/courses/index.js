import Layout from '@/components/Layout'
import CourseItem from '@/components/CourseItem'
import {API_URL, PER_PAGE} from '@/config/index'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

export default function CoursePage({result, pagination, page}) {
 const {user} = useContext(AuthContext)
  return (
    <Layout>
      <h1>Courses</h1>
      {user ? (
      <>
        <Link href="/courses/add">
          <a>Add Course</a>
        </Link>
      </>
      ) : <></>}
     
      {result.length === 0 && <h3>No courses available</h3>}
      {result.map((course) => (
        <CourseItem key={course.id} course={course}/>
      ))}

     <Pagination page={page} total={pagination.total}/>
    </Layout>
  )
}

export async function getServerSideProps({query: {page=1}}){
  //calculate start page
  const start = +page === 1 ? 0 : (+page -1) * PER_PAGE

  //fetch courses
  const courseRes = await fetch(`${API_URL}/api/courses?populate=*&pagination[limit]=${PER_PAGE}
  &pagination[start]=${start}`)
  const courses = await courseRes.json()
  console.log(courses.data)
  return (
    {
      props: {
        result: courses.data,
        pagination: courses.meta.pagination,
        page
      }
    }
  )
}