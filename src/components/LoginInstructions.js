import React from 'react';

import { useSelector } from 'react-redux';
import { getCurrentAuthResponse } from '../store/features/authResponseSlice';
import { getCurrentTokenResponse } from '../store/features/tokenResponseSlice';

import LoginButton from './LoginButton';
import Token from './Token';


const LoginInstructions = () => {

    const authResponse = useSelector(getCurrentAuthResponse);
    const tokenResponse = useSelector(getCurrentTokenResponse);

    return (
        <div className="flex flex-col justify-center">
            {
                (!tokenResponse?.access_token) ? (
                    (authResponse?.user_code) ?
                        (
                            <div className="text-slate-800 flex flex-col justify-end">
                                <p className="py-2">
                                    Step 1: Scan The QR Code or Visit the URL:<br />
                                    <span className="py-1 text-lg font-semibold">
                                        {authResponse.verification_uri}
                                    </span>
                                </p>
                                <p className="py-2">
                                    Step 2: Enter the user code:<br />
                                    <span className="py-1 text-lg font-semibold">
                                        {authResponse.user_code}
                                    </span>
                                </p>
                                <p className="py-2">
                                    Step 3: Enter your username, password and click continue to login
                                </p>
                                <div className="justify-end">
                                    <LoginButton />
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-800 flex-col justify-end">
                                <p className="text-lg mt-4 ">
                                    Click the Button below to login with QR code
                                </p>
                                <LoginButton />
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
                    </div>
                )
            }
            <Token />

        </div>
    )
}

export default LoginInstructions