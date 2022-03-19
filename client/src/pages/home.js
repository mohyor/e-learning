
import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'
//const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'


const Home = ({ courses }) => {
 return (
  <>
   <h1 className="jumbotron text-center bg-primary square"> Final Year Project</h1>
   <div className='container-fluid'>
     {/*<div className='row'>{courses.map((course) => (<div key={course._id} className='col-md-4'><CourseCard course={course} /></div>))}</div>*/} 
     This page will be the homepage with courses description etc.
   </div> 
  </>
 )
}

/*
export async function getServerSideProps() { 
 const { data } = await axios.get(`${process.env.API}/courses`)
 return { props: { courses: data, } }
}

export async function getServerSideProps() {
 const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=30&playlistId=PLUl4u3cNGP63LmSVIVzy584-ZbjbJ-Y63&key=${process.env.GOOGLE_CLOUD_API_KEY}`)
 const data = await res.json()
 return { props: { data }}
}
*/

export default Home
