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

import Record from '~/components/Record';
import Reservation from '~/components/Reservation';

import RecordSelector from '~/pages/RecordSelector/RecordSelector';
import ConfirmInformation from '~/pages/ConfirmInformationPage';
import ReturnPage from '~/pages/ReturnPage';

const publicRoutes = [
    // { path: '/', component: Home, layout: LoginLayout },
    // { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/vaccinereg', component: VaccineReg },

    { path: '/', component: Login, layout: LoginLayout },
    { path: '/sighUp', component: SighUp, layout: LoginLayout },

    { path: '/bookingDatePage', component: BookingDatePage },
    { path: '/createRecord', component: CreateRecord, layout: DashboardLayout /*LoginLayout */ },
    { path: '/ReservationList', component: ReservationList, layout: DashboardLayout /*LoginLayout */ },
    { path: '/recordList', component: RecordList, layout: DashboardLayout },

    { path: '/record', component: Record, layout: LoginLayout },
    { path: '/reservation', component: Reservation, layout: LoginLayout },

    { path: '/recordSelector', component: RecordSelector, layout: LoginLayout },
    { path: '/confirmInformation', component: ConfirmInformation },
    { path: '/returnPage', component: ReturnPage, layout: LoginLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
