// ========== DADOS GLOBAIS DOS SERVIÇOS ==========
const SERVICES = {
    1: { name: "ALVENARIA", type: "m²", price: 52.00 },
    2: { name: "REBOCO", type: "m²", price: 35.00 },
    3: { name: "PORCELANATO", type: "m²", price: 60.00 },
    4: { name: "CERÂMICA", type: "m²", price: 40.00 },
    5: { name: "CONCRETO", type: "m³", price: 150.00 },
    6: { name: "GESSO", type: "m²", price: 20.00 }
};

// ========== FUNÇÕES DE NAVEGAÇÃO ==========
function goToPage(pageName) {
    window.location.href = `${pageName}.html`;
}

// ========== FUNÇÕES DE ARMAZENAMENTO ==========
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

function loadFromStorage(key) {
    return localStorage.getItem(key);
}

// ========== FUNÇÃO PARA GERAR PDF PADRONIZADO ==========
function generatePDF(clientData, budgetData, observations) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

    // CONFIGURAÇÕES DE FONTE
    const MAIN_TITLE = 24;
    const SECTION_TITLE = 22;
    const CONTENT = 20;

    // PÁGINA 1 - DADOS DO ORÇAMENTO
    pdf.setFontSize(MAIN_TITLE);
    pdf.text('WILLIAM EMPREITEIRO', 105, 20, { align: 'center' });
    pdf.setFontSize(SECTION_TITLE);
    pdf.text('ORÇAMENTO', 105, 35, { align: 'center' });
    pdf.line(20, 40, 190, 40);

    pdf.setFontSize(CONTENT);
    pdf.text(`SERVIÇO: ${budgetData.serviceName}`, 20, 55);
    pdf.text(`TIPO: ${budgetData.serviceType}`, 20, 70);
    pdf.text(`MEDIDAS: ${budgetData.measures}`, 20, 85);
    pdf.text(`TOTAL: ${budgetData.totalMeasure} ${budgetData.serviceType}`, 20, 100);
    pdf.text(`VALOR: R$ ${budgetData.totalPrice.toFixed(2).replace('.', ',')}`, 20, 115);

    // PÁGINA 2 - DADOS DO CLIENTE
    pdf.addPage();
    pdf.setFontSize(SECTION_TITLE);
    pdf.text('DADOS DO CLIENTE', 105, 25, { align: 'center' });
    pdf.line(20, 30, 190, 30);

    pdf.setFontSize(CONTENT);
    pdf.text(`NOME: ${clientData.name}`, 20, 45);
    pdf.text(`TELEFONE: ${clientData.phone || 'Não informado'}`, 20, 60);
    pdf.text(`ENDEREÇO: ${clientData.address || 'Não informado'}`, 20, 75);
    pdf.text(`DATA: ${clientData.date || new Date().toLocaleDateString('pt-BR')}`, 20, 90);

    // OBSERVAÇÕES
    pdf.setFontSize(SECTION_TITLE);
    pdf.text('OBSERVAÇÕES', 105, 110, { align: 'center' });
    pdf.line(20, 115, 190, 115);

    pdf.setFontSize(CONTENT);
    if (observations.length > 0) {
        let y = 130;
        observations.forEach((obs, i) => {
            pdf.text(`${i+1} - ${obs}`, 20, y);
            y += 15;
        });
    } else {
        pdf.text('Nenhuma observação adicionada.', 20, 130);
    }

    // SALVAR ARQUIVO
    const fileName = `Orçamento_${clientData.name.replace(/\s/g, '_')}.pdf`;
    pdf.save(fileName);
}

