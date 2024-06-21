import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateCustomerUseCase from "./update.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

const product = new Product("1", "product 1", 100);

const input = {
  id: product.id,
  name: "product 2",
  price: 200,
};

describe("Integration test for product update use case", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateCustomerUseCase(productRepository);

    await productRepository.create(product);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
