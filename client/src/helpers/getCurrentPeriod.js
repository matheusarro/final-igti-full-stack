const getCurrentPeriod = () => {
  const today = new Date();
  const currentPeriod = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}`

  return currentPeriod;
};

export default getCurrentPeriod;