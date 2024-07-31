# Kakao Map

- 카카오 개발자 등록
- 내애플리케이션 생성
  : 참조블로그(https://velog.io/@tpgus758/React%EC%97%90%EC%84%9C-Kakao-map-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- 지도 관련 문서
  : https://apis.map.kakao.com/web/guide/

## 1. React Kakao mapx sdk

- https://www.npmjs.com/package/react-kakao-maps-sdk
  : `npm i react-kakao-maps-sdk`
- 개발자사이트
  : https://react-kakao-maps-sdk.jaeseokim.dev/
- 참조블로그
  : https://velog.io/@wlwl99/React-Kakao-Map-SDK-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

## 2. 지도 예제

- /public/index.html 코드 추가

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=abb2072609164c396d27dba3df7386c1&libraries=services,clusterer"
></script>
```

- /src/kko/MyMap.js

```js
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MyMap = () => {
  return (
    <div>
      <h1>지도</h1>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  );
};

export default MyMap;
```
