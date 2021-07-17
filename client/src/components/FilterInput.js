import React from 'react';
import styles from './FilterInput.module.css';

export default function FilterInput( { searchText, onChangeSearchText } ) {
    return (
        <div className={styles.FilterInput}>
            <input type='text' placeholder='Digite um filtro para pesquisar' value={searchText} onChange={onChangeSearchText}/>
        </div>
    );
}
