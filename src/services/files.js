import axios from 'axios';
const baseUrl =  '/api/files/';

let token = null;

const setToken = newToken => {
	token = `bearer ${ newToken }`;
	console.log('TOKEN set:', token );
};

const getAll = () => {
	console.log('GetAll');
	const request = axios.get(baseUrl + 'getList');
	return request.then(response => response.data);
};

const getMidiData = ( filename ) => {
	const request = axios.get(baseUrl + 'get/' + filename);
	return request.then(response => response.data);
};

const upload = ( file ) => {
	console.log('upload', file);
	const request = axios.post((baseUrl + '/upload/'), file);
	return request.then(response => response.data);
};

const exportedObject =  { getAll, setToken, getMidiData, upload};
export default exportedObject;