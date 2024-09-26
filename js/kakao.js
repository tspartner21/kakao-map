/*
new kakao.maps.LatLng(위도, 경도) : 지도와 마커를 출력할 때 필요한 위치 인스턴스 반환
new kakao.maps.Map(DOM, option) : 지도 인스턴스 반환
new kakao.maps.Maker({position : 위치 인스턴스}) : 특정 위치에 생성되는 마커인스턴스 반환
// 마커 인스턴스.setMap(지도 인스턴스) : 기존 지도에 마커를 세팅해주는 함수
*/

//frame El 지도를 생성할 프레임 요소 변수에 할당
const mapContainer = document.querySelector('#map'); // 지도를 표시할 div 

//map option (position instance , level)
const mapOption = {
  //카카오 지도 api 샘플에서 클릭위치 마커 표시하기 - 직접해보기 - 기존 위도,경도값 넣어 실행
  //해당위치에서 정밀하게 위치 클랙해주고 하단에 표시된 위도,경도를 붙여넣기
  center: new kakao.maps.LatLng(37.5098844993598, 127.06231493885096), // 지도의 중심좌표
  //출력할 지도의 위도,경도
  level: 2 // 지도의 확대 레벨
};

//map instance 
const map = new kakao.maps.Map(mapContainer, mapOption);

//코드 정리
//마커에 대한 인스턴스 생성(인수로 위에서 생성된 지도위치 인스턴스 필요)
var marker = new kakao.maps.Marker({
  position: mapOption.center //mapOption 개체 인스턴스 사용
});

//마커 인스턴스에 setMap 함수를 호출해서 인수로 지도 인스턴스 집어넣음
// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);


// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    