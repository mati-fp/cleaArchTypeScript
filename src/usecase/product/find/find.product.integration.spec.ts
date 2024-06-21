import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

const product = new Product("1", "Product", 100);

describe("Integration Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Product",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();

    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("product not found");
  });
});
