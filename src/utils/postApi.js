import tokenService from "./tokenService";

const BASE_URL = "/api/posts/";

// This is where we create any of the fetch calls the communicate with the routes
// in /api/routes (Routes folder => posts

export function create(post) {// DONT STRINGIFY, THIS IS A PHOTO POST! (formdata)
    return fetch(BASE_URL, {
      method: "POST",
      body: post,
      headers: {
        "Authorization": "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json(); 
      return res.json().then(response => {
        console.log(response)
        throw new Error(response.err)
      })
    });
  }


export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken() // This grabs thee JWT token out
        // local storage and send its in the header to the server
      }
    })
    .then((res) => {
      if(res.ok) return res.json();
  
      return res.json().then(response => {
        console.log(response)
        throw new Error(response.err)
      })
    });
  }

  export function deletePost(postId) {
    return fetch(`${BASE_URL}/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + tokenService.getToken(),
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    })
}