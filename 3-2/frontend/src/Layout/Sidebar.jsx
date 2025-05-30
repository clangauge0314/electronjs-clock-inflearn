import { useThemeStore } from "../Shared/Stores/ThemeStore";

export default function Sidebar() {
  const { isDark } = useThemeStore();

  return (
    <div className="relative group">
      <div
        className={`h-screen w-20 group-hover:w-64
          ${isDark ? 'border-gray-700' : 'border-gray-200'} 
          transition-all duration-300 ease-in-out border-r shadow-lg
        `}
      >
        {/* 로고 섹션 */}
        <div className={`p-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`
            flex items-center py-2.5 rounded-lg transition-all duration-300 ease-in-out
            w-16 group-hover:w-full mx-auto group-hover:mx-0 
            justify-center group-hover:justify-start group-hover:px-3
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
            relative
          `}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl">🕒</span>
            </div>
            <span className="ml-5 text-xl whitespace-nowrap opacity-0 translate-x-[-10px] transition-all duration-300 ease-in-out absolute left-[52px] group-hover:opacity-100 group-hover:translate-x-0">
              GoodClock
            </span>
          </div>
        </div>

        {/* 네비게이션 영역 */}
        <nav className="mt-4 flex flex-col h-[calc(100vh-100px)] justify-between">
          <div className="space-y-1 px-2">
            {/* 메뉴 항목들이 들어갈 자리 */}
          </div>

          <div className="space-y-1 px-2 mb-4">
            {/* 하단 메뉴들이 들어갈 자리 */}
          </div>
        </nav>
      </div>
    </div>
  );
}