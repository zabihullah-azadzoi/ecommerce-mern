import React from "react";

import ProductPagination from "../../pagination/ProductPagination";

const BestSellers = () => {
  return <ProductPagination limit={3} sortBy={"sold"} />;
};

export default React.memo(BestSellers);
