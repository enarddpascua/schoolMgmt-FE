import Layout from '@/components/Layout'
import CourseItem from '@/components/CourseItem'
import {API_URL} from '@/config/index'

export default function SearchPage({result}) {
 
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

export async function getServerSideProps({query: {term}}){
    const qs = require('qs');
    const query = qs.stringify({
        filters:{
            $or:[
            {
                course_name:{
                    $contains: term
                },
            },
            {
                description:{
                    $contains: term
                },
            },
            {
                course_code:{
                    $contains: term
                }
            },
            {
                possible_career:{
                    $contains: term
                }
            }
        ],
        },
        populate: '*',
        pagination:{
            pageSize: 10,
            page: 1,
        },
        locale:['en']
    })
  const res = await fetch(`${API_URL}/api/courses?${query}`)
  const courses = await res.json()
  return (
    {
      props: {
        result: courses.data,
      }
    }
  )
}