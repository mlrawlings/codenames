import React from 'react';

export default Component => {
  let memo;
  let oldProps = {};
  let oldPropKeys = [];
  return props => {
    if (
        memo
        && oldPropKeys.length === Object.keys(props).length
        && oldPropKeys.every(key => oldProps[key] === props[key])
    ) {
      return memo;
    } else {
      oldProps = props;
      memo = <Component {...props} />;
      return memo;
    }
  };
};