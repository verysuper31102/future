import { CarePortfolio } from '../types';

export const CORPORATE_SLOGANS = [
  '串聯全台高品質本國照服員，建立透明、安心與專業的企業照護體系。',
  '全方位企業 EAP 員工家庭照護方案 ｜ 讓關懷無縫延伸至每個家庭角落。',
  '國家級雙重證照核驗 ｜ 陪伴企業同仁安頓家中長者，共創友善職場環境。',
  '第三方價金託管與衛生福利部標準契約 ｜ 給予高齡家庭最尊榮與安心的守護。'
];

export const STATS_DATA = {
  totalViews: 1285420,       // 實際總瀏覽次數
  portfolioCount: 3680,      // 累積照護作品數
  servicedFamilies: 12450,   // 服務滿意家庭
  partnerEnterprises: 185,   // 合作企業體系
  verifiedCaregivers: 1250   // 通過審核照服員
};

export const MOCK_PORTFOLIOS: CarePortfolio[] = [
  {
    id: 'pf-001',
    title: '失智長者感官復能與懷舊音樂照護專案',
    subtitle: '運用非藥物輔助療法，重塑長者情緒安全感',
    caregiverId: 'cg-101',
    caregiverName: '林雅惠',
    caregiverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '資深長照照服員 / 失智症陪伴專家',
    patientCondition: '88歲中度失智症（黃昏症候群情緒焦慮）',
    outcome: '三個月內成功安定長者夜間情緒，每日膳食攝取量提升30%',
    viewsCount: 34520,
    likesCount: 1280,
    tags: ['失智懷舊', '感官復能', '非藥物輔療', '情緒穩定'],
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-20',
    fullDescription: '針對高齡88歲失智張爺爺設計的感官復能計畫。結合台語老歌黑膠音樂聽覺刺激與昔日大安區老照片懷舊記憶卡引導。在每日下午4點至6點黃昏症候群發作高峰期，進行定時舒緩導引與關懷備餐，成功降低長者焦慮與重複質問頻率。',
    highlights: [
      '每日定時播放老歌懷舊音樂，進行15分鐘關節輕揉舒緩',
      '客製化高營養軟質易消化膳食，解決咀嚼力不足問題',
      '家屬隨時透過平台日誌取得即時生理數據與復能紀錄'
    ]
  },
  {
    id: 'pf-002',
    title: '中風術後階段性肢體復健與安全移位訓練',
    subtitle: '物理治療師協同指導，從臥床到四腳杖步行',
    caregiverId: 'cg-102',
    caregiverName: '陳建宏',
    caregiverAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '中風術後復健與高力道照護員',
    patientCondition: '72歲缺血性中風右側偏癱（體重78kg）',
    outcome: '60天完成下床輪椅移位訓練，目前可在輔助下步行20公尺',
    viewsCount: 41800,
    likesCount: 1950,
    tags: ['中風復健', '輔具移位', '肌力重建', '防跌保護'],
    coverImage: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-18',
    fullDescription: '本案針對偏癱且體重較重的李老先生。照服員陳建宏具備雄厚移位技巧，每日落實「床上滾動拍背 ➔ 緣床坐立 संतुलन ➔ 移位輪椅 ➔ 平衡站立」四大步驟，全程配合護具防跌，大幅減輕家屬照護恐懼，建立長者信心。',
    highlights: [
      '嚴格執行每2小時翻身拍背，創下連續90天無壓傷（褥瘡）紀錄',
      '引導伸展偏癱側肢體，預估復健黃金期內肌力等級提升2級',
      '教學家屬人體工學抱扶省力法，打造安全居家照護環境'
    ]
  },
  {
    id: 'pf-003',
    title: '大腸癌術後傷口觀察與低鈉高蛋白高齡餐點',
    subtitle: '專業護理背景照服員，精準掌握術後離院居家衛教',
    caregiverId: 'cg-103',
    caregiverName: '張秀玲',
    caregiverAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '護理師背景 / 術後傷口衛教照護',
    patientCondition: '65歲大腸癌術後留置引流管與人工肛門',
    outcome: '引流管照顧零感染，術後體重回升2.5kg，血紅素恢復正常值',
    viewsCount: 28910,
    likesCount: 1120,
    tags: ['術後護理', '管路防護', '營養高膳食', '專業衛教'],
    coverImage: 'https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-15',
    fullDescription: '具備護理師證書的張秀玲照服員，為剛自台中榮總出院的陳媽媽提供高規格居家衛教與營養補充。每日記錄傷口滲出液顏色與引流量，調配容易消化且富含優質蛋白質的天然養生蒸蛋與魚湯料理，讓病患離院居家復原更踏實。',
    highlights: [
      '無菌技術清潔更換敷料與造口袋，防止皮膚紅腫破皮',
      '根據醫師衛教指示，記錄每日水分進出量（I/O Balance）',
      '親切心理傾聽，協助個案調適身體形象改變之心理壓力'
    ]
  },
  {
    id: 'pf-004',
    title: '夜間靜謐陪伴與重症安寧舒適照護日誌',
    subtitle: '高靈敏度夜間守候，讓高壓工作家屬獲得充份休息',
    caregiverId: 'cg-105',
    caregiverName: '許美玲',
    caregiverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '夜間專任 / 重症安寧撫慰照服員',
    patientCondition: '82歲肺癌末期居家安寧（夜間呼吸急促焦慮）',
    outcome: '夜間血氧濃度持續穩定維持於95%以上，減輕病患喘息恐懼',
    viewsCount: 19640,
    likesCount: 890,
    tags: ['夜間陪宿', '安寧舒適', '呼吸照護', '家屬減壓'],
    coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-12',
    fullDescription: '針對肺癌末期許老太太夜間頻繁呼吸困難的問題，許美玲照服員提供12小時夜間陪宿與安寧擺位。運用精油精撫與姿勢抬高，順暢呼吸道，配合血氧機即時監測，在無痛無恐懼的環境中，讓老太太安心好眠。',
    highlights: [
      '夜間每1.5小時進行姿勢調整與擺位，維持呼吸順暢',
      '高警覺性關懷，第一時間處置突發痰液積聚問題',
      '讓原本因照顧長期失眠的白領企業家屬重獲充沛精力'
    ]
  },
  {
    id: 'pf-005',
    title: '竹科科技園區家庭高規格氣切無菌照護專案',
    subtitle: '急救等級照服員駐點，提供高標準管路防護',
    caregiverId: 'cg-108',
    caregiverName: '詹嘉銘',
    caregiverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '竹科園區家人首選 / 專精氣切與急救照護',
    patientCondition: '78歲氣切與留置導尿管張伯伯',
    outcome: '連續180天無呼吸道感染，導尿管順暢無發炎現象',
    viewsCount: 32100,
    likesCount: 1460,
    tags: ['氣切吸痰', '無菌操作', '管路安全', '竹科嚴選'],
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-08',
    fullDescription: '竹科工程師家屬平時工作繁忙，特別預約具備急救高級證書的詹嘉銘照服員。詹照服員落實嚴格手部衛生與抽痰管單次使用原則，配合每小時氣切紗布檢視，確保無任何感染隱患，是新竹家庭最信賴的照顧安全防線。',
    highlights: [
      '標準化無菌抽痰與氣切內管清洗處置作業SOP',
      '建立雲端急救聯絡清單與即時通報聯絡管道',
      '支援英文衛教術語溝通，滿足外商高管家屬溝通需求'
    ]
  },
  {
    id: 'pf-006',
    title: '南台灣暖心高齡膳食與在地客語溫馨互動',
    subtitle: '在地情懷陪伴，烹調古早味無負擔養生高齡餐',
    caregiverId: 'cg-104',
    caregiverName: '黃淑真',
    caregiverAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    caregiverTitle: '親和耐心 / 溫馨居家關懷照服員',
    patientCondition: '84歲獨居輕度失智與關節退化阿嬤',
    outcome: '成功打破長者孤獨封閉心態，主動參與每日社區散步',
    viewsCount: 25430,
    likesCount: 1050,
    tags: ['古早味膳食', '在地語言', '居家關懷', '溫馨陪伴'],
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80&w=800',
    date: '2026-07-05',
    fullDescription: '黃淑真照服員運用流利台語與客語，以親如女兒般的態度與獨居的阿嬤建立深厚信任。每日現做符合低鹽高纖原則的在地名菜與軟質懷舊點心，並陪同至附近公園伸展運動，讓高齡生活充滿熱情與笑聲。',
    highlights: [
      '設計一週不重複的高齡養生食譜，注重菜色色香味與營養',
      '陪同進行高齡防跌肌力與手指靈巧度遊戲',
      '定期回報阿嬤健康狀況與心理情緒變化給異地子女'
    ]
  }
];
