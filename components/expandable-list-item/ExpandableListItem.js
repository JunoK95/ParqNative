import React, {forwardRef, useImperativeHandle, useState} from 'react';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';

const ExpandableListItem = forwardRef(
  ({listItemComponent, expandComponent}, ref) => {
    const [expand, setExpand] = useState(false);

    useImperativeHandle(ref, () => ({
      handleExpand(boolean) {
        setExpand(boolean);
      },
    }));

    return (
      <React.Fragment>
        <TouchableNativeReplacement
          color={'secondary'}
          onPress={() => setExpand(!expand)}>
          {listItemComponent}
        </TouchableNativeReplacement>
        {expand && expandComponent}
      </React.Fragment>
    );
  },
);

export default ExpandableListItem;
