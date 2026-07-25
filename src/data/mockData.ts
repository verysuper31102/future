import { Caregiver, Course, Review, Booking } from '../types';

export const MOCK_CAREGIVERS: Caregiver[] = [
  {
    id: 'cg-101',
    name: '林雅惠',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '資深長照照服員 / 失智症陪伴專家',
    city: '台北市',
    districts: ['大安區', '信義區', '中山區', '文山區'],
    experienceYears: 8,
    rating: 4.96,
    reviewCount: 48,
    hourlyRate: 320,
    dailyRate24h: 3200,
    dailyRate12h: 2200,
    specialties: ['失智症陪伴', '鼻胃管照護', '導尿管照護', '翻身拍背', '肢體復健協助', '關懷備餐'],
    languages: ['國語', '台語', '客語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2020-05-12', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: 'CPR / AED 急救認證', verifiedDate: '2024-01-10', issuer: '中華民國紅十字會' },
      { id: 'b3', name: '長照人員服務小卡 (Level 1-3)', verifiedDate: '2021-08-19', issuer: '台北市政府衛生局' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-02-01', issuer: '台北市政府警察局' },
      { id: 'b5', name: '胸部X光與傳染病體檢合格', verifiedDate: '2025-01-15', issuer: '國泰綜合醫院' }
    ],
    bio: '從事照顧服務業8年，曾任職於臺北榮民總醫院護理部與社區日照中心。擅長與失智長者建立情緒安全感，並熟練操作各類衛教與管路照顧。',
    philosophy: '「照顧不僅是生理上的按時給藥與翻身，更是靜靜聽長者講講過去的故事，給予尊嚴與溫暖。」',
    completedServicesCount: 142,
    featuredQuote: '陪伴是最深情的關懷，用細心讓家屬安心。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true, 'hourly': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_day': true, 'hourly': true } },
      { date: '2026-07-27', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-28', shifts: { '24h': true, '12h_night': true } },
      { date: '2026-07-29', shifts: { '12h_day': true, 'hourly': true } }
    ]
  },
  {
    id: 'cg-102',
    name: '陳建宏',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    gender: 'male',
    title: '中風術後復健與高力道照護員',
    city: '新北市',
    districts: ['板橋區', '中和區', '永和區', '新莊區'],
    experienceYears: 6,
    rating: 4.92,
    reviewCount: 36,
    hourlyRate: 350,
    dailyRate24h: 3500,
    dailyRate12h: 2400,
    specialties: ['中風復健', '重度體重移位', '翻身拍背', '導尿管照護', '氣切吸痰', '洗腎點滴護理'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2021-03-10', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: '長照人員服務小卡', verifiedDate: '2021-09-02', issuer: '新北市政府衛生局' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-20', issuer: '新北市政府警察局' }
    ],
    bio: '體格高大健碩、具備職能治療協同照顧經驗。特別擅長男性或較高大長者之抱移位、輪椅移位與定時翻身拍背，減少褥瘡發生。',
    philosophy: '「穩固的力量是護衛健康的基石，讓每一次移動都既安全又舒適。」',
    completedServicesCount: 98,
    featuredQuote: '耐心陪伴肢體復健，重拾尊嚴與自理生活信心。',
    availability: [
      { date: '2026-07-25', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_night': true } },
      { date: '2026-07-27', shifts: { '24h': true, '12h_day': true } },
      { date: '2026-07-28', shifts: { 'hourly': true } }
    ]
  },
  {
    id: 'cg-103',
    name: '張秀玲',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '護理師背景 / 術後傷口衛教照護',
    city: '台中市',
    districts: ['西區', '北區', '南屯區', '西屯區'],
    experienceYears: 10,
    rating: 4.98,
    reviewCount: 62,
    hourlyRate: 380,
    dailyRate24h: 3800,
    dailyRate12h: 2600,
    specialties: ['術後照護', '鼻胃管照護', '洗腎點滴護理', '壓傷/傷口觀察', '代購陪伴', '心靈傾聽'],
    languages: ['國語', '台語', '英語'],
    verifiedBadges: [
      { id: 'b0', name: '普考護理師證書', verifiedDate: '2015-08-01', issuer: '考選部' },
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2018-04-15', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: 'CPR / AED 高級急救認證', verifiedDate: '2024-03-22', issuer: '臺灣急救加護醫學會' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-02-10', issuer: '台中市政府警察局' }
    ],
    bio: '曾任台中榮總護理師，後轉投入居家與醫院個案專職照顧。具備醫學衛教背景，能敏銳察覺長者生命的早期病徵變化。',
    philosophy: '「結合醫學專業與居家溫度，給家屬最可靠的醫藥照護支持。」',
    completedServicesCount: 180,
    featuredQuote: '細緻衛教觀察，讓病患離院居家復原更踏實。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true, '12h_night': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_day': true } },
      { date: '2026-07-27', shifts: { '12h_night': true, 'hourly': true } }
    ]
  },
  {
    id: 'cg-104',
    name: '黃淑真',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '親和耐心 / 溫馨居家關懷照服員',
    city: '高雄市',
    districts: ['左營區', '鼓山區', '三民區', '苓雅區'],
    experienceYears: 5,
    rating: 4.89,
    reviewCount: 29,
    hourlyRate: 290,
    dailyRate24h: 2900,
    dailyRate12h: 2000,
    specialties: ['日常沐浴擦澡', '翻身拍背', '服藥提醒與紀錄', '失智症陪伴', '家務協助備餐'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2022-01-20', issuer: '勞動部技能檢定中心' },
      { id: 'b3', name: '長照人員服務小卡', verifiedDate: '2022-05-18', issuer: '高雄市政府衛生局' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-10', issuer: '高雄市政府警察局' }
    ],
    bio: '個性親切開朗、善於烹飪軟質養生高齡飲食。深受高雄在地許多高齡長者喜愛，常把阿公阿嬤當成自己家人般無微不至地呵護。',
    philosophy: '「廚房飄出的飯菜香與手心的溫度，是化解長者孤獨的最佳良藥。」',
    completedServicesCount: 75,
    featuredQuote: '家一般的溫度，給長者如親人般的溫暖。',
    availability: [
      { date: '2026-07-25', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-26', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-27', shifts: { '24h': true, '12h_night': true } }
    ]
  },
  {
    id: 'cg-105',
    name: '許美玲',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '夜間專任 / 重症安寧撫慰照服員',
    city: '台北市',
    districts: ['士林區', '北投區', '內湖區', '松山區'],
    experienceYears: 7,
    rating: 4.95,
    reviewCount: 42,
    hourlyRate: 340,
    dailyRate24h: 3400,
    dailyRate12h: 2300,
    specialties: ['夜間陪宿', '氣切吸痰', '鼻胃管照護', '安寧舒適照護', '情緒安定與按摩'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2019-11-08', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: '安寧療護照護講習認證', verifiedDate: '2023-06-12', issuer: '台灣安寧照顧協會' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-02-05', issuer: '台北市政府警察局' }
    ],
    bio: '專攻夜間陪宿與重症安寧照顧，睡眠警覺性極高，隨時關心長者夜間體溫、氧氣濃度與翻身需求，減輕家屬夜間看護負擔。',
    philosophy: '「夜晚是最脆弱的時候，我的守候是為了讓病患一夜好眠、家屬安心休息。」',
    completedServicesCount: 110,
    featuredQuote: '夜間輕柔守候，守護寧靜安穩的睡眠。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_night': true } },
      { date: '2026-07-26', shifts: { '12h_night': true } },
      { date: '2026-07-27', shifts: { '24h': true, '12h_night': true } }
    ]
  },
  {
    id: 'cg-106',
    name: '蔡宗翰',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    gender: 'male',
    title: '桃竹苗地區 / 關懷失智與肢體復健專家',
    city: '桃園市',
    districts: ['桃園區', '中壢區', '平鎮區', '龜山區', '八德區'],
    experienceYears: 6,
    rating: 4.91,
    reviewCount: 38,
    hourlyRate: 310,
    dailyRate24h: 3100,
    dailyRate12h: 2150,
    specialties: ['肢體復健協助', '失智症陪伴', '翻身拍背', '服藥提醒與紀錄', '日常沐浴擦澡'],
    languages: ['國語', '客語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2021-06-15', issuer: '勞動部技能檢定中心' },
      { id: 'b3', name: '長照人員服務小卡', verifiedDate: '2021-09-10', issuer: '桃園市政府衛生局' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-08', issuer: '桃園市政府警察局' }
    ],
    bio: '服務於桃園與中壢地區，擅長運用客語與長者互動。具備體能復健輔助與關懷備餐技能，深獲長輩信任與家屬好評。',
    philosophy: '「傾聽心聲，尊重長者生活習慣，用親切客家情懷陪伴每一天。」',
    completedServicesCount: 88,
    featuredQuote: '親切熱誠，用心陪伴桃園在地長者安心安老。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true, 'hourly': true } },
      { date: '2026-07-26', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-27', shifts: { '24h': true, '12h_night': true } }
    ]
  },
  {
    id: 'cg-107',
    name: '郭佩菁',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '府城府心 / 術後點滴與溫馨膳食照護',
    city: '台南市',
    districts: ['中西區', '東區', '永康區', '安平區', '北區'],
    experienceYears: 9,
    rating: 4.97,
    reviewCount: 54,
    hourlyRate: 330,
    dailyRate24h: 3300,
    dailyRate12h: 2250,
    specialties: ['鼻胃管照護', '洗腎點滴護理', '關懷備餐', '日常沐浴擦澡', '肢體復健協助'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2019-03-20', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: 'CPR / AED 急救認證', verifiedDate: '2024-02-15', issuer: '中華民國紅十字會' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-25', issuer: '台南市政府警察局' }
    ],
    bio: '曾任成大醫院特約照護員，擅長料理台南在地軟質營養膳食與慢性病管路照護。照顧態度嚴謹溫暖。',
    philosophy: '「細心把關每一餐飲食與藥物，給府城長輩最尊榮體貼的呵護。」',
    completedServicesCount: 135,
    featuredQuote: '台南溫情照護，專業與營養兼備的暖心服務。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_night': true } },
      { date: '2026-07-27', shifts: { '12h_day': true, 'hourly': true } }
    ]
  },
  {
    id: 'cg-108',
    name: '詹嘉銘',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    gender: 'male',
    title: '竹科園區家人首選 / 專精氣切與急救照護',
    city: '新竹市',
    districts: ['東區', '北區', '香山區', '竹北市'],
    experienceYears: 8,
    rating: 4.94,
    reviewCount: 46,
    hourlyRate: 360,
    dailyRate24h: 3600,
    dailyRate12h: 2500,
    specialties: ['氣切吸痰', '導尿管照護', '鼻胃管照護', '翻身拍背', '服藥提醒與紀錄'],
    languages: ['國語', '客語', '英語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2020-08-10', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: 'CPR / AED 急救高級證書', verifiedDate: '2024-05-11', issuer: '臺灣急救加護醫學會' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-02-02', issuer: '新竹市政府警察局' }
    ],
    bio: '服務於新竹市與竹北台大分院周邊，應對緊急氣切吸痰與重症監測經驗豐富，能進行簡單英語衛教溝通。',
    philosophy: '「嚴謹專業的醫護標準，讓高壓工作的新竹家人能無後顧之憂。」',
    completedServicesCount: 120,
    featuredQuote: '專業嚴謹管路照護，新竹家庭最信賴的防線。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true, '12h_night': true } },
      { date: '2026-07-26', shifts: { '12h_day': true } },
      { date: '2026-07-27', shifts: { '24h': true, 'hourly': true } }
    ]
  },
  {
    id: 'cg-109',
    name: '廖芳姿',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    title: '彰投嘉區域 / 慢性病護理與安寧陪伴',
    city: '彰化縣',
    districts: ['彰化市', '員林市', '鹿港鎮', '和美鎮'],
    experienceYears: 7,
    rating: 4.88,
    reviewCount: 31,
    hourlyRate: 300,
    dailyRate24h: 3000,
    dailyRate12h: 2100,
    specialties: ['服藥提醒與紀錄', '日常沐浴擦澡', '失智症陪伴', '關懷備餐', '翻身拍背'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2021-11-05', issuer: '勞動部技能檢定中心' },
      { id: 'b3', name: '長照人員服務小卡', verifiedDate: '2022-01-18', issuer: '彰化縣政府衛生局' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-12', issuer: '彰化縣警察局' }
    ],
    bio: '彰化在地深耕7年，熟悉老齡慢性病照護注意事項，具備豐富居家護理衛教經驗，性格踏實沉穩。',
    philosophy: '「用耐心撫平歲月波瀾，用真誠撫慰長者心靈。」',
    completedServicesCount: 82,
    featuredQuote: '在地親切陪伴，細緻照料每項健康細節。',
    availability: [
      { date: '2026-07-25', shifts: { '12h_day': true, 'hourly': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_day': true } },
      { date: '2026-07-27', shifts: { '12h_night': true } }
    ]
  },
  {
    id: 'cg-110',
    name: '蘇哲維',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    gender: 'male',
    title: '東台灣山海守護 / 復健與高齡生活扶助員',
    city: '宜蘭縣',
    districts: ['宜蘭市', '羅東鎮', '礁溪鄉', '花蓮市'],
    experienceYears: 5,
    rating: 4.93,
    reviewCount: 27,
    hourlyRate: 300,
    dailyRate24h: 3000,
    dailyRate12h: 2050,
    specialties: ['肢體復健協助', '翻身拍背', '日常沐浴擦澡', '失智症陪伴', '導尿管照護'],
    languages: ['國語', '台語'],
    verifiedBadges: [
      { id: 'b1', name: '照顧服務員單一級技術士證', verifiedDate: '2022-04-12', issuer: '勞動部技能檢定中心' },
      { id: 'b2', name: 'CPR / AED 急救認證', verifiedDate: '2024-03-01', issuer: '中華民國紅十字會' },
      { id: 'b4', name: '良民證無刑事紀錄證明', verifiedDate: '2025-01-19', issuer: '宜蘭縣警察局' }
    ],
    bio: '陽光開朗、熱愛運動，擅長高齡肢體伸展與關節復健輔助。服務範疇涵蓋宜蘭羅東與花蓮市區。',
    philosophy: '「帶來如花東陽光般的朝氣，陪伴長者踏出復健每一步。」',
    completedServicesCount: 64,
    featuredQuote: '陽光般溫暖陪伴，復健路上最堅實的後盾。',
    availability: [
      { date: '2026-07-25', shifts: { '24h': true, '12h_day': true } },
      { date: '2026-07-26', shifts: { '24h': true, '12h_day': true, 'hourly': true } },
      { date: '2026-07-27', shifts: { '12h_night': true } }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    caregiverId: 'cg-101',
    authorName: '王先生（大安區）',
    rating: 5,
    date: '2026-07-15',
    patientCondition: '失智症 Level 4 / 鼻胃管照護',
    text: '林阿姨非常非常有耐心！家裡高齡88歲的父親患有中度失智，有時夜間會焦躁不安，林阿姨用輕柔的音樂與聊天安撫父親，態度非常溫柔專業。強烈推薦！',
    verifiedStay: true,
    helpfulCount: 12
  },
  {
    id: 'rev-2',
    caregiverId: 'cg-101',
    authorName: '李小姐（信義區）',
    rating: 5,
    date: '2026-06-28',
    patientCondition: '髖關節術後復健 / 12小時日班',
    text: '母親剛做完髖關節手術，需要每天協助移位與冰敷。林姐手藝好又細心，連營養飯菜都幫忙煮得很好消化。電子合約與平台的託管服務也讓我們很放心。',
    verifiedStay: true,
    helpfulCount: 8
  },
  {
    id: 'rev-3',
    caregiverId: 'cg-102',
    authorName: '劉大衛（板橋區）',
    rating: 5,
    date: '2026-07-02',
    patientCondition: '中風右側偏癱 / 24小時駐點',
    text: '陳教練體力非常好，對於我80公斤的父親抱轉輪椅跟定時翻身拍背都非常俐落專業，完全沒有滑脫危險。家屬獲得了難得的休息時間。',
    verifiedStay: true,
    helpfulCount: 15
  },
  {
    id: 'rev-4',
    caregiverId: 'cg-103',
    authorName: '周太太（台中西區）',
    rating: 5,
    date: '2026-07-10',
    patientCondition: '腹膜透析與洗腎觀察',
    text: '張護理師背景的照服員真的很厲害，對傷口與點滴紀錄無可挑剔！有她在身邊，隨時回報血壓與體溫，給全家很大的安全感。',
    verifiedStay: true,
    helpfulCount: 9
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c-01',
    title: '失智症非藥物生活照顧與情緒溝通實務',
    category: '心理溝通',
    hours: 4,
    provider: '台灣失智症協會',
    instructor: '魏芳瑜 諮商心理師',
    rating: 4.9,
    price: 0,
    isFree: true,
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=500',
    description: '深入了解高齡失智長者黃昏症候群、重複提問與被害妄想之互動技巧，提升照護情緒安全感。可採計長照繼續教育積分4小時。',
    deadline: '2026-08-31',
    enrolled: true
  },
  {
    id: 'c-02',
    title: '吞嚥障礙長者軟質飲食製作與防嗆技術',
    category: '照護技能',
    hours: 3,
    provider: '國泰綜合醫院營養護理團隊',
    instructor: '陳品蓁 語言治療師',
    rating: 4.8,
    price: 350,
    isFree: false,
    coverImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=500',
    description: '教導如何根據IDDSI國際吞嚥飲食標準調配泥狀與細碎飲食，並實作正確餵食姿勢與急救扣擺，降低吸入性肺炎風險。',
    deadline: '2026-08-15',
    enrolled: false
  },
  {
    id: 'c-03',
    title: '高齡身體移位輔具運用與防跌工安防護',
    category: '照護技能',
    hours: 2,
    provider: '中華民國物理治療師公會',
    instructor: '廖健翔 物理治療師',
    rating: 4.95,
    price: 0,
    isFree: true,
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=500',
    description: '減少照服員因力道過度導致腰部拉傷。學習移位滑墊、站立輔具與人體工學施力法，保護自己與長者。',
    deadline: '2026-09-10',
    enrolled: false
  },
  {
    id: 'c-04',
    title: '照顧服務員職場勞動權益與緊急合約應變處置',
    category: '長照政策',
    hours: 2,
    provider: '長照勞工權益促進會',
    instructor: '黃國華 律師',
    rating: 4.7,
    price: 0,
    isFree: true,
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500',
    description: '解析定型化契約條款、金流第三方託管原則、職場不合理要求之拒絕與申訴流程。',
    deadline: '2026-08-20',
    enrolled: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-202607-8812',
    caregiverId: 'cg-101',
    caregiverName: '林雅惠',
    caregiverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    caregiverPhone: '0912-345-678',
    seekerName: '陳宗翰',
    seekerPhone: '0988-765-432',
    patientName: '陳阿公 (85歲)',
    patientAge: 85,
    patientGender: 'male',
    disabilityLevel: '失能等級 Level 5',
    selectedConditions: ['失智症陪伴', '鼻胃管照護', '翻身拍背'],
    serviceAddress: '台北市大安區新生南路二段 120 號 5 樓',
    shiftType: '24h',
    startDate: '2026-07-28',
    endDate: '2026-07-30',
    totalDays: 3,
    estimatedHours: 72,
    totalAmount: 9600,
    platformFee: 768,
    escrowStatus: 'escrowed',
    contractSigned: true,
    signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><path d="M 10 30 Q 50 10 90 35 T 180 25" stroke="%23333" stroke-width="2" fill="none"/></svg>',
    status: 'confirmed',
    createdAt: '2026-07-24 14:20'
  }
];
