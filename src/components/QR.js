import React from 'react'
import { useSelector } from 'react-redux';
import { getCurrentAuthResponse } from '../store/features/authResponseSlice'
import QRCode from 'react-qr-code';

const QR = () => {

    const authResponse = useSelector(getCurrentAuthResponse);

    // Convert the verification_uri obtained from auth server and display it as a QR code
    return (
        <div className="flex justify-end px-5">
            {
                authResponse?.verification_uri_complete ?
                    (
                        <div>
                            <QRCode value={authResponse.verification_uri_complete} />
                        </div>
                    ) : (<></>)
            }
        </div>
    )
}

export default QR