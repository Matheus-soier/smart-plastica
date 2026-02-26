import Link from "next/link";

import { SmartLogo } from "@/components/smart-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f8f3ec] px-6 py-14">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="border-[#d9baa6] bg-white">
          <CardHeader className="space-y-5">
            <SmartLogo variant="darkOnLight" className="w-fit" />
            <CardTitle className="font-display text-5xl text-[#5b2c1e]">Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[#6f5144]">
            <p>
              Esta Política de Privacidade descreve como a Smart Plástica coleta, utiliza, armazena e
              protege os dados pessoais enviados em seus formulários de pré-avaliação e contato.
            </p>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">1. Controladora dos dados</h2>
              <p>PLASTICA SMART MOEMA LTDA — CNPJ 65.268.316/0001-04.</p>
              <p>RT: Dr. Christian Ferreira | Cirurgião Plástico.</p>
              <p>CRM194615 • RQE140364.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">2. Dados coletados</h2>
              <p>
                Nome, WhatsApp, e-mail (opcional), procedimento de interesse, unidade, respostas de
                atendimento e informações de perfil comercial fornecidas pela titular.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">3. Finalidades</h2>
              <p>
                Realizar contato comercial, organizar triagem inicial, priorizar atendimento com base
                no índice interno de prioridade de atendimento e registrar informações para agendamento
                de avaliação.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">4. Base legal</h2>
              <p>
                Tratamento pautado em consentimento da titular e legítimo interesse para contato,
                relacionamento e continuidade de atendimento.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">5. Compartilhamento</h2>
              <p>
                Os dados podem ser acessados por equipe interna autorizada e fornecedores
                operacionais estritamente necessários ao atendimento.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">6. Armazenamento e retenção</h2>
              <p>
                Dados são mantidos pelo tempo necessário para cumprimento da finalidade de contato e
                obrigações legais aplicáveis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">7. Direitos da titular</h2>
              <p>
                Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
                portabilidade e exclusão, conforme LGPD.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-semibold text-[#5b2c1e]">8. Contato</h2>
              <p>E-mail: contato@smartplastica.com.br</p>
              <p>WhatsApp: +55 11 91013-6326</p>
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
