/*This file contains our api requests*/

export const getNhsArticles = async () => {
    const subscriptionKey = '0ecc566433df4d06904e85cb33cbc202'
    const url = 'https://api.nhs.uk/conditions/Periods';
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