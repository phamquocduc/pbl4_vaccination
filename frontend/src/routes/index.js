// Layouts
import { DashboardLayout, LoginLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import VaccineReg from '~/pages/VaccineReg';
import Login from '~/pages/Login';
import SighUp from '~/pages/SighUp';
import BookingDatePage from '~/pages/BookingDatePage';

const publicRoutes = [
    { path: '/', component: Home, layout: LoginLayout },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/vaccinereg', component: VaccineReg },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/sighUp', component: SighUp, layout: LoginLayout },
    { path: '/sighUp', component: SighUp, layout: LoginLayout },
    { path: '/bookingDatePage', component: BookingDatePage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
