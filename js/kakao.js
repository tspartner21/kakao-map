//frame El 지도를 생성할 프레임 요소 변수에 할당
const mapContainer = document.querySelector('#map'); // 지도를 표시할 div 

const btnToggle = document.querySelector(".trafficToggle");

//map option (position instance , level)
const mapOption = {
  //카카오 지도 api 샘플에서 클릭위치 마커 표시하기 - 직접해보기 - 기존 위도,경도값 넣어 실행
  //해당위치에서 정밀하게 위치 클랙해주고 하단에 표시된 위도,경도를 붙여넣기
  center: new kakao.maps.LatLng(37.5098844993598, 127.06231493885096), // 지도의 중심좌표
  //출력할 지도의 위도,경도
  level: 2 // 지도의 확대 레벨
};
//스크립트가 처음 로드된 시점에 mapOption안에 포함되어 있는 위치값을 기준으로 지도 인스턴스가 생성되고 끝
//이슈사항 :지도 인스턴스가 처음 생성된 시점에서 위치값이 고정되어 있기 때문에 리사이즈시 위치 중앙이 틀어짐
//해결방법 : 브라우저 리사이즈 할때마다 지도 인스턴스를 생성
//map instance : 브라우저 리사이즈 될때마다 map 변수에 변경된 값을 재반영해야 되므로 let방식으로 변수선언
let map = new kakao.maps.Map(mapContainer, mapOption);
//코드 정리
//마커에 대한 인스턴스 생성(인수로 위에서 생성된 지도위치 인스턴스 필요)
//mapOption 개체 인스턴스 사용
let marker = new kakao.maps.Marker({ position: mapOption.center });

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();
//지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다ㅣ
const zoomControl = new kakao.maps.ZoomControl();
//마커 인스턴스에 setMap 함수를 호출해서 인수로 지도 인스턴스 집어넣음
//마커가 지도 위에 표시되도록 설정
marker.setMap(map);
// 지도에 컨트롤을 추가해야 지도위에 표시
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

let isTrafficOn = false; //교통 레이어 상태 변수
//브라우저 리사이즈이벤트가 발생할때마다
window.addEventListener("resize", () => {
  //기존 맵을 지우고 다시 생성  
  //리사이즈 될때마다 중첩되는 엘리먼트 요소들을 일단은 지워서 초기화
  mapContainer.innerHTML = "";
  //기존 map, market변수에 변경된 인스턴스 정보값을 덮어쓰기 처리
  map = new kakao.maps.Map(mapContainer, mapOption);


  //리사이즈될때마다 컨트롤 패널 다시 추가
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  btnToggle.classList.remove("on");

  //마커 인스턴스에 setMap 함수를 호출해서 인수로 지도 인스턴스 집어넣음
  //마커가 지도 위에 표시되도록 설정
  marker.setMap(map);


});

//지도 인스턴스에 교통량 레이어 추가
btnToggle.addEventListener("click", e => {
  e.target.classList.toggle("on");
  if (e.target.classList.contains("on")) {
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    e.target.innerText = "traffic OFF";
    isTrafficOn = true; //교통 레이어 상태 업데이트
  }
  else {
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    e.target.innerText = "traffic ON";
    isTrafficOn = false; //교통 레이어 상태 업데이트
  }
});

//지도 인스턴스에 교통량 레이어 추가
//map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
//map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

//미션 1 - traffic ON버튼 클릭시 교통량 레이어 활성화 , traffic OFF 버튼 클릭시 교통량 레이어 비활성화
//미션 2 - 토글버튼 : 버튼하나로 위의기능을 껏다켰다하도록 설정
