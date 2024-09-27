//frame El 지도를 생성할 프레임 요소 변수에 할당
const mapContainer = document.querySelector('#map'); // 지도를 표시할 div 
const btnToggle = document.querySelector(".trafficToggle");

//map option (position instance , level)
const mapOption = {

  center: new kakao.maps.LatLng(37.5098844993598, 127.06231493885096), // 지도의 중심좌표

  level: 2 // 지도의 확대 레벨
};

let map = new kakao.maps.Map(mapContainer, mapOption);
let marker = new kakao.maps.Marker({ position: mapOption.center });

const mapTypeControl = new kakao.maps.MapTypeControl();
//지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다ㅣ
const zoomControl = new kakao.maps.ZoomControl();
marker.setMap(map);
// 지도에 컨트롤을 추가해야 지도위에 표시
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


//브라우저 리사이즈이벤트가 발생할때마다
window.addEventListener("resize", () => {

  mapContainer.innerHTML = "";
  //기존 map, market변수에 변경된 인스턴스 정보값을 덮어쓰기 처리
  map = new kakao.maps.Map(mapContainer, mapOption);
  marker.setMap(map);

  //리사이즈될때마다 컨트롤 패널 다시 추가
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  btnToggle.classList.remove("on");
  btnToggle.innerText = "traffic On";

});

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

//roadview setting
const viewContainer = document.querySelector('#view');
const view = new kakao.maps.Roadview(viewContainer); //로드뷰 객체
const viewClient = new kakao.maps.RoadviewClient();

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
viewClient.getNearestPanoId(mapOption.center, 50, panoId => {
  view.setPanoId(panoId, mapOption.center); //panoId와 중심좌표를 통해 로드뷰 실행
});

kakao.maps.event.addListener(view, 'init', () => {
  new kakao.maps.Marker(({
    position: mapOption.center,
    map: view //this is same as previous marker, connecting into part of map  
  }));
});