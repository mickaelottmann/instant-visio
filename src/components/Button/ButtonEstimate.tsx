/**
 * This file was created by
 * Nicolas Hovart <hovart.nicolas@gmail.com>
 */

import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

const GreenButton = withStyles((theme: Theme) => ({
    root: {
        color: 'white',
        backgroundColor: '#1aae9f',
        padding: '6px 14px',
        marginTop: theme.spacing(3),
        fontSize: '0.9rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#60e0d0',
        },
    },
}))(Button)

export default function ButtonEstimate(props: { onClick?: any; title: any }) {
    return (
        <GreenButton variant="contained" onClick={props.onClick}>
            {props.title}
        </GreenButton>
    )
}
