// thumbnail url 예시: https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038
// 위의 예시에서 /thumb/R120x174 처럼 url path에 이미지의 width, height 정보가 들어있음.
// 이를 추출하기 위한 헬퍼 함수
export function getImageSize(url: string) {
  const regex = /\/thumb\/R(\d+)x(\d+)/;
  const match = url.match(regex);

  if (match) {
    return {
      width: Number(match[1]),
      height: Number(match[2]),
    };
  }

  return { width: null, height: null };
}
