import React from 'react';
import {isIphoneX} from '../../helpers/is-iphoneX';
import {HeaderPaddingIphoneX, HeaderPaddingDefault} from './variants';

const HeaderPadding = props => {
  if (isIphoneX()) {
    return <HeaderPaddingIphoneX {...props} />;
  }
  return <HeaderPaddingDefault {...props} />;
};

export default HeaderPadding;
