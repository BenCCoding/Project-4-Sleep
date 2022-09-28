import tokenService from "./tokenService";

const BASE_URL = "/api/posts";

// This is where we create any of the fetch calls the communicate with the routes
// in /api/routes (Routes folder => posts

export function create(post) {
  return fetch(BASE_URL, {
    method: "POST",
    body: post,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json(); // res.ok will be try if the http statusCode in the response is anything in the 200's
    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  });
}