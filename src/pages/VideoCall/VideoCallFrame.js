import React from 'react'
import { IframeContainer } from './VideoCallComponents'
import { useTranslation } from 'react-i18next'
import RatingModal from '../../components/RatingModal'
import classNames from 'classnames'

const VideoCallFrame = ({
    participantsNumber,
    participantStatus,
    hasLeft,
    camOn,
    videoFrame,
}) => {
    const { t } = useTranslation('videocall')

    return (
        <IframeContainer>
            {!hasLeft && (
                <iframe
                    className="iframe"
                    title="video call iframe"
                    ref={videoFrame}
                    allow="microphone; camera; autoplay"
                    allowFullScreen
                />
            )}
            {!camOn && !hasLeft && (
                <div
                    className={classNames({
                        'mute-camera': true,
                        'mute-camera-two': participantsNumber < 3,
                        'mute-camera-three': participantsNumber === 3,
                        'mute-camera-four': participantsNumber === 4,
                    })}>
                    {t('turn-on-cam-message')}
                </div>
            )}

            {!hasLeft && (
                <div className="waiting-participant">{participantStatus}</div>
            )}

            {hasLeft && (
                <div>
                    {t('leave-confirmation')}
                    <RatingModal hasLeft></RatingModal>
                </div>
            )}
        </IframeContainer>
    )
}

export default VideoCallFrame
