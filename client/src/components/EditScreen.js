import React, {useState, useEffect} from 'react';
import styles from './EditScreen.module.css';

const INSERTING = 0;
const EDITING = 1;

function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    return today;
}

export default function EditScreen( { entry, onSave, onCancel } ) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('0');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(today());
    const [type, setType] = useState('-');
    const [mode, setMode] = useState(INSERTING);

    useEffect( () => {
        if (!entry) {
            return;
        }

        const { description, value, category, yearMonthDay, type } = entry;

        setDescription(description);
        setValue(value);
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);
        setMode(EDITING);
    }, [entry]);

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
    };

    const handleValueChange = (event) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
    };

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
    };

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
    };

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setType(newType);
    };


    const handleSaveButton = () => { // manipula a prop.entrie
        const editedEntry = {
            _id: !!entry ? entry._id : null,
            description,
            value,
            category,
            yearMonthDay: date,
            type
        };

        onSave(editedEntry);
    };


    return (
        <>
            {mode === INSERTING ? <h5 className='center'>Inclusão de Lançamento</h5> : <h5 className='center'>Alteração de Lançamento</h5>}

            <div className='input-field'>
                <input type='text' value={description} id='inputDescription' onChange={handleDescriptionChange} />
                <label htmlFor='inputDescription' className='active'>Descrição</label>
            </div>

            <div className='input-field'>
                <input type='text' value={category} id='inputCategory' onChange={handleCategoryChange} />
                <label htmlFor='inputCategory' className='active'>Categoria</label>
            </div>

            <div className={styles.ValueEntryTypeBlock}>
                <div className='input-field'>
                    <input type='number' value={value} id='inputValue' min='0' onChange={handleValueChange} />
                    <label htmlFor='inputValue' className='active'>Valor</label>
                </div>

                <div className={styles.EntryTypeBlock}>
                    <span className={styles.EntryType}>
                        <label>
                            <input name='expense_earning' type='radio' value='-' checked={type === '-'} onChange={handleTypeChange} />
                            <span>Despesa</span>
                        </label>
                    </span>
                    <span className={styles.EntryType}>
                        <label>
                            <input name='expense_earning' type='radio' value='+' checked={type === '+'} onChange={handleTypeChange} />
                            <span>Receita</span>
                        </label>
                    </span>
                </div>

                <div className={`input-field ${styles.DateField}`}>
                    <input type='date' value={date} id='inputDate' onChange={handleDateChange} />
                    <label htmlFor='inputDate' className='active'>Data</label>
                </div>
            </div>

            <div className={styles.ActionButtonsDiv}>
                <button className={`waves-effect waves-light btn green darken-1 ${styles.Button}`} title={'Salvar lançamento'} onClick={handleSaveButton}>&#x2713;</button>
                <button className={`waves-effect waves-light btn red darken-1 ${styles.Button}`} title={'Cancelar operação e retornar'} onClick={onCancel}>&#x21BA;</button>
            </div>
        </>
    )
}
