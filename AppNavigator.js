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
import CarportEditView from './views/CarportEditView';
import CarportInfoView from './views/carport/CarportInfoView';
import PayParkingView from './views/PayParkingView';
import CarportRegisterView from './views/carport/CarportRegisterView';
import SavedLocationAddView from './views/SavedLocationAddView';
import CustomBankScreen from './views/payment/CustomBankScreen';
import AddBankView from './views/payment/AddBankView';

const SearchNavigator = createStackNavigator(
  {
    Search: SearchView,
    Nearby: NearbyListView,
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
    PaymentSetting: PaymentSettingView,
    AddBank: AddBankView,
  },
  {
    headerMode: 'none',
    initialRouteName: 'PaymentSetting',
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
    CarportEdit: CarportEditView,
    CarportInfo: CarportInfoView,
    CarportRegister: CarportRegisterView,
    PayParking: PayParkingView,
    ReservationList: ReservationListView,
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
    },
    {
      initialRouteName: 'AuthStatus',
      unmountInactiveRoutes: true,
    },
  ),
);
