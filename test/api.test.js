const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const { app } = require("../index");

describe("API Tests", () => {
  describe("GET / Getting all Students array", () => {
    it("should get all Students", function (done) {
      //   taking time to get from db
      this.timeout(10000); // Adjust the time based on the output getting

      chai
        .request(app)
        .get("/students/allStudents")
        .end((err, res) => {
          if (err) {
            console.error("Error in the test:", err);
            return done(err);
          }
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // expect(res.body).to.be.an("array");
          console.log(res.body);
          done();
        });
    });
  });
});
