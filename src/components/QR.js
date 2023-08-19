import React from 'react'
import { useSelector } from 'react-redux';
import { getCurrentAuthResponse } from '../store/features/authResponseSlice'
import QRCode from 'react-qr-code';

const QR = () => {

    const authResponse = useSelector(getCurrentAuthResponse);

    return (
        <div>
            {
                authResponse?.verification_uri_complete ?
                    (
                        <div className="p-10" >
                            <QRCode value={authResponse.verification_uri_complete} /></div>
                    ) : (<></>)
            }
        </div>
    )
}

export default QR