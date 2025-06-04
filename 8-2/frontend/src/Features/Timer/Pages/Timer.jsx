import React, { useState, useEffect } from 'react';
import { HiPlay, HiPause, HiStop, HiCog } from "react-icons/hi";
import { PageContainer } from "../../../Shared/Components/Layout";
import { TimeDisplay } from '../../../Shared/Components/Display';
import { PrimaryButton } from '../../../Shared/Components/Buttons';
import { useTimerStore } from '../../../Shared/Stores/TimerStore';
import { useTimeFormat } from '../../../Shared/Hooks';
import TimerEditModal from '../Components/TimerEditModal';

const Timer = () => {
  const { formatTime } = useTimeFormat();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {

  } = useTimerStore();

  const handleModalSuccess = (settings) => {

  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <TimeDisplay 
          time={"00:00"}
          size="xl"
          className={() => {}}
        />
        
        <div className="flex gap-4 justify-center">
          <PrimaryButton
            onClick={() => {}}
            disabled={() => {}}
            icon={<HiPlay className="w-6 h-6" />}
            color="green"
          >
            시작
          </PrimaryButton>
          
          <PrimaryButton
            onClick={() => {}}
            disabled={() => {}}
            icon={<HiPause className="w-6 h-6" />}
            color="red"
          >
            일시정지
          </PrimaryButton>
          
          <PrimaryButton
            onClick={() => {}}
            disabled={() => {}}
            icon={<HiStop className="w-6 h-6" />}
            color="gray"
          >
            정지
          </PrimaryButton>
        </div>

        <div className="flex justify-center">
          <PrimaryButton
            onClick={() => setIsModalOpen(true)}
            icon={<HiCog className="w-6 h-6" />}
            color="indigo"
            className="flex items-center justify-center px-12"
          >
            타이머 설정
          </PrimaryButton>
        </div>
      </div>

      <TimerEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        initialTimer={null}
      />
    </PageContainer>
  );
};

export default Timer;