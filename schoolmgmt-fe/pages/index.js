import Layout from '@/components/Layout'
import Link from 'next/link'
import CourseItem from '@/components/CourseItem'
import {API_URL} from '@/config/index'

export default function Home({result}) {
  return (
    <Layout>
      <h1>Available Courses</h1>
      {result.length === 0 && <h3>No courses available</h3>}
      {result.slice(0,3).map((course) => (
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
  const res = await fetch(`${API_URL}/api/courses`)
  return (
    {
      props: {
        result: await res.json(),
        revalidate: 1
      }
    }
  )
}