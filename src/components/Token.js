import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IDP_DEVICE_AUTH_URL, CLIENT_ID } from '../config';
import { getCurrentAuthResponse } from '../store/features/authResponseSlice';




const Token = () => {
  return (
    <div>Token</div>
  )
}

export default Token