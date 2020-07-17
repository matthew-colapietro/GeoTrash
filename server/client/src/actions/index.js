import axios from 'axios';

export const CREATE_TRASH = 'CREATE_TRASH';
export const GET_TRASH = 'GET_TRASH';
export const SET_COORDINATES= 'SET_COORDINATES';


//const API_KEY = ''; API KEY NOT NEEDED
const ROOT_URL = 'http://localhost:8000/trash'

//API pull for Products information
export function addTrashInformation(reporterName, phoneNumber, email, trashImage, trashQuantity, hazardnessLevel, longitude, latitude, submissionDate) {
  console.log(`posting trash with: ${reporterName}, ${phoneNumber}, ${trashQuantity}, ${submissionDate}`)
  const url = `${ROOT_URL}`
  
  const request = axios({
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
      latitude: latitude,
      submissionDate: submissionDate
    }
  })

  console.log('Request', request);
  //this is the action; need to call the redux store dispatch
  return {
    type: CREATE_TRASH,
    payload: request
  };
}

export function getTrashData(hazardnessLevel, trashQuantity, reporterName) {
  console.log(`GETTING trash data via getTrashData action with properties: ${hazardnessLevel}`);
  const url = `${ROOT_URL}/?hazardnessLevel=${hazardnessLevel}&trashQuantity=${trashQuantity}&reporterName=${reporterName}`
  const request = axios.get(url);

  return {
    type: GET_TRASH,
    payload: request,
  };
}

export function setCoordinates (latitude, longitude) {
  return {
    type: SET_COORDINATES,
    payload: {latitude, longitude}
  }
}