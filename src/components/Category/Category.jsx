




import { categoryInfos } from "./categoryfullinfos";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className="category__container">
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
}

export default Category;








