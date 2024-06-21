import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateCustomerUseCase from "./update.product.usecase";
const product = ProductFactory.create("a", "product 1", 100);

const input = {
  id: product.id,
  name: "product 2",
  price: 200,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateCustomerUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
