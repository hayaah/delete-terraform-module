const core = require('@actions/core');
const deleteModule = require('./deleteModule')
 

const setGithubInput = (name, value) =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

async function run() {
 

  deleteModule.modules.deleteModuleApiCall((deleteModuleResponse) => {
    console.log(deleteModuleResponse)
    if (deleteModuleResponse.data) {
      return core.setOutput("response", JSON.stringify(deleteModuleResponse.data));
    } 
    if (deleteModuleResponse.errors) {
      return core.setFailed({ error: deleteModuleResponse.errors });
    }
  })
}

run()