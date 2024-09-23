import { isEqual } from 'lodash';
import React, { memo } from 'react';

const arePropsEqual = (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
}
const ChildComponent = (props) => {
  return (
    <div>
      <h3>ChildComponent {props.data.name}</h3>
    </div>
  );
}

export default memo(ChildComponent, arePropsEqual);
