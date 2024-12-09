import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { UserProvider } from '~/Context/UserContext';
import { RecordProvider } from '~/Context/RecordContext';
import { SelectedVaccinesProvider } from '~/Context/SelectedVaccinesContext';
import { SelectVaccinesProvider } from '~/Context/SelectVaccinesContext';

import { VaccineProvider } from '~/Context/VaccineContext';
import { ReservationProvider } from '~/Context/ReservationContext';
import AppProvider from '~/Context/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <UserProvider>
            <SelectVaccinesProvider>
                <ReservationProvider>
                    <SelectedVaccinesProvider>
                        <RecordProvider>
                            <VaccineProvider>
                                <App />
                            </VaccineProvider>
                        </RecordProvider>
                    </SelectedVaccinesProvider>
                </ReservationProvider>
            </SelectVaccinesProvider>
        </UserProvider>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
