const request = require('request');
const deleteModule = require('../lib/deleteModule');

const mockedUrl = "https://app.terraform.io/api/v2/organizations/infragod-test/registry-modules/private/infragod-test/module-Name-100/aws"

const mockedFailerRes = {
  "errors": {
    "errors": [
      {
        "status": "404",
        "title": "not found"
    }
    ]
  }
} 

jest.mock('request')

const mockDeleteModuleApi = () => {
  request.mockImplementation((req, callback) => {
    if (req.url == mockedUrl) {
      return callback(null, { body: JSON.stringify(mockedSuccessRes) })
    }
    return callback(mockedFailerRes, null)

  });
}

const setGithubInput = (name, value) =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

describe("test getting variables from the action workflow", () => {

  test('check if module_name was set successfully / should succeed', (done) => {
    setGithubInput("module_name", "module_name")
    const params = deleteModule.modules.getParams()
    expect(params.moduleName).toStrictEqual("module_name")
    done()
  })

  test('check if token is missing / should return an error', (done) => {
    const token = deleteModule.modules.getToken()
    expect(token).not.toBe("token")
    done()
  })

  test('check if token is set', (done) => {
    setGithubInput("token", "token")
    const token = deleteModule.modules.getToken()
    expect(token).toStrictEqual("token")
    done()
  })

  test('check if provider was not set / should fail', (done) => {
    const params = deleteModule.modules.getParams()
    expect(params.provider).not.toBe("aws")
    done()
  })
})

describe("test gcalling create module api", () => {

  test('check if the url is missing organazation / should fail', async (done) => {
    mockDeleteModuleApi()
    deleteModule.modules.deleteModuleApiCall((res) => {
      expect(res).toEqual(mockedFailerRes)
    })
    done()
  })

  test('check if the url is set correctly', async (done) => {
    setGithubInput("organization", "infragod-test")
    mockDeleteModuleApi()
    deleteModule.modules.deleteModuleApiCall((res) => {
      expect(res).toEqual(mockedFailerRes)
    })
    done()
  })
})
