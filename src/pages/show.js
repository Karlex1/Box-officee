import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(
        () => {
            let isMounted = 'true';
            apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
                if (isMounted) {
                   setShow(results);
                setIsLoading(false); 
                }
                
            }).catch(
                err => {
                    setError(err.message);
                    setIsLoading(false);
                })
            return () => { isMounted = false; }
        }, [id])
    console.log('show', show);
    if (isLoading) {
       return <div>Loading...</div>
    }
    if (error) {
        return <div>Error occured: { error}</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>show</div>
    )
}

export default Show