import { Children } from 'react';
import { UserProvider } from './UserContext';

function AppProvider({ Children }) {
    return (
        <AppProvider>
            <UserProvider>{Children}</UserProvider>
        </AppProvider>
    );
}

export default AppProvider;
