/* ============================================================
   QUINTEROS S.A. — DÓNDE COMPRAR DATA & LOGIC
   Distribuidores autorizados por marca y ciudad
   ============================================================ */

const distributorsData = {
    "DITAS": {
        "Bogotá D.C.": {
            region: "Bogotá D.C.",
            distributors: [
                { name: "Imcoldiesel Ltda.", phone: "(1) 4185457" }
            ]
        }
    },
    "GATES": {
        "Barrancabermeja": { region: "Santander", distributors: [
            { name: "Sumatec S.A.S.", phone: "(7) 6020055" },
            { name: "Supplytec S.A.S.", phone: "(7) 6111022" }
        ]},
        "Barranquilla": { region: "Atlántico", distributors: [
            { name: "A Y J Transmisiones y Equipos S.A.S.", phone: "(5) 3187193" },
            { name: "CDEM & CDEB S.A.", phone: "(5) 3494234" },
            { name: "Distribuidora de Correas y Mangueras del Caribe Ltda.", phone: "3174385533" },
            { name: "Distribuidora de Rodamientos S.A. / Disrod S.A.", phone: "(5) 3851604" },
            { name: "Grupo Zambrano S.A.", phone: "(5) 3856500" },
            { name: "Importadora Montecarlo Motors S.A.S.", phone: "(5) 3885060" },
            { name: "Importadora Nipon S.A.", phone: "(5) 3410691" },
            { name: "Intercontinental Auto Parts S.A.S.", phone: "(5) 3624660" },
            { name: "Mangueras y Acoples de la Costa Ltda.", phone: "(5) 3795337" },
            { name: "Punto Gates Barranquilla", phone: "3006768394" },
            { name: "Soluciones Industriales y Mantenimiento Maninsol S.A.S.", phone: "(5) 3785931" },
            { name: "Sumatec S.A.S.", phone: "(5) 3580188" },
            { name: "Urvicosta S.A.S.", phone: "(5) 3405199" }
        ]},
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Americana de Correas y Mangueras Ltda.", phone: "(1) 3605140" },
            { name: "CDEM & CDEB S.A.", phone: "(1) 2470000" },
            { name: "Correas Industriales Ltda.", phone: "(1) 2472230" },
            { name: "Discorreas Mangueras y Empaques S.A.", phone: "(1) 3603604" },
            { name: "Distribuidora de Rodamientos S.A. / Disrod S.A.", phone: "(1) 7564494" },
            { name: "Grupo Zambrano S.A.", phone: "(1) 7456500" },
            { name: "Hermagu S.A.", phone: "(1) 2084666" },
            { name: "Impocolrep Ltda.", phone: "(1) 2403442" },
            { name: "Importadora Montecarlo Motors S.A.S.", phone: "(1) 2477777" },
            { name: "Importadora Nipon S.A.", phone: "(1) 2502200" },
            { name: "Soluciones Industriales y Mantenimiento Maninsol S.A.S.", phone: "(1) 4326822" },
            { name: "Sumatec S.A.S.", phone: "(1) 2379734" },
            { name: "Supplytec S.A.S.", phone: "(1) 3751055" },
            { name: "Vehitotal S.A.S.", phone: "(1) 8966667" }
        ]},
        "Bosconia": { region: "Cesar", distributors: [
            { name: "Supplytec S.A.S.", phone: "(5) 5780055" }
        ]},
        "Bucaramanga": { region: "Santander", distributors: [
            { name: "Importadora Nipon S.A.", phone: "(7) 6715694" },
            { name: "Sumatec S.A.S.", phone: "(7) 6306360" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Bandas y Bandas S.A.S.", phone: "(2) 5247398" },
            { name: "CDEM & CDEB S.A.", phone: "3175400287" },
            { name: "DCM S.A.S.", phone: "(2) 8890686" },
            { name: "Distribuidora de Rodamientos S.A. / Disrod S.A.", phone: "(2) 4850003" },
            { name: "Importadora Cali S.A.", phone: "(2) 4871500" },
            { name: "Importadora Nipon S.A.", phone: "(2) 8960400" },
            { name: "Obyco S.A.", phone: "(2) 4884747" },
            { name: "Punto Gates Cali", phone: "(2) 8959582" },
            { name: "Soluciones Industriales y Mantenimiento Maninsol S.A.S.", phone: "(2) 6669081" },
            { name: "Sumatec S.A.S.", phone: "(2) 4423722" }
        ]},
        "Cartagena": { region: "Bolívar", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(5) 6620546" },
            { name: "DCM del Caribe Ltda.", phone: "(5) 6670245" },
            { name: "Importadora Nipon S.A.", phone: "3217460905" },
            { name: "Mangueras y Acoples de la Costa Ltda.", phone: "(5) 6627411" },
            { name: "Sumatec S.A.S.", phone: "(5) 6691970" }
        ]},
        "Dosquebradas": { region: "Risaralda", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(6) 3422224" }
        ]},
        "Girardota": { region: "Antioquia", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(4) 3660395" }
        ]},
        "Ibagué": { region: "Tolima", distributors: [
            { name: "Sumatec S.A.S.", phone: "(8) 2662626" }
        ]},
        "Manizales": { region: "Caldas", distributors: [
            { name: "Discorreas Mangueras y Empaques S.A.", phone: "(6) 8572793" },
            { name: "Sumatec S.A.S.", phone: "(6) 8840810" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "A Y J Transmisiones y Equipos S.A.S.", phone: "(4) 4481899" },
            { name: "Bonem S.A.", phone: "(4) 3604040" },
            { name: "CDEM & CDEB S.A.", phone: "(4) 2321280" },
            { name: "Distribuidora de Rodamientos S.A. / Disrod S.A.", phone: "(4) 6041255" },
            { name: "Importadora Nipon S.A.", phone: "(4) 4133232" },
            { name: "Sumatec S.A.S.", phone: "(4) 3516660" },
            { name: "Zona Local S.A.S.", phone: "(4) 2622205" }
        ]},
        "Palmira": { region: "Valle del Cauca", distributors: [
            { name: "Imecol S.A.", phone: "(2) 6666605" },
            { name: "Polybandas S.A.S.", phone: "(2) 2624030" }
        ]},
        "Pasto": { region: "Nariño", distributors: [
            { name: "Sumatec S.A.S.", phone: "(2) 7212847" }
        ]},
        "Pereira": { region: "Risaralda", distributors: [
            { name: "Importadora Nipon S.A.", phone: "(6) 3241250" },
            { name: "Racores y Partes de Pereira S.A.S.", phone: "(6) 3293232" },
            { name: "Sumatec S.A.S.", phone: "(6) 3354506" }
        ]},
        "Rionegro": { region: "Antioquia", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(4) 5621022" }
        ]},
        "Santa Marta": { region: "Magdalena", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(5) 4303560" }
        ]},
        "Villavicencio": { region: "Meta", distributors: [
            { name: "Importadora Nipon S.A.", phone: "(8) 6600990" },
            { name: "Repuestos Cadenas y Piñones / Recapi", phone: "(8) 6689618" },
            { name: "Sumatec S.A.S.", phone: "(8) 6680881" }
        ]}
    },
    "KIT MASTERS": {
        "Bucaramanga": { region: "Santander", distributors: [
            { name: "Safrenos Rangel", phone: "(607) 6971303" }
        ]},
        "Funza": { region: "Cundinamarca", distributors: [
            { name: "Importadora American Parts SAS", phone: "3128995376" }
        ]},
        "Itagüí": { region: "Antioquia", distributors: [
            { name: "Muelles y Frenos Simón Bolivar", phone: "(315) 2947613" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "CP Diesel", phone: "(604) 4482025" }
        ]}
    },
    "PRESTONE": {
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Dirego Colombia", phone: "(1) 9279695" },
            { name: "Innovación y Desarrollo de Negocios S.A.S. / Inovaden S.A.S.", phone: "(1) 4118945" }
        ]},
        "Cartagena": { region: "Bolívar", distributors: [
            { name: "Julmar S.A.S.", phone: "(5) 6436287" }
        ]}
    },
    "RAMSEY PRODUCTS": {
        "Barranquilla": { region: "Atlántico", distributors: [
            { name: "Casa Sueca S.A.", phone: "(5) 3852853" },
            { name: "Disrod S.A.", phone: "(5) 3851604" }
        ]},
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Casa Sueca S.A.", phone: "(1) 7427208" },
            { name: "Disrod S.A. Calle 7", phone: "(1) 4090911" },
            { name: "Disrod S.A. Calle 13", phone: "(1) 7564494" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Casa Sueca S.A.", phone: "(2) 4860731" },
            { name: "Disrod S.A.", phone: "(2) 4850003" }
        ]},
        "Manizales": { region: "Caldas", distributors: [
            { name: "Casa Sueca S.A.", phone: "(6) 8956806" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "Casa Sueca S.A.", phone: "(4) 6046437" },
            { name: "Disrod S.A.", phone: "(4) 6041255" }
        ]},
        "Palmira": { region: "Valle del Cauca", distributors: [
            { name: "Polybandas S.A.S.", phone: "(2) 2624030" }
        ]},
        "Pereira": { region: "Risaralda", distributors: [
            { name: "Casa Sueca S.A.", phone: "(6) 3402751" }
        ]}
    },
    "SPECTROLINE": {
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "DCM S.A.S.", phone: "(2) 8890686" }
        ]},
        "Cartagena": { region: "Bolívar", distributors: [
            { name: "DCM del Caribe Ltda.", phone: "(5) 6670245" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "CDEM & CDEB S.A.", phone: "(4) 2321280" }
        ]},
        "Palmira": { region: "Valle del Cauca", distributors: [
            { name: "Imecol S.A.", phone: "(2) 6666605" },
            { name: "Polybandas S.A.S.", phone: "(2) 2624030" }
        ]}
    },
    "STARRETT": {
        "Barrancabermeja": { region: "Santander", distributors: [
            { name: "Sumatec S.A.S.", phone: "(7) 6020055" }
        ]},
        "Barranquilla": { region: "Atlántico", distributors: [
            { name: "Ferreteria JRC Cia. Ltda.", phone: "(5) 3709970" },
            { name: "Pedro Sanchez R. S.A.S.", phone: "(5) 3689474" },
            { name: "Sumatec S.A.S.", phone: "(5) 3580188" },
            { name: "Sumincol S.A.S.", phone: "(5) 3705146" }
        ]},
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Afilados Especiales S.A.S.", phone: "(1) 2527634" },
            { name: "ControlFluid S.A.S.", phone: "(1) 4752829" },
            { name: "Dimecol Cia. Ltda.", phone: "(1) 2479613" },
            { name: "Ferreteria JRC Cia. Ltda.", phone: "(1) 2012585" },
            { name: "Ferreteria Metalcorte y Afines S.A.S.", phone: "(1) 2777365" },
            { name: "Fervicolor y Cia. Ltda.", phone: "(1) 2681233" },
            { name: "Pedro Sanchez R. S.A.S.", phone: "(1) 3603000" },
            { name: "Rectificadora de Motores Técnicos Asociados E.A.T.", phone: "3112371310" },
            { name: "Sumatec S.A.S.", phone: "(1) 2379734" },
            { name: "Sumincol S.A.S. (Laboratorio Autorizado Starrett)", phone: "(1) 3118354" },
            { name: "Voestalpine S.A.", phone: "(1) 3647300" }
        ]},
        "Bucaramanga": { region: "Santander", distributors: [
            { name: "Pedro Sanchez R. S.A.S.", phone: "3212027151" },
            { name: "Pesara", phone: "(7) 6474780" },
            { name: "Sumatec S.A.S.", phone: "(7) 6306360" },
            { name: "Tornicentro", phone: "3203430425" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Pedro Sanchez R S.A.S.", phone: "(2) 8895489" },
            { name: "Sumatec S.A.S.", phone: "(2) 4423722" }
        ]},
        "Cartagena": { region: "Bolívar", distributors: [
            { name: "Sumatec S.A.S.", phone: "(5) 6691970" }
        ]},
        "Cúcuta": { region: "Norte de Santander", distributors: [
            { name: "Tornicentro", phone: "3203430421" }
        ]},
        "Ibagué": { region: "Tolima", distributors: [
            { name: "Sumatec S.A.S.", phone: "(8) 2662626" }
        ]},
        "Manizales": { region: "Caldas", distributors: [
            { name: "Sumatec S.A.S.", phone: "(6) 8840810" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "Aseragro S.A.S.", phone: "(4) 4442184" },
            { name: "Ferreteria JRC Cia. Ltda.", phone: "(4) 4445172" },
            { name: "Ferreteria Metalcorte y Afines S.A.S.", phone: "(4) 2615248" },
            { name: "Pedro Sanchez R. S.A.S.", phone: "(4) 2350324" },
            { name: "Sumatec S.A.S.", phone: "(4) 3516660" }
        ]},
        "Pasto": { region: "Nariño", distributors: [
            { name: "Sumatec S.A.S.", phone: "(2) 7212847" }
        ]},
        "Pereira": { region: "Risaralda", distributors: [
            { name: "Sumatec S.A.S.", phone: "(6) 3354506" }
        ]},
        "Villavicencio": { region: "Meta", distributors: [
            { name: "Sumatec S.A.S.", phone: "(8) 6680881" }
        ]}
    },
    "STEMCO": {
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Americana de Tractomulas S.A.S.", phone: "(1) 5479424" },
            { name: "Dirego Colombia", phone: "(1) 9279695" },
            { name: "Fertrac S.A.S.", phone: "(1) 4294600" },
            { name: "Importaciones Casa de la Mula Ltda.", phone: "(1) 3413550" },
            { name: "Importadora Las Tractomulas / InterTrac S.A.S.", phone: "(1) 4247000" },
            { name: "Multirepuestos Mack S.A.S.", phone: "(1) 2605176" },
            { name: "ParTech S.A.S.", phone: "(1) 4170809" },
            { name: "RDV Colombia S.A.S.", phone: "(1) 2606850" },
            { name: "Surtiretenes y Rodamientos Ltda.", phone: "(1) 4113147" },
            { name: "Surti-Tractomulas Ltda.", phone: "(1) 2610628" },
            { name: "Tracto Chevrolet S.A.", phone: "(1) 5721686" },
            { name: "Tracto Repuestos S.A.S.", phone: "(1) 8273290" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Romarco S.A.", phone: "(2) 4899222" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "CP Diesel Internacional S.A.S.", phone: "(4) 5132004" }
        ]},
        "Mosquera": { region: "Cundinamarca", distributors: [
            { name: "Solutra de Colombia Ltda.", phone: "(1) 8932527" }
        ]},
        "Yopal": { region: "Casanare", distributors: [
            { name: "Carmotor Ltda.", phone: "(8) 6334368" }
        ]},
        "Cuenca (Ecuador)": { region: "Azuay, Ecuador", distributors: [
            { name: "Importadora Rolortiz Cia.", phone: "+593-7-2807317" },
            { name: "Quintuña y Molina Importaciones Cia. Ltda.", phone: "+593-7-4097306" }
        ]},
        "Guayaquil (Ecuador)": { region: "Guayas, Ecuador", distributors: [
            { name: "Figaimsa / Fiallos & Gallegos Importadores S.A.", phone: "+593-4-2360087" },
            { name: "Hivimar S.A.", phone: "+593-4-2681100" },
            { name: "Importadora Ecuatoriana Diesel C.A.", phone: "+593-4-2372527" }
        ]},
        "Quito (Ecuador)": { region: "Pichincha, Ecuador", distributors: [
            { name: "American Truck S.C.C.", phone: "+593-2-2908540" },
            { name: "Importadora Trailerparts Cia. Ltda.", phone: "+593-2-2690779" },
            { name: "MKM Importaciones S.C.C.", phone: "+593-2-3285083" },
            { name: "Motorclass Importadores S.A.", phone: "+593-2-2689395" }
        ]}
    },
    "TRACER PRODUCTS": {
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Surtiretenes y Rodamientos Ltda.", phone: "(1) 4113147" },
            { name: "Tracto Repuestos S.A.S.", phone: "(1) 8273290" }
        ]}
    },
    "TUDERTECHNICA": {
        "Barranquilla": { region: "Atlántico", distributors: [
            { name: "Distribuidora de Correas y Mangueras del Caribe Ltda.", phone: "3174385533" }
        ]},
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Cimac Ltda.", phone: "(1) 2477671" },
            { name: "Discorreas Mangueras y Empaques S.A.", phone: "(1) 3603604" },
            { name: "Rehco S.A.", phone: "(1) 4054508" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Mangueras Industriales Ltda.", phone: "(2) 8833630" }
        ]},
        "Cartagena": { region: "Bolívar", distributors: [
            { name: "DCM del Caribe Ltda.", phone: "(5) 6670245" }
        ]},
        "Manizales": { region: "Caldas", distributors: [
            { name: "Discorreas Mangueras y Empaques S.A.", phone: "(6) 8572793" }
        ]},
        "Medellín": { region: "Antioquia", distributors: [
            { name: "Mangueras y Correas de Antioquia S.A.S.", phone: "(4) 4489011" }
        ]}
    },
    "ZEC": {
        "Bogotá D.C.": { region: "Bogotá D.C.", distributors: [
            { name: "Rehco S.A.", phone: "(1) 4054508" }
        ]},
        "Cali": { region: "Valle del Cauca", distributors: [
            { name: "Mangueras Industriales Ltda.", phone: "(2) 8833630" }
        ]}
    }
};

/* ============================================================
   FILTERING & RENDERING LOGIC
   ============================================================ */

let activeBrand = "TODAS";
let activeCity = "TODAS";
let searchTerm = "";

// Mapeo de ciudades a regiones (para mostrar como información adicional)
const cityRegions = {
    "Santa Marta": "Magdalena", "Barranquilla": "Atlántico", "Cartagena": "Bolívar",
    "Bosconia": "Cesar", "Cúcuta": "Norte de Santander", "Bucaramanga": "Santander",
    "Barrancabermeja": "Santander", "Girardota": "Antioquia", "Medellín": "Antioquia",
    "Itagüí": "Antioquia", "Rionegro": "Antioquia", "Yopal": "Casanare",
    "Manizales": "Caldas", "Pereira": "Risaralda", "Dosquebradas": "Risaralda",
    "Ibagué": "Tolima", "Bogotá D.C.": "Bogotá D.C.", "Mosquera": "Cundinamarca",
    "Funza": "Cundinamarca", "Villavicencio": "Meta", "Palmira": "Valle del Cauca",
    "Cali": "Valle del Cauca", "Pasto": "Nariño",
    "Quito (Ecuador)": "Pichincha, Ecuador", "Cuenca (Ecuador)": "Azuay, Ecuador",
    "Guayaquil (Ecuador)": "Guayas, Ecuador"
};

// Calculate stats
function calculateStats() {
    let distCount = 0;
    let citySet = new Set();
    let brandCount = Object.keys(distributorsData).length;

    for (const brand in distributorsData) {
        for (const city in distributorsData[brand]) {
            citySet.add(city);
            distCount += distributorsData[brand][city].distributors.length;
        }
    }
    return { distCount, cityCount: citySet.size, brandCount, cities: Array.from(citySet).sort() };
}

// Brand icon mapping (FontAwesome icons)
const brandIcons = {
    "DITAS": "fa-solid fa-gear",
    "GATES": "fa-solid fa-link",
    "KIT MASTERS": "fa-solid fa-fan",
    "PRESTONE": "fa-solid fa-droplet",
    "RAMSEY PRODUCTS": "fa-solid fa-link-horizontal",
    "SPECTROLINE": "fa-solid fa-magnifying-glass",
    "STARRETT": "fa-solid fa-ruler-combined",
    "STEMCO": "fa-solid fa-circle-dot",
    "TRACER PRODUCTS": "fa-solid fa-bullseye",
    "TUDERTECHNICA": "fa-solid fa-arrow-right-arrow-left",
    "ZEC": "fa-solid fa-water"
};

// Get initials from name (max 2 chars)
function getInitials(name) {
    const clean = name.replace(/S\.?A\.?S?\.?|Ltda\.?|Cia\.?|S\.?A\.?|Inc\.?|& ?CDEB/gi, '').trim();
    const words = clean.split(/[\s/]+/).filter(w => w.length > 0);
    if (words.length === 0) return name.substring(0, 2).toUpperCase();
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

// Build brand tabs
function renderBrandTabs() {
    const brands = ["TODAS", ...Object.keys(distributorsData)];
    const html = brands.map(b => {
        const isActive = b === activeBrand ? 'active' : '';
        const isTodas = b === "TODAS" ? 'is-todas' : '';
        return `<button class="dc-brand-tab ${isActive} ${isTodas}" data-brand="${b}">${b}</button>`;
    }).join('');
    document.getElementById('brandTabs').innerHTML = html;
    document.querySelectorAll('.dc-brand-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            activeBrand = btn.dataset.brand;
            activeCity = "TODAS";  // Reset city al cambiar marca
            renderBrandTabs();
            renderCityTabs();
            renderDistributors();
        });
    });
}

// Build city tabs (depende de la marca activa)
function renderCityTabs() {
    let cities = new Set();
    if (activeBrand === "TODAS") {
        for (const brand in distributorsData) {
            for (const city in distributorsData[brand]) cities.add(city);
        }
    } else {
        for (const city in distributorsData[activeBrand]) cities.add(city);
    }
    const cityList = ["TODAS", ...Array.from(cities).sort((a, b) => a.localeCompare(b))];
    const html = cityList.map(c => {
        const isActive = c === activeCity ? 'active' : '';
        return `<button class="dc-city-tab ${isActive}" data-city="${c}">${c}</button>`;
    }).join('');
    document.getElementById('cityTabs').innerHTML = html;
    document.querySelectorAll('.dc-city-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCity = btn.dataset.city;
            renderCityTabs();
            renderDistributors();
        });
    });
}

// Render filtered distributors (grid agrupada por marca y ciudad)
function renderDistributors() {
    const container = document.getElementById('distributorsContainer');
    const resultCount = document.getElementById('resultCount');
    if (!container) return;

    const brandsToShow = activeBrand === "TODAS" ? Object.keys(distributorsData) : [activeBrand];
    let totalShown = 0;
    let html = '';

    brandsToShow.forEach(brand => {
        const cities = distributorsData[brand];
        const citiesToShow = activeCity === "TODAS" ? Object.keys(cities) : (cities[activeCity] ? [activeCity] : []);
        if (citiesToShow.length === 0) return;

        let brandHtml = '';
        let brandCount = 0;

        citiesToShow.forEach(city => {
            const cityData = cities[city];
            if (!cityData) return;

            // Filter by search term
            const filtered = cityData.distributors.filter(d => {
                if (!searchTerm) return true;
                const s = searchTerm.toLowerCase();
                return d.name.toLowerCase().includes(s) || d.phone.toLowerCase().includes(s);
            });

            if (filtered.length === 0) return;

            const cardsHtml = filtered.map(d => `
                <div class="dc-dist-card">
                    <div class="dc-dist-avatar">${getInitials(d.name)}</div>
                    <div class="dc-dist-info">
                        <div class="dc-dist-name" title="${d.name}">${d.name}</div>
                        <div class="dc-dist-phone"><i class="fa-solid fa-phone"></i>${d.phone}</div>
                    </div>
                    <a href="tel:${d.phone.replace(/[^0-9+]/g, '')}" class="dc-dist-call" title="Llamar"><i class="fa-solid fa-phone"></i></a>
                </div>
            `).join('');

            brandHtml += `
                <div class="dc-city-group">
                    <div class="dc-city-header">
                        <div class="city-pin"><i class="fa-solid fa-location-dot"></i></div>
                        <span class="dc-city-name">${city}</span>
                        <span class="dc-region-name">${cityData.region}</span>
                    </div>
                    <div class="dc-dist-grid">${cardsHtml}</div>
                </div>
            `;
            brandCount += filtered.length;
            totalShown += filtered.length;
        });

        if (brandCount > 0) {
            const icon = brandIcons[brand] || 'fa-solid fa-tags';
            html += `
                <div class="dc-brand-section">
                    <div class="dc-brand-header">
                        <div class="dc-brand-logo"><i class="${icon}"></i></div>
                        <span class="dc-brand-name">${brand}</span>
                        <span class="dc-brand-count">${brandCount} distribuidor${brandCount !== 1 ? 'es' : ''}</span>
                    </div>
                    ${brandHtml}
                </div>
            `;
        }
    });

    if (totalShown === 0) {
        html = `
            <div class="dc-no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Sin resultados</h3>
                <p>No encontramos distribuidores que coincidan con tu búsqueda.<br>Intenta con otros filtros o contacta a un asesor.</p>
            </div>
        `;
        if (resultCount) resultCount.innerHTML = '';
    } else {
        if (resultCount) resultCount.innerHTML = `Mostrando <strong>${totalShown}</strong> distribuidor${totalShown !== 1 ? 'es' : ''}`;
    }

    container.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const stats = calculateStats();
    document.getElementById('statDist').textContent = stats.distCount + '+';
    document.getElementById('statCity').textContent = stats.cityCount;
    document.getElementById('statBrand').textContent = stats.brandCount;

    renderBrandTabs();
    renderCityTabs();
    renderDistributors();

    // Search with debounce for performance
    const searchInput = document.getElementById('searchInput');
    let searchDebounce = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
            searchTerm = e.target.value.trim();
            renderDistributors();
        }, 150);
    });

    // Clear search button
    const clearBtn = document.getElementById('clearSearch');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchTerm = '';
            renderDistributors();
            searchInput.focus();
        });
    }
});
