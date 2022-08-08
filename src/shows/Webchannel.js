import React from 'react'

const Webchannel = ({web_c}) => {
    if (web_c === null) {
        return <p>Not Found</p>

    }
    else { return <p>{web_c.name}</p> }
}

export default Webchannel;