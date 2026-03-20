import { env } from '../util/constants/common';

export const getHomeData = async (url) => {
    try {
        const response = await fetch(`${env.API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'X-SECURE-KEY': `${env.ACCESS_TOKEN}`
            },
            cache: 'no-store'
            // next: { revalidate: 60 }
        });

        const responseObj = await response.json();

        return responseObj;

    } catch (err) {
        return err;
    }
};
export const getDataService = async (url) => {
    try {
        const response = await fetch(`${env.API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'X-SECURE-KEY': `${env.ACCESS_TOKEN}`
            },
            //  cache: 'no-store'
            next: { revalidate: 60 }
        });

        const responseObj = await response.json();

        return responseObj;

    } catch (err) {
        return err;
    }
};
export const getServiceData = async (url, accessToken, des) => {
    try {
        const response = await fetch(`${env.API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'X-SECURE-KEY': accessToken
            },
            body: JSON.stringify({ slug: des }),

            next: { revalidate: 10 }
        });

        const responseObj = await response.json();

        return responseObj;

    } catch (err) {
        return err;
    }
};
export const postService = async (url, slug) => {
   
    try {
        const responseObj = await fetch(`${env.API_BASE_URL}${url}`, {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'X-SECURE-KEY': `${env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({ slug: slug }),
            next: { revalidate: 60 }

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
export const postServiceData = async (url, accessToken, payload) => {
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
  