import axios from 'axios';

export const CREATE_TRASH = 'CREATE_TRASH';


//const API_KEY = ''; API KEY NOT NEEDED
const ROOT_URL = 'http://localhost:8000/trash'

//API pull for Products information
export function addTrashInformation(reporterName, phoneNumber, email, trashImage, trashQuantity, hazardnessLevel, longitude, latitude) {
  console.log(`posting trash with: ${reporterName}, ${phoneNumber}, ${trashQuantity}`)
  const url = `${ROOT_URL}/`
  
  const request = axios.get({
    method: "post",
    url: url,
    data: {
      reporterName: reporterName,
      phoneNumber: phoneNumber,
      email: email,
      trashImage: trashImage,
      trashQuantity: trashQuantity,
      hazardnessLevel: hazardnessLevel,
      longitude: longitude,
      latitude: latitude
    }
  })

  console.log('Request', request);
  //this is the action; need to call the redux store dispatch
  return {
    type: CREATE_TRASH,
    payload: request
  };
}