const menuData = {
    "Glavni": ["Satovi", "Parfemi", "Torbice", "Ogrlice", "Prstenovi", "Narukvice"],
    "Torbice": ["Muške", "Ženske"],
    "Parfemi": ["Muški", "Ženski"],
    "Ogrlice": ["Muško", "Žensko"],
    "Narukvice": ["Muško", "Žensko"],
    "Prstenovi": ["Muško", "Žensko"],
    "Satovi": ["Muški", "Ženski"],
    "Sub-Metal": ["Zlato", "Srebro"],
    "Sub-Satovi": ["Zlato", "Srebro", "Gumeni"]
};

let menuHistory = [];

function openFullMenu(key) {
    const menu = document.getElementById('full-menu');
    const content = document.getElementById('menu-content');
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    content.innerHTML = `<h2 class="text-slate-300 text-[10px] font-bold mb-8 uppercase tracking-widest text-center italic">— ${key} —</h2>`;

    menuData[key].forEach(option => {
        const btn = document.createElement('button');
        btn.className = "menu-btn fade-in";
        btn.innerText = option;
        btn.onclick = () => {
            menuHistory.push(key);
            handleMenuClick(key, option);
        };
        content.appendChild(btn);
    });

    if(key !== 'Glavni') {
        const back = document.createElement('button');
        back.className = "w-full text-slate-400 text-[10px] font-bold uppercase mt-4 hover:text-blue-600";
        back.innerText = "← Nazad";
        back.onclick = () => openFullMenu(menuHistory.pop() || 'Glavni');
        content.appendChild(back);
    }
}

function handleMenuClick(parent, option) {
    if (["Muške", "Ženske", "Muški", "Ženski", "Muško", "Žensko"].includes(option)) {
        if (parent === "Satovi") openFullMenu('Sub-Satovi');
        else if (parent === "Parfemi" || parent === "Torbice") showProducts(option, parent);
        else openFullMenu('Sub-Metal');
    } else if (["Zlato", "Srebro", "Gumeni"].includes(option)) {
        showProducts(option, menuHistory[1] || parent);
    } else {
        openFullMenu(option);
    }
}

function closeFullMenu() {
    document.getElementById('full-menu').classList.add('hidden');
    document.body.style.overflow = 'auto';
    menuHistory = [];
}

function showProducts(sub, main) {
    closeFullMenu();
    const section = document.getElementById('shop-section');
    const grid = document.getElementById('product-grid');
    section.classList.remove('hidden');
    document.getElementById('breadcrumb').innerText = `${main} / ${sub}`;
    grid.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        const price = (Math.floor(Math.random() * 500) + 150).toFixed(2);
        grid.innerHTML += `
            <div class="olx-card fade-in cursor-pointer" onclick="openDetails('${main} Model Lux ${i}', '${price}')">
                <div class="p-2 flex gap-1">
                   <span class="bg-[#788e93] text-white text-[8px] px-1 rounded uppercase font-bold">OLX Shop</span>
                   <span class="bg-[#788e93] text-white text-[8px] px-1 rounded"><i class="fas fa-truck"></i></span>
                </div>
                <div class="aspect-square bg-white flex items-center justify-center p-4">
                    <img src="https://source.unsplash.com/featured/400x400?jewelry,${main}&sig=${i}" class="max-h-full object-contain">
                </div>
                <div class="p-4">
                    <span class="olx-badge-gray">Dostupno odmah</span>
                    <h3 class="text-sm font-medium text-slate-700 mt-3 h-10 overflow-hidden leading-tight">${main} - Unikatna serija model ${i}</h3>
                    <div class="mt-2"><span class="olx-novo">Novo</span></div>
                    <div class="flex justify-between items-end mt-6">
                        <span class="text-slate-400 text-xs italic">prije 2 minute</span>
                        <div class="text-right">
                            <div class="olx-price-old">${(parseFloat(price)+45).toFixed(2)} KM</div>
                            <div class="olx-price-new">${price} KM</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 300);
}

function openDetails(name, price) {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    modal.innerHTML = `
        <div class="bg-white max-w-2xl w-full p-8 rounded-2xl relative">
            <button onclick="document.getElementById('detail-modal').classList.add('hidden')" class="absolute top-4 right-4 text-2xl text-slate-300">×</button>
            <h2 class="text-3xl font-['Playfair_Display'] mb-4">${name}</h2>
            <p class="text-2xl font-bold text-blue-600 mb-6">${price} KM</p>
            <a href="https://wa.me/38765959096" class="block w-full py-4 bg-green-500 text-white text-center rounded-lg font-bold">PITAJ NA WHATSAPP</a>
        </div>
    `;
}
