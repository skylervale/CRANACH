// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Graphics", () => {
    describe("GET /graphics/timeline", () => {
        it("should get graphics timeline list", (done) => {
            chai.request(app)
                .get('/graphics/timeline')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /graphics/search", () => {
        it("should search for graphics", (done) => {
            chai.request(app)
                .get('/graphics/search')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body).to.have.lengthOf(741);
                    done();
                });
        });
    });
    describe("GET /graphics/getFilters", () => {
        it("should return data to filter the graphics with", (done) => {
            chai.request(app)
                .get('/graphics/getFilters')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /graphics/getGraphic", () => {
        it("should return a single graphic", (done) => {
            // using an existing id from the indexed graphics
            chai.request(app)
                .get('/graphics/getGraphic')
                .query({id: "EYZ_iXgBntTPGJMl8iM4"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

describe("Paintings", () => {
    describe("GET /paintings/timeline", () => {
        it("should get paintings timeline list", (done) => {
            chai.request(app)
                .get('/paintings/timeline')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /paintings/search", () => {
        it("should search for paintings", (done) => {
            chai.request(app)
                .get('/paintings/search')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body).to.have.lengthOf(2226);
                    done();
                });
        });
    });
    describe("GET /paintings/getFilters", () => {
        it("should return data to filter the paintings with", (done) => {
            chai.request(app)
                .get('/paintings/getFilters')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /paintings/getPainting", () => {
        it("should return a single painting", (done) => {
            // using an existing id from the indexed graphics
            chai.request(app)
                .get('/paintings/getPainting')
                .query({id: "N4Z_iXgBntTPGJMl8yXd"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
