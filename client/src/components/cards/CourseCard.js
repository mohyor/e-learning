import { Card } from 'antd';
import { Link } from 'react-router-dom'

const { Meta } = Card
const CourseCard = ({ course }) => {
  const { name, slug, embedId, description, category, instructor } = course
  return (
    <Link to={`/course/${slug}`}>
      <Card hoverable className='mb-4'>
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
          <p>by {instructor.name}</p>
        </a>
        <Meta title={name} />
      </Card>
    </Link>
  )
 }
 
 export default CourseCard 

/**
 * 
 import { Card } from 'antd';

const { Meta } = Card;

ReactDOM.render(
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>,
  mountNode,
);

 * const { Meta } = Card
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
     <p>{description}</p>
     <Badge count={category} style={{ backgroundColor: '#03a9f4' }} className='pb-2 mr-2' />
    </Card>
   </a>
  </Link>
 )
}

export default CourseCard  

//import { Link } from 'react-router-dom'
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
//import { CardActionArea } from '@mui/material';

const CourseCard = ({ course }) => {
  const { name, slug, embedId, description, category, instructor } = course
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea component={Link} to={`/course/${slug}`}>
        <CardContent>
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
          <Typography gutterBottom variant="h5">{name}</Typography>
          <p>by {instructor.name}</p>
          <Typography variant="body2" color='text.secondary'>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CourseCard 
 */