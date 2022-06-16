import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/CourseItem.module.css'

export default function CourseItem({course}){
    return(
        <div className={styles.course}>
            <div className={styles.img}>
                <Image src={course.attributes.image.data ? 
                course.attributes.image.data.attributes.
                formats.thumbnail.url : '/images/courseDefault.png'} 
                width={170} height={100}/>
            </div>
        <div className={styles.info}>
            <span>
                {course.attributes.course_code}
            </span>
            <h3>{course.attributes.course_name}</h3>
        </div>
        <div className={styles.link}>
            <Link href={`/courses/${course.attributes.slug}`}>
                <a className='btn'>Details</a>
            </Link>
        </div>
        </div>
    )
}