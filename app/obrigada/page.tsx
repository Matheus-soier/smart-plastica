import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ObrigadaPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,_#f7f2eb_0%,_#ebddcf_100%)] px-6 py-16">
      <Card className="w-full max-w-3xl border-[#d9baa6] bg-white shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#8f563f] uppercase">
            Pré-avaliação concluída
          </p>
          <CardTitle className="font-display text-5xl text-[#5b2c1e]">Obrigada!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-center text-[#6f5144]">
          <p>
            Recebemos suas respostas e sua solicitação foi enviada com sucesso. Nossa equipe seguirá
            com os próximos passos do seu atendimento.
          </p>
          <p className="text-sm">
            Se quiser ajustar alguma informação, você pode revisar o preenchimento novamente.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="bg-[#a74e31] text-white hover:bg-[#8f4229]">
              <Link href="/">Voltar para a página principal</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#a74e31] text-[#7d412d]">
              <Link href="/">Voltar para landing page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
