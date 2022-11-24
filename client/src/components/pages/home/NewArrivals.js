import { memo } from "react";
import ProductPagination from "../../pagination/ProductPagination";

const NewArrivals = () => {
  return <ProductPagination limit={3} sortBy="createdAt" />;
};

export default memo(NewArrivals);
