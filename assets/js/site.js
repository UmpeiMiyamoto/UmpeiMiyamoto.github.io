(function () {
  const html = document.documentElement;
  const root = html.dataset.root || "";
  const lang = html.lang && html.lang.startsWith("ja") ? "ja" : "en";
  const data = window.SITE_DATA || { publications: [], album: [] };

  const labels = {
    ja: { noPapers: "該当する論文はありません．", noPhotos: "該当する写真はありません．", arxiv: "arXiv" },
    en: { noPapers: "No publications match this view.", noPhotos: "No photographs match this view.", arxiv: "arXiv" }
  };

  const titleTranslations = {
    "毒蛇研究所": "Venomous snake institute",
    "エルサレム旧市街": "Old City of Jerusalem",
    "エルサレムの旧市街": "Old City of Jerusalem",
    "アーモンドの実": "Almond fruit",
    "ピラミッド": "Pyramids",
    "ナイル川": "The Nile",
    "イスラエルの道路標識": "Road signs in Israel",
    "インディジョーンズ": "Indiana Jones country",
    "ワディラム砂漠": "Wadi Rum desert",
    "紅海": "Red Sea",
    "岩のドーム": "Dome of the Rock",
    "バンフ": "Banff",
    "エルサレムセンターの市場": "Market in central Jerusalem",
    "アインシュタイン博物館": "Einstein Museum",
    "アインシュタインの成績表": "Einstein's report card",
    "エルチェ": "Elche",
    "グラナダ": "Granada",
    "フムスとピタパン": "hummus and pita bread",
    "トーレスデルパイネ": "Torres del Paine",
    "パタゴニア": "Patagonia",
    "氷河": "Glacier",
    "スカイツリー": "Tokyo Skytree",
    "立教大学": "Rikkyo University",
    "秋田県立大学本荘キャンパス": "Akita Prefectural University, Honjo Campus",
    "秋田県立大学秋田キャンパス": "Akita Prefectural University, Akita Campus",
    "由利本荘市": "Yurihonjo",
    "下浜海水浴場": "Shimohama beach",
    "バルディビア": "Valdivia",
    "小安峡": "Oyasukyo gorge",
    "栗駒山": "Mt. Kurikoma",
    "岩城": "Iwaki",
    "弘前城": "Hirosaki Castle",
    "法体の滝": "Hottai Falls",
    "名古屋城": "Nagoya Castle",
    "名古屋空港": "Nagoya Airport",
    "男鹿": "Oga",    "大曲の花火": "Omagari fireworks",
    "トリエステ": "Trieste",
    "ベネチア": "Venice",
    "アテネ": "Athens",
    "シフノス島": "Sifnos",
    "イスタンブール": "Istanbul",
    "伊豆": "Izu",
    "数理科学": "Mathematical Sciences",
    "教育": "Teaching",
    "山梨": "Yamanashi",
    "秋田": "Akita",
    "宮古": "Miyako",
    "冬の記録": "Winter Record",
    "ポルトガル": "Portugal",
    "富山": "Toyama",
    "青森": "Aomori",
    "チリ": "Chile",
    "パタゴニア": "Patagonia",
    "イスラエル": "Israel",
    "エルサレム": "Jerusalem",
    "ヨルダン": "Jordan",
    "エジプト": "Egypt",
    "英国": "United Kingdom",
    "ブラジル": "Brazil"
  };

  const noteTranslations = [
    ["全国花火競技大会", "National Fireworks Competition"],
    ["港", "harbor"], ["路地", "back street"], ["旧市街", "Old City"],
    ["スペイン", "Spain"], ["イスラエル", "Israel"], ["ブラジル", "Brazil"],
    ["イタリア", "Italy"], ["秋田", "Akita"], ["海外", "overseas"], ["国内", "Japan"]
  ];

  const featuredAlbumRecords = [
    { filename: "insert-202309-trieste-coast.JPG", src: "assets/album/insert/insert-202309-trieste-coast.JPG", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "海岸", noteEn: "coast", tags: "イタリア トリエステ 海外 海" },
    { filename: "insert-202308-nandakore-mystery.png", src: "assets/album/insert/insert-202308-nandakore-mystery.png", titleJa: "世界の何だこれ？ミステリー", titleEn: "World's Nandakore Mystery", date: "2023.08", noteJa: "テレビ番組", noteEn: "television program", tags: "テレビ 国内 記録" },
    { filename: "insert-201909-forest-tree.jpg", src: "assets/album/insert/insert-201909-forest-tree.jpg", titleJa: "あがりこ大王", titleEn: "Agariko Daio", date: "2019.09", noteJa: "秋田", noteEn: "Akita", tags: "秋田 国内 自然 風景" },
    { filename: "insert-201909-flowers.jpg", src: "assets/album/insert/insert-201909-flowers.jpg", titleJa: "秋の記録", titleEn: "Autumn record", date: "2019.09", noteJa: "花と葉", noteEn: "flowers and leaves", tags: "国内 秋" },
    { filename: "insert-201904-sakura-fuji.jpg", src: "assets/album/insert/insert-201904-sakura-fuji.jpg", titleJa: "鳥海山", titleEn: "Mount Chokai", date: "2019.04", noteJa: "桜と鳥海山", noteEn: "cherry blossoms and Mount Chokai", tags: "鳥海山 国内 風景 桜" },
    { filename: "insert-201811-autumn-campus.jpg", src: "assets/album/insert/insert-201811-autumn-campus.jpg", titleJa: "秋田", titleEn: "Akita", date: "2018.11", noteJa: "秋のキャンパス", noteEn: "autumn campus", tags: "秋田 国内 秋 大学" },
    { filename: "insert-201811-autumn-branch.jpg", src: "assets/album/insert/insert-201811-autumn-branch.jpg", titleJa: "秋田", titleEn: "Akita", date: "2018.11", noteJa: "秋の枝", noteEn: "autumn branch", tags: "秋田 国内 秋" },
    { filename: "insert-201811-autumn-leaves.jpg", src: "assets/album/insert/insert-201811-autumn-leaves.jpg", titleJa: "秋田", titleEn: "Akita", date: "2018.11", noteJa: "紅葉", noteEn: "autumn leaves", tags: "秋田 国内 秋" },
    { filename: "insert-201809-salt-terraces.jpg", src: "assets/album/insert/insert-201809-salt-terraces.jpg", titleJa: "ペルー", titleEn: "Peru", date: "2018.09", noteJa: "塩田", noteEn: "salt terraces", tags: "ペルー 海外 風景" },
    { filename: "insert-201809-moray.jpg", src: "assets/album/insert/insert-201809-moray.jpg", titleJa: "ペルー", titleEn: "Peru", date: "2018.09", noteJa: "モライ遺跡", noteEn: "Moray", tags: "ペルー 海外 遺跡" },
    { filename: "insert-201809-machu-picchu.jpg", src: "assets/album/insert/insert-201809-machu-picchu.jpg", titleJa: "マチュピチュ", titleEn: "Machu Picchu", date: "2018.09", noteJa: "遺跡", noteEn: "ruins", tags: "ペルー 海外 遺跡" },
    { filename: "insert-201809-peru-dish.jpg", src: "assets/album/insert/insert-201809-peru-dish.jpg", titleJa: "ペルー", titleEn: "Peru", date: "2018.09", noteJa: "料理", noteEn: "dish", tags: "ペルー 海外 料理" },
    { filename: "insert-201809-inca-stonework.jpg", src: "assets/album/insert/insert-201809-inca-stonework.jpg", titleJa: "ペルー", titleEn: "Peru", date: "2018.09", noteJa: "石組み", noteEn: "stonework", tags: "ペルー 海外 遺跡" },
    { filename: "insert-201809-peru-festival.jpg", src: "assets/album/insert/insert-201809-peru-festival.jpg", titleJa: "ペルー", titleEn: "Peru", date: "2018.09", noteJa: "祭り", noteEn: "festival", tags: "ペルー 海外 街" },
    { filename: "insert-201807-illustration.jpg", src: "assets/album/insert/insert-201807-illustration.jpg", titleJa: "記録", titleEn: "Record", date: "2018.07", noteJa: "イラスト", noteEn: "illustration", tags: "国内 記録" },
    { filename: "insert-201806-colosseum.jpg", src: "assets/album/insert/insert-201806-colosseum.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2018.06", noteJa: "コロッセオ", noteEn: "Colosseum", tags: "イタリア ローマ 海外 遺跡" },
    { filename: "insert-201412-orange-tree.jpg", src: "assets/album/insert/insert-201412-orange-tree.jpg", titleJa: "松戸市", titleEn: "Matsudo", date: "2014.12", noteJa: "冬の実", noteEn: "winter fruit", tags: "千葉 松戸 国内 風景" },
    { filename: "insert-201405-shrine-gate.jpg", src: "assets/album/insert/insert-201405-shrine-gate.jpg", titleJa: "伏見稲荷大社", titleEn: "Fushimi Inari Taisha", date: "2014.05", noteJa: "鳥居", noteEn: "torii gates", tags: "京都 国内 神社 鳥居" },
    { filename: "insert-201405-insect.jpg", src: "assets/album/insert/insert-201405-insect.jpg", titleJa: "春の記録", titleEn: "Spring record", date: "2014.05", noteJa: "小さな虫", noteEn: "small insect", tags: "国内 自然" },
    { filename: "insert-201405-garden.jpg", src: "assets/album/insert/insert-201405-garden.jpg", titleJa: "京都", titleEn: "Kyoto", date: "2014.05", noteJa: "苔の庭", noteEn: "moss garden", tags: "京都 国内 庭園 風景" },
    { filename: "insert-201405-lecture-board.jpg", src: "assets/album/insert/insert-201405-lecture-board.jpg", titleJa: "基礎物理学研究所", titleEn: "Yukawa Institute for Theoretical Physics", date: "2014.05", noteJa: "議論の板書", noteEn: "discussion blackboard", tags: "京都 国内 研究" },
    { filename: "feature-001.jpg", src: "assets/album/featured/feature-001.jpg", titleJa: "アテネ", titleEn: "Athens", date: "2024.09", noteJa: "パルテノン神殿", noteEn: "Parthenon", tags: "ギリシャ アテネ 海外 遺跡" },
    { filename: "feature-002.jpg", src: "assets/album/featured/feature-002.jpg", titleJa: "アテネ", titleEn: "Athens", date: "2024.09", noteJa: "エレクテイオン", noteEn: "Erechtheion", tags: "ギリシャ アテネ 海外 遺跡" },
    { filename: "feature-003.jpg", src: "assets/album/featured/feature-003.jpg", titleJa: "アテネ", titleEn: "Athens", date: "2024.09", noteJa: "古代アゴラの神殿", noteEn: "temple in the Ancient Agora", tags: "ギリシャ アテネ 海外 遺跡" },
    { filename: "feature-004.jpeg", src: "assets/album/featured/feature-004.jpeg", titleJa: "シフノス島", titleEn: "Sifnos", date: "2024.09", noteJa: "Chrysopigi の海辺", noteEn: "Chrysopigi seaside", tags: "ギリシャ シフノス 海外 海" },
    { filename: "feature-005.jpeg", src: "assets/album/featured/feature-005.jpeg", titleJa: "イスタンブール", titleEn: "Istanbul", date: "2024.09", noteJa: "ドイツの噴水とブルーモスク", noteEn: "German Fountain and Blue Mosque", tags: "トルコ イスタンブール 海外 遺跡" },
    { filename: "feature-006.jpeg", src: "assets/album/featured/feature-006.jpeg", titleJa: "イスタンブール", titleEn: "Istanbul", date: "2024.09", noteJa: "トプカプ宮殿のハーレム", noteEn: "Topkapi Palace harem", tags: "トルコ イスタンブール 海外 遺跡" },
    { filename: "feature-007.jpeg", src: "assets/album/featured/feature-007.jpeg", titleJa: "伊豆", titleEn: "Izu", date: "2024.08", noteJa: "青の洞窟", noteEn: "Blue Cave", tags: "伊豆 国内 海" },
    { filename: "feature-008.jpeg", src: "assets/album/featured/feature-008.jpeg", titleJa: "伊豆", titleEn: "Izu", date: "2024.08", noteJa: "帰省中の記録", noteEn: "travel record", tags: "伊豆 国内" },
    { filename: "feature-009.jpeg", src: "assets/album/featured/feature-009.jpeg", titleJa: "シフノス島", titleEn: "Sifnos", date: "2024.09", noteJa: "ギロピタ", noteEn: "gyropita", tags: "ギリシャ シフノス 海外 料理" },
    { filename: "feature-010.jpeg", src: "assets/album/featured/feature-010.jpeg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "カナルグランデの夕景", noteEn: "Canal Grande at dusk", tags: "イタリア トリエステ 海外 運河" },
    { filename: "feature-011.jpeg", src: "assets/album/featured/feature-011.jpeg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "サン・マルコ広場", noteEn: "Piazza San Marco", tags: "イタリア ベネチア 海外 街" },
    { filename: "feature-012.jpeg", src: "assets/album/featured/feature-012.jpeg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "ミラマーレ城", noteEn: "Miramare Castle", tags: "イタリア トリエステ 海外 建築" },
    { filename: "feature-013.jpeg", src: "assets/album/featured/feature-013.jpeg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "サン・マルコ・カフェ", noteEn: "San Marco Cafe", tags: "イタリア トリエステ 海外 料理" },
    { filename: "feature-014.jpeg", src: "assets/album/featured/feature-014.jpeg", titleJa: "数理科学", titleEn: "Mathematical Sciences", date: "2023.05", noteJa: "特集「数理で読み解く物理学の世界」", noteEn: "special issue on mathematical physics", tags: "研究 教育" },
    { filename: "feature-015.jpg", src: "assets/album/featured/feature-015.jpg", titleJa: "東京", titleEn: "Tokyo", date: "2022.06", noteJa: "理研での議論", noteEn: "discussion at RIKEN", tags: "東京 国内 研究" },
    { filename: "feature-016.jpg", src: "assets/album/featured/feature-016.jpg", titleJa: "教育", titleEn: "Teaching", date: "2022.09", noteJa: "論理学の教室", noteEn: "logic classroom", tags: "教育 論理学 国内" },
    { filename: "feature-017.jpg", src: "assets/album/featured/feature-017.jpg", titleJa: "山梨", titleEn: "Yamanashi", date: "2022.01", noteJa: "展望台からの富士山", noteEn: "Mount Fuji from an observatory", tags: "山梨 国内 風景" },
    { filename: "feature-018.jpg", src: "assets/album/featured/feature-018.jpg", titleJa: "秋田", titleEn: "Akita", date: "2022.08", noteJa: "雁の里ふれあいの森キャンプ場", noteEn: "Gan-no-sato forest campground", tags: "秋田 国内 風景" },
    { filename: "feature-019.jpg", src: "assets/album/featured/feature-019.jpg", titleJa: "秋田", titleEn: "Akita", date: "2022.10", noteJa: "秋の風景", noteEn: "autumn scene", tags: "秋田 国内 秋" },
    { filename: "insert-202408-kanto.jpg", src: "assets/album/insert/insert-202408-kanto.jpg", titleJa: "秋田竿燈まつり", titleEn: "Akita Kanto Festival", date: "2024.08", noteJa: "竿燈", noteEn: "lantern festival", tags: "秋田 国内 祭り" },
    { filename: "feature-021.jpg", src: "assets/album/featured/feature-021.jpg", titleJa: "宮古", titleEn: "Miyako", date: "2022.11", noteJa: "リアス式海岸", noteEn: "ria coast", tags: "岩手 宮古 国内 海" },
    { filename: "feature-022.jpg", src: "assets/album/featured/feature-022.jpg", titleJa: "宮古", titleEn: "Miyako", date: "2022.11", noteJa: "瓶詰＠宮古市", noteEn: "bottled seafood in Miyako", tags: "岩手 宮古 国内" },
    { filename: "feature-023.jpeg", src: "assets/album/featured/feature-023.jpeg", titleJa: "鳥海山", titleEn: "Mount Chokai", date: "2022.07", noteJa: "山行", noteEn: "hike", tags: "秋田 国内 山" },
    { filename: "feature-024.jpg", src: "assets/album/featured/feature-024.jpg", titleJa: "冬の記録", titleEn: "Winter Record", date: "2021.12", noteJa: "雪の日の造形", noteEn: "snow-day figure", tags: "国内 雪" },
    { filename: "photo-012.jpg", src: "assets/album/field/photo-012.jpg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "運河とゴンドラ", noteEn: "canal and gondola", tags: "イタリア ベネチア 海外 街" },
    { filename: "photo-004.jpg", src: "assets/album/field/photo-004.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "港", noteEn: "harbor", tags: "イタリア トリエステ 海外 街" },
    { filename: "photo-077.jpg", src: "assets/album/field/photo-077.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.08", noteJa: "路地", noteEn: "back street", tags: "イタリア トリエステ 海外 街" },
    { filename: "photo-118.jpg", src: "assets/album/field/photo-118.jpg", titleJa: "秋田", titleEn: "Akita", date: "2023.04", noteJa: "水辺", noteEn: "waterside", tags: "秋田 国内 風景" },
    { filename: "201609a.jpg", src: "assets/album/images/201609a.jpg", titleJa: "ポルトガル", titleEn: "Portugal", date: "2016.09", noteJa: "路面電車", noteEn: "tram", tags: "ポルトガル 海外 街" },
    { filename: "201609b.jpg", src: "assets/album/images/201609b.jpg", titleJa: "ポルトガル", titleEn: "Portugal", date: "2016.09", noteJa: "路面電車", noteEn: "tram", tags: "ポルトガル 海外 街" },
    { filename: "201608.jpg", src: "assets/album/images/201608.jpg", titleJa: "富山", titleEn: "Toyama", date: "2016.08", noteJa: "黒部ダム", noteEn: "Kurobe Dam", tags: "富山 国内 風景" },
    { filename: "201605.jpg", src: "assets/album/images/201605.jpg", titleJa: "秋田", titleEn: "Akita", date: "2016.05", noteJa: "菜の花", noteEn: "rapeseed flowers", tags: "秋田 国内 風景" },
    { filename: "201412a.jpg", src: "assets/album/images/201412a.jpg", titleJa: "立教大学", titleEn: "Rikkyo University", date: "2014.12", noteJa: "クリスマスツリー", noteEn: "Christmas trees", tags: "東京 国内 大学" },
    { filename: "201410b.jpg", src: "assets/album/images/201410b.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.10", noteJa: "月食", noteEn: "lunar eclipse", tags: "秋田 国内 風景" },
    { filename: "201410a.jpg", src: "assets/album/images/201410a.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.10", noteJa: "押し葉", noteEn: "pressed leaves", tags: "秋田 国内 秋" },
    { filename: "201409d.jpg", src: "assets/album/images/201409d.jpg", titleJa: "秋田県立大学本荘キャンパス", titleEn: "Akita Prefectural University, Honjo Campus", date: "2014.09", noteJa: "夕景", noteEn: "campus at dusk", tags: "秋田 国内 大学" },
    { filename: "201409c.jpg", src: "assets/album/images/201409c.jpg", titleJa: "秋田県立大学本荘キャンパス", titleEn: "Akita Prefectural University, Honjo Campus", date: "2014.09", noteJa: "夜のキャンパス", noteEn: "campus at night", tags: "秋田 国内 大学" },
    { filename: "201408c.jpg", src: "assets/album/images/201408c.jpg", titleJa: "大曲の花火", titleEn: "Omagari fireworks", date: "2014.08", noteJa: "全国花火競技大会", noteEn: "National Fireworks Competition", tags: "秋田 大曲 国内 風景" },
    { filename: "201408a.jpg", src: "assets/album/images/201408a.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.08", noteJa: "男鹿", noteEn: "Oga", tags: "秋田 国内 風景" },
    { filename: "201402e.jpg", src: "assets/album/images/201402e.jpg", titleJa: "秋田県立大学本荘キャンパス", titleEn: "Akita Prefectural University, Honjo Campus", date: "2014.02", noteJa: "雪景色", noteEn: "snow scene", tags: "秋田 国内 大学 雪" },
    { filename: "201402g.jpg", src: "assets/album/images/201402g.jpg", titleJa: "愛知", titleEn: "Aichi", date: "2014.02", noteJa: "名古屋城", noteEn: "Nagoya Castle", tags: "愛知 国内 建築" },
    { filename: "insert-201308-valdivia.jpg", src: "assets/album/insert/insert-201308-valdivia.jpg", titleJa: "バルディビア", titleEn: "Valdivia", date: "2013.08", noteJa: "港", noteEn: "harbor", tags: "チリ バルディビア 海外 港" },
    { filename: "201306c.jpg", src: "assets/album/images/201306c.jpg", titleJa: "下浜海水浴場", titleEn: "Shimohama beach", date: "2013.06", noteJa: "夕景", noteEn: "sunset", tags: "秋田 国内 海" },
    { filename: "201304g.jpg", src: "assets/album/images/201304g.jpg", titleJa: "秋田県立大学本荘キャンパス", titleEn: "Akita Prefectural University, Honjo Campus", date: "2013.04", noteJa: "中庭", noteEn: "courtyard", tags: "秋田 国内 大学" },
    { filename: "insert-201212-rikkyo.jpg", src: "assets/album/insert/insert-201212-rikkyo.jpg", titleJa: "立教大学", titleEn: "Rikkyo University", date: "2012.12", noteJa: "キャンパス", noteEn: "campus", tags: "東京 国内 大学" },
    { filename: "201311e.jpg", src: "assets/album/images/201311e.jpg", titleJa: "青森", titleEn: "Aomori", date: "2013.11", noteJa: "弘前城", noteEn: "Hirosaki Castle", tags: "青森 国内 建築" },    { filename: "201308d.jpg", src: "assets/album/images/201308d.jpg", titleJa: "チリ", titleEn: "Chile", date: "2013.08", noteJa: "夕景", noteEn: "evening sky", tags: "チリ 海外 街" },
    { filename: "201103b.jpg", src: "assets/album/images/201103b.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "トーレス・デル・パイネ", noteEn: "Torres del Paine", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201103c.jpg", src: "assets/album/images/201103c.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "山並み", noteEn: "mountains", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201103d.jpg", src: "assets/album/images/201103d.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "氷河", noteEn: "glacier", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201009b.jpg", src: "assets/album/images/201009b.jpg", titleJa: "グラナダ", titleEn: "Granada", date: "2010.09", noteJa: "スペイン", noteEn: "Spain", tags: "スペイン グラナダ 海外 街" },
    { filename: "200908a.jpg", src: "assets/album/images/200908a.jpg", titleJa: "イスラエル", titleEn: "Israel", date: "2009.08", noteJa: "アインシュタイン博物館", noteEn: "Einstein Museum", tags: "イスラエル 海外 博物館" },
    { filename: "200907b.jpg", src: "assets/album/images/200907b.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.07", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル エルサレム 海外 街" },
    { filename: "200907c.jpg", src: "assets/album/images/200907c.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.07", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル エルサレム 海外 街" },
    { filename: "200903a.jpg", src: "assets/album/images/200903a.jpg", titleJa: "ヨルダン", titleEn: "Jordan", date: "2009.03", noteJa: "ペトラ", noteEn: "Petra", tags: "ヨルダン 海外 遺跡" },
    { filename: "200903b.jpg", src: "assets/album/images/200903b.jpg", titleJa: "ヨルダン", titleEn: "Jordan", date: "2009.03", noteJa: "ワディラム", noteEn: "Wadi Rum", tags: "ヨルダン 海外 遺跡" },
    { filename: "200903c.jpg", src: "assets/album/images/200903c.jpg", titleJa: "ヨルダン", titleEn: "Jordan", date: "2009.03", noteJa: "紅海", noteEn: "Red Sea", tags: "ヨルダン 海外 海" },
    { filename: "200903e.jpg", src: "assets/album/images/200903e.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.03", noteJa: "岩のドーム", noteEn: "Dome of the Rock", tags: "イスラエル 海外 遺跡" },
    { filename: "200806a.jpg", src: "assets/album/images/200806a.jpg", titleJa: "イスラエル", titleEn: "Israel", date: "2008.06", noteJa: "ユダヤの結婚式", noteEn: "Jewish wedding", tags: "イスラエル 海外 人々" },
    { filename: "200807.jpg", src: "assets/album/images/200807.jpg", titleJa: "フムスとピタパン", titleEn: "Hummus and pita bread", date: "2008.07", noteJa: "イスラエル", noteEn: "Israel", tags: "イスラエル 海外 料理" },
    { filename: "200804b.jpg", src: "assets/album/images/200804b.jpg", titleJa: "エジプト", titleEn: "Egypt", date: "2008.04", noteJa: "ピラミッド", noteEn: "pyramids", tags: "エジプト 海外 遺跡" },
    { filename: "200804d.jpg", src: "assets/album/images/200804d.jpg", titleJa: "エジプト", titleEn: "Egypt", date: "2008.04", noteJa: "ギザ", noteEn: "Giza", tags: "エジプト 海外 遺跡" },
    { filename: "200803b.jpg", src: "assets/album/images/200803b.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2008.03", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル エルサレム 海外 街" },
    { filename: "200803c.jpg", src: "assets/album/images/200803c.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2008.03", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル 海外 街" },
    { filename: "200702.jpg", src: "assets/album/images/200702.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2007.02", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル 海外 遺跡" },
    { filename: "200710.jpg", src: "assets/album/images/200710.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2007.10", noteJa: "十字軍の落書き", noteEn: "Crusader graffiti", tags: "イスラエル 海外 遺跡" },
    { filename: "200407a.jpg", src: "assets/album/images/200407a.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ストーンヘンジ", noteEn: "Stonehenge", tags: "英国 海外 遺跡" },
    { filename: "200407b.jpg", src: "assets/album/images/200407b.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ケンブリッジ", noteEn: "Cambridge", tags: "英国 海外 大学" },
    { filename: "200407d.jpg", src: "assets/album/images/200407d.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ケンブリッジ", noteEn: "Cambridge", tags: "英国 海外 大学" },
    { filename: "200307a.jpg", src: "assets/album/images/200307a.jpg", titleJa: "ブラジル", titleEn: "Brazil", date: "2003.07", noteJa: "アマゾン", noteEn: "Amazon", tags: "ブラジル 海外 自然" },
    { filename: "200307c.jpg", src: "assets/album/images/200307c.jpg", titleJa: "ブラジル", titleEn: "Brazil", date: "2003.07", noteJa: "滝", noteEn: "waterfall", tags: "ブラジル 海外 自然" },
    { filename: "200307f.jpg", src: "assets/album/images/200307f.jpg", titleJa: "毒蛇研究所", titleEn: "Venomous snake institute", date: "2003.07", noteJa: "ブラジル", noteEn: "Brazil", tags: "ブラジル 海外 研究" }
  ];

  const themeMatchers = {
    gravity: /gr-qc|black hole|spacetime|relativ|gravity|kerr|schwarzschild|shadow|horizon/i,
    quantum: /hep-th|quant-ph|quantum|casimir|vacuum|particle creation|field|boundary/i,
    fluid: /fluid|drop|jet|liquid|surface tension|rayleigh|plateau|gregory|laflamme|brane|viscous|instability/i,
    geometry: /math\.dg|geometry|hypersurface|constant mean curvature|cmc|free boundary|black ring/i,
    dimensional: /dimensional analysis|dimensionless|constraints|linear-algebraic|drag force/i
  };

  function hasTheme(paper, theme) {
    if (Array.isArray(paper.themes)) return paper.themes.includes(theme);
    const matcher = themeMatchers[theme];
    return matcher ? matcher.test([paper.title, paper.primary, (paper.categories || []).join(" "), paper.summary].join(" ")) : true;
  }

  const themeFilters = {
    all: function () { return true; },
    gravity: function (paper) { return hasTheme(paper, "gravity"); },
    quantum: function (paper) { return hasTheme(paper, "quantum"); },
    fluid: function (paper) { return hasTheme(paper, "fluid"); },
    geometry: function (paper) { return hasTheme(paper, "geometry"); },
    dimensional: function (paper) { return hasTheme(paper, "dimensional"); }
  };

  function escapeHTML(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function truncate(text, length) {
    return text && text.length > length ? text.slice(0, length).replace(/\s+\S*$/, "") + "..." : (text || "");
  }

  function updateCounts() {
    document.querySelectorAll("[data-last-updated]").forEach(function (node) {
      const modified = new Date(document.lastModified);
      node.textContent = lang === "ja"
        ? `${modified.getFullYear()}年${String(modified.getMonth() + 1).padStart(2, "0")}月${String(modified.getDate()).padStart(2, "0")}日`
        : modified.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    });
  }

  function getJapanesePublicationSummary(paper) {
    if (paper.summaryJa) return paper.summaryJa;
    if (hasTheme(paper, "gravity")) return "強い重力やブラックホールの近くで，光・粒子・時空の形がどのように振る舞うかを調べた研究です．";
    if (hasTheme(paper, "quantum")) return "真空や粒子が時空の曲がり方や境界条件によってどう変わるかを調べた研究です．";
    if (hasTheme(paper, "fluid")) return "液体の柱や膜，ブラックブレーンの不安定性を共通する数理で捉える研究です．";
    if (hasTheme(paper, "geometry")) return "曲面や高次元の面の形を，平均曲率や安定性という幾何学の言葉で調べた研究です．";
    if (hasTheme(paper, "dimensional")) return "制約条件を含む次元解析を見通しよく扱うための研究です．";
    return "数理物理の問題を，方程式・対称性・安定性の観点から調べた研究です．";
  }

  function renderPublications() {
    document.querySelectorAll("[data-publications]").forEach(function (list) {
      const limit = Number(list.dataset.limit || 0);
      const withSummary = list.dataset.summary === "true";
      const search = document.querySelector("[data-publication-search]");
      const filters = document.querySelectorAll("[data-publication-filter]");
      function render() {
        const active = document.querySelector("[data-publication-filter].is-active");
        const theme = active ? active.dataset.publicationFilter : (list.dataset.theme || "all");
        const query = search ? search.value.trim().toLowerCase() : "";
        let papers = (data.publications || []).filter(themeFilters[theme] || themeFilters.all);
        if (query) papers = papers.filter(function (paper) {
          return [paper.title, (paper.authors || []).join(" "), paper.year, paper.primary, paper.summary].join(" ").toLowerCase().includes(query);
        });
        if (limit > 0) papers = papers.slice(0, limit);
        list.innerHTML = papers.length ? papers.map(function (paper) {
          const cats = (paper.categories || []).slice(0, 3).map(function (cat) { return `<span class="tag">${escapeHTML(cat)}</span>`; }).join("");
          const summary = lang === "ja" ? getJapanesePublicationSummary(paper) : truncate(paper.summary, 360);
          return `<article class="paper-card">
            <div class="paper-meta"><span>${escapeHTML(paper.year)}</span><span>${escapeHTML((paper.authors || []).join(", "))}</span><a href="${escapeHTML(paper.url)}">${labels[lang].arxiv}:${escapeHTML(paper.id)}</a></div>
            <h3><a href="${escapeHTML(paper.url)}">${escapeHTML(paper.title)}</a></h3>
            ${withSummary ? `<p class="paper-summary">${escapeHTML(summary)}</p>` : ""}
            <div class="tag-row">${cats}</div>
          </article>`;
        }).join("") : `<div class="no-results">${labels[lang].noPapers}</div>`;
      }
      filters.forEach(function (button) {
        button.addEventListener("click", function () {
          filters.forEach(function (node) { node.classList.remove("is-active"); });
          button.classList.add("is-active");
          render();
        });
      });
      if (search) search.addEventListener("input", render);
      render();
    });
  }

  function translateNote(note) {
    if (lang === "ja") return note || "";
    let translated = note || "";
    noteTranslations.forEach(function (entry) { translated = translated.split(entry[0]).join(entry[1]); });
    return translated.replace(/\./g, " / ");
  }

  function albumDateKey(item) {
    const parts = String(item.date || "0.0").split(".");
    return Number(parts[0] || 0) * 100 + Number(parts[1] || 0);
  }

  function albumFilenameKey(item) {
    const match = String(item.filename || "").match(/\d+/g);
    return match ? Number(match.join("").slice(0, 12)) : 0;
  }

  function getAlbumTitle(item) {
    const place = lang === "ja" ? (item.titleJa || item.titleEn || "") : (item.titleEn || titleTranslations[item.titleJa] || item.titleJa || "");
    return place && item.date ? (lang === "ja" ? `${place}（${item.date}）` : `${place} (${item.date})`) : place;
  }

  function getAlbumNote(item) {
    if (lang === "ja") return item.noteJa || "";
    return item.noteEn || translateNote(item.noteJa || "");
  }

  function albumPredicate(filter) {
    return function (item) {
      const context = [item.noteJa, item.noteEn, item.titleJa, item.titleEn, item.tags].join(" ");
      const isAkita = /秋田|由利本荘|男鹿|栗駒山|法体|下浜|大曲|鳥海|本荘/.test(context);
      const isJapan = /国内|秋田|東京|千葉|愛知|茨城|富山|青森|岩手|伊豆|山梨|宮古|鳥海/.test(context);
      if (filter === "akita") return isAkita;
      if (filter === "japan") return isJapan;
      if (filter === "overseas") return !isJapan;
      return true;
    };
  }

  function renderAlbum() {
    document.querySelectorAll("[data-album]").forEach(function (grid) {
      const limit = Number(grid.dataset.limit || 0);
      const initialFilter = grid.dataset.filter || "all";
      const filters = document.querySelectorAll("[data-album-filter]");
      function render() {
        const active = document.querySelector("[data-album-filter].is-active");
        const filter = active ? active.dataset.albumFilter : initialFilter;
        let items = featuredAlbumRecords.filter(albumPredicate(filter)).slice().sort(function (a, b) {
          return albumDateKey(b) - albumDateKey(a) || albumFilenameKey(b) - albumFilenameKey(a);
        });
        if (limit > 0) items = items.slice(0, limit);
        grid.innerHTML = items.length ? items.map(function (item) {
          const src = root + item.src;
          const title = getAlbumTitle(item);
          const note = getAlbumNote(item);
          return `<figure class="photo-card"><a href="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="${escapeHTML(title || note)}" loading="lazy"><figcaption>${title ? `<span class="photo-title">${escapeHTML(title)}</span>` : ""}${note ? `<span class="photo-note">${escapeHTML(note)}</span>` : ""}</figcaption></a></figure>`;
        }).join("") : `<div class="no-results">${labels[lang].noPhotos}</div>`;
      }
      filters.forEach(function (button) {
        button.addEventListener("click", function () {
          filters.forEach(function (node) { node.classList.remove("is-active"); });
          button.classList.add("is-active");
          render();
        });
      });
      render();
    });
  }

  function initHeroCanvas() {
    const canvas = document.querySelector("[data-hero-canvas]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, dpr = 1;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(time) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const t = time * 0.001;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#071112");
      gradient.addColorStop(0.42, "#102d2a");
      gradient.addColorStop(0.72, "#1b2933");
      gradient.addColorStop(1, "#301b32");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.68;
      const cy = height * 0.46;
      const maxR = Math.max(width, height) * 0.92;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.1;
      for (let i = 0; i < 26; i += 1) {
        const y = (i / 21) * height;
        ctx.beginPath();
        for (let x = -40; x <= width + 40; x += 14) {
          const dx = x - cx;
          const dy = y - cy;
          const r = Math.sqrt(dx * dx + dy * dy) / maxR;
          const bend = Math.sin(x * 0.014 + t * 1.8 + i * 0.2) * 6 + Math.exp(-r * 5.7) * Math.sin((x + y) * 0.014 + t * 2.8) * 48;
          if (x === -40) ctx.moveTo(x, y + bend);
          else ctx.lineTo(x, y + bend);
        }
        ctx.strokeStyle = `rgba(178, 235, 224, ${0.035 + i * 0.0028})`;
        ctx.stroke();
      }

      for (let i = 0; i < 22; i += 1) {
        const x = (i / 19) * width;
        ctx.beginPath();
        for (let y = -40; y <= height + 40; y += 14) {
          const dx = x - cx;
          const dy = y - cy;
          const r = Math.sqrt(dx * dx + dy * dy) / maxR;
          const bend = Math.cos(y * 0.013 + t * 1.7 + i * 0.18) * 6 + Math.exp(-r * 5.3) * Math.cos((x - y) * 0.015 + t * 2.5) * 42;
          if (y === -40) ctx.moveTo(x + bend, y);
          else ctx.lineTo(x + bend, y);
        }
        ctx.strokeStyle = "rgba(236, 194, 112, 0.07)";
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.16);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 13; i += 1) {
        const radius = 40 + i * 18;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.62, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.lineWidth = i < 3 ? 2.4 : 1.15;
        ctx.strokeStyle = i % 2 === 0 ? `rgba(246, 191, 92, ${0.3 - i * 0.014})` : `rgba(105, 223, 210, ${0.24 - i * 0.011})`;
        ctx.stroke();
      }

      ctx.rotate(0.16);
      ctx.globalCompositeOperation = "source-over";
      const halo = ctx.createRadialGradient(0, 0, 8, 0, 0, 118);
      halo.addColorStop(0, "rgba(0, 0, 0, 0.98)");
      halo.addColorStop(0.45, "rgba(0, 0, 0, 0.86)");
      halo.addColorStop(0.7, "rgba(70, 210, 198, 0.16)");
      halo.addColorStop(1, "rgba(246, 191, 92, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, 118, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 38; i += 1) {
        const a = t * (0.45 + (i % 7) * 0.05) + i * 0.84;
        const radius = 72 + (i % 10) * 20;
        const x = Math.cos(a) * radius * 1.48;
        const y = Math.sin(a) * radius * 0.34;
        ctx.beginPath();
        ctx.fillStyle = i % 4 === 0 ? "rgba(255, 211, 120, 0.95)" : "rgba(137, 238, 226, 0.82)";
        ctx.arc(x, y, i % 4 === 0 ? 2.6 : 1.6, 0, Math.PI * 2);
        ctx.fill();      }
      ctx.restore();

      ctx.save(); ctx.translate(cx, cy);
      for (let i = 0; i < 7; i += 1) { ctx.beginPath(); ctx.ellipse(0, 0, 52 + i * 30, 24 + i * 12, 0.35, 0, Math.PI * 2); ctx.strokeStyle = `rgba(245,242,219,${0.16 - i * 0.012})`; ctx.stroke(); }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        const y = height * (0.22 + i * 0.075);
        ctx.moveTo(width * 0.05, y);
        ctx.bezierCurveTo(width * 0.32, y + Math.sin(t + i) * 40, width * 0.48, cy - 95 + i * 22, cx - 92, cy - 60 + i * 16);
        ctx.bezierCurveTo(cx + 130, cy + 10 + i * 9, width * 0.82, y - 34, width * 1.02, y + Math.cos(t + i) * 22);
        ctx.strokeStyle = i % 2 === 0 ? "rgba(122, 236, 222, 0.22)" : "rgba(246, 191, 92, 0.2)";
        ctx.lineWidth = 1.4 + (i % 3) * 0.55;
        ctx.stroke();
      }
      ctx.restore();

      ctx.font = "17px Georgia, serif";
      ctx.fillStyle = "rgba(232, 244, 237, 0.43)";
      ctx.fillText("Gμν + Λgμν = 8πGTμν", Math.max(24, width * 0.07), Math.max(70, height * 0.17));
      ctx.fillText("⟨Tμν⟩ren", Math.max(24, width * 0.12), Math.max(122, height * 0.27));
      ctx.fillText("H = const.", Math.max(24, width * 0.2), Math.max(174, height * 0.37));

      if (!prefersReduced) window.requestAnimationFrame(draw);    }
    resize(); window.addEventListener("resize", resize); draw(0);
  }

  function initPageCanvas() {
    const hero = document.querySelector(".page-hero");
    if (!hero || hero.querySelector("canvas")) return;
    const canvas = document.createElement("canvas");
    canvas.className = "page-canvas"; canvas.setAttribute("aria-hidden", "true"); hero.prepend(canvas);
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const page = location.pathname.split("/").pop() || "index.html";
    const mode = page.replace(".html", "") || "index";
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const palettes = {
      access: ["#55b3a6", "#e1ba62", "#c97950"],
      album: ["#2d7f87", "#d9804a", "#f3d07a"],
      career: ["#86a35d", "#c86f46", "#51a89d"],
      education: ["#75b58b", "#efbc63", "#d68462"],
      funding: ["#6f93bd", "#d4aa45", "#8ca25e"],
      links: ["#9b7bc1", "#4fb3a8", "#e18b63"],
      publications: ["#4db3a8", "#c7a045", "#8f75b5"],
      research: ["#5bb7a9", "#ef9d5c", "#d9c46c"]
    };

    function palette() {
      return palettes[mode] || ["#4db3a8", "#c7a045", "#8f75b5"];
    }

    function drawBase(colors) {
      ctx.clearRect(0, 0, width, height);
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#101819");
      g.addColorStop(0.48, "#172927");
      g.addColorStop(1, "#241f27");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (let i = 0; i < 18; i += 1) {
        const y = (i / 17) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(i) * 4);
        ctx.strokeStyle = `rgba(236, 224, 178, ${0.018 + i * 0.0018})`;
        ctx.stroke();
      }
      for (let i = 0; i < colors.length; i += 1) {
        const x = width * (0.64 + i * 0.12);
        const y = height * (0.18 + i * 0.24);
        const grd = ctx.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.34);
        grd.addColorStop(0, hexToRgba(colors[i], 0.16));
        grd.addColorStop(1, hexToRgba(colors[i], 0));
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function drawResearch(t, colors) {
      const centerY = height * 0.56;
      const startX = width * 0.35;
      const endX = width * 0.95;
      const length = Math.max(1, endX - startX);
      ctx.save();
      ctx.translate(0, Math.sin(t * 0.7) * 3);
      ctx.fillStyle = hexToRgba(colors[0], 0.22);
      ctx.strokeStyle = hexToRgba(colors[1], 0.55);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= 90; i += 1) {
        const u = i / 90;
        const x = startX + u * length;
        const r = 34 + 18 * Math.sin(u * Math.PI * 4 + t * 1.6) + 7 * Math.sin(u * Math.PI * 9 - t);
        const y = centerY - r * 0.62;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = 90; i >= 0; i -= 1) {
        const u = i / 90;
        const x = startX + u * length;
        const r = 34 + 18 * Math.sin(u * Math.PI * 4 + t * 1.6) + 7 * Math.sin(u * Math.PI * 9 - t);
        ctx.lineTo(x, centerY + r * 0.62);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < 18; i += 1) {
        const u = i / 17;
        const x = startX + u * length;
        const r = 34 + 18 * Math.sin(u * Math.PI * 4 + t * 1.6) + 7 * Math.sin(u * Math.PI * 9 - t);
        ctx.beginPath();
        ctx.ellipse(x, centerY, r * 0.23, r * 0.62, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.34);
        ctx.stroke();
      }
      ctx.font = "16px Georgia, serif";
      ctx.fillStyle = "rgba(244, 238, 210, 0.48)";
      ctx.fillText("H = const.", width * 0.1, height * 0.28);
      ctx.fillText("∂tX = -ΔsH", width * 0.14, height * 0.42);
      ctx.restore();
    }

    function drawPublications(t, colors) {
      const cx = width * 0.74;
      const cy = height * 0.5;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(6, 9, 11, 0.76)";
      ctx.beginPath();
      ctx.arc(0, 0, 54, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        ctx.ellipse(0, 0, 78 + i * 18, 34 + i * 7, 0.38 + i * 0.03 + t * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.2);
        ctx.stroke();
      }
      for (let i = 0; i < 34; i += 1) {
        const a = t * (0.5 + (i % 4) * 0.09) + i * 0.68;
        const r = 74 + (i % 9) * 18;
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.72);
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r, Math.sin(a) * r * 0.42, 1.5 + (i % 3) * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.font = "13px Georgia, serif";
      ctx.fillStyle = "rgba(237, 244, 239, 0.44)";
      const rows = ["arXiv:2411", "arXiv:2306", "gr-qc", "hep-th", "math-ph"];
      rows.forEach(function (text, i) {
        const x = width * 0.09 + Math.sin(t + i) * 12;
        const y = height * (0.24 + i * 0.11);
        ctx.fillText(text, x, y);
      });
    }

    function drawCareer(t, colors) {
      const cx = width * 0.72;
      const cy = height * 0.5;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let layer = 0; layer < 10; layer += 1) {
        ctx.beginPath();
        const base = 42 + layer * 12;
        for (let i = 0; i <= 180; i += 1) {
          const a = (i / 180) * Math.PI * 2;
          const pulse = Math.sin(a * 3 + t * 0.9 + layer) * 6 + Math.cos(a * 5 - t * 0.6) * 3;
          const x = cx + Math.cos(a) * (base + pulse) * (0.86 + layer * 0.018);
          const y = cy + Math.sin(a) * (base + pulse) * 1.14;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = hexToRgba(colors[layer % colors.length], 0.11 + layer * 0.015);
        ctx.lineWidth = layer % 3 === 0 ? 1.7 : 1;
        ctx.stroke();
      }

      const bands = ["Waseda", "Jerusalem", "Rikkyo", "Akita"];
      ctx.font = "13px Georgia, serif";
      bands.forEach(function (label, i) {
        const y = height * (0.2 + i * 0.1);
        const start = width * 0.4;
        const w = width * (0.18 + i * 0.035);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.34);
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(start, y);
        ctx.lineTo(start + w + Math.sin(t + i) * 16, y + Math.cos(t * 0.8 + i) * 12);
        ctx.stroke();
        ctx.fillStyle = "rgba(238, 244, 231, 0.46)";
        ctx.fillText(label, start + 8, y - 8);
      });

      ["PSJ", "JGRG", "JSIAM"].forEach(function (label, i) {
        const a = t * 0.35 + i * 2.1;
        const x = cx + Math.cos(a) * 112;
        const y = cy + Math.sin(a) * 74;
        ctx.strokeStyle = hexToRgba(colors[i], 0.48);
        ctx.fillStyle = "rgba(239, 245, 235, 0.62)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(x, y, 28, 14, a * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(label, x - 16, y + 4);
      });
      ctx.restore();
    }

    function drawEducation(t, colors) {
      ctx.strokeStyle = hexToRgba(colors[0], 0.22);
      ctx.lineWidth = 1;
      for (let x = width * 0.08; x < width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.16);
        ctx.lineTo(x + Math.sin(t + x) * 8, height * 0.84);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(239, 245, 229, 0.52)";
      ctx.strokeStyle = "rgba(239, 245, 229, 0.42)";
      ctx.lineWidth = 1.1;

      function mathFont(size, italic) {
        return `${italic ? "italic " : ""}${size}px "STIX Two Math", "Cambria Math", "Times New Roman", Georgia, serif`;
      }

      function textRun(text, x, y, size, italic) {
        ctx.font = mathFont(size, italic);
        ctx.fillText(text, x, y);
        return x + ctx.measureText(text).width;
      }

      function subscript(text, x, y) {
        return textRun(text, x, y + 5, 10, true);
      }

      function superscript(text, x, y) {
        return textRun(text, x, y - 10, 10, false);
      }

      function drawFraction(num, den, x, y) {
        ctx.font = mathFont(15, false);
        const w = Math.max(ctx.measureText(num).width, ctx.measureText(den).width) + 12;
        ctx.fillText(num, x + (w - ctx.measureText(num).width) / 2, y - 9);
        ctx.beginPath();
        ctx.moveTo(x, y - 2);
        ctx.lineTo(x + w, y - 2);
        ctx.stroke();
        ctx.fillText(den, x + (w - ctx.measureText(den).width) / 2, y + 15);
        return x + w;
      }

      const formulas = [
        function (x, y) {
          let p = drawFraction("d", "dx", x, y);
          p = textRun(" ∫", p + 5, y + 1, 25, false);
          p = textRun(" f", p + 2, y, 17, true);
          p = textRun("(x) dx = f", p + 1, y, 17, false);
          textRun("(x)", p + 1, y, 17, false);
        },
        function (x, y) {
          let p = textRun("R", x, y, 18, true);
          p = superscript("n", p, y);
          p = textRun(" = N", p + 6, y, 18, false);
          p = textRun("(A) ⊕ R", p + 2, y, 18, false);
          p = textRun("(A", p + 2, y, 18, false);
          p = superscript("T", p, y);
          textRun(")", p, y, 18, false);
        },
        function (x, y) {
          let p = textRun("G", x, y, 18, true);
          p = subscript("μν", p, y);
          p = textRun(" + Λg", p + 6, y, 18, false);
          p = subscript("μν", p, y);
          p = textRun(" = 8πGT", p + 6, y, 18, false);
          subscript("μν", p, y);
        },
        function (x, y) {
          let p = textRun("iℏ", x, y, 18, false);
          p = textRun("∂", p + 3, y, 18, false);
          p = subscript("t", p, y);
          p = textRun("ψ = Hψ", p + 5, y, 18, true);
        },
        function (x, y) {
          let p = textRun("∂", x, y, 18, false);
          p = subscript("t", p, y);
          p = textRun("v + (v · ∇)v = −∇p", p + 4, y, 18, true);
        }
      ];

      formulas.forEach(function (draw, i) {
        const x = width * (0.1 + (i % 2) * 0.21) + Math.sin(t * 0.7 + i) * 10;
        const y = height * (0.22 + i * 0.1);
        draw(x, y);
      });
      for (let i = 0; i < 24; i += 1) {
        const a = t * 0.9 + i;
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.48);
        ctx.fillRect(width * 0.72 + Math.cos(a) * 92, height * 0.48 + Math.sin(a * 1.7) * 86, 4, 4);
      }
    }

    function drawFunding(t, colors) {
      const base = height * 0.76;
      for (let i = 0; i < 7; i += 1) {
        const x = width * (0.42 + i * 0.065);
        const h = height * (0.18 + 0.06 * ((i + 2) % 4)) + Math.sin(t * 1.3 + i) * 10;
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.62);
        ctx.fillRect(x, base - h, width * 0.038, h);
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.strokeRect(x, base - h, width * 0.038, h);
      }
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        const y = height * (0.24 + i * 0.085);
        ctx.moveTo(width * 0.09, y);
        ctx.bezierCurveTo(width * 0.28, y + Math.sin(t + i) * 22, width * 0.43, base - i * 24, width * 0.56, base - i * 22);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.36);
        ctx.lineWidth = 7 - i * 0.7;
        ctx.stroke();
      }
      ctx.lineWidth = 1;
    }

    function drawAccess(t, colors) {
      ctx.save();
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 8; ring += 1) {
        ctx.beginPath();
        const cx = width * (0.62 + 0.03 * Math.sin(ring));
        const cy = height * (0.52 + 0.025 * Math.cos(ring * 1.7));
        const rx = width * (0.18 + ring * 0.025);
        const ry = height * (0.12 + ring * 0.018);
        for (let i = 0; i <= 160; i += 1) {
          const a = (i / 160) * Math.PI * 2;
          const ripple = 1 + 0.05 * Math.sin(a * 5 + t + ring);
          const x = cx + Math.cos(a) * rx * ripple;
          const y = cy + Math.sin(a) * ry * ripple;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexToRgba(colors[0], 0.06 + ring * 0.018);
        ctx.stroke();
      }

      const rail = [
        [0.12, 0.74],
        [0.28, 0.62],
        [0.44, 0.67],
        [0.57, 0.5],
        [0.76, 0.38],
        [0.9, 0.31]
      ].map(function (p) { return [p[0] * width, p[1] * height]; });
      const bus = [
        [0.18, 0.3],
        [0.36, 0.37],
        [0.51, 0.33],
        [0.69, 0.46],
        [0.85, 0.58]
      ].map(function (p) { return [p[0] * width, p[1] * height]; });

      function route(points, color, phase, dashed) {
        ctx.beginPath();
        points.forEach(function (p, i) {
          if (i === 0) ctx.moveTo(p[0], p[1]);
          else ctx.lineTo(p[0], p[1]);
        });
        ctx.setLineDash(dashed ? [10, 10] : []);
        ctx.lineDashOffset = -phase * 20;
        ctx.lineWidth = dashed ? 2.4 : 4.6;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      route(rail, hexToRgba(colors[1], 0.66), t, false);
      route(bus, hexToRgba(colors[2], 0.54), t * 0.7, true);

      [rail, bus].forEach(function (points, routeIndex) {
        points.forEach(function (p, i) {
          ctx.fillStyle = routeIndex === 0 ? hexToRgba(colors[1], 0.82) : hexToRgba(colors[2], 0.72);
          ctx.strokeStyle = "rgba(255,255,255,0.28)";
          ctx.beginPath();
          ctx.rect(p[0] - 4, p[1] - 4, 8, 8);
          ctx.fill();
          ctx.stroke();
          if (i === points.length - 1) {
            ctx.font = "12px Georgia, serif";
            ctx.fillStyle = "rgba(241,246,235,0.48)";
            ctx.fillText(routeIndex === 0 ? "Honjo" : "Campus", p[0] - 18, p[1] - 12);
          }
        });
      });
      ctx.restore();
    }

    function drawLinks(t, colors) {
      const cx = width * 0.7;
      const cy = height * 0.5;
      const labels = ["ORCID", "arXiv", "KAKEN", "Scholar", "APU", "JGRG"];
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < labels.length; i += 1) {
        const a = t * 0.22 + i * ((Math.PI * 2) / labels.length);
        const x = cx + Math.cos(a) * width * 0.2;
        const y = cy + Math.sin(a) * height * 0.28;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx + Math.cos(a - 0.8) * 70, cy + Math.sin(a - 0.8) * 44, x - Math.cos(a) * 42, y - Math.sin(a) * 24, x, y);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.22);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(t + i) * 0.08);
        ctx.fillStyle = "rgba(245,248,241,0.09)";
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.42);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(-34, -17, 68, 34);
        ctx.fill();
        ctx.stroke();
        ctx.font = "12px Georgia, serif";
        ctx.fillStyle = "rgba(239,245,239,0.62)";
        ctx.fillText(labels[i], -26, 4);
        ctx.restore();
      }

      for (let ring = 0; ring < 4; ring += 1) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 42 + ring * 28, 20 + ring * 15, t * 0.18 + ring * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(colors[ring % colors.length], 0.12);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawAlbum(t, colors) {
      const top = height * 0.24;
      const frameW = width * 0.16;
      for (let i = 0; i < 7; i += 1) {
        const x = width * 0.22 + i * frameW * 0.72 - (t * 28 % (frameW * 0.72));
        ctx.fillStyle = "rgba(247,250,247,0.12)";
        ctx.fillRect(x, top, frameW * 0.58, height * 0.38);
        ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.48);
        ctx.strokeRect(x, top, frameW * 0.58, height * 0.38);
      }
      ctx.save();
      ctx.translate(width * 0.75, height * 0.47);
      for (let i = 0; i < 7; i += 1) {
        ctx.rotate((Math.PI * 2) / 7);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 82, 0.18 + Math.sin(t + i) * 0.04, 0.72);
        ctx.closePath();
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.18);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawDefault(t, colors) {
      for (let i = 0; i < 22; i += 1) {
        const a = t * (0.8 + (i % 5) * 0.1) + i * 0.73;
        const r = 56 + (i % 7) * 28;
        const cx = width * (0.72 + 0.08 * Math.sin(t + i));
        const cy = height * (0.48 + 0.12 * Math.cos(t * 0.9 + i));
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.65);
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.52, 1.8 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function draw(time) {
      const t = time * 0.001;
      const colors = palette();
      drawBase(colors);
      const drawers = {
        access: drawAccess,
        album: drawAlbum,
        career: drawCareer,
        education: drawEducation,
        funding: drawFunding,
        links: drawLinks,
        publications: drawPublications,
        research: drawResearch
      };
      (drawers[mode] || drawDefault)(t, colors);
      if (!prefersReduced) window.requestAnimationFrame(draw);
    }

    function hexToRgba(hex, alpha) {
      const value = hex.replace("#", "");
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    resize();
    window.addEventListener("resize", resize);
    draw(0);
    if (!prefersReduced) window.requestAnimationFrame(draw);  }

  updateCounts();
  renderPublications();
  renderAlbum();
  initHeroCanvas();
  initPageCanvas();
}());
