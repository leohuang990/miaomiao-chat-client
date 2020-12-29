import axios from 'axios'



let arrayAll
axios({
    method: 'get',
    url: '/api/users',
}).then(data=>{arrayAll = data.data})

export default arrayAll;