const core = require('@actions/core');
const deleteModule = require('./deleteModule')
 
async function run() {
  deleteModule.modules.deleteModuleApiCall((deleteModuleResponse) => {
    if (deleteModuleResponse.data) {
      return core.setOutput("response", JSON.stringify(deleteModuleResponse.data));
    } 
    if (deleteModuleResponse.errors) {
      return core.setFailed({ error: deleteModuleResponse.errors });
    }
  })
}

run()