import React from 'react';
import { currencyFormatter } from '../helpers/numbersFormat';
import styles from './EntriesList.module.css';

const EARN_COLOR = 'green lighten-3';
const EXPE_COLOR = 'red lighten-3';

export default function EntriesList( { entries, onEditEntry, onDeleteEntry } ) {

    return (
        <div>
            {
                entries.map( (entry) => {
                    const bgColor = ( entry.type === '+' ? `${EARN_COLOR}` : `${EXPE_COLOR}`);

                    return (
                    <div key={entry._id} className={`card-panel ${bgColor} ${styles.EntryStyle}`}>
                        <div className={styles.InfoStyle}>
                            <span className={styles.Date}>{entry.yearMonthDay.substring(8,10)}</span>
                            <span className={styles.Value}>{currencyFormatter(entry.value, 'BRL')}</span>
                            <span className={styles.EntryCategoryDescription}>
                                <span className={styles.Category}>{entry.category}</span>
                                <span className={styles.Description}>{entry.description}</span>
                            </span>
                        </div>
                        <div className={styles.ActionButtonsDiv}>
                            <button
                                className={`waves-effect waves-light btn blue lighten-1 ${styles.Button}`}
                                onClick={onEditEntry}
                                id={entry._id}
                                title={'Editar lançamento'}
                            >&#x270E;</button>
                            <button
                                className={`waves-effect waves-light btn red darken-1 ${styles.Button}`}
                                onClick={onDeleteEntry}
                                id={entry._id}
                                title={'Excluir lançamento'}
                            > &#x1F5D1; </button>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
}
