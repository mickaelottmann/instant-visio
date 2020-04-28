import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './App.scss'
import {
    Home,
    VideoCall,
    LegalMentions,
    PersonalData,
    Blog,
    Credits,
} from '../../pages'
import Page404 from '../../pages/404/Page404'

const App = () => {
    const { t } = useTranslation()

    useEffect(() => {
        // when using vh and vw units in css:
        // to make sure the height taken into account
        // is the whole window size,
        // not the visible window size
        // (critical on mobile, where, on click on the contact form inputs,
        // the keyboard appears and takes half of the window size,
        // which shrinks the form size - unpleasant user experience)
        if (!window.location.pathname.includes('visio')) {
            setTimeout(() => {
                const viewheight = window.innerHeight
                const viewwidth = window.innerWidth
                const viewport = document.querySelector('meta[name=viewport]')
                viewport.setAttribute(
                    'content',
                    `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`
                )
            }, 300)
        }
    }, [])

    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route
                    path={`/${t('url.video-call')}/:videoName`}
                    component={VideoCall}
                />
                <Route
                    path={`/${t('url.legal-mentions')}`}
                    component={LegalMentions}
                />
                <Route
                    path={`/${t('url.personal-data')}`}
                    component={PersonalData}
                />
                <Route path={`/${t('url.blog')}`} component={Blog} />
                <Route path={`/${t('url.blog')}/:post`} component={Blog} />
                <Route path={`/${t('url.credits')}`} component={Credits} />
                <Route component={Page404} />
            </Switch>
        </div>
    )
}

export default App
