import React from 'react'
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { SlLock, SlLockOpen } from 'react-icons/sl';

import { getCurrentAuthResponse } from '../store/features/authResponseSlice';
import { getCurrentTokenResponse } from '../store/features/tokenResponseSlice';

const QR = () => {

    const authResponse = useSelector(getCurrentAuthResponse);
    const tokenResponse = useSelector(getCurrentTokenResponse);

    // Convert the verification_uri obtained from auth server and display it as a QR code
    return (
        <div>
            {
                !tokenResponse?.access_token ? (
                    authResponse?.verification_uri_complete ?
                        (
                            <div>
                                <QRCode
                                    className="max-md:w-28"
                                    size={152}
                                    value={authResponse.verification_uri_complete} />
                            </div>
                        ) : (
                            <SlLock size={70} />
                        )
                ) : (
                    <SlLockOpen size={70} />
                )
            }
        </div>
    )
}

export default QR