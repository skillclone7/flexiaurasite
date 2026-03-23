export type MultilingualText = {
    pt: string;
    en: string;
    fr: string;
    zh: string;
    ar: string;
};

export type QuizQuestion = {
    id: number;
    question: MultilingualText;
    options: MultilingualText[];
    correctAnswer: number;
    category: MultilingualText;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: {
            pt: "Qual é a capital da França?",
            en: "What is the capital of France?",
            fr: "Quelle est la capitale de la France?",
            zh: "法国的首都是什么?",
            ar: "ما هي عاصمة فرنسا؟"
        },
        options: [
            { pt: "Londres", en: "London", fr: "Londres", zh: "伦敦", ar: "لندن" },
            { pt: "Berlim", en: "Berlin", fr: "Berlin", zh: "柏林", ar: "برلين" },
            { pt: "Paris", en: "Paris", fr: "Paris", zh: "巴黎", ar: "باريس" },
            { pt: "Madrid", en: "Madrid", fr: "Madrid", zh: "马德里", ar: "مدريد" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 2,
        question: {
            pt: "Qual planeta é conhecido como o Planeta Vermelho?",
            en: "Which planet is known as the Red Planet?",
            fr: "Quelle planète est connue comme la planète rouge?",
            zh: "哪个行星被称为红色星球?",
            ar: "أي كوكب يُعرف بالكوكب الأحمر؟"
        },
        options: [
            { pt: "Vênus", en: "Venus", fr: "Vénus", zh: "金星", ar: "الزهرة" },
            { pt: "Marte", en: "Mars", fr: "Mars", zh: "火星", ar: "المريخ" },
            { pt: "Júpiter", en: "Jupiter", fr: "Jupiter", zh: "木星", ar: "المشتري" },
            { pt: "Saturno", en: "Saturn", fr: "Saturne", zh: "土星", ar: "زحل" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 3,
        question: {
            pt: "Quem pintou a Mona Lisa?",
            en: "Who painted the Mona Lisa?",
            fr: "Qui a peint la Joconde?",
            zh: "谁画了蒙娜丽莎?",
            ar: "من رسم الموناليزا؟"
        },
        options: [
            { pt: "Van Gogh", en: "Van Gogh", fr: "Van Gogh", zh: "梵高", ar: "فان جوخ" },
            { pt: "Picasso", en: "Picasso", fr: "Picasso", zh: "毕加索", ar: "بيكاسو" },
            { pt: "Leonardo da Vinci", en: "Leonardo da Vinci", fr: "Léonard de Vinci", zh: "达芬奇", ar: "ليوناردو دا فينشي" },
            { pt: "Michelangelo", en: "Michelangelo", fr: "Michel-Ange", zh: "米开朗基罗", ar: "مايكل أنجلو" }
        ],
        correctAnswer: 2,
        category: { pt: "Arte", en: "Art", fr: "Art", zh: "艺术", ar: "فن" }
    },
    {
        id: 4,
        question: {
            pt: "Qual é o maior oceano da Terra?",
            en: "What is the largest ocean on Earth?",
            fr: "Quel est le plus grand océan de la Terre?",
            zh: "地球上最大的海洋是什么?",
            ar: "ما هو أكبر محيط على الأرض؟"
        },
        options: [
            { pt: "Oceano Atlântico", en: "Atlantic Ocean", fr: "Océan Atlantique", zh: "大西洋", ar: "المحيط الأطلسي" },
            { pt: "Oceano Índico", en: "Indian Ocean", fr: "Océan Indien", zh: "印度洋", ar: "المحيط الهندي" },
            { pt: "Oceano Ártico", en: "Arctic Ocean", fr: "Océan Arctique", zh: "北冰洋", ar: "المحيط المتجمد الشمالي" },
            { pt: "Oceano Pacífico", en: "Pacific Ocean", fr: "Océan Pacifique", zh: "太平洋", ar: "المحيط الهادئ" }
        ],
        correctAnswer: 3,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 5,
        question: {
            pt: "Em que ano terminou a Segunda Guerra Mundial?",
            en: "What year did World War II end?",
            fr: "En quelle année s'est terminée la Seconde Guerre mondiale?",
            zh: "第二次世界大战在哪一年结束?",
            ar: "في أي عام انتهت الحرب العالمية الثانية؟"
        },
        options: [
            { pt: "1943", en: "1943", fr: "1943", zh: "1943", ar: "1943" },
            { pt: "1944", en: "1944", fr: "1944", zh: "1944", ar: "1944" },
            { pt: "1945", en: "1945", fr: "1945", zh: "1945", ar: "1945" },
            { pt: "1946", en: "1946", fr: "1946", zh: "1946", ar: "1946" }
        ],
        correctAnswer: 2,
        category: { pt: "História", en: "History", fr: "Histoire", zh: "历史", ar: "تاريخ" }
    },
    {
        id: 6,
        question: {
            pt: "Qual linguagem de programação é conhecida para desenvolvimento web?",
            en: "Which programming language is known for web development?",
            fr: "Quel langage de programmation est connu pour le développement web?",
            zh: "哪种编程语言以网页开发而闻名?",
            ar: "أي لغة برمجة معروفة لتطوير الويب؟"
        },
        options: [
            { pt: "Python", en: "Python", fr: "Python", zh: "Python", ar: "بايثون" },
            { pt: "JavaScript", en: "JavaScript", fr: "JavaScript", zh: "JavaScript", ar: "جافا سكريبت" },
            { pt: "C++", en: "C++", fr: "C++", zh: "C++", ar: "سي++" },
            { pt: "Swift", en: "Swift", fr: "Swift", zh: "Swift", ar: "سويفت" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 7,
        question: {
            pt: "Qual é o menor número primo?",
            en: "What is the smallest prime number?",
            fr: "Quel est le plus petit nombre premier?",
            zh: "最小的质数是什么?",
            ar: "ما هو أصغر عدد أولي؟"
        },
        options: [
            { pt: "0", en: "0", fr: "0", zh: "0", ar: "0" },
            { pt: "1", en: "1", fr: "1", zh: "1", ar: "1" },
            { pt: "2", en: "2", fr: "2", zh: "2", ar: "2" },
            { pt: "3", en: "3", fr: "3", zh: "3", ar: "3" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 8,
        question: {
            pt: "Quem escreveu 'Romeu e Julieta'?",
            en: "Who wrote 'Romeo and Juliet'?",
            fr: "Qui a écrit 'Roméo et Juliette'?",
            zh: "谁写了《罗密欧与朱丽叶》?",
            ar: "من كتب 'روميو وجولييت'؟"
        },
        options: [
            { pt: "Charles Dickens", en: "Charles Dickens", fr: "Charles Dickens", zh: "查尔斯·狄更斯", ar: "تشارلز ديكنز" },
            { pt: "William Shakespeare", en: "William Shakespeare", fr: "William Shakespeare", zh: "威廉·莎士比亚", ar: "ويليام شكسبير" },
            { pt: "Jane Austen", en: "Jane Austen", fr: "Jane Austen", zh: "简·奥斯汀", ar: "جين أوستن" },
            { pt: "Mark Twain", en: "Mark Twain", fr: "Mark Twain", zh: "马克·吐温", ar: "مارك توين" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 9,
        question: {
            pt: "Qual é o símbolo químico do ouro?",
            en: "What is the chemical symbol for gold?",
            fr: "Quel est le symbole chimique de l'or?",
            zh: "金的化学符号是什么?",
            ar: "ما هو الرمز الكيميائي للذهب؟"
        },
        options: [
            { pt: "Go", en: "Go", fr: "Go", zh: "Go", ar: "Go" },
            { pt: "Gd", en: "Gd", fr: "Gd", zh: "Gd", ar: "Gd" },
            { pt: "Au", en: "Au", fr: "Au", zh: "Au", ar: "Au" },
            { pt: "Ag", en: "Ag", fr: "Ag", zh: "Ag", ar: "Ag" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 10,
        question: {
            pt: "Qual país é o lar do canguru?",
            en: "Which country is home to the kangaroo?",
            fr: "Quel pays abrite le kangourou?",
            zh: "哪个国家是袋鼠的家园?",
            ar: "أي بلد موطن الكنغر؟"
        },
        options: [
            { pt: "Nova Zelândia", en: "New Zealand", fr: "Nouvelle-Zélande", zh: "新西兰", ar: "نيوزيلندا" },
            { pt: "Austrália", en: "Australia", fr: "Australie", zh: "澳大利亚", ar: "أستراليا" },
            { pt: "África do Sul", en: "South Africa", fr: "Afrique du Sud", zh: "南非", ar: "جنوب أفريقيا" },
            { pt: "Brasil", en: "Brazil", fr: "Brésil", zh: "巴西", ar: "البرازيل" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    // Questions 11-50 continue here...
    {
        id: 11,
        question: {
            pt: "Qual é a velocidade da luz no vácuo?",
            en: "What is the speed of light in vacuum?",
            fr: "Quelle est la vitesse de la lumière dans le vide?",
            zh: "真空中的光速是多少?",
            ar: "ما هي سرعة الضوء في الفراغ؟"
        },
        options: [
            { pt: "300.000 km/s", en: "300,000 km/s", fr: "300 000 km/s", zh: "300,000 km/s", ar: "300,000 كم/ث" },
            { pt: "150.000 km/s", en: "150,000 km/s", fr: "150 000 km/s", zh: "150,000 km/s", ar: "150,000 كم/ث" },
            { pt: "450.000 km/s", en: "450,000 km/s", fr: "450 000 km/s", zh: "450,000 km/s", ar: "450,000 كم/ث" },
            { pt: "600.000 km/s", en: "600,000 km/s", fr: "600 000 km/s", zh: "600,000 km/s", ar: "600,000 كم/ث" }
        ],
        correctAnswer: 0,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 12,
        question: {
            pt: "Quem desenvolveu a teoria da relatividade?",
            en: "Who developed the theory of relativity?",
            fr: "Qui a développé la théorie de la relativité?",
            zh: "谁发展了相对论?",
            ar: "من طور نظرية النسبية؟"
        },
        options: [
            { pt: "Isaac Newton", en: "Isaac Newton", fr: "Isaac Newton", zh: "艾萨克·牛顿", ar: "إسحاق نيوتن" },
            { pt: "Niels Bohr", en: "Niels Bohr", fr: "Niels Bohr", zh: "尼尔斯·玻尔", ar: "نيلز بور" },
            { pt: "Albert Einstein", en: "Albert Einstein", fr: "Albert Einstein", zh: "阿尔伯特·爱因斯坦", ar: "ألبرت أينشتاين" },
            { pt: "Stephen Hawking", en: "Stephen Hawking", fr: "Stephen Hawking", zh: "斯蒂芬·霍金", ar: "ستيفن هوكينغ" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 13,
        question: {
            pt: "Qual é o maior mamífero do mundo?",
            en: "What is the largest mammal in the world?",
            fr: "Quel est le plus grand mammifère du monde?",
            zh: "世界上最大的哺乳动物是什么?",
            ar: "ما هو أكبر ثدييات في العالم؟"
        },
        options: [
            { pt: "Elefante Africano", en: "African Elephant", fr: "Éléphant d'Afrique", zh: "非洲象", ar: "الفيل الأفريقي" },
            { pt: "Baleia Azul", en: "Blue Whale", fr: "Baleine bleue", zh: "蓝鲸", ar: "الحوت الأزرق" },
            { pt: "Girafa", en: "Giraffe", fr: "Girafe", zh: "长颈鹿", ar: "الزرافة" },
            { pt: "Urso Polar", en: "Polar Bear", fr: "Ours polaire", zh: "北极熊", ar: "الدب القطبي" }
        ],
        correctAnswer: 1,
        category: { pt: "Natureza", en: "Nature", fr: "Nature", zh: "自然", ar: "طبيعة" }
    },
    {
        id: 14,
        question: {
            pt: "Em que ano foi lançado o primeiro iPhone?",
            en: "In which year was the first iPhone released?",
            fr: "En quelle année le premier iPhone a-t-il été lancé?",
            zh: "第一部iPhone是哪一年发布的?",
            ar: "في أي عام تم إطلاق أول آيفون؟"
        },
        options: [
            { pt: "2005", en: "2005", fr: "2005", zh: "2005", ar: "2005" },
            { pt: "2006", en: "2006", fr: "2006", zh: "2006", ar: "2006" },
            { pt: "2007", en: "2007", fr: "2007", zh: "2007", ar: "2007" },
            { pt: "2008", en: "2008", fr: "2008", zh: "2008", ar: "2008" }
        ],
        correctAnswer: 2,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 15,
        question: {
            pt: "Qual é a moeda do Japão?",
            en: "What is the currency of Japan?",
            fr: "Quelle est la monnaie du Japon?",
            zh: "日本的货币是什么?",
            ar: "ما هي عملة اليابان؟"
        },
        options: [
            { pt: "Yuan", en: "Yuan", fr: "Yuan", zh: "元", ar: "يوان" },
            { pt: "Won", en: "Won", fr: "Won", zh: "韩元", ar: "وون" },
            { pt: "Iene", en: "Yen", fr: "Yen", zh: "日元", ar: "ين" },
            { pt: "Ringgit", en: "Ringgit", fr: "Ringgit", zh: "林吉特", ar: "رينغيت" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 16,
        question: {
            pt: "Quantos continentes existem?",
            en: "How many continents are there?",
            fr: "Combien y a-t-il de continents?",
            zh: "有多少个大洲?",
            ar: "كم عدد القارات؟"
        },
        options: [
            { pt: "5", en: "5", fr: "5", zh: "5", ar: "5" },
            { pt: "6", en: "6", fr: "6", zh: "6", ar: "6" },
            { pt: "7", en: "7", fr: "7", zh: "7", ar: "7" },
            { pt: "8", en: "8", fr: "8", zh: "8", ar: "8" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 17,
        question: {
            pt: "Qual é a fórmula química da água?",
            en: "What is the chemical formula for water?",
            fr: "Quelle est la formule chimique de l'eau?",
            zh: "水的化学式是什么?",
            ar: "ما هي الصيغة الكيميائية للماء؟"
        },
        options: [
            { pt: "H2O", en: "H2O", fr: "H2O", zh: "H2O", ar: "H2O" },
            { pt: "CO2", en: "CO2", fr: "CO2", zh: "CO2", ar: "CO2" },
            { pt: "O2", en: "O2", fr: "O2", zh: "O2", ar: "O2" },
            { pt: "H2O2", en: "H2O2", fr: "H2O2", zh: "H2O2", ar: "H2O2" }
        ],
        correctAnswer: 0,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 18,
        question: {
            pt: "Quem pintou 'A Noite Estrelada'?",
            en: "Who painted 'The Starry Night'?",
            fr: "Qui a peint 'La Nuit étoilée'?",
            zh: "谁画了《星夜》?",
            ar: "من رسم 'الليلة المرصعة بالنجوم'؟"
        },
        options: [
            { pt: "Claude Monet", en: "Claude Monet", fr: "Claude Monet", zh: "克劳德·莫奈", ar: "كلود مونيه" },
            { pt: "Vincent van Gogh", en: "Vincent van Gogh", fr: "Vincent van Gogh", zh: "文森特·梵高", ar: "فنسنت فان جوخ" },
            { pt: "Pablo Picasso", en: "Pablo Picasso", fr: "Pablo Picasso", zh: "巴勃罗·毕加索", ar: "بابلو بيكاسو" },
            { pt: "Salvador Dalí", en: "Salvador Dalí", fr: "Salvador Dalí", zh: "萨尔瓦多·达利", ar: "سلفادور دالي" }
        ],
        correctAnswer: 1,
        category: { pt: "Arte", en: "Art", fr: "Art", zh: "艺术", ar: "فن" }
    },
    {
        id: 19,
        question: {
            pt: "Qual é a capital da Itália?",
            en: "What is the capital of Italy?",
            fr: "Quelle est la capitale de l'Italie?",
            zh: "意大利的首都是什么?",
            ar: "ما هي عاصمة إيطاليا؟"
        },
        options: [
            { pt: "Milão", en: "Milan", fr: "Milan", zh: "米兰", ar: "ميلانو" },
            { pt: "Veneza", en: "Venice", fr: "Venise", zh: "威尼斯", ar: "البندقية" },
            { pt: "Roma", en: "Rome", fr: "Rome", zh: "罗马", ar: "روما" },
            { pt: "Florença", en: "Florence", fr: "Florence", zh: "佛罗伦萨", ar: "فلورنسا" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 20,
        question: {
            pt: "Quantos lados tem um hexágono?",
            en: "How many sides does a hexagon have?",
            fr: "Combien de côtés a un hexagone?",
            zh: "六边形有多少条边?",
            ar: "كم عدد أضلاع السداسي؟"
        },
        options: [
            { pt: "4", en: "4", fr: "4", zh: "4", ar: "4" },
            { pt: "5", en: "5", fr: "5", zh: "5", ar: "5" },
            { pt: "6", en: "6", fr: "6", zh: "6", ar: "6" },
            { pt: "7", en: "7", fr: "7", zh: "7", ar: "7" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 21,
        question: {
            pt: "Qual é o rio mais longo do mundo?",
            en: "What is the longest river in the world?",
            fr: "Quel est le fleuve le plus long du monde?",
            zh: "世界上最长的河流是什么?",
            ar: "ما هو أطول نهر في العالم؟"
        },
        options: [
            { pt: "Rio Amazonas", en: "Amazon River", fr: "Fleuve Amazone", zh: "亚马逊河", ar: "نهر الأمازون" },
            { pt: "Rio Nilo", en: "Nile River", fr: "Nil", zh: "尼罗河", ar: "نهر النيل" },
            { pt: "Rio Yangtzé", en: "Yangtze River", fr: "Yangtsé", zh: "长江", ar: "نهر اليانغتسي" },
            { pt: "Rio Mississippi", en: "Mississippi River", fr: "Mississippi", zh: "密西西比河", ar: "نهر المسيسيبي" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 22,
        question: {
            pt: "Qual é o metal mais abundante na crosta terrestre?",
            en: "What is the most abundant metal in Earth's crust?",
            fr: "Quel est le métal le plus abondant dans la croûte terrestre?",
            zh: "地壳中最丰富的金属是什么?",
            ar: "ما هو المعدن الأكثر وفرة في قشرة الأرض؟"
        },
        options: [
            { pt: "Ferro", en: "Iron", fr: "Fer", zh: "铁", ar: "حديد" },
            { pt: "Alumínio", en: "Aluminum", fr: "Aluminium", zh: "铝", ar: "ألومنيوم" },
            { pt: "Cobre", en: "Copper", fr: "Cuivre", zh: "铜", ar: "نحاس" },
            { pt: "Ouro", en: "Gold", fr: "Or", zh: "金", ar: "ذهب" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 23,
        question: {
            pt: "Quem escreveu '1984'?",
            en: "Who wrote '1984'?",
            fr: "Qui a écrit '1984'?",
            zh: "谁写了《1984》?",
            ar: "من كتب '1984'؟"
        },
        options: [
            { pt: "Aldous Huxley", en: "Aldous Huxley", fr: "Aldous Huxley", zh: "奥尔德斯·赫胥黎", ar: "ألدوس هكسلي" },
            { pt: "George Orwell", en: "George Orwell", fr: "George Orwell", zh: "乔治·奥威尔", ar: "جورج أورويل" },
            { pt: "Ray Bradbury", en: "Ray Bradbury", fr: "Ray Bradbury", zh: "雷·布拉德伯里", ar: "راي برادبري" },
            { pt: "H.G. Wells", en: "H.G. Wells", fr: "H.G. Wells", zh: "H.G.威尔斯", ar: "إتش جي ويلز" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 24,
        question: {
            pt: "Qual é a montanha mais alta do mundo?",
            en: "What is the highest mountain in the world?",
            fr: "Quelle est la plus haute montagne du monde?",
            zh: "世界上最高的山是什么?",
            ar: "ما هو أعلى جبل في العالم؟"
        },
        options: [
            { pt: "K2", en: "K2", fr: "K2", zh: "K2", ar: "كي2" },
            { pt: "Monte Everest", en: "Mount Everest", fr: "Mont Everest", zh: "珠穆朗玛峰", ar: "جبل إيفرست" },
            { pt: "Kangchenjunga", en: "Kangchenjunga", fr: "Kangchenjunga", zh: "干城章嘉峰", ar: "كانغشينجونغا" },
            { pt: "Lhotse", en: "Lhotse", fr: "Lhotse", zh: "洛子峰", ar: "لوتسي" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 25,
        question: {
            pt: "Quantos ossos tem o corpo humano adulto?",
            en: "How many bones are in the adult human body?",
            fr: "Combien d'os y a-t-il dans le corps humain adulte?",
            zh: "成人人体有多少块骨头?",
            ar: "كم عدد العظام في جسم الإنسان البالغ؟"
        },
        options: [
            { pt: "186", en: "186", fr: "186", zh: "186", ar: "186" },
            { pt: "206", en: "206", fr: "206", zh: "206", ar: "206" },
            { pt: "226", en: "226", fr: "226", zh: "226", ar: "226" },
            { pt: "246", en: "246", fr: "246", zh: "246", ar: "246" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 26,
        question: {
            pt: "Qual é a capital do Brasil?",
            en: "What is the capital of Brazil?",
            fr: "Quelle est la capitale du Brésil?",
            zh: "巴西的首都是什么?",
            ar: "ما هي عاصمة البرازيل؟"
        },
        options: [
            { pt: "São Paulo", en: "São Paulo", fr: "São Paulo", zh: "圣保罗", ar: "ساو باولو" },
            { pt: "Rio de Janeiro", en: "Rio de Janeiro", fr: "Rio de Janeiro", zh: "里约热内卢", ar: "ريو دي جانيرو" },
            { pt: "Brasília", en: "Brasília", fr: "Brasília", zh: "巴西利亚", ar: "برازيليا" },
            { pt: "Salvador", en: "Salvador", fr: "Salvador", zh: "萨尔瓦多", ar: "سلفادور" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 27,
        question: {
            pt: "Qual é o planeta mais próximo do Sol?",
            en: "Which planet is closest to the Sun?",
            fr: "Quelle planète est la plus proche du Soleil?",
            zh: "哪个行星离太阳最近?",
            ar: "أي كوكب هو الأقرب إلى الشمس؟"
        },
        options: [
            { pt: "Vênus", en: "Venus", fr: "Vénus", zh: "金星", ar: "الزهرة" },
            { pt: "Mercúrio", en: "Mercury", fr: "Mercure", zh: "水星", ar: "عطارد" },
            { pt: "Terra", en: "Earth", fr: "Terre", zh: "地球", ar: "الأرض" },
            { pt: "Marte", en: "Mars", fr: "Mars", zh: "火星", ar: "المريخ" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 28,
        question: {
            pt: "Quantos graus tem um ângulo reto?",
            en: "How many degrees are in a right angle?",
            fr: "Combien de degrés y a-t-il dans un angle droit?",
            zh: "直角有多少度?",
            ar: "كم درجة في الزاوية القائمة؟"
        },
        options: [
            { pt: "45", en: "45", fr: "45", zh: "45", ar: "45" },
            { pt: "60", en: "60", fr: "60", zh: "60", ar: "60" },
            { pt: "90", en: "90", fr: "90", zh: "90", ar: "90" },
            { pt: "180", en: "180", fr: "180", zh: "180", ar: "180" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 29,
        question: {
            pt: "Qual é o maior deserto do mundo?",
            en: "What is the largest desert in the world?",
            fr: "Quel est le plus grand désert du monde?",
            zh: "世界上最大的沙漠是什么?",
            ar: "ما هي أكبر صحراء في العالم؟"
        },
        options: [
            { pt: "Deserto do Saara", en: "Sahara Desert", fr: "Désert du Sahara", zh: "撒哈拉沙漠", ar: "الصحراء الكبرى" },
            { pt: "Deserto da Antártida", en: "Antarctic Desert", fr: "Désert Antarctique", zh: "南极沙漠", ar: "صحراء القطب الجنوبي" },
            { pt: "Deserto de Gobi", en: "Gobi Desert", fr: "Désert de Gobi", zh: "戈壁沙漠", ar: "صحراء جوبي" },
            { pt: "Deserto Arábico", en: "Arabian Desert", fr: "Désert d'Arabie", zh: "阿拉伯沙漠", ar: "الصحراء العربية" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 30,
        question: {
            pt: "Quem inventou a lâmpada elétrica?",
            en: "Who invented the electric light bulb?",
            fr: "Qui a inventé l'ampoule électrique?",
            zh: "谁发明了电灯泡?",
            ar: "من اخترع المصباح الكهربائي؟"
        },
        options: [
            { pt: "Nikola Tesla", en: "Nikola Tesla", fr: "Nikola Tesla", zh: "尼古拉·特斯拉", ar: "نيكولا تسلا" },
            { pt: "Thomas Edison", en: "Thomas Edison", fr: "Thomas Edison", zh: "托马斯·爱迪生", ar: "توماس إديسون" },
            { pt: "Alexander Graham Bell", en: "Alexander Graham Bell", fr: "Alexander Graham Bell", zh: "亚历山大·格拉汉姆·贝尔", ar: "ألكسندر جراهام بيل" },
            { pt: "Benjamin Franklin", en: "Benjamin Franklin", fr: "Benjamin Franklin", zh: "本杰明·富兰克林", ar: "بنجامين فرانكلين" }
        ],
        correctAnswer: 1,
        category: { pt: "História", en: "History", fr: "Histoire", zh: "历史", ar: "تاريخ" }
    },
    {
        id: 31,
        question: {
            pt: "Qual é o idioma mais falado no mundo?",
            en: "What is the most spoken language in the world?",
            fr: "Quelle est la langue la plus parlée au monde?",
            zh: "世界上使用最多的语言是什么?",
            ar: "ما هي اللغة الأكثر تحدثاً في العالم؟"
        },
        options: [
            { pt: "Inglês", en: "English", fr: "Anglais", zh: "英语", ar: "الإنجليزية" },
            { pt: "Mandarim", en: "Mandarin", fr: "Mandarin", zh: "普通话", ar: "الماندرين" },
            { pt: "Espanhol", en: "Spanish", fr: "Espagnol", zh: "西班牙语", ar: "الإسبانية" },
            { pt: "Hindi", en: "Hindi", fr: "Hindi", zh: "印地语", ar: "الهندية" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 32,
        question: {
            pt: "Qual é a raiz quadrada de 144?",
            en: "What is the square root of 144?",
            fr: "Quelle est la racine carrée de 144?",
            zh: "144的平方根是多少?",
            ar: "ما هو الجذر التربيعي لـ 144؟"
        },
        options: [
            { pt: "10", en: "10", fr: "10", zh: "10", ar: "10" },
            { pt: "11", en: "11", fr: "11", zh: "11", ar: "11" },
            { pt: "12", en: "12", fr: "12", zh: "12", ar: "12" },
            { pt: "13", en: "13", fr: "13", zh: "13", ar: "13" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 33,
        question: {
            pt: "Qual é o órgão mais pesado do corpo humano?",
            en: "What is the heaviest organ in the human body?",
            fr: "Quel est l'organe le plus lourd du corps humain?",
            zh: "人体最重的器官是什么?",
            ar: "ما هو أثقل عضو في جسم الإنسان؟"
        },
        options: [
            { pt: "Coração", en: "Heart", fr: "Cœur", zh: "心脏", ar: "القلب" },
            { pt: "Cérebro", en: "Brain", fr: "Cerveau", zh: "大脑", ar: "الدماغ" },
            { pt: "Fígado", en: "Liver", fr: "Foie", zh: "肝脏", ar: "الكبد" },
            { pt: "Pulmões", en: "Lungs", fr: "Poumons", zh: "肺", ar: "الرئتان" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 34,
        question: {
            pt: "Quantos dias tem um ano bissexto?",
            en: "How many days are in a leap year?",
            fr: "Combien de jours y a-t-il dans une année bissextile?",
            zh: "闰年有多少天?",
            ar: "كم يوماً في السنة الكبيسة؟"
        },
        options: [
            { pt: "364", en: "364", fr: "364", zh: "364", ar: "364" },
            { pt: "365", en: "365", fr: "365", zh: "365", ar: "365" },
            { pt: "366", en: "366", fr: "366", zh: "366", ar: "366" },
            { pt: "367", en: "367", fr: "367", zh: "367", ar: "367" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 35,
        question: {
            pt: "Qual é a capital da Espanha?",
            en: "What is the capital of Spain?",
            fr: "Quelle est la capitale de l'Espagne?",
            zh: "西班牙的首都是什么?",
            ar: "ما هي عاصمة إسبانيا؟"
        },
        options: [
            { pt: "Barcelona", en: "Barcelona", fr: "Barcelone", zh: "巴塞罗那", ar: "برشلونة" },
            { pt: "Sevilha", en: "Seville", fr: "Séville", zh: "塞维利亚", ar: "إشبيلية" },
            { pt: "Madrid", en: "Madrid", fr: "Madrid", zh: "马德里", ar: "مدريد" },
            { pt: "Valência", en: "Valencia", fr: "Valence", zh: "瓦伦西亚", ar: "فالنسيا" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 36,
        question: {
            pt: "Qual é o gás mais abundante na atmosfera terrestre?",
            en: "What is the most abundant gas in Earth's atmosphere?",
            fr: "Quel est le gaz le plus abondant dans l'atmosphère terrestre?",
            zh: "地球大气中最丰富的气体是什么?",
            ar: "ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟"
        },
        options: [
            { pt: "Oxigênio", en: "Oxygen", fr: "Oxygène", zh: "氧气", ar: "الأكسجين" },
            { pt: "Nitrogênio", en: "Nitrogen", fr: "Azote", zh: "氮气", ar: "النيتروجين" },
            { pt: "Dióxido de Carbono", en: "Carbon Dioxide", fr: "Dioxyde de carbone", zh: "二氧化碳", ar: "ثاني أكسيد الكربون" },
            { pt: "Argônio", en: "Argon", fr: "Argon", zh: "氩气", ar: "الأرجون" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 37,
        question: {
            pt: "Quem escreveu 'Dom Quixote'?",
            en: "Who wrote 'Don Quixote'?",
            fr: "Qui a écrit 'Don Quichotte'?",
            zh: "谁写了《堂吉诃德》?",
            ar: "من كتب 'دون كيشوت'؟"
        },
        options: [
            { pt: "Miguel de Cervantes", en: "Miguel de Cervantes", fr: "Miguel de Cervantes", zh: "米格尔·德·塞万提斯", ar: "ميغيل دي سرفانتس" },
            { pt: "Gabriel García Márquez", en: "Gabriel García Márquez", fr: "Gabriel García Márquez", zh: "加夫列尔·加西亚·马尔克斯", ar: "غابرييل غارسيا ماركيز" },
            { pt: "Federico García Lorca", en: "Federico García Lorca", fr: "Federico García Lorca", zh: "费德里科·加西亚·洛尔卡", ar: "فيديريكو غارسيا لوركا" },
            { pt: "Jorge Luis Borges", en: "Jorge Luis Borges", fr: "Jorge Luis Borges", zh: "豪尔赫·路易斯·博尔赫斯", ar: "خورخي لويس بورخيس" }
        ],
        correctAnswer: 0,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 38,
        question: {
            pt: "Qual é o menor país do mundo?",
            en: "What is the smallest country in the world?",
            fr: "Quel est le plus petit pays du monde?",
            zh: "世界上最小的国家是什么?",
            ar: "ما هي أصغر دولة في العالم؟"
        },
        options: [
            { pt: "Mônaco", en: "Monaco", fr: "Monaco", zh: "摩纳哥", ar: "موناكو" },
            { pt: "Vaticano", en: "Vatican City", fr: "Vatican", zh: "梵蒂冈", ar: "الفاتيكان" },
            { pt: "San Marino", en: "San Marino", fr: "Saint-Marin", zh: "圣马力诺", ar: "سان مارينو" },
            { pt: "Liechtenstein", en: "Liechtenstein", fr: "Liechtenstein", zh: "列支敦士登", ar: "ليختنشتاين" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 39,
        question: {
            pt: "Quantos planetas existem no Sistema Solar?",
            en: "How many planets are in the Solar System?",
            fr: "Combien de planètes y a-t-il dans le système solaire?",
            zh: "太阳系有多少颗行星?",
            ar: "كم عدد الكواكب في النظام الشمسي؟"
        },
        options: [
            { pt: "7", en: "7", fr: "7", zh: "7", ar: "7" },
            { pt: "8", en: "8", fr: "8", zh: "8", ar: "8" },
            { pt: "9", en: "9", fr: "9", zh: "9", ar: "9" },
            { pt: "10", en: "10", fr: "10", zh: "10", ar: "10" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 40,
        question: {
            pt: "Qual é o símbolo químico do ferro?",
            en: "What is the chemical symbol for iron?",
            fr: "Quel est le symbole chimique du fer?",
            zh: "铁的化学符号是什么?",
            ar: "ما هو الرمز الكيميائي للحديد؟"
        },
        options: [
            { pt: "Fe", en: "Fe", fr: "Fe", zh: "Fe", ar: "Fe" },
            { pt: "Ir", en: "Ir", fr: "Ir", zh: "Ir", ar: "Ir" },
            { pt: "Fr", en: "Fr", fr: "Fr", zh: "Fr", ar: "Fr" },
            { pt: "In", en: "In", fr: "In", zh: "In", ar: "In" }
        ],
        correctAnswer: 0,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 41,
        question: {
            pt: "Qual é a capital da Alemanha?",
            en: "What is the capital of Germany?",
            fr: "Quelle est la capitale de l'Allemagne?",
            zh: "德国的首都是什么?",
            ar: "ما هي عاصمة ألمانيا؟"
        },
        options: [
            { pt: "Munique", en: "Munich", fr: "Munich", zh: "慕尼黑", ar: "ميونيخ" },
            { pt: "Hamburgo", en: "Hamburg", fr: "Hambourg", zh: "汉堡", ar: "هامبورغ" },
            { pt: "Berlim", en: "Berlin", fr: "Berlin", zh: "柏林", ar: "برلين" },
            { pt: "Frankfurt", en: "Frankfurt", fr: "Francfort", zh: "法兰克福", ar: "فرانكفورت" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 42,
        question: {
            pt: "Quantos metros tem um quilômetro?",
            en: "How many meters are in a kilometer?",
            fr: "Combien de mètres y a-t-il dans un kilomètre?",
            zh: "一公里有多少米?",
            ar: "كم متراً في الكيلومتر؟"
        },
        options: [
            { pt: "100", en: "100", fr: "100", zh: "100", ar: "100" },
            { pt: "500", en: "500", fr: "500", zh: "500", ar: "500" },
            { pt: "1000", en: "1000", fr: "1000", zh: "1000", ar: "1000" },
            { pt: "10000", en: "10000", fr: "10000", zh: "10000", ar: "10000" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 43,
        question: {
            pt: "Qual é a capital do Canadá?",
            en: "What is the capital of Canada?",
            fr: "Quelle est la capitale du Canada?",
            zh: "加拿大的首都是什么?",
            ar: "ما هي عاصمة كندا؟"
        },
        options: [
            { pt: "Toronto", en: "Toronto", fr: "Toronto", zh: "多伦多", ar: "تورونتو" },
            { pt: "Vancouver", en: "Vancouver", fr: "Vancouver", zh: "温哥华", ar: "فانكوفر" },
            { pt: "Montreal", en: "Montreal", fr: "Montréal", zh: "蒙特利尔", ar: "مونتريال" },
            { pt: "Ottawa", en: "Ottawa", fr: "Ottawa", zh: "渥太华", ar: "أوتاوا" }
        ],
        correctAnswer: 3,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 44,
        question: {
            pt: "Qual é o ponto de ebulição da água ao nível do mar?",
            en: "What is the boiling point of water at sea level?",
            fr: "Quel est le point d'ébullition de l'eau au niveau de la mer?",
            zh: "海平面上水的沸点是多少?",
            ar: "ما هي نقطة غليان الماء عند مستوى سطح البحر؟"
        },
        options: [
            { pt: "90°C", en: "90°C", fr: "90°C", zh: "90°C", ar: "90°C" },
            { pt: "95°C", en: "95°C", fr: "95°C", zh: "95°C", ar: "95°C" },
            { pt: "100°C", en: "100°C", fr: "100°C", zh: "100°C", ar: "100°C" },
            { pt: "105°C", en: "105°C", fr: "105°C", zh: "105°C", ar: "105°C" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 45,
        question: {
            pt: "Quem pintou a Capela Sistina?",
            en: "Who painted the Sistine Chapel?",
            fr: "Qui a peint la Chapelle Sixtine?",
            zh: "谁画了西斯廷教堂?",
            ar: "من رسم كنيسة سيستين؟"
        },
        options: [
            { pt: "Leonardo da Vinci", en: "Leonardo da Vinci", fr: "Léonard de Vinci", zh: "达芬奇", ar: "ليوناردو دا فينشي" },
            { pt: "Michelangelo", en: "Michelangelo", fr: "Michel-Ange", zh: "米开朗基罗", ar: "مايكل أنجلو" },
            { pt: "Rafael", en: "Raphael", fr: "Raphaël", zh: "拉斐尔", ar: "رافائيل" },
            { pt: "Donatello", en: "Donatello", fr: "Donatello", zh: "多纳泰罗", ar: "دوناتيلو" }
        ],
        correctAnswer: 1,
        category: { pt: "Arte", en: "Art", fr: "Art", zh: "艺术", ar: "فن" }
    },
    {
        id: 46,
        question: {
            pt: "Qual é a capital da China?",
            en: "What is the capital of China?",
            fr: "Quelle est la capitale de la Chine?",
            zh: "中国的首都是什么?",
            ar: "ما هي عاصمة الصين؟"
        },
        options: [
            { pt: "Xangai", en: "Shanghai", fr: "Shanghai", zh: "上海", ar: "شنغهاي" },
            { pt: "Pequim", en: "Beijing", fr: "Pékin", zh: "北京", ar: "بكين" },
            { pt: "Hong Kong", en: "Hong Kong", fr: "Hong Kong", zh: "香港", ar: "هونغ كونغ" },
            { pt: "Cantão", en: "Guangzhou", fr: "Canton", zh: "广州", ar: "قوانغتشو" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 47,
        question: {
            pt: "Quantos segundos tem uma hora?",
            en: "How many seconds are in an hour?",
            fr: "Combien de secondes y a-t-il dans une heure?",
            zh: "一小时有多少秒?",
            ar: "كم ثانية في الساعة؟"
        },
        options: [
            { pt: "1800", en: "1800", fr: "1800", zh: "1800", ar: "1800" },
            { pt: "3000", en: "3000", fr: "3000", zh: "3000", ar: "3000" },
            { pt: "3600", en: "3600", fr: "3600", zh: "3600", ar: "3600" },
            { pt: "6000", en: "6000", fr: "6000", zh: "6000", ar: "6000" }
        ],
        correctAnswer: 2,
        category: { pt: "Matemática", en: "Mathematics", fr: "Mathématiques", zh: "数学", ar: "رياضيات" }
    },
    {
        id: 48,
        question: {
            pt: "Qual é o maior país do mundo em área?",
            en: "What is the largest country in the world by area?",
            fr: "Quel est le plus grand pays du monde en superficie?",
            zh: "世界上面积最大的国家是什么?",
            ar: "ما هي أكبر دولة في العالم من حيث المساحة؟"
        },
        options: [
            { pt: "Canadá", en: "Canada", fr: "Canada", zh: "加拿大", ar: "كندا" },
            { pt: "China", en: "China", fr: "Chine", zh: "中国", ar: "الصين" },
            { pt: "Estados Unidos", en: "United States", fr: "États-Unis", zh: "美国", ar: "الولايات المتحدة" },
            { pt: "Rússia", en: "Russia", fr: "Russie", zh: "俄罗斯", ar: "روسيا" }
        ],
        correctAnswer: 3,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 49,
        question: {
            pt: "Qual é o elemento químico com símbolo 'O'?",
            en: "What is the chemical element with symbol 'O'?",
            fr: "Quel est l'élément chimique avec le symbole 'O'?",
            zh: "符号为'O'的化学元素是什么?",
            ar: "ما هو العنصر الكيميائي برمز 'O'؟"
        },
        options: [
            { pt: "Ouro", en: "Gold", fr: "Or", zh: "金", ar: "ذهب" },
            { pt: "Ósmio", en: "Osmium", fr: "Osmium", zh: "锇", ar: "أوزميوم" },
            { pt: "Oxigênio", en: "Oxygen", fr: "Oxygène", zh: "氧", ar: "الأكسجين" },
            { pt: "Oganesson", en: "Oganesson", fr: "Oganesson", zh: "Og", ar: "أوغانيسون" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 50,
        question: {
            pt: "Quem escreveu 'Cem Anos de Solidão'?",
            en: "Who wrote 'One Hundred Years of Solitude'?",
            fr: "Qui a écrit 'Cent ans de solitude'?",
            zh: "谁写了《百年孤独》?",
            ar: "من كتب 'مائة عام من العزلة'؟"
        },
        options: [
            { pt: "Pablo Neruda", en: "Pablo Neruda", fr: "Pablo Neruda", zh: "巴勃罗·聂鲁达", ar: "بابلو نيرودا" },
            { pt: "Gabriel García Márquez", en: "Gabriel García Márquez", fr: "Gabriel García Márquez", zh: "加夫列尔·加西亚·马尔克斯", ar: "غابرييل غارسيا ماركيز" },
            { pt: "Mario Vargas Llosa", en: "Mario Vargas Llosa", fr: "Mario Vargas Llosa", zh: "马里奥·巴尔加斯·略萨", ar: "ماريو فارغاس يوسا" },
            { pt: "Octavio Paz", en: "Octavio Paz", fr: "Octavio Paz", zh: "奥克塔维奥·帕斯", ar: "أوكتافيو باث" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 51,
        question: {
            pt: "O que significa a sigla tecnológica 'WYSIWYG'?",
            en: "What does the tech acronym 'WYSIWYG' stand for?",
            fr: "Que signifie l'acronyme technologique 'WYSIWYG'?",
            zh: "技术缩写 'WYSIWYG' 代表什么?",
            ar: "ماذا يعني الاختصار التقني 'WYSIWYG'؟"
        },
        options: [
            { pt: "What You See Is What You Get", en: "What You See Is What You Get", fr: "What You See Is What You Get", zh: "所见即所得", ar: "ما تراه هو ما تحصل عليه" },
            { pt: "Web Yield System In Weekly Grey", en: "Web Yield System In Weekly Grey", fr: "Web Yield System In Weekly Grey", zh: "每周灰色网络收益系统", ar: "نظام عائد الويب باللون الرمادي الأسبوعي" },
            { pt: "Wide Yield Standard In Web Graph", en: "Wide Yield Standard In Web Graph", zh: "网络图中的宽收益标准", fr: "Wide Yield Standard In Web Graph", ar: "معيار العائد الواسع في رسم الويب" },
            { pt: "World Yield Signal In Web Gate", en: "World Yield Signal In Web Gate", zh: "网门世界收益信号", fr: "World Yield Signal In Web Gate", ar: "إشارة العائد العالمي في بوابة الويب" }
        ],
        correctAnswer: 0,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 52,
        question: {
            pt: "Qual cientista criou a linguagem de programação FORTRAN em 1957?",
            en: "Which scientist created the FORTRAN programming language in 1957?",
            fr: "Quel scientifique a créé le langage de programmation FORTRAN en 1957?",
            zh: "哪位科学家在 1957 年开发了 FORTRAN 编程语言?",
            ar: "أي عالم أنشأ لغة برمجة فورتران في عام 1957؟"
        },
        options: [
            { pt: "Alan Turing", en: "Alan Turing", fr: "Alan Turing", zh: "艾伦·图灵", ar: "آلان تورينج" },
            { pt: "John Backus", en: "John Backus", fr: "John Backus", zh: "约翰·巴克斯", ar: "جون باكوس" },
            { pt: "Grace Hopper", en: "Grace Hopper", fr: "Grace Hopper", zh: "格致·霍珀", ar: "غريس هوبر" },
            { pt: "Dennis Ritchie", en: "Dennis Ritchie", fr: "Dennis Ritchie", zh: "丹尼斯·里奇", ar: "دنيس ريتشي" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 53,
        question: {
            pt: "Qual foi o primeiro microprocessador do mundo, lançado em 1971?",
            en: "What was the world's first microprocessor, released in 1971?",
            fr: "Quel fut le premier microprocesseur au monde, lancé en 1971?",
            zh: "1971 年发布的世界上第一个微处理器是什么?",
            ar: "ما هو أول معالج دقيق في العالم ، تم إصداره في عام 1971؟"
        },
        options: [
            { pt: "Intel 8080", en: "Intel 8080", fr: "Intel 8080", zh: "英特尔 8080", ar: "إنتل 8080" },
            { pt: "Intel 4004", en: "Intel 4004", fr: "Intel 4004", zh: "英特尔 4004", ar: "إنتل 4004" },
            { pt: "Zilog Z80", en: "Zilog Z80", fr: "Zilog Z80", zh: "希格 Z80", ar: "زيلوج Z80" },
            { pt: "Motorola 6800", en: "Motorola 6800", fr: "Motorola 6800", zh: "摩托罗拉 6800", ar: "موتورولا 6800" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 54,
        question: {
            pt: "Quem cunhou o termo 'bug' para falhas de computador ao encontrar uma mariposa?",
            en: "Who coined the term 'bug' for computer failures after finding a moth?",
            fr: "Qui a inventé le terme 'bug' pour les pannes informatiques après avoir trouvé un papillon de nuit?",
            zh: "谁在发现一只飞蛾后创造了 'bug' 这个词来形容计算机故障?",
            ar: "من ابتكر مصطلح 'bug' لفشل الكمبيوتر بعد العثور على عثة؟"
        },
        options: [
            { pt: "Ada Lovelace", en: "Ada Lovelace", fr: "Ada Lovelace", zh: "阿达·洛夫莱斯", ar: "آدا لوفليس" },
            { pt: "Grace Hopper", en: "Grace Hopper", fr: "Grace Hopper", zh: "格致·霍珀", ar: "غريس هوبر" },
            { pt: "Bill Gates", en: "Bill Gates", fr: "Bill Gates", zh: "比尔·盖茨", ar: "بيل جيتس" },
            { pt: "Steve Jobs", en: "Steve Jobs", fr: "Steve Jobs", zh: "史蒂夫·乔布斯", ar: "ستيف جوبز" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 55,
        question: {
            pt: "Qual empresa de tecnologia tirou seu nome da palavra latina para 'inveja'?",
            en: "Which tech company took its name from the Latin word for 'envy'?",
            fr: "Quelle entreprise technologique tire son nom du mot latin signifiant 'envie'?",
            zh: "哪家技术公司的名字源于拉丁语中的 '嫉妒' (envy) 一词?",
            ar: "أي شركة تقنية استمدت اسمها من الكلمة اللاتينية التي تعني 'الحسد'؟"
        },
        options: [
            { pt: "Intel", en: "Intel", fr: "Intel", zh: "英特尔", ar: "إنتل" },
            { pt: "Nvidia", en: "Nvidia", fr: "Nvidia", zh: "英伟达", ar: "نيفيديا" },
            { pt: "AMD", en: "AMD", fr: "AMD", zh: "AMD", ar: "AMD" },
            { pt: "Oracle", en: "Oracle", fr: "Oracle", zh: "甲骨文", ar: "أوراكل" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 56,
        question: {
            pt: "Em que ano foi patenteado o primeiro mouse de computador?",
            en: "In what year was the first computer mouse patented?",
            fr: "En quelle année la première souris informatique a-t-elle été brevetée?",
            zh: "第一只计算机鼠标是在哪一年获得专利的?",
            ar: "في أي عام تم تسجيل براءة اختراع أول فأرة كمبيوتر؟"
        },
        options: [
            { pt: "1964", en: "1964", fr: "1964", zh: "1964", ar: "1964" },
            { pt: "1967", en: "1967", fr: "1967", zh: "1967", ar: "1967" },
            { pt: "1970", en: "1970", fr: "1970", zh: "1970", ar: "1970" },
            { pt: "1973", en: "1973", fr: "1973", zh: "1973", ar: "1973" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 57,
        question: {
            pt: "Quem é reconhecido por escrever o primeiro programa de computador da história?",
            en: "Who is recognized for writing the first computer program in history?",
            fr: "Qui est reconnu pour avoir écrit le premier programme informatique de l'histoire?",
            zh: "谁被公认为编写了历史上第一个计算机程序?",
            ar: "من هو المعترف به لكتابته أول برنامج كمبيوتر في التاريخ؟"
        },
        options: [
            { pt: "Charles Babbage", en: "Charles Babbage", fr: "Charles Babbage", zh: "查尔斯·巴贝奇", ar: "تشارلز باباج" },
            { pt: "Ada Lovelace", en: "Ada Lovelace", fr: "Ada Lovelace", zh: "阿达·洛夫莱斯", ar: "آدا لوفليس" },
            { pt: "Alan Turing", en: "Alan Turing", fr: "Alan Turing", zh: "艾伦·图灵", ar: "آلان تورينج" },
            { pt: "John von Neumann", en: "John von Neumann", fr: "John von Neumann", zh: "约翰·冯·诺伊曼", ar: "جون فون نيومان" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 58,
        question: {
            pt: "O documento RFC 791 descreve detalhadamente qual protocolo fundamental?",
            en: "RFC 791 describes in detail which fundamental protocol?",
            fr: "Le RFC 791 décrit en détail quel protocole fondamental?",
            zh: "RFC 791 详细描述了哪种基本协议?",
            ar: "تصف وثيقة RFC 791 بالتفصيل أي بروتوكول أساسي؟"
        },
        options: [
            { pt: "HTTP", en: "HTTP", fr: "HTTP", zh: "HTTP", ar: "HTTP" },
            { pt: "IPv4", en: "IPv4", fr: "IPv4", zh: "IPv4", ar: "IPv4" },
            { pt: "TCP", en: "TCP", fr: "TCP", zh: "TCP", ar: "TCP" },
            { pt: "DNS", en: "DNS", fr: "DNS", zh: "DNS", ar: "DNS" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 59,
        question: {
            pt: "Quem é o principal inventor da World Wide Web (WWW)?",
            en: "Who is the primary inventor of the World Wide Web (WWW)?",
            fr: "Qui est l'inventeur principal du World Wide Web (WWW)?",
            zh: "万维网 (WWW) 的主耍发明者是谁?",
            ar: "من هو المخترع الرئيسي للشبكة العنكبوتية العالمية (WWW)؟"
        },
        options: [
            { pt: "Vint Cerf", en: "Vint Cerf", fr: "Vint Cerf", zh: "温特·瑟夫", ar: "فينت سيرف" },
            { pt: "Tim Berners-Lee", en: "Tim Berners-Lee", fr: "Tim Berners-Lee", zh: "蒂姆·伯纳斯-李", ar: "تيم بيرنرز لي" },
            { pt: "Marc Andreessen", en: "Marc Andreessen", fr: "Marc Andreessen", zh: "马克·安德森", ar: "مارك آندريسن" },
            { pt: "Linus Torvalds", en: "Linus Torvalds", fr: "Linus Torvalds", zh: "林纳斯·托瓦兹", ar: "لينوس تورفالدس" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 60,
        question: {
            pt: "Qual a principal diferença operacional entre a memória RAM e a ROM?",
            en: "What is the primary operational difference between RAM and ROM?",
            fr: "Quelle est la principale différence opérationnelle entre la RAM et la ROM?",
            zh: "RAM 和 ROM 之间的主要运行区别是什么?",
            ar: "ما هو الفرق التشغيلي الأساسي بين RAM و ROM؟"
        },
        options: [
            { pt: "Velocidade", en: "Speed", fr: "Vitesse", zh: "速度", ar: "السرعة" },
            { pt: "Volatilidade", en: "Volatility", fr: "Volatilité", zh: "挥发性", ar: "التطاير والقدرة على مسح البيانات" },
            { pt: "Fabricante", en: "Manufacturer", fr: "Fabricant", zh: "制造商", ar: "الشركة المصنعة" },
            { pt: "Preço", en: "Price", fr: "Prix", zh: "价格", ar: "السعر" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 61,
        question: {
            pt: "Qual é considerado o tipo sanguíneo mais raro na população mundial?",
            en: "What is considered the rarest blood type in the world population?",
            fr: "Quel est considéré comme le type sanguin le plus rare dans la population mondiale?",
            zh: "全球人口中哪种血型被认为是最罕见的?",
            ar: "ما هو نوع الدم الذي يعتبر الأندر بين سكان العالم؟"
        },
        options: [
            { pt: "O Negativo", en: "O Negative", fr: "O Négatif", zh: "O 型阴性", ar: "O سالب" },
            { pt: "AB Negativo", en: "AB Negative", fr: "AB Négatif", zh: "AB 型阴性", ar: "AB سالب" },
            { pt: "Rh Nulo", en: "Rh Null", fr: "Rh Null", zh: "Rh Null", ar: "Rh Null" },
            { pt: "B Positivo", en: "B Positive", fr: "B Positif", zh: "B 型阳性", ar: "B موجب" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 62,
        question: {
            pt: "O pico de qual montanha está localizado mais longe do centro da Terra?",
            en: "The peak of which mountain is located farthest from the Earth's center?",
            fr: "Le sommet de quelle montagne est situé le plus loin du centre de la Terre?",
            zh: "哪座山的山峰离地心最远?",
            ar: "قمة أي جبل تقع الأبعد عن مركز الأرض؟"
        },
        options: [
            { pt: "Monte Everest", en: "Mount Everest", fr: "Mont Everest", zh: "珠穆朗玛峰", ar: "جبل إيفرست" },
            { pt: "Monte Chimborazo", en: "Mount Chimborazo", fr: "Mont Chimborazo", zh: "钦博拉索山", ar: "جبل تشيمبورازو" },
            { pt: "K2", en: "K2", fr: "K2", zh: "K2", ar: "كي2" },
            { pt: "Monte Kilimanjaro", en: "Mount Kilimanjaro", fr: "Mont Kilimanjaro", zh: "乞力马扎罗山", ar: "جبل كليمنجارو" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 63,
        question: {
            pt: "O efeito Mpemba refere-se à observação de que...",
            en: "The Mpemba effect refers to the observation that...",
            fr: "L'effet Mpemba fait référence à l'observation que...",
            zh: "姆潘巴效应是指观察到...",
            ar: "يشير تأثير مبيمبا إلى الملاحظة القائلة بأن..."
        },
        options: [
            { pt: "Água fria congela mais rápido", en: "Cold water freezes faster", fr: "L'eau froide gèle plus vite", zh: "冷水冻结得更快", ar: "الماء البارد يتجمد بشكل أسرع" },
            { pt: "Água quente congela mais rápido", en: "Hot water freezes faster", fr: "L'eau chaude gèle plus vite", zh: "热水冻结得更快", ar: "الماء الساخن يتجمد بشكل أسرع" },
            { pt: "Água salgada não congela", en: "Salt water does not freeze", fr: "L'eau salée ne gèle pas", zh: "盐水不会结冰", ar: "الماء المالح لا يتجمد" },
            { pt: "O gelo derrete a 4°C", en: "Ice melts at 4°C", fr: "La glace fond à 4°C", zh: "冰在 4°C 时融化", ar: "الجليد يذوب عند 4 درجات مئوية" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 64,
        question: {
            pt: "Qual é, tecnicamente, o maior deserto do planeta Terra?",
            en: "Technically, what is the largest desert on planet Earth?",
            fr: "Techniquement, quel est le plus grand désert de la planète Terre?",
            zh: "从技术上讲，地球上最大的沙漠是什么?",
            ar: "من الناحية الفنية ، ما هو أكبر صحراء على كوكب الأرض؟"
        },
        options: [
            { pt: "Saara", en: "Sahara", fr: "Sahara", zh: "撒哈拉沙漠", ar: "الصحراء الكبرى" },
            { pt: "Gobi", en: "Gobi", fr: "Gobi", zh: "戈壁沙漠", ar: "صحراء جوبي" },
            { pt: "Antárctida", en: "Antarctica", fr: "Antarctique", zh: "南极洲", ar: "أنتاركتيكا" },
            { pt: "Ártico", en: "Arctic", fr: "Arctique", zh: "北极", ar: "القطب الشمالي" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 65,
        question: {
            pt: "O que define o 'Tempo de Planck' na física moderna?",
            en: "What defines 'Planck time' in modern physics?",
            fr: "Qu'est-ce qui définit le 'temps de Planck' en physique moderne?",
            zh: "现代物理学中如何定义 '普朗克时间'?",
            ar: "ما الذي يحدد 'زمن بلانك' في الفيزياء الحديثة؟"
        },
        options: [
            { pt: "Tempo de vida de um átomo", en: "An atom's lifespan", fr: "La durée de vie d'un atome", zh: "原子的寿命", ar: "عمر الذرة" },
            { pt: "Intervalo de tempo mínimo nomeável", en: "Shortest named time interval", fr: "Le plus court intervalle de temps nommé", zh: "最短的命名时间间隔", ar: "أقصر فاصل زمني محدد" },
            { pt: "Tempo que a luz leva para cruzar a galáxia", en: "Time light takes to cross the galaxy", fr: "Le temps que met la lumière pour traverser la galaxie", zh: "光穿过星系所需的时间", ar: "الوقت الذي يستغرقه الضوء ليعبر المجرة" },
            { pt: "Tempo de órbita da Terra", en: "Earth's orbital time", fr: "Temps d'orbite de la Terre", zh: "地球的轨道时间", ar: "زمن مدار الأرض" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 66,
        question: {
            pt: "Qual elemento químico foi formalmente descoberto por Joseph Priestley em 1774?",
            en: "Which chemical element was formally discovered by Joseph Priestley in 1774?",
            fr: "Quel élément chimique a été formellement découvert par Joseph Priestley en 1774?",
            zh: "1774 年约瑟夫·普利斯特里正式发现了哪种化学元素?",
            ar: "أي عنصر كيميائي اكتشفه جوزيف بريستلي رسمياً في عام 1774؟"
        },
        options: [
            { pt: "Hidrogénio", en: "Hydrogen", fr: "Hydrogène", zh: "氢", ar: "هيدروجين" },
            { pt: "Oxigénio", en: "Oxygen", fr: "Oxygène", zh: "氧", ar: "أكسجين" },
            { pt: "Nitrogénio", en: "Nitrogen", fr: "Azote", zh: "氮", ar: "نيتروجين" },
            { pt: "Hélio", en: "Helium", fr: "Hélium", zh: "氦", ar: "هيليوم" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 67,
        question: {
            pt: "Qual lua de Saturno é famosa por possuir um ciclo de metano semelhante ao ciclo da água na Terra?",
            en: "Which moon of Saturn is famous for having a methane cycle similar to Earth's water cycle?",
            fr: "Quelle lune de Saturne est célèbre pour avoir un cycle du méthane similaire au cycle de l'eau sur Terre?",
            zh: "土星的哪颗卫星因拥有类似于地球水循环的甲烷循环而闻名?",
            ar: "أي قمر من أقمار زحل يشتهر بوجود دورة ميثان مشابهة لدورة المياه على الأرض؟"
        },
        options: [
            { pt: "Encélado", en: "Enceladus", fr: "Encelade", zh: "土卫二", ar: "إنسيلادوس" },
            { pt: "Titã", en: "Titan", fr: "Titan", zh: "泰坦", ar: "تيتان" },
            { pt: "Mimas", en: "Mimas", fr: "Mimas", zh: "弥玛斯", ar: "ميمات" },
            { pt: "Reia", en: "Rhea", fr: "Rhea", zh: "利亚", ar: "ريا" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 68,
        question: {
            pt: "Qual é o termo médico para o processo de descamação ou 'troca' de pele?",
            en: "What is the medical term for the process of skin peeling or 'shedding'?",
            fr: "Quel est le terme médical pour le processus de desquamation ou de 'perte' de peau?",
            zh: "皮肤剥落或 '蜕皮' 过程的医学术语是什么?",
            ar: "ما هو المصطلح الطبي لعملية تقشير الجلد أو 'تساقطه'؟"
        },
        options: [
            { pt: "Dermatite", en: "Dermatitis", fr: "Dermatite", zh: "皮炎", ar: "التهاب الجلد" },
            { pt: "Desquamação", en: "Desquamation", fr: "Desquamation", zh: "脱皮", ar: "تقشر" },
            { pt: "Epidermólise", en: "Epidermolysis", fr: "Épidermolyse", zh: "表皮松解症", ar: "انحلال البشرة" },
            { pt: "Psoríase", en: "Psoriasis", fr: "Psoriasis", zh: "牛皮癣", ar: "صدفية" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 69,
        question: {
            pt: "Em graus Celsius, qual é aproximadamente o ponto de fusão do ouro?",
            en: "In Celsius, what is approximately the melting point of gold?",
            fr: "En Celsius, quel est approximativement le point de fusion de l'or?",
            zh: "金的熔点大约是多少摄氏度?",
            ar: "بدرجات مئوية ، ما هي تقريباً درجة انصهار الذهب؟"
        },
        options: [
            { pt: "850 °C", en: "850 °C", fr: "850 °C", zh: "850 °C", ar: "850 درجة مئوية" },
            { pt: "1064 °C", en: "1064 °C", fr: "1064 °C", zh: "1064 °C", ar: "1064 درجة مئوية" },
            { pt: "1200 °C", en: "1200 °C", fr: "1200 °C", zh: "1200 °C", ar: "1200 درجة مئوية" },
            { pt: "1538 °C", en: "1538 °C", fr: "1538 °C", zh: "1538 °C", ar: "1538 درجة مئوية" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 70,
        question: {
            pt: "Qual é o 'quarto estado da matéria', caracterizado por gás ionizado?",
            en: "What is the 'fourth state of matter', characterized by ionized gas?",
            fr: "Quel est le 'quatrième état de la matière', caractérisé par un gaz ionisé?",
            zh: "什么是 '第四种物态'，其特征是电离气体?",
            ar: "ما هي 'الحالة الرابعة للمادة' التي تتميز بالغاز المتأين؟"
        },
        options: [
            { pt: "Cristal líquido", en: "Liquid crystal", fr: "Cristal liquide", zh: "液晶", ar: "الكريستال السائل" },
            { pt: "Plasma", en: "Plasma", fr: "Plasma", zh: "等离子体", ar: "البلازما" },
            { pt: "Condensado de Bose-Einstein", en: "Bose-Einstein condensate", fr: "Condensat de Bose-Einstein", zh: "玻色-爱因斯坦凝聚态", ar: "تكاثف بوز وأينشتاين" },
            { pt: "Superfluído", en: "Superfluid", fr: "Superfluide", zh: "超流体", ar: "الميوعة الفائقة" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 71,
        question: {
            pt: "Segundo o Guinness, quem sofreu a 'maior perda de fortuna pessoal' da história em 2023?",
            en: "According to Guinness, who suffered the 'largest loss of personal fortune' in history in 2023?",
            fr: "Selon Guinness, qui a subi la 'plus grande perte de fortune personnelle' de l'histoire en 2023?",
            zh: "根据吉尼斯世界纪录，谁在 2023 年遭受了历史上 '最大的个人财富损失'?",
            ar: "وفقاً لموسوعة غينيس ، من عانى من 'أكبر خسارة للثروة الشخصية' في التاريخ في عام 2023؟"
        },
        options: [
            { pt: "Jeff Bezos", en: "Jeff Bezos", fr: "Jeff Bezos", zh: "杰夫·贝佐斯", ar: "جيف بيزوس" },
            { pt: "Elon Musk", en: "Elon Musk", fr: "Elon Musk", zh: "埃隆·马斯克", ar: "إيلون ماسك" },
            { pt: "Mark Zuckerberg", en: "Mark Zuckerberg", fr: "Mark Zuckerberg", zh: "马克·扎克伯格", ar: "مارك زوكربيرج" },
            { pt: "Warren Buffett", en: "Warren Buffett", fr: "Warren Buffett", zh: "沃伦·巴菲特", ar: "وارن بافيت" }
        ],
        correctAnswer: 1,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 72,
        question: {
            pt: "Em 2011, qual empresa de café afirmou ser a primeira a lançar uma plataforma de pagamentos móveis?",
            en: "In 2011, which coffee company claimed to be the first to launch a mobile payments platform?",
            fr: "En 2011, quelle entreprise de café a affirmé être la première à lancer une plateforme de paiements mobiles?",
            zh: "2011 年，哪家咖啡公司声称是第一家推出移动支付平台的公司?",
            ar: "في عام 2011 ، أي شركة قهوة زعمت أنها الأولى في إطلاق منصة مدفوعات عبر الهاتف المحمول؟"
        },
        options: [
            { pt: "Starbucks", en: "Starbucks", fr: "Starbucks", zh: "星巴克", ar: "ستاربكس" },
            { pt: "Nespresso", en: "Nespresso", fr: "Nespresso", zh: "奈斯派索", ar: "نسبريسو" },
            { pt: "Dunkin' Donuts", en: "Dunkin' Donuts", fr: "Dunkin' Donuts", zh: "唐恩都乐", ar: "دنكن دونتس" },
            { pt: "Costa Coffee", en: "Costa Coffee", fr: "Costa Coffee", zh: "哥斯达咖啡", ar: "كوستا كوفي" }
        ],
        correctAnswer: 0,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 73,
        question: {
            pt: "Qual é o termo comum no mercado para um 'high yield bond' (título de alto rendimento)?",
            en: "What is the common market term for a 'high yield bond'?",
            fr: "Quel est le terme courant sur le marché pour un 'high yield bond' ?",
            zh: "市场上对 '高收益债券' 的通用术语是什么?",
            ar: "ما هو المصطلح الشائع في السوق لـ 'سندات عالية العائد'؟"
        },
        options: [
            { pt: "Blue chip bond", en: "Blue chip bond", fr: "Obligation de premier ordre", zh: "蓝筹股债券", ar: "سندات النخبة" },
            { pt: "Junk bond", en: "Junk bond", fr: "Obligation pourrie", zh: "垃圾债券", ar: "سندات غير مرغوب فيها / خردة" },
            { pt: "Penny bond", en: "Penny bond", fr: "Penny bond", zh: "细价债券", ar: "سندات ضئيلة" },
            { pt: "Ghost bond", en: "Ghost bond", fr: "Obligation fantôme", zh: "幻影债券", ar: "سندات وهمية" }
        ],
        correctAnswer: 1,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 74,
        question: {
            pt: "Em finanças, o que representa um 'ponto base' (basis point)?",
            en: "In finance, what does a 'basis point' represent?",
            fr: "En finance, que représente un 'point de base' ?",
            zh: "在金融领域，一个 '基点' (basis point) 代表什么?",
            ar: "في التمويل ، ماذا يمثل 'نقطة أساس'؟"
        },
        options: [
            { pt: "1%", en: "1%", fr: "1%", zh: "1%", ar: "1%" },
            { pt: "0,1%", en: "0.1%", fr: "0,1%", zh: "0.1%", ar: "0.1%" },
            { pt: "0,01%", en: "0.01%", fr: "0,01%", zh: "0.01%", ar: "0.01%" },
            { pt: "0,001%", en: "0.001%", fr: "0,001%", zh: "0.001%", ar: "0.001%" }
        ],
        correctAnswer: 2,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 75,
        question: {
            pt: "Quem ultrapassou Elon Musk como a pessoa mais rica do mundo em 2023?",
            en: "Who surpassed Elon Musk as the richest person in the world in 2023?",
            fr: "Qui a dépassé Elon Musk en tant que personne la plus riche au monde en 2023?",
            zh: "2023 年谁超越埃隆·马斯克成为世界首富?",
            ar: "من تفوق على إيلون ماسك كأغنى شخص في العالم في عام 2023؟"
        },
        options: [
            { pt: "Jeff Bezos", en: "Jeff Bezos", fr: "Jeff Bezos", zh: "杰夫·贝佐斯", ar: "جيف بيزوس" },
            { pt: "Bernard Arnault", en: "Bernard Arnault", fr: "Bernard Arnault", zh: "贝尔纳·阿尔诺", ar: "برنارد أرنو" },
            { pt: "Bill Gates", en: "Bill Gates", fr: "Bill Gates", zh: "比尔·盖茨", ar: "بيل جيتس" },
            { pt: "Warren Buffett", en: "Warren Buffett", fr: "Warren Buffett", zh: "沃伦·巴菲特", ar: "وارن بافيت" }
        ],
        correctAnswer: 1,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 76,
        question: {
            pt: "Qual foi a duração exata da Guerra dos Cem Anos?",
            en: "What was the exact duration of the Hundred Years' War?",
            fr: "Quelle a été la durée exacte de la guerre de Cent Ans ?",
            zh: "百年战争的准确持续时间是多少年?",
            ar: "ما هي المدة الدقيقة لحرب المائة عام؟"
        },
        options: [
            { pt: "100 anos", en: "100 years", fr: "100 ans", zh: "100 年", ar: "100 عام" },
            { pt: "116 anos", en: "116 years", fr: "116 ans", zh: "116 年", ar: "116 عام" },
            { pt: "99 anos", en: "99 years", fr: "99 ans", zh: "99 年", ar: "99 عام" },
            { pt: "105 anos", en: "105 years", fr: "105 ans", zh: "105 年", ar: "105 عام" }
        ],
        correctAnswer: 1,
        category: { pt: "História", en: "History", fr: "Histoire", zh: "历史", ar: "تاريخ" }
    },
    {
        id: 77,
        question: {
            pt: "Quem foi o último czar da Rússia antes da Revolução de 1917?",
            en: "Who was the last Tsar of Russia before the 1917 Revolution?",
            fr: "Qui était le dernier Tsar de Russie avant la Révolution de 1917 ?",
            zh: "1917 年革命前俄罗斯的最后一位沙皇是谁?",
            ar: "من كان آخر قياصرة روسيا قبل ثورة 1917؟"
        },
        options: [
            { pt: "Alexandre III", en: "Alexander III", fr: "Alexandre III", zh: "亚历山大三世", ar: "ألكسندر الثالث" },
            { pt: "Nicolau II", en: "Nicholas II", fr: "Nicolas II", zh: "尼古拉二世", ar: "نيقولا الثاني" },
            { pt: "Pedro, o Grande", en: "Peter the Great", fr: "Pierre le Grand", zh: "彼得大帝", ar: "بطرس الأكبر" },
            { pt: "Ivan, o Terrível", en: "Ivan the Terrible", fr: "Ivan le Terrible", zh: "伊凡雷帝", ar: "إيفان الرهيب" }
        ],
        correctAnswer: 1,
        category: { pt: "História", en: "History", fr: "Histoire", zh: "历史", ar: "تاريخ" }
    },
    {
        id: 78,
        question: {
            pt: "Qual civilização antiga construiu a cidade de Machu Picchu?",
            en: "Which ancient civilization built the city of Machu Picchu?",
            fr: "Quelle civilisation ancienne a construit la cité de Machu Picchu ?",
            zh: "哪种古代文明建造了马丘比丘城?",
            ar: "أي حضارة قديمة بنت مدينة ماتشو بيتشو؟"
        },
        options: [
            { pt: "Astecas", en: "Aztecs", fr: "Aztèques", zh: "阿兹特克", ar: "الأزتيك" },
            { pt: "Maias", en: "Mayas", fr: "Mayas", zh: "玛雅", ar: "المايا" },
            { pt: "Incas", en: "Incas", fr: "Incas", zh: "印加", ar: "الإنكا" },
            { pt: "Olmecas", en: "Olmecs", fr: "Olmèques", zh: "奥尔梅克", ar: "الأولمك" }
        ],
        correctAnswer: 2,
        category: { pt: "História", en: "History", fr: "Histoire", zh: "历史", ar: "تاريخ" }
    },
    {
        id: 79,
        question: {
            pt: "Qual é o menor país do mundo em área territorial?",
            en: "Which is the smallest country in the world by land area?",
            fr: "Quel est le plus petit pays du monde en termes de superficie ?",
            zh: "按土地面积计算，世界上最小的国家是哪个?",
            ar: "ما هي أصغر دولة في العالم من حيث مساحة الأرض؟"
        },
        options: [
            { pt: "Mónaco", en: "Monaco", fr: "Monaco", zh: "摩纳哥", ar: "موناكو" },
            { pt: "Nauru", en: "Nauru", fr: "Nauru", zh: "瑙鲁", ar: "ناورو" },
            { pt: "Cidade do Vaticano", en: "Vatican City", fr: "Vatican", zh: "梵蒂冈", ar: "مدينة الفاتيكان" },
            { pt: "San Marino", en: "San Marino", fr: "Saint-Marin", zh: "圣马力诺", ar: "سان مارينو" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 80,
        question: {
            pt: "Qual rio atravessa a maior quantidade de países (10 países)?",
            en: "Which river flows through the most countries (10 countries)?",
            fr: "Quel fleuve traverse le plus grand nombre de pays (10 pays) ?",
            zh: "哪条河流流经的国家最多 (10 个国家)?",
            ar: "أي نهر يتدفق عبر أكبر عدد من الدول (10 دول)؟"
        },
        options: [
            { pt: "Rio Nilo", en: "Nile River", fr: "Le Nil", zh: "尼罗河", ar: "نهر النيل" },
            { pt: "Rio Amazonas", en: "Amazon River", fr: "L'Amazone", zh: "亚马逊河", ar: "نهر الأمازون" },
            { pt: "Rio Danúbio", en: "Danube River", fr: "Le Danube", zh: "多瑙河", ar: "نهر الدانوب" },
            { pt: "Rio Mekong", en: "Mekong River", fr: "Le Mékong", zh: "湄公河", ar: "نهر ميكونغ" }
        ],
        correctAnswer: 2,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 81,
        question: {
            pt: "Em que país se situa o ponto mais baixo da Terra (Mar Morto)?",
            en: "In which country is the lowest point on Earth (Dead Sea) located?",
            fr: "Dans quel pays se situe le point le plus bas de la Terre (Mer Morte) ?",
            zh: "地球最低点 (死海) 位于哪个国家?",
            ar: "في أي بلد تقع أخفض نقطة على وجه الأرض (البحر الميت)؟"
        },
        options: [
            { pt: "Egito", en: "Egypt", fr: "Égypte", zh: "埃及", ar: "مصر" },
            { pt: "Jordânia", en: "Jordan", fr: "Jordanie", zh: "约旦", ar: "الأردن" },
            { pt: "Turquia", en: "Turkey", fr: "Turquie", zh: "土耳其", ar: "تركيا" },
            { pt: "Grécia", en: "Greece", fr: "Grèce", zh: "希腊", ar: "اليونان" }
        ],
        correctAnswer: 1,
        category: { pt: "Geografia", en: "Geography", fr: "Géographie", zh: "地理", ar: "جغرافيا" }
    },
    {
        id: 82,
        question: {
            pt: "Qual artista pintou 'O Nascimento de Vénus'?",
            en: "Which artist painted 'The Birth of Venus'?",
            fr: "Quel artiste a peint 'La Naissance de Vénus' ?",
            zh: "哪位艺术家创作了《维纳斯的诞生》?",
            ar: "أي فنان رسم 'مولد فينوس'؟"
        },
        options: [
            { pt: "Leonardo da Vinci", en: "Leonardo da Vinci", fr: "Léonard de Vinci", zh: "列奥纳多·达·芬奇", ar: "ليوناردو دا فينشي" },
            { pt: "Sandro Botticelli", en: "Sandro Botticelli", fr: "Sandro Botticelli", zh: "桑德罗·波提切利", ar: "ساندرو بوتيتشيلي" },
            { pt: "Michelangelo", en: "Michelangelo", fr: "Michelangelo", zh: "米开朗基罗", ar: "ميكيلانجيلو" },
            { pt: "Raphael", en: "Raphael", fr: "Raphaël", zh: "拉斐尔", ar: "رافائيل" }
        ],
        correctAnswer: 1,
        category: { pt: "Artes", en: "Arts", fr: "Arts", zh: "艺术", ar: "فنون" }
    },
    {
        id: 83,
        question: {
            pt: "Qual foi o movimento artístico liderado por Claude Monet e Renoir?",
            en: "Which art movement was led by Claude Monet and Renoir?",
            fr: "Quel mouvement artistique a été mené par Claude Monet et Renoir ?",
            zh: "克劳德·莫奈和雷诺阿领导了哪场艺术运动?",
            ar: "ما هي الحركة الفنية التي قادها كلود مونيه ورينوار؟"
        },
        options: [
            { pt: "Surrealismo", en: "Surrealism", fr: "Surréalisme", zh: "超现实主义", ar: "السريالية" },
            { pt: "Impressionismo", en: "Impressionism", fr: "Impressionnisme", zh: "印象派", ar: "الانطباعية" },
            { pt: "Cubismo", en: "Cubism", fr: "Cubisme", zh: "立体主义", ar: "التكعيبية" },
            { pt: "Realismo", en: "Realism", fr: "Réalisme", zh: "现实主义", ar: "الواقعية" }
        ],
        correctAnswer: 1,
        category: { pt: "Artes", en: "Arts", fr: "Arts", zh: "艺术", ar: "فنون" }
    },
    {
        id: 84,
        question: {
            pt: "Em que cidade se encontra o Museu Hermitage?",
            en: "In which city is the Hermitage Museum located?",
            fr: "Dans quelle ville se trouve le musée de l'Ermitage ?",
            zh: "冬宫博物馆位于哪个城市?",
            ar: "في أي مدينة يقع متحف هيرميتاج؟"
        },
        options: [
            { pt: "Moscovo", en: "Moscow", fr: "Moscou", zh: "莫斯科", ar: "موسكو" },
            { pt: "São Petersburgo", en: "Saint Petersburg", fr: "Saint-Pétersbourg", zh: "圣彼得堡", ar: "سانت بطرسبرغ" },
            { pt: "Berlim", en: "Berlin", fr: "Berlin", zh: "柏林", ar: "برلين" },
            { pt: "Paris", en: "Paris", fr: "Paris", zh: "巴黎", ar: "باريس" }
        ],
        correctAnswer: 1,
        category: { pt: "Artes", en: "Arts", fr: "Arts", zh: "艺术", ar: "فنون" }
    },
    {
        id: 85,
        question: {
            pt: "Quem escreveu a épica obra 'A Divina Comédia'?",
            en: "Who wrote the epic work 'The Divine Comedy'?",
            fr: "Qui a écrit l'œuvre épique 'La Divine Comédie' ?",
            zh: "谁创作了史诗巨著《神曲》?",
            ar: "من كتب العمل الملحمي 'الكوميديا الإلهية'؟"
        },
        options: [
            { pt: "Homer", en: "Homer", fr: "Homère", zh: "荷马", ar: "هوميروس" },
            { pt: "Dante Alighieri", en: "Dante Alighieri", fr: "Dante Alighieri", zh: "但丁·阿利吉耶里", ar: "دانتي أليغييري" },
            { pt: "William Shakespeare", en: "William Shakespeare", fr: "William Shakespeare", zh: "威廉·莎士比亚", ar: "ويليام شكسبير" },
            { pt: "Virgil", en: "Virgil", fr: "Virgile", zh: "维吉尔", ar: "فيرجيل" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 86,
        question: {
            pt: "Qual romance de Mary Shelley é considerado um precursor da ficção científica?",
            en: "Which Mary Shelley novel is considered a precursor to science fiction?",
            fr: "Quel roman de Mary Shelley est considéré comme um précurseur de la science-fiction ?",
            zh: "玛丽·雪莱的哪部小说被认为是科幻小说的先驱?",
            ar: "أي رواية لماري شيلي تعتبر سلفاً للخيال العلمي؟"
        },
        options: [
            { pt: "Drácula", en: "Dracula", fr: "Dracula", zh: "德古拉", ar: "دراكولا" },
            { pt: "Frankenstein", en: "Frankenstein", fr: "Frankenstein", zh: "弗兰肯斯坦", ar: "فرانكنشتاين" },
            { pt: "O Homem Invisível", en: "The Invisible Man", fr: "L'Homme invisible", zh: "隐形人", ar: "الرجل الخفي" },
            { pt: "Jane Eyre", en: "Jane Eyre", fr: "Jane Eyre", zh: "简·爱", ar: "جين آير" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 87,
        question: {
            pt: "Quem é o autor de 'Cem Anos de Solidão'?",
            en: "Who is the author of 'One Hundred Years of Solitude'?",
            fr: "Qui est l'auteur de 'Cent ans de solitude' ?",
            zh: "《百年孤独》的作者是谁?",
            ar: "من هو مؤلف 'مائة عام من العزلة'؟"
        },
        options: [
            { pt: "Jorge Luis Borges", en: "Jorge Luis Borges", fr: "Jorge Luis Borges", zh: "豪尔赫·路易斯·博尔赫斯", ar: "خورخي لويس بورخيس" },
            { pt: "Gabriel García Márquez", en: "Gabriel García Márquez", fr: "Gabriel García Márquez", zh: "加夫列尔·加西亚·马尔克斯", ar: "غابرييل غارثيا ماركيث" },
            { pt: "Pablo Neruda", en: "Pablo Neruda", fr: "Pablo Neruda", zh: "巴勃罗·聂鲁达", ar: "بابلونيرودا" },
            { pt: "Isabel Allende", en: "Isabel Allende", fr: "Isabel Allende", zh: "伊莎贝尔·阿连德", ar: "إيزابيل الليندي" }
        ],
        correctAnswer: 1,
        category: { pt: "Literatura", en: "Literature", fr: "Littérature", zh: "文学", ar: "أدب" }
    },
    {
        id: 88,
        question: {
            pt: "Qual é o único metal que se mantém líquido em temperatura ambiente?",
            en: "What is the only metal that remains liquid at room temperature?",
            fr: "Quel est le seul métal qui reste liquide à température ambiante ?",
            zh: "室温下唯一保持液态的金属是什么?",
            ar: "ما هو المعدن الوحيد الذي يبقى سائلاً في درجة حرارة الغرفة؟"
        },
        options: [
            { pt: "Prata", en: "Silver", fr: "Argent", zh: "银", ar: "الفضة" },
            { pt: "Cobre", en: "Copper", fr: "Cuivre", zh: "铜", ar: "النحاس" },
            { pt: "Mercúrio", en: "Mercury", fr: "Mercure", zh: "汞", ar: "الزئبق" },
            { pt: "Estanho", en: "Tin", fr: "Étain", zh: "锡", ar: "القصدير" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 89,
        question: {
            pt: "Quantos corações tem um polvo?",
            en: "How many hearts does an octopus have?",
            fr: "Combien de cœurs a un poulpe ?",
            zh: "章鱼有多少个心脏?",
            ar: "كم قلباً للأخطبوط؟"
        },
        options: [
            { pt: "1", en: "1", fr: "1", zh: "1", ar: "1" },
            { pt: "2", en: "2", fr: "2", zh: "2", ar: "2" },
            { pt: "3", en: "3", fr: "3", zh: "3", ar: "3" },
            { pt: "4", en: "4", fr: "4", zh: "4", ar: "4" }
        ],
        correctAnswer: 2,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 90,
        question: {
            pt: "Quem descobriu a penicilina em 1928?",
            en: "Who discovered penicillin in 1928?",
            fr: "Qui a découvert la pénicilline en 1928 ?",
            zh: "谁在 1928 年发现了青霉素?",
            ar: "من اكتشف البنسلين في عام 1928؟"
        },
        options: [
            { pt: "Louis Pasteur", en: "Louis Pasteur", fr: "Louis Pasteur", zh: "路易·巴斯德", ar: "لويس باستور" },
            { pt: "Alexander Fleming", en: "Alexander Fleming", fr: "Alexander Fleming", zh: "亚历山大·弗莱明", ar: "ألكسندر فليمنج" },
            { pt: "Marie Curie", en: "Marie Curie", fr: "Marie Curie", zh: "玛丽·居里", ar: "ماري كوري" },
            { pt: "Robert Koch", en: "Robert Koch", fr: "Robert Koch", zh: "罗伯特·科赫", ar: "روبرت كوخ" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 91,
        question: {
            pt: "Qual é o valor aproximado da velocidade da luz no vácuo?",
            en: "What is the approximate value of the speed of light in a vacuum?",
            fr: "Quelle est la valeur approximative de la vitesse de la lumière dans le vide ?",
            zh: "真空中近似的光速是多少?",
            ar: "ما هي القيمة التقريبية لسرعة الضوء في الفراغ؟"
        },
        options: [
            { pt: "200.000 km/s", en: "200,000 km/s", fr: "200 000 km/s", zh: "200,000 km/s", ar: "200,000 كم/ثانية" },
            { pt: "300.000 km/s", en: "300,000 km/s", fr: "300 000 km/s", zh: "300,000 km/s", ar: "300,000 كم/ثانية" },
            { pt: "400.000 km/s", en: "400,000 km/s", fr: "400 000 km/s", zh: "400,000 km/s", ar: "400,000 كم/ثانية" },
            { pt: "150.000 km/s", en: "150,000 km/s", fr: "150 000 km/s", zh: "150,000 km/s", ar: "150,000 كم/ثانية" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 92,
        question: {
            pt: "Qual planeta do sistema solar tem a maior quantidade de luas?",
            en: "Which planet in the solar system has the most moons?",
            fr: "Quelle planète du système solaire possède le plus de lunes ?",
            zh: "太阳系中哪颗行星的卫星最多?",
            ar: "أي كوكب في النظام الشمسي لديه أكبر عدد من الأقمار؟"
        },
        options: [
            { pt: "Júpiter", en: "Jupiter", fr: "Jupiter", zh: "木星", ar: "المشتري" },
            { pt: "Saturno", en: "Saturn", fr: "Saturne", zh: "土星", ar: "زحل" },
            { pt: "Urano", en: "Uranus", fr: "Uranus", zh: "天王星", ar: "أورانوس" },
            { pt: "Neptuno", en: "Neptune", fr: "Neptune", zh: "海王星", ar: "نبتون" }
        ],
        correctAnswer: 1,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 93,
        question: {
            pt: "Quem formulou as leis da hereditariedade em genética?",
            en: "Who formulated the laws of heredity in genetics?",
            fr: "Qui a formulé les lois de l'hérédité en génétique ?",
            zh: "谁制定了遗传学的遗传规律?",
            ar: "من صيغ قوانين الوراثة في علم الوراثة؟"
        },
        options: [
            { pt: "Gregor Mendel", en: "Gregor Mendel", fr: "Gregor Mendel", zh: "格雷戈尔·孟德尔", ar: "غريغور مندل" },
            { pt: "Charles Darwin", en: "Charles Darwin", fr: "Charles Darwin", zh: "查尔斯·达尔文", ar: "تشارلز داروين" },
            { pt: "James Watson", en: "James Watson", fr: "James Watson", zh: "詹姆斯·沃森", ar: "جيمس واتسون" },
            { pt: "Francis Crick", en: "Francis Crick", fr: "Francis Crick", zh: "弗朗西斯·克里克", ar: "فرانسيس كريك" }
        ],
        correctAnswer: 0,
        category: { pt: "Ciência", en: "Science", fr: "Science", zh: "科学", ar: "علوم" }
    },
    {
        id: 94,
        question: {
            pt: "Qual é o país que possui a maior reserva de petróleo do mundo?",
            en: "Which country has the largest oil reserves in the world?",
            fr: "Quel pays possède les plus grandes réserves de pétrole au monde ?",
            zh: "哪个国家拥有世界上最大的石油储量?",
            ar: "أي دولة لديها أكبر احتياطيات نفطية في العالم؟"
        },
        options: [
            { pt: "Arábia Saudita", en: "Saudi Arabia", fr: "Arabie saoudite", zh: "沙特阿拉伯", ar: "المملكة العربية السعودية" },
            { pt: "Rússia", en: "Russia", fr: "Russie", zh: "俄罗斯", ar: "روسيا" },
            { pt: "Venezuela", en: "Venezuela", fr: "Venezuela", zh: "委内瑞拉", ar: "فنزويلا" },
            { pt: "Estados Unidos", en: "United States", fr: "États-Unis", zh: "美国", ar: "الولايات المتحدة" }
        ],
        correctAnswer: 2,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 95,
        question: {
            pt: "Quem é o fundador da Amazon?",
            en: "Who is the founder of Amazon?",
            fr: "Qui est le fondateur d'Amazon ?",
            zh: "亚马逊的创始人是谁?",
            ar: "من هو مؤسس أمازون؟"
        },
        options: [
            { pt: "Bill Gates", en: "Bill Gates", fr: "Bill Gates", zh: "比尔·盖茨", ar: "بيل جيتس" },
            { pt: "Steve Jobs", en: "Steve Jobs", fr: "Steve Jobs", zh: "史蒂夫·乔布斯", ar: "ستيف جوبز" },
            { pt: "Jeff Bezos", en: "Jeff Bezos", fr: "Jeff Bezos", zh: "杰夫·贝佐斯", ar: "جيف بيزوس" },
            { pt: "Jack Ma", en: "Jack Ma", fr: "Jack Ma", zh: "马云", ar: "جاك ما" }
        ],
        correctAnswer: 2,
        category: { pt: "Negócios", en: "Business", fr: "Affaires", zh: "商业", ar: "أعمال" }
    },
    {
        id: 96,
        question: {
            pt: "Qual empresa tecnológica é a fabricante do processador 'Ryzen'?",
            en: "Which tech company manufactures the 'Ryzen' processor?",
            fr: "Quelle entreprise technologique fabrique le processeur 'Ryzen' ?",
            zh: "哪家技术公司制造了 'Ryzen' 处理器?",
            ar: "أي شركة تقنية تصنع معالج 'Ryzen'؟"
        },
        options: [
            { pt: "Intel", en: "Intel", fr: "Intel", zh: "英特尔", ar: "إنتل" },
            { pt: "AMD", en: "AMD", fr: "AMD", zh: "AMD", ar: "AMD" },
            { pt: "Nvidia", en: "Nvidia", fr: "Nvidia", zh: "英伟达", ar: "نيفيديا" },
            { pt: "Samsung", en: "Samsung", fr: "Samsung", zh: "三星", ar: "سامسونج" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 97,
        question: {
            pt: "Em que ano foi lançado o primeiro iPhone?",
            en: "In what year was the first iPhone released?",
            fr: "En quelle année le premier iPhone est-il sorti ?",
            zh: "第一代 iPhone 是在哪一年发布的?",
            ar: "في أي عام تم إصدار أول هاتف آيفون؟"
        },
        options: [
            { pt: "2005", en: "2005", fr: "2005", zh: "2005", ar: "2005" },
            { pt: "2007", en: "2007", fr: "2007", zh: "2007", ar: "2007" },
            { pt: "2008", en: "2008", fr: "2008", zh: "2008", ar: "2008" },
            { pt: "2010", en: "2010", fr: "2010", zh: "2010", ar: "2010" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 98,
        question: {
            pt: "Qual é o sistema operacional de código aberto criado por Linus Torvalds?",
            en: "What is the open-source operating system created by Linus Torvalds?",
            fr: "Quel est le système d'exploitation à code ouvert créé par Linus Torvalds ?",
            zh: "林纳斯·托瓦兹创建的开源操作系统是什么?",
            ar: "ما هو نظام التشغيل مفتوح المصدر الذي أنشأه لينوس تورفالدس؟"
        },
        options: [
            { pt: "Windows", en: "Windows", fr: "Windows", zh: "Windows", ar: "ويندوز" },
            { pt: "macOS", en: "macOS", fr: "macOS", zh: "macOS", ar: "ماك" },
            { pt: "Linux", en: "Linux", fr: "Linux", zh: "Linux", ar: "لينكس" },
            { pt: "Android", en: "Android", fr: "Android", zh: "Android", ar: "أندرويد" }
        ],
        correctAnswer: 2,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 99,
        question: {
            pt: "Qual entidade regula os domínios da Internet globalmente?",
            en: "Which entity regulates Internet domains globally?",
            fr: "Quelle entité régule les domaines Internet à l'échelle mondiale ?",
            zh: "哪个机构在全球范围内监管互联网域名?",
            ar: "أي جهة تنظم نطاقات الإنترنت عالمياً؟"
        },
        options: [
            { pt: "W3C", en: "W3C", fr: "W3C", zh: "W3C", ar: "W3C" },
            { pt: "ICANN", en: "ICANN", fr: "ICANN", zh: "ICANN", ar: "إيكان" },
            { pt: "IEEE", en: "IEEE", fr: "IEEE", zh: "IEEE", ar: "IEEE" },
            { pt: "ISO", en: "ISO", fr: "ISO", zh: "ISO", ar: "ISO" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    },
    {
        id: 100,
        question: {
            pt: "Qual foi o primeiro domínio '.com' registrado na história?",
            en: "What was the first '.com' domain registered in history?",
            fr: "Quel a été le premier domaine '.com' enregistré dans l'histoire ?",
            zh: "历史上第一个注册的 '.com' 域名是什么?",
            ar: "ما هو أول نطاق '.com' تم تسجيله في التاريخ؟"
        },
        options: [
            { pt: "google.com", en: "google.com", fr: "google.com", zh: "google.com", ar: "google.com" },
            { pt: "symbolics.com", en: "symbolics.com", fr: "symbolics.com", zh: "symbolics.com", ar: "symbolics.com" },
            { pt: "apple.com", en: "apple.com", fr: "apple.com", zh: "apple.com", ar: "apple.com" },
            { pt: "ibm.com", en: "ibm.com", fr: "ibm.com", zh: "ibm.com", ar: "ibm.com" }
        ],
        correctAnswer: 1,
        category: { pt: "Tecnologia", en: "Technology", fr: "Technologie", zh: "技术", ar: "تكنولوجيا" }
    }
];
