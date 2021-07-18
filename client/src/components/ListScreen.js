import React from 'react';
import CreateEntrieButton from './CreateEntryButton';
import EntriesList from './EntriesList';
import FilterInput from './FilterInput';
import PeriodSelector from './PeriodSelector';
import styles from './ListScreen.module.css';
import PeriodSummary from './PeriodSummary';

export default function ListScreen( { entries, currentPeriod, allPeriods, searchText, onChangePeriod, onCreateEntry, onDeleteEntry, onChangeSearchText, onEditEntry } ) {

    return (
        <>
            < PeriodSelector
                allPeriods={allPeriods}
                currentPeriod={currentPeriod}
                onChange={onChangePeriod}
            />

            <PeriodSummary
                periodEntries={entries}
            ></PeriodSummary>
            
            <div className={styles.FilterCreate}>
                <FilterInput
                    searchText={searchText}
                    onChangeSearchText={onChangeSearchText}
                />
                <CreateEntrieButton
                    onCreateEntry={onCreateEntry}
                />
            </div>

            <EntriesList
                entries={entries}
                onEditEntry={onEditEntry}
                onDeleteEntry={onDeleteEntry}
            />

        </>
    );
}