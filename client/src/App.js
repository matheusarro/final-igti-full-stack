import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListScreen from './components/ListScreen.js';
import EditScreen from './components/EditScreen.js';
import getPeriodosFromCurrentPreviousNextYears from './helpers/periodsListCreator.js';
import getCurrentPeriod from './helpers/getCurrentPeriod.js';
import styles from './App.module.css';

const api = axios.create({ baseURL: 'api' });


const PERIODS = getPeriodosFromCurrentPreviousNextYears();

const ENTRIES_LIST_SCREEN = 0;
const ADD_EDIT_SCREEN = 1;


export default function App() {
    const [allEntries, setAllEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState(undefined);
    const [currentScreen, setCurrentScreen] = useState(ENTRIES_LIST_SCREEN);
    const [searchText, setSearchText] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(null); // sem especificar NULL, inicia na tela de edição
    const [newEntry, setNewEntry] = useState(false);

    useEffect(() => {
        const period = getCurrentPeriod();

        setCurrentPeriod(period);
    }, []);

    useEffect( () => {
        const fetchEntries = async () => {
            const axiosObj = await api.get(`/transaction/${currentPeriod}`);
            const entriesData = axiosObj.data;

            entriesData.sort((a,b) => a.yearMonthDay.localeCompare(b.yearMonthDay));

            setAllEntries(entriesData);
            setFilteredEntries(entriesData);
        };
        fetchEntries(); // chamada para função assíncrona no useEffect
    }, [currentPeriod]);


    useEffect( () => {
        let newFilteredEntries = [...allEntries];

        if (searchText.trim()) {
            newFilteredEntries = newFilteredEntries.filter( entry => {
                return entry.description.toLowerCase().includes(searchText.toLowerCase());
            });
        }

        setFilteredEntries(newFilteredEntries);
    }, [allEntries, searchText]);


    useEffect( () => {
        const newScreen = (selectedEntry !== null || newEntry) ? ADD_EDIT_SCREEN : ENTRIES_LIST_SCREEN;
        setCurrentScreen(newScreen);
    }, [selectedEntry, newEntry]);


    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        setCurrentPeriod(newPeriod);
    };


    const handleDeleteEntry = async (event) => {
        const entryId = event.target.id;

        const body = {
            _id: entryId
        };

        await api.delete(`/transaction`, {data: body}); // delete precisa do {data: body}
        
        const currentEntries = filteredEntries.filter( (entry) => {
            return (entry._id !== entryId);
        });

        setAllEntries(currentEntries);
    };


    const handleEntryEdit = async (event) => {
        const entryId = event.target.id;

        const newSelectedEntry = filteredEntries.find( entry => {
            return entry._id === entryId;
        });

        setSelectedEntry(newSelectedEntry);
    };


    const handleSearchTextChange = (event) => {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
    };


    const handleCreateEntry = () => {
        setNewEntry(true);
    };


    const handleEditSave = async (editedEntry) => {
        const upToDateEntries = [...allEntries];

        if (!editedEntry._id) {
            const body = {
                description: editedEntry.description,
                value: editedEntry.value,
                category: editedEntry.category,
                type: editedEntry.type,
                year: Number(editedEntry.yearMonthDay.substring(0,4)),
                month: Number(editedEntry.yearMonthDay.substring(5,7)),
                day: Number(editedEntry.yearMonthDay.substring(8,10))
            };

            const insertedEntry = await api.post(`/transaction`, body); // post não precisa do {data: body}
            upToDateEntries.push(insertedEntry.data);
        } else {
            const body = {
                _id: editedEntry._id,
                description: editedEntry.description,
                value: editedEntry.value,
                category: editedEntry.category,
                type: editedEntry.type,
                year: Number(editedEntry.yearMonthDay.substring(0,4)),
                month: Number(editedEntry.yearMonthDay.substring(5,7)),
                day: Number(editedEntry.yearMonthDay.substring(8,10))
            };
            
            await api.put(`/transaction`, body); // put não precisa do {data: body}
    
            const index = upToDateEntries.findIndex(entry => {
                return entry._id === editedEntry._id;
            });
    
            upToDateEntries[index] = editedEntry;
        }

        setAllEntries(upToDateEntries);
        setSelectedEntry(null);
        setNewEntry(false);
    };


    const handleEditCancel = () => {
        setNewEntry(false);
        setSelectedEntry(null);
    };


    return (
        <>
            <header className={`center flow-text ${styles.Header}`}>
                <h1>Gerenciamento de Receitas e Despesas</h1>
            </header>

            <main>
                <div className='container'>
                    {
                        currentScreen === ENTRIES_LIST_SCREEN
                            ? <ListScreen
                                entries={filteredEntries}
                                allPeriods={PERIODS}
                                currentPeriod={currentPeriod}
                                searchText={searchText}
                                onChangePeriod={handlePeriodChange}
                                onCreateEntry={handleCreateEntry}
                                onEditEntry={handleEntryEdit}
                                onDeleteEntry={handleDeleteEntry}
                                onChangeSearchText={handleSearchTextChange}
                            />

                            : <EditScreen
                                entry={selectedEntry}
                                onSave={handleEditSave}
                                onCancel={handleEditCancel}
                            />
                    }

                </div>
            </main>
            <footer className ={`center ${styles.Footer}`}>
                <h6>Desafio Final do Bootcamp Full-Stack do IGTI</h6>
                <span>Segunda Turma de 2020</span>
            </footer>
        </>
    );
}
