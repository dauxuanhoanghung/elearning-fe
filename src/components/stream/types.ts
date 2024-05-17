interface MeetingFooterProps {
  roomId: string;
  onMicClick: (isEnabled: boolean) => void;
  onVideoClick: (isEnabled: boolean) => void;
  onScreenClick: () => void;
}

interface ParticipantProps {
  currentIndex: number;
  currentParticipant: any;
  hideVideo: boolean;
  videoRef?: any;
  showAvatar: boolean;
  currentUser?: any;
}
