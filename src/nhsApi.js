/*This file contains our api requests*/

export const getNhsArticles = async (topic) => {
    const subscriptionKey = '357fd6edc9ba4a5c930b4f5e663c6384'
    const url = 'https://api.nhs.uk/conditions/' + topic;
    const response = await fetch(url,{
        headers:{
            'subscription-key': subscriptionKey
        }
    })
    const responseJson = await response.json()
    const cleanedMainEntity = responseJson['mainEntityOfPage'].filter((blob)=>{
        return blob['mainEntityOfPage'].length > 0;
    })
    return{
        ...responseJson,
        'mainEntityOfPage': cleanedMainEntity
    }
}