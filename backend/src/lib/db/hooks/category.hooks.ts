import { ProductCategory } from "@store/models/product-category.model";
import { Product } from "@store/models/product.model";

export async function afterUpdate(category: ProductCategory) {
  if (category.changed("deletedAt") && category.deletedAt === null) {
    await Product.update(
      { active: category.deletedAt },
      { where: { categoryId: category.id } }
    );
  }

  if (category.changed("active")) {
    await Product.update(
      { active: category.active },
      { where: { categoryId: category.id } }
    );
  }
}
