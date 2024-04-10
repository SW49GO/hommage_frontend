/**
 * Function to format Date
 * @param {string} data 
 * @returns 
 */
export function setFormatDate(data) {

        const [year, month, day] = data.split('-').map(Number)

        // Créer un nouvel objet Date
        const newDate = new Date(year, month - 1, day)
        const formattedDay = ('0' + newDate.getDate()).slice(-2)
        const formattedMonth = ('0' + (newDate.getMonth() + 1)).slice(-2)
        const formattedYear = newDate.getFullYear()

        const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`

        return formattedDate
}
