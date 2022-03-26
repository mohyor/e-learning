import React from 'react'
import PropTypes from 'prop-types'

const CourseRoute = ({ embedId }) => {
  return (
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
 )
}

CourseRoute.PropTypes = { embedId: PropTypes.string.isRequired }

     {/*}
     <iframe width="560" height="315" src="https://www.youtube.com/embed/KlVHqq38KJU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/aKTOS0Nrlug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/oOya3cFmAMc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/QTdJiG7mV40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

     
     <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL8dPuuaLjXtO85Sl24rSiVQ93q7vcntNF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL8dPuuaLjXtNdTKZkV_GiIYXpV9w4WxbX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     
    </div>*/}

export default CourseRoute