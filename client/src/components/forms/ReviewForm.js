import { useState } from "react";
import { Grid,  TextField, FormControl, FormLabel, Select, MenuItem, Button } from "@mui/material";
import { TextareaAutosize } from '@mui/base'

const ReviewForm = () => {

  const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormValues({ ...formValues, [name]: value, });
  };

  const submitHandler = (event) => { event.preventDefault(); };

  return (
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
      <Button disabled={loadingCourseReview} variant="contained" color="primary" type="submit">Submit</Button>
    </Grid>
   </form>
  );
};
export default ReviewForm;

{/*
<Form onSubmit={submitHandler}>
  <Form.Group controlId='rating'>
    <Form.Label>Rating</Form.Label>
    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
      <option value=''>Select...</option>
      <option value='1'>1 - Poor</option>
      <option value='2'>2 - Fair</option>
      <option value='3'>3 - Good</option>
      <option value='4'>4 - Very Good</option>
      <option value='5'>5 - Excellent</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId='comment'>
    <Form.Label>Comment</Form.Label>
    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control> 
  </Form.Group>
  <Button disabled={loadingCourseReview} type='submit' variant='primary'>Submit</Button>
</Form>
*/}