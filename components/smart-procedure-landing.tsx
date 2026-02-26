"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  HeartHandshake,
  MessageCircle,
  Search,
  ShieldCheck,
  ShieldAlert,
  Shirt,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import Marquee from "react-fast-marquee";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SectionPattern } from "@/components/brand-support-elements";
import { HeroFluidFabricBackground } from "@/components/hero-fluid-fabric-background";
import { SmartLogo } from "@/components/smart-logo";
import { QualificationFunnel } from "@/components/qualification-funnel";

const trustMetrics = [
  { value: "+5 anos", label: "de atuação no mercado" },
  { value: "+2.000", label: "Smart Lovers atendidas" },
  { value: "100%", label: "cirurgiões certificados pela SBCP" },
  { value: "2 cidades", label: "de atuação: Pelotas-RS e São Paulo-SP" },
];

const pains = [
  {
    title: "Dor 1",
    text: "Evita se olhar no espelho com atenção porque sente que perdeu algo de si mesma.",
    icon: Eye,
  },
  {
    title: "Dor 2",
    text: "Escolhe roupas para esconder, nunca para se sentir bonita.",
    icon: Shirt,
  },
  {
    title: "Dor 3",
    text: "Carrega o desejo da cirurgia há anos, mas medo e insegurança sempre pesam.",
    icon: ShieldAlert,
  },
  {
    title: "Dor 4",
    text: "Pesquisa muito na internet, mas ainda não sabe em quem confiar.",
    icon: Search,
  },
];

const gains = [
  "Escolher qualquer roupa e se sentir confiante.",
  "Aparecer nas fotos sem se encolher.",
  "Sentir orgulho do corpo que acompanha sua história.",
  "Ter segurança de uma decisão feita com quem cuida de verdade.",
  "Viver uma nova relação com sua imagem.",
];

const journey = [
  {
    title: "Videochamada inicial",
    text: "Primeiro contato gratuito e sem compromisso, com duração média de 30 a 45 minutos.",
  },
  {
    title: "Consultoria especializada",
    text: "Match entre paciente e cirurgião para direcionar o plano mais alinhado ao seu perfil.",
  },
  {
    title: "Consulta médica e planejamento",
    text: "Avaliação presencial com cirurgião certificado pela SBCP e definição técnica personalizada.",
  },
  {
    title: "Pré-operatório estruturado",
    text: "Organização de exames e protocolo pré-cirúrgico. Intervalo estimado: 2 a 4 semanas até a cirurgia.",
  },
  {
    title: "Cirurgia hospitalar",
    text: "Procedimento realizado em hospital de referência. Acompanhante obrigatório no dia e nas primeiras 24 a 48h.",
  },
  {
    title: "Pós-operatório especializado",
    text: "Acompanhamento contínuo com foco em recuperação, incluindo fisioterapia pós-operatória na própria clínica.",
  },
];

const differentials = [
  {
    icon: Sparkles,
    title: "Consultoria com match cirurgião",
    text: "Direcionamento especializado para conectar você ao cirurgião mais aderente ao seu caso.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança hospitalar nas 2 cidades",
    text: "Cirurgias realizadas em hospitais de referência em Pelotas-RS e São Paulo-SP.",
  },
  {
    icon: HeartHandshake,
    title: "Viabilidade de pagamento",
    text: "Parcelamento em até 18x no cartão de crédito para facilitar sua organização.",
  },
  {
    icon: Stethoscope,
    title: "Pós-operatório como especialidade",
    text: "Suporte de recuperação com fisioterapia pós-operatória dentro da própria clínica e acompanhamento próximo.",
  },
  {
    icon: MessageCircle,
    title: "Origem + expansão + consultoria online",
    text: "Marca nascida em Pelotas-RS, expandida para São Paulo-SP e com consultoria online disponível.",
  },
];

const testimonials = [
  {
    quote:
      "Cheguei com medo e fui acolhida de verdade. Explicaram cada etapa com calma e isso mudou minha decisão.",
    person: "Patrícia, 34 · Lipo HD · São Paulo/SP",
  },
  {
    quote:
      "O atendimento foi humano e técnico ao mesmo tempo. Eu me senti segura do início ao pós-operatório.",
    person: "Renata, 41 · Lipo HD · Campinas/SP",
  },
  {
    quote:
      "Pesquisei por anos. Na Smart encontrei clareza, organização e suporte constante na recuperação.",
    person: "Camila, 29 · Lipo HD · Pelotas/RS",
  },
];

const videoTestimonials = [
  { id: "video-1", title: "Depoimento de paciente 01", src: "https://www.youtube.com/embed/xxydFfbiVHA" },
  { id: "video-2", title: "Depoimento de paciente 02", src: "https://www.youtube.com/embed/8A9bx97mdyE" },
  { id: "video-3", title: "Depoimento de paciente 03", src: "https://www.youtube.com/embed/2_qXau_fWm4" },
  { id: "video-4", title: "Depoimento de paciente 04", src: "https://www.youtube.com/embed/I4-A80NGYaw" },
];

const beforeAfterSlots = [
  { id: "result-1", label: "Caso #01" },
  { id: "result-2", label: "Caso #02" },
  { id: "result-3", label: "Caso #03" },
  { id: "result-4", label: "Caso #04" },
];

const faqItems = [
  {
    q: "A cirurgia é segura?",
    a: "As cirurgias são realizadas em hospitais de referência e por cirurgiões certificados pela SBCP, com protocolo completo do pré ao pós-operatório.",
  },
  {
    q: "Como funciona a videochamada inicial?",
    a: "A videochamada é gratuita, sem compromisso e dura em média de 30 a 45 minutos para orientação inicial da sua jornada.",
  },
  {
    q: "Em quanto tempo posso operar após a consulta médica?",
    a: "O intervalo estimado entre consulta médica e cirurgia costuma ficar entre 2 e 4 semanas, conforme exames e disponibilidade.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Trabalhamos com parcelamento em até 18x no cartão de crédito, com orientação transparente durante a consultoria.",
  },
  {
    q: "Preciso de acompanhante no procedimento?",
    a: "Sim. É obrigatório acompanhante no dia da cirurgia e nas primeiras 24 a 48 horas do pós-operatório.",
  },
  {
    q: "Vocês atendem apenas presencialmente?",
    a: "Atendemos presencialmente em Pelotas-RS e São Paulo-SP, com consultoria online disponível no primeiro contato.",
  },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 fill-current">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 8.006 0C3.581 0 0 3.582 0 8.007a7.95 7.95 0 0 0 1.143 4.08L0 16l4.032-1.058a7.98 7.98 0 0 0 3.974 1.011h.004c4.425 0 8.007-3.582 8.007-8.007a7.96 7.96 0 0 0-2.416-5.62zM8.01 14.73h-.003a6.58 6.58 0 0 1-3.34-.91l-.24-.142-2.39.627.637-2.33-.155-.24a6.57 6.57 0 0 1-1.01-3.5c0-3.657 2.976-6.633 6.634-6.633a6.6 6.6 0 0 1 4.724 1.955 6.56 6.56 0 0 1 1.95 4.708c-.001 3.658-2.977 6.635-6.635 6.635z" />
      <path d="M11.609 9.198c-.197-.099-1.17-.578-1.352-.646-.182-.066-.315-.099-.448.1-.132.197-.513.646-.63.777-.115.132-.23.149-.428.05-.197-.1-.833-.307-1.589-.98-.588-.523-.986-1.169-1.102-1.366-.115-.197-.012-.304.087-.402.089-.088.197-.23.296-.346.1-.115.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.448-1.08-.613-1.48-.161-.387-.325-.334-.448-.34-.115-.005-.247-.006-.38-.006a.728.728 0 0 0-.529.248c-.182.197-.694.679-.694 1.654 0 .975.71 1.917.81 2.049.099.132 1.393 2.128 3.376 2.986.472.204.84.326 1.127.418.473.15.904.129 1.245.078.38-.057 1.17-.479 1.336-.942.165-.463.165-.859.116-.942-.05-.082-.182-.132-.38-.23z" />
    </svg>
  );
}

export function SmartProcedureLanding() {
  const [showSticky, setShowSticky] = useState(false);
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);

  const openFunnel = () => setIsFunnelOpen(true);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#f8f3ec] text-[#4c2519]">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f7ede4]" />
        <HeroFluidFabricBackground />
        <div className="relative mx-auto grid min-h-[78vh] w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div className="max-w-3xl space-y-6 text-[#fff7f0] [text-shadow:0_1px_8px_rgba(38,18,12,0.52)]">
            <SmartLogo variant="lightOnDark" className="w-fit" />
            <Badge className="rounded-full bg-white/14 px-4 py-1 text-[0.72rem] tracking-[0.12em] text-[#fff8f1] uppercase">
              Smart Plástica • Lipo HD
            </Badge>
            <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
              A transformação que você merece, com a segurança que você precisa.
            </h1>
            <p className="max-w-2xl text-lg text-[#f8e5d8] md:text-xl">
              Tecnologia moderna, acompanhamento completo e uma equipe que cuida de você do primeiro
              contato até a recuperação.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="button"
                size="lg"
                className="h-12 rounded-lg bg-[#a74e31] px-7 text-base text-white hover:bg-[#8f4229]"
                onClick={openFunnel}
              >
                Quero falar com uma consultora
              </Button>
              <p className="text-sm text-[#f4ddcf]">
                ✦ +5 anos de atuação · ✦ +2.000 Smart Lovers · ✦ 100% dos cirurgiões certificados
                pela SBCP
              </p>
            </div>
          </div>

          <Card className="border-[#debcaa]/40 bg-[#fff7f0]/95">
            <CardHeader>
              <CardTitle className="font-display text-4xl text-[#6f3a29]">Jornada Smart 360º</CardTitle>
              <CardDescription className="text-[#6f3a29]/85">
                São 6 etapas do primeiro contato ao pós-operatório, com clareza em cada passo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#5b2c1e]">
              <p className="rounded-xl bg-[#f3e1d4] px-3 py-2 font-medium">
                Videochamada inicial gratuita e sem compromisso (30 a 45 min)
              </p>
              <p className="rounded-xl bg-[#f3e1d4] px-3 py-2 font-medium">
                Consultoria especializada com match entre paciente e cirurgião
              </p>
              <p className="rounded-xl bg-[#f3e1d4] px-3 py-2 font-medium">
                Tempo estimado entre consulta médica e cirurgia: 2 a 4 semanas
              </p>
              <p className="rounded-xl bg-[#f3e1d4] px-3 py-2 font-medium">
                Pós-operatório com acompanhamento especializado na própria clínica
              </p>
              <Button
                type="button"
                className="h-11 w-full bg-[#8f4229] text-white hover:bg-[#7b3923]"
                onClick={openFunnel}
              >
                Iniciar pré-atendimento
              </Button>
            </CardContent>
          </Card>
        </div>
      </header>

      <section className="bg-[#5b2c1e] py-6 text-[#f9ecdf]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            {trustMetrics.map((item) => (
              <div key={item.label}>
                <p className="font-display text-3xl md:text-4xl">{item.value}</p>
                <p className="text-sm text-[#f9ecdf]/90">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-[#f9ecdf]/85">
            Cirurgias realizadas em hospitais de referência nas duas cidades.
          </p>
        </div>
      </section>

      <main>
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl space-y-8 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Problema</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
                Sabemos o que você sente. E estamos aqui por isso.
              </h2>
              <p className="text-lg text-[#6f5144]">
                Você não precisa continuar se sentindo assim. Existe um caminho seguro, claro e
                cuidadoso para sua transformação.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {pains.map((pain) => {
                const Icon = pain.icon;
                return (
                  <Card key={pain.title} className="border-[#dfc3b2] bg-white">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e3d6] text-[#7d412d]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <CardTitle className="text-lg text-[#6c3828]">{pain.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base text-[#6f5144]">{pain.text}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[linear-gradient(125deg,_#8f7867_0%,_#a28c7d_48%,_#b8a497_100%)] py-20 text-[#fff7f0]">
          <SectionPattern variant="curves" color="#5d2b1d" opacity={0.12} />
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-8 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] uppercase">Transformação</p>
              <h2 className="font-display text-5xl leading-tight">Imagine se olhar no espelho e finalmente se reconhecer.</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {gains.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/30 bg-white/10 px-4 py-3">
                  <Sparkles className="mt-0.5 h-4 w-4" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="font-display text-3xl italic">&ldquo;Uma mulher confiante está pronta para tudo.&rdquo;</p>
            <Button
              type="button"
              size="lg"
              className="h-12 rounded-lg bg-[#a74e31] px-7 text-white hover:bg-[#8f4229]"
              onClick={openFunnel}
            >
              Quero começar minha jornada <ArrowRight />
            </Button>
          </div>
        </section>

        <section className="bg-[#fffdfa] py-20" id="metodo">
          <div className="mx-auto w-full max-w-7xl space-y-8 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Método</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
                Sua jornada com a Smart Plástica, passo a passo.
              </h2>
              <p className="text-lg text-[#6f5144]">
                Em 6 etapas, da videochamada inicial ao pós-operatório, você nunca caminha sozinha.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journey.map((step, index) => (
                <Card key={step.title} className="border-[#e0c6b5] bg-white">
                  <CardHeader>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#a74e31] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <CardTitle className="text-lg text-[#6c3828]">{step.title}</CardTitle>
                    <CardDescription className="text-[0.95rem] text-[#6f5144]">{step.text}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <p className="rounded-xl bg-[#f4e8dd] px-4 py-4 text-center text-[#6c3828]">
              Cada etapa é guiada por protocolos seguros e uma equipe que coloca você no centro de tudo.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#ede3d8] py-20">
          <SectionPattern variant="grid" color="#6b3425" opacity={0.08} />
          <div className="relative z-10 mx-auto w-full max-w-7xl space-y-8 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Diferenciais</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
                Por que escolher a Smart Plástica.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {differentials.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border-[#d5b49d] bg-white">
                    <CardHeader>
                      <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f6e8dd] text-[#7d412d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg text-[#6c3828]">{item.title}</CardTitle>
                      <CardDescription className="text-[0.95rem] text-[#6f5144]">{item.text}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#fffdfa] py-20">
          <div className="mx-auto w-full max-w-6xl space-y-8 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Prova social</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
                Histórias reais de mulheres que transformaram sonho em decisão.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.person} className="border-[#dfc3b2] bg-white">
                  <CardContent className="space-y-4 p-6">
                    <p className="font-display text-2xl text-[#5b2c1e]">&ldquo;{item.quote}&rdquo;</p>
                    <p className="text-sm font-medium text-[#6f5144]">{item.person}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                className="border-[#a74e31] text-[#7d412d]"
                onClick={openFunnel}
              >
                Quero viver minha transformação também
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[#f4ebe2] py-20">
          <div className="mx-auto w-full max-w-7xl space-y-10 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Depoimentos em vídeo</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">Shorts reais de pacientes</h2>
              <p className="text-[#6f5144]">Depoimentos reais em vídeo para fortalecer segurança e confiança.</p>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <Marquee
                autoFill
                gradient={false}
                speed={26}
                pauseOnHover
                pauseOnClick
                className="[--gap:1rem] py-1"
              >
                {videoTestimonials.map((video) => (
                  <div key={video.id} className="mr-4 w-[74vw] max-w-[320px] sm:w-[280px] md:w-[300px]">
                    <Card className="border-[#d8b59f] bg-[#fffdfb]">
                      <CardContent>
                        <div className="overflow-hidden rounded-xl border border-[#d8b59f] bg-[#f8eee5]">
                          <iframe
                            src={video.src}
                            title={video.title}
                            className="aspect-[9/16] w-full"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        <section className="bg-[#fffdfa] py-20">
          <div className="mx-auto w-full max-w-7xl space-y-10 px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">Antes e depois</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">Galeria de resultados (mockup para preencher)</h2>
              <p className="text-[#6f5144]">
                Espaços reservados para imagens reais autorizadas de antes e depois.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {beforeAfterSlots.map((slot) => (
                <Card key={slot.id} className="border-dashed border-[#cb9f83] bg-[#fffdfb]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#6c3828]">{slot.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid aspect-[3/4] place-items-center rounded-lg border border-dashed border-[#cb9f83] bg-[#f8eee5] text-sm text-[#8f6b57]">
                      Antes
                    </div>
                    <div className="grid aspect-[3/4] place-items-center rounded-lg border border-dashed border-[#cb9f83] bg-[#f8eee5] text-sm text-[#8f6b57]">
                      Depois
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#efe5da] py-20">
          <div className="mx-auto w-full max-w-4xl space-y-8 px-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#8f563f] uppercase">FAQ estratégico</p>
              <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
                Suas dúvidas são bem-vindas. Vamos esclarecer cada uma.
              </h2>
            </div>

            <Card className="border-[#ddbeaa] bg-white p-6">
              <Accordion type="single" collapsible className="space-y-1">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.q} value={`faq-${index}`} className="border-[#ead3c3]">
                    <AccordionTrigger className="text-base text-[#6c3828] hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[0.95rem] text-[#6f5144]">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        <section className="bg-[linear-gradient(130deg,_#5b2c1e_0%,_#7e4732_46%,_#5b2c1e_100%)] py-20 text-[#fff3e8]" id="qualificacao">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-sm font-semibold tracking-[0.12em] uppercase">Atendimento personalizado</p>
              <h2 className="font-display text-5xl leading-tight">Sua jornada começa aqui.</h2>
              <p className="text-lg text-[#f9e7d9]">
                Responda algumas perguntas rápidas para que nossa equipe entenda melhor seu momento e
                direcione o melhor plano para você.
              </p>

              <div className="space-y-2 text-[#fde7d7]">
                <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Videochamada inicial gratuita (30 a 45 min)</p>
                <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Fluxo rápido e guiado</p>
                <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Perguntas objetivas para te conhecer melhor</p>
                <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Direcionamento personalizado por unidade</p>
                <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Retorno ao formulário/e-mail em até 24 horas úteis</p>
              </div>
            </div>

            <Card className="border-[#e2c4b1] bg-white text-[#4a2519]">
              <CardHeader>
                <CardTitle className="font-display text-4xl text-[#5b2c1e]">Começar atendimento</CardTitle>
                <CardDescription className="text-[#6f5144]">
                  Em poucos cliques, você conclui o envio e nossa equipe já recebe seu contexto.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  type="button"
                  size="lg"
                  className="h-12 w-full rounded-lg bg-[#a74e31] text-base text-white hover:bg-[#8f4229]"
                  onClick={openFunnel}
                >
                  Quero falar com uma consultora
                </Button>
                <p className="mt-3 text-center text-xs text-[#7f6152]">
                  Você preenche em poucos cliques e continua direto no WhatsApp da equipe.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f0e9] py-14">
          <SectionPattern variant="rings" color="#6b3425" opacity={0.1} />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
            <h2 className="font-display text-5xl leading-tight text-[#5b2c1e]">
              Você não nasceu para se esconder. Você nasceu para se reconhecer.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[#6f5144]">
              Com segurança, cuidado e técnica, sua transformação começa com uma decisão.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-6 h-12 rounded-lg bg-[#a74e31] px-7 text-white hover:bg-[#8f4229]"
              onClick={openFunnel}
            >
              Falar com uma consultora agora
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden bg-[#3f1f15] py-14 text-[#f5e7dc]">
        <SectionPattern variant="grid" color="#d5b79f" opacity={0.08} />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div>
            <SmartLogo variant="lightOnDark" />
            <p className="mt-2 text-[#f1dcca]">Você sonha, a Smart realiza!</p>
            <p className="mt-4 text-sm text-[#efdacb]">PLASTICA SMART MOEMA LTDA · CNPJ 65.268.316/0001-04</p>
            <p className="text-sm text-[#efdacb]">RT: Dr. Christian Ferreira | Cirurgião Plástico</p>
            <p className="text-sm text-[#efdacb]">CRM194615 • RQE140364</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold">Contato</p>
            <p>WhatsApp: +55 11 91013-6326</p>
            <p>E-mail: contato@smartplastica.com.br</p>
            <p>Unidades: São Paulo-SP (Moema) e Pelotas-RS</p>
            <p>Atendimento comercial: seg-sex, 9h às 18h</p>
            <p>Resposta ao formulário/e-mail: até 24 horas úteis</p>
            <p>Consultoria online disponível</p>
            <div className="pt-2">
              <Button
                type="button"
                size="sm"
                className="bg-[#a74e31] text-white hover:bg-[#8f4229]"
                onClick={openFunnel}
              >
                Começar atendimento
              </Button>
            </div>
            <div className="pt-3 text-xs text-[#e8d0bf]">
              <p><Link href="/politica-de-privacidade">Política de Privacidade</Link></p>
              <p><Link href="/politica-de-cookies">Política de Cookies</Link></p>
              <p><Link href="/termos-de-uso">Termos de Uso</Link></p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Localização (Google Maps)</p>
            <div className="overflow-hidden rounded-xl border border-[#6b3a2a]">
              <iframe
                title="Google Maps - Smart Plástica Moema"
                src="https://www.google.com/maps?q=Rua%20Can%C3%A1rios%2C%20Moema%2C%20S%C3%A3o%20Paulo&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
            <p className="text-xs text-[#e8d0bf]">Atualize o endereço completo no embed conforme unidade oficial.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isFunnelOpen} onOpenChange={setIsFunnelOpen}>
        <DialogContent
          className="max-h-[92dvh] w-full max-w-[calc(100%-1rem)] overflow-y-auto rounded-2xl border-[#dfc3b2] bg-[#fffdfa] p-0 sm:max-h-[92vh] sm:max-w-2xl"
          showCloseButton={false}
        >
          <div className="sr-only">
            <DialogTitle>Pré-atendimento Smart Plástica</DialogTitle>
            <DialogDescription>
              Fluxo rápido de perguntas para direcionar seu atendimento antes do WhatsApp.
            </DialogDescription>
          </div>
          <DialogClose
            className="absolute top-3 right-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d9baa6] bg-[#fffdfa]/95 text-[#8f6a59] transition hover:bg-[#f6e8dd] hover:text-[#6c3828]"
            aria-label="Fechar formulário"
          >
            <X className="h-4 w-4" />
          </DialogClose>
          <div className="pt-10">
            <QualificationFunnel />
          </div>
        </DialogContent>
      </Dialog>

      <div
        className={`fixed right-3 bottom-4 left-3 z-30 transition md:hidden ${
          showSticky ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-16 opacity-0"
        }`}
      >
        <Button
          type="button"
          size="lg"
          className="h-12 w-full rounded-lg bg-[#a74e31] text-white shadow-lg hover:bg-[#8f4229]"
          onClick={openFunnel}
        >
          <WhatsAppIcon />
          Falar com consultora
        </Button>
      </div>
    </div>
  );
}
