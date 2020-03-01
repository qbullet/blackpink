import axios from 'axios'
const URL = 'https://bp-ticket.herokuapp.com'


async function TimeProvider (payload) {
    // eslint-disable-next-line no-console
    const resp = await axios.post(URL+'/ticket-isAvailable',payload)
    return resp.data
}

export default TimeProvider