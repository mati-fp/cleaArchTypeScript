import ProductInterface from "../../../../domain/product/entity/product.interface";
import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<ProductInterface> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } });
      return new Product(productModel.id, productModel.name, productModel.price);
    }
    catch (error) {
      throw new Error("product not found");
    }
  }

  async findAll(): Promise<ProductInterface[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel) =>
      new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
