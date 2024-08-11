import React from 'react';
import Error from '../components/Error/Error.tsx';

export default function NotFound() {
    return (
        <>
            <title>Error 404</title>
            <meta name="description" content="Not found" />
            <Error />
        </>
    );
}
