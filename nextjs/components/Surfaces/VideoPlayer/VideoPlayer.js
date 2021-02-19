import React from "react"
import PropTypes from "prop-types"
import YouTube from "react-youtube"
import { connect } from "react-redux"

import { openModal } from "@actions/layout"

import VideoPlayIcon from "../../../public/icons/video-play.svg"

import "./VideoPlayer.scss"

const Player = (id) => {
  const _onReady = (event) => {
    event.target.playVideo()
  }

  return (
    <YouTube
      videoId={id}
      opts={{
        width: "100%",
        playerVars: {
          autoplay: 1
        }
      }}
      onReady={_onReady}
    />
  )
}

const VideoPlayer = ({ openModal, videoId }) => {
  const openVideoHandler = (id) => {
    openModal(Player(id))
  }

  return (
    <div className="video-player">
      <div className="video-player__icon"
           onClick={() => openVideoHandler(videoId)}
      >
        <VideoPlayIcon/>
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  openModal: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  openModal
}

export default connect(null, mapDispatchToProps)(VideoPlayer)
