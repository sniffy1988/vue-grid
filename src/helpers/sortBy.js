import orderBy from 'lodash/orderBy';

export default function sorter(array, filters) {
    let resultArray = JSON.parse(JSON.stringify(array));
    let innerFilters = JSON.parse(JSON.stringify(filters));
    let sortFiltersArr = {
        names: [],
        types: []
    };
    for (let filter of innerFilters) {
        if (filter.sortFilter) {
            sortFiltersArr.names.push(filter.name);
            sortFiltersArr.types.push(filter.sortFilter);
        }
    }
    return orderBy(resultArray, sortFiltersArr.names, sortFiltersArr.types);
}