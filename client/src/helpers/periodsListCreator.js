// trazer os períodos do ano anterior, do atual e do próximo no formato MM-YYYY

const getPeriodosFromCurrentPreviousNextYears  = () => {
    const today = new Date();
    // console.log(today.toISOString().split('T')[0]); // traz a data no formato ISO, quebrando no caractere T e somente o index 0 do array

    let allPeriods = [];

    for (let year = today.getFullYear() - 1; year <= today.getFullYear() + 1; year++) {
        for (let month = 1; month <= 12; month++) {
            const period = `${year}-${month.toString().padStart(2,'0')}`;
            allPeriods.push(period);
        }
        // console.log(`Novos periodos adicionados para: ${year}`);
    }

    return allPeriods;
};

export default getPeriodosFromCurrentPreviousNextYears;