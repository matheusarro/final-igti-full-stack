import React from 'react';
import { currencyFormatter } from '../helpers/numbersFormat';
import styles from './PeriodSummary.module.css';

const expenseValue = (entries) => {
  const expenses = entries.filter( (entry) => entry.type === '-');
  const total = expenses.reduce( (acc, entry) => acc + entry.value, 0 );
  return total;
};

const incomingValue = (entries) => {
  const expenses = entries.filter( (entry) => entry.type === '+');
  const total = expenses.reduce( (acc, entry) => acc + entry.value, 0 );
  return total;
};

export default function PeriodSummary( {periodEntries} ) {
  const totalExpenses = expenseValue(periodEntries);
  const totalIncoming = incomingValue(periodEntries);

  return (
    <>
      <h5 className='center'>Informações do Período</h5>
      <div className={`center ${styles.SummaryInfo}`}>
        <span className={styles.SummarySpan}>
          Lançamentos: <span className='grey-text text-darken-1'>{periodEntries.length}</span>
        </span>
        <span className={styles.SummarySpan}>
          Receita: <span className='green-text text-darken-1'>{currencyFormatter(totalIncoming, 'BRL')}</span>
        </span>
        <span className={styles.SummarySpan}>
          Despesa: <span className='red-text text-darken-1'>{currencyFormatter(totalExpenses, 'BRL')}</span>
        </span>
        <span className={styles.SummarySpan}>
          Saldo: <span className={totalIncoming - totalExpenses >= 0 ? 'green-text text-darken-1' : 'red-text text-darken-1'}>{currencyFormatter(totalIncoming - totalExpenses, 'BRL')}</span>
        </span>
      </div>
    </>
  )
}