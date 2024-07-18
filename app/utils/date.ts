/**
 * @returns {string} 연월일 형식으로 포맷된 문자열 (예: '2024년 7월 18일')
 */
export function formatKoreanDate(date: Date): string {
  return date.toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}
