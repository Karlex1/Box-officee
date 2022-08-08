import React from 'react'
import { WebcWrapper } from './webStyled';

const Webchannel = ({ web_c }) => {
    
    if (web_c === null) {
        return <WebcWrapper>Not Found</WebcWrapper>

    }
    else { return <WebcWrapper>{web_c.name}</WebcWrapper> }
}

export default Webchannel;