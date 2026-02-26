import Link from "next/link";

import { SmartLogo } from "@/components/smart-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoliticaDeCookiesPage() {
  return (
    <main className="min-h-screen bg-[#f8f3ec] px-6 py-14">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-[#d9baa6] bg-white">
          <CardHeader className="space-y-5">
            <SmartLogo variant="darkOnLight" className="w-fit" />
            <CardTitle className="font-display text-5xl text-[#5b2c1e]">Política de Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[#6f5144]">
            <p>
              Esta Política de Cookies explica como a Smart Plástica utiliza cookies e tecnologias
              similares para melhorar navegação, desempenho e mensuração de campanhas.
            </p>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">1. O que são cookies</h2>
              <p>
                Cookies são pequenos arquivos armazenados no dispositivo para lembrar preferências e
                registrar interações de navegação.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">2. Tipos utilizados</h2>
              <p>Cookies estritamente necessários, de desempenho, analíticos e de marketing.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">3. Finalidades</h2>
              <p>
                Garantir funcionamento da página, medir performance de CTA, otimizar campanhas e
                melhorar experiência da usuária.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">4. Gerenciamento</h2>
              <p>
                Você pode gerenciar cookies no navegador ou ferramenta de consentimento ativa no
                site, quando disponível.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">5. Atualizações</h2>
              <p>
                Esta política pode ser atualizada periodicamente para refletir mudanças legais e
                operacionais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">6. Responsável técnico</h2>
              <p>RT: Dr. Christian Ferreira | Cirurgião Plástico.</p>
              <p>CRM194615 • RQE140364.</p>
            </section>

            <p className="text-sm">Documento modelo. Revise com jurídico antes da publicação final.</p>

            <Button asChild variant="outline" className="border-[#a74e31] text-[#7d412d]">
              <Link href="/">Voltar para a landing page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
