import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Carrega o .env (Node 20.12+). Credenciais nunca ficam neste arquivo.
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const baseURL = process.env.QA_BASE_URL ?? '';

// Trava de segurança: só roda em homologação.
if (!/homolog|hml|\bqa\b|staging/i.test(baseURL)) {
  throw new Error(
    `QA_BASE_URL deve apontar para homologação (recebido: "${baseURL}"). Ajuste o .env.`,
  );
}

export default defineConfig({
  testDir: '.',
  testMatch: '**/jornada.spec.ts',
  outputDir: './.resultados/artefatos',
  // Linha de base fica dentro da pasta de cada jornada.
  snapshotPathTemplate: '{testDir}/{testFileDir}/linha-de-base/{arg}{ext}',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 120_000,
  reporter: [
    ['list'],
    ['json', { outputFile: '.resultados/resultado.json' }],
    ['html', { open: 'never', outputFolder: '.resultados/html' }],
  ],
  expect: {
    timeout: 15_000,
    // Tolerância baixa: uma troca de valor (ex.: R$ 412,80 -> R$ 0,00) muda poucos pixels.
    toHaveScreenshot: { maxDiffPixels: 50, animations: 'disabled' },
  },
  use: {
    baseURL,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    viewport: { width: 1366, height: 768 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } } }],
});
