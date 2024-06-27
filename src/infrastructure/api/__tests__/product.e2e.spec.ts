import request  from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });
    
    it("should list all products", async () => {
        const response1 = await request(app).post("/product").send({
            type: "a",
            name: "product a",
            price: 10
        });
        expect(response1.status).toBe(200);
        const response2 = await request(app).post("/product").send({
            type: "b",
            name: "product b",
            price: 20
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products[0].name).toBe("product a");
        expect(listResponse.body.products[0].price).toBe(10);
        expect(listResponse.body.products[1].name).toBe("product b");
        expect(listResponse.body.products[1].price).toBe(40);


        const listResponseXML = await request(app).get("/product").set("Accept", "application/xml").send();
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain("<products>");
        expect(listResponseXML.text).toContain("<product>");
        expect(listResponseXML.text).toContain("<id>");
        expect(listResponseXML.text).toContain("<name>product a</name>");
        expect(listResponseXML.text).toContain("<price>10</price>");
        expect(listResponseXML.text).toContain("<product>");
        expect(listResponseXML.text).toContain("<name>product b</name>");
        expect(listResponseXML.text).toContain("<price>40</price>");
        expect(listResponseXML.text).toContain("</products>");

    })
});