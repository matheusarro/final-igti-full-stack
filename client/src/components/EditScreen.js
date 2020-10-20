import React from 'react';

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

export default function EditScreen( { entrie, onSave, onCancel } ) {
    const [description, setDescription] = React.useState('');
    const [value, setValue] = React.useState('0');
    const [category, setCategory] = React.useState('');
    const [date, setDate] = React.useState(today());
    const [type, setType] = React.useState('-');
    const [mode, setMode] = React.useState(INSERTING);

    React.useEffect( () => {
        if (!entrie) {
            return;
        }

        const { description, value, category, yearMonthDay, type } = entrie;

        setDescription(description);
        setValue(value);
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);
        setMode(EDITING);
    }, [entrie]);

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
        const editedEntrie = {
            _id: !!entrie ? entrie._id : null,
            description,
            value,
            category,
            yearMonthDay: date,
            type
        };

        onSave(editedEntrie);
    };


    return (
        <div>
            <div>
                <span>
                    <label>
                        <input name='expense_earning' type='radio' value='-' checked={type === '-'} onChange={handleTypeChange} />
                        <span>Despesa</span>
                    </label>
                </span>
                <span>
                    <label>
                        <input name='expense_earning' type='radio' value='+' checked={type === '+'} onChange={handleTypeChange} />
                        <span>Receita</span>
                    </label>
                </span>
            </div>


            <div className='input-field'>
                <input type='text' value={description} id='inputDescription' onChange={handleDescriptionChange} />
                <label htmlFor='inputDescription' className='active'>Descrição</label>
            </div>

            <div className='input-field'>
                <input type='number' value={value} id='inputValue' onChange={handleValueChange} />
                <label htmlFor='inputValue' className='active'>Valor</label>
            </div>

            <div className='input-field'>
                <input type='text' value={category} id='inputCategory' onChange={handleCategoryChange} />
                <label htmlFor='inputCategory' className='active'>Categoria</label>
            </div>

            <div className='input-field'>
                <input type='date' value={date} id='inputDate' onChange={handleDateChange} />
                <label htmlFor='inputDate' className='active'>Data</label>
            </div>

            <button className='waves-effect waves-light btn' onClick={handleSaveButton}>🖪</button>
            <button className='waves-effect waves-light btn red darken-4' onClick={onCancel}>X</button>
        </div>
    )
}
