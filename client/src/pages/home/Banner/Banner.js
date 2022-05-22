import './Banner.css'

const banner = () => {
 return (
  <div className="banner">
    <div className="banner__image">
      <img
        src="https://img-c.udemycdn.com/notices/web_banner/slide_1_image_udlite/2b839b39-1aa2-4145-8d3e-300297a6cd16.jpg"
        alt="banner"
      />
      <div className="banner__text">
        <h1>Welcome to Educate!</h1>
        <p><a href="https://blog.udemy.com/bonus-lessons/">Are you ready to learn?</a></p>
      </div>
    </div>
  </div>
 );
}

export default banner