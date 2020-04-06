import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import ParagraphBlock from '../../components/layout/ParagraphBlock';

const PrivacyView = () => {
  return (
    <View>
      <HeaderPadding to={'HelpMenu'} title={'Privacy Policy'} alt />
      <ScrollView contentContainerStyle={styles.scroll}>
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
          title={'Services'}
          text={
            'The website at Parq.tech (the “Site”) and the Parq iOS mobile device application (the “App”) or any other products provided by Parq, LLC. The Site, App, and all other Parq services are collectively referred to as the “Services.”'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'User'}
          text={
            'Any individual who is in contact with the Services, whether registered or not.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Registered User'}
          text={
            'Any individual who has contacted the Services, provided the required information, and completed the steps necessary to create an account.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Host'}
          text={
            'Any Registered User who has created and published a Listing in the Services whether the owner, renter, or employee of the owner of that property.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Guest'}
          text={
            'Any Registered User who uses the Services to seek a parking space, request to utilize a parking space, or complete an exchange of funds with a Host for use of property.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Listing'}
          text={
            'A property which has been input into the Services and offered by a Host for a Guest to utilize.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'The PII We Collect'}
          text={
            'In the course of using the Services, you may provide us with “Personally Identifiable Information.” This refers to information about you that can be used to contact or identify you, and information on your use of, and activities through, our Services that may be connected with you (“PII”). PII that we collect may include, but is not limited to, your first and last name, password, mobile number, email address, billing information, vehicle information including license plate number, details regarding any transaction you make or action you take using the Services, and information voluntarily given to us by you. PII may also include information you supply to us concerning your location, preferences, and interests expressed in the course of use of the Services. It is not compulsory that you provide any of the above information; however, if you choose not to, you will not be able to register as a User of the Services and will not have access to certain information and features or capability to conduct any transactions with other Parq Users.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Log Data'}
          text={
            'Our servers automatically record information about how Users (both account holders and non-account holders) use our Services. This information, referred to as “Log Data,” may include, but is not limited to, your computer’s Internet Protocol address, browser type, operating system, the web page you were visiting before you accessed our Services, the pages or features of our Services that you browsed and the time spent on those pages or features, search terms, the links on our Services that you clicked, and statistics related to your use of the Services. We use Log Data to administer the Services and to analyze (or have third parties analyze) the Log Data to improve, customize, and enhance our Services by expanding their features and functionality and tailoring them to our Users’ needs and preferences.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Cookies'}
          text={
            'Like many websites, we also use automated data collection tools such as “cookies” and “web beacons” to collect certain information. “Cookies” are small text files that we transfer to your computer’s hard disk for record-keeping purposes. We use “persistent cookies” to save your registration ID and login password for future logins to the Site; and we use “session ID cookies” to enable certain features of the Site, to better understand how you interact with the Site and to monitor aggregate usage and web traffic routing on the Site. You can instruct your browser, by changing its options, to stop accepting cookies or to prompt you before accepting a cookie from the websites you visit. If you do not accept cookies, however, you may not be able to use all portions of the Site or all functionality of our Services. Note that this Privacy Policy covers only our use of cookies and does not include use of cookies by third parties.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Third Parties'}
          text={
            'We may also allow third parties, including, but not limited to Google Analytics, to place cookies on the Site. Third parties use these technologies to help us analyze how you use the Site and to market and advertise to you on the Site and third party websites. These cookies also help us detect or prevent fraud or conduct risk assessments, or to collect information about your activities on the Site. To prevent Google Analytics from using your information for analytics, you may install the Google Analytics Opt-Out Browser. To opt out of Google Analytics for display advertising or customize Google display network ads, you can visit the Google Ads Settings page. We do not control any of these opt-out links and are not responsible for the availability or accuracy of these mechanisms.            '
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Listing'}
          text={
            'A property which has been input into the Services and offered by a Host for a Guest to utilize.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Listing'}
          text={
            'A property which has been input into the Services and offered by a Host for a Guest to utilize.'
          }
          titleIcon={'angle-right'}
        />
      </ScrollView>
    </View>
  );
};

export default PrivacyView;

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 64,
  },
});
