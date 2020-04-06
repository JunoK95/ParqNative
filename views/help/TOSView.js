import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import ParagraphBlock from '../../components/layout/ParagraphBlock';

const TOSView = () => {
  return (
    <View>
      <HeaderPadding to={'HelpMenu'} title={'TOS'} alt />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'Effective: February 14, 2020'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        text={
          'Parq, LLC. (“Parq,” “we,” “us”) takes your privacy very seriously. We provide this Privacy Policy to inform you of our policies and procedures regarding the collection, use and disclosure of personal information we receive from Users of our website at Parq.com (the “Site”) and the Parq iOS mobile device application (the “App”) or any other products provided by Parq, LLC. The Site, App, and all other Parq services are collectively referred to as the “Services.” This Privacy Policy applies only to information that you provide to us through use of the Services or by direct contact with a representative of Parq. By using the Services, you are agreeing to be bound by these policies. Our privacy policy will be updated as necessary. We will notify you of any material changes and all updates to the privacy policy will be posted on the Site and within the Mobile App.'
        }
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
      <ParagraphBlock
        title={'Parq Privacy Policy'}
        text={'text'}
        titleIcon={'angle-right'}
      />
    </View>
  );
};

export default TOSView;

const styles = StyleSheet.create({});
