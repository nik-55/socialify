// This should be inside services > api_service... see the refrence repo

import { time } from "./extra"

//Variable Names should make sense.
export const getApi = async (api_url: string) => {
   // For things like these, which aren't obvious use comments to explain.
   const image_link=api_url+`${time().replace(" ","")}/.svg?background=white`;
   // remove console.log before pushing to github
   console.log(image_link);
   return image_link
}

// export const getApi = async (api_url: string) => {
//    const response = await fetch(api_url);
//    const result = await response.json();
//    return result.results[0].picture.thumbnail;
// }