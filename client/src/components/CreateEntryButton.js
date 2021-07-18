import React from 'react';
import styles from './CreateEntryButton.module.css';

export default function CreateEntryButton( { onCreateEntry } ) {
    return (
        <div>
            <button
                className={`waves-effect waves-light btn ${styles.Button}`}
                onClick={onCreateEntry}
                title={'Criar novo lançamento'}
            >+</button>
        </div>
    )
}
