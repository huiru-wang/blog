import { TravelMarker } from "./types";

export const languages = [
    {
        language: "JavaScript",
        level: "Advanced",
    }
]

export const EXPERIENCE = [
    {
        company: "阿里巴巴-钉钉",
        badges: [],
        location: "OnSite",
        title: "服务端开发工程师",
        logoUrl: "/icons/dingtalk.svg",
        start: "2023-10-31",
        end: "至今",
        description: [
            "- 钉钉智能人事服务端开发，负责基础人事业务开发、迭代、稳定性维护",
            "- 负责人事电子签业务从0到1",
        ],
    },
    {
        company: "华为",
        badges: [],
        location: "OnSite",
        title: "SDE",
        logoUrl: "/icons/huawei.svg",
        start: "2021-08-20",
        end: "2023-10-28",
        description: [
            "- 终端BG交易中台部门：负责开发对接海外交易渠道PayU、Paypal、Knet等",
            "- 负责BCP业务的开发和维护：准实时的交易链路旁路校验服务",
            "- 华为云云眼部门：负责故障生命周期管理业务的开发"
        ],
    },
    {
        company: "南京理工大学",
        badges: [],
        location: "OnSite",
        title: "研究生",
        logoUrl: "/icons/nust.svg",
        start: "2018-09-01",
        end: "2021-07-28",
        description: [
            "- 南京理工大学自动化学院控制工程"
        ],
    }
]


export const travelMarkers: TravelMarker[] = [
    {
        "title": "东京涩谷sky",
        "SOC": "JPN",
        "city": "东京市",
        "depth": 6,
        "position": [
            139.702815,
            35.658929
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B7sky.jpg",
        "content": [
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B7sky1.jpg",
                caption: "东京涩谷sky的顶楼"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B7sky2.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B7sky3.jpg",
            }
        ]
    },
    {
        "title": "东京浅草寺",
        "SOC": "JPN",
        "city": "东京市",
        "depth": 6,
        "position": [
            139.797779,
            35.717882
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B5%85%E8%8D%89%E5%AF%BA.jpg",
        "content": [
            {
                type: "text",
                text: "豆豆带我们游东京浅草寺、请吃了好吃的牛排"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B77.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E4%B8%9C%E4%BA%AC%E6%B6%A9%E8%B0%B7sky6.jpg",
            }
        ]
    },
    {
        "title": "镰仓高校前",
        "SOC": "JPN",
        "city": "镰仓市",
        "depth": 6,
        "position": [
            139.500567,
            35.306794
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E9%95%B0%E4%BB%93%E9%AB%98%E6%A0%A1%E5%89%8D.jpg",
        "content": [
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E9%95%B0%E4%BB%93%E9%AB%98%E6%A0%A1%E5%89%8D2.jpg",
                caption: "镰仓站"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E9%95%B0%E4%BB%93%E9%AB%98%E6%A0%A1%E5%89%8D3.jpg",
                caption: "镰仓步行街，这里有家抹茶店好吃"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E9%95%B0%E4%BB%93%E9%AB%98%E6%A0%A1%E5%89%8D4.jpg",
                caption: "乌冬面 吃不太惯"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%9C%E4%BA%AC/%E9%95%B0%E4%BB%93%E4%B8%83%E9%87%8C%E6%BB%A82.jpg",
            }
        ]
    },
    {
        "title": "杭州华为研究所的日子",
        "SOC": "CHN",
        "city": "杭州市",
        "depth": 8,
        "position": [
            120.205251, 30.183514
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%8E%E4%B8%BA2.jpg",
        "content": [
            {
                "type": "text",
                "text": "在华为的日子"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%8E%E4%B8%BA4.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E9%9D%92%E5%B1%B1%E6%B9%961.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%8E%E4%B8%BA3.jpg",
            },
        ]
    },
    {
        "title": "杭州青山湖",
        "SOC": "CHN",
        "city": "杭州市",
        "depth": 8,
        "position": [
            119.771481,
            30.250938
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E-%E9%9D%92%E5%B1%B1%E6%B9%96.jpg",
        "content": [
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E9%9D%92%E5%B1%B1%E6%B9%961.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E9%9D%92%E5%B1%B1%E6%B9%962.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E9%9D%92%E5%B1%B1%E6%B9%964.jpg",
            }
        ]
    },
    {
        "title": "杭州千岛湖",
        "SOC": "CHN",
        "city": "杭州市",
        "depth": 7,
        "position": [
            119.013097, 29.594386
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%83%E5%B2%9B%E6%B9%96.jpg",
        "content": [
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%83%E5%B2%9B%E6%B9%96.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%83%E5%B2%9B%E6%B9%961.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%83%E5%B2%9B%E6%B9%962.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%8D%83%E5%B2%9B%E6%B9%963.jpg",
            },
        ]
    },
    {
        "title": "杭州桐庐马岭古道",
        "SOC": "CHN",
        "city": "杭州市",
        "depth": 8,
        "position": [
            119.694461,
            29.661079
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E-%E9%A9%AC%E5%B2%AD%E5%8F%A4%E9%81%93.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第一站桐庐马岭古道"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E9%A9%AC%E5%B2%AD%E5%8F%A4%E9%81%934.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E9%A9%AC%E5%B2%AD%E5%8F%A4%E9%81%931.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E9%A9%AC%E5%B2%AD%E5%8F%A4%E9%81%932.jpg",
            }
        ]
    },
    {
        "title": "杭州桐庐石舍村",
        "SOC": "CHN",
        "city": "杭州市",
        "depth": 8,
        "position": [
            119.726341,
            29.640951
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E-%E7%9F%B3%E8%88%8D%E6%9D%91.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第二站桐庐石舍村，一个很安静的村子，有山有水"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E7%9F%B3%E8%88%8D%E6%9D%911.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E7%9F%B3%E8%88%8D%E6%9D%912.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E%E6%A1%90%E5%BA%90%E7%9F%B3%E8%88%8D%E6%9D%913.jpg",
            },
        ]
    },
    {
        "title": "宁波张家村溪语山房",
        "SOC": "CHN",
        "city": "宁波市",
        "depth": 6,
        "position": [
            121.292818,
            29.503134
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E6%9D%AD%E5%B7%9E-%E5%BC%A0%E5%AE%B6%E6%9D%91.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第三站张家村溪语山房，一个小村子的民宿，老板人很好"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%AE%81%E6%B3%A2%E5%BC%A0%E5%AE%B6%E6%9D%91%E6%BA%AA%E8%AF%AD%E5%B1%B1%E6%88%BF1.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%AE%81%E6%B3%A2%E5%BC%A0%E5%AE%B6%E6%9D%91%E6%BA%AA%E8%AF%AD%E5%B1%B1%E6%88%BF2.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E6%9D%AD%E5%B7%9E/%E5%AE%81%E6%B3%A2%E5%BC%A0%E5%AE%B6%E6%9D%91%E6%BA%AA%E8%AF%AD%E5%B1%B1%E6%88%BF3.jpg",
            },
        ]
    },
    {
        "title": "宁波奉化",
        "SOC": "CHN",
        "city": "宁波市",
        "depth": 6,
        "position": [
            121.303106,
            29.482829
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2-%E5%A5%89%E5%8C%96.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第五站宁波奉化，开车路过云边小卖部，风景真好"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A5%89%E5%8C%961.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A5%89%E5%8C%962.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A5%89%E5%8C%963.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A5%89%E5%8C%964.jpg",
            },
        ]
    },
    {
        "title": "宁波象山县墙头镇",
        "SOC": "CHN",
        "city": "宁波市",
        "depth": 6,
        "position": [
            121.782729, 29.455392
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A2%99%E5%A4%B4%E9%95%873.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第六站宁波象山县墙头镇,也是路过的一个民宿，非常美的民宿，我们自己在这里拍了婚纱照 哈哈哈"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A2%99%E5%A4%B4%E9%95%878.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A2%99%E5%A4%B4%E9%95%873.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A2%99%E5%A4%B4%E9%95%875.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%A2%99%E5%A4%B4%E9%95%871.jpg",
            }
        ]
    },
    {
        "title": "宁波象山县公屿码头",
        "SOC": "CHN",
        "city": "宁波市",
        "depth": 6,
        "position": [
            121.960082,
            29.508913
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2-%E8%B1%A1%E5%B1%B1-%E5%85%AC%E5%B1%BF%E7%A0%81%E5%A4%B4.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第七站宁波象山县公屿码头，旅行自拍婚纱照 哈哈"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E6%9D%BE%E5%85%B0%E5%B1%B11.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E6%9D%BE%E5%85%B0%E5%B1%B12.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2-%E8%B1%A1%E5%B1%B1-%E5%85%AC%E5%B1%BF%E7%A0%81%E5%A4%B4.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2%E5%85%AC%E5%B1%BF%E7%A0%81%E5%A4%B4.jpg",
            },
        ]
    },
    {
        "title": "宁波象山县饭桶山",
        "SOC": "CHN",
        "city": "宁波市",
        "depth": 6,
        "position": [
            121.986611,
            29.544838
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2-%E8%B1%A1%E5%B1%B1-%E9%A5%AD%E6%A1%B6%E5%B1%B1.jpg",
        "content": [
            {
                "type": "text",
                "text": "五一期间的自驾游第八站宁波饭桶山"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%AE%81%E6%B3%A2/%E5%AE%81%E6%B3%A2-%E8%B1%A1%E5%B1%B1-%E9%A5%AD%E6%A1%B6%E5%B1%B1.jpg",
            },
        ]
    },
    {
        "title": "合肥少荃体育中心-陈奕迅演唱会",
        "SOC": "CHN",
        "city": "合肥市",
        "depth": 6,
        "position": [
            117.357816,
            31.94703
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%90%88%E8%82%A5/%E5%90%88%E8%82%A5-%E6%BC%94%E5%94%B1%E4%BC%9A.jpg",
        "content": [
            {
                "type": "text",
                "text": "第一次看演唱会，第一次一起看演唱会"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%90%88%E8%82%A5/%E5%90%88%E8%82%A5%E5%B0%91%E8%8D%83%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83-%E9%99%88%E5%A5%95%E8%BF%85%E6%BC%94%E5%94%B1%E4%BC%9A4.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%90%88%E8%82%A5/%E5%90%88%E8%82%A5%E5%B0%91%E8%8D%83%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83-%E9%99%88%E5%A5%95%E8%BF%85%E6%BC%94%E5%94%B1%E4%BC%9A5.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%90%88%E8%82%A5/%E5%90%88%E8%82%A5%E5%B0%91%E8%8D%83%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83-%E9%99%88%E5%A5%95%E8%BF%85%E6%BC%94%E5%94%B1%E4%BC%9A1.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%90%88%E8%82%A5/%E5%90%88%E8%82%A5%E5%B0%91%E8%8D%83%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83-%E9%99%88%E5%A5%95%E8%BF%85%E6%BC%94%E5%94%B1%E4%BC%9A2.jpg",
            }
        ]
    },
    {
        "title": "上海市",
        "SOC": "CHN",
        "city": "上海市",
        "depth": 7,
        "position": [
            121.595125,
            31.176881
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7-%E4%B8%8A%E6%B5%B7%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6.jpg",
        "content": [
            {
                type: "text",
                text: "媛媛博士毕业这一天的纪念"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%827.jpg",
                caption: "媛媛博士毕业签名留念"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%821.jpg",
                caption: "周哥一家"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%823.jpg",
                caption: "周哥一家"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%824.jpg",
                caption: "艳艳的博士服"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%828.jpg",
                caption: "格格的博士服"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E4%B8%8A%E6%B5%B7/%E4%B8%8A%E6%B5%B7%E5%B8%826.jpg",
                caption: "妙妙的博士帽"
            },
        ]
    },
    {
        "title": "山西_晋中",
        "SOC": "CHN",
        "city": "晋中市",
        "depth": 6,
        "position": [
            112.436274,
            37.406676
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%B1%B1%E8%A5%BF%E6%99%8B%E4%B8%AD/%E5%B1%B1%E8%A5%BF-%E6%99%8B%E4%B8%AD.jpg",
        "content": [
            {
                "type": "text",
                "text": "山西，我爸妈和媛媛第一次旅行 嘿嘿"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%B1%B1%E8%A5%BF%E6%99%8B%E4%B8%AD/%E6%99%8B%E4%B8%AD3.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%B1%B1%E8%A5%BF%E6%99%8B%E4%B8%AD/%E6%99%8B%E4%B8%AD1.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%B1%B1%E8%A5%BF%E6%99%8B%E4%B8%AD/%E6%99%8B%E4%B8%AD2.jpg",
            }
        ]
    },
    {
        "title": "郑州市",
        "SOC": "CHN",
        "city": "郑州市",
        "depth": 9,
        "position": [
            113.670057,
            34.745244
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%829.jpg",
        "content": [
            {
                "type": "text",
                "text": "郑州"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%829.jpg",
            },
            {
                "type": "text",
                "text": "下面2张是茶城早期，还有我奶奶和妈妈的母亲节"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%822.JPG",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%823.JPG",
            },
            {
                "type": "text",
                "text": "我和弟弟桐桐"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%827.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%826.jpg",
            },
            {
                "type": "text",
                "text": "亚东哥家的漂亮女儿，真好看阿"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%83%91%E5%B7%9E/%E9%83%91%E5%B7%9E%E5%B8%828.jpg",
            },
        ]
    },
    {
        "title": "南京市",
        "SOC": "CHN",
        "city": "南京市",
        "depth": 7,
        "position": [
            118.855629,
            32.02891
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC-%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6.jpg",
        "content": [
            {
                "type": "text",
                "text": "南京，和我的好兄弟们共度3年研究生时光！"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC7.JPG",
            },
            {
                "type": "text",
                "text": "下面的摄像师：媛媛，嘿嘿😁"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC4.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC3.jpg",
            },
            {
                "type": "text",
                "text": "哈哈哈哈"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC2.jpg",
            },
            {
                "type": "text",
                "text": "摄像：小雅"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC1.jpg",
            },
            {
                "type": "text",
                "text": "小雅 & 沈悦"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC8.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%8D%97%E4%BA%AC/%E5%8D%97%E4%BA%AC9.jpg",
            }
        ]
    },
    {
        "title": "长春理工大学",
        "SOC": "CHN",
        "city": "长春市",
        "depth": 7,
        "position": [
            125.313435, 43.83651
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%95%BF%E6%98%A5/%E9%95%BF%E6%98%A51.jpg",
        "content": [
            {
                "type": "text",
                "text": "大学四年，马吉安和苗，第一张是2018年毕业，我们仨，摄像是刘畅，第二张是2024年郑州相聚"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%95%BF%E6%98%A5/%E9%95%BF%E6%98%A51.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%95%BF%E6%98%A5/%E9%95%BF%E6%98%A52.jpg",
            },
            {
                "type": "text",
                "text": "长春大一全班一起扫雪"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E9%95%BF%E6%98%A5/%E9%95%BF%E6%98%A53.JPG",
            },
        ]
    },
    {
        "title": "西安市城墙",
        "SOC": "CHN",
        "city": "西安市",
        "depth": 7,
        "position": [
            108.967937, 34.266839
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E8%A5%BF%E5%AE%89/%E8%A5%BF%E5%AE%891.JPG",
        "content": [
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E8%A5%BF%E5%AE%89/%E8%A5%BF%E5%AE%892.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E8%A5%BF%E5%AE%89/%E8%A5%BF%E5%AE%891.JPG",
            },
        ]
    },
    {
        "title": "河南省太康县",
        "SOC": "CHN",
        "city": "周口市",
        "depth": 8,
        "position": [
            114.837946, 34.064513
        ],
        "zooms": [
            3,
            15
        ],
        "iconImg": "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%91%A8%E5%8F%A3/%E5%A4%AA%E5%BA%B7-%E5%8F%91%E5%B0%8F.jpg",
        "content": [
            {
                "type": "text",
                "text": "太康县，这是我从小长大的地方，和2个好兄弟：事成、闯，嘿嘿😁，第一张我们12岁"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%91%A8%E5%8F%A3/%E5%A4%AA%E5%BA%B7-%E5%8F%91%E5%B0%8F.jpg",
            },
            {
                "type": "text",
                "text": "时间过的真快，闯和事成都结婚了"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%91%A8%E5%8F%A3/%E5%A4%AA%E5%BA%B7%E9%97%AF%E7%BB%93%E5%A9%9A.jpg",
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%91%A8%E5%8F%A3/%E5%A4%AA%E5%BA%B7-%E5%8F%91%E5%B0%8F%E5%A5%BD%E5%85%84%E5%BC%9F.jpg",
            },
            {
                "type": "text",
                "text": "转眼闯都有小公主了"
            },
            {
                type: "image",
                src: "https://huiru-wang-images.oss-cn-beijing.aliyuncs.com/travel/%E5%91%A8%E5%8F%A3/%E5%A4%AA%E5%BA%B7-%E9%97%AF%E5%A5%B3%E5%84%BF.jpg",
            },
        ]
    },
]
