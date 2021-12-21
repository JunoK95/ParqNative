import React, {forwardRef, useImperativeHandle, useState} from 'react';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';

const ExpandableListItem = forwardRef(
  ({listItemComponent, expandComponent, expanded}, ref) => {
    const [expand, setExpand] = useState(expanded ? expanded : false);

    useImperativeHandle(ref, () => ({
      handleExpand(boolean) {
        if (boolean) {
          setExpand(boolean);
        } else {
          setExpand(!expand);
        }
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
