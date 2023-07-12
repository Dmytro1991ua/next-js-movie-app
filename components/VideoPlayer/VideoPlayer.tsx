import React, { FC } from "react";
import YouTube from "react-youtube";

import { PLAYER_CONFIG } from "./constants";
import Button from "../Button";

interface VideoPlayerProps {
  trailerUrl: string;
  onClose: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ trailerUrl, onClose }) => {
  return (
    <>
      <div
        className="absolute inset-0 bg-black opacity-50 h-full w-full z-40 transition"
        data-testid="video-player"
      />
      <div className="absolute inset-0 z-50">
        <YouTube
          iframeClassName="absolute left-[8%] top-[10%]"
          opts={PLAYER_CONFIG}
          videoId={trailerUrl}
        />
      </div>
      <Button
        className="absolute z-[60] bottom-[17%] right-[13%]"
        variant="secondary"
        onClick={onClose}
      >
        Close
      </Button>
    </>
  );
};

export default VideoPlayer;
