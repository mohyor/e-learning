import { useEffect, useState } from 'react'
import { Form, Input, Select, Button, Row, Col, Divider } from 'antd';


const formItemLayout = {
 labelCol: { xs: { span: 24, }, sm: { span: 8 }, },
 wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
}

const tailFormItemLayout = {
 wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 }}
}

const ReviewForm = () => {
 const[form] = Form.useForm()

 return (
  <Form {...formItemLayout} form={form} name='review'>
   <Form.Item name='rating' label='Rating' rules={[{ required: true, message: 'Kindly rate your learning experience.'}]}>
    <Select>
     <Option value=''>Select..</Option>
     <Option value='1'>1 - Poor</Option>
     <Option value='2'>2 - Fair</Option>
     <Option value='3'>3 - Good</Option>
     <Option value='4'>4 - Very Good</Option>
     <Option value='5'>5 - Excellent</Option>
    </Select>
   </Form.Item>
   <Form.Item name='comment' label='Comment' rules={[{ required: true, message: 'Kindly comment on the course.' }]}>
    <Input.TextArea showCount maxlength={500} />
   </Form.Item>
   <Form.Item {...tailFormItemLayout}>
     <Button type='primary' htmlType='submit'>Submit</Button>
   </Form.Item>
  </Form>
 )
}

export default ReviewForm

/*
    <form onSubmit={submitHandler}>
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
      <FormControl>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value=''>Select...</MenuItem>
          <MenuItem value='1'>1 - Poor</MenuItem>
          <MenuItem value='2'>2 - Fair</MenuItem>
          <MenuItem value='3'>3 - Good</MenuItem>
          <MenuItem value='4'>4 - Very Good</MenuItem>
          <MenuItem value='5'>5 - Excellent</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item>
      <TextareaAutosize placeholder='Enter your review' style={{ width: 200 }} onChange={(e) => setComment(e.target.value)}/>
    </Grid>
      <ReviewButton disabled={loadingCourseReview} variant="contained" color="primary" type="submit">Submit</ReviewButton>
    </Grid>
  </form>
*/
