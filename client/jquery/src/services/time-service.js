export const timeAgo = (date) => {
  return moment(date, 'YYYYMMDD').fromNow();
}

/**
 * Formats a given date to MMMM Do YYYY format.
 * 
 * @param { Date } date
 * 
 * @returns { String } Formatted date
 */
export const formatDate = (date) => {
  return moment(date).format('MMMM Do YYYY');
}