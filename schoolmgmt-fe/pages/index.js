import Layout from '@/components/Layout'
import Link from 'next/link'
import CourseItem from '@/components/CourseItem'
import {API_URL} from '@/config/index'

export default function Home({result}) {
  return (
    <Layout>
      <h1>Available Courses</h1>
      {result.length === 0 && <h3>No courses available</h3>}
      {result.map((course) => (
        <CourseItem key={course.id} course={course}/>
      ))}
      {result.length > 0 && (
        <Link href='/courses'>
          <a className='bnt-secondary'>View All Courses</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/courses?populate=*&pagination[limit]=3`)
  const course = await res.json()
  return (
    {
      props: {
        result: course.data,
        revalidate: 1
      }
    }
  )
}