import axios from 'axios';

export default function fetchGrid() {
    return axios.get('data/grid_data.json');
}
