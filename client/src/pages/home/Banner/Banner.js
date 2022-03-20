import './Banner.css'

const banner = () => {
 return (
  <div className="banner">
    <div className="banner__image">
      <img
        src="https://img-c.udemycdn.com/notices/web_banner/image_udlite/92a752b4-2f5b-45c7-a451-d84b32ccb0cf.jpg"
        alt="banner"
      />
      <div className="banner__text">
        <h1>Welcome to Online Uni.</h1>
        <p>
          Are you ready to learn?.
          <a href="https://blog.udemy.com/bonus-lessons/"> Learn more.</a>
        </p>
      </div>
    </div>
  </div>
 );
}

export default banner