import { useState } from 'react';
import "antd/dist/antd.css";
import { Modal, Button } from 'antd';
import CourseCard from '../../components/cards/CourseCard'

export default function App() {

const [isModalVisible, setIsModalVisible] = useState(false);

return (
  <>
   <Button type="secondary" onClick={() => { setIsModalVisible(true); }}>Start Learning</Button>
   <Modal title="Modal Title" visible={isModalVisible} onOk={() => { setIsModalVisible(false); }} onCancel={() => { setIsModalVisible(false); }}>
    <CourseCard course={course} />
   </Modal>
  </>
 );
}
