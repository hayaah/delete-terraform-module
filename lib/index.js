const core = require('@actions/core');
const deleteModule = require('./deleteModule')
 

const setGithubInput = (name, value) =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

async function run() {
  setGithubInput("module_name", "test_ran-gadi-haya-test")
  setGithubInput("provider", "aws")

  setGithubInput("registry_name", "private")


  setGithubInput("organization", "wix-infragod")


  setGithubInput("token", "VyOw6GuKtEDbAg.atlasv1.ql07LNyomIHzOZuYPRuRuZea3ZZktKPNssHkvy2KLllsSnb789DxjyzvFMarlGQjCWw")



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