import React from 'react'

export default function CreateEntrieButton( { OnCreateEntrie } ) {
    return (
        <div>
            <button
                className='waves-effect waves-light btn'
                onClick={OnCreateEntrie}
            >+</button>
        </div>
    )
}
