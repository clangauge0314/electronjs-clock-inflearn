import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAlarmStore = create(
  persist(
    (set, get) => ({
      alarms: [],
      isLoading: false,
      error: null,
      
      currentAudio: null,
      volume: 0.7,
      isMuted: false,

      createAlarm: (alarmData) => {
        set({ isLoading: true, error: null });
        try {
          const newAlarm = {
            ...alarmData,
            id: Date.now(),
            created_at: new Date().toISOString(),
            is_active: true
          };
          set((state) => ({ 
            alarms: [...state.alarms, newAlarm],
            isLoading: false 
          }));
          return newAlarm;
        } catch (error) {
          set({ error: '알람 생성에 실패했습니다.', isLoading: false });
          throw error;
        }
      },

      updateAlarm: (id, data) => {
        try {
          set((state) => ({
            alarms: state.alarms.map(alarm => 
              alarm.id === id ? { ...alarm, ...data } : alarm
            )
          }));
        } catch (error) {
          set({ error: '알람 업데이트에 실패했습니다.' });
          throw error;
        }
      },

      deleteAlarm: (id) => {
        try {
          set((state) => ({
            alarms: state.alarms.filter(alarm => alarm.id !== id)
          }));
        } catch (error) {
          set({ error: '알람 삭제에 실패했습니다.' });
          throw error;
        }
      },

      setCurrentAudio: (audio) => set({ currentAudio: audio }),
      setVolume: (volume) => set({ volume }),
      setMuted: (isMuted) => set({ isMuted }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      getActiveAlarms: () => {
        const { alarms } = get();
        return alarms.filter(alarm => alarm.is_active);
      },

      checkAlarms: () => {
        const { alarms } = get();
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const triggeredAlarm = alarms.find(alarm => 
          alarm.is_active && alarm.alarm_time === currentTime
        );
        
        return triggeredAlarm || null;
      }
    }),
    {
      name: 'alarm-storage',
      partialize: (state) => ({ 
        alarms: state.alarms,
        volume: state.volume,
        isMuted: state.isMuted 
      }),
    }
  )
);