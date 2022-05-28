

import { time } from "./extra"

export const getApi = async (api_url: string) => {
   const image_link=api_url+`${time().replace(" ","")}/.svg?background=white`;
   console.log(image_link);
   return image_link
}

// export const getApi = async (api_url: string) => {
//    const response = await fetch(api_url);
//    const result = await response.json();
//    return result.results[0].picture.thumbnail;
// }