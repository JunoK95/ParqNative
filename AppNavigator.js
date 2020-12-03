import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import DrawerNav from './components/navigation/DrawerNav';
import LoginView from './views/login/LoginView';
import LandingView from './views/login/LandingView';
import RegisterView from './views/login/RegisterView';
import AuthStatus from './views/login/AuthStatus';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import NearbyListView from './views/NearbyListView';
import PaymentSettingView from './views/PaymentSettingView';
import UserProfileView from './views/UserProfileView';
import VehicleListView from './views/VehicleListView';
import CarportListView from './views/CarportListView';
import ReservationListView from './views/ReservationListView';
import VehicleRegistrationView from './views/vehicle/VehicleRegistrationView';
import SavedLocationView from './views/SavedLocationView';
import CarportHostView from './views/CarportHostView';
import CarportInfoView from './views/carport/CarportInfoView';
import PayParkingView from './views/PayParkingView';
import CarportRegisterView from './views/carport/CarportRegisterView';
import SavedLocationAddView from './views/SavedLocationAddView';
import CarportInfoNoBookView from './views/carport/CarportInfoNoBookView';
import HelpView from './views/HelpView';
import FAQView from './views/help/FAQView';
import TOSView from './views/help/TOSView';
import PrivacyView from './views/help/PrivacyView';
import GetPhoneView from './views/GetPhoneView';
import CardTokenGenerator from './views/payment/card-token-generator/CardTokenGenerator';
import IndexView from './views/IndexView';
import ReferralView from './views/ReferralView';
import SandboxView from './views/SandboxView';
import PWResetView from './views/login/PWResetView';
import StripeIdentityVerificationView from './views/stripe_verification/stripe-identity-verification';
import StripeAddBankView from './views/stripe_verification/StripeAddBankView';
import StripeAccountMenuView from './views/stripe_verification/StripeAccountMenuView';
import ParkedVehiclesView from './views/parked-vehicles/ParkedVehiclesView';

const SearchNavigator = createStackNavigator(
  {
    Search: SearchView,
    Nearby: NearbyListView,
    PayParking: PayParkingView,
    SavedLocations: SavedLocationView,
    SavedLocationsAdd: SavedLocationAddView,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Search',
  },
);

const PaymentNavigator = createStackNavigator(
  {
    StripeAccountVerification: StripeAccountMenuView,
    StripeIdentityVerification: StripeIdentityVerificationView,
    StripeAddBankAccount: StripeAddBankView,
    PaymentSetting: PaymentSettingView,
  },
  {
    headerMode: 'none',
    initialRouteName: 'PaymentSetting',
  },
);

const HelpNavigator = createStackNavigator(
  {
    HelpMenu: HelpView,
    FAQ: FAQView,
    TOS: TOSView,
    Privacy: PrivacyView,
    Sandbox: SandboxView,
  },
  {
    headerMode: 'none',
    initialRouteName: 'HelpMenu',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    Home: HomeView,
    SearchNavigator: SearchNavigator,
    Payment: PaymentNavigator,
    Nearby: NearbyListView,
    UserProfile: UserProfileView,
    VehicleList: VehicleListView,
    VehicleReg: VehicleRegistrationView,
    CarportList: CarportListView,
    CarportHost: CarportHostView,
    CarportInfo: CarportInfoView,
    CarportInfoNoBook: CarportInfoNoBookView,
    CarportRegister: CarportRegisterView,
    ParkedVehicles: ParkedVehiclesView,
    ReservationList: ReservationListView,
    Help: HelpNavigator,
    CardRegistration: CardTokenGenerator,
    Index: IndexView,
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerNav,
    activeTintColor: '#000000',
    activeBackgroundColor: '#e6e6e6',
  },
);

const AuthNavigator = createStackNavigator(
  {
    Login: LoginView,
    Landing: LandingView,
    Register: RegisterView,
    PWReset: PWResetView,
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
    unmountInactiveRoutes: true,
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthStatus: AuthStatus,
      App: AppNavigator,
      Auth: AuthNavigator,
      Phone: GetPhoneView,
      Referral: ReferralView,
    },
    {
      initialRouteName: 'AuthStatus',
      unmountInactiveRoutes: true,
    },
  ),
);
