import Layout from '@/components/Layout'
import CourseItem from '@/components/CourseItem'
import {API_URL} from '@/config/index'

export default function CoursePage({result}) {
  return (
    <Layout>
      <h1>Courses</h1>
      {result.length === 0 && <h3>No courses available</h3>}
      {result.map((course) => (
        <CourseItem key={course.id} course={course}/>
      ))}
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