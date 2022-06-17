import Link from 'next/link'
import {PER_PAGE} from '@/config/index'

export default function Pagination({total, page}){

    const lastPage = Math.ceil(total / PER_PAGE)

    return(
        <>
    {+page > 1 && (
            <Link href={`/courses?page=${+page-1}`}>
            <a className='btn-secondary'>Prev</a>
            </Link>
        )}

      {+page < lastPage && (
        <Link href={`/courses?page=${+page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
        </>
    )
}