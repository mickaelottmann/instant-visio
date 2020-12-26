import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SwipeableTemporaryDrawer from '../../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginModal } from '../../LoginModal/loginModalActions'
import { signOut } from '../../../actions/userActions'
import { selectToken, selectUser } from '../userSelector'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'white',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
)

const WhiteAppBar = styled.div`
    .MuiAppBar-colorPrimary {
        background-color: white;
    }
`

const AppBar = () => {
    const classes = useStyles()
    const hasToken = useSelector(selectToken)
    const user = useSelector(selectUser)
    const { t } = useTranslation('common')
    const dispatch = useDispatch()
    const history = useHistory()
    const isPremiumUser = hasToken && !user.isAnonymous

    return (
        <div className={classes.root}>
            <WhiteAppBar>
                <MaterialAppBar color="primary" position="static">
                    <Toolbar>
                        <Typography
                            color="primary"
                            variant="h6"
                            className={classes.title}>
                            {t('appBar.appName')}
                        </Typography>
                        <Button color="primary">
                            {t('appBar.joinVisioButton')}
                        </Button>
                        {isPremiumUser ? (
                            <Button
                                onClick={() => {
                                    dispatch(signOut())
                                    history.replace('/')
                                }}>
                                Sign out
                            </Button>
                        ) : (
                            <Button
                                onClick={() => dispatch(showLoginModal())}
                                color="primary">
                                {t('appBar.loginButton')}
                            </Button>
                        )}

                        <SwipeableTemporaryDrawer />
                    </Toolbar>
                </MaterialAppBar>
            </WhiteAppBar>
        </div>
    )
}

export default AppBar
