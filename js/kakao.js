//frame El 지도를 생성할 프레임 요소 변수에 할당
const mapContainer = document.querySelector('#map'); // 지도를 표시할 div 

const [btnOn, btnOff] = document.querySelectorAll("nav button");

const btnToggle = document.querySelector("nav button");

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

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다ㅣ
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);

//지도 인스턴스에 교통량 레이어 추가
btnToggle.addEventListener("click", e => {
  e.target.classList.toggle("on");
  if (e.target.classList.contains("on")) {
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    e.target.innerText = "traffic OFF";
  }
  else {
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    e.target.innerText = "traffic ON";
  }
});

//지도 인스턴스에 교통량 레이어 추가
//map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
//map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

//미션 1 - traffic ON버튼 클릭시 교통량 레이어 활성화 , traffic OFF 버튼 클릭시 교통량 레이어 비활성화
//미션 2 - 토글버튼 : 버튼하나로 위의기능을 껏다켰다하도록 설정
