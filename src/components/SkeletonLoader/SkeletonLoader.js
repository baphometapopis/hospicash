import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = ({ loading }) => {
  return (
    <div>
      <Skeleton height={100} />
      <Skeleton count={5} />
    </div>
  );
};

export default SkeletonLoader;
