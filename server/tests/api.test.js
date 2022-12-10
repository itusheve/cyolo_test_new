const request = require("supertest");
const app = require("../app");
const { DB } = require("../database/db");
const path = require("path");
const imagePath = path.resolve(__dirname, "./me2.jpg");

describe("test file api", () => {
	beforeAll(() => {
		DB.connect();
	});

	test("It should create valid url for file with default ttl", (done) => {
		request(app)
			.put("/v1/file")
			.attach("image", imagePath)
			.then((response) => {
				expect(response.statusCode).toBe(200); //file create
				request(app)
					.get(response.body.src)
					.then((res) => {
						expect(res.statusCode).toBe(200); //succes read file
						done();
					});
			})
			.catch((err) => {
				console.log(err.message);
				done(err);
			});
	});

	test("It should create valid url for file with custom ttl", (done) => {
		request(app)
			.put("/v1/file")
			.set("image-ttl", "10")
			.attach("image", imagePath)
			.then((response) => {
				expect(response.statusCode).toBe(200); //file create
				request(app)
					.get(response.body.src)
					.then(async (res) => {
						expect(res.statusCode).toBe(200); //succes read file
						const ttl = await DB.ttl(response.body.fileName);
						expect(ttl).toBeLessThanOrEqual(600);  // 10 mins
						done();
					});
			})
			.catch((err) => {
				console.log(err.message);
				done(err);
			});
	});

	afterAll((done) => {
		DB.disconnect(done);
	});
});
