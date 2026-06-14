(function () {
  const html = document.documentElement;
  const root = html.dataset.root || "";
  const lang = html.lang && html.lang.startsWith("ja") ? "ja" : "en";
  const data = window.SITE_DATA || { publications: [], album: [] };

  const labels = {
    ja: {
      noPapers: "該当する論文はありません．",
      noPhotos: "該当する写真はありません．",
      arxiv: "arXiv",
      all: "すべて",
      countPapers: "件",
      countPhotos: "枚"
    },
    en: {
      noPapers: "No publications match this view.",
      noPhotos: "No photographs match this view.",
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
    "路面電車": "Tram",
    "アテネ": "Athens",
    "シフノス島": "Sifnos",
    "イスタンブール": "Istanbul",
    "伊豆": "Izu",
    "ベネチア": "Venice",
    "トリエステ": "Trieste",
    "宮古": "Miyako",
    "鳥海山": "Mount Chokai",
    "山梨": "Yamanashi",
    "冬の記録": "Winter Record",
    "教育": "Teaching",
    "数理科学": "Mathematical Sciences"
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
    ["トルコ", "Turkey"],
    ["イスタンブール", "Istanbul"],
    ["シフノス", "Sifnos"],
    ["アテネ", "Athens"],
    ["伊豆", "Izu"],
    ["山梨", "Yamanashi"],
    ["岩手", "Iwate"],
    ["宮古", "Miyako"],
    ["グアム", "Guam"],
    ["東日本大震災前夜", "on the eve of the Great East Japan Earthquake"],
    ["アルゼンチン", "Argentina"],
    ["チリ", "Chile"],
    ["ポルトガル", "Portugal"],
    ["秋田", "Akita"],
    ["東京", "Tokyo"],
    ["千葉", "Chiba"],
    ["青森", "Aomori"],
    ["山", "mountain"],
    ["運河", "canal"],
    ["論理学", "logic"],
    ["教育", "teaching"],
    ["雪", "snow"],
    ["愛知", "Aichi"],
    ["茨城", "Ibaraki"],
    ["富山", "Toyama"],
    ["「ケム川の橋」という意味", "\"bridge over the River Cam\""]
  ];

  const featuredAlbumRecords = [
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
    { filename: "feature-020.jpg", src: "assets/album/featured/feature-020.jpg", titleJa: "秋田", titleEn: "Akita", date: "2022.10", noteJa: "紅葉", noteEn: "autumn leaves", tags: "秋田 国内 秋" },
    { filename: "feature-021.jpg", src: "assets/album/featured/feature-021.jpg", titleJa: "宮古", titleEn: "Miyako", date: "2022.11", noteJa: "リアス式海岸", noteEn: "ria coast", tags: "岩手 宮古 国内 海" },
    { filename: "feature-022.jpg", src: "assets/album/featured/feature-022.jpg", titleJa: "宮古", titleEn: "Miyako", date: "2022.11", noteJa: "瓶詰＠宮古市", noteEn: "bottled seafood in Miyako", tags: "岩手 宮古 国内" },
    { filename: "feature-023.jpeg", src: "assets/album/featured/feature-023.jpeg", titleJa: "鳥海山", titleEn: "Mount Chokai", date: "2022.07", noteJa: "山行", noteEn: "hike", tags: "秋田 国内 山" },
    { filename: "feature-024.jpg", src: "assets/album/featured/feature-024.jpg", titleJa: "冬の記録", titleEn: "Winter Record", date: "2021.12", noteJa: "雪の日の造形", noteEn: "snow-day figure", tags: "国内 雪" },
    { filename: "photo-012.jpg", src: "assets/album/field/photo-012.jpg", titleJa: "ベネチア", titleEn: "Venice", date: "2023.09", noteJa: "運河とゴンドラ", noteEn: "canal and gondola", tags: "イタリア ベネチア 海外 街" },
    { filename: "photo-004.jpg", src: "assets/album/field/photo-004.jpg", titleJa: "イタリア", titleEn: "Italy", date: "2023.09", noteJa: "港", noteEn: "harbor", tags: "イタリア 海外 街" },
    { filename: "photo-077.jpg", src: "assets/album/field/photo-077.jpg", titleJa: "ローマ", titleEn: "Rome", date: "2023.08", noteJa: "路地", noteEn: "back street", tags: "イタリア ローマ 海外 街" },
    { filename: "photo-118.jpg", src: "assets/album/field/photo-118.jpg", titleJa: "秋田", titleEn: "Akita", date: "2023.04", noteJa: "水辺", noteEn: "waterside", tags: "秋田 国内 風景" },
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
    if (Array.isArray(paper.themes)) return paper.themes.includes(theme);
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
          const summary = lang === "ja" ? getJapanesePublicationSummary(paper) : truncate(paper.summary, 360);
          const visuals = Array.isArray(paper.visuals) ? paper.visuals.map(function (visual) {
            const caption = lang === "ja" ? (visual.captionJa || visual.caption || "") : (visual.captionEn || visual.caption || "");
            const visualClass = visual.compact ? "paper-visual paper-visual-compact" : "paper-visual";
            return `<figure class="${visualClass}">
              <img src="${escapeHTML(root + visual.src)}" alt="${escapeHTML(visual.alt || caption || paper.title)}" loading="lazy">
              ${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ""}
            </figure>`;
          }).join("") : "";
          return `<article class="paper-card">
            <div class="paper-meta">
              <span>${escapeHTML(paper.year)}</span>
              <span>${escapeHTML(authors)}</span>
              <a href="${escapeHTML(paper.url)}">${labels[lang].arxiv}:${escapeHTML(paper.id)}</a>
            </div>
            <h3><a href="${escapeHTML(paper.url)}">${escapeHTML(paper.title)}</a></h3>
            ${withSummary ? `<p class="paper-summary">${escapeHTML(summary)}</p>` : ""}
            ${visuals ? `<div class="paper-visual-grid">${visuals}</div>` : ""}
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

  function getJapanesePublicationSummary(paper) {
    if (paper.summaryJa) return paper.summaryJa;
    const theme = ["dimensional", "geometry", "fluid", "quantum", "gravity"].find(function (name) {
      return hasTheme(paper, name);
    }) || "default";
    const summaries = {
      gravity: "強い重力やブラックホールの近くで，光・粒子・時空の形がどのように振る舞うかを調べた研究です．観測される影や軌道の性質から，重力場そのものを読み解く手がかりを与えます．",
      quantum: "真空や粒子は，時空の曲がり方や境界条件の変化によって姿を変えます．この研究は，その量子効果を通して，古典的な時空と量子場の接点を明らかにするものです．",
      fluid: "液体の柱や膜，ブラックブレーンの不安定性など，一見別の現象を共通する数理で捉える研究です．形が崩れる条件や，その後の変化を安定性の観点から調べています．",
      geometry: "曲面や高次元の面の形を，平均曲率や安定性という幾何学の言葉で調べた研究です．物理で現れる液滴やブラックリングの形ともつながります．",
      dimensional: "物理量の単位や制約条件を整理し，複雑なモデルを見通しよく扱うための次元解析の研究です．数式を簡約し，重要な無次元量を見つける助けになります．",
      default: "数理物理の問題を，方程式・対称性・安定性の観点から調べた研究です．専門的な設定の背後にある物理的な意味が読み取りやすくなるよう整理しています．"
    };
    return summaries[theme];
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
      const x0 = width * 0.22;
      const x1 = width * 0.86;
      const y0 = height * 0.72;
      const y1 = height * 0.24;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i <= 80; i += 1) {
        const u = i / 80;
        const x = x0 + (x1 - x0) * u;
        const y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI * 5 + t) * 16;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hexToRgba(colors[0], 0.62);
      ctx.stroke();
      for (let i = 0; i < 8; i += 1) {
        const u = i / 7;
        const x = x0 + (x1 - x0) * u;
        const y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI * 5 + t) * 16;
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 5 + 2 * Math.sin(t * 2 + i), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.stroke();
      }
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
      ctx.font = "17px Georgia, serif";
      ctx.fillStyle = "rgba(239, 245, 229, 0.48)";
      const formulas = ["d/dx ∫ f = f", "Rn = N(A) ⊕ R(AT)", "Gμν = 8πGTμν", "iℏ∂tψ = Hψ", "∂tv + v·∇v = ..."];
      formulas.forEach(function (text, i) {
        const x = width * (0.1 + (i % 2) * 0.2) + Math.sin(t * 0.7 + i) * 10;
        const y = height * (0.22 + i * 0.1);
        ctx.fillText(text, x, y);
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
      ctx.strokeStyle = "rgba(237,244,239,0.12)";
      ctx.lineWidth = 1;
      for (let x = width * 0.1; x < width; x += 42) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.16);
        ctx.lineTo(x + 34, height * 0.86);
        ctx.stroke();
      }
      const points = [
        [0.16, 0.72],
        [0.34, 0.58],
        [0.48, 0.66],
        [0.62, 0.44],
        [0.82, 0.35]
      ].map(function (p) { return [p[0] * width, p[1] * height]; });
      ctx.lineWidth = 4;
      ctx.beginPath();
      points.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p[0], p[1]);
        else ctx.lineTo(p[0], p[1]);
      });
      ctx.strokeStyle = hexToRgba(colors[1], 0.58);
      ctx.stroke();
      points.forEach(function (p, i) {
        const pulse = 2 + Math.max(0, Math.sin(t * 2.4 + i)) * 4;
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.86);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 5 + pulse, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawLinks(t, colors) {
      const nodes = Array.from({ length: 14 }, function (_, i) {
        const a = i * 2.399 + t * 0.12;
        const r = 44 + (i % 5) * 28;
        return [
          width * 0.66 + Math.cos(a) * r * 1.55,
          height * 0.5 + Math.sin(a) * r * 0.8
        ];
      });
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          if ((i + j) % 4 !== 0) continue;
          ctx.beginPath();
          ctx.moveTo(nodes[i][0], nodes[i][1]);
          ctx.lineTo(nodes[j][0], nodes[j][1]);
          ctx.strokeStyle = hexToRgba(colors[(i + j) % colors.length], 0.16);
          ctx.stroke();
        }
      }
      nodes.forEach(function (p, i) {
        ctx.fillStyle = hexToRgba(colors[i % colors.length], 0.82);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 4 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      });
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
    if (!prefersReduced) window.requestAnimationFrame(draw);
  }

  updateCounts();
  renderPublications();
  renderAlbum();
  initHeroCanvas();
  initPageCanvas();
}());
