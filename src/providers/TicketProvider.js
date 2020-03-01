import axios from 'axios'
const URL = 'https://bp-ticket.herokuapp.com'


async function TicketProvider () {
    // eslint-disable-next-line no-console
    const resp = await axios.post(URL+'/ticket-get')
    return resp.data
}

export default TicketProvider