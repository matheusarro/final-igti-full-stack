import React from 'react';

export default function FilterInput( { searchText, onChangeSearchText } ) {
    return (
        <div>
            <input type='text' placeholder='Filtro' value={searchText} onChange={onChangeSearchText}/>
        </div>
    );
}
