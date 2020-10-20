import React from 'react'

const EARN_COLOR = '#00FA9A';
const EXPE_COLOR = '#F08080';

export default function ListScreen( { entries, currentPeriod, allPeriods, searchText, onChangePeriod, OnCreateEntrie, onDeleteEntrie, onChangeSearchText, onEditEntrie } ) {

    return (
        <>
        <select className="browser-default" value={currentPeriod} onChange={onChangePeriod}>
            {
                allPeriods.map( (period) => {
                    return <option key={period}>{period}</option>;
                })
            }
        </select>

        <div>
            <input type='text' placeholder='Filtro' value={searchText} onChange={onChangeSearchText}/>
            <button
                className='waves-effect waves-light btn'
                onClick={OnCreateEntrie}
            >+</button>
        </div>

        <div>
            {
                entries.map( (entrie) => {
                    const bgColor = ( entrie.type === '+' ? EARN_COLOR : EXPE_COLOR);

                    return (
                    <div key={entrie._id} style={ {...styles.entriesStyle, backgroundColor: bgColor} }>
                        <span style={styles.buttonStyle}>
                            <button className='waves-effect waves-light btn blue' onClick={onEditEntrie} id={entrie._id}>✎</button>
                            <button className='waves-effect waves-light btn red darken-4' onClick={onDeleteEntrie} id={entrie._id}>X</button>
                        </span>
                        <span>
                            {entrie.yearMonthDay} - <span style={styles.spanStyle}>{entrie.category}</span> - {entrie.description} {entrie.type}{entrie.value}
                        </span>
                    </div>
                    )
                })
            }
        </div>
    </>
    )
}


/* estilos */

const styles = {
    entriesStyle: {
        padding: '5px',
        margin: '5px',
        border: '1px solid',
        borderRadius: '5px'
    },

    spanStyle: {
        fontWeight: 'bold'
    },

    buttonStyle: {
        margin: '10px'
    }
}