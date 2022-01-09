const {Service} = require('verificac19-sdk');
const {Certificate} = require('verificac19-sdk');
const {Validator} = require('verificac19-sdk');

const ADD_HOLDER_DETAILS = true;
const ADD_DETAILED_MESSAGE = true;

// {
// 	person: 'FEDELE CAVALIERE',
// 	date_of_birth: '2002-03-17',
// 	result: true,
// 	code: 'VALID',
// 	message: 'Doses 3/3 - Vaccination is valid [ 2021-12-19T00:00:00.000Z - 2021-12-19T00:00:00.000Z ] '
// }

const check = async function(dgc, enforced) {

	// initial update
	Service.updateAll();
	
	// load DGC
	let dcc;
	try {
		dcc = await Certificate.fromRaw(dgc);
	
	} catch (e) {
	
		return e;
	}

	// validate DGC
	let validationResult;
	if(enforced) validationResult = await Validator.validate(dcc, Validator.mode.SUPER_DGP); 
	else validationResult = await Validator.validate(dcc); 
	
	return validationResult
}

module.exports = {check}