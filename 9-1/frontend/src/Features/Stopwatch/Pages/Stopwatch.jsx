import React, { useEffect, useRef } from "react";
import { HiPlay, HiPause, HiRefresh, HiClock } from "react-icons/hi";
import { PageContainer } from "../../../Shared/Components/Layout";
import { TimeDisplay } from "../../../Shared/Components/Display";
import { PrimaryButton } from "../../../Shared/Components/Buttons";
import { useStopwatchStore } from "../../../Shared/Stores/StopwatchStore";
import { useTimeFormat } from "../../../Shared/Hooks/useTimeFormat";

const Stopwatch = () => {
  const { StopwatchFormatTime } = useTimeFormat();
  const {} = useStopwatchStore();

  const intervalRef = useRef(null);

  const handleStartStop = () => {};

  const handleReset = () => {};


  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <TimeDisplay time={"00:00:00.000"} size="xl" showMilliseconds={true} />

        <div className="flex space-x-4 justify-center">
          <PrimaryButton
            onClick={handleStartStop}
            color={"green"}
            icon={<HiPlay className="w-5 h-5" />}
          >
            시작
          </PrimaryButton>

          <PrimaryButton
            onClick={handleReset}
            color="gray"
            icon={<HiRefresh className="w-5 h-5" />}
          >
            초기화
          </PrimaryButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default Stopwatch;
