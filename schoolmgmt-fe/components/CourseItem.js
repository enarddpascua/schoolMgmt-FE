import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/CourseItem.module.css'

export default function CourseItem({course}){
    return(
        <div className={styles.course}>
            <div className={styles.img}>
                <Image src={course.image ? course.image : '/images/courseDefault.png'} 
                width={170} height={100}/>
            </div>
        <div className={styles.info}>
            <h3>{course.course_name}</h3>
        </div>
        <div className={styles.link}>
            <Link href={`/courses/${course.course_code}`}>
                <a className='btn'>Details</a>
            </Link>
        </div>
        </div>
    )
}