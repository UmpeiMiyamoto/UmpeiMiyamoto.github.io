(function () {
  const html = document.documentElement;
  const root = html.dataset.root || "";
  const lang = html.lang && html.lang.startsWith("ja") ? "ja" : "en";
  const data = window.SITE_DATA || { publications: [], album: [] };

  const labels = {
    ja: {
      noPapers: "該当する論文はありません。",
      noPhotos: "該当する写真はありません。",
      abstract: "概要",
      arxiv: "arXiv",
      all: "すべて",
      countPapers: "件",
      countPhotos: "枚"
    },
    en: {
      noPapers: "No publications match this view.",
      noPhotos: "No photographs match this view.",
      abstract: "Abstract",
      arxiv: "arXiv",
      all: "All",
      countPapers: "papers",
      countPhotos: "photos"
    }
  };

  const titleTranslations = {
    "アマゾンの夕焼け": "Sunset over the Amazon",
    "野生のカピバラ": "Wild capybara",
    "アマゾンの滝": "Waterfalls in the Amazon",
    "毒蛇研究所": "Venomous snake institute",
    "ストーンヘンジ": "Stonehenge",
    "ケンブリッジ大学": "University of Cambridge",
    "ニュートンのリンゴの木": "Newton's apple tree",
    "ケンブリッジ大学の橋": "A bridge at Cambridge",
    "嘆きの壁と岩のドーム": "Western Wall and Dome of the Rock",
    "十字軍の落書き": "Crusader graffiti",
    "ダビデの塔": "Tower of David",
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
    "男鹿": "Oga",
    "大曲の花火": "Omagari fireworks",
    "菜の花祭り": "Nanohana festival",
    "黒部ダム": "Kurobe Dam",
    "路面電車": "Tram"
  };

  const noteTranslations = [
    ["ブラジル", "Brazil"],
    ["英国", "United Kingdom"],
    ["イスラエル", "Israel"],
    ["パレスチナ自治区", "Palestinian Territories"],
    ["エジプト", "Egypt"],
    ["ヨルダン", "Jordan"],
    ["カナダ", "Canada"],
    ["スペイン", "Spain"],
    ["イタリア", "Italy"],
    ["ギリシャ", "Greece"],
    ["グアム", "Guam"],
    ["東日本大震災前夜", "on the eve of the Great East Japan Earthquake"],
    ["アルゼンチン", "Argentina"],
    ["チリ", "Chile"],
    ["ポルトガル", "Portugal"],
    ["秋田", "Akita"],
    ["東京", "Tokyo"],
    ["千葉", "Chiba"],
    ["青森", "Aomori"],
    ["愛知", "Aichi"],
    ["茨城", "Ibaraki"],
    ["富山", "Toyama"],
    ["「ケム川の橋」という意味", "\"bridge over the River Cam\""]
  ];

  const featuredAlbumRecords = [
    { filename: "photo-044.jpg", src: "assets/album/field/photo-044.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "海辺の食卓", noteEn: "seaside table", tags: "ギリシャ 海外 料理" },
    { filename: "photo-045.jpg", src: "assets/album/field/photo-045.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "料理", noteEn: "food", tags: "ギリシャ 海外 料理" },
    { filename: "photo-043.jpg", src: "assets/album/field/photo-043.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "エーゲ海", noteEn: "Aegean Sea", tags: "ギリシャ 海外 海" },
    { filename: "photo-042.jpg", src: "assets/album/field/photo-042.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "海岸", noteEn: "coast", tags: "ギリシャ 海外 海" },
    { filename: "photo-041.jpg", src: "assets/album/field/photo-041.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "入り江", noteEn: "cove", tags: "ギリシャ 海外 海" },
    { filename: "photo-037.jpg", src: "assets/album/field/photo-037.jpg", titleJa: "アテネ", titleEn: "Athens", date: "2024.09", noteJa: "街並み", noteEn: "streets", tags: "ギリシャ アテネ 海外 街" },
    { filename: "photo-034.jpg", src: "assets/album/field/photo-034.jpg", titleJa: "アテネ", titleEn: "Athens", date: "2024.09", noteJa: "路面電車", noteEn: "tram", tags: "ギリシャ アテネ 海外 街" },
    { filename: "photo-038.jpg", src: "assets/album/field/photo-038.jpg", titleJa: "ギリシャ", titleEn: "Greece", date: "2024.09", noteJa: "海辺", noteEn: "seaside", tags: "ギリシャ 海外 海" },
    { filename: "photo-001.jpg", src: "assets/album/field/photo-001.jpg", titleJa: "テレビ出演", titleEn: "TV appearance", date: "2023.09", noteJa: "解説", noteEn: "commentary", tags: "テレビ 出演 国内 研究" },
    { filename: "photo-013.jpg", src: "assets/album/field/photo-013.jpg", titleJa: "テレビ出演", titleEn: "TV appearance", date: "2023.09", noteJa: "番組画面", noteEn: "program screen", tags: "テレビ 出演 国内 研究" },
    { filename: "photo-111.jpg", src: "assets/album/field/photo-111.jpg", titleJa: "テレビ出演", titleEn: "TV appearance", date: "2023.04", noteJa: "番組画面", noteEn: "program screen", tags: "テレビ 出演 国内 研究" },
    { filename: "photo-113.jpg", src: "assets/album/field/photo-113.jpg", titleJa: "テレビ出演", titleEn: "TV appearance", date: "2023.04", noteJa: "番組画面", noteEn: "program screen", tags: "テレビ 出演 国内 研究" },
    { filename: "photo-070.jpg", src: "assets/album/field/photo-070.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "研究会", noteEn: "workshop", tags: "イタリア トリエステ 海外 研究" },
    { filename: "photo-067.jpg", src: "assets/album/field/photo-067.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "広場", noteEn: "piazza", tags: "イタリア トリエステ 海外 街" },
    { filename: "photo-068.jpg", src: "assets/album/field/photo-068.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "建築", noteEn: "architecture", tags: "イタリア トリエステ 海外 建築" },
    { filename: "photo-069.jpg", src: "assets/album/field/photo-069.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "広場", noteEn: "piazza", tags: "イタリア トリエステ 海外 街" },
    { filename: "photo-064.jpg", src: "assets/album/field/photo-064.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "カフェ", noteEn: "cafe", tags: "イタリア トリエステ 海外 料理" },
    { filename: "photo-063.jpg", src: "assets/album/field/photo-063.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "パスタ", noteEn: "pasta", tags: "イタリア トリエステ 海外 料理" },
    { filename: "photo-075.jpg", src: "assets/album/field/photo-075.jpg", titleJa: "トリエステ", titleEn: "Trieste", date: "2023.09", noteJa: "朝食", noteEn: "breakfast", tags: "イタリア トリエステ 海外 料理" },
    { filename: "photo-066.jpg", src: "assets/album/field/photo-066.jpg", titleJa: "イタリア", titleEn: "Italy", date: "2023.09", noteJa: "街並み", noteEn: "city view", tags: "イタリア 海外 街" },
    { filename: "photo-010.jpg", src: "assets/album/field/photo-010.jpg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "運河", noteEn: "canal", tags: "イタリア ベネチア 海外 街" },
    { filename: "photo-011.jpg", src: "assets/album/field/photo-011.jpg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "街角", noteEn: "street corner", tags: "イタリア ベネチア 海外 街" },
    { filename: "photo-012.jpg", src: "assets/album/field/photo-012.jpg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "ゴンドラ", noteEn: "gondola", tags: "イタリア ベネチア 海外 街" },
    { filename: "photo-004.jpg", src: "assets/album/field/photo-004.jpg", titleJa: "イタリア", titleEn: "Italy", date: "2023.09", noteJa: "港", noteEn: "harbor", tags: "イタリア 海外 街" },
    { filename: "photo-007.jpg", src: "assets/album/field/photo-007.jpg", titleJa: "イタリア", titleEn: "Italy", date: "2023.09", noteJa: "食事", noteEn: "meal", tags: "イタリア 海外 料理" },
    { filename: "photo-060.jpg", src: "assets/album/field/photo-060.jpg", titleJa: "イタリア", titleEn: "Italy", date: "2023.09", noteJa: "朝食", noteEn: "breakfast", tags: "イタリア 海外 料理" },
    { filename: "photo-077.jpg", src: "assets/album/field/photo-077.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2023.08", noteJa: "路地", noteEn: "back street", tags: "イタリア ローマ 海外 街" },
    { filename: "photo-081.jpg", src: "assets/album/field/photo-081.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2023.08", noteJa: "食事", noteEn: "meal", tags: "イタリア ローマ 海外 料理" },
    { filename: "photo-082.jpg", src: "assets/album/field/photo-082.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2023.08", noteJa: "軽食", noteEn: "snack", tags: "イタリア ローマ 海外 料理" },
    { filename: "photo-085.jpg", src: "assets/album/field/photo-085.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2023.08", noteJa: "市場", noteEn: "market", tags: "イタリア ローマ 海外 料理" },
    { filename: "photo-133.jpg", src: "assets/album/field/photo-133.jpg", titleJa: "神戸", titleEn: "Kobe", date: "2023.08", noteJa: "食事", noteEn: "meal", tags: "神戸 国内 料理" },
    { filename: "photo-135.jpg", src: "assets/album/field/photo-135.jpg", titleJa: "神戸", titleEn: "Kobe", date: "2023.08", noteJa: "夜景", noteEn: "night view", tags: "神戸 国内 街" },
    { filename: "photo-136.jpg", src: "assets/album/field/photo-136.jpg", titleJa: "神戸", titleEn: "Kobe", date: "2023.08", noteJa: "滞在", noteEn: "stay", tags: "神戸 国内 街" },
    { filename: "photo-089.jpg", src: "assets/album/field/photo-089.jpg", titleJa: "秋田", titleEn: "Akita", date: "2023.04", noteJa: "海の幸", noteEn: "seafood", tags: "秋田 国内 料理" },
    { filename: "photo-087.jpg", src: "assets/album/field/photo-087.jpg", titleJa: "秋田", titleEn: "Akita", date: "2023.04", noteJa: "海鮮丼", noteEn: "seafood bowl", tags: "秋田 国内 料理" },
    { filename: "photo-118.jpg", src: "assets/album/field/photo-118.jpg", titleJa: "秋田", titleEn: "Akita", date: "2023.04", noteJa: "水辺", noteEn: "waterside", tags: "秋田 国内 風景" },
    { filename: "photo-127.jpg", src: "assets/album/field/photo-127.jpg", titleJa: "秋田", titleEn: "Akita", date: "2022.10", noteJa: "天ぷら", noteEn: "tempura", tags: "秋田 国内 料理" },
    { filename: "photo-106.jpg", src: "assets/album/field/photo-106.jpg", titleJa: "秋田", titleEn: "Akita", date: "2021.08", noteJa: "食事", noteEn: "meal", tags: "秋田 国内 料理" },
    { filename: "photo-033.jpg", src: "assets/album/field/photo-033.jpg", titleJa: "秋田", titleEn: "Akita", date: "2022.07", noteJa: "菜の花", noteEn: "rapeseed flowers", tags: "秋田 国内 風景" },
    { filename: "201609a.jpg", src: "assets/album/images/201609a.jpg", titleJa: "ポルトガル", titleEn: "Portugal", date: "2016.09", noteJa: "路面電車", noteEn: "tram", tags: "ポルトガル 海外 街" },
    { filename: "201609b.jpg", src: "assets/album/images/201609b.jpg", titleJa: "ポルトガル", titleEn: "Portugal", date: "2016.09", noteJa: "路面電車", noteEn: "tram", tags: "ポルトガル 海外 街" },
    { filename: "201608.jpg", src: "assets/album/images/201608.jpg", titleJa: "富山", titleEn: "Toyama", date: "2016.08", noteJa: "黒部ダム", noteEn: "Kurobe Dam", tags: "富山 国内 風景" },
    { filename: "201605.jpg", src: "assets/album/images/201605.jpg", titleJa: "秋田", titleEn: "Akita", date: "2016.05", noteJa: "菜の花", noteEn: "rapeseed flowers", tags: "秋田 国内 風景" },
    { filename: "201410b.jpg", src: "assets/album/images/201410b.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.10", noteJa: "月食", noteEn: "lunar eclipse", tags: "秋田 国内 風景" },
    { filename: "201408c.jpg", src: "assets/album/images/201408c.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.08", noteJa: "花火", noteEn: "fireworks", tags: "秋田 国内 風景" },
    { filename: "201408a.jpg", src: "assets/album/images/201408a.jpg", titleJa: "秋田", titleEn: "Akita", date: "2014.08", noteJa: "男鹿", noteEn: "Oga", tags: "秋田 国内 風景" },
    { filename: "201402g.jpg", src: "assets/album/images/201402g.jpg", titleJa: "愛知", titleEn: "Aichi", date: "2014.02", noteJa: "名古屋城", noteEn: "Nagoya Castle", tags: "愛知 国内 建築" },
    { filename: "201311e.jpg", src: "assets/album/images/201311e.jpg", titleJa: "青森", titleEn: "Aomori", date: "2013.11", noteJa: "弘前城", noteEn: "Hirosaki Castle", tags: "青森 国内 建築" },
    { filename: "201311a.jpg", src: "assets/album/images/201311a.jpg", titleJa: "秋田", titleEn: "Akita", date: "2013.11", noteJa: "小安峡", noteEn: "Oyasukyo Gorge", tags: "秋田 国内 自然" },
    { filename: "201306d.jpg", src: "assets/album/images/201306d.jpg", titleJa: "チリ", titleEn: "Chile", date: "2013.06", noteJa: "バルディビア", noteEn: "Valdivia", tags: "チリ 海外 街" },
    { filename: "201308a.jpg", src: "assets/album/images/201308a.jpg", titleJa: "チリ", titleEn: "Chile", date: "2013.08", noteJa: "バルディビア", noteEn: "Valdivia", tags: "チリ 海外 街" },
    { filename: "201308d.jpg", src: "assets/album/images/201308d.jpg", titleJa: "チリ", titleEn: "Chile", date: "2013.08", noteJa: "夕景", noteEn: "evening sky", tags: "チリ 海外 街" },
    { filename: "201103b.jpg", src: "assets/album/images/201103b.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "トーレス・デル・パイネ", noteEn: "Torres del Paine", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201103c.jpg", src: "assets/album/images/201103c.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "山並み", noteEn: "mountains", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201103d.jpg", src: "assets/album/images/201103d.jpg", titleJa: "パタゴニア", titleEn: "Patagonia", date: "2011.03", noteJa: "氷河", noteEn: "glacier", tags: "アルゼンチン チリ 海外 自然" },
    { filename: "201009b.jpg", src: "assets/album/images/201009b.jpg", titleJa: "スペイン", titleEn: "Spain", date: "2010.09", noteJa: "エルチェ", noteEn: "Elche", tags: "スペイン 海外 街" },
    { filename: "200908a.jpg", src: "assets/album/images/200908a.jpg", titleJa: "イスラエル", titleEn: "Israel", date: "2009.08", noteJa: "アインシュタイン博物館", noteEn: "Einstein Museum", tags: "イスラエル 海外 博物館" },
    { filename: "200907b.jpg", src: "assets/album/images/200907b.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.07", noteJa: "市場", noteEn: "market", tags: "イスラエル 海外 料理" },
    { filename: "200907c.jpg", src: "assets/album/images/200907c.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.07", noteJa: "市場", noteEn: "market", tags: "イスラエル 海外 料理" },
    { filename: "200903a.jpg", src: "assets/album/images/200903a.jpg", titleJa: "ヨルダン", titleEn: "Jordan", date: "2009.03", noteJa: "ペトラ", noteEn: "Petra", tags: "ヨルダン 海外 遺跡" },
    { filename: "200903b.jpg", src: "assets/album/images/200903b.jpg", titleJa: "ヨルダン", titleEn: "Jordan", date: "2009.03", noteJa: "ワディラム", noteEn: "Wadi Rum", tags: "ヨルダン 海外 遺跡" },
    { filename: "200903e.jpg", src: "assets/album/images/200903e.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2009.03", noteJa: "岩のドーム", noteEn: "Dome of the Rock", tags: "イスラエル 海外 遺跡" },
    { filename: "200807.jpg", src: "assets/album/images/200807.jpg", titleJa: "イスラエル", titleEn: "Israel", date: "2008.07", noteJa: "食事", noteEn: "meal", tags: "イスラエル 海外 料理" },
    { filename: "200804b.jpg", src: "assets/album/images/200804b.jpg", titleJa: "エジプト", titleEn: "Egypt", date: "2008.04", noteJa: "ピラミッド", noteEn: "pyramids", tags: "エジプト 海外 遺跡" },
    { filename: "200804d.jpg", src: "assets/album/images/200804d.jpg", titleJa: "エジプト", titleEn: "Egypt", date: "2008.04", noteJa: "ギザ", noteEn: "Giza", tags: "エジプト 海外 遺跡" },
    { filename: "200803b.jpg", src: "assets/album/images/200803b.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2008.03", noteJa: "市場", noteEn: "market", tags: "イスラエル 海外 料理" },
    { filename: "200803c.jpg", src: "assets/album/images/200803c.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2008.03", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル 海外 街" },
    { filename: "200702.jpg", src: "assets/album/images/200702.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2007.02", noteJa: "旧市街", noteEn: "Old City", tags: "イスラエル 海外 遺跡" },
    { filename: "200710.jpg", src: "assets/album/images/200710.jpg", titleJa: "エルサレム", titleEn: "Jerusalem", date: "2007.10", noteJa: "十字軍の落書き", noteEn: "Crusader graffiti", tags: "イスラエル 海外 遺跡" },
    { filename: "200407a.jpg", src: "assets/album/images/200407a.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ストーンヘンジ", noteEn: "Stonehenge", tags: "英国 海外 遺跡" },
    { filename: "200407b.jpg", src: "assets/album/images/200407b.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ケンブリッジ", noteEn: "Cambridge", tags: "英国 海外 大学" },
    { filename: "200407d.jpg", src: "assets/album/images/200407d.jpg", titleJa: "英国", titleEn: "United Kingdom", date: "2004.07", noteJa: "ケンブリッジ", noteEn: "Cambridge", tags: "英国 海外 大学" },
    { filename: "200307a.jpg", src: "assets/album/images/200307a.jpg", titleJa: "ブラジル", titleEn: "Brazil", date: "2003.07", noteJa: "アマゾン", noteEn: "Amazon", tags: "ブラジル 海外 自然" },
    { filename: "200307c.jpg", src: "assets/album/images/200307c.jpg", titleJa: "ブラジル", titleEn: "Brazil", date: "2003.07", noteJa: "滝", noteEn: "waterfall", tags: "ブラジル 海外 自然" },
    { filename: "200307f.jpg", src: "assets/album/images/200307f.jpg", titleJa: "ブラジル", titleEn: "Brazil", date: "2003.07", noteJa: "研究施設", noteEn: "research institute", tags: "ブラジル 海外 研究" }
  ];

  const themeFilters = {
    all: function () { return true; },
    gravity: function (paper) { return hasTheme(paper, "gravity"); },
    quantum: function (paper) { return hasTheme(paper, "quantum"); },
    fluid: function (paper) { return hasTheme(paper, "fluid"); },
    geometry: function (paper) { return hasTheme(paper, "geometry"); },
    dimensional: function (paper) { return hasTheme(paper, "dimensional"); }
  };

  const themeMatchers = {
    gravity: /gr-qc|black hole|spacetime|relativ|gravity|gravitational|kerr|schwarzschild|penrose|pulsar|neutron star|cosmic censorship|shadow|horizon/i,
    quantum: /hep-th|quant-ph|quantum|casimir|vacuum|particle creation|field|boundary condition|dirichlet|neumann|semiclassical|renormal/i,
    fluid: /physics\.flu-dyn|fluid|drop|jet|liquid|surface tension|rayleigh|plateau|gregory|laflamme|brane|viscous|instability/i,
    geometry: /math\.dg|geometry|geometric|hypersurface|constant mean curvature|cmc|free boundary|hyperplane|black ring/i,
    dimensional: /dimensional analysis|dimensionless|constraints|linear-algebraic|drag force/i
  };

  function hasTheme(paper, theme) {
    if (Array.isArray(paper.themes) && paper.themes.includes(theme)) return true;
    const matcher = themeMatchers[theme];
    if (!matcher) return false;
    const searchable = [
      paper.title,
      paper.primary,
      Array.isArray(paper.categories) ? paper.categories.join(" ") : "",
      paper.summary
    ].join(" ");
    return matcher.test(searchable);
  }

  function truncate(text, length) {
    if (!text || text.length <= length) return text || "";
    return text.slice(0, length).replace(/\s+\S*$/, "") + "...";
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateCounts() {
    document.querySelectorAll("[data-last-updated]").forEach(function (node) {
      const modified = new Date(document.lastModified);
      node.textContent = lang === "ja"
        ? `${modified.getFullYear()}年${String(modified.getMonth() + 1).padStart(2, "0")}月${String(modified.getDate()).padStart(2, "0")}日`
        : modified.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    });
  }

  function renderPublications() {
    document.querySelectorAll("[data-publications]").forEach(function (list) {
      const limit = Number(list.dataset.limit || 0);
      const withSummary = list.dataset.summary === "true";
      const initialTheme = list.dataset.theme || "all";
      const search = document.querySelector("[data-publication-search]");
      const filters = document.querySelectorAll("[data-publication-filter]");

      function render() {
        const active = document.querySelector("[data-publication-filter].is-active");
        const theme = active ? active.dataset.publicationFilter : initialTheme;
        const query = search ? search.value.trim().toLowerCase() : "";
        const predicate = themeFilters[theme] || themeFilters.all;
        let papers = data.publications.filter(predicate);
        if (query) {
          papers = papers.filter(function (paper) {
            return [paper.title, paper.authors.join(" "), paper.year, paper.primary, paper.summary]
              .join(" ")
              .toLowerCase()
              .includes(query);
          });
        }
        if (limit > 0) papers = papers.slice(0, limit);
        list.innerHTML = papers.length ? papers.map(function (paper) {
          const authors = paper.authors.join(", ");
          const cats = paper.categories.slice(0, 3).map(function (cat) {
            return `<span class="tag">${escapeHTML(cat)}</span>`;
          }).join("");
          return `<article class="paper-card">
            <div class="paper-meta">
              <span>${escapeHTML(paper.year)}</span>
              <span>${escapeHTML(authors)}</span>
              <a href="${escapeHTML(paper.url)}">${labels[lang].arxiv}:${escapeHTML(paper.id)}</a>
            </div>
            <h3><a href="${escapeHTML(paper.url)}">${escapeHTML(paper.title)}</a></h3>
            ${withSummary ? `<p>${escapeHTML(truncate(paper.summary, 360))}</p>` : ""}
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
    noteTranslations.forEach(function (entry) {
      translated = translated.split(entry[0]).join(entry[1]);
    });
    return translated.replace(/\./g, " / ");
  }

  function translateTitle(title) {
    return lang === "ja" ? (title || "") : (titleTranslations[title] || title || "");
  }

  function normalizeAlbumTokens(value) {
    return String(value || "")
      .split(/\s+/)
      .map(function (token) { return token.trim(); })
      .filter(function (token) {
        return token && !/^(国内|海外|field|images)$/.test(token);
      });
  }

  function albumDateKey(item) {
    if (item.date) {
      const parts = String(item.date).split(".");
      return Number(parts[0] || 0) * 100 + Number(parts[1] || 0);
    }
    const note = [item.note, item.noteJa, item.noteEn].join(" ");
    const match = note.match(/(19|20)\d{2}(?:[./-](\d{1,2}))?/);
    const year = match ? Number(match[0].slice(0, 4)) : 0;
    const month = match && match[2] ? Number(match[2]) : 0;
    return year * 100 + month;
  }

  function albumFilenameKey(item) {
    const match = String(item.filename || "").match(/\d+/g);
    return match ? Number(match.join("").slice(0, 12)) : 0;
  }

  function getAlbumPlace(item) {
    if (item.titleJa || item.titleEn) return lang === "ja" ? (item.titleJa || item.titleEn) : (item.titleEn || item.titleJa);
    const title = item.titleJa || item.title || "";
    const tags = normalizeAlbumTokens(item.tags);
    const noteTokens = normalizeAlbumTokens(String(item.noteJa || item.note || "").replace(/(19|20)\d{2}(?:[./-]\d{1,2})?/g, ""));
    return title || tags[0] || noteTokens[0] || "";
  }

  function formatAlbumDate(item) {
    if (item.date) return item.date;
    const note = item.noteJa || item.noteEn || item.note || "";
    const match = String(note).match(/(19|20)\d{2}(?:[./-](\d{1,2}))?/);
    if (!match) return "";
    return match[2] ? `${match[0].slice(0, 4)}.${String(Number(match[2])).padStart(2, "0")}` : match[0].slice(0, 4);
  }

  function getAlbumTitle(item) {
    const placeJa = getAlbumPlace(item);
    const place = lang === "ja" ? placeJa : (item.titleEn || titleTranslations[placeJa] || translateNote(placeJa));
    const date = formatAlbumDate(item);
    if (place && date) return lang === "ja" ? `${place}（${date}）` : `${place} (${date})`;
    return place || date || "";
  }

  function getAlbumNote(item) {
    if (lang === "ja" && item.noteJa) return item.noteJa;
    if (lang !== "ja" && item.noteEn) return item.noteEn;
    const tags = normalizeAlbumTokens(item.tags);
    const noteTokens = normalizeAlbumTokens(String(item.noteJa || item.note || "").replace(/(19|20)\d{2}(?:[./-]\d{1,2})?/g, ""));
    const title = getAlbumPlace(item);
    const detail = tags.concat(noteTokens).filter(function (token, index, list) {
      return token !== title && list.indexOf(token) === index;
    }).join(" / ");
    return lang === "ja" ? detail : translateNote(detail);
  }

  function albumPredicate(filter) {
    return function (item) {
      const context = [
        item.note, item.noteJa, item.noteEn,
        item.title, item.titleJa, item.titleEn,
        item.tags
      ].join(" ");
      const isAkita = /秋田|由利本荘|男鹿|小安峡|栗駒山|法体|下浜|大曲|白神|鳥海|本荘|玉川/.test(context);
      const isJapan = /国内|秋田|東京|千葉|愛知|茨城|富山|青森|宮城|仙台|兵庫|神戸|和歌山|由利本荘|男鹿|名古屋|黒部|弘前|スカイツリー|立教|早稲田|白神|鳥海|本荘|玉川/.test(context);
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
        const albumSource = featuredAlbumRecords.length ? featuredAlbumRecords : data.album;
        let items = albumSource.filter(albumPredicate(filter)).slice().sort(function (a, b) {
          return albumDateKey(b) - albumDateKey(a) || albumFilenameKey(b) - albumFilenameKey(a);
        });
        if (limit > 0) items = items.slice(0, limit);
        grid.innerHTML = items.length ? items.map(function (item) {
          const src = root + item.src;
          const title = getAlbumTitle(item);
          const note = getAlbumNote(item);
          const altText = title || (lang === "ja" ? `写真 ${note}` : `Photograph ${note}`);
          return `<figure class="photo-card">
            <a href="${escapeHTML(src)}">
              <img src="${escapeHTML(src)}" alt="${escapeHTML(altText)}" loading="lazy">
              <figcaption>
                ${title ? `<span class="photo-title">${escapeHTML(title)}</span>` : ""}
                ${note ? `<span class="photo-note">${escapeHTML(note)}</span>` : ""}
              </figcaption>
            </a>
          </figure>`;
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

    function draw(time) {
      const t = time * 0.00022;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#101618");
      gradient.addColorStop(0.46, "#18302d");
      gradient.addColorStop(1, "#2b1f29");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.68;
      const cy = height * 0.46;
      const maxR = Math.max(width, height) * 0.92;
      ctx.lineWidth = 1;
      for (let i = 0; i < 22; i += 1) {
        const y = (i / 21) * height;
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 16) {
          const dx = x - cx;
          const dy = y - cy;
          const r = Math.sqrt(dx * dx + dy * dy) / maxR;
          const bend = Math.sin(x * 0.012 + t * 2.1) * 5 + Math.exp(-r * 5.5) * Math.sin((x + y) * 0.012 + t * 3) * 34;
          if (x === -20) ctx.moveTo(x, y + bend);
          else ctx.lineTo(x, y + bend);
        }
        ctx.strokeStyle = `rgba(197, 226, 220, ${0.06 + i * 0.003})`;
        ctx.stroke();
      }

      for (let i = 0; i < 20; i += 1) {
        const x = (i / 19) * width;
        ctx.beginPath();
        for (let y = -20; y <= height + 20; y += 16) {
          const dx = x - cx;
          const dy = y - cy;
          const r = Math.sqrt(dx * dx + dy * dy) / maxR;
          const bend = Math.cos(y * 0.011 + t * 1.9) * 5 + Math.exp(-r * 5.2) * Math.cos((x - y) * 0.014 + t * 2.8) * 30;
          if (y === -20) ctx.moveTo(x + bend, y);
          else ctx.lineTo(x + bend, y);
        }
        ctx.strokeStyle = "rgba(191, 176, 128, 0.075)";
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < 7; i += 1) {
        const radius = 42 + i * 28;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.22, radius * 0.46, 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 242, 219, ${0.16 - i * 0.012})`;
        ctx.stroke();
      }
      for (let i = 0; i < 18; i += 1) {
        const a = t * (0.7 + (i % 5) * 0.08) + i * 1.24;
        const radius = 72 + (i % 6) * 31;
        const x = Math.cos(a) * radius * 1.24;
        const y = Math.sin(a) * radius * 0.47;
        ctx.beginPath();
        ctx.fillStyle = i % 3 === 0 ? "rgba(234, 188, 119, 0.9)" : "rgba(189, 231, 224, 0.78)";
        ctx.arc(x, y, i % 3 === 0 ? 2.4 : 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.font = "16px serif";
      ctx.fillStyle = "rgba(228, 237, 232, 0.32)";
      ctx.fillText("Gμν + Λgμν = 8πGTμν", Math.max(24, width * 0.08), Math.max(70, height * 0.17));
      ctx.fillText("H = const.", Math.max(24, width * 0.11), Math.max(116, height * 0.25));
      ctx.fillText("⟨Tμν⟩ren", Math.max(24, width * 0.18), Math.max(158, height * 0.33));

      if (!prefersReduced) window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw(0);
    if (!prefersReduced) window.requestAnimationFrame(draw);
  }

  function initPageCanvas() {
    const hero = document.querySelector(".page-hero");
    if (!hero || hero.querySelector("canvas")) return;
    const canvas = document.createElement("canvas");
    canvas.className = "page-canvas";
    canvas.setAttribute("aria-hidden", "true");
    hero.prepend(canvas);
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

    function palette() {
      if (mode === "album") return ["#1b6f79", "#d9804a", "#f4cc6a"];
      if (mode === "funding") return ["#264f78", "#b58a22", "#6d7b49"];
      if (mode === "links") return ["#70598e", "#18736c", "#c97950"];
      if (mode === "education") return ["#2f6f55", "#c97950", "#f0c05a"];
      if (mode === "career") return ["#6d7b49", "#b65f39", "#18736c"];
      if (mode === "publications") return ["#18736c", "#70598e", "#b58a22"];
      return ["#18736c", "#b58a22", "#70598e"];
    }

    function draw(time) {
      const t = time * 0.00028;
      const colors = palette();
      ctx.clearRect(0, 0, width, height);
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#14201f");
      g.addColorStop(0.55, "#1c3030");
      g.addColorStop(1, "#2a202d");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 16; i += 1) {
        const y = (i / 15) * height;
        ctx.beginPath();
        for (let x = -24; x <= width + 24; x += 18) {
          const wave = Math.sin(x * 0.012 + i * 0.7 + t * (mode === "album" ? 4 : 2.2)) * (8 + (i % 4) * 2);
          if (x === -24) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = `rgba(236, 224, 178, ${0.04 + i * 0.004})`;
        ctx.stroke();
      }

      const count = mode === "links" ? 18 : mode === "album" ? 28 : 22;
      for (let i = 0; i < count; i += 1) {
        const a = t * (0.8 + (i % 5) * 0.1) + i * 0.73;
        const r = 56 + (i % 7) * 28;
        const cx = width * (0.72 + 0.08 * Math.sin(t + i));
        const cy = height * (0.48 + 0.12 * Math.cos(t * 0.9 + i));
        const x = cx + Math.cos(a) * r * (mode === "career" ? 1.8 : 1.25);
        const y = cy + Math.sin(a) * r * (mode === "education" ? 0.25 : 0.52);
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.65);
        ctx.arc(x, y, 1.8 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      }

      if (mode === "funding" || mode === "career") {
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i += 1) {
          const x = width * (0.58 + i * 0.08);
          ctx.beginPath();
          ctx.moveTo(x, height * 0.2);
          ctx.lineTo(x + Math.sin(t * 2 + i) * 32, height * 0.78);
          ctx.strokeStyle = hexToRgba(colors[i % colors.length], 0.28);
          ctx.stroke();
        }
      }

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
    if (!prefersReduced) window.requestAnimationFrame(draw);
  }

  updateCounts();
  renderPublications();
  renderAlbum();
  initHeroCanvas();
  initPageCanvas();
}());
