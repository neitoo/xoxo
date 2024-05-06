
export const formatDate = (dateString) =>{
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
    };

    return new Date(dateString).toLocaleString("ru", options);
}
