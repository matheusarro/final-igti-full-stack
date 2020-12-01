import React from 'react';

export default function PeriodSelector( { allPeriods, currentPeriod, onChangePeriod } ) {
    return (
        <div>
            <select className="browser-default" value={currentPeriod} onChange={onChangePeriod}>
                {
                    allPeriods.map( (period) => {
                        return <option key={period}>{period}</option>;
                    })
                }
            </select>
        </div>
    );
}
