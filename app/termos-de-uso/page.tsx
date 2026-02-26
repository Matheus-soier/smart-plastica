import Link from "next/link";

import { SmartLogo } from "@/components/smart-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermosDeUsoPage() {
  return (
    <main className="min-h-screen bg-[#f8f3ec] px-6 py-14">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-[#d9baa6] bg-white">
          <CardHeader className="space-y-5">
            <SmartLogo variant="darkOnLight" className="w-fit" />
            <CardTitle className="font-display text-5xl text-[#5b2c1e]">Termos de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[#6f5144]">
            <p>
              Estes Termos de Uso regulam o acesso e uso da landing page da Smart Plástica e de seus
              formulários digitais.
            </p>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">1. Aceitação</h2>
              <p>
                Ao utilizar este site, a usuária declara ciência e concordância com estes termos e
                com as políticas aplicáveis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">2. Objeto</h2>
              <p>
                O site tem finalidade informativa e de captação para pré-avaliação. Não substitui
                consulta ou avaliação médica presencial.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">3. Obrigações da usuária</h2>
              <p>
                Fornecer informações verdadeiras, não utilizar o site para fins ilícitos e respeitar
                direitos de propriedade intelectual.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">4. Limitação de responsabilidade</h2>
              <p>
                As informações disponibilizadas não representam promessa de resultado. Qualquer
                indicação depende de avaliação médica individual.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">5. Propriedade intelectual</h2>
              <p>
                Conteúdos, marcas e materiais da página pertencem à Smart Plástica e não podem ser
                reproduzidos sem autorização.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">6. Foro e legislação</h2>
              <p>
                Aplica-se a legislação brasileira. Fica eleito o foro da comarca competente para
                resolução de conflitos.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">7. Responsável técnico</h2>
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
