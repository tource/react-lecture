# Next.js 데이터 연동의 이해

## 1. 테스트를 위한 임시 백엔드 구축

- [json-server](https://velog.io/@redberry0217/JSON-server%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)
- `/be` 폴더 생성
  : `package.json` 파일 생성
  ```js
  {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "json-server --watch db.json --port 4000",
      "generate": "json-server generate.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "faker": "^5.5.3",
      "json-server": "^1.0.0-alpha.23",
      "lodash": "^4.17.21"
    }
  }
  ```
  : `db.json` 파일 생성
  ```json
  {
    "products": [
      {
        "id": "0",
        "name": "Refined Fresh Chicken",
        "price": "209.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "1",
        "name": "Intelligent Metal Mouse",
        "price": "84.00",
        "imageUrl": "https://cdn.pixabay.com/user/2023/05/21/19-38-51-804_250x250.jpg"
      },
      {
        "id": "2",
        "name": "Handcrafted Frozen Pizza",
        "price": "315.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/06/01/15-27-35-456_250x250.jpg"
      },
      {
        "id": "3",
        "name": "Practical Metal Gloves",
        "price": "702.00",
        "imageUrl": "https://cdn.pixabay.com/user/2020/10/13/02-20-44-441_250x250.jpg"
      },
      {
        "id": "4",
        "name": "Unbranded Rubber Chair",
        "price": "458.00",
        "imageUrl": "https://cdn.pixabay.com/user/2014/06/04/17-13-09-273_250x250.jpg"
      },
      {
        "id": "5",
        "name": "Awesome Concrete Shirt",
        "price": "455.00",
        "imageUrl": "https://cdn.pixabay.com/user/2024/03/23/18-39-42-304_250x250.jpg"
      },
      {
        "id": "6",
        "name": "Handmade Granite Mouse",
        "price": "591.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "7",
        "name": "Small Rubber Salad",
        "price": "165.00",
        "imageUrl": "https://cdn.pixabay.com/user/2022/06/07/18-14-41-181_250x250.jpg"
      },
      {
        "id": "8",
        "name": "Sleek Steel Towels",
        "price": "607.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "9",
        "name": "Handcrafted Plastic Computer",
        "price": "289.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "10",
        "name": "Small Fresh Soap",
        "price": "777.00",
        "imageUrl": "https://cdn.pixabay.com/user/2017/04/03/20-55-54-482_250x250.jpg"
      },
      {
        "id": "11",
        "name": "Practical Granite Chicken",
        "price": "518.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "12",
        "name": "Awesome Metal Hat",
        "price": "376.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg"
      },
      {
        "id": "13",
        "name": "Refined Soft Towels",
        "price": "723.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "14",
        "name": "Ergonomic Concrete Cheese",
        "price": "339.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/10/31/07-34-33-442_250x250.jpg"
      },
      {
        "id": "15",
        "name": "Generic Soft Sausages",
        "price": "669.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/03/14/18-14-41-783_250x250.png"
      },
      {
        "id": "16",
        "name": "Incredible Metal Ball",
        "price": "697.00",
        "imageUrl": "https://cdn.pixabay.com/user/2022/05/31/04-22-11-821_250x250.jpg"
      },
      {
        "id": "17",
        "name": "Sleek Soft Shirt",
        "price": "654.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/09/03/08-47-18-877_250x250.jpg"
      },
      {
        "id": "18",
        "name": "Rustic Plastic Fish",
        "price": "133.00",
        "imageUrl": "https://cdn.pixabay.com/user/2021/03/23/09-35-13-605_250x250.jpg"
      },
      {
        "id": "19",
        "name": "Gorgeous Cotton Soap",
        "price": "38.00",
        "imageUrl": "https://cdn.pixabay.com/user/2023/05/21/19-38-51-804_250x250.jpg"
      },
      {
        "id": "20",
        "name": "Incredible Concrete Chair",
        "price": "569.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "21",
        "name": "Handcrafted Soft Pizza",
        "price": "277.00",
        "imageUrl": "https://cdn.pixabay.com/user/2022/06/07/18-14-41-181_250x250.jpg"
      },
      {
        "id": "22",
        "name": "Intelligent Granite Chicken",
        "price": "509.00",
        "imageUrl": "https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg"
      },
      {
        "id": "23",
        "name": "Handcrafted Rubber Ball",
        "price": "487.00",
        "imageUrl": "https://cdn.pixabay.com/user/2017/04/03/20-55-54-482_250x250.jpg"
      },
      {
        "id": "24",
        "name": "Practical Frozen Pants",
        "price": "607.00",
        "imageUrl": "https://cdn.pixabay.com/user/2023/05/21/19-38-51-804_250x250.jpg"
      },
      {
        "id": "25",
        "name": "Sleek Plastic Mouse",
        "price": "909.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/10/31/07-34-33-442_250x250.jpg"
      },
      {
        "id": "26",
        "name": "Incredible Frozen Gloves",
        "price": "172.00",
        "imageUrl": "https://cdn.pixabay.com/user/2019/09/03/08-47-18-877_250x250.jpg"
      },
      {
        "id": "27",
        "name": "Intelligent Concrete Salad",
        "price": "501.00",
        "imageUrl": "https://cdn.pixabay.com/user/2021/03/23/09-35-13-605_250x250.jpg"
      },
      {
        "id": "28",
        "name": "Fantastic Metal Soap",
        "price": "75.00",
        "imageUrl": "https://cdn.pixabay.com/user/2023/05/21/19-38-51-804_250x250.jpg"
      },
      {
        "id": "29",
        "name": "Intelligent Cotton Shirt",
        "price": "130.00",
        "imageUrl": "https://cdn.pixabay.com/user/2024/03/23/18-39-42-304_250x250.jpg"
      }
    ],
    "carts": [
      {
        "id": "1",
        "name": "Intelligent Metal Mouse",
        "price": "84.00",
        "imageUrl": "https://cdn.pixabay.com/user/2023/05/21/19-38-51-804_250x250.jpg"
      }
    ]
  }
  ```
  : 터미널 추가 후 `cd be`
  : `npm i`
  : `npm run dev`

## 2. axios 설정 및 연동

- `npm i axios`
- pages/index.js

```js
import CommonLayout from '@/layouts/CommonLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [goods, setGoods] = useState([]);
  const getGoods = async () => {
    try {
      const res = await axios.get('http://localhost:4000/products');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGoods();
  }, []);
  return <div> 안녕하세요. </div>;
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

## 3. 제품 page 라우터 설정 및 컴포넌트 작성

### 3.1. 제품 목록

- `http://localhost:3000/product`

- `/pages/product/index.js` 생성

```js
import ProductHeader from '@/components/product/ProductHeader';
import ProductList from '@/components/product/ProductList';
import CommonLayout from '@/layouts/CommonLayout';

const ProductPage = () => {
  return (
    <div>
      <ProductHeader title="제품목록" />
      <ProductList />
    </div>
  );
};

export default ProductPage;

ProductPage.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

- `/components/product/ProductHeader.js`

```js
import React from 'react';
import styles from './ProductHeader.module.css';
const ProductHeader = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default ProductHeader;
```

- `/components/product/ProductList.js`

```js
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import Link from 'next/link';
const ProductList = () => {
  // CSR 로 내용을 채워줌.
  // Hydration (하이드레이션)
  const [goods, setGoods] = useState([]);
  const getGoods = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/products');
      setGoods(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGoods();
  }, []);
  return (
    <ul>
      {goods &&
        goods.map(item => (
          <li key={item.id} className={styles.productitem}>
            <Link href={`/product/${item.id}`}>
              <div>
                {/* <img src={item.imageUrl} alt="item.name" /> */}
                <Image
                  src={item.imageUrl}
                  width={300}
                  height={200}
                  alt={item.name}
                />
              </div>
              <div>{item.name}</div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
```

### 3.2. 제품 상세

- `http://localhost:3000/product/아이디`
- `/pages/product/[id].js`

```js
import ProductHeader from '@/components/product/ProductHeader';
import CommonLayout from '@/layouts/CommonLayout';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

const ProductDetail = ({ goodInfo }) => {
  console.log(goodInfo);
  return (
    <div>
      <ProductHeader title="상세 정보" />
      <div>
        <Image
          src={goodInfo.imageUrl}
          width={300}
          height={200}
          alt={goodInfo.name}
        />
      </div>
      <p>{goodInfo.name}</p>
      <p>{goodInfo.price}</p>
    </div>
  );
};

export default ProductDetail;
// props 를 전달하여서 내용을 생성함.
// 그런데, 외부 에서 props 를 전달 받지 않고,
// 스스로 props 를 전달하고
// 스스로 prosp 를 표현하는 html 태그를 생성해서 출력합니다.
// SSR 입니다. (ServerSideRedering)
// 약속된 Next.js 함수로서 반드시 pages 폴더에서만 작동됩니다.
export async function getServerSideProps(context) {
  // console.log('getServerSideProps : ', context.params.id);
  const id = context.params.id;
  const { data } = await axios.get(`http://localhost:4000/products/${id}`);
  // console.log(data);
  return {
    props: { goodInfo: data },
  };
}

// 개발자가 레이아웃을 공통으로 사용하고 싶어서 생성한 함수
// 실행은 _app.js 에서 실행합니다.
ProductDetail.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

## 4. API 최적화

- `/api/index.js` 생성

```js
import axios from 'axios';

const instance = axios.create({
  baseUrl: 'http://localhost:4000',
});

const getProducts = () => {
  return instance.get('/products');
};

function getProductItem(id) {
  return instance.get(`/products/${id}`);
}

export { getProducts, getProductItem };
```

## App Router 참조 코드 (https://github.com/devgreact/health-center)
