/* ============================================================
   QUINTEROS S.A. — MARCA LOADER
   Carga catálogos PDF y distribuidores dinámicamente
   ============================================================ */

// Detectar la marca actual desde el filename
function getCurrentBrand() {
    const path = window.location.pathname;
    const match = path.match(/marca-([a-z0-9-]+)\.html$/);
    return match ? match[1] : null;
}

// Datos de catálogos por marca (path relativo + filename real)
const brandCatalogs = {
    "amsted-rail": {
        bearings: { folder: "pdfs/amsted-rail/bearings-and-components/", label: "Bearings and Components",
            files: ["ARX_BearingSeals_SalesSheet_2025_WEB.pdf","ARX_Bearings-Brochure_2025_Web.pdf","ARX_BrencoBearings_SalesSheet_2025_WEB.pdf","ARX_Tru-Guard_SalesSheet_2025_WEB.pdf","ARX_TruFit_SalesSheet_2025_WEB.pdf"] },
        bogie: { folder: "pdfs/amsted-rail/bogie-systems/", label: "Bogie Systems",
            files: ["ARX_Motion-Control_SalesSheet_2025_WEB.pdf","ARX_SSRC-Bogie_SalesSheet_2025_WEB.pdf","ARX_SwingMotion_SalesSheet_2025_WEB.pdf","ARX_TrakMaster_SalesSheet_2025_WEB.pdf"] },
        brake: { folder: "pdfs/amsted-rail/brake-systems-and-components/", label: "Brake Systems",
            files: ["ARX_Brake-Systems-Brochure_2025_WEB (1).pdf","ARX_Handbrake_SalesSheet_2025_WEB.pdf","ARX_IBEX-Brake-System_SalesSheet_2025_WEB.pdf","ARX_Slack-Adjuster_SalesSheet_2025_WEB.pdf","AmstedRail-Pellet-Gate-sell-sheet-2014.pdf"] },
        corporate: { folder: "pdfs/amsted-rail/corporate-materials/", label: "Corporate Materials",
            files: ["ART_TransitBrochure_2024_WEB.pdf","ARX_CorpBrochure_WEB.pdf","ARX_FreightBrochure_2024_WEB.pdf"] },
        eoc: { folder: "pdfs/amsted-rail/end-of-car-systems-and-components/", label: "End-of-Car Systems",
            files: ["ARX_ActiveDraft_SalesSheet_2025_WEB.pdf","ARX_DraftMaster_SalesSheet_2025_WEB.pdf","ARX_EOC-Systems-Brochure_2025_WEB.pdf","ARX_Endurance_SalesSheet_2025_WEB.pdf","ARX_TwinPack_SalesSheet_2025_WEB.pdf"] },
        freight: { folder: "pdfs/amsted-rail/freight-car-components/", label: "Freight Car Components",
            files: ["ARX_Adapter-Plus_SalesSheet_2025_WEB.pdf","ARX_SpringsBrochure_2025_WEB.pdf"] },
        wear: { folder: "pdfs/amsted-rail/wear-prevention-components/", label: "Wear Prevention",
            files: ["ARX_Wear-Prevention_Brochure_2025_WEB.pdf"] },
        wheels: { folder: "pdfs/amsted-rail/wheels/", label: "Wheels",
            files: ["ARX_Wheels-Brochure_2025.pdf"] }
    },
    "creanza": {
        general: { folder: "pdfs/creanza/", label: "Catálogos",
            files: ["BEYOND-COLLECTION.pdf","MASTER-CATALOGUE-2026.pdf","creanza_120x180cm_15mm_ecat_dec_25-1.pdf"] }
    },
    "donmez": {
        general: { folder: "pdfs/donmez/", label: "Catálogos Técnicos",
            files: ["Donmez-Cross-List-Catalog.pdf","Donmez-Debriyaj-Catalog-Eng.pdf","Donmez-Debriyaj-Iveco-Cross-Catalog.pdf"] }
    },
    "gates": {
        automotriz: {
            folder: "pdfs/gates/automotriz/",
            files: [
                "2. FLYER TAPON DE RADIADOR Y TANQUE DE EXPANSION.pdf",
                "BANDA MICRO-V GATES.pdf",
                "BANDAS AUTOMOTRICES EN V GATES.pdf",
                "BANDAS CVT G-FORCE GATES 2024.pdf",
                "BANDAS CVT GATES.pdf",
                "BOMBA DE AGUA POR CADENA GATES.pdf",
                "BOMBAS DE AGUA GATES.pdf",
                "CATALOGO BOMBAS DE AGUA 2021 GATES.pdf",
                "CATALOGO KITS DE DISTRIBUCION GATES.pdf",
                "CATALOGO MANGUERAS DE VENTILACION Y EMISIONES GATES.pdf",
                "CATALOGO PRODUCTOS NUEVOS FPA GATES.pdf",
                "CATALOGO TOMAS DE AGUA GATES.pdf",
                "CATALOGO VEHICULOS RECREATIVOS GATES.pdf",
                "ENSAMBLES DE MANGUERA DEF PARA EL SISTEMA SCR GATES.pdf",
                "ENSAMBLES MANGUERAS DE CALEFACCION GATES.pdf",
                "FLYER ABRAZADERAS POWERGRIP.pdf",
                "FLYER MANGUERAS GATES.pdf",
                "FLYER NUEVOS PRODUCTOS EN MANGUERAS MOLDEADAS.pdf",
                "G-FORCE WORKHORSE GATES.pdf",
                "GUIA DE VALVULAS SOLENOIDES GATES.pdf",
                "GUIA RAPIDA AUTOMOTRIZ GATES 2024.pdf",
                "KIT DE DISTRIBUCION CON CADENA GATES.pdf",
                "KITS DE DISTRIBUCION POWERGRIP GATES.pdf",
                "LIMPIAPARABRISAS GATES.pdf",
                "MANGUERA BARRICADE GATES.pdf",
                "MANGUERA MODULAR GATES.pdf",
                "MANGUERA RAMIFICADA GATES.pdf",
                "MANGUERA TURBOCARGADOR GATES.pdf",
                "MANGUERA TWISTER GATES.pdf",
                "MANGUERAS DE VENTILACION Y EMISIONES GATES.pdf",
                "MANGUERAS PARA COMBUSTIBLES GATES 25.pdf",
                "MATERIALES EN MANGUERAS GATES.pdf",
                "MICRO-V DRIVEALING GATES.pdf",
                "MICRO-V STRETCH FIT GATES.pdf",
                "POLEAS Y TENSORES GATES.pdf",
                "POSTER DE BOMBAS DE AGUA.pdf",
                "POSTER DIAGNOSTICO DE BANDA MICRO-V GATES.pdf",
                "POSTER FALLAS COMUNES EN BANDAS DE V. RECREATIVOS G-FORCE GATES.pdf",
                "PROTEGE TU VEHICULO CON GATES.pdf",
                "SELECCION DE BANDA CVT GATES.pdf",
                "TAPONES Y TERMOSTATOS GATES.pdf",
                "TERMOSTATOS GATES.pdf",
                "THERMALPRO GATES 2025.pdf",
                "VALVULAS DE CALEFACCION ELECTRICA GATES.pdf",
                "VALVULAS SOLENOIDES.pdf",
                "VEHICULOS HIBRIDOS Y ELECTRICOS FPA THERMALPRO_25.pdf",
                "guia_rapida_de_vehiculos_de_movilidad.pdf"
            ]
        },
        industrial: {
            folder: "pdfs/gates/bandas-industriales/",
            files: [
                "BANDA METRICPOWER GATES.pdf",
                "BANDA PARA TRANSPORTE DE ALIMENTO GATES.pdf",
                "CATALOGO TRANSMISION DE POTENCIA INDUSTRIAL - BANDAS SINCRONAS.pdf",
                "FORMATO DESIGN FLEX PRO GATES.pdf",
                "FORMATO DESIGN IQ GATES.pdf",
                "FORMATO FOOD BELTING GATES.pdf",
                "FORMATO TPU GATES.pdf",
                "IDENTIFICADOR TPU GATES.pdf",
                "POLY CHAIN ADV GATES.pdf",
                "POLY CHAIN CARBON VOLT GATES.pdf",
                "POLY CHAIN GT CARBON GATES.pdf",
                "TABLAS DE CONVERSION - PTV GATES.pdf",
                "TPU BELTS INTRALOGISTICS GATES.pdf",
                "TPU MXB FLAT BELT GATES.pdf",
                "VENTAJAS BANDAS POWERBAND GATES.pdf",
                "_FLYER TRIPOWER GATES.pdf"
            ]
        },
        pesado: {
            folder: "pdfs/gates/servicio-pesado/",
            files: [
                "ACOPLADORES MANUALES GATES.pdf",
                "BANDA FLEETRUNNER GATES.pdf",
                "BOLETIN BOMBA DE AGUA 43446HD.pdf",
                "BOLETIN BOMBA DE AGUA 43565HD.pdf",
                "BOLETIN BOMBAS DE AGUA 45049HD-45052HD GATES.pdf",
                "BOLETIN KIT DE INFLADO.pdf",
                "BOLETIN KIT DE SOPLETEO PARA CABINA GATES.pdf",
                "BOLETIN MANGUERA MOLDEADA 29004.pdf",
                "BOLETIN TENSOR 38667.pdf",
                "BOLETIN VALVULAS DE ESTACIONAMIENTO.pdf",
                "BOLETIN VALVULAS GT.pdf",
                "CATALOGO BOMBA DE AGUA SERVICIO PESADO GATES.pdf",
                "CATALOGO DE SERVICIO PESADO 2025.pdf",
                "COMPONENTES NEUMATICOS Y ACCESORIOS GATES.pdf",
                "ENSAMBLE DE FRENOS GATES.pdf",
                "GUIA MANGUERAS DE ENFRIAMIENTO HD GATES.pdf",
                "GUIA MANGUERAS DE SILICON GATES.pdf",
                "GUIA SERVICIO PESADO GATES.pdf",
                "MANGUERA FLEETRUNNER GATES.pdf",
                "MANGUERAS DE SILICON GATES.pdf",
                "MANGUERAS PARA TRACTO CAMIONES GATES.pdf",
                "Master HD 2014.pdf",
                "POLEAS GUIA HD.pdf",
                "SISTEMA DE FRENOS GATES.pdf",
                "SISTEMA FRENOS DE AIRE HD.pdf",
                "SOLUCIONES MANGUERAS FLEETRUNNER.pdf"
            ]
        }
    }
};

// Mapeo de slug de marca → nombre en distributorsData
const brandNameMap = {
    "gates": "GATES",
    "amsted-rail": "AMSTED RAIL",
    "creanza": "CREANZA",
    "donmez": "DONMEZ",
    "kit-masters": "KIT MASTERS",
    "prestone": "PRESTONE",
    "ramsey-products": "RAMSEY PRODUCTS",
    "spectroline": "SPECTROLINE",
    "starrett": "STARRETT",
    "stemco": "STEMCO",
    "tracer-products": "TRACER PRODUCTS",
    "tudertechnica": "TUDERTECHNICA",
    "zec": "ZEC"
};

// Iconos por categoría
const categoryIcons = {
    automotriz: "fa-car", industrial: "fa-industry", pesado: "fa-truck-fast",
    general: "fa-file-pdf", bearings: "fa-circle-dot", bogie: "fa-gears",
    brake: "fa-stop-circle", corporate: "fa-briefcase", eoc: "fa-link",
    freight: "fa-truck", wear: "fa-shield-halved", wheels: "fa-circle",
    catalogos: "fa-book", fichas: "fa-file-lines"
};

// Embellecer nombre del archivo PDF para mostrar
function prettyFileName(filename, brandName) {
    let s = filename.replace(/\.pdf$/i, '').replace(/^_+/, '');
    s = s.replace(/^[0-9]+\.\s*/, '');
    // Remover el nombre de la marca si aparece como sufijo
    if (brandName) {
        const re = new RegExp('\\s+' + brandName + '\\s*$', 'i');
        s = s.replace(re, '');
        s = s.replace(new RegExp('\\s+' + brandName + '\\s+', 'gi'), ' ');
    }
    s = s.replace(/\s+GATES\s+/gi, ' ').replace(/\s+GATES\s*$/gi, '');
    s = s.replace(/\s*\(\d+\)\s*/, ' ');
    s = s.replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();
    // Capitalizar palabras
    s = s.toLowerCase().replace(/(^|\s)\w/g, c => c.toUpperCase());
    // Conectores en minúsculas
    s = s.replace(/\s(De|Y|La|El|En|Del|Para|Por|Con)\b/g, (m, p1) => ' ' + p1.toLowerCase());
    return s;
}

// Clasificar PDFs por tipo
function classifyPdf(filename) {
    const upper = filename.toUpperCase();
    if (upper.includes('CATALOGO') || upper.includes('CATALOG') || upper.includes('BROCHURE') || upper.includes('MASTER')) return 'catalogo';
    if (upper.includes('POSTER') || upper.includes('BANNER')) return 'poster';
    if (upper.includes('GUIA') || upper.includes('GUIDE') || upper.includes('MANUAL')) return 'guia';
    return 'ficha';
}
const typeLabels = {
    catalogo: { label: 'Catálogos', icon: 'fa-book' },
    ficha: { label: 'Fichas Técnicas', icon: 'fa-file-lines' },
    poster: { label: 'Pósters y Material', icon: 'fa-image' },
    guia: { label: 'Guías y Manuales', icon: 'fa-graduation-cap' }
};

function buildPdfCard(folder, file, brandName) {
    const encoded = folder + encodeURIComponent(file);
    const pretty = prettyFileName(file, brandName);
    const type = classifyPdf(file);
    // Visor embebido sin opción de descarga: onclick abre modal con iframe
    return `
        <button type="button" class="marca-catalog-item" onclick="openPdfViewer('${encoded}', ${JSON.stringify(pretty)})" aria-label="Ver ${pretty}">
            <div class="pdf-icon"><i class="fa-solid fa-file-pdf"></i></div>
            <div class="info">
                <div class="name">${pretty}</div>
                <div class="meta">PDF · ${typeLabels[type].label}</div>
            </div>
            <i class="fa-solid fa-eye arrow"></i>
        </button>`;
}

// Visor de PDF embebido — modal con iframe sin opción de descarga
function openPdfViewer(url, title) {
    let modal = document.getElementById('pdfViewerModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdfViewerModal';
        modal.className = 'pdf-viewer-modal';
        modal.innerHTML = `
            <div class="pdf-viewer-backdrop" onclick="closePdfViewer()"></div>
            <div class="pdf-viewer-container">
                <div class="pdf-viewer-header">
                    <div class="pdf-viewer-title"><i class="fa-solid fa-file-pdf"></i> <span id="pdfViewerTitle"></span></div>
                    <button type="button" class="pdf-viewer-close" onclick="closePdfViewer()" aria-label="Cerrar">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="pdf-viewer-body">
                    <iframe id="pdfViewerFrame" src="" title="Visor de PDF"
                            sandbox="allow-same-origin allow-scripts"
                            referrerpolicy="no-referrer"
                            oncontextmenu="return false;"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('pdfViewerTitle').textContent = title;
    // Parámetros para ocultar toolbar (descarga, imprimir) en Chrome/Edge
    document.getElementById('pdfViewerFrame').src = url + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closePdfViewer() {
    const modal = document.getElementById('pdfViewerModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.getElementById('pdfViewerFrame').src = '';
    document.body.style.overflow = '';
}

// Cerrar con tecla ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePdfViewer();
});

// Generar HTML de una categoría: usar acordeón si hay diferentes tipos
function buildCategoryHtml(catalog, brandName) {
    const iconKey = Object.keys(categoryIcons).find(k => catalog.folder.includes(k)) || 'general';
    const icon = categoryIcons[iconKey] || 'fa-file-pdf';

    // Agrupar archivos por tipo
    const byType = { catalogo: [], ficha: [], guia: [], poster: [] };
    catalog.files.forEach(f => byType[classifyPdf(f)].push(f));
    const typesPresent = Object.entries(byType).filter(([_, files]) => files.length > 0);

    let content;
    if (typesPresent.length <= 1) {
        const cardsHtml = catalog.files.map(f => buildPdfCard(catalog.folder, f, brandName)).join('');
        content = `<div class="marca-catalog-grid">${cardsHtml}</div>`;
    } else {
        content = '<div class="marca-type-accordion">' + typesPresent.map(([type, files], idx) => {
            const meta = typeLabels[type];
            const cardsHtml = files.map(f => buildPdfCard(catalog.folder, f, brandName)).join('');
            return `
                <div class="marca-type-section" data-open="${idx === 0 ? 'true' : 'false'}">
                    <button class="marca-type-header" onclick="this.parentElement.dataset.open = this.parentElement.dataset.open === 'true' ? 'false' : 'true'">
                        <div class="type-icon"><i class="fa-solid ${meta.icon}"></i></div>
                        <span class="type-name">${meta.label}</span>
                        <span class="type-count">${files.length}</span>
                        <i class="fa-solid fa-chevron-down toggle"></i>
                    </button>
                    <div class="marca-type-body"><div class="marca-catalog-grid">${cardsHtml}</div></div>
                </div>`;
        }).join('') + '</div>';
    }

    return `
        <div class="marca-catalog-cat">
            <div class="marca-catalog-cat-header">
                <div class="marca-catalog-cat-icon"><i class="fa-solid ${icon}"></i></div>
                <span class="marca-catalog-cat-name">${catalog.label || 'Catálogos'}</span>
                <span class="marca-catalog-cat-count">${catalog.files.length} PDF${catalog.files.length !== 1 ? 's' : ''}</span>
            </div>
            ${content}
        </div>`;
}

// Renderizar TODAS las categorías de la marca en un contenedor
function renderAllCatalogs(brandKey, brandName) {
    const container = document.getElementById('catalogContainer');
    if (!container) return;
    const catalogs = brandCatalogs[brandKey];
    if (!catalogs) {
        // Sin catálogos - ocultar la sección entera
        const section = document.getElementById('catalogSection');
        if (section) section.style.display = 'none';
        return;
    }
    container.innerHTML = Object.values(catalogs).map(cat => buildCategoryHtml(cat, brandName)).join('');
}

// Renderizar distribuidores de la marca
function renderDistributors(brandKey) {
    const container = document.getElementById('distGrid');
    if (!container) return;
    const brandName = brandNameMap[brandKey];
    if (!brandName) {
        container.innerHTML = '<p style="text-align:center;color:#888;">Sin información de distribuidores.</p>';
        return;
    }

    // distributorsData viene de donde-comprar-data.js
    if (typeof distributorsData === 'undefined' || !distributorsData[brandName]) {
        container.innerHTML = '<p style="text-align:center;color:#888;">Información de distribuidores no disponible.</p>';
        return;
    }

    const cities = distributorsData[brandName];
    const html = Object.entries(cities).map(([city, cityData]) => {
        const distList = cityData.distributors.slice(0, 4).map(d => `
            <li>
                <span class="dot">●</span>
                <a href="tel:${d.phone.replace(/[^0-9+]/g, '')}" title="Llamar a ${d.name}">${d.name}</a>
            </li>
        `).join('');
        const more = cityData.distributors.length > 4
            ? `<li style="color: #aaa; font-size: 12px; padding-top: 6px;">+ ${cityData.distributors.length - 4} más</li>`
            : '';
        return `
            <div class="marca-dist-city">
                <div class="city-name"><i class="fa-solid fa-location-dot"></i> ${city}</div>
                <div class="region">${cityData.region}</div>
                <ul class="marca-dist-list">${distList}${more}</ul>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const brand = getCurrentBrand();
    if (!brand) return;
    const brandName = brandNameMap[brand] || brand.toUpperCase();
    renderAllCatalogs(brand, brandName);
    renderDistributors(brand);
});
