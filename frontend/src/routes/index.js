// Layouts
import { DashboardLayout, LoginLayout } from '~/components/Layout';

import Home from '~/pages/Home';
// import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import VaccineReg from '~/pages/VaccineReg';

import Login from '~/pages/Login';
import SighUp from '~/pages/SighUp';

import BookingDatePage from '~/pages/BookingDatePage';

import CreateRecord from '~/pages/CreateRecord';
import RecordList from '~/pages/RecordList';
import ReservationList from '~/pages/ReservationList';
import ReservationDetail from '~/pages/ReservationDetail';

import Record from '~/components/Record';
import Reservation from '~/components/Reservation';

import RecordSelector from '~/pages/RecordSelector/RecordSelector';
import ConfirmInformation from '~/pages/ConfirmInformationPage';
import ReturnPage from '~/pages/ReturnPage';

//AdminPage
import AdminVaccine from '~/pages/AdminPage/AdminVaccine';
import AddEditVaccine from '~/pages/AdminPage/AddEditVaccine';
import AdminHospital from '~/pages/AdminPage/AdminHospital';
import AddEditHospital from '~/pages/AdminPage/AddEditHospital';
import AdminEmployee from '~/pages/AdminPage/AdminEmployee';
import AddEditEmployee from '~/pages/AdminPage/AddEditEmployee';

const publicRoutes = [
    // { path: '/', component: Home, layout: LoginLayout },
    // { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/vaccinereg', component: VaccineReg },

    { path: '/', component: Login, layout: LoginLayout },
    { path: '/sighUp', component: SighUp, layout: LoginLayout },

    { path: '/bookingDatePage', component: BookingDatePage },
    { path: '/createRecord', component: CreateRecord, layout: DashboardLayout /*LoginLayout */ },
    { path: '/recordList', component: RecordList, layout: DashboardLayout },
    { path: '/ReservationList', component: ReservationList, layout: DashboardLayout /*LoginLayout */ },
    { path: '/reservationDetail', component: ReservationDetail, layout: DashboardLayout /*LoginLayout */ },

    { path: '/record', component: Record, layout: LoginLayout },
    { path: '/reservation', component: Reservation, layout: LoginLayout },

    { path: '/recordSelector', component: RecordSelector, layout: LoginLayout },
    { path: '/confirmInformation', component: ConfirmInformation },
    { path: '/returnPage', component: ReturnPage, layout: LoginLayout },
    //AdminPage
    { path: '/adminVaccine', component: AdminVaccine, layout: DashboardLayout },
    { path: '/addEditVaccine', component: AddEditVaccine, layout: DashboardLayout },

    { path: '/adminHospital', component: AdminHospital, layout: DashboardLayout },
    { path: '/addEditHospital', component: AddEditHospital, layout: DashboardLayout },

    { path: '/adminEmployee', component: AdminEmployee, layout: DashboardLayout },
    { path: '/addEditEmployee', component: AddEditEmployee, layout: DashboardLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
