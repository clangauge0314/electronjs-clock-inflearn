import React, { useState, useEffect, useCallback } from "react";
import { useThemeStore } from "../../../Shared/Stores/ThemeStore";
import { ModalContainer, ModalHeader } from "../../../Shared/Utils/ModalUtils";

const AlarmHistoryModal = ({ isOpen, onClose }) => {
  const { isDark, is24Hour } = useThemeStore();
  const alarms = "alarms";

  const [alarmHistory, setAlarmHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadAlarmHistory = useCallback(() => {
    try {
      setAlarmHistory(
        [...alarms].sort((a, b) => a.created_at.localeCompare(b.created_at))
      );
    } catch (error) {
      console.error("알람 기록을 불러오는데 실패했습니다:", error);
    }
  }, [alarms]);

  useEffect(() => {
    if (isOpen) loadAlarmHistory();
  }, [isOpen, loadAlarmHistory]);

  const totalPages = Math.ceil(alarmHistory.length / 10);
  const currentAlarms = alarmHistory.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleStatusToggle = async (alarmId, isActive) => {
    try {
      updateAlarm(alarmId, { is_active: !isActive });
      loadAlarmHistory();
    } catch (error) {
      console.error("알람 상태 변경에 실패했습니다:", error);
    }
  };

  const handleDeleteAlarm = async (alarmId) => {
    if (!window.confirm("이 알람을 삭제하시겠습니까?")) return;

    try {
      deleteAlarm(alarmId);
      loadAlarmHistory();
    } catch (error) {
      console.error("알람 삭제에 실패했습니다:", error);
    }
  };

  const formatTimeWithSeconds = (time) => {
    if (!time) return "";

    const [hours, minutes, seconds] = time.split(":");
    const hour = parseInt(hours, 10);

    if (is24Hour) {
      return `${hours}:${minutes}:${seconds}`;
    }

    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour % 12 || 12;
    return `${period} ${displayHour}:${minutes}:${seconds}`;
  };

  const renderAlarmList = () => {};

  const renderEmptyState = () => (
    <div className="text-center py-8 text-gray-500">알람 기록이 없습니다.</div>
  );
  return (
    <>
      <ModalContainer isOpen={isOpen} maxWidth="4xl">
        <ModalHeader title="알람 기록" onClose={onClose} />

        {alarmHistory.length > 0 ? renderAlarmList() : renderEmptyState()}
      </ModalContainer>
    </>
  );
};

export default AlarmHistoryModal;
