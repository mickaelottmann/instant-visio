/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import MenuBar from './MenuBar'
import { shallow } from 'enzyme'
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton'
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton'
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton'
import useRoomState from '../../hooks/useRoomState/useRoomState'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'

jest.mock('../../hooks/useRoomState/useRoomState')
jest.mock('../../hooks/useVideoContext/useVideoContext')

const mockUseRoomState = useRoomState as jest.Mock<any>
const mockUseVideoContext = useVideoContext as jest.Mock<any>

mockUseVideoContext.mockImplementation(() => ({
    isSharingScreen: false,
    toggleScreenShare: () => {},
    room: { name: 'Test Room' },
}))

mockUseRoomState.mockImplementation(() => 'connected')

describe('the MenuBar component', () => {
    it('should disable toggle buttons while reconnecting to the room', () => {
        mockUseRoomState.mockImplementationOnce(() => 'reconnecting')
        const wrapper = shallow(<MenuBar />)
        expect(wrapper.find(ToggleAudioButton).prop('disabled')).toBe(true)
        expect(wrapper.find(ToggleVideoButton).prop('disabled')).toBe(true)
        expect(wrapper.find(ToggleScreenShareButton).prop('disabled')).toBe(
            true
        )
    })

    it('should enable toggle buttons while connected to the room', () => {
        const wrapper = shallow(<MenuBar />)
        expect(wrapper.find(ToggleAudioButton).prop('disabled')).toBe(false)
        expect(wrapper.find(ToggleVideoButton).prop('disabled')).toBe(false)
        expect(wrapper.find(ToggleScreenShareButton).prop('disabled')).toBe(
            false
        )
    })

    it('should hide the ToggleScreenShareButton and show the "You are sharing your screen" banner when isSharingScreen is true', () => {
        mockUseVideoContext.mockImplementationOnce(() => ({
            isSharingScreen: true,
            toggleScreenShare: () => {},
            room: { name: 'Test Room' },
        }))
        const wrapper = shallow(<MenuBar />)
        expect(wrapper.find(ToggleScreenShareButton).exists()).toBe(false)
        expect(wrapper.find(Grid).at(0).find(Typography).text()).toBe(
            'You are sharing your screen'
        )
    })

    it('should call toggleScreenShare when the "Stop Sharing" button is clicked', () => {
        const mockToggleScreenShare = jest.fn()
        mockUseVideoContext.mockImplementationOnce(() => ({
            isSharingScreen: true,
            toggleScreenShare: mockToggleScreenShare,
            room: { name: 'Test Room' },
        }))
        const wrapper = shallow(<MenuBar />)

        wrapper.find(Grid).at(0).find(Button).simulate('click')

        expect(mockToggleScreenShare).toHaveBeenCalledTimes(1)
    })
})
