import React, { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../App';


export const getCalendarEvents=async()=> {
  return await axios.get(`${baseUrl}/calendar`)
  .then(res => res.data);
}

export const renewHoliday=async()=> {
  return await axios.post(`${baseUrl}/holiday-renew`)
  .then(res => res.data);
}