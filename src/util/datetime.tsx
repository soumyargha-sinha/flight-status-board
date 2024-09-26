const getFormattedDateTime = (timestamp: string) => {
    const dateObj = new Date(timestamp);
    return {
        date: dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions),
        time: dateObj.toTimeString().split(' ')[0]
    }
}

export { getFormattedDateTime };