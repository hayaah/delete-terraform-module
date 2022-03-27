const core = require('@actions/core');
const request = require('request');

const getParams = () => {
  const moduleName = core.getInput('module_name');
  const provider = core.getInput('provider');
  const registryName = core.getInput('registry_name');
  const organization = core.getInput('organization');

  return {
    moduleName,
    provider,
    registryName,
    organization
  }
}

const getToken = () => {
  return core.getInput('token')
}

const deleteModuleApiCall = (callback) => {

  const params =  getParams()

  const { moduleName, provider, registryName, organization } = params
 
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${getToken()}`
  }
 
  const options = {
    'method': 'DELETE',
    'url': `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules/${registryName}/${organization}/${moduleName}/${provider}`,
    'headers': headers
  };

  request(options, (errors, response) => {
   // console.log(response.body)
    console.log(response.statusCode)
    if (response && response.statusCode == 204) {
      return callback({  status: 204, data: "module was deleted"  });
    } 
    if (errors != null ) {
      return callback({ errors: errors.errors });
    }  
  });
}

exports.modules = {
  deleteModuleApiCall,
  getParams,
  getToken
}