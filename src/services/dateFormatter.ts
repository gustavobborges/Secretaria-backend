export const formatDateTime = (date) => {
  const time = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth()+1).toString().padStart(2, '0');
  const finalDate = day + '/' +  month + ' às ' + time + ':' + minutes + ' Hrs';
  return finalDate;
}