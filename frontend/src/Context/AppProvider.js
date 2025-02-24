import { UserProvider } from './UserContext';
import { RecordContext } from './RecordContext';

function AppProvider({ children }) {
    return (
        <AppProvider>
            <UserProvider>
                <RecordContext>{children}</RecordContext>
            </UserProvider>
        </AppProvider>
    );
}

export default AppProvider;
