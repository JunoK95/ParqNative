import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import ParagraphBlock from '../../components/layout/ParagraphBlock';

const FAQView = () => {
  return (
    <View>
      <HeaderPadding to={'HelpMenu'} title={'FAQs'} alt />
      <ScrollView contentContainerStyle={styles.scroll}>
        <ParagraphBlock
          title={'Can I be towed while parked in a Parq space?'}
          text={
            'We always make every effort possible to avoid having your vehicle towed. However, there may be some extreme circumstances in which towing is unavoidable. The only time a Host could tow your vehicle is if your reservation has ended, you have not moved your car, and you are non-responsive to the Host and/or Customer Care'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'Can I be ticketed while parked in a Parq space?'}
          text={
            'As long as you have parked properly and in the correct space, you should not receive a parking ticket from parking enforcement during your reservation. When you make a reservation through Parq, you are entering into an agreement with a Host in which they are granting you permission to park on their owned or rented property. Further, we verify that all Parq Hosts are the current owners or occupants of the property when they create their listing. When parking, it is the Guest’s responsibility to ensure their vehicle is fully within the designated space and does not block a sidewalk or other public accessway, as this may result in a citation. If a Host directs you to park in a street parking space, metered parking space, on a sidewalk or driveway apron, please contact parq.tech@gmail.com, as this is a violation of our policy.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={
            'What if something happens to my vehicle while it’s in a Parq space?'
          }
          text={
            'The safety of every Parq user is very important to us. We do our best to educate our users in order to foster a responsible and cooperative community and help keep all Hosts, Guests and their personal property safe from harm. Because Parq is a marketplace that connects individuals, we cannot guarantee the safety or security of your vehicle while parked on a Host’s property. When you reserve a parking space using the Parq interface, you are entering into an agreement with your Host. By agreeing to Parq’s Terms and Conditions when you create your account, you acknowledge and agree to these terms.  In the unlikely event that something does happen to your vehicle while parked on a Parq Host’s property, please reach out to parq.tech@gmail.com within 24 hours of the end of your reservation to alert us of the issue. After that, we ask that you attempt to resolve the matter with the Host. If you are unable to contact the Host or come to a resolution, we will assess the situation and offer recourse where possible.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'What if I arrive at my reservation and the space is gated?'}
          text={
            'Some Parq listings are on gated properties. It is the responsibility of the Host to include this information in their Listing Details. Make sure to look under the description for a listing before you reserve or if you have already reserved it. In the rare case that the Host has not provided any additional information, please send them a message to parq.tech@gmail.com and our Customer Care Team will work with you to find a new space as quickly as possible.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={
            'What if I arrive at my reserved parking space and there is another vehicle parked there?'
          }
          text={
            'Not to worry, we’re here to help! Contact Customer Care via parq.tech@gmail.com. Members of our Customer Care Team are available immediately via chat seven days a week between 9:00 AM and 9:00 PM MT. If you’re experiencing a problem outside of those hours, someone from our team will respond as quickly as possible.'
          }
          titleIcon={'angle-right'}
        />
        <ParagraphBlock
          title={'What if I have a dispute with a Host?'}
          text={
            'Both you and the Host have a 24-hour window from the end of the reservation to submit a complaint to parq.tech@gmail.com. The Customer Care Team will then review the complaint and determine at its discretion whether or not you are entitled to a refund or any other action needs to be taken to resolve the dispute. After the 24-hour window, reservations are closed for complaints and no refunds will be processed.'
          }
          titleIcon={'angle-right'}
        />
        {/* <ParagraphBlock 
          title={}
          text={}
          titleIcon={'angle-right'}
        />
        <ParagraphBlock 
          title={}
          text={}
          titleIcon={'angle-right'}
        />
        <ParagraphBlock 
          title={}
          text={}
          titleIcon={'angle-right'}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FAQView;

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 64,
  },
});
