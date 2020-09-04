import React from 'react';
import {isIphoneX, isIos} from '../../helpers/is-iphoneX';
import {
  HeaderPaddingIphoneX,
  HeaderPaddingDefault,
  HeaderPaddingIphone8,
} from './variants';

const HeaderPadding = props => {
  if (isIphoneX()) {
    return <HeaderPaddingIphoneX {...props} />;
  } else if (isIos()) {
    return <HeaderPaddingIphone8 {...props} />;
  }
  return <HeaderPaddingDefault {...props} />;
};

export default HeaderPadding;
