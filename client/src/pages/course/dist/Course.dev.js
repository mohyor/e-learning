"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _courseActions = require("../../actions/courseActions");

var _reactRouter = require("react-router");

var _SingleCourseJumbotron = _interopRequireDefault(require("../../components/cards/SingleCourseJumbotron"));

var _PreviewModal = _interopRequireDefault(require("../../components/modal/PreviewModal"));

var _SingleCourseLessons = _interopRequireDefault(require("../../components/cards/SingleCourseLessons"));

var _AuthContext = require("../../context/AuthContext");

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Course = function Course(_ref) {
  var match = _ref.match;
  var dispatch = (0, _reactRedux.useDispatch)();
  var courseDetails = (0, _reactRedux.useSelector)(function (state) {
    return state.courseDetails;
  });
  var loading = courseDetails.loading,
      error = courseDetails.error,
      course = courseDetails.course;
  (0, _react.useEffect)(function () {
    dispatch((0, _courseActions.listCourseDetails)(match.params.slug));
  }, [dispatch, match]);
};

var _default = Course;
/*
  const Course = ({ course }) => {

  
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState({})

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const { slug } = router.query

  const checkEnrollment = async => { const { data } = await axios.get(`api/check-enrollment/${course._id}`); setEnrolled(data)}

  useEffect(() => { if (user && course) checkEnrollment()}, [user, course])

  const handleFreeEnrollment = async (e) => {
    e.preventDefault()
    try { 
    if (!user) history.push('/login')
    if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
    setLoading(true)
    const { data } = await axios.post(`/api/free-enrollment/${course._id}`); toast(data.message); setLoading(false)
    } catch (err) { toast('Enrollment failed. Try again'); console.log(err); setLoading(false)}
  }

  return (
    <>
      <SingleCourseJumbotron course={course} showModal={showModal} setShowModal={setShowModal} preview={preview} setPreview={setPreview} user={user} loading={loading}  
      handleFreeEnrollment={handleFreeEnrollment} enrolled={enrolled} setEnrolled={setEnrolled} />
      <PreviewModal showModal={showModal} setShowModal={setShowModal} preview={preview} />
      {course.lessons && (<SingleCourseLessons lessons={course.lessons} setPreview={setPreview} showModal={showModal} setShowModal={setShowModal} />)}
    </>
  ) 
  }
*/

exports["default"] = _default;