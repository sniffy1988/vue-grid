export default function filterGrid(grid, filters) {
    const newGrid = grid.filter((item) => {
       let flag = true;
        for (let filter of filters) {
            const name = filter.name.toLowerCase();
            if(item[name] !== filter.value) {
                flag = false;
            }
        }
       return flag;
    });
    return newGrid;
}
