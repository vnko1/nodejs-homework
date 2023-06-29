const { login } = require("./usersControllers");
// const jest = require("jest");

describe("test login controller", () => {
  test("return status 200", async () => {
    const mReq = { body: { email: "test@test.com", password: "123123123" } };
    const mRes = { status: jest.fn().mockReturnThis() };
    const mNext = jest.fn();
    await login(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
  }, 15000);
});
