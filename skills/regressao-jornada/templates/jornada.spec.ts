/**
 * MODELO de regressão de jornada (exemplo: cotacao-residencial).
 * O agente gera a versão real a partir do mapa.yaml da jornada.
 * - Um test.step por etapa, até o limite_permitido.
 * - expect.soft: a rodada continua e reporta TODAS as diferenças.
 * - Linha de base criada com: npx playwright test <jornada> --update-snapshots
 */
import { test, expect, type Page, type Response } from '@playwright/test';

// Massa padrão (mapa.yaml > massa_padrao). Dados fictícios.
const MASSA = {
  cep: '01001-000',
  tipoImovel: 'Casa',
  capital: '300.000,00',
};

// Rotas de operações reais: bloqueadas como rede de segurança.
const ROTAS_BLOQUEADAS = ['**/contratar**', '**/emitir**', '**/pagamento**'];

// Elementos com dados dinâmicos (mapa.yaml > dados_dinamicos).
const SELETORES_DINAMICOS = ['[data-testid="numero-cotacao"]', '[data-testid="data-validade"]'];

// Mascara nos prints.
const mascaras = (page: Page) => SELETORES_DINAMICOS.map((s) => page.locator(s));

// Troca o texto dinâmico por um marcador fixo antes de comparar a estrutura da tela.
// Sem isso, número de cotação e horário mudam a cada rodada e geram falso alarme.
async function neutralizarDinamicos(page: Page) {
  await page.evaluate((seletores) => {
    for (const s of seletores) document.querySelectorAll(s).forEach((el) => (el.textContent = '[dinâmico]'));
  }, SELETORES_DINAMICOS);
}

// Guarda só campos estáveis da resposta da API (sem ids, datas, tokens).
function camposEstaveis(corpo: Record<string, unknown>, campos: string[]): string {
  const estavel: Record<string, unknown> = {};
  for (const c of campos) estavel[c] = corpo[c];
  return JSON.stringify(estavel, null, 2);
}

test.describe('Jornada: cotacao-residencial', () => {
  const errosConsole: string[] = [];
  const falhasRede: string[] = [];

  test.beforeEach(async ({ page }) => {
    for (const rota of ROTAS_BLOQUEADAS) await page.route(rota, (r) => r.abort());
    page.on('console', (msg) => {
      if (msg.type() === 'error') errosConsole.push(msg.text());
    });
    page.on('response', (resp: Response) => {
      if (resp.status() >= 400) falhasRede.push(`${resp.status()} ${resp.request().method()} ${resp.url()}`);
    });
  });

  test('caminho feliz com massa padrão', async ({ page }) => {
    await test.step('Login', async () => {
      await page.goto('/login');
      await page.getByLabel('Usuário').fill(process.env.QA_USUARIO ?? '');
      await page.getByLabel('Senha').fill(process.env.QA_SENHA ?? '');
      await page.getByRole('button', { name: 'Entrar' }).click();
      await expect(page).not.toHaveURL(/login/);
    });

    await test.step('E1 - Dados do imóvel', async () => {
      await page.goto('/corretor/cotacao/residencial/imovel');
      await page.getByLabel('CEP').fill(MASSA.cep);
      await page.getByLabel('Tipo de imóvel').selectOption(MASSA.tipoImovel);
      await page.getByLabel('Capital segurado').fill(MASSA.capital);
      await expect.soft(page.locator('main')).toMatchAriaSnapshot({ name: 'E1-imovel.aria.yml' });
      await expect.soft(page).toHaveScreenshot('E1-imovel.png', { fullPage: true, mask: mascaras(page) });
      await page.getByRole('button', { name: 'Continuar' }).click();
    });

    await test.step('E2 - Coberturas', async () => {
      await expect(page).toHaveURL(/coberturas/);
      await expect.soft(page.locator('main')).toMatchAriaSnapshot({ name: 'E2-coberturas.aria.yml' });
      await expect.soft(page).toHaveScreenshot('E2-coberturas.png', { fullPage: true, mask: mascaras(page) });
    });

    await test.step('E3 - Resultado (cálculo do prêmio)', async () => {
      // Captura a resposta via route.fetch(): funciona mesmo se a página navegar logo após a chamada.
      let calculo: { status: number; corpo: Record<string, unknown> } | undefined;
      let falhaCaptura = '';
      await page.route('**/api/cotacoes/calcular', async (route) => {
        try {
          const resp = await route.fetch();
          calculo = { status: resp.status(), corpo: (await resp.json()) as Record<string, unknown> };
          await route.fulfill({ response: resp });
        } catch (e) {
          // Ex.: proxy corporativo. A jornada segue e a falha aparece no relatório.
          falhaCaptura = String(e);
          await route.continue();
        }
      });
      await page.getByRole('button', { name: 'Calcular' }).click();
      await expect(page).toHaveURL(/resultado/);
      expect(calculo, `não foi possível capturar a API de cálculo ${falhaCaptura}`).toBeDefined();
      expect.soft(calculo!.status, 'status do cálculo').toBe(200);
      // Valor financeiro: qualquer diferença aqui é crítica.
      expect.soft(camposEstaveis(calculo!.corpo, ['premio_total', 'parcelas'])).toMatchSnapshot('E3-calculo.json');
      // Valores em R$ exibidos na tela. A comparação de estrutura (aria) generaliza números,
      // então os valores financeiros visíveis são comparados explicitamente aqui.
      const valoresTela = await page.getByText(/R\$\s?[\d.,]+/).allInnerTexts();
      expect.soft(JSON.stringify(valoresTela, null, 2)).toMatchSnapshot('E3-valores-tela.json');
      await neutralizarDinamicos(page);
      await expect.soft(page.locator('main')).toMatchAriaSnapshot({ name: 'E3-resultado.aria.yml' });
      await expect.soft(page).toHaveScreenshot('E3-resultado.png', { fullPage: true, mask: mascaras(page) });
    });

    // E4 e E5 seguem o mesmo padrão, parando no Resumo (limite_permitido).

    await test.step('Sem erros técnicos na jornada', async () => {
      expect.soft(errosConsole, 'erros no console').toEqual([]);
      expect.soft(falhasRede, 'respostas 4xx/5xx').toEqual([]);
    });
  });
});
