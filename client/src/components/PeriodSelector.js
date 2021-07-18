import React from 'react';
import styles from './PeriodSelector.module.css';

export default function PeriodSelector( { allPeriods, currentPeriod, onChange } ) {
    return (
        <div className='center'>
            <span className={styles.SelectorLabel}>Selecione um período</span>
            <div className={`input-field col s12 ${styles.Selector}`}>
                <select className="browser-default" value={currentPeriod} onChange={onChange} defaultValue={currentPeriod}>
                    {
                        allPeriods.map( (period) => {
                            return <option key={period} value={period}>{period}</option>;
                        })
                    }
                </select>
            </div>
        </div>
    );
}
