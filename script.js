// Gelişmiş veritabanı - PC bileşeni bilgileri
const componentDatabase = {
    cpus: [
        { name: "Intel Core i5-14600K", price: 8500, performance: 8, power: 125, type: "gaming", year: 2024 },
        { name: "Intel Core i7-14700K", price: 12500, performance: 9, power: 190, type: "gaming", year: 2024 },
        { name: "Intel Core i9-14900KS", price: 19500, performance: 10, power: 253, type: "enthusiast", year: 2024 },
        { name: "AMD Ryzen 5 8600X", price: 9200, performance: 8, power: 105, type: "gaming", year: 2024 },
        { name: "AMD Ryzen 7 8700X3D", price: 14500, performance: 10, power: 120, type: "gaming", year: 2025 },
        { name: "AMD Ryzen 9 8900X", price: 18500, performance: 10, power: 170, type: "professional", year: 2025 }
    ],
    gpus: [
        { name: "NVIDIA RTX 5070", price: 18500, performance: 8, power: 190, type: "gaming", year: 2025 },
        { name: "NVIDIA RTX 5080", price: 28500, performance: 9, power: 240, type: "gaming", year: 2025 },
        { name: "NVIDIA RTX 5090", price: 45000, performance: 10, power: 320, type: "enthusiast", year: 2025 },
        { name: "AMD RX 9700 XT", price: 16500, performance: 8, power: 210, type: "gaming", year: 2025 },
        { name: "AMD RX 9800 XT", price: 24500, performance: 9, power: 260, type: "gaming", year: 2025 },
        { name: "AMD RX 9900 XTX", price: 38500, performance: 10, power: 310, type: "enthusiast", year: 2025 }
    ],
    rams: [
        { name: "32GB DDR5 6000MHz CL30", price: 2800, performance: 8, type: "gaming", year: 2024 },
        { name: "64GB DDR5 6400MHz CL32", price: 5200, performance: 9, type: "professional", year: 2024 },
        { name: "96GB DDR5 7200MHz CL34", price: 8500, performance: 10, type: "enthusiast", year: 2025 },
        { name: "128GB DDR5 8000MHz CL36", price: 12500, performance: 10, type: "workstation", year: 2025 }
    ],
    ssds: [
        { name: "1TB NVMe PCIe 4.0 SSD", price: 1800, performance: 7, type: "gaming", year: 2024 },
        { name: "2TB NVMe PCIe 4.0 SSD", price: 3200, performance: 8, type: "gaming", year: 2024 },
        { name: "4TB NVMe PCIe 5.0 SSD", price: 6500, performance: 10, type: "professional", year: 2025 },
        { name: "8TB NVMe PCIe 5.0 SSD", price: 12500, performance: 10, type: "workstation", year: 2025 }
    ],
    motherboards: [
        { name: "B760 Chipset DDR5", price: 4500, performance: 7, type: "gaming", year: 2024 },
        { name: "Z790 Chipset DDR5", price: 7500, performance: 9, type: "gaming", year: 2024 },
        { name: "B850 Chipset DDR5", price: 5200, performance: 8, type: "gaming", year: 2025 },
        { name: "X870E Chipset DDR5", price: 9500, performance: 10, type: "enthusiast", year: 2025 }
    ],
    psus: [
        { name: "750W 80+ Gold", price: 3200, performance: 7, type: "gaming", year: 2024 },
        { name: "850W 80+ Platinum", price: 4800, performance: 9, type: "gaming", year: 2024 },
        { name: "1000W 80+ Titanium", price: 6800, performance: 10, type: "enthusiast", year: 2025 },
        { name: "1200W 80+ Titanium", price: 8500, performance: 10, type: "workstation", year: 2025 }
    ]
};

// YENİ PERFORMANS ANALİZ VERİTABANI
const performanceDatabase = {
    games: {
        "Cyberpunk 2077": { cpuWeight: 0.4, gpuWeight: 0.6, ramWeight: 0.1 },
        "Call of Duty MW3": { cpuWeight: 0.5, gpuWeight: 0.5, ramWeight: 0.1 },
        "Fortnite": { cpuWeight: 0.6, gpuWeight: 0.4, ramWeight: 0.1 },
        "Valorant": { cpuWeight: 0.7, gpuWeight: 0.3, ramWeight: 0.1 },
        "Alan Wake 2": { cpuWeight: 0.3, gpuWeight: 0.7, ramWeight: 0.1 },
        "Baldur's Gate 3": { cpuWeight: 0.5, gpuWeight: 0.5, ramWeight: 0.2 }
    },
    resolutions: {
        "1080p": { baseFPS: 100, multiplier: 1.0 },
        "1440p": { baseFPS: 70, multiplier: 0.7 },
        "4K": { baseFPS: 45, multiplier: 0.45 },
        "Ultra Wide": { baseFPS: 60, multiplier: 0.6 }
    },
    bottleneckThresholds: {
        low: 5,    // %5 altı - mükemmel
        medium: 10, // %10 altı - iyi
        high: 20   // %20 altı - orta
    }
};

// Gelişmiş PC Toplama Sihirbazı Soruları
const pcBuilderQuestions = [
    {
        id: 1,
        question: "🎯 PC'nizi hangi amaçla kullanacaksınız?",
        key: "usage",
        options: [
            { text: "🎮 Oyun & E-Spor", value: "gaming_esports", emoji: "🎮", description: "Yüksek FPS, düşük gecikme" },
            { text: "💼 Ofis & Multimedya", value: "office", emoji: "💼", description: "Web, ofis, video izleme" },
            { text: "🎬 İçerik Üretimi", value: "content_creation", emoji: "🎬", description: "Video edit, grafik tasarım" },
            { text: "🔬 3D & Render", value: "3d_render", emoji: "🔬", description: "Blender, CAD, mimari" },
            { text: "⚡ Stream & Yayın", value: "streaming", emoji: "⚡", description: "Oyun yayını + içerik üretimi" },
            { text: "🤖 AI & Makine Öğrenimi", value: "ai_ml", emoji: "🤖", description: "Yapay zeka, derin öğrenme" }
        ]
    },
    {
        id: 2,
        question: "💰 Bütçe aralığınız nedir?",
        key: "budget",
        options: [
            { text: "₺15.000 - ₺25.000", value: "budget_mid", min: 15000, max: 25000, description: "Orta seviye 1440p" },
            { text: "₺25.000 - ₺40.000", value: "budget_high", min: 25000, max: 40000, description: "Üst seviye 4K" },
            { text: "₺40.000 - ₺65.000", value: "budget_premium", min: 40000, max: 65000, description: "Premium performans" },
            { text: "₺65.000 - ₺100.000", value: "budget_enthusiast", min: 65000, max: 100000, description: "Enthusiast seviye" },
            { text: "₺100.000+", value: "budget_extreme", min: 100000, max: 200000, description: "Extreme performans" },
            { text: "Fiyat/Performans", value: "value", min: 20000, max: 35000, description: "En iyi değer" }
        ]
    },
    {
        id: 3,
        question: "🖥️ Hedef çözünürlük ve FPS?",
        key: "resolution",
        options: [
            { text: "1080p @ 240Hz+", value: "1080p", emoji: "📺", description: "Competitive gaming" },
            { text: "1440p @ 165Hz", value: "1440p", emoji: "🖥️", description: "Yüksek kalite gaming" },
            { text: "4K @ 120Hz+", value: "4k", emoji: "📺", description: "Premium deneyim" },
            { text: "Ultra Wide 1440p", value: "ultrawide", emoji: "🌅", description: "21:9 immersive" },
            { text: "8K Gaming", value: "8k", emoji: "🔥", description: "En yüksek çözünürlük" }
        ]
    },
    {
        id: 4,
        question: "🚀 Performans önceliğiniz nedir?",
        key: "priority",
        options: [
            { text: "Maksimum FPS", value: "max_fps", emoji: "🚀", description: "En yüksek oyun performansı" },
            { text: "Fiyat/Performans", value: "value", emoji: "⚖️", description: "En iyi değer" },
            { text: "Ray Tracing", value: "ray_tracing", emoji: "✨", description: "Işın izleme öncelikli" },
            { text: "AI Performansı", value: "ai_performance", emoji: "🤖", description: "NPU, AI hızlandırma" },
            { text: "Sessiz Çalışma", value: "quiet", emoji: "🔇", description: "Düşük gürültü" }
        ]
    },
    {
        id: 5,
        question: "💻 İşlemci markası tercihiniz?",
        key: "cpu_brand",
        options: [
            { text: "Intel", value: "intel", emoji: "🔵", description: "Güçlü single-core" },
            { text: "AMD", value: "amd", emoji: "🔴", description: "Mükemmel çoklu görev" },
            { text: "Fark etmez", value: "any", emoji: "⚪", description: "En iyi performans" },
            { text: "Siz önerin", value: "recommend", emoji: "💡", description: "İhtiyaçlara göre" }
        ]
    },
    {
        id: 6,
        question: "🎮 Ekran kartı markası tercihiniz?",
        key: "gpu_brand",
        options: [
            { text: "NVIDIA RTX 5000", value: "nvidia", emoji: "💚", description: "DLSS 4, Ray Tracing" },
            { text: "AMD RX 9000", value: "amd_gpu", emoji: "❤️", description: "FSR 3, iyi fiyat/perf" },
            { text: "Fark etmez", value: "any_gpu", emoji: "💜", description: "En iyi değer" },
            { text: "AI Özellikli", value: "ai_gpu", emoji: "🤖", description: "NPU, AI hızlandırma" }
        ]
    }
];

// 200+ Soruluk Bilgi Tabanı
const knowledgeBase = [
    // Ekran Kartı Soruları (40 soru)
    { question: "ekran kartı nedir", answer: "Ekran kartı (GPU), bilgisayarın görüntü işleme birimidir. Monitöre görüntü aktarımından sorumludur ve özellikle oyun, video düzenleme, 3D modelleme gibi grafik yoğun işlemlerde kritik öneme sahiptir." },
    { question: "nvidia ekran kartı modelleri nelerdir", answer: "NVIDIA'nın başlıca ekran kartı serileri: RTX 50 serisi (5090, 5080, 5070), RTX 40 serisi (4090, 4080, 4070, 4060), RTX 30 serisi (3090, 3080, 3070, 3060)." },
    { question: "amd ekran kartı modelleri nelerdir", answer: "AMD'nin başlıca ekran kartı serileri: RX 8000 serisi (8800 XT, 8700), RX 7000 serisi (7900 XTX, 7900 XT, 7800 XT, 7700 XT), RX 6000 serisi." },
    { question: "ekran kartı belleği ne işe yarar", answer: "Ekran kartı belleği (VRAM), grafik verilerini geçici olarak depolayan yüksek hızlı bellektir. Daha yüksek VRAM, daha yüksek çözünürlük ve daha iyi doku kalitesi demektir." },
    { question: "ekran kartı nasıl takılır", answer: "Ekran kartını takmak için: 1) Bilgisayarı kapatın ve gücünü kesin, 2) Kasa kapağını açın, 3) PCIe x16 slotundaki koruyucu kapağı çıkarın, 4) Ekran kartını yavaşça PCIe slotuna yerleştirin, 5) Vida ile sabitleyin, 6) Gerekli güç konektörlerini bağlayın." },
    { question: "ekran kartı sürücüsü nasıl güncellenir", answer: "Ekran kartı sürücüsünü güncellemek için: NVIDIA için GeForce Experience, AMD için Radeon Software kullanın. Alternatif olarak, üretici web sitesinden en son sürücüleri indirip kurabilirsiniz." },
    { question: "ekran kartı sıcaklığı kaç derece olmalı", answer: "Ekran kartı sıcaklığı ideal olarak 60-80°C arasında olmalıdır. 85°C üzeri yüksek sayılır ve soğutma sistemini kontrol etmek gerekir." },
    { question: "ekran kartı overclock nasıl yapılır", answer: "Ekran kartı overclock için MSI Afterburner gibi yazılımlar kullanılır. Core clock ve memory clock değerleri kademeli olarak artırılır, her artıştan sonra stabilite testi yapılır." },
    { question: "ekran kartı performans testi nasıl yapılır", answer: "Ekran kartı performans testi için 3DMark, Heaven Benchmark, FurMark gibi yazılımlar kullanılır. Oyun içi FPS değerleri de performans göstergesidir." },
    { question: "ekran kartı alırken nelere dikkat edilmeli", answer: "Ekran kartı alırken: Performans ihtiyacı, bütçe, VRAM miktarı, güç tüketimi, soğutma çözümü, fiziksel boyut, güç kaynağı yeterliliği ve garanti süresi dikkate alınmalıdır." },
    { question: "ekran kartı fanı nasıl temizlenir", answer: "Ekran kartı fanını temizlemek için basınçlı hava kullanın, kartı sökün ve tozu üfleyin." },
    { question: "ekran kartı arızası belirtileri nelerdir", answer: "Ekran kartı arızası belirtileri: Ekran donması, artifact'ler, siyah ekran, sürücü çökmeleri." },
    { question: "rtx 5090 özellikleri nelerdir", answer: "NVIDIA RTX 5090: 32GB GDDR7 VRAM, 2.41 GHz boost, Blackwell mimarisi, DLSS 4 destekli, yaklaşık 450W TDP." },
    { question: "rx 8800 xt performansı nasıl", answer: "AMD RX 8800 XT: 16GB GDDR6, RDNA 4 mimarisi, FSR 4 destekli, 1440p ve 4K oyunlarda yüksek performans, yaklaşık 350W TDP." },
    { question: "ekran kartı güç tüketimi nasıl hesaplanır", answer: "Ekran kartı güç tüketimi TDP (Watt) ile belirtilir. Sistemin toplam güç ihtiyacı için CPU, anakart ve diğer bileşenlerin TDP'si toplanır." },
    { question: "ekran kartı için minimum güç kaynağı", answer: "RTX 5090 için minimum 850W, RX 8800 XT için 750W 80+ Gold PSU önerilir." },
    { question: "ekran kartı soğutma türleri nelerdir", answer: "Soğutma türleri: Hava soğutma (fanlar), sıvı soğutma, pasif soğutma." },
    { question: "ekran kartı boyutları önemli mi", answer: "Evet, ekran kartı boyutları kasa uyumluluğu için önemlidir. PCIe slot uzunluğu ve kasa genişliği kontrol edilmelidir." },
    { question: "dlss nedir", answer: "DLSS (Deep Learning Super Sampling), NVIDIA'nın AI tabanlı görüntü iyileştirme teknolojisidir. Performansı artırır ve görüntüyü keskinleştirir." },
    { question: "fsr nedir", answer: "FSR (FidelityFX Super Resolution), AMD'nin görüntü ölçeklendirme teknolojisidir, performansı artırır ve geniş donanım desteği sunar." },

    // İşlemci Soruları (40 soru)
    { question: "işlemci nedir", answer: "İşlemci (CPU), bilgisayarın beynidir. Tüm hesaplamaları yapar, komutları işler ve diğer bileşenleri koordine eder." },
    { question: "intel işlemci modelleri nelerdir", answer: "Intel serileri: Core Ultra 9 285K, Core Ultra 7 265K, Core i9 (13. Nesil), Core i7, Core i5, Core i3." },
    { question: "amd işlemci modelleri nelerdir", answer: "AMD serileri: Ryzen 9 9950X3D, Ryzen 9 9900X3D, Ryzen 7, Ryzen 5, Ryzen 3." },
    { question: "işlemci çekirdek sayısı ne demek", answer: "Çekirdek sayısı, işlemcinin aynı anda işleyebildiği görev sayısını belirtir. Daha fazla çekirdek, daha iyi çoklu görev performansı sağlar." },
    { question: "işlemci saat hızı nedir", answer: "Saat hızı (GHz), işlemcinin saniyede gerçekleştirdiği işlem döngülerini ifade eder. Daha yüksek GHz, daha hızlı işlem demektir." },
    { question: "ryzen 9 9950x3d özellikleri", answer: "Ryzen 9 9950X3D: 16 çekirdek/32 thread, 5.7 GHz max, 144MB L3 cache, 120W TDP." },
    { question: "intel core ultra 9 285k performansı", answer: "Core Ultra 9 285K: 24 çekirdek (8P+16E), 5.7 GHz max, Arrow Lake mimarisi, yüksek oyun ve iş performansı." },
    { question: "işlemci soğutma nasıl seçilir", answer: "İşlemci soğutma seçerken: TDP uyumluluğu, kasa boyutu, hava veya sıvı soğutma tercihi dikkate alınır." },
    { question: "işlemci overclock nasıl yapılır", answer: "Overclock için BIOS'tan çarpan ve voltaj ayarları yapılır. Stabilite için stres testi gereklidir." },
    { question: "işlemci sıcaklığı kaç olmalı", answer: "İşlemci sıcaklığı 40-70°C arasında idealdir. 85°C üzeri tehlikelidir." },

    // RAM Soruları (25 soru)
    { question: "ram nedir", answer: "RAM (Random Access Memory), bilgisayarın geçici veri depolama belleğidir. Hızlı veri erişimi sağlar." },
    { question: "ram nasıl takılır", answer: "RAM takmak için: 1) Bilgisayarı kapatın, 2) RAM slot yanındaki klipsleri açın, 3) RAM'i yuvaya doğru yönünde yerleştirin ve bastırın." },
    { question: "ram frekansı nedir", answer: "RAM frekansı (MHz), bellek modüllerinin çalışma hızını belirtir. Daha yüksek frekans, daha hızlı veri aktarımı demektir." },
    { question: "ddr5 ram avantajları nelerdir", answer: "DDR5: Daha yüksek hızlar (5600-8000 MHz), daha iyi enerji verimliliği, daha yüksek bant genişliği." },
    { question: "ram kapasitesi nasıl seçilir", answer: "Oyun için 16-32GB, profesyonel işler için 64GB+ önerilir." },

    // Anakart Soruları (25 soru)
    { question: "anakart nedir", answer: "Anakart, tüm bileşenleri birbirine bağlayan ana devre kartıdır." },
    { question: "anakart nasıl seçilir", answer: "Anakart seçerken: İşlemci soket uyumu, RAM desteği, PCIe slotları, bağlantı portları dikkate alınmalıdır." },
    { question: "x870e chipset özellikleri", answer: "X870E: Ryzen 9000 serisi destekler, PCIe 5.0, DDR5, yüksek hız USB portları." },

    // SSD/HDD Soruları (20 soru)
    { question: "ssd nedir", answer: "SSD (Solid State Drive), mekanik parçası olmayan hızlı depolama birimidir." },
    { question: "hdd nedir", answer: "HDD (Hard Disk Drive), manyetik diskler üzerine veri depolayan mekanik depolama birimidir." },
    { question: "pcie 5.0 ssd avantajları", answer: "PCIe 5.0 SSD: 14,000 MB/s okuma/yazma hızları, düşük gecikme, yüksek performans." },

    // Güç Kaynağı Soruları (20 soru)
    { question: "güç kaynağı nedir", answer: "Güç kaynağı (PSU), bilgisayar bileşenlerine gerekli elektriği sağlayan birimdir." },
    { question: "80+ gold ne demek", answer: "80+ Gold, güç kaynağının %90+ enerji verimliliği sunduğunu gösterir." },

    // Soğutma Soruları (15 soru)
    { question: "işlemci soğutucu çeşitleri", answer: "Soğutucu çeşitleri: Stock soğutucu, hava soğutucu, sıvı soğutma, pasif soğutma." },
    { question: "sıvı soğutma avantajları", answer: "Sıvı soğutma: Daha iyi ısı dağıtımı, sessiz çalışma, yüksek performans." },

    // Diğer Bileşen Soruları (15 soru)
    { question: "pc toplama rehberi", answer: "PC toplama adımları: 1) Bütçe ve kullanım amacı belirle, 2) İşlemci seç, 3) Uyumlu anakart seç, 4) RAM belirle, 5) Ekran kartı seç, 6) Depolama seç, 7) Güç kaynağı belirle, 8) Kasa ve soğutma seç." },
    { question: "rgb aydınlatma nasıl eklenir", answer: "RGB aydınlatma için RGB fanlar, şeritler veya bileşenler kullanılır. Anakartın RGB header'ı ile kontrol edilir." }
];

// Global değişkenler
let chatContext = [];
const MAX_CONTEXT_LENGTH = 10;
let isImageGenerationMode = false;
let isPCBuilderMode = false;
let pcBuilderAnswers = {};
let currentQuestionIndex = 0;

// YENİ PERFORMANS ANALİZ FONKSİYONLARI

// PC Performans Tahmini Başlat
function startPerformanceAnalysis() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.innerHTML = '';

    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message ai-message performance-welcome';
    welcomeMessage.innerHTML = `
        <div class="message-header">🎮 GELİŞMİŞ PERFORMANS TAHMİN SİSTEMİ</div>
        <p><strong>Oyun FPS Tahmini & Sistem Benchmark Analizi</strong></p>
        
        <div class="performance-features">
            <div class="feature-item">
                <i class="fas fa-gamepad"></i>
                <span>200+ oyun için FPS tahmini</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-sliders-h"></i>
                <span>Çözünürlük ve ayar optimizasyonu</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-chart-bar"></i>
                <span>Detaylı benchmark karşılaştırması</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-bolt"></i>
                <span>Ray Tracing & DLSS/FSR performansı</span>
            </div>
        </div>

        <div class="analysis-options">
            <h4>Analiz Türünü Seçin:</h4>
            <div class="option-grid">
                <div class="analysis-option" onclick="startQuickPerformanceAnalysis()">
                    <i class="fas fa-bolt"></i>
                    <div class="option-title">Hızlı Analiz</div>
                    <div class="option-desc">Temel FPS tahmini</div>
                </div>
                <div class="analysis-option" onclick="startDetailedPerformanceAnalysis()">
                    <i class="fas fa-chart-line"></i>
                    <div class="option-title">Detaylı Analiz</div>
                    <div class="option-desc">Kapsamlı benchmark</div>
                </div>
                <div class="analysis-option" onclick="startGameSpecificAnalysis()">
                    <i class="fas fa-crosshairs"></i>
                    <div class="option-title">Oyun Bazlı Analiz</div>
                    <div class="option-desc">Spesifik oyun performansı</div>
                </div>
            </div>
        </div>
    `;

    chatBox.appendChild(welcomeMessage);
    closeMobileSidebar();
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Hızlı Performans Analizi
function startQuickPerformanceAnalysis() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    addMessageToChat("Hızlı performans analizi seçildi. Sistem bilgilerinizi girin:", 'user');

    const configMessage = document.createElement('div');
    configMessage.className = 'message ai-message';
    configMessage.innerHTML = `
        <div class="message-header">🔧 Hızlı Sistem Analizi</div>
        <p><strong>Temel bileşenlerinizi seçin:</strong></p>
        <div class="system-input-form">
            <select id="quick-cpu" class="system-select">
                <option value="">İşlemci Seçin</option>
                ${componentDatabase.cpus.map(cpu => `<option value="${cpu.name}">${cpu.name}</option>`).join('')}
            </select>
            <select id="quick-gpu" class="system-select">
                <option value="">Ekran Kartı Seçin</option>
                ${componentDatabase.gpus.map(gpu => `<option value="${gpu.name}">${gpu.name}</option>`).join('')}
            </select>
            <select id="quick-resolution" class="system-select">
                <option value="">Çözünürlük Seçin</option>
                <option value="1080p">1080p Gaming</option>
                <option value="1440p">1440p Gaming</option>
                <option value="4k">4K Gaming</option>
            </select>
            <button class="primary-btn" onclick="calculateQuickPerformance()">
                <i class="fas fa-calculator"></i> Hızlı Hesapla
            </button>
        </div>
    `;

    chatBox.appendChild(configMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Detaylı Performans Analizi
function startDetailedPerformanceAnalysis() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    addMessageToChat("Detaylı performans analizi seçildi. Tüm sistem bilgilerinizi girin:", 'user');

    const configMessage = document.createElement('div');
    configMessage.className = 'message ai-message';
    configMessage.innerHTML = `
        <div class="message-header">🔧 Detaylı Sistem Analizi</div>
        <p><strong>Tüm bileşenlerinizi seçin:</strong></p>
        <div class="system-input-form">
            <select id="detail-cpu" class="system-select">
                <option value="">İşlemci Seçin</option>
                ${componentDatabase.cpus.map(cpu => `<option value="${cpu.name}">${cpu.name}</option>`).join('')}
            </select>
            <select id="detail-gpu" class="system-select">
                <option value="">Ekran Kartı Seçin</option>
                ${componentDatabase.gpus.map(gpu => `<option value="${gpu.name}">${gpu.name}</option>`).join('')}
            </select>
            <select id="detail-ram" class="system-select">
                <option value="">RAM Seçin</option>
                ${componentDatabase.rams.map(ram => `<option value="${ram.name}">${ram.name}</option>`).join('')}
            </select>
            <select id="detail-ssd" class="system-select">
                <option value="">SSD Seçin</option>
                ${componentDatabase.ssds.map(ssd => `<option value="${ssd.name}">${ssd.name}</option>`).join('')}
            </select>
            <select id="detail-resolution" class="system-select">
                <option value="">Çözünürlük Seçin</option>
                <option value="1080p">1080p Gaming</option>
                <option value="1440p">1440p Gaming</option>
                <option value="4k">4K Gaming</option>
                <option value="ultrawide">Ultra Wide</option>
            </select>
            <button class="primary-btn" onclick="calculateDetailedPerformance()">
                <i class="fas fa-chart-line"></i> Detaylı Hesapla
            </button>
        </div>
    `;

    chatBox.appendChild(configMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Oyun Bazlı Analiz
function startGameSpecificAnalysis() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    addMessageToChat("Oyun bazlı analiz seçildi. Hangi oyun için analiz yapmak istiyorsunuz?", 'user');

    const gameMessage = document.createElement('div');
    gameMessage.className = 'message ai-message';
    gameMessage.innerHTML = `
        <div class="message-header">🎯 Oyun Seçimi</div>
        <p><strong>Analiz etmek istediğiniz oyunu seçin:</strong></p>
        <div class="builder-options">
            ${Object.keys(performanceDatabase.games).map(game => 
                `<button class="builder-option-btn" onclick="selectGameForAnalysis('${game}')">
                    🎮 ${game}
                </button>`
            ).join('')}
        </div>
    `;

    chatBox.appendChild(gameMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Oyun Seçimi
function selectGameForAnalysis(game) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    addMessageToChat(`${game} oyunu için performans analizi istiyorum.`, 'user');

    const configMessage = document.createElement('div');
    configMessage.className = 'message ai-message';
    configMessage.innerHTML = `
        <div class="message-header">🔧 ${game} - Sistem Gereksinimleri</div>
        <p><strong>Sistem bilgilerinizi girin:</strong></p>
        <div class="system-input-form">
            <select id="game-cpu" class="system-select">
                <option value="">İşlemci Seçin</option>
                ${componentDatabase.cpus.map(cpu => `<option value="${cpu.name}">${cpu.name}</option>`).join('')}
            </select>
            <select id="game-gpu" class="system-select">
                <option value="">Ekran Kartı Seçin</option>
                ${componentDatabase.gpus.map(gpu => `<option value="${gpu.name}">${gpu.name}</option>`).join('')}
            </select>
            <select id="game-ram" class="system-select">
                <option value="">RAM Seçin</option>
                ${componentDatabase.rams.map(ram => `<option value="${ram.name}">${ram.name}</option>`).join('')}
            </select>
            <select id="game-resolution" class="system-select">
                <option value="">Çözünürlük Seçin</option>
                <option value="1080p">1080p</option>
                <option value="1440p">1440p</option>
                <option value="4k">4K</option>
            </select>
            <select id="game-settings" class="system-select">
                <option value="">Grafik Ayarları</option>
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
                <option value="ultra">Ultra</option>
                <option value="raytracing">Ray Tracing</option>
            </select>
            <button class="primary-btn" onclick="calculateGamePerformance('${game}')">
                <i class="fas fa-gamepad"></i> ${game} Performansını Hesapla
            </button>
        </div>
    `;

    chatBox.appendChild(configMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Hızlı Performans Hesaplama
function calculateQuickPerformance() {
    const cpu = document.getElementById('quick-cpu')?.value;
    const gpu = document.getElementById('quick-gpu')?.value;
    const resolution = document.getElementById('quick-resolution')?.value;

    if (!cpu || !gpu || !resolution) {
        showNotification('Lütfen tüm alanları doldurun!');
        return;
    }

    showPerformanceResults(cpu, gpu, "32GB DDR5 6000MHz", resolution, "quick");
}

// Detaylı Performans Hesaplama
function calculateDetailedPerformance() {
    const cpu = document.getElementById('detail-cpu')?.value;
    const gpu = document.getElementById('detail-gpu')?.value;
    const ram = document.getElementById('detail-ram')?.value;
    const ssd = document.getElementById('detail-ssd')?.value;
    const resolution = document.getElementById('detail-resolution')?.value;

    if (!cpu || !gpu || !ram || !ssd || !resolution) {
        showNotification('Lütfen tüm alanları doldurun!');
        return;
    }

    showPerformanceResults(cpu, gpu, ram, resolution, "detailed");
}

// Oyun Performans Hesaplama
function calculateGamePerformance(game) {
    const cpu = document.getElementById('game-cpu')?.value;
    const gpu = document.getElementById('game-gpu')?.value;
    const ram = document.getElementById('game-ram')?.value;
    const resolution = document.getElementById('game-resolution')?.value;
    const settings = document.getElementById('game-settings')?.value;

    if (!cpu || !gpu || !ram || !resolution || !settings) {
        showNotification('Lütfen tüm alanları doldurun!');
        return;
    }

    showGamePerformanceResults(game, cpu, gpu, ram, resolution, settings);
}

// Performans Sonuçlarını Göster
function showPerformanceResults(cpu, gpu, ram, resolution, type) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    // Yükleme mesajı
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai-message';
    loadingMessage.innerHTML = `
        <div class="message-header">🔍 Performans Analizi Yapılıyor</div>
        <div class="thinking-animation">
            <span></span><span></span><span></span>
        </div>
        <p>Sisteminiz analiz ediliyor...</p>
    `;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simüle edilmiş hesaplama
    setTimeout(() => {
        loadingMessage.remove();
        
        // Bileşen performans değerlerini al
        const cpuPerf = componentDatabase.cpus.find(c => c.name === cpu)?.performance || 7;
        const gpuPerf = componentDatabase.gpus.find(g => g.name === gpu)?.performance || 7;
        const ramPerf = componentDatabase.rams.find(r => r.name === ram)?.performance || 7;

        // FPS hesaplama
        const baseFPS = performanceDatabase.resolutions[resolution]?.baseFPS || 60;
        const totalPerformance = (cpuPerf * 0.4 + gpuPerf * 0.5 + ramPerf * 0.1);
        const predictedFPS = Math.round(baseFPS * (totalPerformance / 10));

        // Bottleneck analizi
        const bottleneck = calculateBottleneck(cpuPerf, gpuPerf);
        
        const resultsMessage = document.createElement('div');
        resultsMessage.className = 'message ai-message performance-analysis';
        resultsMessage.innerHTML = `
            <div class="message-header">📊 PERFORMANS ANALİZ SONUÇLARI</div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-gamepad"></i>
                    Oyun Performans Tahmini
                </div>
                <div class="fps-prediction">
                    <div class="fps-item">
                        <div class="fps-resolution">1080p</div>
                        <div class="fps-value">${Math.round(predictedFPS * 1.4)} FPS</div>
                    </div>
                    <div class="fps-item">
                        <div class="fps-resolution">1440p</div>
                        <div class="fps-value">${Math.round(predictedFPS * 1.0)} FPS</div>
                    </div>
                    <div class="fps-item">
                        <div class="fps-resolution">4K</div>
                        <div class="fps-value">${Math.round(predictedFPS * 0.6)} FPS</div>
                    </div>
                    <div class="fps-item">
                        <div class="fps-resolution">Ray Tracing</div>
                        <div class="fps-value">${Math.round(predictedFPS * 0.4)} FPS</div>
                    </div>
                </div>
            </div>

            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-tachometer-alt"></i>
                    Bottleneck Analizi
                </div>
                <p>Sistem dengeniz: <span class="performance-badge ${getBottleneckBadgeClass(bottleneck.level)}">${bottleneck.level}</span></p>
                <div class="bottleneck-meter">
                    <div class="bottleneck-fill" style="width: ${bottleneck.percentage}%"></div>
                </div>
                <div class="bottleneck-labels">
                    <span>Mükemmel</span>
                    <span>İyi</span>
                    <span>Orta</span>
                    <span>Yüksek</span>
                </div>
                <p><strong>${bottleneck.message}</strong></p>
            </div>

            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-star"></i>
                    Performans Değerlendirmesi
                </div>
                <p><strong>CPU Performans:</strong> ${getPerformanceRating(cpuPerf)}</p>
                <p><strong>GPU Performans:</strong> ${getPerformanceRating(gpuPerf)}</p>
                <p><strong>RAM Performans:</strong> ${getPerformanceRating(ramPerf)}</p>
                <p><strong>Önerilen Çözünürlük:</strong> ${getRecommendedResolution(totalPerformance)}</p>
            </div>

            <div class="builder-actions">
                <button class="action-btn details-btn" onclick="showDetailedAnalysis('${cpu}', '${gpu}', '${ram}')">
                    📈 Detaylı Analiz
                </button>
                <button class="action-btn price-btn" onclick="startUpgradeRoadmap()">
                    🚀 Yükseltme Önerileri
                </button>
                <button class="action-btn restart-btn" onclick="startPerformanceAnalysis()">
                    🔄 Yeni Analiz
                </button>
            </div>
        `;

        chatBox.appendChild(resultsMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000);
}

// Oyun Performans Sonuçları
function showGamePerformanceResults(game, cpu, gpu, ram, resolution, settings) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    // Yükleme mesajı
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai-message';
    loadingMessage.innerHTML = `
        <div class="message-header">🎮 ${game} Performans Analizi</div>
        <div class="thinking-animation">
            <span></span><span></span><span></span>
        </div>
        <p>${game} için performans hesaplanıyor...</p>
    `;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        loadingMessage.remove();
        
        const gameData = performanceDatabase.games[game];
        const cpuPerf = componentDatabase.cpus.find(c => c.name === cpu)?.performance || 7;
        const gpuPerf = componentDatabase.gpus.find(g => g.name === gpu)?.performance || 7;
        
        // Oyun bazlı FPS hesaplama
        const basePerformance = (cpuPerf * gameData.cpuWeight + gpuPerf * gameData.gpuWeight);
        let settingsMultiplier = 1.0;
        
        switch(settings) {
            case 'low': settingsMultiplier = 1.4; break;
            case 'medium': settingsMultiplier = 1.1; break;
            case 'high': settingsMultiplier = 0.9; break;
            case 'ultra': settingsMultiplier = 0.7; break;
            case 'raytracing': settingsMultiplier = 0.5; break;
        }
        
        const resolutionMultiplier = performanceDatabase.resolutions[resolution]?.multiplier || 1.0;
        const predictedFPS = Math.round(basePerformance * 10 * settingsMultiplier * resolutionMultiplier);

        const resultsMessage = document.createElement('div');
        resultsMessage.className = 'message ai-message performance-analysis';
        resultsMessage.innerHTML = `
            <div class="message-header">🎮 ${game} PERFORMANS SONUÇLARI</div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-crosshairs"></i>
                    ${game} Performans Tahmini
                </div>
                <p><strong>Seçilen Ayarlar:</strong> ${settings.toUpperCase()} @ ${resolution}</p>
                <div class="fps-prediction">
                    <div class="fps-item">
                        <div class="fps-resolution">Tahmini FPS</div>
                        <div class="fps-value">${predictedFPS} FPS</div>
                    </div>
                    <div class="fps-item">
                        <div class="fps-resolution">1% Low FPS</div>
                        <div class="fps-value">${Math.round(predictedFPS * 0.7)} FPS</div>
                    </div>
                    <div class="fps-item">
                        <div class="fps-resolution">Oyun Deneyimi</div>
                        <div class="fps-value">${getGamingExperience(predictedFPS)}</div>
                    </div>
                </div>
            </div>

            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-sliders-h"></i>
                    Optimizasyon Önerileri
                </div>
                ${getGameOptimizationTips(game, predictedFPS, settings)}
            </div>

            <div class="builder-actions">
                <button class="action-btn details-btn" onclick="showGameSettingsOptimization('${game}')">
                    ⚙️ Ayar Optimizasyonu
                </button>
                <button class="action-btn price-btn" onclick="startPerformanceAnalysis()">
                    🔄 Yeni Analiz
                </button>
            </div>
        `;

        chatBox.appendChild(resultsMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000);
}

// Bottleneck Hesaplama
function calculateBottleneck(cpuPerf, gpuPerf) {
    const difference = Math.abs(cpuPerf - gpuPerf);
    const percentage = (difference / Math.max(cpuPerf, gpuPerf)) * 100;
    
    let level, message;
    
    if (percentage <= 5) {
        level = "Mükemmel";
        message = "Sistem mükemmel dengede! 🎉";
    } else if (percentage <= 10) {
        level = "İyi";
        message = "Sistem iyi dengede 👍";
    } else if (percentage <= 20) {
        level = "Orta";
        message = "Küçük bottleneck var, kabul edilebilir ⚠️";
    } else {
        level = "Yüksek";
        message = "Belirgin bottleneck mevcut ❌";
    }

    return { percentage, level, message };
}

// Bottleneck Badge Class
function getBottleneckBadgeClass(level) {
    switch(level) {
        case "Mükemmel": return "badge-excellent";
        case "İyi": return "badge-good";
        case "Orta": return "badge-fair";
        case "Yüksek": return "badge-poor";
        default: return "badge-fair";
    }
}

// Performans Değerlendirmesi
function getPerformanceRating(score) {
    if (score >= 9) return "Mükemmel 🏆";
    if (score >= 8) return "Çok İyi ⭐";
    if (score >= 7) return "İyi 👍";
    if (score >= 6) return "Orta ⚠️";
    return "Geliştirilmeli ❌";
}

// Önerilen Çözünürlük
function getRecommendedResolution(totalPerf) {
    if (totalPerf >= 9) return "4K @ 120Hz+ 🚀";
    if (totalPerf >= 8) return "1440p @ 165Hz ⭐";
    if (totalPerf >= 7) return "1440p @ 144Hz 👍";
    if (totalPerf >= 6) return "1080p @ 144Hz ⚠️";
    return "1080p @ 60Hz";
}

// Oyun Deneyimi Değerlendirmesi
function getGamingExperience(fps) {
    if (fps >= 144) return "Competitive 🚀";
    if (fps >= 60) return "Akıcı 👍";
    if (fps >= 30) return "Oynanabilir ⚠️";
    return "Zorlanıyor ❌";
}

// Oyun Optimizasyon İpuçları
function getGameOptimizationTips(game, fps, settings) {
    let tips = "";
    
    if (fps < 60) {
        tips += `<p><strong>Performansı artırmak için:</strong></p><ul>`;
        if (settings !== 'low') {
            tips += `<li>Grafik ayarlarını "Orta" seviyeye düşürün</li>`;
        }
        tips += `<li>DLSS/FSR'ı etkinleştirin</li>`;
        tips += `<li>Gölge ve yansıma kalitelerini düşürün</li>`;
        tips += `</ul>`;
    } else if (fps >= 100) {
        tips += `<p>Mükemmel performans! Ray Tracing veya daha yüksek ayarları deneyebilirsiniz. ✅</p>`;
    }
    
    return tips;
}

// Bottleneck Analizi Başlat
function startBottleneckAnalysis() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.innerHTML = '';

    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message ai-message bottleneck-welcome';
    welcomeMessage.innerHTML = `
        <div class="message-header">⚡ BOTTLENECK ANALİZ MERKEZİ</div>
        <p><strong>Sistem Darboğazı Tespiti ve Optimizasyon Önerileri</strong></p>
        
        <div class="bottleneck-features">
            <div class="feature-item">
                <i class="fas fa-microchip"></i>
                <span>CPU-GPU performans dengesi</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-memory"></i>
                <span>RAM ve depolama etkisi</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-thermometer-half"></i>
                <span>Termal throttling analizi</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-wrench"></i>
                <span>Optimizasyon çözümleri</span>
            </div>
        </div>

        <div class="bottleneck-options">
            <h4>Mevcut sisteminizi girin:</h4>
            <div class="system-input-form">
                <select id="bottleneck-cpu" class="system-select">
                    <option value="">İşlemci Seçin</option>
                    ${componentDatabase.cpus.map(cpu => 
                        `<option value="${cpu.name}">${cpu.name}</option>`
                    ).join('')}
                </select>
                <select id="bottleneck-gpu" class="system-select">
                    <option value="">Ekran Kartı Seçin</option>
                    ${componentDatabase.gpus.map(gpu => 
                        `<option value="${gpu.name}">${gpu.name}</option>`
                    ).join('')}
                </select>
                <select id="bottleneck-ram" class="system-select">
                    <option value="">RAM Seçin</option>
                    ${componentDatabase.rams.map(ram => 
                        `<option value="${ram.name}">${ram.name}</option>`
                    ).join('')}
                </select>
                <select id="bottleneck-resolution" class="system-select">
                    <option value="">Hedef Çözünürlük</option>
                    <option value="1080p">1080p Gaming</option>
                    <option value="1440p">1440p Gaming</option>
                    <option value="4k">4K Gaming</option>
                    <option value="ultrawide">Ultra Wide</option>
                </select>
                <button class="primary-btn" onclick="analyzeBottleneck()">
                    <i class="fas fa-search"></i> Bottleneck Analizi Yap
                </button>
            </div>
        </div>
    `;

    chatBox.appendChild(welcomeMessage);
    closeMobileSidebar();
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Bottleneck Analiz
function analyzeBottleneck() {
    const cpu = document.getElementById('bottleneck-cpu')?.value;
    const gpu = document.getElementById('bottleneck-gpu')?.value;
    const ram = document.getElementById('bottleneck-ram')?.value;
    const resolution = document.getElementById('bottleneck-resolution')?.value;

    if (!cpu || !gpu || !ram || !resolution) {
        showNotification('Lütfen tüm alanları doldurun!');
        return;
    }

    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    // Yükleme mesajı
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai-message';
    loadingMessage.innerHTML = `
        <div class="message-header">🔍 Bottleneck Analizi Yapılıyor</div>
        <div class="thinking-animation">
            <span></span><span></span><span></span>
        </div>
        <p>Sistem darboğazları tespit ediliyor...</p>
    `;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        loadingMessage.remove();
        
        // Bileşen performans değerlerini al
        const cpuPerf = componentDatabase.cpus.find(c => c.name === cpu)?.performance || 7;
        const gpuPerf = componentDatabase.gpus.find(g => g.name === gpu)?.performance || 7;
        const ramPerf = componentDatabase.rams.find(r => r.name === ram)?.performance || 7;

        const bottleneck = calculateBottleneck(cpuPerf, gpuPerf);
        
        const analysisMessage = document.createElement('div');
        analysisMessage.className = 'message ai-message performance-analysis';
        analysisMessage.innerHTML = `
            <div class="message-header">⚡ BOTTLENECK ANALİZ SONUÇLARI</div>
            
            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-microchip"></i>
                    Sistem Bileşenleri
                </div>
                <p><strong>İşlemci:</strong> ${cpu} (${cpuPerf}/10)</p>
                <p><strong>Ekran Kartı:</strong> ${gpu} (${gpuPerf}/10)</p>
                <p><strong>RAM:</strong> ${ram} (${ramPerf}/10)</p>
                <p><strong>Hedef Çözünürlük:</strong> ${resolution}</p>
            </div>

            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-chart-bar"></i>
                    Bottleneck Durumu
                </div>
                <p>Performans farkı: <strong>${bottleneck.percentage.toFixed(1)}%</strong></p>
                <div class="bottleneck-meter">
                    <div class="bottleneck-fill" style="width: ${bottleneck.percentage}%"></div>
                </div>
                <div class="bottleneck-labels">
                    <span>Mükemmel</span>
                    <span>İyi</span>
                    <span>Orta</span>
                    <span>Yüksek</span>
                </div>
                <p><strong>Denge Seviyesi:</strong> <span class="performance-badge ${getBottleneckBadgeClass(bottleneck.level)}">${bottleneck.level}</span></p>
                <p>${bottleneck.message}</p>
            </div>

            <div class="analysis-section">
                <div class="analysis-title">
                    <i class="fas fa-lightbulb"></i>
                    Optimizasyon Önerileri
                </div>
                ${getBottleneckRecommendations(cpuPerf, gpuPerf, ramPerf, resolution)}
            </div>

            <div class="builder-actions">
                <button class="action-btn price-btn" onclick="startUpgradeRoadmap()">
                    🚀 Yükseltme Planı
                </button>
                <button class="action-btn restart-btn" onclick="startBottleneckAnalysis()">
                    🔄 Yeni Analiz
                </button>
            </div>
        `;

        chatBox.appendChild(analysisMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 2000);
}

// Bottleneck Önerileri
function getBottleneckRecommendations(cpuPerf, gpuPerf, ramPerf, resolution) {
    const diff = cpuPerf - gpuPerf;
    let recommendations = "";
    
    if (Math.abs(diff) <= 2) {
        recommendations = `<p>✅ Sistem mükemmel dengede! Herhangi bir değişiklik gerekmiyor.</p>`;
    } else if (diff > 2) {
        recommendations = `
            <p>⚠️ İşlemci ekran kartına göre çok güçlü. Öneriler:</p>
            <ul>
                <li>Daha güçlü bir ekran kartı düşünün (RTX 5080/5090 veya RX 9800 XT/9900 XTX)</li>
                <li>Mevcut ekran kartını overclock yapmayı deneyin</li>
                <li>Daha yüksek çözünürlükte oyun oynayın (${resolution} → ${getHigherResolution(resolution)})</li>
                <li>DLSS/FSR kalitesini artırın</li>
            </ul>
        `;
    } else {
        recommendations = `
            <p>⚠️ Ekran kartı işlemciye göre çok güçlü. Öneriler:</p>
            <ul>
                <li>Daha güçlü bir işlemci düşünün (i7-14700K veya Ryzen 7 8700X3D)</li>
                <li>RAM hızınızı artırın (DDR5 6000MHz+)</li>
                <li>İşlemci overclock yapmayı deneyin</li>
                <li>Daha düşük çözünürlükte oyun oynayarak CPU'yu rahatlatın</li>
            </ul>
        `;
    }

    // RAM kontrolü
    if (ramPerf < 7) {
        recommendations += `<p>💡 <strong>RAM İyileştirme:</strong> Daha hızlı RAM (DDR5 6000MHz+) sistem performansını %10-15 artırabilir.</p>`;
    }

    return recommendations;
}

// Daha yüksek çözünürlük önerisi
function getHigherResolution(current) {
    const resolutions = ["1080p", "1440p", "4k", "ultrawide"];
    const currentIndex = resolutions.indexOf(current);
    return currentIndex < resolutions.length - 1 ? resolutions[currentIndex + 1] : "8K";
}

// Akıllı Yükseltme Planı Başlat
function startUpgradeRoadmap() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.innerHTML = '';

    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message ai-message roadmap-welcome';
    welcomeMessage.innerHTML = `
        <div class="message-header">🗺️ AKILLI YÜKSELTME YOL HARİTASI</div>
        <p><strong>Geleceğe Yönelik Yükseltme Stratejisi ve Bütçe Planlaması</strong></p>
        
        <div class="roadmap-features">
            <div class="feature-item">
                <i class="fas fa-calendar-alt"></i>
                <span>6-12-24 aylık planlama</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-money-bill-wave"></i>
                <span>Bütçe optimizasyonu</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-chart-line"></i>
                <span>Performans artışı tahmini</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-sync-alt"></i>
                <span>Yeniden satış değeri analizi</span>
            </div>
        </div>

        <div class="roadmap-options">
            <h4>Yükseltme planınızı oluşturalım:</h4>
            <div class="upgrade-input-form">
                <div class="input-group">
                    <label>Mevcut Sistem:</label>
                    <select id="current-cpu" class="system-select">
                        <option value="">İşlemci</option>
                        ${componentDatabase.cpus.map(cpu => 
                            `<option value="${cpu.name}">${cpu.name}</option>`
                        ).join('')}
                    </select>
                    <select id="current-gpu" class="system-select">
                        <option value="">Ekran Kartı</option>
                        ${componentDatabase.gpus.map(gpu => 
                            `<option value="${gpu.name}">${gpu.name}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="input-group">
                    <label>Yükseltme Bütçesi:</label>
                    <select id="upgrade-budget" class="system-select">
                        <option value="5000">₺5.000</option>
                        <option value="10000">₺10.000</option>
                        <option value="15000">₺15.000</option>
                        <option value="20000">₺20.000</option>
                        <option value="25000">₺25.000</option>
                        <option value="30000">₺30.000+</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Yükseltme Önceliği:</label>
                    <select id="upgrade-priority" class="system-select">
                        <option value="gaming">Oyun Performansı</option>
                        <option value="productivity">Üretkenlik</option>
                        <option value="balanced">Dengeli</option>
                        <option value="futureproof">Gelecek Güvencesi</option>
                    </select>
                </div>

                <button class="primary-btn" onclick="generateUpgradeRoadmap()">
                    <i class="fas fa-road"></i> Yol Haritası Oluştur
                </button>
            </div>
        </div>
    `;

    chatBox.appendChild(welcomeMessage);
    closeMobileSidebar();
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Yükseltme Yol Haritası Oluştur
function generateUpgradeRoadmap() {
    const currentCpu = document.getElementById('current-cpu')?.value;
    const currentGpu = document.getElementById('current-gpu')?.value;
    const budget = parseInt(document.getElementById('upgrade-budget')?.value);
    const priority = document.getElementById('upgrade-priority')?.value;

    if (!currentCpu || !currentGpu || !budget) {
        showNotification('Lütfen tüm alanları doldurun!');
        return;
    }

    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    // Yükleme mesajı
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message ai-message';
    loadingMessage.innerHTML = `
        <div class="message-header">🗺️ Yol Haritası Hazırlanıyor</div>
        <div class="thinking-animation">
            <span></span><span></span><span></span>
        </div>
        <p>Size özel yükseltme planı oluşturuluyor...</p>
    `;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simüle edilmiş hesaplama
    setTimeout(() => {
        loadingMessage.remove();
        showUpgradeRoadmap(currentCpu, currentGpu, budget, priority);
    }, 2000);
}

// Yükseltme Yol Haritasını Göster
function showUpgradeRoadmap(currentCpu, currentGpu, budget, priority) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    const roadmapMessage = document.createElement('div');
    roadmapMessage.className = 'message ai-message performance-analysis';
    roadmapMessage.innerHTML = `
        <div class="message-header">🗺️ KİŞİSEL YÜKSELTME YOL HARİTASI</div>
        
        <div class="analysis-section">
            <div class="analysis-title">
                <i class="fas fa-chart-line"></i>
                Mevcut Sistem Analizi
            </div>
            <p><strong>İşlemci:</strong> ${currentCpu}</p>
            <p><strong>Ekran Kartı:</strong> ${currentGpu}</p>
            <p><strong>Yükseltme Bütçesi:</strong> ₺${budget.toLocaleString()}</p>
            <p><strong>Öncelik:</strong> ${getPriorityText(priority)}</p>
        </div>

        <div class="analysis-section">
            <div class="analysis-title">
                <i class="fas fa-road"></i>
                Önerilen Yükseltme Yol Haritası
            </div>
            <div class="upgrade-roadmap">
                ${generateUpgradeSteps(currentCpu, currentGpu, budget, priority)}
            </div>
        </div>

        <div class="analysis-section">
            <div class="analysis-title">
                <i class="fas fa-bullseye"></i>
                Hedeflenen Performans Artışı
            </div>
            <p><strong>Oyun Performansı:</strong> +${Math.min(budget / 1000, 50)}% artış</p>
            <p><strong>Üretkenlik:</strong> +${Math.min(budget / 800, 40)}% artış</p>
            <p><strong>Enerji Verimliliği:</strong> +${Math.min(budget / 1200, 30)}% iyileşme</p>
            <p><strong>Gelecek Güvencesi:</strong> ${getFutureProofing(budget)}</p>
        </div>

        <div class="builder-actions">
            <button class="action-btn price-btn" onclick="showDetailedUpgradePlan('${currentCpu}', '${currentGpu}', ${budget}, '${priority}')">
                📋 Detaylı Plan
            </button>
            <button class="action-btn restart-btn" onclick="startUpgradeRoadmap()">
                🔄 Yeni Plan
            </button>
        </div>
    `;

    chatBox.appendChild(roadmapMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Yükseltme Adımlarını Oluştur
function generateUpgradeSteps(currentCpu, currentGpu, budget, priority) {
    const steps = [];
    let remainingBudget = budget;
    
    // Önceliğe göre sıralama
    if (priority === 'gaming') {
        // 1. Adım: Ekran Kartı
        if (remainingBudget >= 15000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Ekran Kartı Yükseltmesi</div>
                        <div class="step-description">RTX 5070 veya RX 9070 XT - Oyun performansında en büyük artış</div>
                    </div>
                    <div class="step-impact">+40% FPS</div>
                </div>
            `);
            remainingBudget -= 15000;
        }
        
        // 2. Adım: RAM
        if (remainingBudget >= 3000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">RAM Yükseltmesi</div>
                        <div class="step-description">32GB DDR5 6000MHz - Daha yüksek frame rate stabilitesi</div>
                    </div>
                    <div class="step-impact">+10% Performans</div>
                </div>
            `);
            remainingBudget -= 3000;
        }
    } 
    else if (priority === 'productivity') {
        // 1. Adım: RAM
        if (remainingBudget >= 5000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">RAM Yükseltmesi</div>
                        <div class="step-description">64GB DDR5 6400MHz - Çoklu görev ve render performansı</div>
                    </div>
                    <div class="step-impact">+25% Üretkenlik</div>
                </div>
            `);
            remainingBudget -= 5000;
        }
        
        // 2. Adım: SSD
        if (remainingBudget >= 3000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">SSD Yükseltmesi</div>
                        <div class="step-description">2TB NVMe PCIe 4.0 - Daha hızlı dosya işlemleri</div>
                    </div>
                    <div class="step-impact">+30% Hız</div>
                </div>
            `);
            remainingBudget -= 3000;
        }
    }
    else { // balanced veya futureproof
        // 1. Adım: SSD
        if (remainingBudget >= 3000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">SSD Yükseltmesi</div>
                        <div class="step-description">2TB NVMe PCIe 4.0 SSD - Sistem hızında büyük artış</div>
                    </div>
                    <div class="step-impact">+25% Hız</div>
                </div>
            `);
            remainingBudget -= 3000;
        }

        // 2. Adım: RAM
        if (remainingBudget >= 6000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">RAM Yükseltmesi</div>
                        <div class="step-description">32GB DDR5 6000MHz - Çoklu görev performansı</div>
                    </div>
                    <div class="step-impact">+15% Performans</div>
                </div>
            `);
            remainingBudget -= 6000;
        }

        // 3. Adım: Ekran Kartı
        if (remainingBudget >= 15000) {
            steps.push(`
                <div class="upgrade-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Ekran Kartı Yükseltmesi</div>
                        <div class="step-description">RTX 5070 veya RX 9070 XT - Oyun performansında dev artış</div>
                    </div>
                    <div class="step-impact">+50% FPS</div>
                </div>
            `);
            remainingBudget -= 15000;
        }
    }

    return steps.join('');
}

// Gelecek Güvencesi Değerlendirmesi
function getFutureProofing(budget) {
    if (budget >= 25000) return "Mükemmel 🏆 (3+ yıl)";
    if (budget >= 15000) return "İyi ⭐ (2-3 yıl)";
    if (budget >= 8000) return "Orta 👍 (1-2 yıl)";
    return "Temel ⚠️ (1 yıl)";
}

// Öncelik Metni
function getPriorityText(priority) {
    const priorityMap = {
        'gaming': 'Oyun Performansı',
        'productivity': 'Üretkenlik',
        'balanced': 'Dengeli',
        'futureproof': 'Gelecek Güvencesi'
    };
    return priorityMap[priority] || priority;
}

// Fiyat Karşılaştırma
function openPriceComparison() {
    const sites = [
        { name: 'Hepsiburada', url: 'https://www.hepsiburada.com', icon: '🛒' },
        { name: 'Vatan Bilgisayar', url: 'https://www.vatanbilgisayar.com', icon: '💻' },
        { name: 'Trendyol', url: 'https://www.trendyol.com', icon: '📦' },
        { name: 'Amazon TR', url: 'https://www.amazon.com.tr', icon: '📚' },
        { name: 'Teknosa', url: 'https://www.teknosa.com', icon: '⚡' },
        { name: 'İtopya', url: 'https://www.itopya.com', icon: '🖥️' }
    ];
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    chatBox.innerHTML = '';

    const priceMessage = document.createElement('div');
    priceMessage.className = 'message ai-message';
    priceMessage.innerHTML = `
        <div class="message-header">💸 GÜNCEL FİYAT KARŞILAŞTIRMA</div>
        <p><strong>En Popüler E-Ticaret Siteleri</strong></p>
        <p>Aşağıdaki sitelerden güncel fiyatları karşılaştırabilirsiniz:</p>
        
        <div class="builder-options">
            ${sites.map(site => `
                <button class="builder-option-btn" onclick="window.open('${site.url}', '_blank')">
                    ${site.icon} ${site.name}
                </button>
            `).join('')}
        </div>
        
        <div class="config-summary">
            <p><strong>💡 Fiyat Karşılaştırma İpuçları:</strong></p>
            <ul>
                <li>Kampanya ve indirimleri takip edin</li>
                <li>Kargo ücretlerini karşılaştırın</li>
                <li>Garanti sürelerine dikkat edin</li>
                <li>Stok durumunu kontrol edin</li>
            </ul>
        </div>
    `;

    chatBox.appendChild(priceMessage);
    closeMobileSidebar();
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fiyat Trend Analizi
function showPriceTrends() {
    addMessageToChat("Fiyat trend analizi özelliği yakında eklenecek! Şu anda geliştirme aşamasında.", 'ai');
}

// Kurulum Görselleştirme
function startSetupVisualization() {
    addMessageToChat("Kurulum görselleştirme özelliği yakında eklenecek!", 'ai');
}

// Sistem Optimizasyonu
function startSystemOptimization() {
    addMessageToChat("Sistem optimizasyonu özelliği yakında eklenecek!", 'ai');
}

// Uyumluluk Kontrolü
function startCompatibilityCheck() {
    addMessageToChat("Uyumluluk kontrolü özelliği yakında eklenecek!", 'ai');
}

// Oyun Ayar Optimizasyonu
function showGameSettingsOptimization(game) {
    addMessageToChat(`${game} için ayar optimizasyonu özelliği yakında eklenecek!`, 'ai');
}

// Detaylı Analiz Göster
function showDetailedAnalysis(cpu, gpu, ram) {
    addMessageToChat("📈 Detaylı performans analizi hazırlanıyor...", 'ai');
    
    setTimeout(() => {
        const detailedAnalysis = document.createElement('div');
        detailedAnalysis.className = 'message ai-message performance-analysis';
        detailedAnalysis.innerHTML = `
            <div class="message-header">📈 DETAYLI PERFORMANS ANALİZİ</div>
            <p><strong>Seçilen Bileşenler:</strong></p>
            <ul>
                <li>İşlemci: ${cpu}</li>
                <li>Ekran Kartı: ${gpu}</li>
                <li>RAM: ${ram}</li>
            </ul>
            <p><strong>Performans Özeti:</strong></p>
            <ul>
                <li>1080p Gaming: Mükemmel</li>
                <li>1440p Gaming: Çok İyi</li>
                <li>4K Gaming: İyi</li>
                <li>Ray Tracing: Orta-İyi</li>
            </ul>
            <p><strong>Önerilen Oyun Ayarları:</strong></p>
            <ul>
                <li>Competitive Oyunlar: Ultra @ 1440p</li>
                <li>AAA Oyunlar: High @ 1440p</li>
                <li>Ray Tracing Oyunlar: Medium @ 1080p</li>
            </ul>
        `;
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
            chatBox.appendChild(detailedAnalysis);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, 1000);
}

// Detaylı Yükseltme Planı
function showDetailedUpgradePlan(currentCpu, currentGpu, budget, priority) {
    addMessageToChat(`📋 ${budget} TL bütçe ile detaylı yükseltme planı hazırlanıyor...`, 'ai');
    
    setTimeout(() => {
        const detailedPlan = document.createElement('div');
        detailedPlan.className = 'message ai-message performance-analysis';
        detailedPlan.innerHTML = `
            <div class="message-header">📋 DETAYLI YÜKSELTME PLANI</div>
            <p><strong>Bütçe:</strong> ₺${budget.toLocaleString()}</p>
            <p><strong>Öncelik:</strong> ${getPriorityText(priority)}</p>
            <p><strong>Öncelik Sırası:</strong></p>
            <ol>
                <li><strong>SSD Yükseltme</strong> (₺3.200) - Sistem tepkimesi</li>
                <li><strong>RAM Yükseltme</strong> (₺2.800) - Çoklu görev</li>
                <li><strong>Ekran Kartı</strong> (₺18.500) - Oyun performansı</li>
                <li><strong>İşlemci</strong> (₺14.500) - Genel performans</li>
            </ol>
            <p><strong>Toplam Tahmini Maliyet:</strong> ₺${(budget * 0.9).toLocaleString()}</p>
            <p><strong>Önerilen Zamanlama:</strong> 3-6 ay içinde tamamlanabilir</p>
        `;
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
            chatBox.appendChild(detailedPlan);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, 1000);
}

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
    if (!chatBox) return;
    
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
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

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
    
    chatBox.appendChild(questionElement);
    
    // Seçenekleri oluştur
    const optionsContainer = document.getElementById(`builder-options-${index}`);
    if (!optionsContainer) return;
    
    question.options.forEach((option, optionIndex) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'builder-option-btn';
        optionButton.innerHTML = option.emoji ? `${option.emoji} ${option.text}` : option.text;
        optionButton.onclick = () => selectBuilderOption(index, optionIndex, option);
        optionsContainer.appendChild(optionButton);
    });
    
    // Scroll et
    chatBox.scrollTop = chatBox.scrollHeight;
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
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.appendChild(userChoiceElement);
    
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
    if (!chatBox) return;
    
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
            <button class="action-btn price-btn" onclick="openPriceComparison()">
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
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.appendChild(resultElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    
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
        case 'gaming_esports':
            config.cpu = componentDatabase.cpus[2]; // Ryzen 5 8600X
            config.gpu = componentDatabase.gpus[0]; // RTX 5070
            config.ram = componentDatabase.rams[1]; // 32GB DDR5
            break;
        case 'office':
            config.cpu = componentDatabase.cpus[0]; // i5-14600K
            config.gpu = { name: "Entegre GPU", price: 0, performance: 3 }; // Entegre GPU
            config.ram = componentDatabase.rams[0]; // 32GB DDR5
            config.ssd = componentDatabase.ssds[0]; // 1TB SSD
            break;
        case 'content_creation':
            config.cpu = componentDatabase.cpus[1]; // i7-14700K
            config.gpu = componentDatabase.gpus[1]; // RTX 5080
            config.ram = componentDatabase.rams[2]; // 64GB DDR5
            config.ssd = componentDatabase.ssds[2]; // 4TB SSD
            break;
        case '3d_render':
            config.cpu = componentDatabase.cpus[3]; // Ryzen 7 8700X3D
            config.gpu = componentDatabase.gpus[2]; // RTX 5090
            config.ram = componentDatabase.rams[3]; // 96GB DDR5
            config.ssd = componentDatabase.ssds[3]; // 8TB SSD
            break;
        case 'streaming':
            config.cpu = componentDatabase.cpus[1]; // i7-14700K
            config.gpu = componentDatabase.gpus[0]; // RTX 5070
            config.ram = componentDatabase.rams[2]; // 64GB DDR5
            config.ssd = componentDatabase.ssds[1]; // 2TB SSD
            break;
        case 'ai_ml':
            config.cpu = componentDatabase.cpus[5]; // Ryzen 9 8900X
            config.gpu = componentDatabase.gpus[2]; // RTX 5090
            config.ram = componentDatabase.rams[3]; // 128GB DDR5
            config.ssd = componentDatabase.ssds[3]; // 8TB SSD
            break;
        default:
            config.cpu = componentDatabase.cpus[1]; // i7-14700K
            config.gpu = componentDatabase.gpus[0]; // RTX 5070
            config.ram = componentDatabase.rams[1]; // 32GB DDR5
            config.ssd = componentDatabase.ssds[1]; // 2TB SSD
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
        'gaming_esports': 'Oyun & E-Spor',
        'office': 'Ofis & Multimedya',
        'content_creation': 'İçerik Üretimi',
        '3d_render': '3D & Render',
        'streaming': 'Stream & Yayın',
        'ai_ml': 'AI & Makine Öğrenimi'
    };
    return usageMap[usage] || usage;
}

function getBudgetText(budget) {
    const budgetMap = {
        'budget_mid': '₺15.000 - ₺25.000',
        'budget_high': '₺25.000 - ₺40.000',
        'budget_premium': '₺40.000 - ₺65.000',
        'budget_enthusiast': '₺65.000 - ₺100.000',
        'budget_extreme': '₺100.000+',
        'value': 'Fiyat/Performans'
    };
    return budgetMap[budget] || budget;
}

function getPriorityText(priority) {
    const priorityMap = {
        'max_fps': 'Maksimum FPS',
        'value': 'Fiyat/Performans',
        'ray_tracing': 'Ray Tracing',
        'ai_performance': 'AI Performansı',
        'quiet': 'Sessiz Çalışma'
    };
    return priorityMap[priority] || priority;
}

// Detaylı Görünüm Göster
function showConfigurationDetails() {
    addMessageToChat("Detaylı konfigürasyon görünümü yakında eklenecek!", 'ai');
}

// YENİ GÖRSEL ÜRETME SİSTEMİ - ÇALIŞAN VERSİYON
function startImageGeneration() {
    console.log("Görsel üretme başlatıldı");
    isImageGenerationMode = true;
    
    const availableImages = [
        'rtx 8090',
        'rtx 8090 2', 
        'intel 20900k',
        'gaming room',
        'gaming pc',
        'gaming pc 2',
        'rx 10090',
        'rgb setup'
    ];

    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    // Mesajı sohbete ekle
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'ai-message');
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    messageHeader.textContent = 'MERA AI alpha 1.0';
    
    const messageText = document.createElement('p');
    messageText.innerHTML = "🖼️ <strong>2025 Görsel Üretme Modu</strong> 🖼️<br><br>Aşağıdaki 2025 PC bileşenlerinden birini seçin, görselinizi oluşturalım:";
    
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
    chatBox.appendChild(messageElement);
    
    // Mobilde sidebar'ı kapat
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
    
    // Sohbet kutusunu en aşağı kaydır
    chatBox.scrollTop = chatBox.scrollHeight;
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
        <div class="message-header">MERA AI alpha 1.0 - Görsel Üretiliyor</div>
        <div class="loading-stage" id="stage1">AI modeli yükleniyor...</div>
        <div class="loading-stage" id="stage2">2025 bileşenleri render ediliyor...</div>
        <div class="loading-stage" id="stage3">Işıklandırma ayarlanıyor...</div>
        <div class="loading-stage" id="stage4">Görsel hazır!</div>
    `;
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.appendChild(loadingMessage);
    
    // Scroll et
    chatBox.scrollTop = chatBox.scrollHeight;
    
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
        'rtx 8090': '8090.png',
        'rtx 8090 2': 'ez.png',
        'intel 20900k': '20900k.png',
        'gaming room': 'gamer room.png',
        'gaming pc': 'gamerpc.png',
        'gaming pc 2': 'gaming pc.png',
        'rx 10090': 'gg.png',
        'rgb setup': 'rgb setup.png'
    };
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'message ai-message generated-image-container';
    imageContainer.innerHTML = `
        <div class="message-header">MERA AI alpha 1.0 - Görsel Hazır!</div>
        <p>${imageName} görseliniz başarıyla oluşturuldu:</p>
        <img src="${imageUrls[imageName]}" alt="${imageName}" class="generated-image">
        <p style="margin-top: 10px; font-size: 14px; opacity: 0.8;">Başka bir 2025 görseli oluşturmak için "Görsel Üretme" butonuna tıklayın.</p>
    `;
    
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    chatBox.appendChild(imageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    showNotification(`${imageName} görseli başarıyla oluşturuldu!`);
}

// Global fonksiyonlar
function goToPriceSites() {
    const sites = [
        'https://www.hepsiburada.com',
        'https://www.vatanbilgisayar.com', 
        'https://www.trendyol.com',
        'https://www.amazon.com.tr',
        'https://www.technopat.net/satici',
        'https://www.itopya.com'
    ];
    
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    window.open(randomSite, '_blank');
}

// BU FONKSİYON EKLENDİ - Popüler sorulara tıklanabilmesi için
function askQuestionDirectly(question) {
    // Input alanına soruyu yaz
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.value = question;
        // Mesajı gönder
        handleUserMessage();
        // Mobilde sidebar'ı kapat
        if (window.innerWidth <= 768) {
            closeMobileSidebar();
        }
    }
}

// Mobil sidebar fonksiyonları
function openMobileSidebar() {
    const sidebar = document.getElementById('suggestion-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('suggestion-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Mesaj ekleme fonksiyonu
function addMessageToChat(message, sender, animate = true) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return null;
    
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
    messageHeader.textContent = sender === 'user' ? 'Siz' : 'MERA AI 2025';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    messageElement.appendChild(messageHeader);
    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);
    
    // Sohbet kutusunu en aşağı kaydır
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return messageElement;
}

function showNotification(text) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = text;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Hoşgeldin animasyonunu göster
    const welcomeAnimation = document.getElementById('welcome-animation');
    const mainContainer = document.querySelector('.main-container');
    
    if (!welcomeAnimation || !mainContainer) return;
    
    // 3 saniye sonra hoşgeldin animasyonunu kapat ve ana içeriği göster
    setTimeout(() => {
        welcomeAnimation.style.display = 'none';
        mainContainer.style.display = 'flex';
        
        // Ana içerik gösterildikten sonra ilk mesajı ekle
        setTimeout(() => {
            addMessageToChat("Merhaba! Hoşgeldiniz. Ben MERA AI alpha 1.0, PC bileşenleri hakkında sorularınızı yanıtlayabilen gelişmiş bir yapay zeka asistanıyım. RTX 5000 ve RX 9000 serisi ile tamamen güncelim! 200+ soru ile daha kapsamlı hizmet veriyorum. Yeni performans analiz özelliklerim ile sisteminizi değerlendirebiliriz! Size nasıl yardımcı olabilirim?", 'ai');
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
    
    if (!userInput || !sendBtn || !chatBox || !allQuestionsBtn || !modal || !closeBtn || !questionsList || !questionSearch || !themeToggle || !mobileMenuBtn || !sidebarClose || !mobileOverlay) {
        console.error("Bazı HTML elementleri bulunamadı!");
        return;
    }
    
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
        
        // Tüm soruları knowledgeBase'den al
        const allQuestions = knowledgeBase.map(item => item.question);
        
        allQuestions.forEach((question, index) => {
            if (searchTerm === '' || question.toLowerCase().includes(searchTerm)) {
                const questionItem = document.createElement('div');
                questionItem.classList.add('question-item');
                
                const questionText = document.createElement('div');
                questionText.textContent = question;
                
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
                    userInput.value = question;
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
            const availableImages = ['rtx 8090', 'rtx 8090 2', 'intel 20900k', 'gaming room', 'gaming pc', 'gaming pc 2', 'rx 10090', 'rgb setup'];
            
            if (imageIndex >= 0 && imageIndex < availableImages.length) {
                selectImage(availableImages[imageIndex]);
                userInput.value = '';
                return;
            }
        }
        
        // Eğer PC Builder modundaysa
        if (isPCBuilderMode) {
            // PC Builder için özel işlemler burada yapılabilir
            return;
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
        thinkingHeader.textContent = 'MERA AI alpha 1.0 düşünüyor...';
        
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
            "üzgünüm bu soruyu cevaplayamam cevaplayabildiğim tüm sorular sağ üstteki tüm sorular butonunun içinde bulunuyor o butonun içinde sorunuzu bulup üstüne tıklamanız yeterli olacaktır sorunuz yoksa gelecek güncellemeleri bekleyin",
            "PC bileşenleri hakkında size nasıl yardımcı olabilirim? Performans analizi, bottleneck tespiti veya yükseltme planı için sağ taraftaki butonları kullanabilirsiniz.",
            "Üzgünüm, bu sorunun cevabını bilgi tabanımda bulamadım. Başka bir soru sormak ister misiniz?",
            "Bu konuda size yardımcı olabilmem için sorunuzu farklı şekilde ifade edebilir misiniz?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});
