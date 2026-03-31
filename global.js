// DADOS GLOBAIS DOS SERVIÇOS
const SERVICES_DATA = {
    1: { name: "ALVENARIA", type: "m²", price: 52.00 },
    2: { name: "REBOCO", type: "m²", price: 35.00 },
    3: { name: "PORCELANATO", type: "m²", price: 60.00 },
    4: { name: "CERÂMICA", type: "m²", price: 40.00 },
    5: { name: "CONCRETO", type: "m³", price: 150.00 },
    6: { name: "GESSO", type: "m²", price: 20.00 }
};

// FUNÇÃO PARA NAVEGAR ENTRE PÁGINAS
function navigateTo(page) {
    window.location.href = `${page}.html`;
}

// FUNÇÃO PARA SALVAR DADOS NO LOCAL STORAGE
function saveData(key, value) {
    localStorage.setItem(key, value);
}

// FUNÇÃO PARA CARREGAR DADOS DO LOCAL STORAGE
function loadData(key) {
    return localStorage.getItem(key);
}

// FUNÇÃO PARA GERAR PDF PADRONIZADO
function generateStandardPDF(clientData, budgetData, observations) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4'
    });

    // CONFIGURAÇÕES DE FONTE
    const MAIN_TITLE_SIZE = 24;
    const SECTION_TITLE_SIZE = 22;
    const CONTENT_SIZE = 20;

    // TÍTULO PRINCIPAL
    pdf.setFontSize(MAIN_TITLE_SIZE);
    pdf.text('WILLIAM EMPREITEIRO - ORÇAMENTO', 105, 20, { align: 'center' });
    pdf.line(20, 25, 190, 25);

    // SEÇÃO DADOS DO ORÇAMENTO
    pdf.setFontSize(SECTION_TITLE_SIZE);
    pdf.text('DADOS DO SERVIÇO', 105, 45, { align: 'center' });
    pdf.line(20, 50, 190, 50);

    pdf.setFontSize(CONTENT_SIZE);
    pdf.text(`SERVIÇO: ${budgetData.serviceName}`, 20, 65);
    pdf.text(`TIPO: ${budgetData.serviceType}`, 20, 80);
    pdf.text(`MEDIDAS: ${budgetData.measure1}m x ${budgetData.measure2}m ${budgetData.serviceType === 'm³' ? `x ${budgetData.measure3}m` : ''}`, 20, 95);
    pdf.text(`TOTAL: ${budgetData.totalMeasure} ${budgetData.serviceType} - VALOR: R$ ${budgetData.totalPrice.toFixed(2).replace('.', ',')}`, 20, 110);

    // PULAR PÁGINA
    pdf.addPage();

    // SEÇÃO DADOS DO CLIENTE
    pdf.setFontSize(SECTION_TITLE_SIZE);
    pdf.text('DADOS DO CLIENTE', 105, 25, { align: 'center' });
    pdf.line(20, 30, 190, 30);

    pdf.setFontSize(CONTENT_SIZE);
    pdf.text(`NOME: ${clientData.name}`, 20, 45);
    pdf.text(`TELEFONE: ${clientData.phone || 'Não informado'}`, 20, 60);
    pdf.text(`ENDEREÇO: ${clientData.address || 'Não informado'}`, 20, 75);
    pdf.text(`DATA: ${clientData.date || new Date().toLocaleDateString('pt-BR')}`, 20, 90);

    // SEÇÃO OBSERVAÇÕES
    pdf.setFontSize(SECTION_TITLE_SIZE);
    pdf.text('OBSERVAÇÕES', 105, 110, { align: 'center' });
    pdf.line(20, 115, 190, 115);

    pdf.setFontSize(CONTENT_SIZE);
    if (observations.length > 0) {
        let yPos = 130;
        observations.forEach((obs, i) => {
            pdf.text(`${i+1} - ${obs}`, 20, yPos);
            yPos += 15;
        });
    } else {
        pdf.text('Nenhuma observação adicionada.', 20, 130);
    }

    // SALVAR ARQUIVO
    const fileName = `Orçamento_${clientData.name.replace(/\s/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
}

