import React from 'react';
import styles from './EntriesList.module.css';

const EARN_COLOR = '#00FA9A';
const EXPE_COLOR = '#F08080';

export default function EntriesList( { entries, onEditEntrie, onDeleteEntrie } ) {

    return (
        <div>
            {
                entries.map( (entrie) => {
                    const bgColor = ( entrie.type === '+' ? EARN_COLOR : EXPE_COLOR);

                    return (
                    <div key={entrie._id} className={styles.EntrieStyle} style={ {backgroundColor: bgColor} }>
                        <span className={styles.ButtonStyle}>
                            <button className='waves-effect waves-light btn blue' onClick={onEditEntrie} id={entrie._id}>✎</button>
                            <button className='waves-effect waves-light btn red darken-4' onClick={onDeleteEntrie} id={entrie._id}>X</button>
                        </span>
                        <span>
                            {entrie.yearMonthDay} <span className={styles.CategoryStyle}>{entrie.category}</span> R$ {entrie.value} <span style={ {fontStyle: 'italic', marginLeft: '25px'} }>{entrie.description}</span>
                        </span>
                    </div>
                    )
                })
            }
        </div>
    );
}
