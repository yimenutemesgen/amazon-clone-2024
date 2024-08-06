





import "./Category.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className="category">
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;









