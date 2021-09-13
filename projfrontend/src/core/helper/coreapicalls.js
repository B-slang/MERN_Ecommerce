import { API } from '../../backend'


// from here we fecthc products in home
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}