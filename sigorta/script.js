// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp,
    writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration (YENİ AYARLAR)
const firebaseConfig = {
    apiKey: "AIzaSyBmYpW2C7rL6ZG9LNrXF7BCskoUv-B3zFM",
    authDomain: "sivasguvensigorta-f096e.firebaseapp.com",
    projectId: "sivasguvensigorta-f096e",
    storageBucket: "sivasguvensigorta-f096e.firebasestorage.app",
    messagingSenderId: "91641171421",
    appId: "1:91641171421:web:480e82a6e6a9e71951ba34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // v9/v10 stili


const ADMIN_USERNAME_ENCRYPTED = "YWRtaW4=";
const ADMIN_PASSWORD_ENCRYPTED = "TWMxODA5ODM=";  



// DOM elementlerini seçme
const DOM = {
    confirmModal: document.getElementById('confirmModal'),
    confirmMessage: document.getElementById('confirmMessage'),
    confirmYesBtn: document.getElementById('confirmYesBtn'),
    confirmNoBtn: document.getElementById('confirmNoBtn'),
    activeList: document.getElementById('activeList'),
    archiveList: document.getElementById('archiveList'),
    cancelledList: document.getElementById('cancelledList'),
    dataTableBody: document.getElementById('dataTableBody'),
    searchInput: document.getElementById('searchInput'),
    addBtn: document.getElementById('addBtn'),
    saveBtn: document.getElementById('saveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    printBtn: document.getElementById('printBtn'),
    addModal: document.getElementById('addModal'),
    alertModal: document.getElementById('alertModal'),
    alertContent: document.getElementById('alertContent'),
    closeAlertBtn: document.getElementById('closeAlertBtn'),
    activeTabBtn: document.getElementById('activeTabBtn'),
    archiveTabBtn: document.getElementById('archiveTabBtn'),
    cancelledTabBtn: document.getElementById('cancelledTabBtn'),
    archiveAccordion: document.getElementById('archiveAccordion'),
    cancelledAccordion: document.getElementById('cancelledAccordion'),
    notificationBell: document.getElementById('notificationBell'),
    warningCount: document.getElementById('warningCount'),
    container: document.querySelector('.container'),
    activeCountFooter: document.getElementById('activeCountFooter'),
    archiveCountFooter: document.getElementById('archiveCountFooter'),
    cancelledCountFooter: document.getElementById('cancelledCountFooter'),
    monthlyReportModal: document.getElementById('monthlyReportModal'),
    monthlyReportContent: document.getElementById('monthlyReportContent'),
    monthlyReportBtn: document.getElementById('monthlyReportBtn'),
    closeReportBtn: document.getElementById('closeReportBtn'),
    reportMonth: document.getElementById('reportMonth'),
    reportYear: document.getElementById('reportYear'),
    generateReportBtn: document.getElementById('generateReportBtn'),
    detailModal: document.getElementById('detailModal'),
    detailContent: document.getElementById('detailContent'),
    notesAndOffersWrapper: document.getElementById('notesAndOffersWrapper'),
    notesArea: document.getElementById('notesArea'),
    closeDetailBtn: document.getElementById('closeDetailBtn'),
    saveNotesBtn: document.getElementById('saveNotesBtn'),
    addOfferBtn: document.getElementById('addOfferBtn'),
    offersContainer: document.getElementById('offersContainer'),
    formInputs: {
        pbitis: document.getElementById('pbitis'),
        sirket: document.getElementById('sirket'),
        policeNo: document.getElementById('policeNo'),
        isim: document.getElementById('isim'),
        dogumTarihi: document.getElementById('dogumTarihi'),
        tcKimlikNo: document.getElementById('tcKimlikNo'),
        plaka: document.getElementById('plaka'),
        ruhsatSeriNo: document.getElementById('ruhsatSeriNo'),
        telefon: document.getElementById('telefon'),
        referans: document.getElementById('referans'),
        yonlendirenAcente: document.getElementById('yonlendirenAcente'),
        policeType: document.getElementById('policeType'),
        tutar: document.getElementById('tutar'),
        odemeYontemi: document.getElementById('odemeYontemi'), 
        manualCommissionRate: document.getElementById('manualCommissionRate')
    },
    settingsBtn: document.getElementById('settingsBtn'),
    settingsMenu: document.getElementById('settingsMenu'),
    downloadJsonBtn: document.getElementById('downloadJsonBtn'),
    uploadJsonBtn: document.getElementById('uploadJsonBtn'),
    jsonFileInput: document.getElementById('jsonFileInput'),
    // YENİ EKLENENLER
    bulkDeleteBtn: document.getElementById('bulkDeleteBtn'),
    bulkSelectAllHeader: document.getElementById('bulkSelectAllHeader'),
    adminControlsGroup: document.getElementById('adminControlsGroup'),
    deleteArchiveBtn: document.getElementById('deleteArchiveBtn'),
    deleteCancelledBtn: document.getElementById('deleteCancelledBtn'),
    // ADMIN GİRİŞ
    adminLoginModal: document.getElementById('adminLoginModal'),
    adminUsername: document.getElementById('adminUsername'),
    adminPassword: document.getElementById('adminPassword'),
    loginAdminBtn: document.getElementById('loginAdminBtn'),
    cancelAdminLogin: document.getElementById('cancelAdminLogin'),
    loginError: document.getElementById('loginError'),
    logoutBtn: document.getElementById('logoutBtn'),
    // KRİTİK AKTİF FİLTRELEME
    activeFilterMonth: document.getElementById('activeFilterMonth'),
    activeFilterYear: document.getElementById('activeFilterYear'),
    // ACENTE RAPORU VE YAZDIRMA
    agencyReportBtn: document.getElementById('agencyReportBtn'),
    agencyReportModal: document.getElementById('agencyReportModal'),
    agencyReportContent: document.getElementById('agencyReportContent'),
    closeAgencyReportBtn: document.getElementById('closeAgencyReportBtn'),
    agencyReportMonth: document.getElementById('agencyReportMonth'),
    agencyReportYear: document.getElementById('agencyReportYear'),
    printAgencyReportBtn: document.getElementById('printAgencyReportBtn'),
    printSelectionModal: document.getElementById('printSelectionModal'),
    printAgencySelect: document.getElementById('printAgencySelect'),
    confirmPrintBtn: document.getElementById('confirmPrintBtn'),
    cancelPrintBtn: document.getElementById('cancelPrintBtn'),
    // İPTAL MODALI VE BUTONLARI
    cancelPolicyBtn: document.getElementById('cancelPolicyBtn'),
    cancelModal: document.getElementById('cancelModal'),
    cancelDate: document.getElementById('cancelDate'),
    refundAmount: document.getElementById('refundAmount'),
    cancelReason: document.getElementById('cancelReason'),
    saveCancelBtn: document.getElementById('saveCancelBtn'),
    cancelCancelBtn: document.getElementById('cancelCancelBtn'),
    cancellationInfo: document.getElementById('cancellationInfo'),
    cancellationStatus: document.getElementById('cancellationStatus'),
    cancellationDate: document.getElementById('cancellationDate'),
    cancellationRefund: document.getElementById('cancellationRefund'),
    cancellationReason: document.getElementById('cancellationReason'),
    undoCancelBtn: document.getElementById('undoCancelBtn'),
    // YENİ IMM KOMİSYON ALANI
    manualCommissionRateGroup: document.getElementById('manualCommissionRateGroup'),
    zilSesi: document.getElementById('zilSesi'),

    // *** YENİ: VERESİYE DEFTERİ ELEMENTLERİ ***
    debtBookBtn: document.getElementById('debtBookBtn'),
    debtBookModal: document.getElementById('debtBookModal'),
    debtBookListContainer: document.getElementById('debtBookListContainer'),
    // Veresiye Detay Modal
    debtDetailModal: document.getElementById('debtDetailModal'),
    debtCustomerName: document.getElementById('debtCustomerName'),
    debtPolicyNo: document.getElementById('debtPolicyNo'),
    debtTotalAmount: document.getElementById('debtTotalAmount'),
    debtRemainingAmount: document.getElementById('debtRemainingAmount'),
    debtPaymentsContainer: document.getElementById('debtPaymentsContainer'),
    debtPaymentAmount: document.getElementById('debtPaymentAmount'),
    debtPaymentDate: document.getElementById('debtPaymentDate'),
    addPaymentBtn: document.getElementById('addPaymentBtn'),
    closeDebtDetailBtn: document.getElementById('closeDebtDetailBtn'),
    // *****************************************
};

// State Değişkenleri
let currentSortColumn = 'pbitis';
let currentSortDirection = 'asc';
let currentDetailDocId = null;
let selectedIdsForBulkDelete = new Set();
let offers = [];
let currentAgencyReportData = {};
let currentAgencyReportAgencies = [];
// KRİTİK: Admin oturum kalıcılığı için localStorage kontrolü
let ADMIN_LOGGED_IN = localStorage.getItem('adminLoggedIn') === 'true'; 
let isSettingsMenuOpen = false;
// KRİTİK: Zil modalının sadece ilk yüklemede açılması için bayrak
let isInitialLoad = localStorage.getItem('warningModalOpened') !== 'true'; 
// Yeni: Şu anda detay modalında açık olan veresiye kaydının docId'si
let currentDebtDetailDocId = null;
let currentDebtPolicies = [];

// --- YARDIMCI GÖRSELLEŞTİRME FONKSİYONLARI ---

/**
 * Aktif Liste için Ay ve Yıl dropdownlarını doldurur.
 */
function populateActiveFilterDropdowns() {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthIndex = today.getMonth();

    // Ay Dropdown'ı
    let monthOptionsHtml = `<option value="all">Tüm Aktif Poliçeler (Dolmayanlar)</option>`;

    months.forEach((month, index) => {
        const value = String(index + 1).padStart(2, '0');
        const isCurrentMonth = (index === currentMonthIndex);
        monthOptionsHtml += `<option value="${value}" ${isCurrentMonth ? 'selected' : ''}>${month}</option>`;
    });
    if(DOM.activeFilterMonth) DOM.activeFilterMonth.innerHTML = monthOptionsHtml;

    // Yıl Dropdown'ı
    let yearOptionsHtml = '';
    for (let i = currentYear + 1; i >= currentYear - 5; i--) {
        yearOptionsHtml += `<option value="${i}" ${i === currentYear ? 'selected' : ''}>${i}</option>`;
    }
    if(DOM.activeFilterYear) DOM.activeFilterYear.innerHTML = yearOptionsHtml;
}

/**
 * Rapor Dropdownlarını (Ay/Yıl) doldurur.
 * @param {HTMLElement} monthElement - Doldurulacak <select> (ay) elementi.
 * @param {HTMLElement} yearElement - Doldurulacak <select> (yıl) elementi.
*/
function populateReportDropdowns(monthElement, yearElement) {
    if (!monthElement || !yearElement) return;

    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();

    monthElement.innerHTML = months.map((month, index) =>
        `<option value="${index}" ${index === currentMonthIndex ? 'selected' : ''}>${month}</option>`
    ).join('');

    yearElement.innerHTML = '';
    for (let i = currentYear + 1; i >= currentYear - 5; i--) {
        yearElement.innerHTML += `<option value="${i}" ${i === currentYear ? 'selected' : ''}>${i}</option>`;
    }
}
// --- YARDIMCI GÖRSELLEŞTİRME FONKSİYONLARI SONU ---


// Helper Fonksiyonları
function normalizePhone(raw) {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 10 && digits.startsWith('5')) {
        return '90' + digits;
    }
    return digits;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#39;'
    };
    return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

/**
 * Para birimini formatlar.
 * @param {number | string} amount - Formatlanacak sayı.
 * @returns {string} - Formatlanmış string (örn: "1.250,50").
*/
function formatCurrency(amount) {
    let num = parseFloat(amount);
    if (isNaN(num)) {
        num = 0;
    }
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Türkçe formatlı para birimi string'ini sayıya çevirir.
 * @param {string} turkishString - Kullanıcı girdisi (örn: "13.840,50").
 * @returns {number} - Ayrıştırılmış sayı (örn: 13840.5).
*/
function parseCurrency(turkishString) {
    if (typeof turkishString !== 'string' || !turkishString) {
        return 0;
    }
    // 1. Tüm binlik ayıracı olan noktaları kaldır
    // 2. Ondalık ayıracı olan virgülü noktaya çevir
    let parsableString = turkishString.replace(/\./g, '').replace(',', '.');
    let num = parseFloat(parsableString);
    return isNaN(num) ? 0 : num;
}

// === GÜNCELLENEN KOMİSYON FONKSİYONU (Manuel Oran ve Türlere Göre Oranlar) ===
/**
* Verilen poliçe için komisyonları hesaplar.
* @param {Object} policy - Poliçe verisi.
* @param {number} [tahsilatOrani=1] - Poliçe tutarının ne kadarının tahsil edildiği (0-1 arası).
*/
function calculateCommission(policy, tahsilatOrani = 1) {
    let totalTutar = policy.tutar || 0;
    
    // Tahsilat oranı 1'den küçükse, tutarı tahsilat oranıyla çarp
    if (policy.odemeYontemi === 'Veresiye' && tahsilatOrani < 1) {
        totalTutar = totalTutar * tahsilatOrani;
    }

    let baseTutar;

    if (policy.status === 'cancelled' && typeof policy.refundAmount === 'number') {
        const refundAmount = policy.refundAmount || 0;
        baseTutar = Math.max(0, totalTutar - refundAmount);
    } else {
        baseTutar = totalTutar;
    }

    const acenteAdi = (policy.yonlendirenAcente || '').trim().toLocaleUpperCase('tr-TR');
    let toplamKomisyonOrani = 0;
    let acentePayiOrani = 0; // Varsayılan pay 0

    // 1. Poliçe türüne göre ana komisyon oranını belirle (Ondalık format)
    switch (policy.policeType) {
        case 'Trafik':
            toplamKomisyonOrani = 0.10; // %10
            break;
        case 'Kasko':
            toplamKomisyonOrani = 0.15; // %15
            break;
        case 'Konut':
            toplamKomisyonOrani = 0.20; // %20
            break;
        case 'Dask':
            toplamKomisyonOrani = 0.10; // %10
            break;
        case 'TSS':
            toplamKomisyonOrani = 0.20; // %20 (Sağlık)
            break;
        case 'IsYeri':
            toplamKomisyonOrani = 0.15; // %15
            break;
        case 'FerdiKaza':
            toplamKomisyonOrani = 0.20; // %20
            break;
        case 'HekimSorumluluk':
            // Hekim Sorumluluk için sabit %10 (talep edildiği gibi)
            const hekimRate = (policy.manualCommissionRate / 100) || 0;
            toplamKomisyonOrani = hekimRate || 0.10;
            break;
        case 'IMM':
            // IMM için manuel oran (örneğin 16, 17) / 100 olarak kullanılır. Yoksa %15 varsayılır.
            const immRate = (policy.manualCommissionRate / 100) || 0;
            toplamKomisyonOrani = immRate || 0.15;
            break;
        default:
            toplamKomisyonOrani = 0;
            break;
    }

    // 2. Acente Payı Oranını belirle (Sadece komisyon varsa)
    if (toplamKomisyonOrani > 0) {
        if (acenteAdi === 'WEB') {
            acentePayiOrani = 0.70;
        } else if (acenteAdi === 'MERKEZ') {
            acentePayiOrani = 1.00;
        } else if (acenteAdi !== '') {
            acentePayiOrani = 0.60;
        }
    }

    // 3. Komisyon hesapla
    const toplamAlinanKomisyon = baseTutar * toplamKomisyonOrani;
    const acenteyeÖdenecek = toplamAlinanKomisyon * acentePayiOrani;
    const bizeKalan = toplamAlinanKomisyon - acenteyeÖdenecek;

    return {
        baseTutar: baseTutar,
        toplamAlinanKomisyon: toplamAlinanKomisyon,
        acenteyeÖdenecek: acenteyeÖdenecek,
        bizeKalan: bizeKalan
    };
}

function formatDateTR(dateString) {
    if (!dateString || typeof dateString !== 'string') return '';
    try {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const day = parseInt(parts[2]);
            if (year < 1900 || year > 2100) return dateString;
            const date = new Date(year, month, day);
            if (isNaN(date.getTime())) return dateString;
            if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
                return dateString;
            }
            return date.toLocaleDateString('tr-TR', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        }
        return dateString;
    } catch (e) {
        console.error("formatDateTR Hatası:", e, "Giriş:", dateString);
        return dateString;
    }
}


function showConfirm(message) {
    return new Promise(resolve => {
        if(!DOM.confirmModal) { resolve(false); return; }
        DOM.confirmMessage.textContent = message;
        openModal(DOM.confirmModal);

        const handleYes = () => {
            closeModal(DOM.confirmModal);
            DOM.confirmYesBtn.removeEventListener('click', handleYes);
            DOM.confirmNoBtn.removeEventListener('click', handleNo);
            resolve(true);
        };

        const handleNo = () => {
            closeModal(DOM.confirmModal);
            DOM.confirmYesBtn.removeEventListener('click', handleYes);
            DOM.confirmNoBtn.removeEventListener('click', handleNo);
            resolve(false);
        };

        DOM.confirmYesBtn.removeEventListener('click', handleYes);
        DOM.confirmNoBtn.removeEventListener('click', handleNo);
        DOM.confirmYesBtn.addEventListener('click', handleYes);
        DOM.confirmNoBtn.addEventListener('click', handleNo);
    });
}

function showToast(type, message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle'
    };

    toast.innerHTML = `
        <div class="icon">
            <i class="${icons[type] || 'fas fa-info-circle'}"></i>
        </div>
        <div class="message-text">
            ${escapeHtml(message)}
        </div>
    `;

    toastContainer.appendChild(toast);

    const removeToast = () => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, { once: true });
    };

    const timerId = setTimeout(removeToast, 4000);

    toast.addEventListener('click', () => {
        clearTimeout(timerId);
        removeToast();
    }, { once: true });
}

// MODAL FONKSİYONLARI
function openModal(modal) {
    if(modal) modal.classList.add('active');
}
function closeModal(modal) {
    if(modal) modal.classList.remove('active');
}

function toggleSettingsMenu(show) {
    if (show) {
        DOM.settingsMenu.style.display = 'flex';
        // Admin girişi başarılıysa admin kontrollerini göster
        if (ADMIN_LOGGED_IN && DOM.adminControlsGroup) {
            DOM.adminControlsGroup.style.display = 'flex';
        }
        setTimeout(() => DOM.settingsMenu.classList.add('active'), 10);
        isSettingsMenuOpen = true;
    } else {
        DOM.settingsMenu.classList.remove('active');
        setTimeout(() => DOM.settingsMenu.style.display = 'none', 200);
        isSettingsMenuOpen = false;
    }
}

// --- SES ÇALMA FONKSİYONU (YENİ) ---
function playNotificationSound() {
    if (DOM.zilSesi) {
        DOM.zilSesi.currentTime = 0; // Eğer çalmaya devam ediyorsa başa sar
        DOM.zilSesi.play().catch(error => {
            console.warn("Bildirim sesi çalınamadı (Kullanıcı etkileşimi gerekebilir):", error);
        });
    }
}
// --- SES ÇALMA FONKSİYONU SONU ---


// renderTable (Aktif Liste için)
async function renderTable(data, tableBody, isSearch = false) {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentYear = today.getFullYear();
    
    const fifteenDaysLater = new Date(today);
    fifteenDaysLater.setDate(today.getDate() + 15);

    const filterMonth = DOM.activeFilterMonth ? DOM.activeFilterMonth.value : 'all';
    const filterYear = DOM.activeFilterYear ? DOM.activeFilterYear.value : currentYear.toString();
    let filteredData = data;

    // *** KRİTİK FİLTRELEME GÜNCELLEMESİ (Ay ve Yıl) ***
    if (!isSearch) {
        
        if (filterMonth === 'all') {
            // Sadece bitiş tarihi BUGÜN veya sonrası olanlar (yani dolmamış poliçeler)
            filteredData = data.filter(item => {
                if (!item.pbitis || typeof item.pbitis !== 'string') return true;
                try {
                    const parts = item.pbitis.split('-');
                    if (parts.length !== 3) return true;
                    
                    const itemDate = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
                    if (isNaN(itemDate.getTime())) return true;
                    itemDate.setHours(0, 0, 0, 0);
                    
                    return itemDate >= today; // Bugün ve sonrası

                } catch (e) { return true; }
            });
        
        } else {
            // Seçilen ay ve yıl içindeki BÜTÜN poliçeler (günü geçmişler dahil) + o andan itibaren 15 gün içinde dolacaklar (hangi ayda olursa olsun)
            filteredData = data.filter(item => {
                if (!item.pbitis || typeof item.pbitis !== 'string') return false;
                
                try {
                    const parts = item.pbitis.split('-');
                    if (parts.length !== 3) return false;
                    
                    const itemYear = parts[0];
                    const itemMonth = parts[1];
                    
                    const itemDate = new Date(itemYear, parseInt(itemMonth) - 1, parseInt(parts[2]));
                    if (isNaN(itemDate.getTime())) return false;
                    itemDate.setHours(0, 0, 0, 0);

                    // 1. Durum: İtem bitiş tarihi o anki tarihten 15 gün sonrasına kadar mı? (Acil durum - tüm aylardan)
                    const isDueInNextFifteenDays = itemDate >= today && itemDate <= fifteenDaysLater;
                    
                    // 2. Durum: İtem bitiş ayı ve yılı seçilen filtreye tam olarak uyuyor mu? (Geçmiştekiler dahil)
                    const isInSelectedMonthAndYear = (itemMonth === filterMonth) && (itemYear === filterYear);
                    
                    return isInSelectedMonthAndYear || isDueInNextFifteenDays;

                } catch (e) { 
                    console.warn("renderTable filter error:", e, item.pbitis);
                    return false;
                }
            });
        }
    }
    // *** KRİTİK FİLTRELEME GÜNCELLEMESİ SONU ***


    filteredData.forEach(item => {
        const tr = document.createElement('tr');
        let bitisDate;
        let diffDays = Infinity;

        try {
            if (item.pbitis && typeof item.pbitis === 'string') {
                const parts = item.pbitis.split('-');
                if (parts.length === 3) {
                    bitisDate = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
                    if (!isNaN(bitisDate.getTime())) {
                        bitisDate.setHours(0, 0, 0, 0);
                        diffDays = Math.ceil((bitisDate - today) / (1000 * 60 * 60 * 24));
                    } else {
                        console.warn(`renderTable: Geçersiz tarih (${item.pbitis}): ${item.docId}`);
                    }
                } else {
                    console.warn(`renderTable: Beklenmedik tarih formatı (${item.pbitis}): ${item.docId}`);
                }
            }
        } catch(e){
            console.error(`renderTable: Tarih işleme hatası (${item.pbitis}): ${item.docId}`, e);
        }

        let rowClass = '';
        const isCancelled = item.status === 'cancelled';
        const isArchive = item.status === 'archived';
        // *** YENİ: Veresiye Borç Durumu ***
        const isDebtor = item.odemeYontemi === 'Veresiye' && (item.borcMiktari || 0) > 0;
        let debtInfo = '';

        if (isDebtor) {
            rowClass = 'debt-row'; 
            debtInfo = `<br><span style="color:var(--red-color); font-size: 0.75em;">BORÇ: ${formatCurrency(item.borcMiktari)} ₺</span>`;
        }

        if (isCancelled) {
            rowClass = 'cancelled-row';
        } else if (item.called === true) {
            rowClass = 'called-row';
        } else if (diffDays >= 0 && diffDays <= 15) { // *** KIRMIZI KURALI: 0 GÜN (Bugün doluyorsa) ve 15 gün arası ***
            rowClass = 'red-row';
        } else if (diffDays > 15) { // *** YEŞİL KURALI: 15 günden fazla varsa ***
            rowClass = 'green-row';
        } else if (diffDays < 0) { // Süresi dolmuş ama filtrelendiği için gösteriliyor
             rowClass = 'expired-row'; 
        }


        tr.className = rowClass;

        tr.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('.action-buttons') && !e.target.closest('.customer-status-cell') && e.target.type !== 'checkbox' && !e.target.closest('.bulk-select-cell')) {
                openDetailModal(item.docId);
            }
        };

        const phoneE164 = normalizePhone(item.telefon);

        tr.innerHTML = `
            <td class="bulk-select-cell" onclick="event.stopPropagation()">
                <input type="checkbox" id="bulk_select_${item.docId}" value="${item.docId}"
                    onclick="handleBulkSelect('${item.docId}', this.checked)"
                    ${selectedIdsForBulkDelete.has(item.docId) ? 'checked' : ''}
                    >
            </td>
            <td>${formatDateTR(item.pbitis)}</td>
            <td>${escapeHtml(item.policeType || '-')}</td>
            <td>${escapeHtml(item.sirket || '-')}</td>
            <td>${escapeHtml(item.policeNo || '-')}</td>
            <td>${escapeHtml(item.tcKimlikNo || '-')}</td>
            <td>${escapeHtml(item.isim || '-')} ${debtInfo}</td>
            <td>${escapeHtml(item.plaka || '-')}</td>
            <td>${escapeHtml(item.ruhsatSeriNo || '-')}</td>
            <td>${escapeHtml(item.telefon || '-')}</td>
            <td>${formatCurrency(item.tutar || 0)} ₺</td>
            <td class="action-buttons" onclick="event.stopPropagation()">

                ${!isArchive && !isCancelled && item.telefon ? `
                <button class="whatsapp-btn" onclick="handleWhatsApp('${escapeHtml(item.isim)}', '${escapeHtml(item.plaka)}', '${escapeHtml(item.pbitis)}', '${escapeHtml(item.policeType)}', '${phoneE164}'); event.stopPropagation();" title="WhatsApp'tan Hatırlat">
                    <i class="fab fa-whatsapp"></i>
                </button>
                ` : ''}

                <button class="edit-btn" onclick="editItem('${item.docId}'); event.stopPropagation();" title="Düzenle"><i class="fas fa-edit"></i></button>

                <button class="delete-btn" onclick="deleteItem('${item.docId}'); event.stopPropagation();" title="Sil"><i class="fas fa-trash"></i></button>

                ${!isArchive && !isCancelled ? `
                    <button class="renew-archive-btn" onclick="renewAndArchiveAction('${item.docId}', '${item.pbitis}'); event.stopPropagation();" title="Arşive Taşı & Hatırlatıcı Kur"><i class="fas fa-sync-alt"></i></button>
                ` : isCancelled ? `
                    <button class="unarchive-btn" onclick="undoCancellation('${item.docId}'); event.stopPropagation();" title="İptali Geri Al"><i class="fas fa-undo"></i></button>
                ` : `
                    <button class="unarchive-btn" onclick="unarchiveItem('${item.docId}'); event.stopPropagation();" title="Aktife Taşı"><i class="fas fa-undo"></i></button>
                `}
            </td>
            <td class="customer-status-cell" onclick="event.stopPropagation()">
                <input type="checkbox" id="called_${item.docId}"
                    ${item.called ? 'checked' : ''}
                    onclick="toggleCustomerStatus('${item.docId}', this.checked)"
                    ${isCancelled ? 'disabled' : ''}>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    try {
        // Toplam Aktif Kayıt Sayısını alma
        const activeQueryV10 = query(collection(db, "policies"), where("status", "==", "active"));
        const totalActiveRecords = (await getDocs(activeQueryV10)).size;
        
        // Aktif listede gösterilen (filtrelenmiş) verinin sayısını bulma
        const renderedCount = filteredData.filter(item => item.status === 'active').length;

        if(DOM.activeCountFooter) DOM.activeCountFooter.textContent = `Toplam Kayıt: ${renderedCount} / ${totalActiveRecords} (Filtreye uygun / Toplam Aktif)`;
    } catch (e) {
        console.error("Aktif kayıt sayısı alınamadı:", e);
        if(DOM.activeCountFooter) DOM.activeCountFooter.textContent = `Toplam Kayıt: ${filteredData.length} / ?`;
    }

    if (filteredData.length === 0 && tableBody.parentNode.tagName === 'TABLE') {
        const colspan = tableBody.previousElementSibling?.rows[0]?.cells.length || 13; 
        tableBody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center; padding: 20px;">Bu filtreye uygun aktif poliçe bulunmamaktadır.</td></tr>`;
    }
    updateBulkDeleteButtonState();
}


// Formatlama Fonksiyonları (Orijinal Koddan Alındı)
function formatTCKimlikNo(input) {
    if(input) input.value = input.value.replace(/\D/g, '');
}

function formatRuhsatSeriNo(input) {
    if(!input) return;
    let value = input.value.toLocaleUpperCase('tr-TR');
    let letters = (value.match(/[A-ZĞÜŞİÖÇ]/g) || []).join('').substring(0, 2);
    let numbers = (value.match(/[0-9]/g) || []).join('').substring(0, 6);
    input.value = letters + (numbers.length > 0 ? '-' + numbers : '');
}

// renderArchiveAccordion (Arşiv ve İptal Listesi için - BULK SELECT eklenmiştir)
async function renderArchiveAccordion(data, isCancelled = false) {
    const accordionElement = isCancelled ? DOM.cancelledAccordion : DOM.archiveAccordion;
    const footerElement = isCancelled ? DOM.cancelledCountFooter : DOM.archiveCountFooter;
    const status = isCancelled ? 'cancelled' : 'archived';

    if(!accordionElement || !footerElement) return;

    accordionElement.innerHTML = '';

    try {
        const queryV10 = query(collection(db, "policies"), where("status", "==", status));
        const totalRecords = (await getDocs(queryV10)).size;
        footerElement.textContent = `Toplam Kayıt: ${data.length} / ${totalRecords} (Filtreye uygun / Toplam ${isCancelled ? 'İptal Edilmiş' : 'Arşiv'})`;
    } catch (e) {
        console.error(`${status} sayacı alınamadı:`, e);
        footerElement.textContent = `Toplam Kayıt: ${data.length} / ?`;
    }

    if (data.length === 0) {
        accordionElement.innerHTML = `<p style="text-align:center;">Henüz ${isCancelled ? 'iptal edilmiş' : 'arşivlenmiş'} poliçe bulunmamaktadır.</p>`;
        return;
    }

    const monthlyData = data.reduce((acc, item) => {
        let month = 'Geçersiz Tarih';
        let dateKey = item.pbitis;

        if (isCancelled && item.cancellationDate && !item.cancellationDate.startsWith('0000')) {
            dateKey = item.cancellationDate;
        }

        try {
            if (dateKey && typeof dateKey === 'string') {
                const parts = dateKey.split('-');
                if (parts.length === 3) {
                    const date = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
                    if(!isNaN(date.getTime())) {
                        month = date.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });
                    } else {
                        console.warn(`renderArchiveAccordion: Geçersiz tarih (${dateKey}): ${item.docId}`);
                    }
                } else {
                    console.warn(`renderArchiveAccordion: Beklenmedik tarih formatı (${dateKey}): ${item.docId}`);
                }
            }
        } catch(e) { console.error(`renderArchiveAccordion: Tarih işleme hatası (${dateKey}): ${item.docId}`, e); }

        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(item);
        return acc;
    }, {});

    if (DOM.searchInput.value.trim() !== '') {
        const searchSummary = `ARAMA SONUÇLARI (${data.length})`;
        const filteredMonthlyData = {};
        filteredMonthlyData[searchSummary] = data;
        Object.keys(monthlyData).forEach(key => delete monthlyData[key]);
        Object.assign(monthlyData, filteredMonthlyData);
    }

    for (const month in monthlyData) {
        const monthData = monthlyData[month];
        const accordionItem = document.createElement('details');
        if (month.startsWith('ARAMA SONUÇLARI')) {
            accordionItem.open = true;
        }
        
        // Bu grup içindeki tüm docId'leri topla (handleBulkSelectGroup için)
        const docIdsInGroup = monthData.map(item => item.docId).join(',');

        accordionItem.innerHTML = `
            <summary>${escapeHtml(month)} (${monthData.length} Kayıt)</summary>
            <div class="accordion-content">
                <div class="table-wrapper"> <table class="data-table" style="min-width: 100%;">
                    <thead>
                        <tr>
                            <th class="bulk-select-cell" style="width: 30px;" onclick="event.stopPropagation();">
                                <input type="checkbox" onchange="handleBulkSelectGroup(this.checked, '${docIdsInGroup}');" title="Gruptaki Tümünü Seç/Kaldır">
                            </th>
                            <th>Bitiş Tarihi</th>
                            <th>Poliçe Türü</th>
                            <th>Şirket</th>
                            <th>Poliçe No</th>
                            <th>TC No</th>
                            <th>İsim Soyad</th>
                            <th>Plaka</th>
                            <th>Ruhsat Seri No</th>
                            <th>Telefon</th>
                            <th>Tutar</th><th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `;
        accordionElement.appendChild(accordionItem);

        const tableBody = accordionItem.querySelector('tbody');
        monthData.forEach(item => {
            const row = document.createElement('tr');

            row.onclick = (e) => {
                if (e.target.tagName !== 'BUTTON' && !e.target.closest('.action-buttons') && !e.target.closest('.customer-status-cell') && e.target.type !== 'checkbox' && !e.target.closest('.bulk-select-cell')) {
                    openDetailModal(item.docId);
                }
            };

            const isCancelledItem = item.status === 'cancelled';
            
            // *** YENİ: Veresiye Borç Durumu ***
            const isDebtor = item.odemeYontemi === 'Veresiye' && (item.borcMiktari || 0) > 0;
            let debtInfo = '';
            if (isDebtor) {
                debtInfo = `<br><span style="color:var(--red-color); font-size: 0.75em;">BORÇ: ${formatCurrency(item.borcMiktari)} ₺</span>`;
            }


            row.innerHTML = `
                <td class="bulk-select-cell" onclick="event.stopPropagation()">
                    <input type="checkbox" id="bulk_select_${item.docId}" value="${item.docId}"
                        onclick="handleBulkSelect('${item.docId}', this.checked)"
                        ${selectedIdsForBulkDelete.has(item.docId) ? 'checked' : ''}>
                </td>
                <td>${formatDateTR(item.pbitis)}</td>
                <td>${escapeHtml(item.policeType || '-')}</td>
                <td>${escapeHtml(item.sirket || '-')}</td>
                <td>${escapeHtml(item.policeNo || '-')}</td>
                <td>${escapeHtml(item.tcKimlikNo || '-')}</td>
                <td>${escapeHtml(item.isim || '-')} ${debtInfo}</td>
                <td>${escapeHtml(item.plaka || '-')}</td>
                <td>${escapeHtml(item.ruhsatSeriNo || '-')}</td>
                <td>${escapeHtml(item.telefon || '-')}</td>
                <td>${formatCurrency(item.tutar || 0)} ₺</td> <td class="action-buttons" onclick="event.stopPropagation()">
                    ${item.telefon && !isCancelledItem ? `
                    <button class="whatsapp-btn" onclick="handleWhatsApp('${escapeHtml(item.isim)}', '${escapeHtml(item.plaka)}', '${escapeHtml(item.pbitis)}', '${escapeHtml(item.policeType)}', '${normalizePhone(item.telefon)}'); event.stopPropagation();" title="WhatsApp'tan Hatırlat">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    ` : ''}

                    <button class="edit-btn" onclick="editItem('${item.docId}'); event.stopPropagation();" title="Düzenle"><i class="fas fa-edit"></i></button>

                    <button class="delete-btn" onclick="deleteItem('${item.docId}'); event.stopPropagation();" title="Sil"><i class="fas fa-trash-alt"></i></button>

                    ${isCancelledItem ? `
                        <button class="unarchive-btn" onclick="undoCancellation('${item.docId}'); event.stopPropagation();" title="İptali Geri Al"><i class="fas fa-undo"></i></button>
                    ` : `
                        <button class="unarchive-btn" onclick="unarchiveItem('${item.docId}'); event.stopPropagation();" title="Aktife Taşı"><i class="fas fa-undo"></i></button>
                    `}
                </td>
            `;
            tableBody.appendChild(row);
        });

             if (monthData.length === 0 && tableBody.parentNode.tagName === 'TABLE') {
                 const colspan = tableBody.previousElementSibling?.rows[0]?.cells.length || 12;
                 tableBody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center; padding: 15px;">Bu grup için kayıt bulunamadı.</td></tr>`;
             }
    }
    updateBulkDeleteButtonState();
}


// loadData (Orijinal Koddan Alındı)
async function loadData(isSearch = false) {
    const activeData = [];
    const archiveData = [];
    const cancelledData = [];

    try {
        const [activeSnapshot, archiveSnapshot, cancelledSnapshot] = await Promise.all([
            getDocs(query(collection(db, "policies"), where("status", "==", "active"))),
            getDocs(query(collection(db, "policies"), where("status", "==", "archived"))),
            getDocs(query(collection(db, "policies"), where("status", "==", "cancelled")))
        ]);

        activeSnapshot.forEach(doc => activeData.push({ ...doc.data(), docId: doc.id }));
        archiveSnapshot.forEach(doc => archiveData.push({ ...doc.data(), docId: doc.id }));
        cancelledSnapshot.forEach(doc => cancelledData.push({ ...doc.data(), docId: doc.id }));

        const sortedActiveData = sortData(activeData, currentSortColumn, currentSortDirection);
        const sortedArchiveData = sortData(archiveData, currentSortColumn, currentSortDirection);
        const sortedCancelledData = sortData(cancelledData, currentSortColumn, currentSortDirection);

        if (DOM.activeList && DOM.activeList.style.display !== 'none') {
            await renderTable(sortedActiveData, DOM.dataTableBody, isSearch);
        } else if (DOM.archiveList && DOM.archiveList.style.display !== 'none') {
            await renderArchiveAccordion(sortedArchiveData);
        } else if (DOM.cancelledList && DOM.cancelledList.style.display !== 'none') {
            await renderArchiveAccordion(sortedCancelledData, true);
        }

    } catch (error) {
        console.error("Veri yükleme hatası: ", error);
        showToast('error', 'Poliçe verileri yüklenirken bir hata oluştu.');
        if(DOM.dataTableBody) DOM.dataTableBody.innerHTML = '<tr><td colspan="13" style="text-align:center; color:red; padding: 20px;">Veriler yüklenemedi.</td></tr>';
        if(DOM.archiveAccordion) DOM.archiveAccordion.innerHTML = '<p style="text-align:center; color:red;">Arşiv verileri yüklenemedi.</p>';
        if(DOM.cancelledAccordion) DOM.cancelledAccordion.innerHTML = '<p style="text-align:center; color:red;">İptal verileri yüklenemedi.</p>';
    }
}

// filterData (Orijinal Koddan Alındı)
async function filterData(queryText) {
    const upperCaseQuery = queryText.toLocaleUpperCase('tr-TR');
    let status;
    let isCancelledTab = DOM.cancelledList && DOM.cancelledList.style.display !== 'none';
    let isArchiveTab = DOM.archiveList && DOM.archiveList.style.display !== 'none';

    if (isCancelledTab) {
        status = 'cancelled';
    } else if (isArchiveTab) {
        status = 'archived';
    } else {
        status = 'active';
    }

    const collectionRef = query(collection(db, 'policies'), where('status', '==', status));

    try {
        const snapshot = await getDocs(collectionRef);
        const dataToFilter = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));

        const queryWords = upperCaseQuery.split(' ').filter(word => word.length > 0);

        const filtered = dataToFilter.filter(item => {
            const searchScope = `${item.isim || ''} ${item.plaka || ''} ${item.policeNo || ''} ${item.tcKimlikNo || ''}`.toLocaleUpperCase('tr-TR'); // TC Kimlik No da eklendi
            if (queryWords.length === 0) return true;
            const scopeWords = searchScope.split(' ');
            return queryWords.every(queryWord =>
                scopeWords.some(scopeWord => scopeWord.startsWith(queryWord))
            );
        });

        const sortedFilteredData = sortData(filtered, currentSortColumn, currentSortDirection);

        if (status === 'active') {
            // Arama yapılırken filtreleri varsayılana ayarla
            if (DOM.activeFilterMonth && queryWords.length > 0) {
                DOM.activeFilterMonth.value = 'all';
                DOM.activeFilterYear.value = new Date().getFullYear().toString();
            }
            await renderTable(sortedFilteredData, DOM.dataTableBody, true);
        } else {
            await renderArchiveAccordion(sortedFilteredData, isCancelledTab);
        }

    } catch (error) {
        console.error("Filtreleme hatası:", error);
        showToast('error', 'Arama sırasında bir hata oluştu.');
    }
}

// sortData (DÜZELTİLDİ: 'return sorted;' eklendi)
function sortData(data, column, direction) {
    const sorted = [...data].sort((a, b) => {
        const valA = a[column];
        const valB = b[column];
        let primaryComparison = 0;

        // 1. Birincil Karşılaştırma
        if (column === 'pbitis') {
            let timeA = 0, timeB = 0;
            try { timeA = new Date(valA || 0).getTime(); if(isNaN(timeA)) timeA = 0; } catch(e) {}
            try { timeB = new Date(valB || 0).getTime(); if(isNaN(timeB)) timeB = 0; } catch(e) {}
            
            if (timeA === 0 && timeB !== 0) primaryComparison = 1;
            else if (timeB === 0 && timeA !== 0) primaryComparison = -1;
            else primaryComparison = timeA - timeB;

        } else if (column === 'tutar') {
            const numA = valA || 0;
            const numB = valB || 0;
            primaryComparison = numA - numB;
        } else {
            // 'isim', 'policeType' vb. için GÜVENLİ sıralama
            const strA = String(valA || '');
            const strB = String(valB || '');
            
            if (strA < strB) primaryComparison = -1;
            else if (strA > strB) primaryComparison = 1;
            else primaryComparison = 0;
        }

        // 2. İkincil Karşılaştırma (Eğer birincil sonuç 0, yani "eşit" ise)
        if (primaryComparison === 0) {
            
            // 'pbitis'e göre sıralarken isimleri karşılaştır
            if (column !== 'isim') {
                const strA = String(a.isim || '');
                const strB = String(b.isim || '');
                if (strA < strB) return -1;
                if (strA > strB) return 1;
                return 0;
            } 
            
            // 'isim'e göre sıralarken tarihleri karşılaştır
            else {
                let timeA = 0, timeB = 0;
                try { timeA = new Date(a.pbitis || 0).getTime(); if(isNaN(timeA)) timeA = 0; } catch(e) {}
                try { timeB = new Date(b.pbitis || 0).getTime(); if(isNaN(timeB)) timeB = 0; } catch(e) {}
                
                if (timeA === 0 && timeB !== 0) return 1;
                if (timeB === 0 && timeA !== 0) return -1;
                return timeA - timeB;
            }
        }
        
        return direction === 'asc' ? primaryComparison : -primaryComparison;
    });

    // *** EKLENMESİ GEREKEN SATIR BURASI ***
    return sorted; 
}

// handleSort (Orijinal Koddan Alındı)
async function handleSort(column) {
    if (!column) return;

    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }

    if (DOM.searchInput.value.trim() !== '') {
        await filterData(DOM.searchInput.value.trim());
    } else {
        await loadData();
    }
}

// handleSave (GÜNCELLENDİ: 'Nakit'ten 'Veresiye'ye geçiş hatası düzeltildi)
async function handleSave() {
    // Yeni eklenen 'dogumTarihi' değişkeni de dahil edildi.
    const { pbitis, sirket, policeNo, isim, dogumTarihi, tcKimlikNo, plaka, ruhsatSeriNo, telefon, referans, yonlendirenAcente, policeType, tutar, odemeYontemi, manualCommissionRate } = DOM.formInputs;
    const docId = DOM.addModal.getAttribute('data-doc-id');

    if (!policeNo.value.trim() || !isim.value.trim() || !pbitis.value || !policeType.value) {
        showToast('error', 'Poliçe No, İsim, Bitiş Tarihi ve Poliçe Türü zorunludur.');
        return;
    }

    let parsedTutar = parseCurrency(tutar.value);

    let parsedManualCommissionRate = 0;
    if (policeType.value === 'IMM' || policeType.value === 'HekimSorumluluk') {
        const rate = parseFloat(manualCommissionRate.value) || 0;
        if (rate < 0 || rate > 100) {
            showToast('error', 'Komisyon oranı 0 ile 100 arasında olmalıdır.');
            return;
        }
        parsedManualCommissionRate = rate;
    }

    // Formdan gelen güncel veriler
    const data = {
        pbitis: pbitis.value, // örn: 30.10.2026
        sirket: sirket.value.trim().toLocaleUpperCase('tr-TR'),
        policeNo: policeNo.value.trim().toLocaleUpperCase('tr-TR'),
        isim: isim.value.trim().toLocaleUpperCase('tr-TR'),
        dogumTarihi: dogumTarihi.value, // <--- YENİ EKLENDİ
        tcKimlikNo: tcKimlikNo.value.trim(),
        plaka: plaka.value.trim().toLocaleUpperCase('tr-TR'),
        ruhsatSeriNo: ruhsatSeriNo.value.trim().toLocaleUpperCase('tr-TR'),
        telefon: telefon.value.trim(),
        referans: referans.value.trim().toLocaleUpperCase('tr-TR'),
        yonlendirenAcente: yonlendirenAcente.value.trim().toLocaleUpperCase('tr-TR'),
        policeType: policeType.value,
        tutar: parsedTutar,
        odemeYontemi: odemeYontemi.value, 
        manualCommissionRate: parsedManualCommissionRate,
        // *** YENİ: VERESİYE ALANLARI ***
        // YENİ KAYIT İÇİN BORÇ HESAPLAMA:
        borcMiktari: (odemeYontemi.value === 'Veresiye' && parsedTutar > 0) ? parsedTutar : 0, 
        tahsilatlar: [], // Borçlar buraya eklenecek
        // ********************************
    };

    // *** YENİ RAPORLAMA MANTIĞI ***
    // İşlem tarihi = Bitiş Tarihi (pbitis) - 1 Yıl
    let reportDate;
    try {
        const parts = data.pbitis.split('-');
        const bitisDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        
        // Bitiş tarihinden 1 yıl çıkar
        bitisDate.setFullYear(bitisDate.getFullYear() - 1); 

        const newYear = bitisDate.getFullYear();
        const newMonth = String(bitisDate.getMonth() + 1).padStart(2, '0');
        const newDay = String(bitisDate.getDate()).padStart(2, '0');
        reportDate = `${newYear}-${newMonth}-${newDay}`; 
        
        const checkDate = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
        checkDate.setFullYear(checkDate.getFullYear() - 1);
        
        if (checkDate.getMonth() !== (parseInt(parts[1]) - 1)) {
             reportDate = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
        }
        
    } catch (e) {
        console.error("Rapor tarihi (işlem tarihi) hesaplanamadı:", e, data.pbitis);
        const today = new Date();
        const newYear = today.getFullYear();
        const newMonth = String(today.getMonth() + 1).padStart(2, '0');
        const newDay = String(today.getDate()).padStart(2, '0');
        reportDate = `${newYear}-${newMonth}-${newDay}`;
    }
    // *** YENİ MANTIK SONU ***


    try {
        if (docId) {
            // *** DÜZENLEME veya YENİLEME ***
            const docRef = doc(db, "policies", docId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                showToast('error', 'Güncellenecek kayıt bulunamadı.');
                return;
            }
            
            const currentData = docSnap.data();
            
            // --- DÜZELTİLMİŞ BORÇ MANTARI BAŞLANGICI ---
            let updatedBorcMiktari = currentData.borcMiktari || 0;
            let updatedTahsilatlar = currentData.tahsilatlar || [];
            
            if (data.odemeYontemi === 'Veresiye') {
                
                // DURUM 1: Poliçe "Nakit" vs. idi, "Veresiye"ye ÇEVRİLDİ.
                // Eğer hiç tahsilat yoksa, borcu poliçe tutarına eşitle.
                if (currentData.odemeYontemi !== 'Veresiye' && updatedTahsilatlar.length === 0) {
                    updatedBorcMiktari = data.tutar;
                }
                // DURUM 2: Poliçe zaten "Veresiye" idi ve TUTAR DEĞİŞTİ.
                // Eğer hiç tahsilat yoksa, borcu yeni tutara eşitle.
                else if (data.tutar !== currentData.tutar && updatedTahsilatlar.length === 0) {
                     updatedBorcMiktari = data.tutar;
                } 
                // DURUM 3: Poliçe "Veresiye", TUTAR DEĞİŞTİ ve ZATEN TAHSİLAT VAR.
                // Bu durumda borcu otomatik gÜncelleme, kullanıcıyı uyar.
                else if (data.tutar !== currentData.tutar && updatedTahsilatlar.length > 0) {
                     showToast('warning', 'Poliçe tutarı değişti, ancak mevcut borç/tahsilat kayıtları olduğu için borç miktarı otomatik güncellenmedi. Lütfen Veresiye Defterinden kontrol edin.', 'warning');
                     // updatedBorcMiktari değişmez, mevcut borcu korur
                }
                
            } else {
                // DURUM 4: Ödeme yöntemi "Veresiye" DEĞİLSE (Nakit, KK vs.)
                // Borcu ve tahsilatları sıfırla.
                updatedBorcMiktari = 0;
                updatedTahsilatlar = []; 
            }
            // --- DÜZELTİLMİŞ BORÇ MANTARI SONU ---


            if (currentData.status === 'archived') {
                // Bu bir 'ARŞİVDEN YENİLEME' işlemidir.
                
                // 1. YENİ 'aktif' kaydı oluştur (formdaki yeni verilerle)
                await addDoc(collection(db, "policies"), {
                    ...data, 
                    status: 'active',
                    called: false,
                    notes: '', 
                    offers: [], 
                    createdAt: serverTimestamp(),
                    originalReportDate: reportDate,
                    // Not: 'data' objesinden gelen 'borcMiktari' ve 'tahsilatlar' [YENİ KAYIT] mantığına göre kullanılır
                });
                
                // 2. ESKİ 'arşiv' kaydını "kilitle" (hatırlatıcıyı durdur)
                await updateDoc(docRef, {
                    pbitis: currentData.originalReportDate || currentData.pbitis
                });

                showToast('success', 'Poliçe yenilendi! Yeni kayıt Aktif listeye eklendi.');

            } else {
                // Bu, 'aktif' bir kaydın normal 'DÜZENLEME' işlemidir.
                const updateData = {
                    ...data,
                    originalReportDate: reportDate, 
                    status: 'active',
                    // Borç/tahsilat bilgilerini YUKARIDA HESAPLANAN DEĞERLERLE GÜNCELLE
                    borcMiktari: updatedBorcMiktari,
                    tahsilatlar: updatedTahsilatlar
                };
                updateData.policeNo = updateData.policeNo.toLocaleUpperCase('tr-TR');

                await updateDoc(docRef, updateData);
                showToast('success', 'Poliçe başarıyla güncellendi.');
            }

        } else {
            // Bu, normal bir 'YENİ KAYIT' işlemidir.
            try {
                const upperCasePoliceNo = data.policeNo.toLocaleUpperCase('tr-TR');
                const q = query(collection(db, "policies"), where("policeNo", "==", upperCasePoliceNo));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    showToast('error', 'Bu poliçe numarası zaten kayıtlı (aktif, arşivde veya iptal edilmiş).');
                    return;
                }
            } catch (error) {
                console.error("Poliçe no kontrol hatası:", error);
                showToast('error', 'Poliçe numarası kontrol edilirken bir hata oluştu.');
                return;
            }

            // YENİ KAYITTA originalReportDate = HESAPLANAN İŞLEM TARİHİ
            // Not: 'data' objesi 'borcMiktari' ve 'tahsilatlar' alanlarını [YENİ KAYIT] mantığına göre zaten içeriyor.
            await addDoc(collection(db, "policies"), {
                ...data,
                status: 'active',
                called: false,
                notes: '',
                offers: [],
                createdAt: serverTimestamp(),
                originalReportDate: reportDate 
            });
            showToast('success', 'Yeni poliçe başarıyla eklendi.');
        }

        closeModal(DOM.addModal);
        
        // Aktif sekmeye geçiş
        if(DOM.activeTabBtn) DOM.activeTabBtn.click(); 
        
        await loadData(); 
        
        await showWarnings(false);

        // Acente Raporu Anlık Güncelleme Simülasyonu
        if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
            await generateAgencyReport();
        }

        DOM.addModal.removeAttribute('data-doc-id');
        Object.values(DOM.formInputs).forEach(input => input.value = '');

    } catch (error) {
        console.error("Kaydetme/Güncelleme Hatası: ", error);
        showToast('error', `Kayıt ${docId ? 'güncellenirken' : 'eklenirken'} bir sorun oluştu.`);
    }
}


// deleteItem (Orijinal Koddan Alındı)
async function deleteItem(docId) {
    if (!docId) return;
    if (!await showConfirm("Bu kaydı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;

    try {
        await deleteDoc(doc(db, "policies", docId));
        showToast('success', 'Poliçe kaydı kalıcı olarak silindi.');

        await loadData();
        await showWarnings(false);
        // Acente Raporu Anlık Güncelleme Simülasyonu
        if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
            await generateAgencyReport();
        }
    } catch (error) {
        console.error("Silme Hatası:", error);
        showToast('error', 'Silme sırasında bir hata oluştu.');
    }
}

// unarchiveItem (GÜNCELLENDİ: Arşivden Geri Çekme Mantığı Düzeltildi)
async function unarchiveItem(docId) {
    if (!docId) return;
    if (!await showConfirm("Bu kaydı aktif listeye geri taşımak istediğinize emin misiniz?")) return;

    try {
        const docRef = doc(db, "policies", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            showToast('error', 'Kayıt bulunamadı.');
            await loadData();
            return;
        }

        const item = docSnap.data();
        let updateData = { 
            status: 'active',
            originalReportDate: item.originalReportDate // Rapor tarihini her zaman koru
        };

        // *** DÜZELTME BAŞLANGICI ***
        // Düzeltilmiş Mantık:
        if (item.pbitis && typeof item.pbitis === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.pbitis)) {
            try {
                // Arşivdeki hatırlatma tarihini (örn: 2026-10-31) al
                const parts = item.pbitis.split('-'); 
                const reminderDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
    
                if (isNaN(reminderDate.getTime())) {
                    throw new Error('Arşivdeki pbitis tarihi geçersiz');
                }
                
                // 1 Yıl çıkararak Orijinal Poliçe Bitiş Tarihine dön (örn: 2025-10-31)
                reminderDate.setFullYear(reminderDate.getFullYear() - 1);
    
                const originalYear = reminderDate.getFullYear();
                const originalMonth = String(reminderDate.getMonth() + 1).padStart(2, '0');
                const originalDay = String(reminderDate.getDate()).padStart(2, '0');
                const originalPolicyEndDate = `${originalYear}-${originalMonth}-${originalDay}`;
    
                updateData.pbitis = originalPolicyEndDate; // pbitis'i 2025 tarihi ile güncelle
    
            } catch (e) {
                console.error("unarchiveItem: Arşivden geri alınırken tarih hesaplanamadı, pbitis değiştirilmiyor.", e, item.pbitis);
                showToast('warning', 'Arşiv tarihi (pbitis) geçersiz, tarih değiştirilemedi.');
                // Hata durumunda pbitis'i (örn: 2026) olduğu gibi bırak, kullanıcı manuel düzeltsin.
                updateData.pbitis = item.pbitis; 
            }
        } else {
            // pbitis yoksa veya format bozuksa, dokunma. Sadece aktife al.
            console.warn("unarchiveItem: Arşivdeki kaydın pbitis tarihi geçersiz, tarih değiştirilmeden aktife alınıyor.", item.docId);
            updateData.pbitis = item.pbitis; // Olduğu gibi bırak
        }
        // *** DÜZELTME SONU ***

        await updateDoc(docRef, updateData);

        showToast('success', 'Poliçe aktif listeye taşındı.');

        if(DOM.activeTabBtn) DOM.activeTabBtn.click();
        await showWarnings(false);
        // Acente Raporu Anlık Güncelleme Simülasyonu
        if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
            await generateAgencyReport();
        }

    } catch (error) {
        console.error("Arşivden Çıkarma Hatası:", error);
        showToast('error', 'Arşivden çıkarma sırasında hata oluştu.');
    }
}

// editItem (Orijinal Koddan Alındı)
async function editItem(docId) {
    if (!docId) return;
    try {
        const docRef = doc(db, "policies", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            showToast("error", "Düzenlenecek kayıt bulunamadı!");
            await loadData();
            return;
        }
        const item = docSnap.data();

        Object.values(DOM.formInputs).forEach(input => input.value = ''); 
        if(DOM.manualCommissionRateGroup) DOM.manualCommissionRateGroup.style.display = 'none';

        Object.keys(DOM.formInputs).forEach(key => {
            if (key === 'tutar') {
                DOM.formInputs[key].value = formatCurrency(item[key] || 0);
            } else if (key === 'manualCommissionRate') {
                DOM.formInputs[key].value = item[key] || '';
            } else {
                DOM.formInputs[key].value = item[key] || (key === 'policeType' || key === 'odemeYontemi' ? "" : '');
            }
        });

        if (item.policeType === 'IMM' || item.policeType === 'HekimSorumluluk') {
            if(DOM.manualCommissionRateGroup) DOM.manualCommissionRateGroup.style.display = 'flex';
            DOM.formInputs.manualCommissionRate.value = item.manualCommissionRate || (item.policeType === 'IMM' ? 15 : 10);
        }


        DOM.addModal.querySelector('h3').textContent = 'Poliçe Düzenle';
        DOM.addModal.setAttribute('data-doc-id', docId);
        openModal(DOM.addModal);
    } catch(error) {
        console.error("Düzenleme için veri yükleme hatası: ", error);
        showToast('error', 'Düzenleme için veri yüklenirken hata oluştu.');
    }
}

// renewAndArchiveAction (Yenileme Mantığı Düzeltildi - Yeni Kayıt Oluşturur)
async function renewAndArchiveAction(docId, currentExpiryDateStr) {
    if (!docId) return;

    if (!currentExpiryDateStr || typeof currentExpiryDateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(currentExpiryDateStr)) {
        showToast('error', 'Arşivleme yapılamadı: Poliçenin geçerli bir bitiş tarihi (YYYY-AA-GG) bulunmuyor.');
        return;
    }
    
    // Orijinal poliçe verisini çek
    const docRef = doc(db, "policies", docId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        showToast('error', 'Poliçe kaydı bulunamadı.');
        return;
    }
    const item = docSnap.data();

    // Raporlama tarihini koru
    const existingReportDate = item.originalReportDate || currentExpiryDateStr;
    
    const confirmationMessage = `Bu poliçeyi arşivlemek istediğinize emin misiniz? Kayıt, Arşiv sekmesine taşınacak ve bir sonraki yıl için hatırlatma ayarlanacaktır. (Bu bir yenileme DEĞİLDİR).`;
    if (!await showConfirm(confirmationMessage)) return;

    try {
        const parts = currentExpiryDateStr.split('-');
        const currentDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);

        if (isNaN(currentDate.getTime())) {
            showToast('error', 'Geçersiz tarih formatı algılandı.');
            return;
        }

        currentDate.setFullYear(currentDate.getFullYear() + 1);

        const newYear = currentDate.getFullYear();
        const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const newDay = String(currentDate.getDate()).padStart(2, '0');
        const newExpiryDateStr = `${newYear}-${newMonth}-${newDay}`;
        
        // Sadece mevcut poliçeyi güncelle (ARŞİVE TAŞI)
        await updateDoc(docRef, {
            status: 'archived',
            originalReportDate: existingReportDate, // Raporlama tarihini KORU 
            pbitis: newExpiryDateStr // Hatırlatma tarihini 1 yıl ileri al 
        });

        showToast('success', `Poliçe Arşiv'e taşındı. Yeni hatırlatma tarihi: ${formatDateTR(newExpiryDateStr)}.`);
        
        // Veriyi yeniden yükle (kayıt aktif listeden kaybolacak)
        await loadData();
        await showWarnings(false);

    } catch (error) {
        console.error("Arşivleme hatası: ", error);
        showToast('error', 'Poliçe arşivlenirken bir hata oluştu.');
    }
}

// handleWhatsApp (Orijinal Koddan Alındı)
function handleWhatsApp(name, plate, bitisDate, policeType, phone) {
    const validPhone = normalizePhone(phone); // Güncellenmiş normalizePhone'u kullanır
    if (!validPhone) {
        showToast('warning', 'Müşterinin geçerli bir telefon numarası kayıtlı değil.');
        return;
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    let bitis;
    let diffDays = NaN;

    try {
        if(bitisDate && typeof bitisDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(bitisDate)) {
            const parts = bitisDate.split('-');
            bitis = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
            bitis.setHours(0,0,0,0);
            if (!isNaN(bitis.getTime())) {
                diffDays = Math.ceil((bitis - today) / (1000 * 60 * 60 * 24));
            }
        }
    } catch(e) { console.warn("WhatsApp için tarih hatası:", bitisDate); }

    const kalan = !isNaN(diffDays) && diffDays >= 0 ? diffDays : '?';
    const agentName = "SİVAS GÜVEN SİGORTA - MESUT CİN";
    
    // *** YENİ EKLENEN SATIR ***
    const agentPhone = "+905464981333"; // Sizin iletişim numaranız
    // *** DEĞİŞİKLİK SONU ***

    let dynamicSubject = "";
    const cleanPoliceType = policeType || '';

    if (cleanPoliceType === "Trafik" || cleanPoliceType === "Kasko") {
        dynamicSubject = `${plate ? plate + ' plakalı aracınızın ' : ''}${cleanPoliceType} sigortası`;
    } else if (cleanPoliceType) {
        dynamicSubject = `${cleanPoliceType} poliçeniz`;
    } else {
        dynamicSubject = `Sigorta poliçeniz`;
    }

    let dateText = `nın bitmesine ${kalan} gün kaldı.`;
    if (kalan === '?') {
        dateText = `nın bitiş tarihini kontrol ediniz.`;
    }

    // *** GÜNCELLENEN MESAJ SATIRI ***
    const message = `Sn. ${name || 'Müşterimiz'},\n${dynamicSubject}${dateText}\n\nPoliçenizi yenilemek ve size özel tekliflerimizi öğrenmek için bize ulaşabilirsiniz.\n\n${agentName}\n${agentPhone}`;
    // *** DEĞİŞİKLİK SONU ***
    
    const url = `https://wa.me/${validPhone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
}
// toggleCustomerStatus (Orijinal Koddan Alındı)
async function toggleCustomerStatus(docId, isChecked) {
    if (!docId) return;
    try {
        const docRef = doc(db, "policies", docId);
        await updateDoc(docRef, { called: !!isChecked });
        showToast('info', `Müşteri aranma durumu güncellendi.`);

        await loadData();
        await showWarnings(false);
    } catch (error) {
        console.error("Müşteri durumu güncelleme hatası: ", error);
        showToast('error', 'Durum güncellenirken bir sorun oluştu.');
    }
}

// Yeni Fonksiyon: Toplu Seçim İşlemi (Her satır için)
function handleBulkSelect(docId, isChecked) {
    if (isChecked) {
        selectedIdsForBulkDelete.add(docId);
    } else {
        selectedIdsForBulkDelete.delete(docId);
    }
    updateBulkDeleteButtonState();
}

// Yeni Fonksiyon: Tümünü Seçme (Aktif Liste için)
function handleBulkSelectAll(isChecked) {
    const checkboxes = document.querySelectorAll('#dataTableBody input[type="checkbox"][id^="bulk_select_"]');
    checkboxes.forEach(cb => {
        if (cb.checked !== isChecked) {
            cb.checked = isChecked;
            handleBulkSelect(cb.value, isChecked);
        }
    });
}

// Yeni Fonksiyon: Grup Seçimi (Arşiv/İptal Accordion için)
function handleBulkSelectGroup(isChecked, docIdsString) {
    const docIds = docIdsString.split(',');
    docIds.forEach(docId => {
        const checkbox = document.getElementById(`bulk_select_${docId}`);
        if (checkbox) {
            // Checkbox DOM'da varsa görseli güncelle
            if (checkbox.checked !== isChecked) {
                checkbox.checked = isChecked;
            }
        }
        // Seçim kümesini güncelle (DOM'da olmasa bile)
        handleBulkSelect(docId, isChecked);
    });
}


// Yeni Fonksiyon: Buton Durumunu Güncelle
function updateBulkDeleteButtonState() {
    const count = selectedIdsForBulkDelete.size;
    const btn = DOM.bulkDeleteBtn;
    if (!btn) return;

    btn.textContent = `Seçilenleri Sil (${count})`;
    btn.disabled = count === 0;

    // Aktif listeye özel "Tümünü Seç" başlık kontrolü
    if (DOM.activeList && DOM.activeList.style.display !== 'none' && DOM.bulkSelectAllHeader) {
        const allCheckboxes = document.querySelectorAll('#dataTableBody input[type="checkbox"][id^="bulk_select_"]');
        const activeSelectedCount = Array.from(allCheckboxes).filter(cb => selectedIdsForBulkDelete.has(cb.value)).length;
        
        DOM.bulkSelectAllHeader.checked = allCheckboxes.length > 0 && activeSelectedCount === allCheckboxes.length;
        DOM.bulkSelectAllHeader.indeterminate = activeSelectedCount > 0 && activeSelectedCount < allCheckboxes.length;
    }

    // Seçilen öğelerin tikini listede korumak için (render sonrası görsel güncelleme)
    document.querySelectorAll('input[id^="bulk_select_"]').forEach(cb => {
         cb.checked = selectedIdsForBulkDelete.has(cb.value);
    });
}

// Yeni Fonksiyon: Toplu Silme İşlemi (Seçilen Tüm Poliçeler)
async function bulkDeleteActiveItems() {
    if (selectedIdsForBulkDelete.size === 0) {
        showToast('warning', 'Silmek için herhangi bir kayıt seçilmedi.');
        return;
    }

    const count = selectedIdsForBulkDelete.size;
    if (!await showConfirm(`${count} adet seçili kaydı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;

    try {
        const batch = writeBatch(db);
        selectedIdsForBulkDelete.forEach(docId => {
            const docRef = doc(db, "policies", docId);
            batch.delete(docRef);
        });

        await batch.commit();

        showToast('success', `${count} adet poliçe başarıyla kalıcı olarak silindi.`);

        selectedIdsForBulkDelete.clear(); // Küme temizlenir
        await loadData(); // Liste yenilenir
        await showWarnings(false);

    } catch (error) {
        console.error("Toplu silme hatası:", error);
        showToast('error', 'Toplu silme sırasında bir hata oluştu.');
    }
}

// Yeni Fonksiyon: Statüye Göre Tüm Listeyi Temizleme (Admin)
async function bulkDeleteByStatus(statusToDelete) {
    if (!ADMIN_LOGGED_IN) {
        showToast('error', 'Bu işlem için yönetici girişi gereklidir.');
        return;
    }

    const statusName = statusToDelete.charAt(0).toUpperCase() + statusToDelete.slice(1);
    if (!await showConfirm(`${statusName} durumundaki TÜM kayıtları kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve çok dikkatli kullanılmalıdır!`)) return;

    try {
        const q = query(collection(db, "policies"), where("status", "==", statusToDelete));
        const snapshot = await getDocs(q);
        const count = snapshot.size;

        if (count === 0) {
            showToast('info', `${statusName} durumunda silinecek kayıt bulunamadı.`);
            return;
        }

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        showToast('success', `${count} adet ${statusName} kaydı başarıyla kalıcı olarak silindi.`);
        
        // Seçim kümesini temizle (silinenler varsa)
        snapshot.docs.forEach(doc => selectedIdsForBulkDelete.delete(doc.id));

        await loadData();
        await showWarnings(false);

    } catch (error) {
        console.error(`Toplu ${statusToDelete} silme hatası:`, error);
        showToast('error', `${statusName} silinirken bir hata oluştu.`);
    }
}


// openDetailModal (GÜNCELLENDİ: Doğum Tarihi Eklendi ve Hata Düzeltildi)
async function openDetailModal(docId) {
    if (!docId) return;
    currentDetailDocId = docId;
    
    // Temizleme ve Hazırlık
    DOM.notesArea.value = '';
    if(DOM.detailContent) DOM.detailContent.innerHTML = '<p style="text-align:center;">Yükleniyor...</p>';
    if(DOM.offersContainer) DOM.offersContainer.innerHTML = '';
    if(DOM.cancellationInfo) DOM.cancellationInfo.style.display = 'none';
    if(DOM.cancelPolicyBtn) DOM.cancelPolicyBtn.style.display = 'none';
    if(DOM.notesAndOffersWrapper) DOM.notesAndOffersWrapper.style.display = 'block'; 

    // ********** YEREL YARDIMCI FONKSİYON **********
    /**
     * Tarih formatını YYYY-MM-DD'den DD.MM.YYYY'ye çevirir (dogumTarihi ve detail için).
     */
    const formatDateForDisplay = (dateString) => {
        if (!dateString || typeof dateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return '-';
        try {
            const parts = dateString.split('-');
            return `${parts[2]}.${parts[1]}.${parts[0]}`;
        } catch {
            return '-';
        }
    };
    // **********************************************

    try {
        const docRef = doc(db, "policies", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            showToast("error", "Kayıt bulunamadı!");
            closeModal(DOM.detailModal);
            await loadData();
            return;
        }
        const item = docSnap.data();
        const isCancelled = item.status === 'cancelled';
        const isArchived = item.status === 'archived';

        if (isCancelled) {
            if(DOM.cancellationStatus) DOM.cancellationStatus.textContent = "İPTAL EDİLMİŞ";
            if(DOM.cancellationDate) DOM.cancellationDate.textContent = formatDateTR(item.cancellationDate || '-');
            if(DOM.cancellationRefund) DOM.cancellationRefund.textContent = formatCurrency(item.refundAmount || 0) + ' ₺';
            if(DOM.cancellationReason) DOM.cancellationReason.textContent = item.cancellationReason || 'Belirtilmemiş';
            if(DOM.cancellationInfo) DOM.cancellationInfo.style.display = 'block';
            if(DOM.notesAndOffersWrapper) DOM.notesAndOffersWrapper.style.display = 'none';
            if(DOM.saveNotesBtn) DOM.saveNotesBtn.style.display = 'none';
            if(DOM.undoCancelBtn) DOM.undoCancelBtn.style.display = 'inline-flex';
        } else {
            if(DOM.cancellationInfo) DOM.cancellationInfo.style.display = 'none';
            if(DOM.notesAndOffersWrapper) DOM.notesAndOffersWrapper.style.display = 'block';
            if(DOM.saveNotesBtn) DOM.saveNotesBtn.style.display = 'inline-flex';
            if(DOM.undoCancelBtn) DOM.undoCancelBtn.style.display = 'none';
        }

        if(DOM.cancelPolicyBtn) DOM.cancelPolicyBtn.style.display = isCancelled || isArchived ? 'none' : 'inline-flex';
        if(DOM.closeDetailBtn) DOM.closeDetailBtn.style.display = 'inline-flex';
        
        // Veresiye borç bilgisi
        let debtStatusHtml = '';
        if (item.odemeYontemi === 'Veresiye') {
            const borcMiktari = item.borcMiktari || 0;
            const statusColor = borcMiktari > 0 ? 'var(--red-color)' : 'var(--green-color)';
            const statusText = borcMiktari > 0 ? formatCurrency(borcMiktari) + ' ₺ (Borçlu)' : 'Ödendi';
            
            debtStatusHtml = `<p><strong>Veresiye Borç:</strong> <span style="color: ${statusColor}; font-weight: 700;">${statusText}</span></p>`;
        }


        // *** GÜNCELLENMİŞ DETAY İÇERİĞİ ***
        if(DOM.detailContent) DOM.detailContent.innerHTML = `
            <p><strong>İsim Soyad:</strong> <span>${escapeHtml(item.isim || '-')}</span></p>
            
            <p><strong>Doğum Tarihi:</strong> <span>${formatDateForDisplay(item.dogumTarihi || '-')}</span></p>
            
            <p><strong>Poliçe Türü:</strong> <span>${escapeHtml(item.policeType || '-')}</span></p>
            <p><strong>Poliçe No:</strong> <span>${escapeHtml(item.policeNo || '-')}</span></p>
            <p><strong>Poliçe Tutarı:</strong> <span>${formatCurrency(item.tutar || 0)} ₺</span></p>
            <p><strong>Ödeme Yöntemi:</strong> <span>${escapeHtml(item.odemeYontemi || 'Belirtilmemiş')}</span></p>
            ${debtStatusHtml}
            <p><strong>Referans:</strong> <span>${escapeHtml(item.referans || '-')}</span></p>
            <p><strong>Yön. Acente:</strong> <span>${escapeHtml(item.yonlendirenAcente || '-')}</span></p>
            <p><strong>TC Kimlik No:</strong> <span>${escapeHtml(item.tcKimlikNo || '-')}</span></p>
            <p><strong>Plaka:</strong> <span>${escapeHtml(item.plaka || '-')}</span></p>
            <p><strong>Ruhsat Seri No:</strong> <span>${escapeHtml(item.ruhsatSeriNo || '-')}</span></p>
            <p><strong>Telefon:</strong> <span>${escapeHtml(item.telefon || '-')}</span></p>
        `;
        // *** GÜNCELLEME SONU ***

        if(DOM.notesArea) DOM.notesArea.value = item.notes || '';
        if(DOM.notesArea) DOM.notesArea.disabled = isCancelled;

        if (!isCancelled) {
            offers = (Array.isArray(item.offers) && item.offers.length > 0)
                ? item.offers
                : [{ company: '', amount: 0 }];
            renderOffers(isCancelled);
        }

        openModal(DOM.detailModal);

    } catch(error) {
        console.error("Detay modal hatası: ", error);
        showToast('error', 'Detaylar yüklenirken hata oluştu.');
        closeModal(DOM.detailModal);
    }
}

function renderOffers(isCancelled = false) {
    if(!DOM.offersContainer) return;
    DOM.offersContainer.innerHTML = '';
    if(DOM.addOfferBtn) DOM.addOfferBtn.style.display = isCancelled ? 'none' : 'inline-flex';
    
    if (!Array.isArray(offers) || offers.length === 0) {
        offers = [{ company: '', amount: 0 }];
    }
    
    offers.forEach((offer, index) => {
        const currentOffer = offer || { company: '', amount: 0 };
        const amountValue = currentOffer.amount || 0; 
        const formattedAmount = formatCurrency(amountValue);
        
        let rawAmountDisplay = '';
        if (amountValue && amountValue !== 0) {
            rawAmountDisplay = (amountValue % 1 !== 0) ? amountValue.toFixed(2) : amountValue.toString();
            rawAmountDisplay = rawAmountDisplay.replace('.', ',');
        }

        const offerItem = document.createElement('div');
        offerItem.className = 'offer-item';

        // ✅ İç içe template literal sorununu çözmek için string birleştirme kullandım
        let buttonsHtml = '';
        if (!isCancelled) {
            buttonsHtml = '<button class="save-offer-btn" onclick="saveNotesAndOffers(); event.stopPropagation();" title="Kaydet"><i class="fas fa-save"></i></button>';
            
            if (offers.length > 1) {
                buttonsHtml += '<button class="remove-offer-btn" onclick="removeOffer(' + index + '); event.stopPropagation();" title="Sil"><i class="fas fa-trash"></i></button>';
            }
        }

        offerItem.innerHTML = `
            <div class="form-group" style="margin-bottom:0;">
                <label for="company_${index}">Sigorta Şirketi</label>
                <input type="text" id="company_${index}" value="${escapeHtml(currentOffer.company || '')}"
                    placeholder="Şirket Adı"
                    oninput="updateOfferCompany(this.value, ${index})"
                    ${isCancelled ? 'disabled' : ''} />
            </div>
            <div class="form-group" style="margin-bottom:0;">
                <label for="amount_${index}">Teklif Tutarı</label>
                <div class="input-wrapper">
                    <input type="text" id="amount_${index}" value="${formattedAmount}"
                        placeholder="0,00"
                        oninput="updateOfferAmount(this, ${index}, 'input')"
                        onfocus="this.value = '${rawAmountDisplay}'"
                        onblur="updateOfferAmount(this, ${index}, 'blur')"
                        inputmode="decimal"
                        ${isCancelled ? 'disabled' : ''}
                        />
                </div>
            </div>
            <div class="offer-buttons">
                ${buttonsHtml}
            </div>
        `;
        DOM.offersContainer.appendChild(offerItem);
    });
}


// updateOfferCompany (Orijinal Koddan Alındı)
function updateOfferCompany(value, index) {
    if (offers && offers[index]) {
        offers[index].company = value.toLocaleUpperCase('tr-TR');
    } else {
        console.error("updateOfferCompany: Geçersiz index veya offers array'i yok:", index);
    }
}

// updateOfferAmount (Orijinal Koddan Alındı)
function updateOfferAmount(input, index, eventType) {
    if (!offers || !offers[index]) {
        console.error("updateOfferAmount: Geçersiz index veya offers array'i yok:", index);
    }

    let num = parseCurrency(input.value);
    offers[index].amount = num;

    if (eventType === 'blur') {
        input.value = formatCurrency(num);
    }
    else if (eventType === 'input') {
        input.value = input.value.replace(/[^\d,.]/g, '');
    }
}


// addOffer (Orijinal Koddan Alındı)
function addOffer() {
    if (!Array.isArray(offers)) offers = [];
    offers.push({ company: '', amount: 0 }); 
    renderOffers();
}

// removeOffer (Orijinal Koddan Alındı)
async function removeOffer(index) {
    if (!Array.isArray(offers)) offers = [];

    if (offers.length > 1) {
        offers.splice(index, 1);
    } else {
        offers[0] = { company: '', amount: 0 };
    }

    await saveNotesAndOffers();
}

// saveNotesAndOffers (Orijinal Koddan Alındı)
async function saveNotesAndOffers() {
    if (!currentDetailDocId) return;

    const notes = DOM.notesArea.value.trim();

    if (!Array.isArray(offers) || offers.length === 0) {
        offers = [{ company: '', amount: 0 }];
    }

    const offersToSave = offers.map(offer => {
        const company = String(offer?.company || '').trim().toLocaleUpperCase('tr-TR');
        const amount = offer.amount || 0; 

        return {
            company: company,
            amount: amount 
        }
    }).filter(offer =>
        offer.company !== '' || offer.amount > 0
    );

    const finalOffersForFirestore = offersToSave.length > 0 ? offersToSave : [];
    offers = offersToSave.length > 0 ? offersToSave : [{ company: '', amount: 0 }];


    try {
        const docRef = doc(db, "policies", currentDetailDocId);
        await updateDoc(docRef, {
            notes: notes,
            offers: finalOffersForFirestore
        });

        showToast('success', 'Detaylar ve teklifler kaydedildi.');
        renderOffers(DOM.notesArea.disabled);

    } catch(error) {
        console.error("Detay kaydetme hatası: ", error);
        showToast('error', 'Detaylar kaydedilirken bir hata oluştu.');
    }
}

// cancelPolicy (Orijinal Koddan Alındı)
async function cancelPolicy() {
    if (!currentDetailDocId) return;
    closeModal(DOM.detailModal);

    const today = new Date().toISOString().split('T')[0];
    if(DOM.cancelDate) DOM.cancelDate.value = today;
    if(DOM.refundAmount) DOM.refundAmount.value = '0,00';
    if(DOM.cancelReason) DOM.cancelReason.value = '';

    if(DOM.refundAmount) {
        DOM.refundAmount.addEventListener('focus', handleRefundAmountFocus);
        DOM.refundAmount.addEventListener('blur', handleRefundAmountBlur);
        DOM.refundAmount.addEventListener('input', handleRefundAmountInput);
    }

    if(DOM.saveCancelBtn) DOM.saveCancelBtn.onclick = () => saveCancellation(currentDetailDocId);
    openModal(DOM.cancelModal);
}

// handleRefundAmountFocus (Orijinal Koddan Alındı)
function handleRefundAmountFocus(e) {
    let value = e.target.value;
    if (!value) return;
    let num = parseCurrency(value);

    if (num === 0) {
        e.target.value = '';
    } else {
        let rawDisplay = (num % 1 !== 0) ? num.toFixed(2) : num.toString().split('.')[0];
        e.target.value = rawDisplay.replace('.', ',');
    }
}
// handleRefundAmountBlur (Orijinal Koddan Alındı)
function handleRefundAmountBlur(e) {
    let value = e.target.value;
    let num = parseCurrency(value);
    e.target.value = formatCurrency(num);
}
// handleRefundAmountInput (Orijinal Koddan Alındı)
function handleRefundAmountInput(e) {
    e.target.value = e.target.value.replace(/[^\d,.]/g, '');
}


// saveCancellation (Orijinal Koddan Alındı)
async function saveCancellation(docId) {
    const cancelDate = DOM.cancelDate.value;
    const refundAmountString = DOM.refundAmount.value;
    const cancelReason = DOM.cancelReason.value.trim();

    const parsedRefundAmount = parseCurrency(refundAmountString);

    if (!cancelDate) {
        showToast('error', 'Lütfen iptal tarihini girin.');
        return;
    }

    if (isNaN(parsedRefundAmount) || parsedRefundAmount < 0) {
        showToast('error', 'Lütfen geçerli bir iade tutarı girin.');
        return;
    }

    try {
        await updateDoc(doc(db, "policies", docId), {
            status: 'cancelled',
            cancellationDate: cancelDate,
            refundAmount: parsedRefundAmount,
            cancellationReason: cancelReason,
            called: false
        });

        showToast('success', `Poliçe ${formatCurrency(parsedRefundAmount)} ₺ iade ile başarıyla iptal edildi.`);
        closeModal(DOM.cancelModal);

        if(DOM.cancelledTabBtn) DOM.cancelledTabBtn.click();

        await showWarnings(false);
        // Acente Raporu Anlık Güncelleme Simülasyonu
        if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
            await generateAgencyReport();
        }

    } catch (error) {
        console.error("İptal kaydetme hatası: ", error);
        showToast('error', 'İptal bilgileri kaydedilirken bir hata oluştu.');
    }
}

// undoCancellation (Orijinal Koddan Alındı)
async function undoCancellation(docId) {
    if (!docId) return;
    if (!await showConfirm("Bu poliçenin iptalini geri alıp aktif listeye taşımak istediğinize emin misiniz?")) return;

    try {
        await updateDoc(doc(db, "policies", docId), {
            status: 'active',
            cancellationDate: null,
            refundAmount: null,
            cancellationReason: null,
            called: false
        });

        showToast('success', 'Poliçe iptali geri alındı ve aktif listeye taşındı.');
        closeModal(DOM.detailModal);

        if(DOM.activeTabBtn) DOM.activeTabBtn.click();

        await showWarnings(false);
        // Acente Raporu Anlık Güncelleme Simülasyonu
        if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
            await generateAgencyReport();
        }
    } catch (error) {
        console.error("İptali geri alma hatası: ", error);
        showToast('error', 'Poliçenin iptali geri alınırken bir hata oluştu.');
    }
}


// downloadDataAsJson (GÜNCELLENDİ: Borç ve Tahsilat alanları dahil edildi)
async function downloadDataAsJson() {
    showToast('info', 'Veriler Firestore\'dan çekiliyor...');
    try {
        const allPolicies = [];
        const querySnapshot = await getDocs(collection(db, "policies"));

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                try { data.createdAt = data.createdAt.toDate().toISOString(); } catch(e){}
            }
            if (!Array.isArray(data.offers)) {
                data.offers = [];
            }
            if (!Array.isArray(data.tahsilatlar)) { // *** YENİ ***
                data.tahsilatlar = [];
            }
            data.tutar = parseFloat(data.tutar) || 0;
            data.offers = data.offers.map(o => ({
                company: o.company || '',
                amount: parseFloat(o.amount) || 0
            }));
            data.refundAmount = parseFloat(data.refundAmount) || 0;
            data.manualCommissionRate = parseFloat(data.manualCommissionRate) || 0;
            data.odemeYontemi = data.odemeYontemi || ''; // *** YENİ EKLENDİ ***
            data.borcMiktari = parseFloat(data.borcMiktari) || 0; // *** YENİ ***
            data.tahsilatlar = data.tahsilatlar.map(t => ({ // *** YENİ ***
                tutar: parseFloat(t.tutar) || 0,
                tarih: t.tarih || ''
            })); 

            allPolicies.push({ ...data, docId: doc.id });
        });

        const jsonString = JSON.stringify(allPolicies, null, 2);
        const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const today = new Date().toISOString().split('T')[0];
        a.download = `sigorta_yedek_${today}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('success', `Tüm veriler (${allPolicies.length} kayıt) indirildi.`);

    } catch (error) {
        console.error("JSON indirme hatası: ", error);
        showToast('error', 'Veriler indirilirken bir hata oluştu.');
    }
}

// uploadJsonData (GÜNCELLENDİ: Borç ve Tahsilat alanları dahil edildi)
async function uploadJsonData(file) {
    if (!file) {
        showToast('error', 'Lütfen bir JSON dosyası seçin.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            let jsonContent;
            try {
                jsonContent = JSON.parse(e.target.result);
                if (!Array.isArray(jsonContent)) {
                    showToast('error', 'JSON dosyası geçerli bir liste (dizi) içermiyor.');
                    return;
                }
            } catch (parseError) {
                console.error("JSON parse hatası:", parseError);
                showToast('error', 'JSON dosyası okunamadı veya formatı bozuk.');
                return;
            }

            if (!await showConfirm(`Bu dosya ${jsonContent.length} kayıt içeriyor. Kayıtlar veritabanına YENİ olarak eklenecektir. Mevcut veriler etkilenmeyecek, ancak aynı poliçe numarasına sahip kayıtlar ATLANACAKTIR. Devam edilsin mi?`)) {
                showToast('info', 'Yükleme iptal edildi.');
                return;
            }

            showToast('info', `Yükleme başlıyor (${jsonContent.length} kayıt)...`);

            let addedCount = 0;
            let skippedCount = 0;
            const batchLimit = 400;
            let currentBatch = writeBatch(db);
            let currentBatchSize = 0;
            const commitPromises = [];

            const existingPolicyNumbers = new Set();
            try {
                const snapshot = await getDocs(collection(db, "policies"));
                snapshot.forEach(doc => {
                    const policeNo = doc.data()?.policeNo;
                    if (policeNo) existingPolicyNumbers.add(String(policeNo).toLocaleUpperCase('tr-TR'));
                });
            } catch (fetchError) {
                console.error("Mevcut poliçe noları çekilemedi:", fetchError);
                showToast('error', 'Mevcut kayıtlar kontrol edilemedi, yükleme durduruldu.');
                return;
            }

            for (const item of jsonContent) {
                if (!item?.policeNo || !item?.isim || !item?.pbitis) {
                    console.warn('Eksik zorunlu alan (policeNo, isim, pbitis):', item);
                    skippedCount++;
                    continue;
                }

                const upperCasePoliceNo = String(item.policeNo).toLocaleUpperCase('tr-TR');
                if (existingPolicyNumbers.has(upperCasePoliceNo)) {
                    console.log(`Çakışan poliçe no (${upperCasePoliceNo}), atlanıyor.`);
                    skippedCount++;
                    continue;
                }

                let formattedPbitis = '';
                try {
                    const dateStr = String(item.pbitis);
                    const parts = dateStr.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})$/)
                                        || dateStr.match(/^(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2})$/);

                    let year, month, day;
                    if (parts && parts[3].length === 4) {
                        day = parts[1]; month = parts[2]; year = parts[3];
                    } else if (parts && parts[1].length === 4) {
                        year = parts[1]; month = parts[2]; day = parts[3];
                    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                        formattedPbitis = dateStr;
                        const checkDate = new Date(formattedPbitis);
                        if (isNaN(checkDate.getTime())) throw new Error("YYYY-AA-GG formatı geçersiz");
                    }

                    if (!formattedPbitis && year && month && day) {
                        formattedPbitis = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                        const checkDate = new Date(formattedPbitis);
                        if (isNaN(checkDate.getTime())) throw new Error("Oluşturulan YYYY-AA-GG geçersiz");
                    }

                    if (!formattedPbitis) {
                        throw new Error("Desteklenmeyen tarih formatı");
                    }
                } catch(e) {
                    console.warn(`Geçersiz/desteklenmeyen tarih (${item.pbitis}), kayıt atlanıyor:`, item, e.message);
                    skippedCount++;
                    continue;
                }

                let createdAtValue = serverTimestamp();
                if (item.createdAt) {
                    try {
                        const parsedDate = new Date(item.createdAt);
                        if (!isNaN(parsedDate.getTime())) {
                            createdAtValue = parsedDate;
                        }
                    } catch(e){}
                }

                let newStatus = 'active'; 
                const oldStatus = String(item.status || '').toLocaleLowerCase();

                if (oldStatus === 'cancelled') {
                    newStatus = 'cancelled';
                } else if (oldStatus === 'archived' || oldStatus === 'expired') {
                    newStatus = 'archived';
                } else {
                    newStatus = 'active';
                }
                
                // Tahsilatları parse et
                const parsedTahsilatlar = (Array.isArray(item.tahsilatlar) ? item.tahsilatlar : []).map(t => ({
                    tutar: parseFloat(String(t?.tutar || '0').replace(',', '.')) || 0,
                    tarih: String(t?.tarih || '')
                })).filter(t => t.tutar > 0 && t.tarih);


                const dataToSave = {
                    pbitis: formattedPbitis,
                    sirket: String(item.sirket || '').toLocaleUpperCase('tr-TR'),
                    policeNo: upperCasePoliceNo,
                    isim: String(item.isim || '').toLocaleUpperCase('tr-TR'),
                    tcKimlikNo: String(item.tcKimlikNo || ''),
                    plaka: String(item.plaka || '').toLocaleUpperCase('tr-TR'),
                    ruhsatSeriNo: String(item.ruhsatSeriNo || '').toLocaleUpperCase('tr-TR'),
                    telefon: String(item.telefon || ''),
                    referans: String(item.referans || '').toLocaleUpperCase('tr-TR'),
                    yonlendirenAcente: String(item.yonlendirenAcente || '').toLocaleUpperCase('tr-TR'),
                    policeType: String(item.policeType || ''),
                    tutar: parseFloat(String(item.tutar || '0').replace(',', '.')) || 0,
                    status: newStatus,
                    called: item.called === true,
                    notes: String(item.notes || ''),
                    offers: (Array.isArray(item.offers) ? item.offers : []).map(o => ({
                        company: String(o?.company || '').toLocaleUpperCase('tr-TR'),
                        amount: parseFloat(String(o?.amount || '0').replace(',', '.')) || 0
                    })).filter(o => o.company || o.amount > 0),
                    createdAt: createdAtValue,
                    refundAmount: parseFloat(String(item.refundAmount || '0').replace(',', '.')) || 0,
                    manualCommissionRate: parseFloat(String(item.manualCommissionRate || '0').replace(',', '.')) || 0,
                    // YENİ/GÜNCELLENEN LOGIC
                    originalReportDate: item.originalReportDate || formattedPbitis, 
                    odemeYontemi: String(item.odemeYontemi || ''), // *** YENİ EKLENDİ ***
                    borcMiktari: parseFloat(String(item.borcMiktari || '0').replace(',', '.')) || 0, // *** YENİ ***
                    tahsilatlar: parsedTahsilatlar // *** YENİ ***
                };
                
                // Borç miktarı 0 değilse ve tahsilat varsa borcu yeniden hesapla
                if (dataToSave.odemeYontemi === 'Veresiye' && parsedTahsilatlar.length > 0) {
                     const totalPaid = parsedTahsilatlar.reduce((sum, t) => sum + t.tutar, 0);
                     dataToSave.borcMiktari = Math.max(0, dataToSave.tutar - totalPaid);
                } else if (dataToSave.odemeYontemi === 'Veresiye' && dataToSave.borcMiktari === 0) {
                     dataToSave.borcMiktari = dataToSave.tutar;
                } else if (dataToSave.odemeYontemi !== 'Veresiye') {
                    dataToSave.borcMiktari = 0;
                    dataToSave.tahsilatlar = [];
                }

                if (dataToSave.status === 'cancelled') {
                    dataToSave.cancellationDate = item.cancellationDate || null;
                    dataToSave.cancellationReason = item.cancellationReason || '';
                }

                const newDocRef = doc(collection(db, "policies"));
                currentBatch.set(newDocRef, dataToSave);
                existingPolicyNumbers.add(upperCasePoliceNo);
                addedCount++;
                currentBatchSize++;

                if (currentBatchSize >= batchLimit) {
                    commitPromises.push(currentBatch.commit());
                    currentBatch = writeBatch(db);
                    currentBatchSize = 0;
                    showToast('info', `${commitPromises.length * batchLimit} kayıt gönderildi...`);
                    await new Promise(resolve => setTimeout(resolve, 600));
                }
            }

            if (currentBatchSize > 0) {
                commitPromises.push(currentBatch.commit());
            }

            try {
                await Promise.all(commitPromises);
                showToast('success', `Yükleme tamamlandı: ${addedCount} eklendi, ${skippedCount} atlandı.`);
                await loadData();
            } catch (commitError) {
                console.error("Batch commit hatası:", commitError);
                showToast('error', `Yükleme sırasında hata oluştu: ${commitError.message}`);
            }

        } catch (error) {
            console.error("Yedek yükleme sırasında kritik hata: ", error);
            showToast('error', `Yükleme başarısız oldu: ${error.message}`);
        } finally {
            DOM.jsonFileInput.value = '';
        }
    };

    reader.readAsText(file);
}

// Yeni Fonksiyon: Admin Giriş Durumuna Göre Ayarlar Menüsünü Güncelle
function updateAdminSettingsVisibility() {
    if (DOM.adminControlsGroup) {
        DOM.adminControlsGroup.style.display = ADMIN_LOGGED_IN ? 'flex' : 'none';
    }
    
    // Toplu Sil (bulkDeleteBtn) butonu artık toolbar'da.
    if (DOM.bulkDeleteBtn) {
        DOM.bulkDeleteBtn.style.display = ADMIN_LOGGED_IN ? 'inline-flex' : 'none';
        
        // Görünür hale geldikten sonra hemen durumunu güncelle
        if (ADMIN_LOGGED_IN) {
            updateBulkDeleteButtonState();
        }
    }
    
    if(DOM.settingsBtn) DOM.settingsBtn.classList.toggle('admin-active', ADMIN_LOGGED_IN);
    if (!ADMIN_LOGGED_IN) {
        toggleSettingsMenu(false);
    }
}

// Admin Giriş (Orijinal Koddan Alındı)
function handleAdminLogin() {
    const usernameInput = DOM.adminUsername.value.trim();
    const passwordInput = DOM.adminPassword.value.trim();
    if(DOM.loginError) DOM.loginError.style.display = 'none';

    try {
        const decodedUsername = atob(ADMIN_USERNAME_ENCRYPTED);
        const decodedPassword = atob(ADMIN_PASSWORD_ENCRYPTED);

        if (usernameInput === decodedUsername && passwordInput === decodedPassword) {
            closeModal(DOM.adminLoginModal);
            ADMIN_LOGGED_IN = true;
            localStorage.setItem('adminLoggedIn', 'true'); // KRİTİK: LOCALSTORAGE'A YAZILDI
            DOM.adminUsername.value = '';
            DOM.adminPassword.value = '';
            updateAdminSettingsVisibility();
            showToast('success', 'Yönetici girişi başarılı.');
            toggleSettingsMenu(true);
        } else {
            if(DOM.loginError) DOM.loginError.textContent = 'Kullanıcı adı veya şifre hatalı.';
            if(DOM.loginError) DOM.loginError.style.display = 'block';
            showToast('error', 'Hatalı kullanıcı adı veya şifre.');
            DOM.adminPassword.value = '';
        }
    } catch (e) {
        console.error("Admin login şifre çözme/kontrol hatası:", e);
        if(DOM.loginError) DOM.loginError.textContent = 'Giriş işlemi sırasında bir hata oluştu.';
        if(DOM.loginError) DOM.loginError.style.display = 'block';
        showToast('error', 'Giriş işlemi sırasında bir hata oluştu.');
    }
}

function handleAdminLogout() {
    ADMIN_LOGGED_IN = false;
    localStorage.removeItem('adminLoggedIn');
    toggleSettingsMenu(false); // Ayarlar menüsünü kapat
    updateAdminSettingsVisibility(); // Admin butonlarını gizle
    showToast('info', 'Yönetici oturumu kapatıldı. Sayfa yenileniyor...');
    
    // Sayfayı yenileyerek tüm admin kontrollerinin sıfırlanmasını sağla
    setTimeout(() => {
        location.reload();
    }, 1500); // Toast mesajının görünmesi için kısa bir bekleme
}


// showWarnings (YENİ: Zil sesi ve ilk açılışta gösterme eklendi)
async function showWarnings(shouldOpenModal = false) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fifteenDaysLater = new Date(today);
    fifteenDaysLater.setDate(today.getDate() + 15);

    const warnings = [];

    try {
        const allPoliciesSnapshot = await getDocs(collection(db, "policies"));

        allPoliciesSnapshot.forEach(doc => {
            const item = { ...doc.data(), docId: doc.id };

            if (!item.pbitis || typeof item.pbitis !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.pbitis)) {
                return;
            }

            if (item.status === 'cancelled') {
                return;
            }

            try {
                const parts = item.pbitis.split('-');
                const bitis = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2]));
                if (isNaN(bitis.getTime())) return;
                bitis.setHours(0,0,0,0);

                if (item.status === 'active' || item.status === 'archived') {
                    // KRİTİK UYARI MANTIĞI: Bugün ile 15 gün sonrası arasındaki bitişler (Aktif ve Arşiv için)
                    if (bitis >= today && bitis <= fifteenDaysLater) {
                        const diffDays = Math.ceil((bitis - today) / (1000 * 60 * 60 * 24));
                        warnings.push({ ...item, type: item.status, daysLeft: diffDays });
                    }
                }
            } catch(e) { console.error(`Uyarı tarihi işleme hatası (${item.pbitis}): ${item.docId}`, e); }
        });

        warnings.sort((a, b) => a.daysLeft - b.daysLeft);

        if(DOM.warningCount) DOM.warningCount.textContent = warnings.length;
        if(DOM.notificationBell) DOM.notificationBell.classList.toggle('has-warnings', warnings.length > 0);

        // Zil sesi çalma mantığı
        if (warnings.length > 0) {
            playNotificationSound();
        }

        // Modal açma mantığı
        if (shouldOpenModal) {
             const hasBeenOpened = localStorage.getItem('warningModalOpened');
             // İlk yüklemede ve daha önce hiç açılmadıysa VEYA manuel tıklamada aç
             const shouldOpenNow = (isInitialLoad && hasBeenOpened === 'false') || (!isInitialLoad && warnings.length > 0);

            if (warnings.length > 0 && shouldOpenNow) {
                if(DOM.alertContent) DOM.alertContent.innerHTML = warnings.map(item => {
                    let message, kalanGunText, cardClass;
                    
                    const formattedBitis = formatDateTR(item.pbitis);
                    kalanGunText = `${item.daysLeft} gün kaldı`;

                    if (item.type === 'active') {
                        message = `Bitiş: ${formattedBitis}`;
                        cardClass = 'warning-card';
                    } else { // item.type === 'archived'
                        message = `Yenileme: ${formattedBitis}`;
                        cardClass = 'archived-warning-card';
                    }

                    return `
                        <div class="${cardClass}">
                            <div class="warning-header">
                                <i class="fas fa-clock warning-icon"></i>
                                <h3>${escapeHtml(item.isim)}</h3>
                            </div>
                            <div class="warning-body">
                                <p><strong>Plaka:</strong> ${escapeHtml(item.plaka || '-')}</p>
                                <p><strong>Tür:</strong> ${escapeHtml(item.policeType || '-')}</p>
                                <p><strong>Durum:</strong> ${message}</p>
                                <p class="days-left"><strong>${kalanGunText}</strong></p>
                            </div>
                            <div class="warning-actions">
                                ${item.telefon ? `<button class="whatsapp-btn" onclick="handleWhatsApp('${escapeHtml(item.isim)}', '${escapeHtml(item.plaka)}', '${escapeHtml(item.pbitis)}', '${escapeHtml(item.policeType)}', '${normalizePhone(item.telefon)}'); closeModal(DOM.alertModal);"><i class="fab fa-whatsapp"></i> Mesaj</button>` : ''}
                                <button class="edit-btn" onclick="editItem('${item.docId}'); closeModal(DOM.alertModal);"><i class="fas fa-edit"></i> Düzenle</button>
                                ${item.type === 'active'
                                    ? ``
                                    : `<button class="unarchive-btn" onclick="unarchiveItem('${item.docId}'); closeModal(DOM.alertModal);"><i class="fas fa-undo"></i> Aktife Taşı</button>`}
                            </div>
                        </div>
                    `;
                }).join('');
                openModal(DOM.alertModal);
                
                // İlk açılış tamamlandıktan sonra bayrağı kalıcı olarak true yap
                if (isInitialLoad) {
                     localStorage.setItem('warningModalOpened', 'true');
                }
            } else if (shouldOpenModal && warnings.length === 0) {
                showToast('info', 'Yaklaşan veya yenilenecek poliçe yok.');
            }
        }

    } catch (error) {
        console.error("Uyarıları gösterirken hata: ", error);
        if(DOM.warningCount) DOM.warningCount.textContent = '?';
        if(DOM.notificationBell) DOM.notificationBell.classList.remove('has-warnings');
    }
}


// generateMonthlyReport (Orijinal Koddan Alındı)
async function generateMonthlyReport() {
    if(!DOM.reportMonth || !DOM.reportYear || !DOM.monthlyReportContent) return;
    const monthIndex = parseInt(DOM.reportMonth.value);
    const year = parseInt(DOM.reportYear.value);

    if (isNaN(monthIndex) || isNaN(year)) return;

    const endDate = new Date(year, monthIndex + 1, 0);

    const startDateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
    const endDateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    DOM.monthlyReportContent.innerHTML = '<p style="text-align:center;">Rapor oluşturuluyor...</p>';

    try {
        const policies = [];
        const q = query(collection(db, "policies"),
            where("pbitis", ">=", startDateString),
            where("pbitis", "<=", endDateString));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            policies.push({ ...doc.data(), docId: doc.id });
        });

        const sortedPolicies = sortData(policies, 'pbitis', 'asc');

        DOM.monthlyReportContent.innerHTML = createReportTable(sortedPolicies);
    } catch (error) {
        console.error("Rapor oluşturma hatası: ", error);
        DOM.monthlyReportContent.innerHTML = '<p style="text-align:center; color: red;">Rapor oluşturulurken hata oluştu.</p>';
    }
}

// createReportTable (Orijinal Koddan Alındı)
function createReportTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return '<p style="text-align:center;">Seçilen ay için poliçe bulunamadı.</p>';
    }

    const reportRows = data.map(item => {
        let statusText;
        let rowClass = item.called ? 'called-row' : '';
        // *** YENİ: Veresiye Borç Durumu ***
        const isDebtor = item.odemeYontemi === 'Veresiye' && (item.borcMiktari || 0) > 0;
        let debtInfo = '';

        if (isDebtor) {
            debtInfo = `<br><span style="color:var(--red-color); font-size: 0.75em;">BORÇ: ${formatCurrency(item.borcMiktari)} ₺</span>`;
        }
        // **********************************

        if (item.status === 'active') {
            statusText = 'Aktif';
        } else if (item.status === 'archived') {
            statusText = 'Arşiv';
        } else if (item.status === 'cancelled') {
            statusText = `İptal Edildi (${formatCurrency(item.refundAmount || 0)} ₺ iade)`;
            rowClass = 'cancelled-row'; 
        } else {
            statusText = 'Bilinmiyor';
        }

        let offersHtml = 'Yok';
        if (Array.isArray(item.offers) && item.offers.length > 0) {
            const validOffers = item.offers.filter(o => o?.company || o?.amount > 0);
            if (validOffers.length > 0) {
                offersHtml = validOffers.map(offer =>
                    `${escapeHtml(offer.company || '?')} : ${formatCurrency(offer.amount || 0)}₺`
                ).join('<br>');
            }
        }

        const editAction = `editItem('${item.docId}'); closeModal(DOM.monthlyReportModal);`;
        const deleteAction = `deleteItem('${item.docId}'); generateMonthlyReport();`;
        const renewAction = `renewAndArchiveAction('${item.docId}', '${item.pbitis}'); generateMonthlyReport();`;
        const unarchiveAction = `unarchiveItem('${item.docId}'); generateMonthlyReport();`;
        const undoCancelAction = `undoCancellation('${item.docId}'); closeModal(DOM.monthlyReportModal);`;

        return `
            <tr class="${rowClass}" onclick="openDetailModal('${item.docId}'); closeModal(DOM.monthlyReportModal);" style="cursor:pointer;">
                <td>${formatDateTR(item.pbitis)}</td>
                <td>${statusText}</td>
                <td class="customer-status-cell" onclick="event.stopPropagation();">
                    <input type="checkbox" id="called_report_${item.docId}"
                        ${item.called ? 'checked' : ''}
                        onclick="toggleCustomerStatus('${item.docId}', this.checked)"
                        ${item.status === 'cancelled' ? 'disabled' : ''}>
                </td>
                <td>${escapeHtml(item.isim || '-')} ${debtInfo}</td>
                <td>${escapeHtml(item.plaka || '-')}</td>
                <td>${escapeHtml(item.policeNo || '-')}</td>
                <td>${escapeHtml(item.sirket || '-')}</td>
                <td style="text-align:right;">${formatCurrency(item.tutar || 0)} ₺</td>
                <td style="white-space: normal;">${offersHtml}</td>
                <td class="action-buttons" onclick="event.stopPropagation();">
                    <button class="edit-btn" onclick="${editAction}" title="Düzenle"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="${deleteAction}" title="Sil"><i class="fas fa-trash"></i></button>
                    ${item.status === 'active'
                        ? `<button class="renew-archive-btn" onclick="${renewAction}" title="Yenile & Arşivle"><i class="fas fa-sync-alt"></i></button>`
                        : item.status === 'archived' ? `<button class="unarchive-btn" onclick="${unarchiveAction}" title="Aktife Taşı"><i class="fas fa-undo"></i></button>`
                        : `<button class="unarchive-btn" onclick="${undoCancelAction}" title="İptali Geri Al"><i class="fas fa-undo"></i></button>`
                    }
                </td>
            </tr>
        `;
    }).join('');

    const tableHead = `
        <div class="table-wrapper">
        <table class="data-table" style="min-width: 100%;">
            <thead>
                <tr>
                    <th>Bitiş</th>
                    <th>Durum</th>
                    <th class="customer-status-cell">Arandı</th>
                    <th>İsim Soyad</th>
                    <th>Plaka</th>
                    <th>Poliçe No</th>
                    <th>Şirket</th>
                    <th style="text-align:right;">Tutar</th>
                    <th>Teklifler</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
    `;

    return tableHead + reportRows + '</tbody></table></div>';
}

// createAgencyReportTable (GÜNCELLENDİ: Ödeme Yöntemi sütunu ve colspan eklendi)
function createAgencyReportTable(groupedData, isPrintMode = false) {
    const agencySortOrder = ["MERKEZ", "WEB", "BİG", "5N1K", "Ş.KOTAN"];
    const agencyNames = Object.keys(groupedData).filter(name => name !== 'GENEL_TOPLAM').sort((a, b) => {
        const indexA = agencySortOrder.indexOf(a);
        const indexB = agencySortOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'tr');
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    if (agencyNames.length === 0 && !groupedData.GENEL_TOPLAM) {
        return '<p style="text-align:center;">Seçilen dönem için "Yönlendiren Acente" alanı doldurulmuş poliçe bulunamadı.</p>';
    }

    let grandTotalTutar = 0;
    let grandTotalAlinanKomisyon = 0;
    let grandTotalAcenteyeÖdenecek = 0;
    let grandTotalBizeKalan = 0;

    const html = [];

    const headers = {
        tutar: 'Poliçe Tutarı',
        toplamKomisyon: 'Toplam Kom.',
        acenteyeOdenecek: 'Bize Kalan',
        bizeKalan: 'Acenteye Ödenecek'
    };
    
    // Geçici olarak hesaplanan GENEL TOPLAM değerlerini tutmak için
    let tempGrandTotals = {
        tutar: 0,
        toplamAlinanKomisyon: 0,
        acenteyeÖdenecek: 0,
        bizeKalan: 0
    };


    agencyNames.forEach(agencyName => {
        const policies = groupedData[agencyName];

        let totalTutar = 0;
        let totalAlinanKomisyon = 0;
        let totalAcenteyeÖdenecek = 0;
        let totalBizeKalan = 0;

        const reportPolicies = policies.map(item => {
            item.tutar = parseFloat(item.tutar) || 0;
            
            // Komisyon hesaplama için tahsilat oranını belirle
            let tahsilatOrani = 1;
            if (item.odemeYontemi === 'Veresiye') {
                const totalPaid = (item.tahsilatlar || []).reduce((sum, t) => sum + (t.tutar || 0), 0);
                tahsilatOrani = item.tutar > 0 ? totalPaid / item.tutar : 0;
            }

            const komisyon = calculateCommission(item, tahsilatOrani);

            totalTutar += item.tutar;
            totalAlinanKomisyon += komisyon.toplamAlinanKomisyon;
            totalAcenteyeÖdenecek += komisyon.acenteyeÖdenecek;
            totalBizeKalan += komisyon.bizeKalan;

            return { ...item, komisyon: komisyon, tahsilatOrani: tahsilatOrani };
        }).filter(item => {
            // Sadece komisyon üretilenleri veya iptal edilenleri rapora dahil et
            return item.komisyon.toplamAlinanKomisyon > 0 || item.status === 'cancelled';
        });

        if (reportPolicies.length === 0) return;


        html.push(`<h3 class="agency-group-header">${escapeHtml(agencyName)} (${reportPolicies.length} Kayıt)</h3>`);

        const tableRows = reportPolicies.map(item => {
            const komisyon = item.komisyon;
            const isCancelled = item.status === 'cancelled';
            const isVeresiye = item.odemeYontemi === 'Veresiye';
            
            let rowClass = item.tahsilatOrani < 1 && isVeresiye ? 'debt-row' : item.called ? 'called-row' : '';
            if (isCancelled) rowClass = 'cancelled-row';

            const poliçeTutarDisplay = isCancelled ?
                `${formatCurrency(item.tutar)} ₺ <span style="color:var(--red-color); font-size:0.8em; margin-left: 5px;">(İptal)</span>` :
                `${formatCurrency(item.tutar)} ₺`;
            
            const tahsilatInfo = isVeresiye && item.borcMiktari > 0 ?
                                 `<br><span style="color:var(--red-color); font-size: 0.75em;">Borç: ${formatCurrency(item.borcMiktari)} ₺</span>` : '';

            // Raporlama için işlem tarihi: İptalse cancellationDate, değilse originalReportDate
            const islemTarihi = item.status === 'cancelled' ? item.cancellationDate : 
                                item.odemeYontemi === 'Veresiye' && item.tahsilatlar && item.tahsilatlar.length > 0 ? item.tahsilatlar[item.tahsilatlar.length - 1].tarih :
                                item.originalReportDate || item.pbitis;
            const odemeYontemiDisplay = escapeHtml(item.odemeYontemi || '-'); // *** YENİ ***
            
            const tooltip = `Poliçe Tutar Komisyonu: ${formatCurrency(calculateCommission(item, 1).toplamAlinanKomisyon)} ₺`;

            return `
                <tr class="${rowClass}" onclick="openDetailModal('${item.docId}'); closeModal(DOM.agencyReportModal);" style="cursor:pointer;">
                    <td>${formatDateTR(islemTarihi)}</td>
                    <td>${escapeHtml(item.isim)} ${tahsilatInfo}</td>
                    <td>${escapeHtml(item.policeNo)}</td>
                    <td>${escapeHtml(item.policeType)}</td>
                    <td>${odemeYontemiDisplay}</td>
                    <td style="text-align:right;">${poliçeTutarDisplay}</td>
                    <td style="text-align:right;" title="${tooltip}">${formatCurrency(komisyon.toplamAlinanKomisyon)} ₺</td>
                    <td style="text-align:right;">${formatCurrency(komisyon.acenteyeÖdenecek)} ₺</td>
                    <td style="text-align:right;">${formatCurrency(komisyon.bizeKalan)} ₺</td>
                </tr>
            `;
        }).join('');

        // Ödeme Yöntemi sütunu eklendiği için colspan 4 -> 5 oldu.
        const colspanCount = 5;

        html.push(`
            <div class="table-wrapper">
                <table class="data-table" style="min-width: 100%;">
                    <thead>
                        <tr>
                            <th>İşlem Tarihi</th>
                            <th>İsim Soyad</th>
                            <th>Poliçe No</th>
                            <th>Poliçe Türü</th>
                            <th>Ödeme Yöntemi</th>
                            <th style="text-align:right;">${headers.tutar}</th>
                            <th style="text-align:right;">${headers.toplamKomisyon}</th>
                            <th style="text-align:right;">${headers.acenteyeOdenecek}</th>
                            <th style="text-align:right;">${headers.bizeKalan}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="${colspanCount}" style="text-align: right;">${escapeHtml(agencyName)} TOPLAMI:</td>
                            <td style="text-align:right;">${formatCurrency(totalTutar)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(totalAlinanKomisyon)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(totalAcenteyeÖdenecek)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(totalBizeKalan)} ₺</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `);
        
        // GENEL TOPLAM hesaplamaları
        tempGrandTotals.tutar += totalTutar;
        tempGrandTotals.toplamAlinanKomisyon += totalAlinanKomisyon;
        tempGrandTotals.acenteyeÖdenecek += totalAcenteyeÖdenecek;
        tempGrandTotals.bizeKalan += totalBizeKalan;
    });

    const activeAgencyCount = Object.keys(groupedData).filter(name => name !== 'GENEL_TOPLAM' && groupedData[name].length > 0).length;

    const shouldDisplayGrandTotal = isPrintMode || activeAgencyCount > 1;

    if (shouldDisplayGrandTotal) {
        const finalTotal = tempGrandTotals;

        html.push(`<h2 class="grand-total-header">GENEL TOPLAM (Tüm Acenteler)</h2>`);
        html.push(`
            <div class="table-wrapper">
                <table class="data-table" style="min-width: 100%;">
                    <thead>
                        <tr>
                            <th style="text-align:right;">${headers.tutar}</th>
                            <th style="text-align:right;">${headers.toplamKomisyon}</th>
                            <th style="text-align:right;">${headers.acenteyeOdenecek}</th>
                            <th style="text-align:right;">${headers.bizeKalan}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align:right;">${formatCurrency(finalTotal.tutar)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(finalTotal.toplamAlinanKomisyon)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(finalTotal.acenteyeÖdenecek)} ₺</td>
                            <td style="text-align:right;">${formatCurrency(finalTotal.bizeKalan)} ₺</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `);
    }

    if (!isPrintMode && activeAgencyCount > 0) {
        // currentAgencyReportData'yı doldur
        currentAgencyReportData.GENEL_TOPLAM = [{
            tutar: tempGrandTotals.tutar,
            toplamAlinanKomisyon: tempGrandTotals.toplamAlinanKomisyon,
            acenteyeÖdenecek: tempGrandTotals.acenteyeÖdenecek,
            bizeKalan: tempGrandTotals.bizeKalan
        }];
    }


    return html.join('');
}

// generateAgencyReport (Tahsilat kontrolü için GÜNCELLENDİ ve Çift Kayıt Sorunu ÇÖZÜLDÜ)
async function generateAgencyReport() {
    if (!DOM.agencyReportModal || !DOM.agencyReportModal.classList.contains('active')) return;

    const monthIndex = parseInt(DOM.agencyReportMonth.value);
    const year = parseInt(DOM.agencyReportYear.value);

    if (isNaN(monthIndex) || isNaN(year)) return;

    const endDate = new Date(year, monthIndex + 1, 0);

    const targetMonthString = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const startDateString = `${targetMonthString}-01`;
    const endDateString = `${targetMonthString}-${String(endDate.getDate()).padStart(2, '0')}`;

    DOM.agencyReportContent.innerHTML = '<p style="text-align:center;">Rapor için veriler alınıyor...</p>';

    try {
        const policies = [];
        const uniqueDocIds = new Set();
        
        // Tüm poliçeleri bir kerede çek
        const allPoliciesSnapshot = await getDocs(collection(db, "policies"));
        const allPolicies = allPoliciesSnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));

        // 1. originalReportDate bu ayda olan poliçeleri filtrele (Nakit/KK komisyon kaydı)
        allPolicies.forEach(data => {
            const originalMonth = data.originalReportDate ? data.originalReportDate.slice(0, 7) : null;
            
            // KRİTİK ÇÖZÜM: Veresiye olanları bu filtrede ATLA. 
            // Veresiye sadece Tahsilat filtresi (3. adım) ile rapora girmeli.
            if (data.odemeYontemi === 'Veresiye') {
                return; 
            }
            
            if (originalMonth === targetMonthString) {
                policies.push(data);
                uniqueDocIds.add(data.docId);
            }
        });

        // 2. İptal Tarihi bu ayda olan poliçeleri filtrele (İptal Komisyon Dökümleri)
        allPolicies.forEach(data => {
            if (data.status === 'cancelled') {
                const cancellationMonth = data.cancellationDate ? data.cancellationDate.slice(0, 7) : null;
                if (cancellationMonth === targetMonthString && !uniqueDocIds.has(data.docId)) {
                    policies.push(data);
                    uniqueDocIds.add(data.docId);
                }
            }
        });
        
        // 3. Veresiye Tahsilatları bu ayda olan poliçeleri filtrele (Tahsilat Komisyon Dökümleri)
        allPolicies.forEach(data => {
            if (data.odemeYontemi === 'Veresiye' && data.tahsilatlar && data.tahsilatlar.length > 0) {
                 // Veresiye poliçesi için bu ayda yapılmış tahsilat var mı?
                 const tahsilatInMonth = (data.tahsilatlar || []).some(t => t.tarih && t.tarih.slice(0, 7) === targetMonthString);
                 
                 // Tahsilat bu ayda ise ekle
                 if (tahsilatInMonth && !uniqueDocIds.has(data.docId)) {
                     policies.push(data);
                     uniqueDocIds.add(data.docId);
                 }
            }
        });

        const referredPolicies = policies.filter(p => p.yonlendirenAcente && p.yonlendirenAcente.trim() !== '');

        const groupedByAgency = referredPolicies.reduce((acc, policy) => {
            const agencyName = (policy.yonlendirenAcente || 'TANIMSIZ').trim().toLocaleUpperCase('tr-TR');
            if (!acc[agencyName]) {
                acc[agencyName] = [];
            }
            acc[agencyName].push(policy);
            return acc;
        }, {});

        for (const agencyName in groupedByAgency) {
            groupedByAgency[agencyName].sort((a, b) => {
                // Raporlama için işlem tarihi: İptalse cancellationDate, veresiyeyse o ayki en son tahsilat, değilse originalReportDate
                const getDate = (item) => {
                    if (item.status === 'cancelled' && item.cancellationDate) return item.cancellationDate;
                    
                    if (item.odemeYontemi === 'Veresiye' && item.tahsilatlar && item.tahsilatlar.length > 0) {
                        // Rapor ayına ait en son tahsilat tarihini bul
                        const monthlyPayments = item.tahsilatlar.filter(t => t.tarih.slice(0, 7) === targetMonthString);
                        
                        if(monthlyPayments.length > 0) {
                             // O ay içindeki en yeni tahsilat tarihini döndür
                             return monthlyPayments.reduce((latest, t) => t.tarih > latest ? t.tarih : latest, monthlyPayments[0].tarih);
                        }
                        
                        // Yeni mantıkla buraya zaten tahsilat olmadan gelmemeli, ama güvenlik için orijinal tarihi döndür
                        return item.originalReportDate || item.pbitis;
                    }
                    
                    return item.originalReportDate || item.pbitis;
                };

                const dateAStr = getDate(a);
                const dateBStr = getDate(b);

                let timeA = 0, timeB = 0;
                try { timeA = new Date(dateAStr).getTime(); if (isNaN(timeA)) timeA = 0; } catch(e) {}
                try { timeB = new Date(dateBStr).getTime(); if (isNaN(timeB)) timeB = 0; } catch(e) {}

                return timeA - timeB;
            });
        }

        currentAgencyReportData = groupedByAgency;
        currentAgencyReportAgencies = Object.keys(groupedByAgency).filter(name => name !== 'GENEL_TOPLAM');

        if (referredPolicies.length === 0) {
            DOM.agencyReportContent.innerHTML = '<p style="text-align:center;">Seçilen dönem için komisyon raporuna dahil edilecek poliçe bulunamadı.</p>';
            if(DOM.printAgencyReportBtn) DOM.printAgencyReportBtn.disabled = true;
            return;
        }

        DOM.agencyReportContent.innerHTML = createAgencyReportTable(groupedByAgency, false);

        if(DOM.printAgencyReportBtn) DOM.printAgencyReportBtn.disabled = false;

        populatePrintAgencyDropdown(currentAgencyReportAgencies.filter(name => groupedByAgency[name] && groupedByAgency[name].length > 0));

    } catch (error) {
        console.error("Acente Raporu oluşturma hatası: ", error);
        DOM.agencyReportContent.innerHTML = '<p style="text-align:center; color: red;">Rapor oluşturulurken bir hata oluştu: ' + error.message + '</p>';
        if(DOM.printAgencyReportBtn) DOM.printAgencyReportBtn.disabled = true;
    }
}

// populatePrintAgencyDropdown (Orijinal Koddan Alındı)
function populatePrintAgencyDropdown(agencyNames) {
    if (!DOM.printAgencySelect) return;

    let optionsHtml = `<option value="ALL">TÜM ACENTELER (GENEL RAPOR)</option>`;

    const agencySortOrder = ["MERKEZ", "WEB", "BİG", "5N1K", "Ş.KOTAN"];
    const sortedAgencyNames = agencyNames.sort((a, b) => {
        const indexA = agencySortOrder.indexOf(a);
        const indexB = agencySortOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'tr');
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    sortedAgencyNames.forEach(name => {
        optionsHtml += `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`;
    });

    DOM.printAgencySelect.innerHTML = optionsHtml;
}


// openPrintSelectionModal (Orijinal Koddan Alındı)
function openPrintSelectionModal() {
    if (!DOM.agencyReportContent || Object.keys(currentAgencyReportData).length === 0 || (DOM.printAgencyReportBtn && DOM.printAgencyReportBtn.disabled)) {
        showToast('warning', 'Yazdırılacak acente raporu verisi bulunmuyor. Lütfen önce raporu otomatik olarak yükleyin.');
        return;
    }

    populatePrintAgencyDropdown(currentAgencyReportAgencies.filter(name => currentAgencyReportData[name] && currentAgencyReportData[name].length > 0));

    openModal(DOM.printSelectionModal);
}

// handlePrintAgencyReportAction (Orijinal Koddan Alındı)
function handlePrintAgencyReportAction(agencyName) {
    if (Object.keys(currentAgencyReportData).length === 0 ||
        (agencyName !== 'ALL' && !currentAgencyReportData[agencyName])) {
        showToast('error', 'Seçilen acenteye ait rapor verisi bulunamadı.');
        closeModal(DOM.printSelectionModal);
        return;
    }

    closeModal(DOM.printSelectionModal);

    const groupedDataForPrint = {};
    let printContent = '';

    if (agencyName === 'ALL') {
        // Genel toplamı da ekleyerek tüm veriyi kopyala
        Object.assign(groupedDataForPrint, currentAgencyReportData); 
        printContent = createAgencyReportTable(groupedDataForPrint, true);
    } else {
        // Sadece seçilen acente ve genel toplamı ekle
        groupedDataForPrint[agencyName] = currentAgencyReportData[agencyName];
        if (currentAgencyReportData.GENEL_TOPLAM) {
            groupedDataForPrint.GENEL_TOPLAM = currentAgencyReportData.GENEL_TOPLAM;
        } else {
            // GENEL_TOPLAM hesaplanmamışsa yeniden hesapla (sadece bu acente için geçerli olmayacaktır!)
             console.warn("GENEL_TOPLAM eksik, yeniden hesaplanamıyor. Eksik toplamla yazdırılıyor.");
        }
        
        printContent = createAgencyReportTable(groupedDataForPrint, true);
    }

    const printTitle = agencyName === 'ALL' ? 'TÜM ACENTELER KOMİSYON RAPORU' : `${agencyName} KOMİSYON RAPORU`;
    const dateText = `${DOM.agencyReportMonth.options[DOM.agencyReportMonth.selectedIndex].text} / ${DOM.agencyReportYear.value}`;

    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        showToast('error', 'Yazdırma penceresi açılamadı. Lütfen pop-up engelleyiciyi kontrol edin.');
        return;
    }
    
    // CSS dosyasından sadece yazdırma stilini printHTML içine dahil edin
    const printStyles = `
        <link rel="stylesheet" href="css/style.css" media="print">
    `;

    const printHTML = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${printTitle}</title>
            ${printStyles} 
        </head>
        <body class="print-modal-content">
            <h1>POLİÇE TAKİP SİSTEMİ</h1>
            <h2>${printTitle} (${dateText})</h2>
            <div class="modal-body">
                ${printContent}
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();

    printWindow.onload = function() {
        printWindow.focus();
        // Buraya eklenen küçük bir zaman aşımı, tarayıcının tüm stilleri işlemesini sağlar
        setTimeout(() => {
            printWindow.print();
        }, 350); 
    };
}


// *** YENİ: VERESİYE DEFTERİ FONKSİYONLARI ***

// 1. Veresiye Defteri Modalını Aç (GÜNCELLENDİ: State yönetimi düzeltildi)
async function openDebtBookModal() {
    closeModal(DOM.debtDetailModal); // Açık detay varsa kapat
    if(DOM.debtBookListContainer) DOM.debtBookListContainer.innerHTML = '<p style="text-align:center;">Veriler yükleniyor...</p>';
    openModal(DOM.debtBookModal);
    
    try {
        const q = query(collection(db, "policies"), 
                        where("odemeYontemi", "==", "Veresiye"),
                      	where("status", "==", "active")); // Sadece aktif poliçeler
                        
        const snapshot = await getDocs(q);
        let allVeresiyePolicies = []; // TÜM aktif veresiye poliçeleri (state için)
        let debtPoliciesForRender = []; // SADECE borcu olanlar (gösterim için)
        let totalDebt = 0;
        
        snapshot.forEach(doc => {
          	const data = { ...doc.data(), docId: doc.id };
          	// Global state'i BÜTÜN aktif veresiye poliçeleriyle doldur
        	allVeresiyePolicies.push(data); 

          	const borcMiktari = data.borcMiktari || 0;
            
          	// Listede sadece borcu olanları göster
          	if (borcMiktari > 0) {
                debtPoliciesForRender.push(data);
              	totalDebt += borcMiktari;
          	}
        });
        
      	// GLOBAL STATE'İ TÜM VERİ İLE GÜNCELLE
    	// Bu, borcu 0'a düşen bir kaydın state'den kaybolmasını engeller.
    	currentDebtPolicies = allVeresiyePolicies; 
        
      	// Sadece GÖSTERİLECEK listeyi sırala
      	debtPoliciesForRender.sort((a, b) => {
          	// En çok borçlu olan üste gelsin
          	return (b.borcMiktari || 0) - (a.borcMiktari || 0);
      	});

      	// Render fonksiyonuna SADECE BORCU OLANLARI gönder
      	renderDebtBook(debtPoliciesForRender, totalDebt);
        
    } catch (error) {
        console.error("Veresiye Defteri yükleme hatası:", error);
        if(DOM.debtBookListContainer) DOM.debtBookListContainer.innerHTML = '<p style="text-align:center; color: red;">Veriler yüklenirken bir hata oluştu.</p>';
    }
}

// 2. Veresiye Defteri Listesini Render Et
function renderDebtBook(debtPolicies, totalDebt) {
    if(!DOM.debtBookListContainer) return;
    
    if (debtPolicies.length === 0) {
        DOM.debtBookListContainer.innerHTML = '<p style="text-align:center;">Şu anda borcu olan müşteri bulunmamaktadır.</p>';
        return;
    }
    
    let html = `
        <p style="text-align:right; font-size: 1.1rem; font-weight: 700; color: var(--red-color); margin-bottom: 20px;">
            Toplam Borç: ${formatCurrency(totalDebt)} ₺
        </p>
        <div class="debt-list-grid">
    `;
    
    debtPolicies.forEach(item => {
        html += `
            <div class="debt-card" onclick="openDebtDetailModal('${item.docId}')">
                <div class="debt-header">
                    <h3>${escapeHtml(item.isim)}</h3>
                    <i class="fas fa-hand-holding-usd"></i>
                </div>
                <p><strong>Poliçe No:</strong> ${escapeHtml(item.policeNo || '-')}</p>
                <p><strong>Poliçe Türü:</strong> ${escapeHtml(item.policeType || '-')}</p>
                <p><strong>Poliçe Tutar:</strong> ${formatCurrency(item.tutar || 0)} ₺</p>
                <p class="debt-amount"><strong>Güncel Borç:</strong> <span>${formatCurrency(item.borcMiktari)} ₺</span></p>
            </div>
        `;
    });
    
    html += '</div>';
    DOM.debtBookListContainer.innerHTML = html;
}

// 3. Veresiye Detay Modalını Aç (NİHAİ DÜZELTME: Doğru koleksiyon adı ve TARİH SORUNU ÇÖZÜLMÜŞTÜr)
async function openDebtDetailModal(docId) {
    currentDebtDetailDocId = docId; 
    closeModal(DOM.debtBookModal);
    let item = null;
    try {
        const docSnap = await getDoc(doc(db, "policies", docId), { source: 'server' }); 
        if (!docSnap.exists()) {
            showToast('error', 'Kayıt veritabanından okunurken bir hata oluştu.');
            openDebtBookModal(); 
            return;
        }
        item = docSnap.data();
        item.docId = docId; 
        
    } catch (e) {
        console.error("openDebtDetailModal -> getDoc hatası:", e);
        showToast('error', 'Kayıt veritabanından okunurken bir hata oluştu.');
        openDebtBookModal();
        return;
    }
    
    try {
        if (DOM.debtCustomerName) DOM.debtCustomerName.textContent = escapeHtml(item.isim || '-');
        if (DOM.debtPolicyNo) DOM.debtPolicyNo.textContent = escapeHtml(item.policeNo || '-');
        if (DOM.debtTotalAmount) DOM.debtTotalAmount.textContent = formatCurrency(item.tutar || 0) + ' ₺';
        
        // Kalan Borç Gösterimi
        const borcMiktari = item.borcMiktari || 0;
        if (DOM.debtRemainingAmount) {
            if (borcMiktari > 0) {
                DOM.debtRemainingAmount.textContent = formatCurrency(borcMiktari) + ' ₺';
                DOM.debtRemainingAmount.style.color = 'var(--red-color)';
            } else {
                DOM.debtRemainingAmount.textContent = 'Ödendi';
                DOM.debtRemainingAmount.style.color = 'var(--green-color)';
            }
        }
        
        // Tahsilat geçmişini render et
        renderDebtHistory(item.tahsilatlar || []);
        
        // Form alanlarını sıfırla
        if(DOM.debtPaymentAmount) DOM.debtPaymentAmount.value = '0,00';
        
        // *** DÜZELTME: YEREL SAAT DİLİMİNDE BUGÜNÜN TARİHİNİ AL ***
        if(DOM.debtPaymentDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Ay 0'dan başlar
            const day = String(today.getDate()).padStart(2, '0');
            const todayLocal = `${year}-${month}-${day}`; // YYYY-MM-DD formatında
            DOM.debtPaymentDate.value = todayLocal;
        }
        // *** DÜZELTME SONU ***
        
        // Buton durumunu ayarla
        if (DOM.addPaymentBtn) {
            if (borcMiktari > 0) {
                DOM.addPaymentBtn.removeAttribute('disabled');
            } else {
                DOM.addPaymentBtn.setAttribute('disabled', 'true');
            }
        }
        
        openModal(DOM.debtDetailModal);
        
    } catch (error) {
        console.error("Veresiye Detay render hatası:", error);
        showToast('error', 'Veresiye detayları gösterilirken bir hata oluştu.');
        openDebtBookModal(); 
    }
}

// 4. Tahsilat Geçmişini Render Et
function renderDebtHistory(tahsilatlar) {
    if(!DOM.debtPaymentsContainer) return;
    
    const sortedTahsilatlar = tahsilatlar.slice().sort((a, b) => {
        // En yeniden en eskiye sırala
        return (new Date(b.tarih).getTime() || 0) - (new Date(a.tarih).getTime() || 0);
    });

    let html = '';
    
    if (sortedTahsilatlar.length === 0) {
        html = '<p style="text-align:center; color: var(--secondary-color);">Henüz tahsilat kaydı bulunmamaktadır.</p>';
    } else {
        html = `
            <table class="data-table small-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Tarih</th>
                        <th style="width: 40%; text-align: right;">Tutar</th>
                        <th style="width: 10%;">Sil</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        sortedTahsilatlar.forEach((tahsilat, index) => {
            // Tahsilat objesi unique ID'ye sahip olmadığı için, poliçedeki index'ini kullanmak yerine,
            // sadece tarih ve tutar bazlı bir silme mekanizması (veya anlık index) kullanmalıyız.
            // Bu örnekte, tahsilatların sıralanmış halindeki index'i kullanacağız ve silerken tersine arama yapacağız.
            html += `
                <tr>
                    <td>${formatDateTR(tahsilat.tarih)}</td>
                    <td style="text-align:right;">${formatCurrency(tahsilat.tutar)} ₺</td>
                    <td>
                        <button class="delete-btn small-btn" onclick="deletePayment('${currentDebtDetailDocId}', '${tahsilat.tarih}', ${tahsilat.tutar}); event.stopPropagation();" title="Tahsilatı Sil">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
    }
    
    DOM.debtPaymentsContainer.innerHTML = html;
}

// 5. Tahsilat Ekle (NİHAİ DÜZELTME: State kontrolü kaldırıldı)
async function addPayment() {
    if (!currentDebtDetailDocId) return;
    
    const amountStr = DOM.debtPaymentAmount.value;
    const date = DOM.debtPaymentDate.value;
    const amount = parseCurrency(amountStr);
    
    if (amount <= 0 || !date) {
      	showToast('error', 'Lütfen geçerli bir tutar ve tarih girin.');
      	return;
    }

  	let item = null;
  	let itemSource = 'getDoc'; // Kaynağı 'getDoc' olarak sabitliyoruz

  	// 1. STATE KONTROLÜ KALDIRILDI.
  	console.log("addPayment: State kontrolü atlanıyor, sunucudan veri çekiliyor...");
  	try {
      	// Sunucudan en güncel veriyi zorla çek
      	const docSnap = await getDoc(doc(db, "policies", currentDebtDetailDocId), { source: 'server' });
      	if (docSnap.exists()) {
        	item = docSnap.data();
      	}
  	} catch (e) {
        	console.error("addPayment -> getDoc hatası:", e);
        	showToast('error', 'İşlem yapılacak kayıt okunurken bir hata oluştu.');
        	return;
      }
  	
  	if (!item) {
      	showToast('error', 'İşlem yapılacak kayıt bulunamadı.');
      	return;
  	}
  	
  	try {
      	const docRef = doc(db, "policies", currentDebtDetailDocId);
      	
      	const currentBorc = item.borcMiktari || 0; 
      	const currentTahsilatlar = item.tahsilatlar || [];
      	
      	if (amount > currentBorc && currentBorc > 0) {
        	showToast('warning', `Girilen tutar (${formatCurrency(amount)} ₺) kalan borçtan (${formatCurrency(currentBorc)} ₺) fazladır. Borç ${formatCurrency(currentBorc)} ₺ olarak güncellenecektir.`, 'warning');
      	}
      	
      	const newBorc = Math.max(0, currentBorc - amount); 
      	
      	const newTahsilat = {
        	tarih: date,
        	tutar: amount
      	};
      	
      	currentTahsilatlar.push(newTahsilat);
      	
      	await updateDoc(docRef, {
        	borcMiktari: newBorc,
        	tahsilatlar: currentTahsilatlar
      	});
      	
      	// State güncelleme satırları kaldırıldı (çünkü state artık kullanılmıyor)
      	
      	showToast('success', `${formatCurrency(amount)} ₺ tahsilat kaydedildi. Kalan borç: ${formatCurrency(newBorc)} ₺`);
      	
      	// Arayüzü güncelle
        if (DOM.debtRemainingAmount) {
            if (newBorc > 0) {
                DOM.debtRemainingAmount.textContent = formatCurrency(newBorc) + ' ₺';
                DOM.debtRemainingAmount.style.color = 'var(--red-color)';
            } else {
                DOM.debtRemainingAmount.textContent = 'Ödendi';
                DOM.debtRemainingAmount.style.color = 'var(--green-color)';
            }
        }
      	
      	// Tahsilat geçmişini yeniden render et
      	renderDebtHistory(currentTahsilatlar); 
      	
      	// Giriş alanlarını sıfırla
      	if(DOM.debtPaymentAmount) DOM.debtPaymentAmount.value = '0,00';
      	
      	// Ana listeleri ve raporu yenile
      	await loadData(); 
      	if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
        	await generateAgencyReport();
      	}

  	} catch (error) {
      	console.error("Tahsilat ekleme hatası:", error);
      	showToast('error', 'Tahsilat eklenirken bir hata oluştu.');
  	}
}

// 6. Tahsilat Sil (NİHAİ DÜZELTME: State kontrolü kaldırıldı)
async function deletePayment(docId, tarih, tutar) {
    if (!docId) return;
    if (!await showConfirm("Bu tahsilat kaydını silmek istediğinize emin misiniz? Kalan borç miktarı artırılacaktır.")) return;

  	let item = null;
  	let itemSource = 'getDoc'; // Kaynağı 'getDoc' olarak sabitliyoruz

  	// 1. STATE KONTROLÜ KALDIRILDI.
  	console.log("deletePayment: State kontrolü atlanıyor, sunucudan veri çekiliyor...");
  	try {
      	// Sunucudan en güncel veriyi zorla çek
      	const docSnap = await getDoc(doc(db, "policies", docId), { source: 'server' });
      	if (docSnap.exists()) {
        	item = docSnap.data();
      	}
  	} catch (e) {
        	console.error("deletePayment -> getDoc hatası:", e);
        	showToast('error', 'İşlem yapılacak kayıt okunurken bir hata oluştu.');
        	return;
      }
  	
  	if (!item) {
      	showToast('error', 'İşlem yapılacak kayıt bulunamadı.');
      	return;
  	}

  	try {
      	const docRef = doc(db, "policies", docId);
      	
      	let currentBorc = item.borcMiktari || 0;
      	let currentTahsilatlar = item.tahsilatlar || [];
      	
      	let removed = false;
      	currentTahsilatlar = currentTahsilatlar.filter(t => {
        	if (t.tarih === tarih && t.tutar === tutar && !removed) {
        		removed = true;
        		return false;
        	}
        	return true;
      	});

      	if (!removed) {
        	showToast('error', 'Silinecek tahsilat kaydı bulunamadı.');
        	return;
      	}
      	
      	// Borcu silinen tutar kadar geri ekle, ama poliçe tutarını geçmesin
      	const newBorc = Math.min(item.tutar || (currentBorc + tutar), currentBorc + tutar);
      	
      	await updateDoc(docRef, {
        	borcMiktari: newBorc,
        	tahsilatlar: currentTahsilatlar
      	});
      	
      	// State güncelleme satırları kaldırıldı
      	
      	showToast('success', `${formatCurrency(tutar)} ₺ tahsilat silindi. Yeni borç: ${formatCurrency(newBorc)} ₺`);
      	
      	// Arayüzü güncelle
        if (DOM.debtRemainingAmount) {
            if (newBorc > 0) {
                DOM.debtRemainingAmount.textContent = formatCurrency(newBorc) + ' ₺';
                DOM.debtRemainingAmount.style.color = 'var(--red-color)';
            } else {
                DOM.debtRemainingAmount.textContent = 'Ödendi';
                DOM.debtRemainingAmount.style.color = 'var(--green-color)';
            }
        }
      	
      	// Tahsilat geçmişini yeniden render et
      	renderDebtHistory(currentTahsilatlar); 
      	
      	// Ana listeleri ve raporu yenile
      	await loadData(); 
      	if (DOM.agencyReportModal && DOM.agencyReportModal.classList.contains('active')) {
        	await generateAgencyReport();
      	}
      	
  	} catch (error) {
      	console.error("Tahsilat silme hatası:", error);
      	showToast('error', 'Tahsilat silinirken bir hata oluştu.');
  	}
}


// --- Olay Dinleyicileri ---

document.addEventListener('DOMContentLoaded', async () => {
    // DOM elementlerinin varlığını kontrol ederek hata verme riskini azaltıyoruz.
    populateActiveFilterDropdowns(); // KRİTİK: Yeni aktif filtreleme fonksiyonu
    if (DOM.reportMonth && DOM.reportYear) populateReportDropdowns(DOM.reportMonth, DOM.reportYear);
    if (DOM.agencyReportMonth && DOM.agencyReportYear) populateReportDropdowns(DOM.agencyReportMonth, DOM.agencyReportYear);

    // *** YENİ ÇÖZÜM: ACENTE RAPORU FİLTRE DEĞİŞİKLİĞİNDE GÜNCELLEME ***
    if (DOM.agencyReportMonth && DOM.agencyReportYear) {
        DOM.agencyReportMonth.addEventListener('change', generateAgencyReport);
        DOM.agencyReportYear.addEventListener('change', generateAgencyReport);
    }
    // ***************************************************************

    if (DOM.formInputs.policeType) {
        DOM.formInputs.policeType.addEventListener('change', (e) => {
            const selectedType = e.target.value;
            if (DOM.manualCommissionRateGroup) {
                if (selectedType === 'IMM' || selectedType === 'HekimSorumluluk') {
                    DOM.manualCommissionRateGroup.style.display = 'flex';
                    if (selectedType === 'IMM') {
                        DOM.formInputs.manualCommissionRate.value = DOM.formInputs.manualCommissionRate.value || 15;
                    } else if (selectedType === 'HekimSorumluluk') {
                        DOM.formInputs.manualCommissionRate.value = DOM.formInputs.manualCommissionRate.value || 10;
                    }
                } else {
                    DOM.manualCommissionRateGroup.style.display = 'none';
                    DOM.formInputs.manualCommissionRate.value = '';
                }
            }
        });
    }

    if (DOM.agencyReportBtn) DOM.agencyReportBtn.addEventListener('click', () => {
        openModal(DOM.agencyReportModal);
        generateAgencyReport();
    });
    
    // *** YENİ: VERESİYE DEFTERİ BUTONU ***
    if (DOM.debtBookBtn) DOM.debtBookBtn.addEventListener('click', openDebtBookModal);
    
    if (DOM.closeDebtDetailBtn) DOM.closeDebtDetailBtn.addEventListener('click', () => {
        closeModal(DOM.debtDetailModal);
        openDebtBookModal(); // Detay kapandıktan sonra ana veresiye listesine dön
    });
    
    if (DOM.addPaymentBtn) DOM.addPaymentBtn.addEventListener('click', addPayment);
    
    // Veresiye Tahsilat Tutar Input formatlama
    if (DOM.debtPaymentAmount) {
        DOM.debtPaymentAmount.addEventListener('focus', handleRefundAmountFocus);
        DOM.debtPaymentAmount.addEventListener('blur', handleRefundAmountBlur);
        DOM.debtPaymentAmount.addEventListener('input', handleRefundAmountInput);
    }
    // **********************************

    // KRİTİK: YENİ AKTİF FİLTRE DİNLEYİCİLERİ
    if (DOM.activeFilterMonth) {
        DOM.activeFilterMonth.addEventListener('change', async () => {
            const query = DOM.searchInput ? DOM.searchInput.value.trim() : '';
            if (query === '') await loadData();
            else await filterData(query);
        });
    }
    if (DOM.activeFilterYear) {
        DOM.activeFilterYear.addEventListener('change', async () => {
            const query = DOM.searchInput ? DOM.searchInput.value.trim() : '';
            if (query === '') await loadData();
            else await filterData(query);
        });
    }
    // *************************************************

    if (DOM.addBtn) DOM.addBtn.addEventListener('click', () => {
        Object.values(DOM.formInputs).forEach(input => input.value = '');
        if (DOM.formInputs.tutar) DOM.formInputs.tutar.value = '0,00';
        if(DOM.manualCommissionRateGroup) DOM.manualCommissionRateGroup.style.display = 'none';
        DOM.addModal.removeAttribute('data-doc-id');
        if(DOM.addModal.querySelector('h3')) DOM.addModal.querySelector('h3').textContent = 'Yeni Poliçe Kaydı';
        openModal(DOM.addModal);
    });

    if (DOM.formInputs.tcKimlikNo) DOM.formInputs.tcKimlikNo.addEventListener('input', (e) => formatTCKimlikNo(e.target));
    if (DOM.formInputs.ruhsatSeriNo) DOM.formInputs.ruhsatSeriNo.addEventListener('input', (e) => formatRuhsatSeriNo(e.target));

    if (DOM.formInputs.tutar) {
        DOM.formInputs.tutar.addEventListener('focus', (e) => {
            let value = e.target.value;
            if (!value) return;
            let num = parseCurrency(value);

            if (num === 0) {
                e.target.value = '';
            } else {
                let rawDisplay = (num % 1 !== 0) ? num.toFixed(2) : num.toString().split('.')[0];
                e.target.value = rawDisplay.replace('.', ',');
            }
        });

        DOM.formInputs.tutar.addEventListener('blur', (e) => {
            let value = e.target.value;
            let num = parseCurrency(value);
            e.target.value = formatCurrency(num);
        });

        DOM.formInputs.tutar.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d,.]/g, '');
        });
    }

    if (DOM.saveBtn) DOM.saveBtn.addEventListener('click', handleSave);
    if (DOM.cancelBtn) DOM.cancelBtn.addEventListener('click', () => closeModal(DOM.addModal));
    if (DOM.closeAlertBtn) DOM.closeAlertBtn.addEventListener('click', () => closeModal(DOM.alertModal));
    if (DOM.closeReportBtn) DOM.closeReportBtn.addEventListener('click', () => closeModal(DOM.monthlyReportModal));
    if (DOM.closeDetailBtn) DOM.closeDetailBtn.addEventListener('click', () => closeModal(DOM.detailModal));
    if (DOM.saveNotesBtn) DOM.saveNotesBtn.addEventListener('click', saveNotesAndOffers);
    if (DOM.addOfferBtn) DOM.addOfferBtn.addEventListener('click', addOffer);

    if (DOM.cancelPolicyBtn) DOM.cancelPolicyBtn.addEventListener('click', cancelPolicy);
    if (DOM.cancelCancelBtn) DOM.cancelCancelBtn.addEventListener('click', () => {
        closeModal(DOM.cancelModal);
        if (currentDetailDocId) openDetailModal(currentDetailDocId);
    });
    if (DOM.undoCancelBtn) DOM.undoCancelBtn.addEventListener('click', () => {
        if (currentDetailDocId) undoCancellation(currentDetailDocId);
    });
    if (DOM.saveCancelBtn) DOM.saveCancelBtn.addEventListener('click', () => {
        if (currentDetailDocId) saveCancellation(currentDetailDocId);
    });

    if (DOM.closeAgencyReportBtn) DOM.closeAgencyReportBtn.addEventListener('click', () => closeModal(DOM.agencyReportModal));
    if (DOM.printAgencyReportBtn) DOM.printAgencyReportBtn.addEventListener('click', openPrintSelectionModal);

    if (DOM.confirmPrintBtn) DOM.confirmPrintBtn.addEventListener('click', () => {
        const selectedAgency = DOM.printAgencySelect.value;
        handlePrintAgencyReportAction(selectedAgency);
    });
    if (DOM.cancelPrintBtn) DOM.cancelPrintBtn.addEventListener('click', () => closeModal(DOM.printSelectionModal));


    if (DOM.printBtn) DOM.printBtn.addEventListener('click', () => window.print());

    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', () => {
            filterData(DOM.searchInput.value.trim());
        });

        DOM.searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (DOM.searchInput.value.trim() !== '') {
                    DOM.searchInput.value = '';
                    await loadData();
                    showToast('info', `Arama temizlendi.`);
                }
            }
        });
    }

    // Sekme Değiştirme Dinleyicileri
    if (DOM.activeTabBtn) DOM.activeTabBtn.addEventListener('click', async () => {
        if (DOM.activeTabBtn.classList.contains('active')) return;
        if(DOM.activeList) DOM.activeList.style.display = 'block';
        if(DOM.archiveList) DOM.archiveList.style.display = 'none';
        if(DOM.cancelledList) DOM.cancelledList.style.display = 'none';
        DOM.activeTabBtn.classList.add('active');
        DOM.archiveTabBtn.classList.remove('active');
        DOM.cancelledTabBtn.classList.remove('active');
        if(DOM.searchInput) DOM.searchInput.placeholder = 'Aktif poliçelerde ara...';
        if(DOM.searchInput) DOM.searchInput.value = '';
        currentSortColumn = 'pbitis';
        currentSortDirection = 'asc';
        selectedIdsForBulkDelete.clear(); // Sekme değişince seçimi temizle
        await loadData();
    });
    if (DOM.archiveTabBtn) DOM.archiveTabBtn.addEventListener('click', async () => {
        if (DOM.archiveTabBtn.classList.contains('active')) return;
        if(DOM.activeList) DOM.activeList.style.display = 'none';
        if(DOM.archiveList) DOM.archiveList.style.display = 'block';
        if(DOM.cancelledList) DOM.cancelledList.style.display = 'none';
        DOM.activeTabBtn.classList.remove('active');
        DOM.archiveTabBtn.classList.add('active');
        DOM.cancelledTabBtn.classList.remove('active');
        if(DOM.searchInput) DOM.searchInput.placeholder = 'Arşivde ara...';
        if(DOM.searchInput) DOM.searchInput.value = '';
        currentSortColumn = 'pbitis';
        currentSortDirection = 'asc';
        selectedIdsForBulkDelete.clear();
        await loadData();
    });
    if (DOM.cancelledTabBtn) DOM.cancelledTabBtn.addEventListener('click', async () => {
        if (DOM.cancelledTabBtn.classList.contains('active')) return;
        if(DOM.activeList) DOM.activeList.style.display = 'none';
        if(DOM.archiveList) DOM.archiveList.style.display = 'none';
        if(DOM.cancelledList) DOM.cancelledList.style.display = 'block';
        DOM.activeTabBtn.classList.remove('active');
        DOM.archiveTabBtn.classList.remove('active');
        DOM.cancelledTabBtn.classList.add('active');
        if(DOM.searchInput) DOM.searchInput.placeholder = 'İptal edilenlerde ara...';
        if(DOM.searchInput) DOM.searchInput.value = '';
        currentSortColumn = 'pbitis';
        currentSortDirection = 'asc';
        selectedIdsForBulkDelete.clear();
        await loadData();
    });

    const dataTable = document.getElementById('dataTable');
    if (dataTable) {
        dataTable.querySelector('thead')?.addEventListener('click', (e) => {
            const header = e.target.closest('th[data-sort]');
            if (header) {
                handleSort(header.getAttribute('data-sort'));
            } else if (e.target.id === 'bulkSelectAllHeader') {
                e.stopPropagation();
            }
        });
    }

    if (DOM.notificationBell) DOM.notificationBell.addEventListener('click', () => showWarnings(true));

    if (DOM.monthlyReportBtn) DOM.monthlyReportBtn.addEventListener('click', () => {
        if(DOM.monthlyReportContent) DOM.monthlyReportContent.innerHTML = '<p style="text-align:center;">Ay ve yıl seçip "Raporu Göster" butonuna tıklayın.</p>';
        openModal(DOM.monthlyReportModal);
    });
    if (DOM.generateReportBtn) DOM.generateReportBtn.addEventListener('click', generateMonthlyReport);

    if (DOM.settingsBtn) DOM.settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (DOM.settingsMenu && DOM.settingsMenu.style.display === 'flex') {
            toggleSettingsMenu(false);
        } else {
            if (ADMIN_LOGGED_IN) {
                toggleSettingsMenu(true);
            } else {
                DOM.adminUsername.value = '';
                DOM.adminPassword.value = '';
                if(DOM.loginError) DOM.loginError.style.display = 'none';
                openModal(DOM.adminLoginModal);
                if(DOM.adminUsername) DOM.adminUsername.focus();
            }
        }
    });
    if (DOM.loginAdminBtn) DOM.loginAdminBtn.addEventListener('click', handleAdminLogin);
    if (DOM.adminPassword) DOM.adminPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdminLogin();
    });
    if (DOM.cancelAdminLogin) DOM.cancelAdminLogin.addEventListener('click', () => closeModal(DOM.adminLoginModal));
    
    if (DOM.logoutBtn) {
        DOM.logoutBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Menünün kapanmasını engelle
            handleAdminLogout();
        });
    }

    if (DOM.downloadJsonBtn) DOM.downloadJsonBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadDataAsJson();
        toggleSettingsMenu(false);
    });
    
    
    if (DOM.uploadJsonBtn) DOM.uploadJsonBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if(DOM.jsonFileInput) DOM.jsonFileInput.click();
        toggleSettingsMenu(false);
    });
    if (DOM.jsonFileInput) DOM.jsonFileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) uploadJsonData(file);
        e.target.value = null;
    });

    // YENİ TOPLU SİLME OLAY DİNLEYİCİSİ
    if (DOM.bulkDeleteBtn) {
        DOM.bulkDeleteBtn.addEventListener('click', bulkDeleteActiveItems);
    }
    // YENİ TÜMÜNÜ SİL OLAY DİNLEYİCİLERİ
    if (DOM.deleteArchiveBtn) {
        DOM.deleteArchiveBtn.addEventListener('click', () => bulkDeleteByStatus('archived'));
    }
    if (DOM.deleteCancelledBtn) {
        DOM.deleteCancelledBtn.addEventListener('click', () => bulkDeleteByStatus('cancelled'));
    }


    document.addEventListener('click', (e) => {
        // Dışarı tıklama kontrolü: Eğer menü açıksa ve tıklama menü veya settings butonunda değilse kapat
        if (isSettingsMenuOpen && DOM.settingsMenu && DOM.settingsMenu.style.display === 'flex' && !DOM.settingsMenu.contains(e.target) && e.target !== DOM.settingsBtn && !DOM.settingsBtn.contains(e.target)) {
            toggleSettingsMenu(false);
        }
    });

    // --- Sayfa Yükleme Sırası ---
    // Eğer localstorage'da warningModalOpened hiç ayarlanmadıysa, ilk kez açılması için false yap
    if (localStorage.getItem('warningModalOpened') === null) {
        localStorage.setItem('warningModalOpened', 'false');
        isInitialLoad = true;
    } else {
        isInitialLoad = false;
    }
    
    updateAdminSettingsVisibility(); // Admin durumunu hemen kontrol et

    showToast('info', 'Veriler yükleniyor...');
    await loadData();
    // İlk yüklemede (tarayıcıda ilk kez açıldıysa) zil modalını aç
    await showWarnings(isInitialLoad && localStorage.getItem('warningModalOpened') === 'false');
    
    showToast('success', 'Veriler başarıyla yüklendi.');
    
    // Eğer ilk yükleme ise ve modal açılmadıysa (uyarı yoksa), bayrağı kalıcı olarak true yap
    if(isInitialLoad) {
        localStorage.setItem('warningModalOpened', 'true');
    }

});

// --- Global Fonksiyon Atamaları (HTML'deki onclick'ler için) ---
window.handleWhatsApp = handleWhatsApp;
window.editItem = editItem;
window.deleteItem = deleteItem;
window.unarchiveItem = unarchiveItem;
window.handleSort = handleSort;
window.toggleCustomerStatus = toggleCustomerStatus;
window.openDetailModal = openDetailModal;
window.addOffer = addOffer;
window.removeOffer = removeOffer;
window.updateOfferAmount = updateOfferAmount;
window.updateOfferCompany = updateOfferCompany;
window.saveNotesAndOffers = saveNotesAndOffers;
window.downloadDataAsJson = downloadDataAsJson;
window.uploadJsonData = uploadJsonData;
window.filterData = filterData;
window.renewAndArchiveAction = renewAndArchiveAction;
window.generateMonthlyReport = generateMonthlyReport;
window.handleAdminLogin = handleAdminLogin;
window.closeModal = closeModal;
window.generateAgencyReport = generateAgencyReport;
window.openPrintSelectionModal = openPrintSelectionModal;
window.handlePrintAgencyReportAction = handlePrintAgencyReportAction;
window.cancelPolicy = cancelPolicy;
window.saveCancellation = saveCancellation;
window.undoCancellation = undoCancellation;
// YENİ TOPLU SİLME/ADMIN FONKSİYONLARI
window.handleBulkSelect = handleBulkSelect;
window.bulkDeleteActiveItems = bulkDeleteActiveItems;
window.handleBulkSelectAll = handleBulkSelectAll;
window.bulkDeleteByStatus = bulkDeleteByStatus;
window.handleBulkSelectGroup = handleBulkSelectGroup;
window.updateAdminSettingsVisibility = updateAdminSettingsVisibility;
window.handleAdminLogout = handleAdminLogout;
// YENİ VERESİYE FONKSİYONLARI
window.openDebtBookModal = openDebtBookModal;
window.openDebtDetailModal = openDebtDetailModal;
window.addPayment = addPayment;
window.deletePayment = deletePayment;
// Fonksiyonların tanımlanması (gerekli olduğu yerlerde)
window.handleRefundAmountFocus = handleRefundAmountFocus;
window.handleRefundAmountBlur = handleRefundAmountBlur;
window.handleRefundAmountInput = handleRefundAmountInput;