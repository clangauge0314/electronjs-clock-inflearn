import React, { useEffect, useState } from "react";
import { useThemeStore } from "../../../Shared/Stores/ThemeStore";
import { useAlarmStore } from "../../../Shared/Stores/AlarmStore";
import {
  ModalContainer,
  ModalHeader,
  AlarmSoundSelect,
  SoundPreviewButton,
  VolumeControl,
  ModalFooter,
  getCurrentTime,
} from "../../../Shared/Utils/ModalUtils";
import { DEFAULT_VOLUME } from "../../../Shared/Constants/Sounds";
import { AlarmToasts } from "../../../Shared/Utils/SonnerUtils";

const AlarmCreateModal = ({ isOpen, onClose }) => {
  const { isDark } = useThemeStore();
  const { createAlarm, isLoading, currentAudio, setCurrentAudio } =
    useAlarmStore();

  const [alarmTime, setAlarmTime] = useState(getCurrentTime());
  const [selectedSound, setSelectedSound] = useState("music1");
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClose = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAlarm({
        alarm_time: alarmTime,
        sound_id: selectedSound,
        volume: isMuted ? 0 : volume,
        is_active: true
      });
      handleClose();
      AlarmToasts.created(alarmTime);
    } catch (err) {
      console.error('알람 생성 실패:', err);
      AlarmToasts.error('알람 생성에 실패했습니다.');
    }
  };

  const handlePreviewToggle = () => {
    if (isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      setIsPlaying(false);
    } else {
      const audio = new Audio(`/sounds/${selectedSound}.mp3`);
      audio.volume = isMuted ? 0 : volume;
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    const volumeValue = typeof newVolume === 'number' ? newVolume : parseFloat(newVolume.target.value);
    setVolume(volumeValue);
    if (currentAudio && !isMuted) {
      currentAudio.volume = volumeValue;
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (currentAudio) {
      currentAudio.volume = newMutedState ? 0 : volume;
    }
  };

  useEffect(() => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  }, [selectedSound]);

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <ModalHeader title="새 알람 추가" onClose={handleClose} />

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              step="1"
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />

            <div className="flex gap-2">
              <AlarmSoundSelect
                value={selectedSound}
                onChange={(e) => setSelectedSound(e.target.value)}
                className="flex-1"
              />
              <SoundPreviewButton
                isPlaying={isPlaying}
                onTogglePreview={handlePreviewToggle}
                isDark={isDark}
              />
            </div>

            <VolumeControl
              volume={volume}
              onVolumeChange={handleVolumeChange}
              isMuted={isMuted}
              onMuteToggle={handleMuteToggle}
            />
          </div>

          <ModalFooter
            onCancel={handleClose}
            onSubmit={handleSubmit}
            submitText="알람 설정"
            isLoading={false}
          />
        </form>
      </ModalContainer>
    </>
  );
};

export default AlarmCreateModal;
