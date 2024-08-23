
export const handleSortByLabel = (initialData: any[], key: string, sortDirection: string) => {
    let sortedResults;
    switch(key) {
        case 'id':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.id - b.id : b.id - a.id);
            break;
        case 'name':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            break;
        case 'method':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.method.localeCompare(b.method) : b.method.localeCompare(a.method));
            break;
        case 'bank_check':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.bank_check.localeCompare(b.bank_check) : b.bank_check.localeCompare(a.bank_check));
            break;
        case 'bank_account':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.bank_account.localeCompare(b.bank_account) : b.bank_account.localeCompare(a.bank_account));
            break;
        case 'status':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? a.active - b.active : b.active - a.active);
            break;
        case 'date_created':
            sortedResults = initialData.sort((a, b) => sortDirection === 'asc' ? new Date(a.date_created).getTime() - new Date(b.date_created).getTime() : new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
            break;
        default:
            sortedResults = initialData;
    }
    return sortedResults;
};
