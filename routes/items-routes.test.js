process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "pop", price: "1.45" };

beforeEach(function () {
  items.push(item);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});
// end afterEach

/** GET /items - returns `{items: [cat, ...]}` */

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual(items);
  });
});
// end

/** GET /items/[name] - return data about one cat: `{cat: cat}` */

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /items - create cat from data; return `{cat: cat}` */

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const obj = {
      name: "Ezra",
      price: "1",
    };
    const resp = await request(app).post(`/items`).send(obj);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: obj });
  });
});
// end

/** PATCH /items/[name] - update cat; return `{cat: cat}` */

describe("PATCH /items/:name", function () {
  test("Updates a single cat", async function () {
    const resp = await request(app).patch(`/items/${item.name}`).send({
      name: "Troll",
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: { name: "Troll" } });
  });

  test("Responds with 404 if id invalid", async function () {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Item deleted"}` */

describe("DELETE /items/:name", function () {
  test("Deletes a single a cat", async function () {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});

// end
