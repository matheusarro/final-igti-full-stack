import React from 'react';
import axios from 'axios';
import ListScreen from './components/ListScreen.js';
import EditScreen from './components/EditScreen.js';

const api = axios.create({ baseURL: 'api' });


const PERIODS = ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12'];

const ENTRIES_LIST_SCREEN = 0;
const ADD_EDIT_SCREEN = 1;


export default function App() {
    const [allEntries, setAllEntries] = React.useState([]);
    const [filteredEntries, setFilteredEntries] = React.useState([]);
    const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
    const [currentScreen, setCurrentScreen] = React.useState(ENTRIES_LIST_SCREEN);
    const [searchText, setSearchText] = React.useState('');
    const [selectedEntrie, setSelectedEntrie] = React.useState(null); // sem especificar NULL, inicia na tela de edição
    const [newEntrie, setNewEntrie] = React.useState(false);


    React.useEffect( () => {
        const fetchEntries = async () => {
            const axiosObj = await api.get(`/transaction/${currentPeriod}`);
            const entriesData = axiosObj.data;

            setAllEntries(entriesData);
            setFilteredEntries(entriesData);
        };
        fetchEntries(); // chamada para função assíncrona no useEffect
    }, [currentPeriod]);


    React.useEffect( () => {
        let newFilteredEntries = [...allEntries];

        if (searchText.trim()) {
            newFilteredEntries = newFilteredEntries.filter( entrie => {
                return entrie.description.toLowerCase().includes(searchText.toLowerCase());
            });
        }

        setFilteredEntries(newFilteredEntries);
    }, [allEntries, searchText]);


    React.useEffect( () => {
        const newScreen = (selectedEntrie !== null || newEntrie) ? ADD_EDIT_SCREEN : ENTRIES_LIST_SCREEN;
        setCurrentScreen(newScreen);
    }, [selectedEntrie, newEntrie]);


    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        setCurrentPeriod(newPeriod);
    };


    const handleDeleteEntrie = async (event) => {
        const entrieId = event.target.id;

        const body = {
            _id: entrieId
        };

        await api.delete(`/transaction`, {data: body}); // delete precisa do {data: body}
        
        const currentEntries = filteredEntries.filter( (entrie) => {
            return (entrie._id !== entrieId);
        });

        setAllEntries(currentEntries);
    };


    const handleEntrieEdit = async (event) => {
        const entrieId = event.target.id;

        const newSelectedEntrie = filteredEntries.find( entrie => {
            return entrie._id === entrieId;
        });

        setSelectedEntrie(newSelectedEntrie);
    };


    const handleSearchTextChange = (event) => {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
    };


    const handleCreateEntrie = () => {
        setNewEntrie(true);
    };


    const handleEditSave = async (editedEntrie) => {
        const upToDateEntries = [...allEntries];

        if (!editedEntrie._id) {
            const body = {
                description: editedEntrie.description,
                value: editedEntrie.value,
                category: editedEntrie.category,
                type: editedEntrie.type,
                year: Number(editedEntrie.yearMonthDay.substring(0,4)),
                month: Number(editedEntrie.yearMonthDay.substring(5,7)),
                day: Number(editedEntrie.yearMonthDay.substring(8,10))
            };

            const insertedEntrie = await api.post(`/transaction`, body); // post não precisa do {data: body}
            upToDateEntries.push(insertedEntrie.data);
        } else {
            const body = {
                _id: editedEntrie._id,
                description: editedEntrie.description,
                value: editedEntrie.value,
                category: editedEntrie.category,
                type: editedEntrie.type,
                year: Number(editedEntrie.yearMonthDay.substring(0,4)),
                month: Number(editedEntrie.yearMonthDay.substring(5,7)),
                day: Number(editedEntrie.yearMonthDay.substring(8,10))
            };
            
            await api.put(`/transaction`, body); // put não precisa do {data: body}
    
            const index = upToDateEntries.findIndex(entrie => {
                return entrie._id === editedEntrie._id;
            });
    
            upToDateEntries[index] = editedEntrie;
        }

        setAllEntries(upToDateEntries);
        setSelectedEntrie(null);
        setNewEntrie(false);
    };


    const handleEditCancel = () => {
        setNewEntrie(false);
        setSelectedEntrie(null);
    };


    return (
        <div className='container'>
            <h1 className ='center'>Desafio Final do Bootcamp Full-Stack</h1>

            {
                currentScreen === ENTRIES_LIST_SCREEN ?
                    <ListScreen
                        entries={filteredEntries}
                        allPeriods={PERIODS}
                        currentPeriod={currentPeriod}
                        searchText={searchText}
                        onChangePeriod={handlePeriodChange}
                        OnCreateEntrie={handleCreateEntrie}
                        onEditEntrie={handleEntrieEdit}
                        onDeleteEntrie={handleDeleteEntrie}
                        onChangeSearchText={handleSearchTextChange}
                    />

                    : <EditScreen
                        entrie={selectedEntrie}
                        onSave={handleEditSave}
                        onCancel={handleEditCancel}
                    />
            }

        </div>
    );
}
