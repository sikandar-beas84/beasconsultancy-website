
import { env } from '../constants/common';

const getService = async (url, accessToken) => {

  try {
    const responseObj = await fetch(`${env.API_BASE_URL}${url}`, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-SECURE-KEY': accessToken
      },
      cache: 'no-store',

    }).then((response) => {

      return response.json()
    })

    return (
      responseObj
    )
  } catch (err) {
    return err;
  }

}


const postService = async (url, accessToken, payload) => {
  try {
    const responseObj = await fetch(`${env.API_BASE_URL}${url}`, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-SECURE-KEY': accessToken
      },
      body: JSON.stringify({ slug: payload }),
      cache: 'no-store',

    }).then((response) => {

      return response.json()
    })


    return (
      responseObj
    )
  } catch (err) {
    return err;
  }

}



export { getService, postService };