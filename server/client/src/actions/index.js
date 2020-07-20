import axios from 'axios';

export const CREATE_TRASH = 'CREATE_TRASH';
export const GET_TRASH = 'GET_TRASH';
export const SET_COORDINATES= 'SET_COORDINATES';
export const UPDATE_STATUS = 'UPDATE_STATUS';

// const ROOT_URL = 'http://localhost:8000/trash' // no longer needed with proxy set

//use below root_url for deployment to heroku
const ROOT_URL = `/trash`

//API pull for adding new trash location
export function addTrashInformation(reporterName, phoneNumber, email, trashImage, trashQuantity, hazardnessLevel, latitude, longitude, submissionDate) {

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
      submissionDate: submissionDate,
      status: 'Open' //hard-coded status because every new submission is always "Open"
    }
  })

  console.log('Request', request);
  //this is the action; need to call the redux store dispatch
  return {
    type: CREATE_TRASH,
    payload: request
  };
}

export function getTrashData(hazardnessLevel, trashQuantity, reporterName, status) {
  console.log(`GETTING trash data via getTrashData action with properties: ${hazardnessLevel}`);
  const url = `${ROOT_URL}/?hazardnessLevel=${hazardnessLevel}&trashQuantity=${trashQuantity}&reporterName=${reporterName}&status=${status}`
  const request = axios.get(url);

  return {
    //this is the action; need to call the redux store dispatch
    type: GET_TRASH,
    payload: request,
  };
}

export function updateTrashStatus(trashId) {
  console.log(`PUT update to trashId ${trashId}`)
  const url = `${ROOT_URL}/`

  const request = axios({
    method: "put",
    url: url,
    data: {
      trashId: trashId,
    }
  })

  console.log('Request', request);
  //this is the action; need to call the redux store dispatch
  return {
    type: UPDATE_STATUS,
    payload: request
  };
}

export function setCoordinates (latitude, longitude) {
  return {
    //this is the action; need to call the redux store dispatch
    type: SET_COORDINATES,
    payload: {latitude, longitude}
  }
}