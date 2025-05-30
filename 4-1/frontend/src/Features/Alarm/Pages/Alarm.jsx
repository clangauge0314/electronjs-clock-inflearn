import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../../Shared/Components/Layout';
import { TimeDisplay, DateDisplay } from '../../../Shared/Components/Display';
import { useTimeFormat } from '../../../Shared/Hooks';

const Alarm = () => {
  const { formatTime } = useTimeFormat();
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1); 

    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <DateDisplay date={currentTime} />
        <TimeDisplay 
          time={formatTime(currentTime, true)} 
          size="xl"
        />
      </div>
    </PageContainer>
  );
};

export default Alarm;