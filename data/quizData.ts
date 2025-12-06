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
    }
];
