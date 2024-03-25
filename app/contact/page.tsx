import React from 'react';
import { GetInTouch } from '@/components/Contact/GetInTouch';
import classes from './page.module.css';

export default function Contact() {
  return (
    <div className={classes.wrapper}>
        <GetInTouch />
    </div>
  );
}
