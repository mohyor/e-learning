

import { Card, Badge } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card
const CourseCard = ({ course }) => {
 const { name, slug, embedId, description, category, instructor } = course
 return (
  <Link href={`/course/${slug}`}>
   <a>
     <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div> 
    <Card className='mb-4'>
     <h2 className='font-weight-bold'>{name}</h2>
     <p>by {instructor.name}</p>
     <Badge count={category} style={{ backgroundColor: '#03a9f4' }} className='pb-2 mr-2' />
    </Card>
   </a>
  </Link>
 )
}

export default CourseCard  