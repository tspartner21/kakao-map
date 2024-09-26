/
//지도를 생성할 프레임 요소 변수에 할당
const mapContainer = document.querySelector('#map'); // 지도를 표시할 div 

//지도에 적용할 옵션값을 객체로 묶어서 할당
const mapOption = {
  //카카오 지도 api 샘플에서 클릭위치 마커 표시하기 - 직접해보기 - 기존 위도,경도값 넣어 실행
  //해당위치에서 정밀하게 위치 클랙해주고 하단에 표시된 위도,경도를 붙여넣기
  center: new kakao.maps.LatLng(37.5098844993598, 127.06231493885096), // 지도의 중심좌표

  //출력할 지도의 위도,경도
  level: 2 // 지도의 확대 레벨
};

//new 연산자로 카카오 지도 인스턴스를 생성(지도를 출력한 DOM , 지도옵션 객체)
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 마커가 표시될 위치입니다 지도위치에 관한 인스턴스 생성
const markerPosition = new kakao.maps.LatLng(37.5098844993598, 127.06231493885096);

//마커를 생성합니다
//마커에 대한 인스턴스 생성(인수로 위에서 생성된 지도위치 인스턴스 필요)
var marker = new kakao.maps.Marker({
  position: markerPosition
});

//마커 인스턴스에 setMap 함수를 호출해서 인수로 지도 인스턴스 집어넣음
// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    