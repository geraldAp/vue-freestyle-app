const signUp = require("../../../controller/auth/signupcontroller");
const User = require("../../../model/user");
const Verification = require("../../../model/verification");
const { transporter } = require("../../../helpers/transporter");
const {
  validateUserSignUpCredentials,
} = require("../../../helpers/validators");
const jwt = require("jsonwebtoken");
const fs = require("fs");

jest.mock("../../../model/user");
jest.mock("../../../model/verification");
jest.mock("jsonwebtoken");
jest.mock("../../../helpers/transporter");
jest.mock("../../../helpers/validators");
jest.mock("fs");

// creating a mock request
const createMockBody = (body) => ({
  body,
});
// creating a mock response
const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// writing the first test
it("should send a status code of 400 if user fields validation fails", () => {
    
});
//  writing second test
it("should return a 400 status if user with email exists ", async () => {
  //   signUp(req);
});
