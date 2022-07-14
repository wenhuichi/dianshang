import Mock from "mockjs";
const responseBody = {
  code: 0,
  data: null,
  message: "",
  ok: null,
  timestamp: null,
};

const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody.ok = true;
    responseBody._status = code;
  }
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};


const getBody = (options) => {
  return options.body && JSON.parse(options.body);
};

const tmName = ["小米", "苹果", "华为", "VIVO"];

const hw = {
  defaultImg:
    "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-sklaALrngAAHGDqdpFtU741.jpg",
  title:
    "华为 HUAWEI P40 麒麟990 5G SoC芯片 5000万超感知徕卡三摄 30倍数字变焦 6GB+128GB亮黑色全网通5G手机",
};

const apple = {
  defaultImg:
    "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg",
  title: "Apple iPhone 12 (A2404) 64GB 黑色 支持移动联通电信5G 双卡双待手机",
};

const xm = {
  defaultImg:
    "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rgJqAHPnoAAF9hoDNfsc505.jpg",
  title:
    "Redmi 10X 4G Helio G85游戏芯 4800万超清四摄 5020mAh大电量 小孔全面屏 128GB大存储 8GB+128GB 冰雾白 游戏智能手机 小米 红米",
};
const VIVO = {
  defaultImg:
    "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg",
  title:
    "VIVO 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 12GB+256GB 陶瓷黑 游戏手机",
};
const list = [hw, apple, xm, VIVO];
const data = (options) => {
  const params = getBody(options);
  console.log("传参：", params);
  if (params && !params.pageSize) {
    params.pageSize = 10;
  }
  const data = {
    trademarkList: [],
    attrsList: [
      {
        attrId: 106,
        attrValueList: ["安卓手机", "苹果手机"],
        attrName: "手机一级",
      },
      {
        attrId: 107,
        attrValueList: ["小米", "苹果", "华为"],
        attrName: "二级手机",
      },
    ],
    goodsList: [],
    total: 9999,
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    totalPages: parseInt(9999 / params.pageSize) + 1,
  };
  if (params.keyword) {
    if (tmName.includes(params.keyword)) {
      data.trademarkList.push({
        tmId: tmName.findIndex((item) => item === params.keyword) + 1,
        tmName: params.keyword,
      });
    }
  } else {
    tmName.forEach((item, index) => {
      data.trademarkList.push({
        tmId: index + 1,
        tmName: item,
      });
    });
  }
  for (let i = 0; i < params.pageSize; i++) {
    const num = parseInt(Math.random() * 4, 10);
    const itemDetail = list[num];
    data.goodsList.push({
      id: Mock.mock("@integer(1,999)"),
      defaultImg: itemDetail.defaultImg,
      title: itemDetail.title,
      price: Mock.mock("@integer(1000,9999)"),
      createTime: null,
      tmId: null,
      tmName: null,
      category1Id: null,
      category1Name: null,
      category2Id: null,
      category2Name: null,
      category3Id: null,
      category3Name: null,
      hotScore: 0,
      attrs: null,
    });
  }
  return builder(data);
};

Mock.mock("/mock/list", "post", data);

