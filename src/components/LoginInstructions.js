import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { getCurrentAuthResponse } from '../store/features/authResponseSlice';
import { getCurrentTokenResponse } from '../store/features/tokenResponseSlice';


const LoginInstructions = () => {

    const authResponse = useSelector(getCurrentAuthResponse);
    const tokenResponse = useSelector(getCurrentTokenResponse);

    const [decodedToken, setDecodedToken] = useState({});   // Decoded token is required to display once the user is authenticated

    useEffect(() => {
        if (tokenResponse?.access_token) {
            setDecodedToken(jwtDecode(tokenResponse.access_token));
        }
    }, [tokenResponse]);

    return (
        <div>
            {
                (!tokenResponse?.access_token) ? (
                    (authResponse?.user_code) ?
                        (
                            <div className="text-slate-800">
                                <p className="py-2">
                                    Step 1: Scan The QR Code or Visit the URL<br />
                                    <span className="py-1 text-lg font-semibold break-all">
                                        {authResponse.verification_uri}
                                    </span>
                                </p>
                                <p className="py-2">
                                    Step 2: Enter the user code<br />
                                    <span className="py-1 text-lg font-semibold">
                                        {authResponse.user_code}
                                    </span>
                                </p>
                                <p className="py-2">
                                    Step 3: Enter your username, password and click continue to login
                                </p>
                            </div>
                        ) : (
                            <div className="text-slate-800">
                                <p className="text-lg mt-4 ">
                                    Click the Button below to login with QR code
                                </p>
                            </div>
                        )
                ) : (
                    <div>
                        <p className="text-xl font-semibold">
                            Congratulations!
                        </p>
                        <p>
                            You have successfully logged in as
                        </p>
                        <div className="text-lg font-semibold">{
                            /**
                             * Should set the First Name (given name) as the Subject claim to display the name once user is logged in.
                             * Find the instructions in the blog or the readme file for instructions setting it in WSO2 IS.
                             */
                            (decodedToken !== {}) ? decodedToken.sub : <></>
                        }</div>
                    </div>
                )
            }
        </div>
    )
}

export default LoginInstructions