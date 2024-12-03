import { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '~/Context/UserContext';
import { VaccineContext } from '~/Context/VaccineContext';
import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';
import { RecordContext } from '~/Context/RecordContext';

const ControllerContext = createContext();

function ControllerContext({ children }) {
    const { setUser } = useContext(UserContext);
    const { setVaccines } = useContext(VaccineContext);

    const { setSelectVaccines } = useContext(SelectVaccinesContext);
    const { setSelectedDate } = useContext(SelectVaccinesContext);
    const { setSelectedTime } = useContext(SelectVaccinesContext);
    const { setselectedRecord } = useContext(SelectVaccinesContext);

    const { setRecords } = useContext(RecordContext);

    const clearAll = () => {
        setUser(null);
        setVaccines(null);

        setSelectVaccines(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setselectedRecord(null);

        setRecords(null);

        localStorage.clear();
    };

    return <ControllerContext.Provider value={{ clearAll }}>{children}</ControllerContext.Provider>;
}

export { ControllerContext, ControllerProvider };
