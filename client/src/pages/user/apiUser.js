
export const userCourses = async (userId, token) => {
  let response = await fetch(`api/user-courses/${userId}`, { method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` }})
  if (response.statusCode === 200) {
    let json = await response.json()
    return json 
  } else { throw new Error(response.status)}
}
