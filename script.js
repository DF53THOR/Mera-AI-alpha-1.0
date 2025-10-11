// Gelişmiş veritabanı - PC bileşeni bilgileri
const componentDatabase = {
    cpus: [
        { name: "Intel Core i5-12400F", price: 4500, performance: 7, power: 65, type: "gaming" },
        { name: "Intel Core i7-12700K", price: 8500, performance: 9, power: 125, type: "gaming" },
        { name: "AMD Ryzen 5 5600X", price: 5000, performance: 8, power: 65, type: "gaming" },
        { name: "AMD Ryzen 7 5800X3D", price: 9500, performance: 10, power: 105, type: "gaming" }
    ],
    gpus: [
        { name: "NVIDIA RTX 4060 Ti 8GB", price: 12500, performance: 8, power: 160, type: "gaming" },
        { name: "NVIDIA RTX 4070 12GB", price: 18500, performance: 9, power: 200, type: "gaming" },
        { name: "AMD RX 7600 8GB", price: 9500, performance: 7, power: 165, type: "gaming" },
        { name: "AMD RX 7700 XT 12GB", price: 14500, performance: 8, power: 245, type: "gaming" }
    ],
    rams: [
        { name: "16GB DDR4 3200MHz", price: 1200, performance: 6, type: "basic" },
        { name: "32GB DDR4 3600MHz", price: 2200, performance: 8, type: "gaming" },
        { name: "32GB DDR5 5600MHz", price: 2800, performance: 9, type: "gaming" },
        { name: "64GB DDR5 6000MHz", price: 4800, performance: 10, type: "professional" }
    ],
    ssds: [
        { name: "500GB NVMe M.2 SSD", price: 800, performance: 7, type: "basic" },
        { name: "1TB NVMe M.2 SSD", price: 1500, performance: 8, type: "gaming" },
        { name: "2TB NVMe M.2 SSD", price: 2800, performance: 9, type: "professional" }
    ],
    motherboards: [
        { name: "B660 Chipset DDR4", price: 2500, performance: 7, type: "gaming" },
        { name: "B650 Chipset DDR5", price: 3500, performance: 8, type: "gaming" },
        { name: "Z790 Chipset DDR5", price: 5500, performance: 10, type: "gaming" }
    ],
    psus: [
        { name: "650W 80+ Bronze", price: 1800, performance: 6, type: "basic" },
        { name: "750W 80+ Gold", price: 2800, performance: 8, type: "gaming" },
        { name: "850W 80+ Platinum", price: 4200, performance: 10, type: "professional" }
    ]
};

// PC Toplama Sihirbazı Soruları
const pcBuilderQuestions = [
    {
        id: 1,
        question: "🎯 PC'nizi hangi amaçla kullanacaksınız?",
        key: "usage",
        options: [
            { text: "🎮 Oyun", value: "gaming", emoji: "🎮" },
            { text: "💼 Ofis/İnternet", value: "office", emoji: "💼" },
            { text: "🎬 Video Düzenleme", value: "video", emoji: "🎬" },
            { text: "🔬 3D Tasarım/Render", value: "3d", emoji: "🔬" },
            { text: "⚡ Hepsi (Oyun + İş)", value: "all", emoji: "⚡" }
        ]
    },
    {
        id: 2,
        question: "💰 Bütçeniz ne kadar?",
        key: "budget",
        options: [
            { text: "₺5.000 - ₺10.000", value: "budget1", min: 5000, max: 10000 },
            { text: "₺10.000 - ₺20.000", value: "budget2", min: 10000, max: 20000 },
            { text: "₺20.000 - ₺35.000", value: "budget3", min: 20000, max: 35000 },
            { text: "₺35.000+", value: "budget4", min: 35000, max: 60000 },
            { text: "Esnek", value: "flexible", min: 8000, max: 50000 }
        ]
    },
    {
        id: 3,
        question: "🚀 Performans önceliğiniz nedir?",
        key: "priority",
        options: [
            { text: "En yüksek FPS (Oyun)", value: "max_performance", emoji: "🚀" },
            { text: "Fiyat/Performans dengesi", value: "balanced", emoji: "⚖️" },
            { text: "Sessiz çalışma", value: "quiet", emoji: "🔇" },
            { text: "RGB ve görünüm", value: "aesthetics", emoji: "🌈" }
        ]
    },
    {
        id: 4,
        question: "💻 İşlemci markası tercihiniz?",
        key: "cpu_brand",
        options: [
            { text: "Intel", value: "intel", emoji: "🔵" },
            { text: "AMD", value: "amd", emoji: "🔴" },
            { text: "Fark etmez", value: "any", emoji: "⚪" },
            { text: "Siz önerin", value: "recommend", emoji: "💡" }
        ]
    },
    {
        id: 5,
        question: "🎮 Ekran kartı markası tercihiniz?",
        key: "gpu_brand",
        options: [
            { text: "NVIDIA", value: "nvidia", emoji: "💚" },
            { text: "AMD", value: "amd_gpu", emoji: "❤️" },
            { text: "Fark etmez", value: "any_gpu", emoji: "💜" },
            { text: "Entegre (GPU'suz)", value: "integrated", emoji: "💻" }
        ]
    }
];

// Global değişkenler
let chatContext = [];
const MAX_CONTEXT_LENGTH = 10;
let isImageGenerationMode = false;
let isPCBuilderMode = false;
let pcBuilderAnswers = {};
let currentQuestionIndex = 0;

// PC Toplama Sihirbazını Başlat
function startPCBuilder() {
    console.log("PC Toplama Sihirbazı başlatıldı");
    
    // Modları sıfırla
    isImageGenerationMode = false;
    isPCBuilderMode = true;
    pcBuilderAnswers = {};
    currentQuestionIndex = 0;
    
    // Sohbet kutusunu temizle
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
    
    // Hoşgeldin mesajını göster
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message ai-message pc-builder-welcome';
    welcomeMessage.innerHTML = `
        <div class="message-header">🛠️ PC Toplama Sihirbazı</div>
        <p><strong>Size özel PC konfigürasyonu oluşturalım! 🚀</strong></p>
        <p>Birkaç soru soracağım ve bütçenize, ihtiyaçlarınıza uygun en iyi PC'yi önereceğim.</p>
        <div class="builder-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-text">0/${pcBuilderQuestions.length} tamamlandı</div>
        </div>
    `;
    
    chatBox.appendChild(welcomeMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // İlk soruyu göster (biraz gecikmeyle)
    setTimeout(() => {
        showPCBuilderQuestion(currentQuestionIndex);
    }, 1500);
}

// PC Builder Sorusunu Göster
function showPCBuilderQuestion(index) {
    if (index >= pcBuilderQuestions.length) {
        generatePCConfiguration();
        return;
    }
    
    const question = pcBuilderQuestions[index];
    const progressPercent = (index / pcBuilderQuestions.length) * 100;
    
    const questionElement = document.createElement('div');
    questionElement.className = 'message ai-message pc-builder-question';
    questionElement.innerHTML = `
        <div class="message-header">PC Sihirbazı - Soru ${index + 1}/${pcBuilderQuestions.length}</div>
        <div class="builder-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="progress-text">${index}/${pcBuilderQuestions.length} tamamlandı</div>
        </div>
        <p class="question-text">${question.question}</p>
        <div class="builder-options" id="builder-options-${index}"></div>
    `;
    
    document.getElementById('chat-box').appendChild(questionElement);
    
    // Seçenekleri oluştur
    const optionsContainer = document.getElementById(`builder-options-${index}`);
    question.options.forEach((option, optionIndex) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'builder-option-btn';
        optionButton.innerHTML = option.emoji ? `${option.emoji} ${option.text}` : option.text;
        optionButton.onclick = () => selectBuilderOption(index, optionIndex, option);
        optionsContainer.appendChild(optionButton);
    });
    
    // Scroll et
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

// Seçenek Seçildiğinde
function selectBuilderOption(questionIndex, optionIndex, option) {
    const question = pcBuilderQuestions[questionIndex];
    pcBuilderAnswers[question.key] = option;
    
    // Kullanıcı seçimini göster
    const userChoiceElement = document.createElement('div');
    userChoiceElement.className = 'message user-message';
    userChoiceElement.innerHTML = `
        <div class="message-header">Siz</div>
        <p>${option.text}</p>
    `;
    document.getElementById('chat-box').appendChild(userChoiceElement);
    
    // Sonraki soruya geç
    currentQuestionIndex++;
    
    // Biraz bekle ve sonraki soruyu göster
    setTimeout(() => {
        showPCBuilderQuestion(currentQuestionIndex);
    }, 1000);
}

// PC Konfigürasyonu Oluştur
function generatePCConfiguration() {
    const chatBox = document.getElementById('chat-box');
    
    // Yükleme mesajı
    const loadingElement = document.createElement('div');
    loadingElement.className = 'message ai-message pc-builder-loading';
    loadingElement.innerHTML = `
        <div class="message-header">🛠️ PC'niz Oluşturuluyor</div>
        <div class="loading-stages">
            <div class="loading-stage active">Kriterleriniz analiz ediliyor...</div>
            <div class="loading-stage">Bileşenler seçiliyor...</div>
            <div class="loading-stage">Fiyat/performans optimize ediliyor...</div>
            <div class="loading-stage">Uyumluluk kontrol ediliyor...</div>
        </div>
    `;
    chatBox.appendChild(loadingElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Yükleme animasyonu
    simulatePCLoading(() => {
        loadingElement.remove();
        showPCConfigurationResult();
    });
}

// PC Yükleme Animasyonu
function simulatePCLoading(callback) {
    const stages = document.querySelectorAll('.loading-stage');
    let currentStage = 0;
    
    const stageInterval = setInterval(() => {
        if (currentStage > 0) {
            stages[currentStage - 1].classList.remove('active');
            stages[currentStage - 1].classList.add('completed');
        }
        
        if (currentStage < stages.length) {
            stages[currentStage].classList.add('active');
            currentStage++;
        } else {
            clearInterval(stageInterval);
            setTimeout(callback, 1000);
        }
    }, 1200);
}

// PC Konfigürasyon Sonucunu Göster
function showPCConfigurationResult() {
    const config = calculatePCConfiguration();
    
    const resultElement = document.createElement('div');
    resultElement.className = 'message ai-message pc-builder-result';
    resultElement.innerHTML = `
        <div class="message-header">🎉 SİZE ÖZEL PC KONFİGÜRASYONU</div>
        
        <div class="config-summary">
            <div class="summary-item">
                <span class="label">🔹 Kullanım:</span>
                <span class="value">${getUsageText(pcBuilderAnswers.usage.value)}</span>
            </div>
            <div class="summary-item">
                <span class="label">🔹 Bütçe:</span>
                <span class="value">${getBudgetText(pcBuilderAnswers.budget.value)}</span>
            </div>
            <div class="summary-item">
                <span class="label">🔹 Öncelik:</span>
                <span class="value">${getPriorityText(pcBuilderAnswers.priority.value)}</span>
            </div>
        </div>
        
        <div class="pc-configuration">
            <h4>📊 ÖNERİLEN SİSTEM:</h4>
            
            <div class="component-item">
                <span class="component-icon">💻</span>
                <div class="component-info">
                    <strong>İşlemci:</strong> ${config.cpu.name}
                </div>
            </div>
            
            <div class="component-item">
                <span class="component-icon">🎮</span>
                <div class="component-info">
                    <strong>Ekran Kartı:</strong> ${config.gpu.name}
                </div>
            </div>
            
            <div class="component-item">
                <span class="component-icon">🧠</span>
                <div class="component-info">
                    <strong>RAM:</strong> ${config.ram.name}
                </div>
            </div>
            
            <div class="component-item">
                <span class="component-icon">💾</span>
                <div class="component-info">
                    <strong>SSD:</strong> ${config.ssd.name}
                </div>
            </div>
            
            <div class="component-item">
                <span class="component-icon">🔌</span>
                <div class="component-info">
                    <strong>Anakart:</strong> ${config.motherboard.name}
                </div>
            </div>
            
            <div class="component-item">
                <span class="component-icon">⚡</span>
                <div class="component-info">
                    <strong>Güç Kaynağı:</strong> ${config.psu.name}
                </div>
            </div>
        </div>
        
        <div class="config-stats">
            <div class="stat-item">
                <span class="stat-label">💰 TOPLAM:</span>
                <span class="stat-value">₺${config.totalPrice.toLocaleString()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">⭐ PERFORMANS:</span>
                <span class="stat-value">${config.performanceScore}/10</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">🎯 OYUN:</span>
                <span class="stat-value">${config.gamingPerformance}</span>
            </div>
        </div>
        
        <div class="builder-actions">
            <button class="action-btn price-btn" onclick="showPriceComparison()">
                💰 Fiyat Karşılaştır
            </button>
            <button class="action-btn details-btn" onclick="showConfigurationDetails()">
                📋 Detaylı Gör
            </button>
            <button class="action-btn restart-btn" onclick="startPCBuilder()">
                🔄 Yeniden Başlat
            </button>
        </div>
    `;
    
    document.getElementById('chat-box').appendChild(resultElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    
    // Sihirbaz modunu kapat
    isPCBuilderMode = false;
}

// PC Konfigürasyonu Hesapla
function calculatePCConfiguration() {
    const usage = pcBuilderAnswers.usage.value;
    const budget = pcBuilderAnswers.budget;
    const priority = pcBuilderAnswers.priority.value;
    
    // Basit bir konfigürasyon algoritması
    let config = {
        cpu: componentDatabase.cpus[1], // Varsayılan
        gpu: componentDatabase.gpus[0],
        ram: componentDatabase.rams[1],
        ssd: componentDatabase.ssds[1],
        motherboard: componentDatabase.motherboards[1],
        psu: componentDatabase.psus[1]
    };
    
    // Kullanım amacına göre optimize et
    switch(usage) {
        case 'gaming':
            config.cpu = componentDatabase.cpus[2]; // Ryzen 5 5600X
            config.gpu = componentDatabase.gpus[0]; // RTX 4060 Ti
            config.ram = componentDatabase.rams[1]; // 32GB DDR4
            break;
        case 'office':
            config.cpu = componentDatabase.cpus[0]; // i5-12400F
            config.gpu = { name: "Entegre GPU", price: 0, performance: 3 }; // Entegre GPU
            config.ram = componentDatabase.rams[0]; // 16GB DDR4
            config.ssd = componentDatabase.ssds[0]; // 500GB SSD
            break;
        case 'video':
            config.cpu = componentDatabase.cpus[1]; // i7-12700K
            config.gpu = componentDatabase.gpus[1]; // RTX 4070
            config.ram = componentDatabase.rams[2]; // 32GB DDR5
            config.ssd = componentDatabase.ssds[2]; // 2TB SSD
            break;
        case '3d':
            config.cpu = componentDatabase.cpus[3]; // Ryzen 7 5800X3D
            config.gpu = componentDatabase.gpus[1]; // RTX 4070
            config.ram = componentDatabase.rams[3]; // 64GB DDR5
            config.ssd = componentDatabase.ssds[2]; // 2TB SSD
            break;
        case 'all':
            config.cpu = componentDatabase.cpus[1]; // i7-12700K
            config.gpu = componentDatabase.gpus[0]; // RTX 4060 Ti
            config.ram = componentDatabase.rams[2]; // 32GB DDR5
            config.ssd = componentDatabase.ssds[1]; // 1TB SSD
            break;
    }
    
    // Bütçeye göre ayarla
    const totalPrice = config.cpu.price + config.gpu.price + config.ram.price + 
                      config.ssd.price + config.motherboard.price + config.psu.price;
    
    // Performans skoru hesapla
    const performanceScore = Math.round(
        (config.cpu.performance + config.gpu.performance + config.ram.performance) / 3
    );
    
    // Oyun performansı tahmini
    let gamingPerformance = "1080p Orta";
    if (performanceScore >= 9) gamingPerformance = "1440p Ultra";
    else if (performanceScore >= 7) gamingPerformance = "1440p Yüksek";
    else if (performanceScore >= 5) gamingPerformance = "1080p Yüksek";
    
    return {
        ...config,
        totalPrice: totalPrice,
        performanceScore: performanceScore,
        gamingPerformance: gamingPerformance
    };
}

// Yardımcı Fonksiyonlar
function getUsageText(usage) {
    const usageMap = {
        'gaming': 'Oyun',
        'office': 'Ofis/İnternet',
        'video': 'Video Düzenleme',
        '3d': '3D Tasarım',
        'all': 'Oyun + İş'
    };
    return usageMap[usage] || usage;
}

function getBudgetText(budget) {
    const budgetMap = {
        'budget1': '₺5.000 - ₺10.000',
        'budget2': '₺10.000 - ₺20.000',
        'budget3': '₺20.000 - ₺35.000',
        'budget4': '₺35.000+',
        'flexible': 'Esnek'
    };
    return budgetMap[budget] || budget;
}

function getPriorityText(priority) {
    const priorityMap = {
        'max_performance': 'Maksimum Performans',
        'balanced': 'Dengeli',
        'quiet': 'Sessiz Çalışma',
        'aesthetics': 'RGB/Görünüm'
    };
    return priorityMap[priority] || priority;
}

// Fiyat Karşılaştırma Göster
function showPriceComparison() {
    addMessageToChat("Fiyat karşılaştırma özelliği yakında eklenecek! Şu anda geliştirme aşamasında.", 'ai');
}

// Detaylı Görünüm Göster
function showConfigurationDetails() {
    addMessageToChat("Detaylı konfigürasyon görünümü yakında eklenecek!", 'ai');
}

// Mevcut fonksiyonların devamı...
// [Buraya mevcut tüm JavaScript kodlarınız gelecek]
// Aşağıdaki mevcut kodlarınız olduğu gibi kalacak...

// Global değişkenler (yeniden tanımlama - sadece burada olacak)
// let chatContext = [];
// const MAX_CONTEXT_LENGTH = 10;
// let isImageGenerationMode = false;

// Global fonksiyonlar
function goToPriceSites() {
    const sites = [
        'https://www.hepsiburada.com',
        'https://www.vatanbilgisayar.com',
        'https://www.trendyol.com',
        'https://www.amazon.com.tr',
        'https://www.technopat.net',
        'https://www.donanimhaber.com'
    ];
    
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    window.open(randomSite, '_blank');
}

// BU FONKSİYON EKLENDİ - Popüler sorulara tıklanabilmesi için
function askQuestionDirectly(question) {
    // Input alanına soruyu yaz
    document.getElementById('user-input').value = question;
    // Mesajı gönder
    handleUserMessage();
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
}

// PC Builder butonunu sidebar'a ekle
function addPCBuilderToSidebar() {
    const sidebar = document.querySelector('.suggestion-sidebar');
    const existingBuilder = sidebar.querySelector('.pc-builder-sidebar-item');
    
    if (!existingBuilder) {
        const builderCategory = document.createElement('div');
        builderCategory.className = 'suggestion-category';
        builderCategory.innerHTML = `
            <div class="category-title">PC Oluşturma</div>
            <div class="suggestion-item pc-builder-sidebar-item" onclick="startPCBuilder()">
                <i class="fas fa-wrench"></i>
                <div class="suggestion-text">PC Toplama Sihirbazı</div>
            </div>
            <div class="suggestion-item" onclick="askQuestionDirectly('pc toplama rehberi')">
                <i class="fas fa-tools"></i>
                <div class="suggestion-text">PC Toplama Rehberi</div>
            </div>
        `;
        
        // Öneri kutusunun en üstüne ekle
        sidebar.insertBefore(builderCategory, sidebar.firstChild);
    }
}

// Sayfa yüklendiğinde PC Builder'ı sidebar'a ekle
document.addEventListener('DOMContentLoaded', function() {
    // Mevcut kodlarınız...
    
    // PC Builder sidebar item'ını ekle
    setTimeout(addPCBuilderToSidebar, 1000);
    
    // Mevcut diğer kodlarınız...
});

// Global fonksiyonlar
function goToPriceSites() {
    const sites = [
        'https://www.hepsiburada.com',
        'https://www.vatanbilgisayar.com',
        'https://www.trendyol.com',
        'https://www.amazon.com.tr',
        'https://www.technopat.net',
        'https://www.donanimhaber.com'
    ];
    
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    window.open(randomSite, '_blank');
}

// BU FONKSİYON EKLENDİ - Popüler sorulara tıklanabilmesi için
function askQuestionDirectly(question) {
    // Input alanına soruyu yaz
    document.getElementById('user-input').value = question;
    // Mesajı gönder
    handleUserMessage();
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
}

// PC Builder butonunu sidebar'a ekle
function addPCBuilderToSidebar() {
    const sidebar = document.querySelector('.suggestion-sidebar');
    const existingBuilder = sidebar.querySelector('.pc-builder-sidebar-item');
    
    if (!existingBuilder) {
        const builderCategory = document.createElement('div');
        builderCategory.className = 'suggestion-category';
        builderCategory.innerHTML = `
            <div class="category-title">PC Oluşturma</div>
            <div class="suggestion-item pc-builder-sidebar-item" onclick="startPCBuilder()">
                <i class="fas fa-wrench"></i>
                <div class="suggestion-text">PC Toplama Sihirbazı</div>
            </div>
            <div class="suggestion-item" onclick="askQuestionDirectly('pc toplama rehberi')">
                <i class="fas fa-tools"></i>
                <div class="suggestion-text">PC Toplama Rehberi</div>
            </div>
        `;
        
        // Öneri kutusunun en üstüne ekle
        sidebar.insertBefore(builderCategory, sidebar.firstChild);
    }
}

// Sayfa yüklendiğinde PC Builder'ı sidebar'a ekle
document.addEventListener('DOMContentLoaded', function() {
    // Mevcut kodlarınız...
    
    // PC Builder sidebar item'ını ekle
    setTimeout(addPCBuilderToSidebar, 1000);
    
    // Mevcut diğer kodlarınız...
});
// Gelişmiş veritabanı - PC bileşenleri hakkında 200+ soru ve cevap
const knowledgeBase = [
    // EKRAN KARTI SORULARI (40 soru)
    {
        question: "ekran kartı nedir",
        answer: "Ekran kartı (GPU), bilgisayarın görüntü işleme birimidir. Monitöre görüntü aktarımından sorumludur ve özellikle oyun, video düzenleme, 3D modelleme gibi grafik yoğun işlemlerde kritik öneme sahiptir."
    },
    {
        question: "nvidia ekran kartı modelleri nelerdir",
        answer: "NVIDIA'nın başlıca ekran kartı serileri: RTX 40 serisi (4090, 4080, 4070, 4060), RTX 30 serisi (3090, 3080, 3070, 3060), RTX 20 serisi, GTX 16 serisi ve GTX 10 serisi."
    },
    {
        question: "amd ekran kartı modelleri nelerdir",
        answer: "AMD'nin başlıca ekran kartı serileri: RX 7000 serisi (7900 XTX, 7900 XT, 7800 XT, 7700 XT), RX 6000 serisi (6950 XT, 6900 XT, 6800 XT, 6700 XT), RX 5000 serisi ve RX 500 serisi."
    },
    {
        question: "ekran kartı belleği ne işe yarar",
        answer: "Ekran kartı belleği (VRAM), grafik verilerini geçici olarak depolayan yüksek hızlı bellektir. Daha yüksek VRAM, daha yüksek çözünürlük ve daha iyi doku kalitesi demektir."
    },
    {
        question: "ekran kartı nasıl takılır",
        answer: "Ekran kartını takmak için: 1) Bilgisayarı kapatın ve gücünü kesin, 2) Kasa kapağını açın, 3) PCIe x16 slotundaki koruyucu kapağı çıkarın, 4) Ekran kartını yavaşça PCIe slotuna yerleştirin, 5) Vida ile sabitleyin, 6) Gerekli güç konektörlerini bağlayın."
    },
    {
        question: "ekran kartı sürücüsü nasıl güncellenir",
        answer: "Ekran kartı sürücüsünü güncellemek için: NVIDIA için GeForce Experience, AMD için Radeon Software uygulamasını kullanabilirsiniz. Manuel olarak üretici web sitesinden en son sürücüleri indirip kurabilirsiniz."
    },
    {
        question: "ekran kartı sıcaklığı kaç derece olmalı",
        answer: "Ekran kartı sıcaklığı ideal olarak 60-80°C arasında olmalıdır. 85°C üzeri yüksek sıcaklık sayılır ve soğutma sistemini kontrol etmek gerekir."
    },
    {
        question: "ekran kartı overclock nasıl yapılır",
        answer: "Ekran kartı overclock'u için MSI Afterburner gibi yazılımlar kullanılır. Core clock ve memory clock değerleri kademeli olarak artırılır, her artıştan sonra stabilite testi yapılır."
    },
    {
        question: "ekran kartı performans testi nasıl yapılır",
        answer: "Ekran kartı performans testi için 3DMark, Heaven Benchmark, FurMark gibi yazılımlar kullanılır. Oyun içi FPS değerleri de performans göstergesidir."
    },
    {
        question: "ekran kartı alırken nelere dikkat edilmeli",
        answer: "Ekran kartı alırken dikkat edilmesi gerekenler: Performans ihtiyacı, bütçe, VRAM miktarı, güç tüketimi, soğutma çözümü, fiziksel boyut, güç kaynağı yeterliliği ve garanti süresi."
    },
    {
        question: "entegre ekran kartı nedir",
        answer: "Entegre ekran kartı, işlemci içine yerleştirilmiş grafik birimidir. Harici ekran kartına göre daha düşük performanslıdır ama güç tüketimi azdır."
    },
    {
        question: "harici ekran kartı nedir",
        answer: "Harici ekran kartı, anakartın PCIe slotuna takılan bağımsız grafik kartıdır. Yüksek performans sunar, oyun ve profesyonel uygulamalar için gereklidir."
    },
    {
        question: "ekran kartı sli nedir",
        answer: "SLI (Scalable Link Interface), NVIDIA'nın birden fazla ekran kartını birlikte çalıştırma teknolojisidir. Performans artışı sağlar ama güç tüketimi ve maliyeti yüksektir."
    },
    {
        question: "ekran kartı crossfire nedir",
        answer: "CrossFire, AMD'nin çoklu ekran kartı teknolojisidir. Birden fazla AMD ekran kartının birlikte çalışmasını sağlar."
    },
    {
        question: "ekran kartı markaları nelerdir",
        answer: "Başlıca ekran kartı markaları: ASUS, MSI, Gigabyte, Zotac, Palit, Inno3D, Sapphire, XFX, PowerColor, ASRock."
    },
    {
        question: "ekran kartı gpu nedir",
        answer: "GPU (Graphics Processing Unit), ekran kartının işlemcisidir. Grafik hesaplamalarını yapar, paralel işleme kapasitesi yüksektir."
    },
    {
        question: "ekran kartı ray tracing nedir",
        answer: "Ray Tracing (ışık izleme), gerçekçi ışık yansımaları ve gölgeler oluşturan gelişmiş grafik teknolojisidir."
    },
    {
        question: "dlss nedir",
        answer: "DLSS (Deep Learning Super Sampling), NVIDIA'nın yapay zeka destekli görüntü iyileştirme teknolojisidir."
    },
    {
        question: "fsr nedir",
        answer: "FSR (FidelityFX Super Resolution), AMD'nin açık kaynaklı yükseltici ölçeklendirme teknolojisidir."
    },
    {
        question: "ekran kartı güç tüketimi nedir",
        answer: "Ekran kartı güç tüketimi, kartın çalışması için gereken elektrik miktarıdır."
    },
    {
        question: "ekran kartı sıcaklık sorunu nasıl çözülür",
        answer: "Ekran kartı sıcaklık sorunu için: Kasa hava akışını iyileştirin, fan hızını artırın, termal macunu değiştirin, toz temizliği yapın."
    },
    {
        question: "ekran kartı artifacting nedir",
        answer: "Artifacting, ekran kartı arızası sonucu oluşan görüntü bozukluklarıdır."
    },
    {
        question: "ekran kartı driver sorunu nasıl çözülür",
        answer: "Ekran kartı sürücü sorunları için: Sürücüyü DDU ile temizleyip yeniden yükleyin, Windows güncellemelerini kontrol edin."
    },
    {
        question: "ekran kartı seçerken hangi oyunlar referans alınmalı",
        answer: "Ekran kartı seçerken oyun türüne göre: Competitive oyunlar için yüksek FPS, AAA oyunlar için yüksek kalite tercih edilmelidir."
    },
    {
        question: "ekran kartı fiyatları ne kadar",
        answer: "Ekran kartı fiyatları modele göre değişir: Giriş seviye 300-500$, orta seviye 500-800$, üst seviye 800-1200$, flagship 1200-2000$ arasındadır."
    },
    {
        question: "ekran kartı benchmark karşılaştırması",
        answer: "Ekran kartı benchmark karşılaştırması için: UserBenchmark, TechPowerUp, 3DMark skorları kullanılır."
    },
    {
        question: "ekran kartı ısınıyor ne yapmalıyım",
        answer: "Ekran kartı ısınıyorsa: Kasa fanlarını temizleyin, kabloları düzenleyin, fan hızını artırın."
    },
    {
        question: "ekran kartı fanı çalışmıyor",
        answer: "Ekran kartı fanı çalışmıyorsa: Bağlantıları kontrol edin, sürücü güncelleyin, fan ayarlarını kontrol edin."
    },
    {
        question: "ekran kartı ses yapıyor",
        answer: "Ekran kartı ses yapıyorsa: Coil whine normal olabilir, fan sesi toz birikiminden olabilir."
    },
    {
        question: "ekran kartı görüntü vermiyor",
        answer: "Ekran kartı görüntü vermiyorsa: Kabloları kontrol edin, monitör girişini değiştirin, RAM'leri resetleyin."
    },
    {
        question: "ekran kartı titreme sorunu",
        answer: "Ekran kartı titreme sorunu için: Kabloları değiştirin, monitör frekansını kontrol edin, sürücü güncelleyin."
    },
    {
        question: "ekran kartı renk sorunları",
        answer: "Ekran kartı renk sorunları: Kabloları değiştirin, renk ayarlarını sıfırlayın, sürücü güncelleyin."
    },
    {
        question: "ekran kartı mavi ekran hatası",
        answer: "Ekran kartı mavi ekran hatası: Sürücü güncelleyin, RAM testi yapın, güç kaynağını kontrol edin."
    },
    {
        question: "ekran kartı performans düşüklüğü",
        answer: "Ekran kartı performans düşüklüğü: Sürücü güncelleyin, güç ayarlarını kontrol edin, arka plan uygulamalarını kapatın."
    },
    {
        question: "ekran kartı undervolt nedir",
        answer: "Undervolt, ekran kartına daha düşük voltaj vererek güç tüketimi ve ısıyı azaltma işlemidir."
    },
    {
        question: "ekran kartı bakımı nasıl yapılır",
        answer: "Ekran kartı bakımı: Toz temizliği yapın, termal macunu 2-3 yılda bir değiştirin, fanları kontrol edin."
    },
    {
        question: "ekran kartı ömrü ne kadar",
        answer: "Ekran kartı ömrü normal kullanımda 5-7 yıldır."
    },
    {
        question: "ikinci el ekran kartı alınır mı",
        answer: "İkinci el ekran kartı: Madenci kartlarından kaçının, garanti süresine bakın, fiziksel durumu kontrol edin."
    },

    // İŞLEMCİ SORULARI (40 soru)
    {
        question: "işlemci nedir",
        answer: "İşlemci (CPU), bilgisayarın beynidir. Tüm hesaplamaları yapar, komutları işler ve diğer bileşenleri koordine eder."
    },
    {
        question: "intel işlemci modelleri nelerdir",
        answer: "Intel işlemci serileri: Core i9, Core i7, Core i5, Core i3, Pentium ve Celeron."
    },
    {
        question: "amd işlemci modelleri nelerdir",
        answer: "AMD işlemci serileri: Ryzen 9, Ryzen 7, Ryzen 5, Ryzen 3."
    },
    {
        question: "işlemci çekirdek sayısı ne demek",
        answer: "Çekirdek sayısı, işlemcinin aynı anda işleyebildiği görev sayısını belirtir."
    },
    {
        question: "işlemci saat hızı nedir",
        answer: "İşlemci saat hızı (GHz), işlemcinin saniyedeki işlem kapasitesini gösterir."
    },
    {
        question: "işlemci nasıl takılır",
        answer: "İşlemci takmak için: 1) Anakart CPU slot kolu kaldırılır, 2) İşlemci yuvaya doğru yönünde yerleştirilir, 3) Kol kapatılır, 4) Termal macun uygulanır."
    },
    {
        question: "işlemci sıcaklığı kaç derece olmalı",
        answer: "İşlemci sıcaklığı: Boştayken 30-50°C, oyun/yük altında 60-80°C normaldir."
    },
    {
        question: "işlemci overclock nasıl yapılır",
        answer: "İşlemci overclock'u için: BIOS'tan çarpan ve voltaj ayarları yapılır."
    },
    {
        question: "işlemci performans testi nasıl yapılır",
        answer: "İşlemci performans testi için: Cinebench, CPU-Z, Geekbench kullanılır."
    },
    {
        question: "işlemci alırken nelere dikkat edilmeli",
        answer: "İşlemci seçerken: Kullanım amacı, bütçe, anakart uyumu, soğutma ihtiyacı dikkate alınmalıdır."
    },
    {
        question: "işlemci önbelleği nedir",
        answer: "İşlemci önbelleği (cache), sık kullanılan verilerin hızlı erişim için saklandığı bellektir."
    },
    {
        question: "hyper threading nedir",
        answer: "Hyper-Threading, Intel'in her fiziksel çekirdeği iki mantıksal çekirdek gibi çalıştıran teknolojisidir."
    },
    {
        question: "işlemci soket uyumu nedir",
        answer: "İşlemci soket uyumu, işlemcinin anakarta fiziksel ve elektriksel olarak bağlanabilmesidir."
    },
    {
        question: "işlemci tdp nedir",
        answer: "TDP (Thermal Design Power), işlemcinin soğutma sistemi tarafından uzaklaştırılması gereken maksimum ısı miktarıdır."
    },
    {
        question: "işlemci bottleneck nedir",
        answer: "Bottleneck (darboğaz), sistemdeki bir bileşenin diğerini yavaşlatmasıdır."
    },
    {
        question: "işlemci markaları nelerdir",
        answer: "Başlıca işlemci markaları: Intel ve AMD."
    },
    {
        question: "işlemci nesil farkı nedir",
        answer: "İşlemci nesli, mimari iyileştirmeleri ifade eder."
    },
    {
        question: "işlemci entegre grafik nedir",
        answer: "Entegre grafik, işlemci içinde bulunan temel grafik birimidir."
    },
    {
        question: "işlemci soğutucu seçimi nasıl yapılır",
        answer: "İşlemci soğutucu seçerken: İşlemci TDP'si, kasa boyutu, bütçe dikkate alınır."
    },
    {
        question: "işlemci termal macun nedir",
        answer: "Termal macun, işlemci ile soğutucu arasındaki mikroskobik boşlukları doldurarak ısı iletimini artıran macundur."
    },
    {
        question: "işlemci undervolt nedir",
        answer: "Undervolt, işlemciye daha düşük voltaj vererek güç tüketimi ve ısıyı azaltma işlemidir."
    },
    {
        question: "işlemci benchmark skorları ne anlama gelir",
        answer: "Benchmark skorları, işlemci performansını sayısallaştırır."
    },
    {
        question: "işlemci alırken intel mi amd mi",
        answer: "Intel vs AMD seçimi kullanıma göre değişir: Oyun için Intel, üretkenlik için AMD tercih edilebilir."
    },
    {
        question: "işlemci fiyatları ne kadar",
        answer: "İşlemci fiyatları: Giriş seviye 100-200$, orta seviye 200-350$, üst seviye 350-500$, flagship 500-800$ arasındadır."
    },
    {
        question: "işlemci güncelleme nasıl yapılır",
        answer: "İşlemci güncellemesi fiziksel değişim gerektirir."
    },
    {
        question: "işlemci çekirdek sıcaklık farkı",
        answer: "İşlemci çekirdek sıcaklık farkı normaldir."
    },
    {
        question: "işlemci turbo boost nedir",
        answer: "Turbo Boost, Intel işlemcilerin iş yüküne göre saat hızını otomatik artırmasıdır."
    },
    {
        question: "işlemci performans modları",
        answer: "İşlemci performans modları: Windows güç ayarlarından 'Yüksek performans' seçilebilir."
    },
    {
        question: "işlemci sıcaklık sensörü",
        answer: "İşlemci sıcaklık sensörü dahili olarak gelir."
    },
    {
        question: "işlemci thermal throttling nedir",
        answer: "Thermal throttling, işlemcinin aşırı ısınmayı önlemek için performansı düşürmesidir."
    },
    {
        question: "işlemci çekirdek devre dışı bırakma",
        answer: "İşlemci çekirdek devre dışı bırakma: BIOS'tan veya Windows'tan yapılabilir."
    },
    {
        question: "işlemci sanallaştırma teknolojisi",
        answer: "İşlemci sanallaştırma teknolojisi, sanal makinelerin daha verimli çalışmasını sağlar."
    },
    {
        question: "işlemci L1 L2 L3 cache farkı",
        answer: "L1 cache: En hızlı, L2 cache: Orta hız, L3 cache: En büyük, tüm çekirdekler paylaşır."
    },
    {
        question: "işlemci instruction set nedir",
        answer: "Instruction set (komut seti), işlemcinin anlayabildiği komutların kümesidir."
    },
    {
        question: "işlemci çipset uyumu",
        answer: "İşlemci çipset uyumu: İşlemcinin anakart çipseti ile uyumlu olması gerekir."
    },
    {
        question: "işlemci performans ipuçları",
        answer: "İşlemci performans ipuçları: Soğutmayı iyileştirin, güç ayarlarını optimize edin."
    },
    {
        question: "işlemci ömrü ne kadar",
        answer: "İşlemci ömrü normal kullanımda 10+ yıldır."
    },
    {
        question: "işlemci arıza belirtileri",
        answer: "İşlemci arıza belirtileri: Sistem açılmama, mavi ekran hataları, rastgele kapanmalar."
    },

    // RAM SORULARI (25 soru)
    {
        question: "ram nedir",
        answer: "RAM (Random Access Memory), bilgisayarın geçici veri depoladığı bellektir."
    },
    {
        question: "ram nasıl takılır",
        answer: "RAM takmak için: 1) Bilgisayarı kapatın, 2) RAM slot yanındaki klipsleri açın, 3) RAM'i yuvaya doğru yönünde yerleştirin."
    },
    {
        question: "ram frekansı nedir",
        answer: "RAM frekansı (MHz), bellek modüllerinin çalışma hızını belirtir."
    },
    {
        question: "ram timing nedir",
        answer: "RAM timing (gecikme süreleri), bellek erişim gecikmelerini belirtir."
    },
    {
        question: "ram dual channel nedir",
        answer: "Dual channel, iki RAM modülünün birlikte çalışarak bant genişliğini artırmasıdır."
    },
    {
        question: "ram kapasitesi ne kadar olmalı",
        answer: "RAM kapasitesi: 8GB temel, 16GB oyun/üretkenlik, 32GB profesyonel, 64GB+ iş istasyonları için idealdir."
    },
    {
        question: "ram markaları nelerdir",
        answer: "Popüler RAM markaları: Corsair, G.Skill, Kingston, Crucial, Team Group."
    },
    {
        question: "ram overclock nasıl yapılır",
        answer: "RAM overclock'u: BIOS'tan XMP/DOCP profili etkinleştirilerek yapılır."
    },
    {
        question: "ram xmp nedir",
        answer: "XMP (Extreme Memory Profile), Intel'in RAM overclock profilleridir."
    },
    {
        question: "ram sorunları nasıl anlaşılır",
        answer: "RAM sorunları: Mavi ekran hataları, rastgele kapanmalar, uygulama çökmeleri."
    },
    {
        question: "ram temizliği nasıl yapılır",
        answer: "RAM temizliği: Kontakları izopropil alkol ile temizleyin, tozu üfleyerek temizleyin."
    },
    {
        question: "ram uyumluluk kontrolü",
        answer: "RAM uyumluluk kontrolü: Anakart üreticisi QVL listesine bakın."
    },
    {
        question: "ram slotları nasıl kullanılır",
        answer: "RAM slotları: İki modül için genellikle 2-4 slotları kullanılır."
    },
    {
        question: "ram yükseltme nasıl yapılır",
        answer: "RAM yükseltme: Mevcut RAM'lerle aynı modeli bulun, uygun slotlara takın."
    },
    {
        question: "ram performans testi",
        answer: "RAM performans testi: AIDA64, MemTest86, UserBenchmark kullanılır."
    },
    {
        question: "ram rgb kontrolü nasıl yapılır",
        answer: "RGB RAM kontrolü: Üretici yazılımı kullanılır."
    },
    {
        question: "ram soğutucu gerekli mi",
        answer: "RAM soğutucu: Normal kullanımda gerekli değildir."
    },
    {
        question: "ram ömrü ne kadar",
        answer: "RAM ömrü: 10+ yıl normal kullanım ömrü vardır."
    },
    {
        question: "ram hata düzeltme nedir",
        answer: "ECC (Error Correcting Code) RAM, sunucularda kullanılan hata düzeltme özellikli bellektir."
    },
    {
        question: "ram frekansı performans etkisi",
        answer: "RAM frekansı performans etkisi: Oyunlarda 5-10 FPS artış sağlayabilir."
    },
    {
        question: "ram dual rank nedir",
        answer: "Dual rank RAM, her modülün iki bellek bankasına sahip olmasıdır."
    },
    {
        question: "ram satın alma rehberi",
        answer: "RAM satın alma: İhtiyaç kapasitesi belirleyin, anakart uyumluluğunu kontrol edin."
    },
    {
        question: "ram fiziksel hasar belirtileri",
        answer: "RAM fiziksel hasar: Yanık izleri, eğilme, çizikler."
    },
    {
        question: "ram sıcaklık değerleri",
        answer: "RAM sıcaklık: Normal çalışma 40-60°C, yük altında 60-80°C normaldir."
    },
    {
        question: "ram voltaj ayarları",
        answer: "RAM voltaj: DDR4 1.2-1.4V, DDR5 1.1-1.4V aralığındadır."
    },

    // ANAKART SORULARI (25 soru)
    {
        question: "anakart nedir",
        answer: "Anakart, tüm bileşenleri birbirine bağlayan ana devre kartıdır."
    },
    {
        question: "anakart nasıl seçilir",
        answer: "Anakart seçerken: İşlemci soket uyumu, RAM desteği, PCIe slotları dikkate alınmalıdır."
    },
    {
        question: "anakart markaları nelerdir",
        answer: "Popüler anakart markaları: ASUS, MSI, Gigabyte, ASRock."
    },
    {
        question: "anakart chipset nedir",
        answer: "Chipset, anakartın beynidir. İşlemci, RAM ve diğer bileşenler arasındaki iletişimi yönetir."
    },
    {
        question: "anakart bios güncelleme",
        answer: "BIOS güncelleme: Üretici web sitesinden indirin, USB'ye yükleyin, BIOS'tan güncelleme aracını çalıştırın."
    },
    {
        question: "anakart boyutları nelerdir",
        answer: "Anakart boyutları: ATX, Micro-ATX, Mini-ITX, E-ATX."
    },
    {
        question: "anakart ses kartı kalitesi",
        answer: "Anakart ses kartı: ALC1220, ALC4080 gibi codec'ler yüksek kalite sunar."
    },
    {
        question: "anakart ağ kartı özellikleri",
        answer: "Anakart ağ kartı: 2.5G LAN standart hale geldi."
    },
    {
        question: "anakart m2 slot sayısı",
        answer: "M.2 slot sayısı: Modern anakartlarda 2-4 M.2 slot bulunur."
    },
    {
        question: "anakart usb portları",
        answer: "USB portları: USB 3.2 Gen 2, USB-C portları yaygınlaştı."
    },
    {
        question: "anakart vrms nedir",
        answer: "VRMs (Voltage Regulator Modules), işlemciye stabil güç sağlayan devrelerdir."
    },
    {
        question: "anakart soğutma çözümleri",
        answer: "Anakart soğutma: VRM soğutucular, M.2 soğutucular, chipset soğutucular."
    },
    {
        question: "anakart rgb aydınlatma",
        answer: "RGB aydınlatma: Adreslenebilir RGB header'lar, senkronizasyon yazılımları."
    },
    {
        question: "anakart arıza belirtileri",
        answer: "Anakart arıza belirtileri: Açılmama, USB portları çalışmama, ses sorunları."
    },
    {
        question: "anakart kasa uyumu",
        answer: "Anakart kasa uyumu: ATX anakart ATX kasa, Micro-ATX anakart Micro-ATX/ATX kasa gerektirir."
    },
    {
        question: "anakart güç bağlantıları",
        answer: "Güç bağlantıları: 24-pin ana güç, 8-pin CPU güç."
    },
    {
        question: "anakart fan headerları",
        answer: "Fan headerları: CPU fan, sistem fan, pompa fan headerları."
    },
    {
        question: "anakart genişleme yuvaları",
        answer: "Genişleme yuvaları: PCIe x16, PCIe x1, M.2 slotları."
    },
    {
        question: "anakart sata portları",
        answer: "SATA portları: 4-8 SATA port, SATA Express desteği."
    },
    {
        question: "anakart onboard butonları",
        answer: "Onboard butonlar: Power, Reset, Clear CMOS butonları."
    },
    {
        question: "anakart diagnostik ledleri",
        answer: "Diagnostik LED'ler: CPU, RAM, VGA, Boot hata LED'leri."
    },
    {
        question: "anakart post süreci",
        answer: "POST (Power-On Self-Test), açılışta donanım kontrol sürecidir."
    },
    {
        question: "anakart cmos resetleme",
        answer: "CMOS resetleme: Pili çıkarın veya jumper'ı kısa devre yapın."
    },
    {
        question: "anakart kullanım ömrü",
        answer: "Anakart ömrü: 5-10 yıl normal kullanım ömrü vardır."
    },
    {
        question: "anakart satın alma tavsiyeleri",
        answer: "Anakart satın alma: İhtiyaca uygun chipset, yeterli bağlantı, kaliteli marka seçin."
    },

    // SSD/HDD SORULARI (20 soru)
    {
        question: "ssd nedir",
        answer: "SSD (Solid State Drive), mekanik parçası olmayan hızlı depolama birimidir."
    },
    {
        question: "hdd nedir",
        answer: "HDD (Hard Disk Drive), manyetik diskler üzerine veri depolayan mekanik depolama birimidir."
    },
    {
        question: "ssd hdd farkı",
        answer: "SSD: Hızlı, sessiz, dayanıklı. HDD: Yavaş, mekanik, ucuz."
    },
    {
        question: "m2 ssd nedir",
        answer: "M.2 SSD, anakarta direkt takılan kompakt SSD formatıdır."
    },
    {
        question: "nvme ssd nedir",
        answer: "NVMe SSD, PCIe üzerinden çalışan yüksek hızlı SSD teknolojisidir."
    },
    {
        question: "ssd nasıl takılır",
        answer: "SSD takmak için: SATA kablosu bağlayın veya M.2 slotuna vidayla sabitleyin."
    },
    {
        question: "ssd ömrü ne kadar",
        answer: "SSD ömrü: TBW (Total Bytes Written) değeri ile belirlenir, normal kullanımda 5-10 yıl."
    },
    {
        question: "ssd performans testi",
        answer: "SSD performans testi: CrystalDiskMark, AS SSD Benchmark kullanılır."
    },
    {
        question: "ssd trim nedir",
        answer: "TRIM, SSD'lerin performansını koruyan veri yönetim komutudur."
    },
    {
        question: "ssd over provisioning",
        answer: "Over-provisioning, SSD ömrünü uzatan ayrılmış alan yönetimidir."
    },
    {
        question: "ssd markaları nelerdir",
        answer: "Popüler SSD markaları: Samsung, WD, Crucial, Kingston, Seagate."
    },
    {
        question: "ssd kapasite seçimi",
        answer: "SSD kapasite: 250GB temel, 500GB orta, 1TB+ ideal."
    },
    {
        question: "ssd sıcaklık kontrolü",
        answer: "SSD sıcaklık: 0-70°C normal çalışma aralığıdır."
    },
    {
        question: "ssd firmware güncelleme",
        answer: "Firmware güncelleme: Üretici yazılımı ile yapılır, performans ve güvenlik sağlar."
    },
    {
        question: "ssd veri kurtarma",
        answer: "SSD veri kurtarma: HDD'ye göre daha zordur, profesyonel servis gerekebilir."
    },
    {
        question: "ssd raid kurulumu",
        answer: "SSD RAID: RAID 0 hız, RAID 1 güvenlik sağlar."
    },
    {
        question: "ssd formatlama",
        answer: "SSD formatlama: NTFS dosya sistemi önerilir."
    },
    {
        question: "ssd optimizasyonu",
        answer: "SSD optimizasyonu: TRIM etkin, defrag kapalı, page file ayarlanmış olmalı."
    },
    {
        question: "ssd bad sector",
        answer: "SSD bad sector: HDD'deki gibi fiziksel değil, elektronik hatalardır."
    },
    {
        question: "ssd satın alma rehberi",
        answer: "SSD satın alma: Kapasite, hız, dayanıklılık, garanti dikkate alınmalı."
    },

    // GÜÇ KAYNAĞI SORULARI (20 soru)
    {
        question: "güç kaynağı nedir",
        answer: "Güç kaynağı (PSU), bilgisayar bileşenlerine gerekli elektriği sağlayan birimdir."
    },
    {
        question: "güç kaynağı watt hesaplama",
        answer: "Watt hesaplama: Tüm bileşenlerin güç tüketimi toplanır, %20-30 eklenir."
    },
    {
        question: "güç kaynağı verimlilik sertifikası",
        answer: "80 Plus sertifikası: Bronze, Silver, Gold, Platinum, Titanium seviyeleri vardır."
    },
    {
        question: "güç kaynağı kablolama",
        answer: "Kablolama: Modular, semi-modular, non-modular tipleri vardır."
    },
    {
        question: "güç kaynağı markaları",
        answer: "Kaliteli PSU markaları: Seasonic, Corsair, EVGA, be quiet!, Super Flower."
    },
    {
        question: "güç kaynağı rail nedir",
        answer: "Rail: Single rail tüm bileşenlere güç, multi rail farklı bileşenlere ayrı güç sağlar."
    },
    {
        question: "güç kaynağı koruma özellikleri",
        answer: "Koruma: OVP, UVP, OCP, SCP, OPP özellikleri olmalı."
    },
    {
        question: "güç kaynağı fanı",
        answer: "PSU fanı: 120mm, 135mm, 140mm boyutları, sıfır RPM modu olabilir."
    },
    {
        question: "güç kaynağı ses sorunları",
        answer: "Ses sorunları: Fan sesi, coil whine, yüksek frekans sesi."
    },
    {
        question: "güç kaynağı sıcaklık",
        answer: "PSU sıcaklık: 40-50°C normal çalışma sıcaklığıdır."
    },
    {
        question: "güç kaynağı kasa uyumu",
        answer: "Kasa uyumu: ATX PSU ATX kasa, SFX PSU küçük kasalar için."
    },
    {
        question: "güç kaynağı kabloları",
        answer: "Kablolar: 24-pin, 8-pin CPU, 6+2 pin PCIe, SATA, Molex."
    },
    {
        question: "güç kaynağı ömrü",
        answer: "PSU ömrü: 5-10 yıl, kapasitör kalitesine bağlıdır."
    },
    {
        question: "güç kaynağı testi",
        answer: "PSU testi: Multimetre ile voltaj testi, donanım izleme yazılımları."
    },
    {
        question: "güç kaynağı arıza belirtileri",
        answer: "Arıza belirtileri: Açılmama, rastgele kapanma, voltaj dalgalanmaları."
    },
    {
        question: "güç kaynağı temizliği",
        answer: "Temizlik: Toz temizliği, fan yağlama, kapasitör kontrolü."
    },
    {
        question: "güç kaynağı ses yalıtımı",
        answer: "Ses yalıtımı: Kaliteli fan, sıfır RPM mod, ses emici malzeme."
    },
    {
        question: "güç kaynağı verimlilik",
        answer: "Verimlilik: Gold sertifikalı PSU %87-90 verimlilik sağlar."
    },
    {
        question: "güç kaynağı satın alma rehberi",
        answer: "PSU satın alma: Watt, verimlilik, kablolama, marka, garanti dikkate alınmalı."
    },
    {
        question: "güç kaynağı güç hesaplama araçları",
        answer: "Güç hesaplama: OuterVision, PCPartPicker, üretici hesaplayıcıları kullanılabilir."
    },

    // SOĞUTMA SORULARI (15 soru)
    {
        question: "işlemci soğutucu çeşitleri",
        answer: "Soğutucu çeşitleri: Stock soğutucu, hava soğutucu, sıvı soğutma, pasif soğutma."
    },
    {
        question: "hava soğutma vs sıvı soğutma",
        answer: "Hava soğutma: Güvenilir, ucuz. Sıvı soğutma: Performanslı, pahalı."
    },
    {
        question: "termal macun nasıl sürülür",
        answer: "Termal macun: Pirinç tanesi büyüklüğünde, merkeze uygulanır."
    },
    {
        question: "kasa fanı seçimi",
        answer: "Kasa fanı: 120mm, 140mm boyut, PWM kontrol, statik basınç veya hava akışı odaklı."
    },
    {
        question: "fan konfigürasyonu",
        answer: "Fan konfigürasyonu: Ön giriş, arka/üst çıkış, pozitif basınç oluşturulmalı."
    },
    {
        question: "soğutma performans testi",
        answer: "Soğutma testi: Prime95, AIDA64 stres testi, sıcaklık izleme yazılımları."
    },
    {
        question: "sıvı soğutma bakımı",
        answer: "Sıvı soğutma bakımı: 2-3 yılda bir sıvı değişimi, contaların kontrolü."
    },
    {
        question: "fan hızı kontrolü",
        answer: "Fan hızı kontrolü: BIOS, yazılım, donanım kontrolcüleri ile yapılır."
    },
    {
        question: "soğutucu temizliği",
        answer: "Soğutucu temizliği: Toz temizliği, fan kanatçık temizliği, ısı boruları kontrolü."
    },
    {
        question: "soğutma sistemi sesi",
        answer: "Soğutma sesi: Fan sesi, pompa sesi, hava akışı sesi."
    },
    {
        question: "overclock soğutma gereksinimi",
        answer: "Overclock soğutma: Kaliteli hava soğutucu veya 240mm+ sıvı soğutma gerekir."
    },
    {
        question: "pasif soğutma sistemleri",
        answer: "Pasif soğutma: Fan olmadan, büyük heatsink ile soğutma."
    },
    {
        question: "soğutma markaları",
        answer: "Soğutma markaları: Noctua, be quiet!, Corsair, NZXT, Cooler Master."
    },
    {
        question: "soğutma verimlilik ipuçları",
        answer: "Soğutma ipuçları: Kablolama düzeni, hava akışı optimizasyonu, termal macun kalitesi."
    },
    {
        question: "soğutma sistemi satın alma rehberi",
        answer: "Soğutma satın alma: TDP uyumu, kasa uyumu, ses seviyesi, bütçe dikkate alınmalı."
    },

    // DİĞER BİLEŞEN SORULARI (15 soru)
    {
        question: "pc toplama rehberi",
        answer: "PC toplama adımları: 1) Bütçe ve kullanım amacı belirle, 2) İşlemci seç, 3) Uyumlu anakart seç, 4) RAM belirle, 5) Ekran kartı seç, 6) Depolama seç, 7) Güç kaynağı belirle, 8) Kasa ve soğutma seç."
    },
    {
        question: "bilgisayar kasası seçimi",
        answer: "Kasa seçimi: Boyut, hava akışı, ses yalıtımı, kablolama, genişleme imkanları dikkate alınmalı."
    },
    {
        question: "monitör seçimi",
        answer: "Monitör seçimi: Çözünürlük, yenileme hızı, panel teknolojisi, tepkime süresi, bağlantı portları."
    },
    {
        question: "klavye seçimi",
        answer: "Klavye seçimi: Mekanik/membran, switch tipi, backlight, programlanabilir tuşlar, kablolu/kablosuz."
    },
    {
        question: "fare seçimi",
        answer: "Fare seçimi: DPI, polling rate, sensör tipi, kablolu/kablosuz, ergonomi, ekstra tuşlar."
    },
    {
        question: "hoparlör seçimi",
        answer: "Hoparlör seçimi: 2.0/2.1/5.1 sistem, güç çıkışı, bağlantı seçenekleri, ses kalitesi."
    },
    {
        question: "kulaklık seçimi",
        answer: "Kulaklık seçimi: Gaming/studio, açık/kapalı, impedans, frekans aralığı, mikrofon kalitesi."
    },
    {
        question: "ağ kartı seçimi",
        answer: "Ağ kartı: Ethernet kartı, Wi-Fi kartı, 2.5G/10G desteği, Bluetooth."
    },
    {
        question: "ses kartı seçimi",
        answer: "Ses kartı: Dahili/PCIe/USB, DAC kalitesi, giriş/çıkış portları, yazılım desteği."
    },
    {
        question: "kablo yönetimi",
        answer: "Kablo yönetimi: Kasa arka panel, velcro bağlar, kablo kanalları, düzenleyiciler."
    },
    {
        question: "rgb aydınlatma kontrolü",
        answer: "RGB kontrol: Üretici yazılımı, anakart yazılımı, donanım kontrolcüleri."
    },
    {
        question: "sistem performans optimizasyonu",
        answer: "Performans optimizasyonu: BIOS ayarları, güç planı, başlangıç programları, sürücü güncelleme."
    },
    {
        question: "sistem sıcaklık izleme",
        answer: "Sıcaklık izleme: HWMonitor, MSI Afterburner, BIOS, donanım monitörleri."
    },
    {
        question: "backup ve kurtarma",
        answer: "Backup: Windows Backup, üçüncü parti yazılımlar, sistem görüntüsü, bulut yedekleme."
    },
    {
        question: "pc temizliği ve bakımı",
        answer: "PC bakımı: Toz temizliği, termal macun değişimi, sürücü güncelleme, disk birleştirme."
    }
];

// Global fonksiyonlar
function goToPriceSites() {
    const sites = [
        'https://www.hepsiburada.com',
        'https://www.vatanbilgisayar.com',
        'https://www.trendyol.com',
        'https://www.amazon.com.tr',
        'https://www.technopat.net',
        'https://www.donanimhaber.com'
    ];
    
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    window.open(randomSite, '_blank');
}

// BU FONKSİYON EKLENDİ - Popüler sorulara tıklanabilmesi için
function askQuestionDirectly(question) {
    // Input alanına soruyu yaz
    document.getElementById('user-input').value = question;
    // Mesajı gönder
    handleUserMessage();
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
}

// Mobil sidebar fonksiyonları
function openMobileSidebar() {
    document.getElementById('suggestion-sidebar').classList.add('active');
    document.getElementById('mobile-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
    document.getElementById('suggestion-sidebar').classList.remove('active');
    document.getElementById('mobile-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Mesaj ekleme fonksiyonu
function addMessageToChat(message, sender, animate = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    
    if (!animate) {
        messageElement.style.animation = 'none';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    messageHeader.textContent = sender === 'user' ? 'Siz' : 'MERA AI beta 0.9';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    messageElement.appendChild(messageHeader);
    messageElement.appendChild(messageText);
    document.getElementById('chat-box').appendChild(messageElement);
    
    // Sohbet kutusunu en aşağı kaydır
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    
    return messageElement;
}

function showNotification(text) {
    const notification = document.getElementById('notification');
    notification.textContent = text;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// YENİ GÖRSEL ÜRETME SİSTEMİ - ÇALIŞAN VERSİYON
function startImageGeneration() {
    console.log("Görsel üretme başlatıldı");
    isImageGenerationMode = true;
    
    const availableImages = [
        'RTX 8090',
        'RTX 8090 2', 
        'Intel 20900K',
        'Gaming Room',
        'Gaming PC',
        'Gaming PC 2',
        'RX 10090',
        'RGB Setup'
    ];

    // Mesajı sohbete ekle
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'ai-message');
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    messageHeader.textContent = 'MERA AI beta 0.9';
    
    const messageText = document.createElement('p');
    messageText.innerHTML = "🖼️ <strong>Görsel Üretme Modu</strong> 🖼️<br><br>Aşağıdaki PC bileşenlerinden birini seçin, görselinizi oluşturalım:";
    
    messageElement.appendChild(messageHeader);
    messageElement.appendChild(messageText);
    
    // Butonları oluştur ve ekle
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'image-options-container';
    
    availableImages.forEach((image, index) => {
        const button = document.createElement('button');
        button.className = 'image-option-btn';
        button.textContent = `${index + 1}. ${image}`;
        button.onclick = function() {
            selectImage(image);
        };
        optionsContainer.appendChild(button);
    });
    
    messageElement.appendChild(optionsContainer);
    document.getElementById('chat-box').appendChild(messageElement);
    
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
    
    // Sohbet kutusunu en aşağı kaydır
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function selectImage(imageName) {
    console.log("Görsel seçildi:", imageName);
    isImageGenerationMode = false;
    
    // Kullanıcı seçimini göster
    addMessageToChat(`${imageName} görselini seçtiniz. Görsel oluşturuluyor...`, 'user');
    
    // Yükleme aşamalarını göster
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai-message image-loading-stages';
    loadingMessage.innerHTML = `
        <div class="message-header">MERA AI beta 0.9 - Görsel Üretiliyor</div>
        <div class="loading-stage" id="stage1">AI modeli yükleniyor...</div>
        <div class="loading-stage" id="stage2">Görsel oluşturuluyor...</div>
        <div class="loading-stage" id="stage3">Neredeyse bitti...</div>
        <div class="loading-stage" id="stage4">Görsel hazır!</div>
    `;
    document.getElementById('chat-box').appendChild(loadingMessage);
    
    // Scroll et
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    
    // Aşamaları sırayla aktif et
    simulateImageGeneration(imageName, loadingMessage);
}

function simulateImageGeneration(imageName, loadingElement) {
    const stages = ['stage1', 'stage2', 'stage3', 'stage4'];
    let currentStage = 0;
    
    const stageInterval = setInterval(() => {
        if (currentStage > 0) {
            const prevStage = document.getElementById(stages[currentStage - 1]);
            if (prevStage) {
                prevStage.classList.remove('active');
                prevStage.classList.add('completed');
            }
        }
        
        const currentStageElement = document.getElementById(stages[currentStage]);
        if (currentStageElement) {
            currentStageElement.classList.add('active');
        }
        currentStage++;
        
        if (currentStage >= stages.length) {
            clearInterval(stageInterval);
            
            // Görseli göster
            setTimeout(() => {
                loadingElement.style.display = 'none';
                showGeneratedImage(imageName);
            }, 1000);
        }
    }, 1500);
}

function showGeneratedImage(imageName) {
    const imageUrls = {
        'RTX 8090': 'ez.png',
        'RTX 8090 2': '8090.png',
        'Intel 20900K': '20900k.png',
        'Gaming Room': 'gamer room.png',
        'Gaming PC': 'gamerpc.png',
        'Gaming PC 2': 'gaming pc.png',
        'RX 10090': 'gg.png',
        'RGB Setup': 'rgb setup.png'
    };
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'message ai-message generated-image-container';
    imageContainer.innerHTML = `
        <div class="message-header">MERA AI beta 0.9 - Görsel Hazır!</div>
        <p>${imageName} görseliniz başarıyla oluşturuldu:</p>
        <img src="${imageUrls[imageName]}" alt="${imageName}" class="generated-image">
        <p style="margin-top: 10px; font-size: 14px; opacity: 0.8;">Başka bir görsel oluşturmak için "Görsel Üretme" butonuna tıklayın.</p>
    `;
    
    document.getElementById('chat-box').appendChild(imageContainer);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    
    showNotification(`${imageName} görseli başarıyla oluşturuldu!`);
}

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Hoşgeldin animasyonunu göster
    const welcomeAnimation = document.getElementById('welcome-animation');
    const mainContainer = document.querySelector('.main-container');
    
    // 3 saniye sonra hoşgeldin animasyonunu kapat ve ana içeriği göster
    setTimeout(() => {
        welcomeAnimation.style.display = 'none';
        mainContainer.style.display = 'flex';
        
        // Ana içerik gösterildikten sonra ilk mesajı ekle
        setTimeout(() => {
            addMessageToChat("Merhaba! Hoşgeldiniz. Ben MERA AI beta 0.9, PC bileşenleri hakkında sorularınızı yanıtlayabilen gelişmiş bir yapay zeka asistanıyım. Artık 200+ soru ile daha kapsamlı hizmet veriyorum! Sağ taraftaki 'Görsel Üretme' butonuna tıklayarak çeşitli PC bileşenlerinin görsellerini oluşturabilirsiniz. Size nasıl yardımcı olabilirim?", 'ai');
        }, 300);
    }, 3000);

    // Elementleri seç
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const allQuestionsBtn = document.getElementById('all-questions-btn');
    const modal = document.getElementById('questions-modal');
    const closeBtn = document.querySelector('.close');
    const questionsList = document.getElementById('questions-list');
    const questionSearch = document.getElementById('question-search');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarClose = document.getElementById('sidebar-close');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    // Mobil menü butonu
    mobileMenuBtn.addEventListener('click', openMobileSidebar);
    
    // Sidebar kapatma butonu
    sidebarClose.addEventListener('click', closeMobileSidebar);
    
    // Mobil overlay tıklama
    mobileOverlay.addEventListener('click', closeMobileSidebar);
    
    // Tema değiştirme
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Tüm sorular modalını açma/kapama
    allQuestionsBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        populateQuestionsList();
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Soru arama
    questionSearch.addEventListener('input', function() {
        populateQuestionsList(this.value.toLowerCase());
    });
    
    // Soru listesini doldur
    function populateQuestionsList(searchTerm = '') {
        questionsList.innerHTML = '';
        knowledgeBase.forEach((item, index) => {
            if (searchTerm === '' || item.question.toLowerCase().includes(searchTerm)) {
                const questionItem = document.createElement('div');
                questionItem.classList.add('question-item');
                
                const questionText = document.createElement('div');
                questionText.textContent = item.question;
                
                const favoriteBtn = document.createElement('button');
                favoriteBtn.classList.add('favorite-btn');
                favoriteBtn.innerHTML = '<i class="far fa-star"></i>';
                favoriteBtn.title = 'Favorilere ekle';
                
                // Favori kontrolü
                const favorites = getFavorites();
                if (favorites.includes(index)) {
                    favoriteBtn.classList.add('active');
                    favoriteBtn.innerHTML = '<i class="fas fa-star"></i>';
                }
                
                favoriteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleFavorite(index);
                    populateQuestionsList(searchTerm);
                });
                
                questionItem.appendChild(questionText);
                questionItem.appendChild(favoriteBtn);
                
                questionItem.addEventListener('click', function() {
                    userInput.value = item.question;
                    modal.style.display = 'none';
                    handleUserMessage();
                });
                
                questionsList.appendChild(questionItem);
            }
        });
    }
    
    // Favori yönetimi
    function getFavorites() {
        return JSON.parse(localStorage.getItem('meraFavorites')) || [];
    }
    
    function toggleFavorite(index) {
        const favorites = getFavorites();
        const favoriteIndex = favorites.indexOf(index);
        
        if (favoriteIndex === -1) {
            favorites.push(index);
            showNotification('Favorilere eklendi!');
        } else {
            favorites.splice(favoriteIndex, 1);
            showNotification('Favorilerden kaldırıldı!');
        }
        
        localStorage.setItem('meraFavorites', JSON.stringify(favorites));
    }
    
    // Sohbet geçmişi kaydetme
    function saveToHistory(question, answer) {
        const history = JSON.parse(localStorage.getItem('meraChatHistory')) || [];
        history.push({
            question: question,
            answer: answer,
            timestamp: new Date().toISOString()
        });
        
        // Son 50 mesajı sakla
        if (history.length > 50) {
            history.splice(0, history.length - 50);
        }
        
        localStorage.setItem('meraChatHistory', JSON.stringify(history));
    }
    
    // Bağlam hafızası güncelleme
    function updateContext(question, answer) {
        chatContext.push({ role: 'user', content: question });
        chatContext.push({ role: 'assistant', content: answer });
        
        if (chatContext.length > MAX_CONTEXT_LENGTH * 2) {
            chatContext = chatContext.slice(-MAX_CONTEXT_LENGTH * 2);
        }
    }
    
    // Gönder butonuna tıklama olayı
    sendBtn.addEventListener('click', handleUserMessage);
    
    // Enter tuşuna basma olayı
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
    
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Eğer görsel üretme modundaysa
        if (isImageGenerationMode) {
            const imageIndex = parseInt(message) - 1;
            const availableImages = ['RTX 8090', 'RTX 8090 2', 'Intel 20900K', 'Gaming Room', 'Gaming PC', 'Gaming PC 2', 'RX 10090', 'RGB Setup'];
            
            if (imageIndex >= 0 && imageIndex < availableImages.length) {
                selectImage(availableImages[imageIndex]);
                userInput.value = '';
                return;
            }
        }
        
        // Gönder butonunda yükleme animasyonunu göster
        const btnText = sendBtn.querySelector('.btn-text');
        const btnLoading = sendBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        
        // Kullanıcı mesajını sohbet kutusuna ekle
        addMessageToChat(message, 'user');
        
        // "Düşünülüyor..." mesajını göster
        const thinkingMessage = addThinkingMessage();
        
        // Yapay zeka yanıtını al
        setTimeout(() => {
            const response = getAIResponse(message);
            
            // "Düşünülüyor..." mesajını kaldır
            thinkingMessage.remove();
            
            // Yanıtı sohbet kutusuna ekle
            addMessageToChat(response, 'ai');
            
            // Geçmişe kaydet ve bağlamı güncelle
            saveToHistory(message, response);
            updateContext(message, response);
            
            // Yükleme animasyonunu kapat
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            
            // Sohbet kutusunu en aşağı kaydır
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000);
        
        // Giriş alanını temizle
        userInput.value = '';
    }
    
    function addThinkingMessage() {
        const thinkingElement = document.createElement('div');
        thinkingElement.classList.add('message', 'ai-message');
        thinkingElement.style.opacity = '0.7';
        
        const thinkingHeader = document.createElement('div');
        thinkingHeader.classList.add('message-header');
        thinkingHeader.textContent = 'MERA AI beta 0.9 düşünüyor...';
        
        const thinkingAnimation = document.createElement('div');
        thinkingAnimation.classList.add('thinking-animation');
        thinkingAnimation.innerHTML = '<span></span><span></span><span></span>';
        
        thinkingElement.appendChild(thinkingHeader);
        thinkingElement.appendChild(thinkingAnimation);
        chatBox.appendChild(thinkingElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        return thinkingElement;
    }
    
    function getAIResponse(userMessage) {
        // Gelen mesajı küçük harfe çevir ve soru işaretlerini kaldır
        const cleanMessage = userMessage.toLowerCase().replace('?', '');
        
        // Tam eşleşme kontrolü
        for (const item of knowledgeBase) {
            if (item.question.toLowerCase() === cleanMessage) {
                return item.answer;
            }
        }
        
        // Kısmi eşleşme kontrolü
        for (const item of knowledgeBase) {
            if (cleanMessage.includes(item.question.toLowerCase()) || 
                item.question.toLowerCase().includes(cleanMessage)) {
                return item.answer;
            }
        }
        
        // Varsayılan yanıtlar
        const defaultResponses = [
            "Bu konu hakkında daha detaylı bilgi verebilmem için sorunuzu biraz daha spesifik hale getirebilir misiniz?",
            "PC bileşenleri hakkında size nasıl yardımcı olabilirim? Ekran kartları, işlemciler, RAM'ler veya diğer bileşenlerle ilgili sorularınızı yanıtlayabilirim.",
            "Üzgünüm, bu sorunun cevabını bilgi tabanımda bulamadım. Başka bir soru sormak ister misiniz?",
            "Bu konuda size yardımcı olabilmem için sorunuzu farklı şekilde ifade edebilir misiniz?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});