import React from 'react'
import Button from '../forms/Button'

const LoadMore = ({ handleLoadMore }) => {
  return (
    <Button onClick={() => handleLoadMore()}>
      Load More
    </Button>
  );
};

export default LoadMore;
