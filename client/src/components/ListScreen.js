import React from 'react';
import CreateEntrieButton from './CreateEntrieButton';
import EntriesList from './EntriesList';
import FilterInput from './FilterInput';
import PeriodSelector from './PeriodSelector';


export default function ListScreen( { entries, currentPeriod, allPeriods, searchText, onChangePeriod, OnCreateEntrie, onDeleteEntrie, onChangeSearchText, onEditEntrie } ) {

    return (
        <>
        
            < PeriodSelector
                allPeriods={allPeriods}
                currentPeriod={currentPeriod}
                onChangePeriod={onChangePeriod}
            />
            
            <div>
                <FilterInput
                    searchText={searchText}
                    onChangeSearchText={onChangeSearchText}
                />
                <CreateEntrieButton
                    OnCreateEntrie={OnCreateEntrie}
                />
            </div>

            <EntriesList
                entries={entries}
                onEditEntrie={onEditEntrie}
                onDeleteEntrie={onDeleteEntrie}
            />

        </>
    );
}