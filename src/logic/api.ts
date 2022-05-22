export const getApi = async (api_url: string) => {
    const response = await fetch(api_url);
    const result = await response.json();
    return result.results[0].picture.thumbnail;
}

